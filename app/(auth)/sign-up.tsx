import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { Link, router } from 'expo-router';
import { SignInForm } from '~/types/auth.type';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '~/components/CustomButton';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import FormField from '~/components/FormField';
import { Container } from '~/components/Container';
import { images } from '~/constants/images';
import CustomCarousel, { CustomCarouselRef } from '~/components/CustomCarousel';
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const SignUp = () => {
  const [form, setform] = useState<SignInForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });

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

  const carouselRef = useRef<CustomCarouselRef>(null);

  const goToPage = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollToIndex(index);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Image
          source={images.bgShape.bgShape1}
          className="absolute h-[300px] w-2/3"
          resizeMode="stretch"
        />
        <View className="w-full justify-around">
          <CustomCarousel
            ref={carouselRef}
            slider={[
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
              </View>,
              <View className="h-fit px-6">
                <View className="mx-4 my-6 rounded-3xl bg-white p-8 shadow-sm">
                  <FormField
                    title="Họ và tên"
                    value=""
                    placeholder="Nguyễn văn A"
                    handleChangeText={() => {}}
                  />
                  <View className="flex-row">
                    <Text className="font-pmedium">Giới tính</Text>
                    <View>
                      <Text>Nam</Text>
                    </View>
                  </View>
                </View>
              </View>,
            ]}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
