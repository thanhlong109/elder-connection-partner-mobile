import {
  StorageError,
  TaskState,
  UploadTask,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from './firebase'; // Đảm bảo rằng 'storage' được export từ './firebase'
import * as ImagePicker from 'expo-image-picker';
import { connectorFolder } from '~/constants/firebase';

export interface uploadFilesProps {
  images: ImagePicker.ImagePickerAsset[];
  floderName: string;
  onUploadStart?: () => void;
  onUploading?: (uploadStatus: UploadingStatus) => void;
  onUploadSucess?: (urlList: string[]) => void;
  onUploadFailed?: (error: StorageError | unknown) => void;
  fileName?: string;
}

export interface UploadingStatus {
  progress: number;
  state: TaskState | 'none';
}

export const uploadFiles = async ({
  images,
  floderName,
  onUploadStart,
  onUploadFailed,
  onUploadSucess,
  onUploading,
  fileName,
}: uploadFilesProps) => {
  try {
    const uploadTasks: UploadTask[] = [];
    let totalBytesTransferred = 0;
    let totalBytes = 0;
    const bytesTransferredByTask: { [key: string]: number } = {};
    const urlList: string[] = [];
    // Calculate the total bytes of all images
    for (const image of images) {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      totalBytes += blob.size;
    }

    // Loop through each image
    for (const image of images) {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const fileName1 = fileName ?? (image.fileName || new Date().getTime().toString());
      const storageRef = ref(storage, connectorFolder + '/' + floderName + '/image/' + fileName1);
      const metadata = {
        contentType: image.type,
      };
      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
      onUploadStart?.();

      bytesTransferredByTask[fileName1] = 0; // Initialize bytes transferred for this file

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const bytesTransferred = snapshot.bytesTransferred;
          const previousTransferred = bytesTransferredByTask[fileName1];

          // Update the total bytes transferred correctly
          totalBytesTransferred += bytesTransferred - previousTransferred;
          bytesTransferredByTask[fileName1] = bytesTransferred;

          const progress = (totalBytesTransferred / totalBytes) * 100;
          onUploading?.({ progress, state: snapshot.state });
        },
        (error) => {
          onUploadFailed?.(error);
          console.error('Error uploading file:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          urlList.push(downloadURL);
          if (urlList.length === images.length) {
            onUploadSucess?.(urlList);
          }
          console.log('File available at', downloadURL);
        }
      );

      uploadTasks.push(uploadTask);
    }

    // Wait for all upload tasks to complete
    await Promise.all(uploadTasks.map((task) => task.then()));
  } catch (error) {
    onUploadFailed?.(error);
    console.error('Error uploading files:', error);
  }
};
