import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon'

import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemeProvider } from '@react-navigation/native';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';

export default function TabsLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: true,
            tabBarLabelStyle: {fontFamily: 'PromptRegular'}
          }}>

          <Tabs.Screen
            name="index"
            
            options={{
              title: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="chat"
            
            options={{
              title: 'Chat',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} color={color} />
              )
            }}
          />

          <Tabs.Screen
            name="image"
            options={{
              title: 'Image',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'image' : 'image-outline'} color={color} />
              ),
            }}
          /> 

          <Tabs.Screen
            name="settings-navigator"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
              ),
            }}
          />        
          
        </Tabs>
    );
}