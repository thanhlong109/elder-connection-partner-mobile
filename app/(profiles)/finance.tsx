import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, Text, View } from 'react-native-ui-lib';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { AntDesign, Entypo, FontAwesome6 } from '@expo/vector-icons';
import colors from '~/constants/colors';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { formatNumberToMoney } from '~/utils/formater';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import { useGetTransactionHistoryQuery } from '~/services/accountApi';
import Transaction from '~/components/Transaction';
import LoadingModel from '~/components/LoadingModel';
import { images } from '~/constants/images';

const Finance = () => {
  const walletBalance = useSelector((state: RootState) => state.accountSlice.account.walletBalance);
  const accountId = useSelector((state: RootState) => state.accountSlice.account.id);

  //-------------------- call api get transaction history ------------------------------//

  const {
    data: transactionData,
    isLoading: isGetTransactionLoading,
    isError: isGetTransactionError,
    error: transactionError,
  } = useGetTransactionHistoryQuery(accountId);

  useEffect(() => {
    if (isGetTransactionError) {
      console.log('error load balance:', transactionError);
      //alert('Lỗi không thể load lịch sử giao dịch!');
    }
  }, [isGetTransactionError]);

  //-------------------- end call api get transaction history ------------------------------//
  return (
    <SafeAreaView className="h-full max-h-screen">
      <LoadingModel isloading={isGetTransactionLoading} />
      <StatusBar backgroundColor="#4045A3" style="light" />
      <LinearGradient colors={['#4045A3', '#FFF', '#FFF']} className="flex h-full">
        <View className="flex-1">
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
          <View className="flex flex-1 gap-6 p-6">
            <Card className="gap-6 p-6" center backgroundColor="#fff">
              <Text className="w-full font-pmedium text-base ">Tài khoản chính </Text>
              <Text className="font-psemibold text-xl !text-blue-B1">
                {formatNumberToMoney(parseFloat(walletBalance ?? '0'))} đ
              </Text>
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
            <View className="mt-4 gap-6 rounded-lg bg-white px-4 pt-6">
              <Text className=" font-psemibold text-base uppercase !text-blue-B1" center>
                Giao dịch
              </Text>
              <View className="h-[1px] w-full bg-gray-C5" />
            </View>
            <FlatList
              className="flex-1 rounded-lg bg-white px-2 pb-2"
              data={transactionData?.result.items ?? []}
              renderItem={({ index, item }) => (
                <Animated.View
                  entering={FadeInDown.delay(index * 200)
                    .duration(1000)
                    .springify()}
                  key={index}>
                  <Transaction
                    transaction={item}
                    containerStyle={index % 2 == 0 ? '!bg-white' : '!bg-[#EFFBFA]'}
                  />
                </Animated.View>
              )}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center">
                  <Image
                    source={images.icons.empty2}
                    className="h-[70px] w-[70px]"
                    resizeMode="contain"
                  />
                  <Text className="mt-2 font-pregular text-lg text-gray-600">
                    Bạn chưa có giao dịch nào
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Finance;
