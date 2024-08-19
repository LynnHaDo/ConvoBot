import { View, StyleSheet, useColorScheme, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";

import DataItem from "@/components/DataItem";
import { Layout } from "@/constants/Layout";

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";

import { DataListParamList } from "../(tabs)/settings-navigator";
import { personalities } from "@/constants/PersonalityConfig";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useAppSelector } from "@/store/store";

export interface SettingsScreenProps {
  title: string;
}

export default function SettingsScreen({ title }: SettingsScreenProps) {
  const personality: string = useAppSelector((state) => state.settings.personality);

  const colorScheme = useColorScheme();
  const navigation = useNavigation<StackNavigationProp<DataListParamList>>();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.theme.black,
        dark: Colors.theme.yellow,
      }}
      headerImage={
        <Image
          source={require("@/assets/images/bg_settings.jpg")}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }
      headerTitle={title}
    >
      <View
        style={{
          ...styles.container,
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
      >
        <DataItem
          title="Personality"
          subTitle={personality}
          type="link"
          onPress={() =>
            navigation.navigate("PersonalityListScreen", {
              title: "Personality modes",
              data: personalities
            })
          }
        />

        <DataItem
          title="Mood"
          subTitle="Change the mood of the model"
          type="link"
          onPress={() => console.log("mood pressed")}
        />

        <DataItem
          title="Model"
          subTitle="Change the model"
          type="link"
          onPress={() => console.log("model pressed")}
        />
        <StatusBar style="auto"></StatusBar>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  headerImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
