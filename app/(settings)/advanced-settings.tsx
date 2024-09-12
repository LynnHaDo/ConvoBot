import { View, StyleSheet, useColorScheme, FlatList } from "react-native";
import { Colors } from "@/constants/Colors";

import DataItem from "@/components/DataItem";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { DataListParamList } from "../(tabs)/settings-navigator";
import { advancedSettings } from "@/constants/SettingsConfig";

import { useAppSelector } from "@/store/store";
import { useCallback, useEffect } from "react";

import { ThemedButton } from "@/components/ThemedButton";
import Entypo from "@expo/vector-icons/Entypo";
import { Layout } from "@/constants/Layout";

export interface AdvancedSettingsScreenProps {
  title: string;
}

export default function AdvancedSettingsScreen({
  title,
}: AdvancedSettingsScreenProps) {
  const { advanced } = useAppSelector((state) => state.settings);

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
  }, [advanced]);

  const getCurrentValue = (screen: string): number => {
    console.log(advanced)
    if (advanced[screen] == null || advanced[screen] == undefined) {
      return advancedSettings.find((item: any) => item.id === screen)!.default;
    }
    return advanced[screen];
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <FlatList
        data={advancedSettings}
        renderItem={(optionData) => {
          const option = optionData.item;
          const currentValue = getCurrentValue(option.id);

          return (
            <DataItem
              title={option.title}
              subTitle={currentValue.toString()}
              type="link"
              onPress={() => {
                navigation.navigate("InputScreen", {
                  id: option.id,
                  title: option.title,
                  description: option.description,
                  initialValue: currentValue,
                  min: option.min,
                  max: option.max,
                  type: option.type,
                });
              }}
            />
          );
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
