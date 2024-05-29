import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Button, Card, Text, View } from 'react-native-ui-lib';
import colors from '~/constants/colors';

const profile = () => {
  return (
    <SafeAreaView className="max-h-full">
      <View row centerV backgroundColor="white" className="p-4">
        <Card className="!rounded-full p-1" enableShadow>
          <Avatar
            animate
            source={{
              uri: 'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/436495635_3382806075345023_6921021507996145601_n.jpg?stp=c0.40.100.100a_dst-jpg_p100x100&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGA5CQp991Z_AORFiOl2E7iOdDUApt-I5k50NQCm34jmfHUmMWYA2Iu_tex7Ma2fgmZXttIt5RPmyxArMWCpf1r&_nc_ohc=1UrFi6XyAzkQ7kNvgEBKM_S&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan4-3.fna&cb_e2o_trans=t&oh=00_AYDwR3HBIVOg9Pn410EyAMteIJxAL6BTOpwNxVZY7vK0cA&oe=665B8428',
            }}
          />
        </Card>
        <View className="ml-4 rounded-full bg-secondary px-4 py-2">
          <Text className="font-pmedium !text-white">Chào, Thắng!</Text>
        </View>
      </View>
      <View className="!h-full gap-6 bg-white px-8">
        <Card enableShadow className="p-6" elevation={5}>
          <View row className="justify-between">
            <Text className="font-psemibold text-lg !text-blue-Text">Thông tin</Text>
            <TouchableOpacity
              onPress={() => router.push('person-infor')}
              className=" rounded-full bg-secondary px-4 py-1">
              <AntDesign name="right" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View className="mt-4">
            <Text className="font-pmedium text-base !text-secondary">Nguyễn Chiến Thắng</Text>
            <Text className="font-pregular text-base">0389142366</Text>
            <Text className="font-pregular text-base">thangdepgai@gmail.com</Text>
          </View>
        </Card>

        <Card enableShadow className="p-6" elevation={5}>
          <View row className="justify-between">
            <Text className="font-psemibold text-lg !text-blue-Text">Tài chính</Text>
            <TouchableOpacity className=" rounded-full bg-secondary px-4 py-1">
              <AntDesign name="right" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View className="mt-4 p-2" center>
            <Text className="font-psemibold text-xl !text-secondary" center>
              18,700,200 đ
            </Text>
          </View>
        </Card>

        <Card enableShadow className="p-6" elevation={5}>
          <View row className="justify-between">
            <Text className="font-psemibold text-lg !text-blue-Text">Báo cáo tuần</Text>
            <TouchableOpacity className=" rounded-full bg-secondary px-4 py-1">
              <AntDesign name="right" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View className="mt-4 gap-1 p-2" center>
            <View
              row
              style={{ justifyContent: 'space-between' }}
              className="w-full !justify-between">
              <Text className="font-pregular text-base">Thu nhập trong tuần này</Text>
              <Text className="font-psemibold text-base !text-secondary">4,630,250 đ</Text>
            </View>
            <View row className="w-full !justify-between">
              <Text className="font-pregular text-base">Số giờ đã hoàn thành</Text>
              <Text className="font-psemibold text-base !text-secondary">42 giờ</Text>
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default profile;
