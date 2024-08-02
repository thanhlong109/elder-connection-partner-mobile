import { MaterialIcons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import React from 'react';
import { Card, Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import colors from '~/constants/colors';
import { images } from '~/constants/images';
import { PostStatus } from '~/enums';
import { useAccountDetailsQuery } from '~/services/accountApi';
import { setViewPostDetail } from '~/slices/postSlice';
import { GetConnectorPost } from '~/types/post.type';
import { formatDateTime } from '~/utils/date';
import { getServiceTypeFromServiceStringEnum, getStringPostStatusEnum } from '~/utils/enumHelper';

interface ConnectorPostProps {
  item: GetConnectorPost;
}

const ConnectorPost = ({ item }: ConnectorPostProps) => {
  const { data } = useAccountDetailsQuery(item.post.customerId);
  const dispatch = useDispatch();
  return (
    <Card enableShadow elevation={7} className="relative m-4 p-4 ">
      <TouchableOpacity
      // onPress={() => {
      //   //dispatch(setViewPostDetail(item));
      //   router.push('postDetails');
      // }}
      >
        <Text className="font-pmedium text-lg">Chăm xóc người cao tuổi</Text>
        <Text
          className={`absolute -right-1 -top-1 !rounded-sm ${new Date() > new Date(item.endDate) ? '!bg-primary' : new Date() > new Date(item.startDate) ? '!bg-[#468DE0]' : '!bg-secondary'} px-2 py-1 font-pmedium text-sm !text-white`}>
          {new Date() > new Date(item.endDate)
            ? 'Đã xong'
            : new Date() > new Date(item.startDate)
              ? 'Đã nhận'
              : 'Đang làm'}
        </Text>
        <View className="mt-2 flex-row items-center gap-4">
          <MaterialIcons name="elderly" size={60} color={colors.primary} />
          <View flex>
            <View row>
              <View>
                <Text className="mt-2 font-plight text-base">
                  Họ Tên: {data?.result.firstName + ' ' + data?.result.lastName}
                </Text>
                <Text className="font-plight text-base">
                  Số điện thoại: {data?.result.accountPhone}
                </Text>
                <Text className="font-plight text-base">
                  Ngày bắt đầu: {formatDateTime(new Date(item.startDate))}
                </Text>
                <Text className="font-plight text-base">
                  Ngày kết thúc: {formatDateTime(new Date(item.endDate))}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="mt-1 w-full justify-end">
          <Text className=" self-end text-right font-plight text-sm italic">
            Ngày đăng: {new Date(data?.result.createAt ?? '').toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default ConnectorPost;
