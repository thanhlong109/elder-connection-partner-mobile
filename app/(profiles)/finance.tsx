import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, Text, View } from 'react-native-ui-lib';
import { FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import colors from '~/constants/colors';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Transaction from '~/components/Transaction';

const Finance = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#4045A3" style="light" />
      <LinearGradient colors={['#4045A3', '#FFF', '#FFF']} className=" h-full w-full">
        <View row className=" items-center justify-between p-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#858DCB]">
            <AntDesign name="left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text className="font-pbold text-xl !text-white ">Tài chính</Text>
          <TouchableOpacity className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#858DCB]">
            <AntDesign name="questioncircleo" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View className="gap-6 p-6">
          <Card className="gap-6 p-6" center backgroundColor="#fff">
            <Text className="w-full font-pmedium text-base ">Tài khoản chính </Text>
            <Text className="font-psemibold text-xl !text-blue-B1">100,000,000đ</Text>
            <View row className="w-full justify-between gap-6">
              <Button backgroundColor={colors.blue.B1} className="gap-2">
                <FontAwesome6 name="circle-dollar-to-slot" size={18} color="#fff" />
                <Text className="font-psemibold text-base !text-white">Nạp tiền</Text>
              </Button>
              <Button backgroundColor={colors.red.R1} className="gap-2">
                <FontAwesome6 name="circle-dollar-to-slot" size={18} color="#fff" />
                <Text className="font-psemibold text-base !text-white">Rút tiền</Text>
              </Button>
            </View>
          </Card>
          <Card>
            <FlatList
              data={[
                {
                  id: 1,
                  title: 'Rút tiền',
                  isSend: false,
                  time: new Date(),
                  transaction: '-800,000đ',
                  walletAmount: '200,000đ',
                },
                {
                  id: 2,
                  title: 'Nạp tiền vào ví ',
                  isSend: true,
                  time: new Date(),
                  transaction: '+100,000đ',
                  walletAmount: '1,000,000đ',
                },
              ]}
              renderItem={({ index, item }) => (
                <Animated.View
                  entering={FadeInDown.delay(index * 200)
                    .duration(1000)
                    .springify()}
                  key={index}>
                  <Transaction
                    isSend={item.isSend}
                    time={item.time}
                    title={item.title}
                    transaction={item.transaction}
                    walletAmount={item.walletAmount}
                    containerStyle={index % 2 == 0 ? 'bg-white' : 'bg-[#EFFBFA]'}
                  />
                </Animated.View>
              )}
              ListHeaderComponent={() => (
                <View className="mt-4 gap-6 bg-white p-4">
                  <Text className=" font-psemibold text-base uppercase !text-blue-B1" center>
                    Giao dịch
                  </Text>
                  <View className="h-[1px] w-full bg-gray-C5" />
                </View>
              )}
            />
          </Card>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Finance;
