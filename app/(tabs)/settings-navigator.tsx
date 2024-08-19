import { createStackNavigator } from "@react-navigation/stack";

import SettingsScreen from "../(settings)/settings";
import DataListScreen from "../(settings)/data-list";

import { personalities } from "@/constants/PersonalityConfig";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export type DataListParamList = {
  PersonalityListScreen: { title: string; data: any[] } | undefined;
};

export default function SettingsNavigator() {
  const SettingsComponent = () => <SettingsScreen title="Settings" />;
  const PersonalityComponent = () => (
    <DataListScreen title="Select a personality" data={personalities} />
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsComponent}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PersonalityListScreen"
        component={PersonalityComponent}
      />
    </Stack.Navigator>
  );
}
