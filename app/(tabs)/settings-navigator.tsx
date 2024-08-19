import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import SettingsScreen from "../(settings)/settings";
import DataListScreen from "../(settings)/data-list";

import { personalities } from "@/constants/PersonalityConfig";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useCallback } from "react";
import { setParam } from "@/store/settingsSlice";

const Stack = createStackNavigator();

export type DataListParamList = {
  PersonalityListScreen: { title: string; data: any[] } | undefined;
  SettingsScreen: { title?: string } | undefined;
};

export default function SettingsNavigator() {
  const dispatch = useAppDispatch();
  
  const personality: string = useAppSelector((state) => state.settings.personality);

  const navigate = useNavigation<StackNavigationProp<DataListParamList>>();

  const updateValue = useCallback((key: string, value: any) => {
    try {
      dispatch(setParam({ key, value }));
      navigate.navigate("SettingsScreen");
    } catch (err) {
      console.log(err);
    }
  }, []);

  const SettingsComponent = () => <SettingsScreen title="Settings" />;
  const PersonalityComponent = () => (
    <DataListScreen
      title="Select a personality"
      data={personalities}
      updateValue={(value: any) => updateValue("personality", value)}
      selectedValue={personality}
    />
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
