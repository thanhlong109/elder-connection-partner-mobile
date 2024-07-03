import { AntDesign } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';

import { Container } from '~/components/Container';
import CustomButton from '~/components/CustomButton';
import { images } from '~/constants/images';
import { setSignInRespone } from '~/slices/accountSlice';
import { loadToken } from '~/utils/auth';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const load = async () => {
      const loadedToken = await loadToken();
      if (loadedToken) {
        dispatch(setSignInRespone(loadedToken));
        router.push('/home');
      }
    };
    load();
  }, []);
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}>
        <View className="max-h-[80%] flex-1 items-center gap-16 bg-white px-8 py-6">
          <Animated.View
            entering={FadeInUp.duration(2000).springify()}
            className="h-[150px] w-[150px] items-center justify-center rounded-full bg-primary shadow-lg">
            <Image source={images.logo} className="h-[75px] w-[83px]" resizeMode="contain" />
          </Animated.View>
          <View>
            <Animated.Text
              entering={FadeInDown.duration(1000).springify()}
              className="mb-10 text-center font-psemibold text-3xl tracking-wider text-black/80">
              Elder Connection Partner
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="text-center font-pregular text-xl tracking-widest text-black/80">
              Hãy biến thời gian rảnh thành thu nhập!
            </Animated.Text>
          </View>
          <View className="w-full">
            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
              <CustomButton
                containerStyles="w-full mb-6"
                title="Bắt đầu"
                textStyles="text-xl"
                handlePress={() => router.push('sign-up')}
              />
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
              <Link href={{ pathname: '/sign-in' }} className="mx-auto">
                <View className="flex-row items-center">
                  <Text className="text-center">Đã có tài khoản đăng nhập ngay</Text>
                  <View className="ml-2 rounded-full bg-primary p-[10px]">
                    <AntDesign name="arrowright" size={16} color="#fff" />
                  </View>
                </View>
              </Link>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
