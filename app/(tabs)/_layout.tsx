import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarLabelStyle: { fontFamily: "WorkSans-Regular" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"
              }
              color={color}
            />
          ),
          headerShown: true
        }}
      />

      <Tabs.Screen
        name="image"
        options={{
          title: "Image",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "image" : "image-outline"}
              color={color}
            />
          ),
          headerShown: true
        }}
      />

      <Tabs.Screen
        name="settings-navigator"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
          headerShown: false
        }}
      />
    </Tabs>
  );
}
