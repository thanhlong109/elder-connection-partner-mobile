import { Tabs } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '~/constants/colors';

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontFamily: 'Poppins-Regular',
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: colors.gray.C5,
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="post"
          options={{
            tabBarLabel: 'Nhận việc',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="work-outline" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="workSchedule"
          options={{
            tabBarLabel: 'Lịch làm việc',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="calendar" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size} color={color} />,
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
