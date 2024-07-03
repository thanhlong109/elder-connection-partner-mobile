import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import { Calendar } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import TaskItem from '~/components/TaskItem';
import { TaskStatus } from '~/enums';
import Animated, { FadeInDown } from 'react-native-reanimated';

const tabMenu = [
  { id: 1, title: 'Hôm nay' },
  { id: 2, title: 'Tháng này' },
];
export interface Task {
  userName: string;
  avatarUrl: string;
  endTime: string;
  startTime: string;
  status: TaskStatus;
}
const fakeData: Task[] = [
  {
    userName: 'Nguyễn Thành Long',
    avatarUrl:
      'https://lh3.googleusercontent.com/ogw/AF2bZygU6ueqyuEIc4AIljcU5vim9mBJAZFqQDSQuWCxGHs43w=s64-c-mo',
    startTime: '10 giờ 30',
    endTime: '18 giờ 30',
    status: TaskStatus.WAIT,
  },
  {
    userName: 'Nguyễn Thành Long',
    startTime: '10 giờ 30',
    avatarUrl:
      'https://lh3.googleusercontent.com/ogw/AF2bZygU6ueqyuEIc4AIljcU5vim9mBJAZFqQDSQuWCxGHs43w=s64-c-mo',
    endTime: '18 giờ 30',
    status: TaskStatus.DONE,
  },
  // {
  //   userName: 'Nguyễn Thành Long',
  //   startTime: '18 giờ 30',
  //   avatarUrl:
  //     'https://lh3.googleusercontent.com/ogw/AF2bZygU6ueqyuEIc4AIljcU5vim9mBJAZFqQDSQuWCxGHs43w=s64-c-mo',
  //   endTime: '23 giờ 30',
  //   status: TaskStatus.CANCELLED,
  // },
];

const workSchedule = () => {
  const [selectedTab, setSelectedTab] = useState(tabMenu[0]);
  const [marked, setMarked] = useState<MarkedDates>({
    ['2024-06-11']: { selected: true, marked: true, selectedColor: 'orange' },
    ['2024-06-10']: { selected: true, marked: true, selectedColor: 'orange' },
    ['2024-06-07']: { selected: true, marked: true, selectedColor: 'orange' },
  });
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
            <View>
              <FlatList
                data={fakeData}
                renderItem={({ item, index }) => (
                  <Animated.View
                    entering={FadeInDown.delay(index * 200)
                      .duration(1000)
                      .springify()}>
                    <TaskItem item={item} />
                  </Animated.View>
                )}
              />
            </View>
          )}

          {selectedTab.id === tabMenu[1].id && (
            <Animated.View className="p-6" entering={FadeInDown.duration(1000).springify()}>
              <Calendar
                onDayPress={(day) => {
                  console.log(day);
                }}
                markedDates={marked}
              />
            </Animated.View>
          )}
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

export default workSchedule;
