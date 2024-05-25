import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { SignInForm } from '~/types/auth.type';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '~/components/CustomButton';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import FormField from '~/components/FormField';
import { Container } from '~/components/Container';

const SignUp = () => {
  const [form, setform] = useState<SignInForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <Container>
      <ScrollView contentContainerStyle={{ justifyContent: 'center' }} className="max-h-[80%] p-6">
        <View>
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="font-psemibold text-primary mb-5 text-4xl">
            Đăng Ký
          </Animated.Text>

          <Animated.View entering={FadeInDown.duration(1000).springify()}>
            <FormField
              handleChangeText={(value) => setform({ ...form, email: value })}
              value={form.email}
              placeholder="Nhập địa chỉ email"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
            <FormField
              handleChangeText={(value) => setform({ ...form, password: value })}
              value={form.password}
              secureTextEntry
              placeholder="Nhập mật khẩu"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
            <FormField
              handleChangeText={(value) => setform({ ...form, confirmPassword: value })}
              value={form.confirmPassword}
              secureTextEntry
              placeholder="Nhập lại mật khẩu"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
            <CustomButton
              title="Đăng Ký"
              containerStyles="mt-[70px] bg-secondary"
              handlePress={() => router.push('/sign-in')}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
            <Link href={{ pathname: '/sign-in' }} className="mx-auto mt-7">
              <View className="flex-row items-center">
                <Text className="text-textPrimary text-center">Đã có tài khoản đăng nhập ngay</Text>
                <View className="bg-secondary ml-2 rounded-full p-[10px]">
                  <AntDesign name="arrowright" size={16} color="#fff" />
                </View>
              </View>
            </Link>
          </Animated.View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignUp;
