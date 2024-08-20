import { View, StyleSheet, Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";

import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";

import MenuWidgetItem from "@/components/MenuWidget";

import { useNavigation } from "expo-router";
import { TabActions } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";

const textColors = ["#F2858E", "#079DD9", "#F2B807", "#F29472", "#F23030"];

export type MenuList = {
  ChatScreen: {} | undefined;
  ImageScreen: {} | undefined;
  SettingsNavigator: {} | undefined;
};

export default function Index() {
  const [colorIndex, setColorIndex] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(
      () => setColorIndex((i) => (i === textColors.length - 1 ? 0 : i + 1)),
      5000
    );
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.theme.black,
        dark: Colors.theme.yellow,
      }}
      headerImage={
        <Image
          source={require("@/assets/images/bg.jpg")}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>

        <ThemedText type="header" style={styles.headerText}>
          Hi human, I'm{" "}
          <ThemedText
            type="header"
            style={{
              ...styles.headerText,
            }}
          >
            ConvoBot
          </ThemedText>
        </ThemedText>
        <ThemedText type="subtitleHeader">How can I help you today?</ThemedText>
      </ThemedView>

      <ThemedView style={styles.contentContainer}>
      <MenuWidgetItem
        title="Chat with me"
        subTitle="Start a conversation with the virtual assistant"
        onPress={() => navigation.dispatch(TabActions.jumpTo("chat"))}
        backgroundImage={
          <Image
            source={require("@/assets/images/chat.png")}
            style={styles.menuImage}
            resizeMode="contain"
          />
        }
      />
      <MenuWidgetItem
        title="Generate images"
        subTitle="Give me a prompt, and I will generate 3 images for you"
        onPress={() => navigation.dispatch(TabActions.jumpTo("image"))}
        backgroundImage={
          <Image
            source={require("@/assets/images/image.png")}
            style={styles.menuImage}
            resizeMode="contain"
          />
        }
      />
      <MenuWidgetItem
        title="Customizations"
        subTitle="Customize the personality, mood, etc. of me"
        onPress={() => navigation.dispatch(TabActions.jumpTo("settings-navigator"))}
        backgroundImage={
          <Image
            source={require("@/assets/images/settings.png")}
            style={styles.menuImage}
            resizeMode="contain"
          />
        }
      />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  headerImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  headerText: {
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    width: "60%",
    marginVertical: 10,
  },
  menuImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
