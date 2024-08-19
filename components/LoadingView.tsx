import { Colors } from "@/constants/Colors";
import { setParam } from "@/store/settingsSlice";
import { useAppDispatch } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";

import { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const StartUpScreen = () => {
  const dispatch = useAppDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const getSettings = async () => {
      try {
        const personality = await AsyncStorage.getItem("personality");

        if (personality) {
          dispatch(setParam({ key: "personality", value: personality }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setInitialized(true);
      }
    };

    getSettings();
  }, []);

  return initialized ? (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={Colors.theme.blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartUpScreen;
