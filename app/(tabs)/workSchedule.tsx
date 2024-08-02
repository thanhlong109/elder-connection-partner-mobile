import React, { useEffect, useState } from 'react';
import { FlatList, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import { Calendar, DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import { useGetConnectorPostQuery } from '~/services/postApi';
import ConnectorPost from '~/components/ConnectorPost';
import { GetConnectorPost } from '~/types/post.type';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { images } from '~/constants/images';
import TaskDetailsModel, { TaskDetailsModelProps } from '~/components/TaskDetailsModel';

const tabMenu = [
  { id: 1, title: 'Đã nhận' },
  { id: 2, title: 'Xem lịch' },
];

export type CustomMarkedDate = MarkingProps & {
  data?: GetConnectorPost;
};

export type CustomMarkedDates = {
  [date: string]: CustomMarkedDate;
};
export interface TaskDetails {
  visible: boolean;
  data?: GetConnectorPost;
}
const WorkSchedule: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(tabMenu[0]);
  const accountId = useSelector((state: RootState) => state.accountSlice.account.id);
  const [items, setItems] = useState<GetConnectorPost[]>([]);
  const [marked, setMarked] = useState<CustomMarkedDates>({});
  const [task, settask] = useState<TaskDetails>({
    visible: false,
  });

  const { data, isSuccess } = useGetConnectorPostQuery(accountId);

  useEffect(() => {
    if (isSuccess && data && data.result) {
      setItems(data.result.items);
      setMarked(parseDates(data.result.items));
    }
  }, [isSuccess, data]);

  const parseDates = (schedules: GetConnectorPost[]): CustomMarkedDates => {
    return schedules.reduce((acc: CustomMarkedDates, schedule: GetConnectorPost) => {
      const dates = schedule.listDayWork.split('|');
      dates.forEach((date: string) => {
        acc[date] = {
          selected: true,
          marked: true,
          selectedColor: new Date() < new Date(date) ? 'orange' : 'green',
          data: schedule,
        };
      });
      return acc;
    }, {});
  };

  const onDayPress = (day: DateData) => {
    const date = day.dateString;
    if (marked[date]?.data) {
      settask({ visible: true, data: marked[date]?.data });
    }
  };

  return (
    <View backgroundColor="#4045A3">
      <SafeAreaView>
        <LinearGradient colors={['#4045A3', '#FFF', '#FFF']} className="h-full">
          <View className="p-6">
            <Text className="font-psemibold text-2xl !text-white">Lịch làm việc</Text>
            <View row className="mb-6 mt-6 gap-2">
              {tabMenu.map((tab) => (
                <TouchableOpacity
                  row
                  onPress={() => setSelectedTab(tab)}
                  key={tab.id}
                  center
                  className={`relative rounded-full p-1 ${selectedTab.id === tab.id ? 'bg-blue-BG' : 'bg-gray-100'}`}
                  flex>
                  <Text
                    className={`font-pmedium text-lg ${selectedTab.id === tab.id ? '!text-blue-Text' : '!text-textPrimary'}`}
                    center>
                    {tab.title}
                  </Text>
                  {tab.id === selectedTab.id && (
                    <View className="absolute right-2 !rounded-full bg-white p-1">
                      <AntDesign name="checkcircle" size={18} color={colors.blue.Text} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {selectedTab.id === tabMenu[0].id && (
            <View className="flex-1">
              <FlatList
                data={items}
                style={{ flex: 1 }}
                renderItem={({ item, index }) => (
                  <Animated.View
                    entering={FadeInDown.delay(index * 150)
                      .duration(1000)
                      .springify()}>
                    <ConnectorPost item={item} key={index} />
                  </Animated.View>
                )}
                ListEmptyComponent={() => (
                  <View flex center>
                    <Image
                      source={images.icons.empty2}
                      className="mt-[100px] h-[100px] w-[100px]"
                      resizeMode="contain"
                      tintColor={'gray'}
                    />
                    <Text className="font-plight text-xl !text-black-100">
                      Hiện không có công việc nào!
                    </Text>
                  </View>
                )}
              />
            </View>
          )}

          {selectedTab.id === tabMenu[1].id && (
            <Animated.View className="p-6" entering={FadeInDown.duration(1000).springify()}>
              <Calendar onDayPress={onDayPress} markedDates={marked as MarkedDates} />
              <TaskDetailsModel data={task.data} visible={task.visible} setdata={settask} />
            </Animated.View>
          )}
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

export default WorkSchedule;
