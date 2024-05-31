import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { router } from 'expo-router';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

const AddVerifyInfo = () => {
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
          <View className="p-6">
            <Card centerV backgroundColor="#fff"></Card>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AddVerifyInfo;
