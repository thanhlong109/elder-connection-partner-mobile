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
    </Stack>
  );
};

export default ProfileLayout;
