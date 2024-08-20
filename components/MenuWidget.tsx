import {
  GestureResponderEvent,
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "./ThemedText";

import { Colors } from "@/constants/Colors";
import { ReactElement } from "react";

export interface MenuWidgetProps {
  title: string;
  subTitle?: string;
  backgroundImage?: ReactElement;
  onPress?: ((event: GestureResponderEvent) => void) & (() => void);
}

export default function MenuWidgetItem({
  title,
  subTitle,
  backgroundImage,
  onPress,
}: MenuWidgetProps) {
  const colorScheme = useColorScheme();
  const colorTheme = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {backgroundImage && <View>{backgroundImage}</View>}
        <View style={styles.textContent}>
          <ThemedText
            type="heading1"
            numberOfLines={1}
            style={{ color: colorTheme.text }}
          >
            {title}
          </ThemedText>
          {subTitle && (
            <ThemedText
              type="subtitleHeader"
              numberOfLines={2}
              style={{ color: colorTheme.text }}
            >
              {subTitle}
            </ThemedText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    borderWidth: 0.5,
    borderRadius: 5,
    marginVertical: 10
  },
  textContent: {
    padding: 15,
    borderTopWidth: 0.5,
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
});
