import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, Text, View } from 'react-native-ui-lib';
import { router } from 'expo-router';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ScrollView } from 'react-native';
import ImagePickerOption from '~/components/imagePickerOption';
import { images } from '~/constants/images';
import { TouchableOpacity } from 'react-native';
import colors from '~/constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { UploadingStatus, uploadFiles } from '~/utils/uploadMedia';
import UploadStatus from '~/components/UploadStatus';
import NofityModel, { NofityModelData } from '~/components/NofityModel';
import { useVerifyConnectorMutation } from '~/services/connectorApi';
import CustomDialog from '~/components/CustomDialog';
import { DialogType } from '~/enums';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import LoadingModel from '~/components/LoadingModel';
import ErrorModel from '~/components/ErrorModel';

const AddVerifyInfo = () => {
  const accountId = useSelector((state: RootState) => state.accountSlice.account.id);
  const [cccdFront, setCccdFront] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);
  const [cccdBack, setCccdBack] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);
  const [gxnct, setGxnct] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);
  const [xyllFront, setxyllFront] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);
  const [xyllBack, setxyllBack] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);
  const [success, setsuccess] = useState(false);

  const [uploadStatus, setUploadStatus] = useState<UploadingStatus>({ progress: 0, state: 'none' });
  const [notifyData, setNotifyData] = useState<NofityModelData>({
    message: undefined,
    title: 'Ops.. Hồ sơ bạn chưa đủ!',
  });

  //------------------------------------- call verify api ------------------------------------------//

  const [callVerifyConnector, { isError, isLoading, isSuccess, error, data }] =
    useVerifyConnectorMutation();

  useEffect(() => {
    if (isSuccess && data) {
      setsuccess(true);
      console.log('success');
    }
    console.log('kkk');
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log(error);
      console.log('kkk');
    }
  }, [isError]);

  //------------------------------------- end call verify api ------------------------------------//

  const handleUploadPress = () => {
    if (!cccdFront) {
      setNotifyData({ ...notifyData, message: 'Vui lòng bổ xung thêm mặt trước CCCD nhé!' });
    } else if (!cccdBack) {
      setNotifyData({ ...notifyData, message: 'Vui lòng bổ xung thêm mặt sau CCCD nhé!' });
    } else if (!gxnct) {
      setNotifyData({ ...notifyData, message: 'Vui lòng bổ xung thêm giấy xác nhận cư trú nhé!' });
    } else if (!xyllFront) {
      setNotifyData({
        ...notifyData,
        message: 'Vui lòng bổ xung thêm mặt trước sơ yếu lý lịch nhé!',
      });
    } else if (!xyllBack) {
      setNotifyData({
        ...notifyData,
        message: 'Vui lòng bổ xung thêm mặt sau sơ yếu lý lịch nhé!',
      });
    } else {
      uploadFiles({
        images: [cccdFront, cccdBack, gxnct, xyllBack, xyllFront],
        floderName: accountId,
        onUploading: (uploadStatus) => setUploadStatus(uploadStatus),
        onUploadSucess: (urlList) => {
          setUploadStatus({ progress: 100, state: 'success' });
          const i = {
            accountId: accountId,
            cccdFrontImg: urlList[0],
            cccdBehindImg: urlList[1],
            gxnhkImg: urlList[2],
            syllBehindImg: urlList[3],
            syllFrontImg: urlList[4],
            connectorInforId: 0,
            sendDate: new Date().toISOString(),
            socialNumber: '',
          };
          callVerifyConnector(i);
        },
        onUploadFailed: (err) => {
          setUploadStatus({ ...uploadStatus, state: 'error' });
        },
      });
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#4045A3" style="light" />
      <LoadingModel isloading={isLoading} />
      <ErrorModel isError={isError} onReload={handleUploadPress} />
      <CustomDialog
        visble={success}
        setVisible={setsuccess}
        body="Cập nhật thông tin thành công, chúng tôi sẽ kiểm tra và liên hệ sớm nhất tới bạn!"
        onDismiss={() => router.back()}
        type={DialogType.SUCCESS}
      />
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
                  onPress={() => handleUploadPress()}
                  className="mt-4"
                  fullWidth
                  backgroundColor={colors.secondary.DEFAULT}>
                  <Text className="font-psemibold !text-white">Gửi hồ sơ</Text>
                </Button>
              </View>
              <UploadStatus uploadStatus={uploadStatus} />
              {/*  */}
              <NofityModel data={notifyData} setData={setNotifyData} />
            </Card>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AddVerifyInfo;
