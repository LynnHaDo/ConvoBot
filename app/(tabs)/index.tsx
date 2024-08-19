import { View, StyleSheet, useColorScheme, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";

import { Colors } from "@/constants/Colors";

export default function Index() {
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
      headerTitle="Welcome back"
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
