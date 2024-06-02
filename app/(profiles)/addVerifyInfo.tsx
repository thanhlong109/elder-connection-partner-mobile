import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, Text, View } from 'react-native-ui-lib';
import { router } from 'expo-router';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ScrollView } from 'react-native';
import ImagePickerOption from '~/components/imagePickerOption';
import { images } from '~/constants/images';
import { TouchableOpacity } from 'react-native';
import colors from '~/constants/colors';

const AddVerifyInfo = () => {
  const [cccdFront, setCccdFront] = useState<string | undefined>(undefined);
  const [cccdBack, setCccdBack] = useState<string | undefined>(undefined);
  const [gxnct, setGxnct] = useState<string | undefined>(undefined);
  const [xyllFront, setxyllFront] = useState<string | undefined>(undefined);
  const [xyllBack, setxyllBack] = useState<string | undefined>(undefined);
  const ref = useRef<TouchableOpacity>(null);
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#4045A3" style="light" />
      <LinearGradient colors={['#4045A3', '#FFF']} className=" h-full w-full">
        <View row className=" items-center justify-between p-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#858DCB]">
            <AntDesign name="left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text className="font-pbold text-xl !text-white ">Bổ xung hồ sơ</Text>
          <View />
        </View>

        <ScrollView scrollEnabled>
          <View className="gap-6 p-6 !pb-[50px]">
            <Card backgroundColor="#fff">
              <View className="m-4">
                <View className="!bg-gray-F2 p-4">
                  <View row className="items-center justify-between">
                    <Text className="font-psemibold text-base">Mặt sau CCCD</Text>
                    <ImagePickerOption
                      onImageSelected={(e) => setCccdFront(e)}
                      buttonContent={
                        <View className="!rounded-lg bg-white p-3">
                          <MaterialCommunityIcons
                            name="camera-plus-outline"
                            size={24}
                            color="black"
                          />
                        </View>
                      }
                    />
                  </View>

                  <View center className="mt-4 w-full">
                    <Image
                      source={cccdFront ? { uri: cccdFront } : images.empty}
                      className="h-[150px] w-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View className="my-5 h-[1px] w-full bg-gray-C5" />

                <View className="!bg-gray-F2 p-4">
                  <View row className="items-center justify-between">
                    <Text className="font-psemibold text-base">Mặt sau CCCD</Text>
                    <ImagePickerOption
                      onImageSelected={(e) => setCccdBack(e)}
                      buttonContent={
                        <View className="!rounded-lg bg-white p-3">
                          <MaterialCommunityIcons
                            name="camera-plus-outline"
                            size={24}
                            color="black"
                          />
                        </View>
                      }
                    />
                  </View>

                  <View center className="mt-4 w-full">
                    <Image
                      source={cccdBack ? { uri: cccdBack } : images.empty}
                      className="h-[150px] w-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <View className="my-5 h-[1px] w-full bg-gray-C5" />

                <View className="!bg-gray-F2 p-4">
                  <View row className="items-center justify-between">
                    <Text className="font-psemibold text-base">Giấy xác nhận cư trú</Text>
                    <ImagePickerOption
                      onImageSelected={(e) => setGxnct(e)}
                      buttonContent={
                        <View className="!rounded-lg bg-white p-3">
                          <MaterialCommunityIcons
                            name="camera-plus-outline"
                            size={24}
                            color="black"
                          />
                        </View>
                      }
                    />
                  </View>

                  <View center className="mt-4 w-full">
                    <Image
                      source={gxnct ? { uri: gxnct } : images.empty}
                      className="h-[150px] w-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <View className="my-5 h-[1px] w-full bg-gray-C5" />

                <View className="!bg-gray-F2 p-4">
                  <View row className="items-center justify-between">
                    <Text className="font-psemibold text-base">Mặt trước giấy sơ yếu lý lịch</Text>
                    <ImagePickerOption
                      onImageSelected={(e) => setxyllFront(e)}
                      buttonContent={
                        <View className="!rounded-lg bg-white p-3">
                          <MaterialCommunityIcons
                            name="camera-plus-outline"
                            size={24}
                            color="black"
                          />
                        </View>
                      }
                    />
                  </View>

                  <View center className="mt-4 w-full">
                    <Image
                      source={xyllFront ? { uri: xyllFront } : images.empty}
                      className="h-[150px] w-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>

                {/*  */}
                <View className="my-5 h-[1px] w-full bg-gray-C5" />

                <View className="!bg-gray-F2 p-4">
                  <View row className="items-center justify-between">
                    <Text className="font-psemibold text-base">Mặt sau giấy sơ yếu lý lịch</Text>
                    <ImagePickerOption
                      onImageSelected={(e) => setxyllBack(e)}
                      buttonContent={
                        <View className="!rounded-lg bg-white p-3">
                          <MaterialCommunityIcons
                            name="camera-plus-outline"
                            size={24}
                            color="black"
                          />
                        </View>
                      }
                    />
                  </View>

                  <View center className="mt-4 w-full">
                    <Image
                      source={xyllBack ? { uri: xyllBack } : images.empty}
                      className="h-[150px] w-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <Button className="mt-4" fullWidth backgroundColor={colors.secondary.DEFAULT}>
                  <Text className="font-psemibold !text-white">Gửi hồ sơ</Text>
                </Button>
              </View>

              {/*  */}
            </Card>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AddVerifyInfo;
