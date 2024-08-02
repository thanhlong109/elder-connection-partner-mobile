import React, { useEffect, useState } from 'react';

import LottieView from 'lottie-react-native';
import { Button, Modal, Text, View } from 'react-native-ui-lib';
import { GetConnectorPost } from '~/types/post.type';
import { getTimeOnly } from '~/utils/date';
import * as Linking from 'expo-linking';
import { TaskDetails } from '~/app/(tabs)/workSchedule';
import { useAccountDetailsQuery } from '~/services/accountApi';

export interface TaskDetailsModelProps {
  visible: boolean;
  data?: GetConnectorPost;
  setdata: React.Dispatch<React.SetStateAction<TaskDetails>>;
}

const TaskDetailsModel = ({ visible, data, setdata }: TaskDetailsModelProps) => {
  const { data: cusData } = useAccountDetailsQuery(data?.post.customerId ?? '');
  const openGoogleMaps = () => {
    if (data) {
      const position: [number, number] = JSON.parse(data.locationWork);
      const url = `https://www.google.com/maps/search/?api=1&query=${position[1]},${position[0]}`;
      Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }
  };
  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View center className=" h-full w-full bg-[rgba(0,0,0,0.1)]">
        <View className="mx-10 !rounded-lg !bg-white px-6 pb-6 pt-4">
          <View>
            <Text center className="mb-3 font-pmedium  text-lg uppercase !text-blue-Text ">
              Thông tin ca làm
            </Text>
            <View row className="flex gap-2">
              <Text className="font-pmedium text-lg ">Khách hàng:</Text>
              <Text className="font-plight text-lg ">
                {cusData?.result.firstName + ' ' + cusData?.result.lastName}
              </Text>
            </View>
            <View row className="flex gap-2">
              <Text className="font-pmedium text-lg ">Số điện thoại:</Text>
              <Text className="font-plight text-lg ">{cusData?.result.accountPhone}</Text>
            </View>
            <View row className="flex gap-2">
              <Text className="font-pmedium text-lg ">Thời gian:</Text>
              <Text className="font-plight text-lg ">
                {getTimeOnly(new Date(data?.startDate ?? ''))}
              </Text>
            </View>
          </View>
          <View row>
            <Button onPress={() => openGoogleMaps()} className=" mx-4 mt-4 !rounded-md bg-primary">
              <Text className="font-pmedium text-lg !text-white">Xem vị trí</Text>
            </Button>
            <Button
              backgroundColor={'gray'}
              onPress={() => setdata({ visible: false, data: data })}
              className=" mx-4 mt-4 !rounded-md">
              <Text className="font-pmedium text-lg !text-white">Đóng</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskDetailsModel;
