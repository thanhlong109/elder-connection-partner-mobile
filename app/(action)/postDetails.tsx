import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import colors from '~/constants/colors';
import { DialogType, PostStatus } from '~/enums';
import { RootState } from '~/store';
import {
  getStringEnum,
  getStringPostStatusEnum,
  getTimeFromServiceStringEnum,
} from '~/utils/enumHelper';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useApplyPostMutation } from '~/services/postApi';
import LoadingModel from '~/components/LoadingModel';
import CustomDialog from '~/components/CustomDialog';
// import { useApplyPostMutation } from '~/services/postApi';

const postDetails = () => {
  const action = useSelector((state: RootState) => state.postSlice.viewPostDetails);
  const accountId = useSelector((state: RootState) => state.accountSlice.account.id);
  const [showDialong, setshowDialong] = useState(false);
  const {
    address,
    jobSchedule,
    serviceName,
    startTime,
    title,
    serviceId,
    postDescription,
    createAt,
    postStatus,
    customerFirstName,
    customerLastName,
    postId,
  } = action;
  console.log(serviceName);
  const getEndtime = (time: string) => {
    const parts = time.split(':');
    const t = parseInt(parts[0]) + getTimeFromServiceStringEnum(serviceId);
    return `${t.toString().padStart(2, '0')}:${parts[1]}:${parts[2]}`;
  };

  const [ApplyPost, { isError, isSuccess, isLoading, error }] = useApplyPostMutation();

  useEffect(() => {
    if (isSuccess) {
      setshowDialong(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError]);

  const openGoogleMaps = () => {
    const position: [number, number] = JSON.parse(address.addressDetail);
    const url = `https://www.google.com/maps/search/?api=1&query=${position[1]},${position[0]}`;
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  return (
    <View>
      <LoadingModel isloading={isLoading} />
      <CustomDialog
        visble={showDialong}
        setVisible={setshowDialong}
        type={isSuccess ? DialogType.SUCCESS : DialogType.ERROR}
        showCloseButton
        body={isSuccess ? 'Nhận việc thành công!' : 'Nhận việc thất bại!'}
        onDismiss={() => router.back()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="h-full w-full gap-10 px-5 pb-10">
          <View className="mt-6">
            <Animated.Text
              entering={FadeInDown.duration(1000).springify()}
              className="font-psemibold text-lg">
              Thông tin cơ bản
            </Animated.Text>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="mt-5 gap-4 rounded-md border-[1px] border-gray-300 p-4">
              <View className="gap-1">
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">Trạng thái:</Text>
                  <Text
                    className={` !rounded-sm ${postStatus == PostStatus.Public || postStatus == PostStatus.Posted ? '!bg-secondary' : postStatus == PostStatus.Accepted ? '!bg-[#468DE0]' : postStatus === PostStatus.Completed ? '!bg-primary' : '!bg-red-500'} px-2 py-1 font-pmedium text-sm !text-white`}>
                    {getStringPostStatusEnum(postStatus)}
                  </Text>
                </View>
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">Ngày đăng:</Text>
                  <Text className="font-plight text-base text-black/50">
                    {new Date(createAt).toLocaleDateString()}
                  </Text>
                </View>
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">Người đăng:</Text>
                  <Text className="font-plight text-base text-black/50">
                    {customerFirstName + ' ' + customerLastName}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>
          {/* vi tri lm viec */}
          <View>
            <Animated.Text
              entering={FadeInDown.duration(1000).springify()}
              className="font-psemibold text-lg">
              Vị trí làm việc
            </Animated.Text>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="mt-5 gap-4 rounded-md border-[1px] border-gray-300 p-4">
              <View className="gap-1">
                <View row centerV>
                  <Text flex className="font-pmedium text-base">
                    Địa điểm:
                  </Text>
                  <TouchableOpacity className="p-2" onPress={openGoogleMaps}>
                    <FontAwesome name="map-marker" size={28} color={colors.primary} />
                  </TouchableOpacity>
                </View>

                <Text flex className="line-clamp-1 font-plight text-base text-black/65">
                  {`${getStringEnum(address.homeType)} tại ${address.addressDescription}`}
                </Text>
              </View>
              <View className="gap-1">
                <Text className="font-pmedium text-base">Thông tin liên hệ</Text>
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">Họ tên:</Text>
                  <Text className="font-plight text-base text-black/50">{address.contactName}</Text>
                </View>
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">Số điện thoại:</Text>
                  <Text className="font-plight text-base text-black/50">
                    {address.contactPhone}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>

          {/* thong tin cong viec */}
          <View>
            <Animated.Text
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="font-psemibold text-lg ">
              Thông tin công việc
            </Animated.Text>
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="mt-5 gap-6 rounded-md border-[1px] border-gray-300 p-4">
              <View className="gap-2">
                <Text className="font-pmedium text-base">Thời gian làm việc</Text>
                <View className="gap-1">
                  <View className=" justify-between gap-1">
                    <Text className="font-plight text-base  text-black/90">
                      {jobSchedule.listDayWork}
                    </Text>
                  </View>

                  <View className="flex-row  gap-1">
                    <Text className="font-plight text-base text-black/55">Thời gian: </Text>
                    <Text className="font-plight text-base  text-black/90">{`${startTime} đến ${getEndtime(startTime)}`}</Text>
                  </View>
                </View>
              </View>

              <View className="gap-1">
                <Text className="font-pmedium text-base">Chi tiết công việc</Text>
                <View className="mt-2 justify-between gap-1">
                  <Text className="flex-1 font-plight text-base text-black/90">{title}</Text>
                  <View className="flex-row  gap-1">
                    <Text className="font-plight text-base text-black/55">Gói dịch vụ: </Text>
                    <Text className="font-plight text-base  text-black/90">{serviceName}</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          </View>

          {/* Ghi chu */}
          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
            <Text className="mb-2 font-psemibold text-lg ">Ghi chú </Text>
            <Text className="font-plight text-base  text-black/90">
              {postDescription === 'string' || postDescription.length === 0
                ? 'Không có ghi chú nào'
                : postDescription}
            </Text>
          </Animated.View>
          <Button
            onPress={() => {
              const aply = { connectorId: accountId, postId: postId };
              console.log(aply);

              ApplyPost(aply);
            }}
            backgroundColor={colors.primary}>
            <Text className="font-medium !text-white">Nhận việc</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default postDetails;
