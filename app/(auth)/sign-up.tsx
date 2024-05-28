import { Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
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
import { RadioGroup, RadioButton, View, Button } from 'react-native-ui-lib';
import colors from '~/constants/colors';

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

  const [gender, setGender] = useState('male');

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
        <ScrollView contentContainerStyle={{ justifyContent: 'space-around' }} className="w-full">
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
                <View className="mx-4 my-6 gap-6 rounded-3xl bg-white p-8 shadow-sm">
                  <FormField
                    title="Họ và tên"
                    value=""
                    placeholder="Nguyễn văn A"
                    handleChangeText={() => {}}
                  />
                  <View className="flex-row justify-between">
                    <Text className="font-pmedium">Giới tính</Text>
                    <RadioGroup
                      initialValue={gender}
                      onValueChange={(value: string) => setGender(value)}>
                      <View row className="gap-6">
                        <RadioButton color="#333" value={'male'} label={'Nam'} />
                        <RadioButton color="#333" value={'female'} label={'Nữ'} />
                      </View>
                    </RadioGroup>
                  </View>
                  <FormField
                    title="Số CMND/CCCD"
                    value=""
                    placeholder="123456789101"
                    handleChangeText={() => {}}
                  />
                  <FormField
                    title="Số điện thoại"
                    value=""
                    placeholder="0987654321"
                    handleChangeText={() => {}}
                  />
                  <FormField
                    title="Mật khẩu (để đăng nhập lần sau)"
                    value=""
                    placeholder="Ít nhất 6 ký tự"
                    textHelper="Mật khẩu Phải chứa 6-12 ký tự và không có khoảng cách"
                    handleChangeText={() => {}}
                    secureTextEntry
                  />
                  <FormField
                    title="Mã giới thiệu (nếu có)"
                    value=""
                    placeholder="Mã giới thiệu"
                    handleChangeText={() => {}}
                  />
                  <Button
                    label="Gửi Đăng ký"
                    onPress={() => router.push('sign-in')}
                    iconOnRight
                    backgroundColor={colors.primary}
                    labelStyle={{ marginRight: 10, marginVertical: 5, color: '#333' }}
                    iconSource={() => <AntDesign name="arrowright" size={24} color="#333" />}
                  />
                </View>
              </View>,
            ]}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
