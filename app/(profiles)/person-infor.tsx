import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActionBar,
  Avatar,
  Button,
  Card,
  Dash,
  Dividers,
  Fader,
  Text,
  TextField,
  View,
} from 'react-native-ui-lib';
import { Gender } from '~/enums';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, EvilIcons, Feather, FontAwesome, Fontisto } from '@expo/vector-icons';
import colors from '~/constants/colors';
import { router, useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { clearToken } from '~/utils/auth';
import { clearData } from '~/slices/accountSlice';
import * as ImagePicker from 'expo-image-picker';
import { useUpdateAccountMutation } from '~/services/accountApi';
import { UploadingStatus, uploadFiles } from '~/utils/uploadMedia';
import ImagePickerOption from '~/components/imagePickerOption';
import UploadStatus from '~/components/UploadStatus';
import { UpdateAccountRequest } from '~/types/auth.type';
import LoadingModel from '~/components/LoadingModel';
import ErrorModel from '~/components/ErrorModel';

export interface PersonInfo {
  accountEmail: string;
  accountPassword: string;
  accountPhone: string;
  birthDate: string;
  firstName: string;
  lastName: string;
  sex: Gender;
}

const PersonInfor = () => {
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.accountSlice.account);
  const [verified, setVerified] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadingStatus>({ progress: 0, state: 'none' });

  //--------------------- start call api update acc -----------------------//

  const [callUpdateAccount, { isError, isLoading, isSuccess, error }] = useUpdateAccountMutation();

  //--------------------- end call api update acc -----------------------//

  const handleOnLogout = () => {
    clearToken();
    dispatch(clearData());

    router.dismissAll();
  };

  const updateAvatar = (avatar: ImagePicker.ImagePickerAsset) => {
    if (avatar) {
      uploadFiles({
        images: [avatar],
        fileName: 'avatar',
        floderName: 'connectors/' + account.id,
        onUploading: (uploadStatus) => setUploadStatus(uploadStatus),
        onUploadSucess: (url) => {
          setUploadStatus({ progress: 100, state: 'success' });
          const u: UpdateAccountRequest = {
            biography: account.biography,
            birthday: account.birthDate,
            firstName: account.firstName,
            id: account.id,
            lastName: account.lastName,
            profilePicture: url[0],
            sex: account.sex,
            phoneNumber: account.accountPhone,
          };
          callUpdateAccount(u);
        },
        onUploadFailed: (err) => {
          //alert(err);
          setUploadStatus({ ...uploadStatus, state: 'error' });
        },
      });
    }
  };

  return (
    <SafeAreaView>
      <LoadingModel isloading={isLoading} />
      <StatusBar backgroundColor="#4045A3" style="light" />
      <UploadStatus uploadStatus={uploadStatus} />
      <LinearGradient colors={['#4045A3', '#FFF']} className=" h-full w-full">
        <View row className=" items-center justify-between p-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#858DCB]">
            <AntDesign name="left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text className="font-pbold text-xl !text-white ">Thông tin</Text>
          <TouchableOpacity className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#858DCB]">
            <FontAwesome name="qrcode" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView scrollEnabled>
          <View className="mx-6 gap-10 pb-20">
            <Card center backgroundColor="#fff" className=" gap-8 p-8">
              <View className="!rounded-full !bg-gray-C5 p-[2px]">
                {/* avatar */}
                <Avatar
                  animate
                  size={150}
                  source={{
                    uri: account.profilePicture,
                  }}
                  autoColorsConfig={{ defaultColor: colors.gray.F2 }}
                  customRibbon={
                    <ImagePickerOption
                      onImageSelected={(e) => updateAvatar(e)}
                      aspect={[1, 1]}
                      buttonContent={
                        <View className="!rounded-full border-[1px] border-gray-C5 !bg-white  p-4">
                          <AntDesign name="camerao" size={24} color="black" />
                        </View>
                      }
                    />
                  }
                />
              </View>
              {/* name */}
              <Text className="font-psemibold text-2xl !text-blue-B1">{`${account.firstName} ${account.lastName}`}</Text>
              {/* verify */}
              {verified && (
                <View row className="gap-2 rounded-full bg-green-500 px-5 py-3">
                  <Text className="font-pmedium text-sm !text-white">Đã xác minh</Text>
                  <Feather name="check-circle" size={20} color="#fff" />
                </View>
              )}
              {!verified && (
                <TouchableOpacity
                  onPress={() => router.push('addVerifyInfo')}
                  className="flex-row gap-2 rounded-full bg-red-500 px-5 py-3">
                  <Text className="font-pmedium text-sm !text-white">Bổ sung hồ sơ</Text>
                  <AntDesign name="exception1" size={20} color="#fff" />
                </TouchableOpacity>
              )}
              {/* rating */}
              <View row className="w-full justify-between !rounded-lg bg-gray-F2 p-6">
                <Text className="font-pregular text-base">Đánh giá trung bình:</Text>
                <View row className="items-center gap-1">
                  <Text className="font-psemibold text-lg !text-blue-B1">{5}</Text>
                  <AntDesign name="star" size={24} color={colors.yellow.Star} />
                </View>
              </View>

              <View className="w-full gap-4 !rounded-lg bg-gray-F2 p-6">
                {/* phone number */}
                <View row className="w-full justify-between">
                  <Text className="font-pregular text-base">Số điện thoại:</Text>
                  <Text className="font-psemibold text-lg !text-blue-B1">
                    {account.accountPhone}
                  </Text>
                </View>
                <View className="h-[1px] w-full bg-gray-C5" />
                {/* email */}
                <View row className="w-full justify-between">
                  <Text className="font-pregular text-base">Email:</Text>
                  <Text className="font-psemibold text-sm !text-blue-B1">
                    {account.accountEmail}
                  </Text>
                </View>
                <View className="h-[1px] w-full bg-gray-C5" />
                {/* sex */}
                <View row className="w-full justify-between">
                  <Text className="font-pregular text-base">Giới tính:</Text>
                  <Text className="font-psemibold text-lg !text-blue-B1">
                    {account.sex === Gender.MALE ? 'Nam' : 'Nữ'}
                  </Text>
                </View>
                <View className="h-[1px] w-full bg-gray-C5" />
                {/* cccd */}
                <View row className="w-full justify-between">
                  <Text className="font-pregular text-base">Số CCCD:</Text>
                  <Text className="font-psemibold text-lg !text-blue-B1">{account.cccdNumber}</Text>
                </View>
              </View>
            </Card>
            {/* btn change password */}
            <Button className="gap-4 !bg-red-R1 py-4">
              <Fontisto name="unlocked" size={24} color="#fff" />
              <Text className=" font-psemibold text-lg !text-white">Đổi mật khẩu</Text>
            </Button>
            {/* btn sign out */}
            <Button
              onPress={handleOnLogout}
              outline
              outlineColor={colors.red.R1}
              outlineWidth={1}
              className="gap-4 py-4">
              <Fontisto name="unlocked" size={24} color={colors.red.R1} />
              <Text className=" font-psemibold text-lg !text-red-R1">Đăng xuất</Text>
            </Button>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PersonInfor;
