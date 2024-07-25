import React, { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import FormField from '~/components/FormField';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '~/components/CustomButton';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { images } from '~/constants/images';
import { JwtDecoded, SignInRequest, SignInRespone } from '~/types/auth.type';
import { useDispatch } from 'react-redux';
import { useSignInMutation } from '~/services/accountApi';
import { setSignInRespone } from '~/slices/accountSlice';
import LoadingModel from '~/components/LoadingModel';
import { jwtDecode } from 'jwt-decode';
import { Role } from '~/enums';
import Toast from 'react-native-simple-toast';

const SignIn = () => {
  const dispatch = useDispatch();
  const [form, setform] = useState<SignInRequest>({
    accountEmail: '',
    accountPassword: '',
  });
  const [eror, seteror] = useState('');
  const [signIn, { isError, isLoading, isSuccess, data, error }] = useSignInMutation();

  useEffect(() => {
    if (isSuccess && data) {
      if (data.status == 401) {
        seteror(
          'Email xác nhận đã được gửi đến tài khoản email bạn đã đăng ký, vui lòng xác thực tài khoản để đăng nhập!'
        );
      } else {
        let tranform: SignInRespone = {
          expired: '',
          jwtRefreshToken: '',
          jwtToken: '',
          accountId: '',
        };
        if (
          'jwtToken' in data &&
          'expired' in data &&
          'jwtRefreshToken' in data &&
          'accountId' in data
        ) {
          tranform.expired = data.expired as string;
          tranform.jwtRefreshToken = data.jwtRefreshToken as string;
          tranform.jwtToken = data.jwtToken as string;
          tranform.accountId = data.accountId as string;
        }
        const decoded = jwtDecode<JwtDecoded>(tranform.jwtToken);
        if (
          decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === Role.CONNECTOR
        ) {
          dispatch(setSignInRespone(tranform));
          router.push('/home');
        } else {
          Toast.show(
            'Ứng dụng này chỉ được đăng nhập tài khoản connector, bạn vui lòng tải ứng dụng Elder Connection để đăng nhập nhé!',
            Toast.LONG
          );
        }
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      seteror('Tên đăng nhập hoặc mật khẩu không đúng!');
      console.log(error);
    }
  }, [isError]);

  const handleOnSubmit = () => {
    seteror('');
    console.log(form);
    signIn(form);
  };

  return (
    <>
      <View backgroundColor="#fff">
        <LoadingModel isloading={isLoading} />
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
          className="mb-[5%] p-6">
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
                handleChangeText={(value) => setform({ ...form, accountEmail: value })}
                value={form.accountEmail}
                placeholder="Nhập địa chỉ email"
                borderStyle="rounded-sm"
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
              <FormField
                handleChangeText={(value) => setform({ ...form, accountPassword: value })}
                value={form.accountPassword}
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
            <Text className="mt-5 font-pregular text-base !text-red-500">{eror}</Text>
            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
              <CustomButton
                title="Đăng Nhập"
                containerStyles="mt-[30px] bg-secondary"
                handlePress={handleOnSubmit}
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
