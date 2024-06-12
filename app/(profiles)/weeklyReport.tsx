import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Card, Picker, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image } from 'react-native';
import { images } from '~/constants/images';

const weeks = ['19/02/2024 - 25/02/2024', '26/02/2024 - 1/03/2024'];

const weeklyReport = () => {
  const [selectedWeek, setselectedWeek] = useState('19/02/2024 - 25/02/2024');
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#333" style="light" />
      <View className="relative h-full w-full">
        <Image
          source={images.bgShape.bgShape5}
          className="absolute h-[100px] w-full"
          resizeMode="stretch"
          tintColor={'#333'}
        />
        <View row className=" items-center justify-between p-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#fff]">
            <AntDesign name="left" size={30} color="#333" />
          </TouchableOpacity>
          <Text className="font-psemibold text-xl !text-white ">Báo cáo tuần</Text>
          <View />
        </View>

        <Card center className="m-6 p-6">
          <Picker
            value={selectedWeek}
            placeholder={'Placeholder'}
            onChange={() => console.log('changed')}>
            {weeks.map((e) => (
              <Text>{e}</Text>
            ))}
          </Picker>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default weeklyReport;
