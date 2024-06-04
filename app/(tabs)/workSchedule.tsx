import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Card, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import { Calendar } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import TaskItem from '~/components/TaskItem';
import { Task } from '~/types/Task.type';
import { TaskStatus } from '~/enums';

const tabMenu = [
  { id: 1, title: 'Hôm nay' },
  { id: 2, title: 'Tháng này' },
];

const fakeData: Task[] = [
  {
    userName: 'Nguyễn chiến Thắng',
    avatarUrl:
      'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/436495635_3382806075345023_6921021507996145601_n.jpg?stp=c0.40.100.100a_dst-jpg_p100x100&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGA5CQp991Z_AORFiOl2E7iOdDUApt-I5k50NQCm34jmfHUmMWYA2Iu_tex7Ma2fgmZXttIt5RPmyxArMWCpf1r&_nc_ohc=1UrFi6XyAzkQ7kNvgEBKM_S&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan4-3.fna&cb_e2o_trans=t&oh=00_AYDwR3HBIVOg9Pn410EyAMteIJxAL6BTOpwNxVZY7vK0cA&oe=665B8428',
    startTime: '18 giờ 30',
    endTime: '23 giờ 30',
    status: TaskStatus.WAIT,
  },
  {
    userName: 'Nguyễn chiến Thắng',
    startTime: '18 giờ 30',
    avatarUrl:
      'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/436495635_3382806075345023_6921021507996145601_n.jpg?stp=c0.40.100.100a_dst-jpg_p100x100&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGA5CQp991Z_AORFiOl2E7iOdDUApt-I5k50NQCm34jmfHUmMWYA2Iu_tex7Ma2fgmZXttIt5RPmyxArMWCpf1r&_nc_ohc=1UrFi6XyAzkQ7kNvgEBKM_S&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan4-3.fna&cb_e2o_trans=t&oh=00_AYDwR3HBIVOg9Pn410EyAMteIJxAL6BTOpwNxVZY7vK0cA&oe=665B8428',
    endTime: '23 giờ 30',
    status: TaskStatus.DONE,
  },
  {
    userName: 'Nguyễn chiến Thắng',
    startTime: '18 giờ 30',
    avatarUrl:
      'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/436495635_3382806075345023_6921021507996145601_n.jpg?stp=c0.40.100.100a_dst-jpg_p100x100&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGA5CQp991Z_AORFiOl2E7iOdDUApt-I5k50NQCm34jmfHUmMWYA2Iu_tex7Ma2fgmZXttIt5RPmyxArMWCpf1r&_nc_ohc=1UrFi6XyAzkQ7kNvgEBKM_S&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan4-3.fna&cb_e2o_trans=t&oh=00_AYDwR3HBIVOg9Pn410EyAMteIJxAL6BTOpwNxVZY7vK0cA&oe=665B8428',
    endTime: '23 giờ 30',
    status: TaskStatus.CANCELLED,
  },
];

const workSchedule = () => {
  const [selectedTab, setSelectedTab] = useState(tabMenu[0]);
  const [marked, setMarked] = useState<MarkedDates>({
    ['2024-06-11']: { selected: true, marked: true, selectedColor: 'orange' },
    ['2024-06-10']: { selected: true, marked: true, selectedColor: 'orange' },
    ['2024-06-07']: { selected: true, marked: true, selectedColor: 'orange' },
  });
  return (
    <View backgroundColor="#fff">
      <StatusBar style="light" backgroundColor="#4045A3" />
      <SafeAreaView>
        <LinearGradient colors={['#4045A3', '#FFF']} className="h-full p-6">
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
          {selectedTab.id === tabMenu[0].id && (
            <View>
              <FlatList data={fakeData} renderItem={({ item }) => <TaskItem item={item} />} />
            </View>
          )}

          {selectedTab.id === tabMenu[1].id && (
            <View>
              <Calendar
                onDayPress={(day) => {
                  console.log(day);
                }}
                markedDates={marked}
              />
            </View>
          )}
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

export default workSchedule;
