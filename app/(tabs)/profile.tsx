import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Card, Text, View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import colors from '~/constants/colors';
import { RootState } from '~/store';
import { formatNumberToMoney } from '~/utils/formater';

const profile = () => {
  const account = useSelector((state: RootState) => state.accountSlice.account);
  return (
    <LinearGradient colors={['#4045A3', '#fff', '#FFF']} className=" h-full w-full gap-6 px-6">
      <StatusBar style="auto" />
      <SafeAreaView className="max-h-full">
        <View animated className="gap-6">
          <Text className="w-full !text-center font-psemibold text-xl !text-white">Tài khoản</Text>
          <Animated.View entering={FadeInDown.duration(1000).springify()}>
            <Card enableShadow className="p-6" elevation={5}>
              <View row className="justify-between">
                <Text className="font-psemibold text-lg !text-blue-Text">Thông tin</Text>
                <TouchableOpacity
                  onPress={() => router.push('person-infor')}
                  className=" rounded-full bg-secondary px-4 py-1">
                  <AntDesign name="right" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View className="mt-4 gap-4" row>
                <View className="!rounded-full p-1">
                  <Avatar
                    animate
                    source={{
                      uri: account.profilePicture,
                    }}
                    autoColorsConfig={{ defaultColor: colors.gray.F2 }}
                  />
                </View>
                <View>
                  <Text className="font-pmedium text-base !text-secondary">
                    {account.firstName + ' ' + account.lastName}
                  </Text>
                  <Text className="font-pregular text-base">{account.accountPhone}</Text>
                  <Text className="font-pregular text-base">{account.accountEmail}</Text>
                </View>
              </View>
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
            <Card enableShadow className="p-6" elevation={5}>
              <View row className="justify-between">
                <Text className="font-psemibold text-lg !text-blue-Text">Tài chính</Text>
                <TouchableOpacity
                  onPress={() => router.push('finance')}
                  className=" rounded-full bg-secondary px-4 py-1">
                  <AntDesign name="right" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View className="mt-4 p-2" center>
                <Text className="font-psemibold text-xl !text-secondary" center>
                  {formatNumberToMoney(parseFloat(account.walletBalance))} đ
                </Text>
              </View>
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
            <Card enableShadow className="p-6" elevation={5}>
              <Text className="font-psemibold text-lg !text-blue-Text">Báo cáo tuần</Text>
              {/* <View row className="justify-between">
                
                <TouchableOpacity
                  onPress={() => router.push('weeklyReport')}
                  className=" rounded-full bg-secondary px-4 py-1">
                  <AntDesign name="right" size={20} color="white" />
                </TouchableOpacity>
              </View> */}
              <View className="mt-4 gap-1 p-2" center>
                <View
                  row
                  style={{ justifyContent: 'space-between' }}
                  className="w-full !justify-between">
                  <Text className="font-pregular text-base">Thu nhập trong tuần này</Text>
                  <Text className="font-psemibold text-base !text-secondary">560,000 đ</Text>
                </View>
                <View row className="w-full !justify-between">
                  <Text className="font-pregular text-base">Số giờ đã hoàn thành</Text>
                  <Text className="font-psemibold text-base !text-secondary">4 giờ</Text>
                </View>
              </View>
            </Card>
          </Animated.View>

          {/* <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
            <Card enableShadow className="p-6" elevation={5}>
              <View row className="justify-between">
                <Text className="font-psemibold text-lg !text-blue-Text">Chương trình đào tạo</Text>
                <TouchableOpacity
                  onPress={() => router.push('finance')}
                  className=" rounded-full bg-secondary px-4 py-1">
                  <AntDesign name="right" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View className="mt-4 p-2"></View>
            </Card>
          </Animated.View> */}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default profile;
