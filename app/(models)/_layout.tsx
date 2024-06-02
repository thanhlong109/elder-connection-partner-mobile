import { Stack } from 'expo-router';
import React from 'react';

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="camera-model"
        options={{
          presentation: 'modal',
          headerShown: false,
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
