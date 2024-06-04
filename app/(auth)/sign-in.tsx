import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import FormField from '~/components/FormField';
import { SignUpForm } from '~/types/auth.type';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '~/components/CustomButton';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { images } from '~/constants/images';

const SignIn = () => {
  const [form, setform] = useState<SignUpForm>({
    email: '',
    password: '',
  });
  return (
    <>
      <View backgroundColor="#fff">
        <Image
          source={images.bgShape.bgShape2}
          className="absolute h-[200px] w-2/3"
          resizeMode="stretch"
        />
        <Image
          source={images.bgShape.bgShape3}
          className="absolute right-0 top-[100px] h-[200px] w-1/3"
          resizeMode="stretch"
        />
        <ScrollView
          contentContainerStyle={{ justifyContent: 'center', height: '100%' }}
          className="mb-[10%] p-6">
          <View useSafeArea className="h-full justify-end">
            <Animated.Text
              entering={FadeInDown.duration(1000).springify()}
              className=" font-psemibold text-4xl text-[#333]">
              Đăng Nhập
            </Animated.Text>
            <Text className="mt-2 font-pmedium">Chào mừng quay trở lại!, </Text>
            <Text className="font-pmedium">Vui lòng đăng nhập để tiếp tục</Text>
            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
              <FormField
                handleChangeText={(value) => setform({ ...form, email: value })}
                value={form.email}
                placeholder="Nhập địa chỉ email"
                borderStyle="rounded-sm"
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
              <FormField
                handleChangeText={(value) => setform({ ...form, password: value })}
                value={form.password}
                secureTextEntry
                placeholder="Nhập mật khẩu"
                borderStyle="rounded-sm"
              />
            </Animated.View>
            <TouchableOpacity onPress={() => {}}>
              <Text className="mt-[20px] self-end !text-gray-600" underline>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
              <CustomButton
                title="Đăng Nhập"
                containerStyles="mt-[30px] bg-secondary"
                handlePress={() => router.push('/home')}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
              <Link href={{ pathname: '/sign-up' }} className="mx-auto mt-7">
                <View className="flex-row items-center">
                  <Text className="text-center font-pregular text-textPrimary">
                    Chưa có tài khoản? đăng ký ngay
                  </Text>
                  <View className="ml-2 rounded-full bg-secondary p-[10px]">
                    <AntDesign name="arrowright" size={16} color="#fff" />
                  </View>
                </View>
              </Link>
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SignIn;
