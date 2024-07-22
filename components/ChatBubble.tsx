import {
  StyleSheet,
  View,
  ViewStyle,
  Image,
} from "react-native";
import { ThemedText } from "./ThemedText";

import { Colors } from "@/constants/Colors";

export type ChatBubbleProps = {
  content?: string;
  type: string;
};

export function ChatBubble({ content, type }: ChatBubbleProps) {
  const bubbleStyle = { ...styles.container };
  const wrapperStyle = { ...styles.wrapper };

  if (type === "assistant") {
    bubbleStyle.backgroundColor = Colors.bubble.assistant.background;
    wrapperStyle.justifyContent = "flex-start";
  }

  return (
    <View style={wrapperStyle}>
      {content && (
        <View style={bubbleStyle}>
          <ThemedText style={styles.textWrapper}>{content}</ThemedText>
        </View>
      )}
      {type === "loading" && (
        <Image
          source={require("../assets/images/loading.gif")}
          style={styles.loadingGif}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  } as ViewStyle,
  container: {
    backgroundColor: Colors.bubble.user.background,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    maxWidth: "90%",
  },
  textWrapper: {
    color: Colors.bubble.user.text,
  },
  loadingGif: {
    height: 20,
    width: 80
  }
});
