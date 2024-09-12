import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import SettingsScreen from "../(settings)/settings";
import DataListScreen from "../(settings)/data-list";

import {
  moods,
  personalities,
  responseSizes,
} from "@/constants/SettingsConfig";
import { StackRouter, useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useCallback } from "react";
import { setParam } from "@/store/settingsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdvancedSettingsScreen from "../(settings)/advanced-settings";
import InputScreen from "../(settings)/input-screen";

const Stack = createStackNavigator();

export type DataListParamList = {
  PersonalityListScreen: { title: string; data: any[] } | undefined;
  MoodListScreen: { title: string; data: any[] } | undefined;
  ResponseSizeScreen: { title: string; data: any[] } | undefined;
  AdvancedSettingsScreen: { title: string } | undefined;
  InputScreen: { id: string; title: string; description: string; min?: number; max?: number; type?: string; initialValue?: number; updateValue?: (value: any) => void }
  | undefined;
  SettingsScreen: { title?: string } | undefined;
};

export default function SettingsNavigator() {
  const dispatch = useAppDispatch();

  const personality = useAppSelector((state) => state.settings.personality);

  const mood = useAppSelector((state) => state.settings.mood);

  const responseSize = useAppSelector((state) => state.settings.responseSize);

  const navigate = useNavigation<StackNavigationProp<DataListParamList>>();

  const updateValue = useCallback(async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, value);
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

  const MoodComponent = () => (
    <DataListScreen
      title="Select a mood"
      data={moods}
      updateValue={(value: any) => updateValue("mood", value)}
      selectedValue={mood}
    />
  );

  const ResponseSizeComponent = () => (
    <DataListScreen
      title="Select the length of response"
      data={responseSizes}
      updateValue={(value: any) => updateValue("responseSize", value)}
      selectedValue={responseSize}
    />
  );

  const AdvancedSettingsComponent = () => (
    <AdvancedSettingsScreen title="Advanced settings" />
  );

  const InputComponent = () => <InputScreen />

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

      <Stack.Screen name="MoodListScreen" component={MoodComponent} />

      <Stack.Screen
        name="ResponseSizeScreen"
        component={ResponseSizeComponent}
      />

      <Stack.Screen
        name="AdvancedSettingsScreen"
        component={AdvancedSettingsComponent}
      />

      <Stack.Screen name={'InputScreen'} component={InputComponent}/>
    </Stack.Navigator>
  );
}
