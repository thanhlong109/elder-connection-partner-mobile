import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Carousel, PageControl, Text, View } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import { images } from '~/constants/images';

const items = [
  {
    img: images.home.home2,
    title: 'Cập nhật hồ sỡ',
    desc: 'Hãy bổ sung thêm thông tin để bắt đầu làm việc nhé!',
    href: '',
    buttonTitle: 'Bổ sung hồ sơ',
  },
  {
    img: images.home.home1,
    title: 'Bài kiểm tra đầu vào',
    desc: 'Hãy xem bạn có bao nhiêu kỹ năng và tình yêu dành cho việc chăm sóc người cao tuổi nhé !',
    href: '',
    buttonTitle: 'Bắt đầu ngay',
  },
];

const home = () => {
  return (
    <View className="h-full bg-white">
      <StatusBar backgroundColor="#FFF" style="dark" />
      <Image
        source={images.bgShape.bgShape4}
        className="absolute right-0 top-0 h-[200px] w-2/3"
        resizeMode="stretch"
      />
      <SafeAreaView className="flex-1">
        <View useSafeArea className="p-6">
          <Text className="font-psemibold text-4xl tracking-wider text-[#333]">Elder</Text>
          <Text className="font-psemibold text-4xl tracking-wider text-[#333]">Connector</Text>
          <Text className="font-pmedium text-base italic !text-[#B4A4A4]">
            At Your Door, Love Restored
          </Text>
          <Text className="font-pmedium text-base italic !text-[#B4A4A4]">
            Elder Connection - Life's Affection.
          </Text>
          <View>
            <Carousel animated pagingEnabled autoplay className="mt-1" pageControlPosition="under">
              {items.map((item, index) => (
                <View key={index} className=" p-6">
                  <Card enableShadow elevation={5} className="relative gap-6 p-6" center>
                    <Image source={item.img} className="h-[230px] w-[230px]" />
                    <View>
                      <Text className="font-psemibold text-lg" center>
                        {item.title}
                      </Text>
                      <Text className="font-pregular text-base" center>
                        {item.desc}
                      </Text>
                    </View>
                    <Button backgroundColor={colors.primary} onPress={() => {}}>
                      <Text>{item.buttonTitle}</Text>
                    </Button>
                    <View
                      className="absolute left-1/2 top-0 h-12 w-12 -translate-y-1/2 rounded-full !bg-primary"
                      center>
                      <Text className="  !text-center  text-4xl !text-white">{index + 1}</Text>
                    </View>
                  </Card>
                </View>
              ))}
            </Carousel>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default home;
