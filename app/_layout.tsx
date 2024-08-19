import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import { Stack } from "expo-router";

import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        WorkSansRegular: require('../assets/fonts/WorkSans-Regular.ttf'),
        WorkSansLight: require('../assets/fonts/WorkSans-Light.ttf'),
        WorkSansMedium: require('../assets/fonts/WorkSans-Medium.ttf'),
        WorkSansSemiBold: require('../assets/fonts/WorkSans-SemiBold.ttf'),
        WorkSansBold: require('../assets/fonts/WorkSans-Bold.ttf'),
        'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'WorkSans-Light': require('../assets/fonts/WorkSans-Light.ttf'),
        'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
        'WorkSans-SemiBold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
        'WorkSans-Bold': require('../assets/fonts/WorkSans-Bold.ttf')
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }


  return (
    <Provider store={store}>
    <ThemeProvider value = {colorScheme === 'dark'? DarkTheme : DefaultTheme}>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        </Stack>
    </ThemeProvider>
    </Provider>
  );
}
