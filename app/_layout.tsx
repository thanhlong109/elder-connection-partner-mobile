import '../global.css';

import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { store } from '~/store';
import { Provider } from 'react-redux';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
  });

  console.log(fontsLoaded);
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  SplashScreen.hideAsync();
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'ios' }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'ios' }} />
        <Stack.Screen name="(profiles)" options={{ headerShown: false, animation: 'ios' }} />
        <Stack.Screen name="(action)" options={{ headerShown: false, animation: 'ios' }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
