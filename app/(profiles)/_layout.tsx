import { Stack } from 'expo-router';
import React from 'react';

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="person-infor"
        options={{
          headerShown: false,
          animation: 'ios',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen
        name="finance"
        options={{
          headerShown: false,
          animation: 'ios',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen
        name="addVerifyInfo"
        options={{
          headerShown: false,
          animation: 'ios',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen
        name="weeklyReport"
        options={{
          headerShown: false,
          animation: 'ios',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
