import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        PromptRegular: require('../assets/fonts/Prompt-Regular.ttf'),
        PromptLight: require('../assets/fonts/Prompt-Light.ttf'),
        PromptBold: require('../assets/fonts/Prompt-Bold.ttf')
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
    <ThemeProvider value = {colorScheme === 'dark'? DarkTheme : DefaultTheme}>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        </Stack>
    </ThemeProvider>
  );
}
