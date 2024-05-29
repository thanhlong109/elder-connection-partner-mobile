import { Stack } from 'expo-router';
import React from 'react';

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="person-infor"
        options={{
          headerShown: true,
          animation: 'ios',
          title: 'Thông tin cá nhân',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
