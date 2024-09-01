import {
  View,
  StyleSheet,
  useColorScheme,
  Image,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";

import DataItem from "@/components/DataItem";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { DataListParamList } from "../(tabs)/settings-navigator";
import { advancedSettings } from "@/constants/SettingsConfig";

import { useAppSelector } from "@/store/store";
import { useEffect } from "react";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import Entypo from "@expo/vector-icons/Entypo";
import { Layout } from "@/constants/Layout";
import InputScreen from "./input-screen";

export interface AdvancedSettingsScreenProps {
  title: string;
}

export default function AdvancedSettingsScreen({
  title,
}: AdvancedSettingsScreenProps) {
  const advanced = useAppSelector((state) => state.settings.advanced);

  const colorScheme = useColorScheme();
  const navigation = useNavigation<StackNavigationProp<DataListParamList>>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerLeft: () => (
        <ThemedButton
          type="transparent"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Entypo name="chevron-thin-left" size={24} color="black" />
        </ThemedButton>
      ),
    });
  }, []);

  const getSubtitle = (screen: string): number => {
    if (!advanced[screen]) {
        return advancedSettings.find((item: any) => item.id === screen)!.default;
    }

    return advanced[screen];
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <DataItem
        title="Temperature"
        subTitle={getSubtitle('temperature').toString()}
        type="link"
        onPress={() => {
          navigation.navigate("TemperatureScreen", {
            ...advancedSettings[0],
            initialValue: getSubtitle('temperature')
          });
        }}
      />
      <DataItem
        title="Top P"
        subTitle={getSubtitle('top_p').toString()}
        type="link"
        onPress={() => {
          navigation.navigate("TopPScreen", {
            ...advancedSettings[1],
            initialValue: getSubtitle('top_p')
          });
        }}
      />
      <DataItem
        title="Max Tokens"
        subTitle={getSubtitle("max_tokens").toString()}
        type="link"
        onPress={() => {
          navigation.navigate("MaxTokensScreen", {
            ...advancedSettings[2],
            initialValue: getSubtitle('max_tokens')
          });
        }}
      />
      <DataItem
        title="Presence Penalty"
        subTitle={getSubtitle("presence_penalty").toString()}
        type="link"
        onPress={() => {
          navigation.navigate("PresencePenaltyScreen", {
            ...advancedSettings[3],
            initialValue: getSubtitle('presence_penalty')
          });
        }}
      />
      <DataItem
        title="FrequencyPenalty"
        subTitle={getSubtitle("frequency_penalty").toString()}
        type="link"
        onPress={() => {
          navigation.navigate("FrequencyPenaltyScreen", {
            ...advancedSettings[4],
            initialValue: getSubtitle('frequency_penalty')
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: Layout.padding,
  },
  headerImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
