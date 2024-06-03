import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, Text, View } from 'react-native-ui-lib';
import { router } from 'expo-router';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ScrollView } from 'react-native';
import ImagePickerOption from '~/components/imagePickerOption';
import { images } from '~/constants/images';
import { TouchableOpacity } from 'react-native';
import colors from '~/constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { UploadingStatus, uploadFiles } from '~/utils/uploadMedia';
import { TaskState } from 'firebase/storage';
import UploadStatus from '~/components/UploadStatus';
import { NofityModelData } from '~/components/NofityModel';

const AddVerifyInfo = () => {
  const [cccdFront, setCccdFront] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);
  const [cccdBack, setCccdBack] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);
  const [gxnct, setGxnct] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);
  const [xyllFront, setxyllFront] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);
  const [xyllBack, setxyllBack] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);

  const [uploadStatus, setUploadStatus] = useState<UploadingStatus>({ progress: 0, state: 'none' });
  const [notifyData, setNotifyData] = useState<NofityModelData>();

  const handleUploadPress = () => {
    if (!cccdFront) {
    }
    if (cccdFront && cccdBack && gxnct && xyllBack && xyllFront) {
      uploadFiles({
        images: [cccdFront, cccdBack, gxnct, xyllBack, xyllFront],
        floderName: 'User-2',
        onUploading: (uploadStatus) => setUploadStatus(uploadStatus),
        onUploadSucess: (url) => {
          setUploadStatus({ progress: 100, state: 'success' });
        },
        onUploadFailed: (err) => {
          setUploadStatus({ ...uploadStatus, state: 'error' });
        },
      });
    } else {
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#4045A3" style="light" />
      <LinearGradient colors={['#4045A3', '#FFF']} className=" h-full w-full">
        <View row className=" items-center justify-between p-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#858DCB]">
            <AntDesign name="left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text className="font-pbold text-xl !text-white ">Bổ xung hồ sơ</Text>
          <View />
        </View>

        <ScrollView scrollEnabled>
          <View className="gap-6 p-6 !pb-[50px]">
            <Card backgroundColor="#fff">
              <View className="m-4">
                <View className="!bg-gray-F2 p-4">
                  <View row className="items-center justify-between">
                    <Text className="font-psemibold text-base">Mặt trước CCCD</Text>
                    <ImagePickerOption
                      onImageSelected={(e) => setCccdFront(e)}
                      buttonContent={
                        <View className="!rounded-lg bg-white p-3">
                          <MaterialCommunityIcons
                            name="camera-plus-outline"
                            size={24}
                            color="black"
                          />
                        </View>
                      }
                    />
                  </View>

                  <View center className="mt-4 w-full">
                    <Image
                      source={cccdFront ? { uri: cccdFront.uri } : images.empty}
                      className="h-[150px] w-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View className="my-5 h-[1px] w-full bg-gray-C5" />

                <View className="!bg-gray-F2 p-4">
                  <View row className="items-center justify-between">
                    <Text className="font-psemibold text-base">Mặt sau CCCD</Text>
                    <ImagePickerOption
                      onImageSelected={(e) => setCccdBack(e)}
                      buttonContent={
                        <View className="!rounded-lg bg-white p-3">
                          <MaterialCommunityIcons
                            name="camera-plus-outline"
                            size={24}
                            color="black"
                          />
                        </View>
                      }
                    />
                  </View>

                  <View center className="mt-4 w-full">
                    <Image
                      source={cccdBack ? { uri: cccdBack.uri } : images.empty}
                      className="h-[150px] w-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <View className="my-5 h-[1px] w-full bg-gray-C5" />

                <View className="!bg-gray-F2 p-4">
                  <View row className="items-center justify-between">
                    <Text className="font-psemibold text-base">Giấy xác nhận cư trú</Text>
                    <ImagePickerOption
                      onImageSelected={(e) => setGxnct(e)}
                      buttonContent={
                        <View className="!rounded-lg bg-white p-3">
                          <MaterialCommunityIcons
                            name="camera-plus-outline"
                            size={24}
                            color="black"
                          />
                        </View>
                      }
                    />
                  </View>

                  <View center className="mt-4 w-full">
                    <Image
                      source={gxnct ? { uri: gxnct.uri } : images.empty}
                      className="h-[150px] w-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <View className="my-5 h-[1px] w-full bg-gray-C5" />

                <View className="!bg-gray-F2 p-4">
                  <View row className="items-center justify-between">
                    <Text className="font-psemibold text-base">Mặt trước giấy sơ yếu lý lịch</Text>
                    <ImagePickerOption
                      onImageSelected={(e) => setxyllFront(e)}
                      buttonContent={
                        <View className="!rounded-lg bg-white p-3">
                          <MaterialCommunityIcons
                            name="camera-plus-outline"
                            size={24}
                            color="black"
                          />
                        </View>
                      }
                    />
                  </View>

                  <View center className="mt-4 w-full">
                    <Image
                      source={xyllFront ? { uri: xyllFront.uri } : images.empty}
                      className="h-[150px] w-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>

                {/*  */}
                <View className="my-5 h-[1px] w-full bg-gray-C5" />

                <View className="!bg-gray-F2 p-4">
                  <View row className="items-center justify-between">
                    <Text className="font-psemibold text-base">Mặt sau giấy sơ yếu lý lịch</Text>
                    <ImagePickerOption
                      onImageSelected={(e) => setxyllBack(e)}
                      buttonContent={
                        <View className="!rounded-lg bg-white p-3">
                          <MaterialCommunityIcons
                            name="camera-plus-outline"
                            size={24}
                            color="black"
                          />
                        </View>
                      }
                    />
                  </View>

                  <View center className="mt-4 w-full">
                    <Image
                      source={xyllBack ? { uri: xyllBack.uri } : images.empty}
                      className="h-[150px] w-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <Button
                  onPress={handleUploadPress}
                  className="mt-4"
                  fullWidth
                  backgroundColor={colors.secondary.DEFAULT}>
                  <Text className="font-psemibold !text-white">Gửi hồ sơ</Text>
                </Button>
              </View>
              <UploadStatus uploadStatus={uploadStatus} />
              {/*  */}
            </Card>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AddVerifyInfo;
