import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-ui-lib';
import { router } from 'expo-router';
import Checkbox from 'expo-checkbox';

const postList = [
  'Quận 1',
  'Quận 2',
  'Quận 3',
  'Quận 4',
  'Quận 5',
  'Quận 6',
  'Quận 7',
  'Quận 8',
  'Quận 9',
  'Quận 10',
  'Quận 11',
  'Quận 12',
];

interface SignUpSelectAriaProps {
  goToPage: (page: number) => void;
}

const SignUpSelectAria = ({ goToPage }: SignUpSelectAriaProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const handleChoiseOptionPress = (pos: string) => {
    let index = selected.indexOf(pos);
    if (index === -1) {
      setSelected([...selected, pos]);
    } else {
      selected.splice(index, 1);
      setSelected([...selected]);
    }
  };
  return (
    <View className="h-fit px-6">
      <View className="mx-4 my-6 rounded-3xl bg-white p-8 shadow-sm">
        {/* title */}
        <Text className="mt-5 w-full text-center font-psemibold text-2xl">
          Bạn muốn làm việc ở khu vực nào?
        </Text>
        {/* list */}
        <View className="mt-10 flex-row flex-wrap gap-y-5">
          {postList.map((e, index) => (
            <View key={index} className="w-1/2">
              <TouchableOpacity
                onPress={() => handleChoiseOptionPress(e)}
                className="mx-auto flex-row items-center rounded-full bg-primary px-6 py-3">
                <Text>
                  <Checkbox value={selected.includes(e)} />
                </Text>
                <Text className="font-pmedium text-base">{'  ' + e}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {/* button */}
        <View className="mt-10 flex-row justify-between">
          <TouchableOpacity
            className="items-center rounded-full bg-[#51DCDC] px-6 py-3 "
            onPress={() => router.back()}>
            <Text className="font-pmedium text-base text-white">Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center rounded-full bg-primary px-6 py-3 "
            onPress={() => goToPage(1)}>
            <Text className="font-pmedium text-base">Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpSelectAria;
