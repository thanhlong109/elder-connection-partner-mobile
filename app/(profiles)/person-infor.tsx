import React, { useState } from 'react';
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
import { PersonInfo } from '~/types/auth.type';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, EvilIcons, FontAwesome, Fontisto } from '@expo/vector-icons';
import colors from '~/constants/colors';
import { router } from 'expo-router';

const PersonInfor = () => {
  const [personInfo, setpersonInfo] = useState<PersonInfo>({
    accountEmail: 'thanhlong109@gmail.com',
    accountPassword: 'Baolong321@',
    accountPhone: '0389142366',
    birthDate: new Date().toLocaleDateString(),
    firstName: 'Nguyễn',
    lastName: 'Thành long',
    sex: Gender.MALE,
  });

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
          <Text className="font-pbold text-xl !text-white ">Thông tin</Text>
          <TouchableOpacity className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#858DCB]">
            <FontAwesome name="qrcode" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView scrollEnabled>
          <View className="mx-6 gap-10 pb-20">
            <Card center backgroundColor="#fff" className=" gap-8 p-8">
              <View className="!rounded-full !bg-gray-C5 p-[2px]">
                <Avatar
                  animate
                  size={150}
                  source={{
                    uri: 'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/436495635_3382806075345023_6921021507996145601_n.jpg?stp=c0.40.100.100a_dst-jpg_p100x100&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGA5CQp991Z_AORFiOl2E7iOdDUApt-I5k50NQCm34jmfHUmMWYA2Iu_tex7Ma2fgmZXttIt5RPmyxArMWCpf1r&_nc_ohc=1UrFi6XyAzkQ7kNvgEBKM_S&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan4-3.fna&cb_e2o_trans=t&oh=00_AYDwR3HBIVOg9Pn410EyAMteIJxAL6BTOpwNxVZY7vK0cA&oe=665B8428',
                  }}
                />
              </View>
              <Text className="!text-blue-B1 font-psemibold text-2xl">{`${personInfo.firstName} ${personInfo.lastName}`}</Text>
              <View row className="bg-gray-F2 w-full justify-between !rounded-lg p-6">
                <Text className="font-pregular text-base">Đánh giá trung bình:</Text>
                <View row className="items-center gap-1">
                  <Text className="!text-blue-B1 font-psemibold text-lg">5</Text>
                  <AntDesign name="star" size={24} color={colors.yellow.Star} />
                </View>
              </View>
              <View className="bg-gray-F2 w-full gap-4 !rounded-lg p-6">
                <View row className="w-full justify-between">
                  <Text className="font-pregular text-base">Số điện thoại:</Text>
                  <Text className="!text-blue-B1 font-psemibold text-lg">
                    {personInfo.accountPhone}
                  </Text>
                </View>
                <View className="h-[1px] w-full bg-gray-C5" />
                <View row className="w-full justify-between">
                  <Text className="font-pregular text-base">Giới tính:</Text>
                  <Text className="!text-blue-B1 font-psemibold text-lg">
                    {personInfo.sex === Gender.MALE ? 'Nam' : 'Nữ'}
                  </Text>
                </View>
                <View className="h-[1px] w-full bg-gray-C5" />
                <View row className="w-full justify-between">
                  <Text className="font-pregular text-base">Số CCCD:</Text>
                  <Text className="!text-blue-B1 font-psemibold text-lg">54084649080</Text>
                </View>
              </View>
            </Card>
            <Button className="!bg-red-R1 gap-4 py-4">
              <Fontisto name="unlocked" size={24} color="#fff" />
              <Text className=" font-psemibold text-lg !text-white">Đổi mật khẩu</Text>
            </Button>
            <Button outline outlineColor={colors.red.R1} outlineWidth={1} className="gap-4 py-4">
              <Fontisto name="unlocked" size={24} color={colors.red.R1} />
              <Text className=" !text-red-R1 font-psemibold text-lg">Đăng xuất</Text>
            </Button>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PersonInfor;
