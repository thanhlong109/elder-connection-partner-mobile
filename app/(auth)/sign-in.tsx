import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import FormField from '~/components/FormField';
import { SignUpForm } from '~/types/auth.type';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '~/components/CustomButton';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Container } from '~/components/Container';

const SignIn = () => {
  const [form, setform] = useState<SignUpForm>({
    email: '',
    password: '',
  });
  return (
    <>
      <Container>
        <View className="mb-[10%] justify-end p-6">
          <Animated.Text
            entering={FadeInDown.duration(1000).springify()}
            className="font-psemibold text-primary mb-5 text-4xl">
            Đăng Nhập
          </Animated.Text>

          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
            <FormField
              handleChangeText={(value) => setform({ ...form, email: value })}
              value={form.email}
              placeholder="Nhập địa chỉ email"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
            <FormField
              handleChangeText={(value) => setform({ ...form, password: value })}
              value={form.password}
              secureTextEntry
              placeholder="Nhập mật khẩu"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
            <CustomButton
              title="Đăng Nhập"
              containerStyles="mt-[60px] bg-secondary"
              handlePress={() => router.push('/home')}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
            <Link href={{ pathname: '/sign-up' }} className="mx-auto mt-7">
              <View className="flex-row items-center">
                <Text className="font-pregular text-textPrimary text-center">
                  Chưa có tài khoản? đăng ký ngay
                </Text>
                <View className="bg-secondary ml-2 rounded-full p-[10px]">
                  <AntDesign name="arrowright" size={16} color="#fff" />
                </View>
              </View>
            </Link>
          </Animated.View>
        </View>
      </Container>
    </>
  );
};

export default SignIn;
