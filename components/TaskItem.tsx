import React from 'react';
import { Avatar, Card, Text, View } from 'react-native-ui-lib';
import { Task } from '~/app/(tabs)/workSchedule';
import { TaskStatus } from '~/enums';

interface TaskItemProps {
  item: Task;
}

const TaskItem = ({ item }: TaskItemProps) => {
  return (
    <Card enableShadow elevation={7} className=" !mx-6 my-4 p-2">
      <View className="relative gap-4 !rounded-lg px-2 pb-2 pt-6" row>
        <Avatar source={{ uri: item.avatarUrl }} size={60} />
        <View centerV>
          <Text className="font-pmedium text-base">{item.userName}</Text>
          <Text className="font-pregular text-base">{`Thời gian: ${item.startTime} - ${item.endTime}`}</Text>
        </View>
        <View
          className={`absolute right-0 top-0 !rounded-full px-4 ${item.status === TaskStatus.DONE ? 'bg-green-B3' : item.status === TaskStatus.WAIT ? 'bg-secondary' : 'bg-red-500'}`}>
          <Text className="font-pregular !text-sm !text-white">
            {item.status === TaskStatus.DONE
              ? 'Đã xong'
              : item.status === TaskStatus.WAIT
                ? 'Đang chờ'
                : 'Đã hủy'}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default TaskItem;
