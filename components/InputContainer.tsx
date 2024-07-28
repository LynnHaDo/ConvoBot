import { TextInput, View, StyleSheet } from "react-native";
import { ThemedButton } from "./ThemedButton";
import { Feather } from "@expo/vector-icons";

import { Layout } from "@/constants/Layout";

export default function InputContainer(props: any) {
    const { onChangeText, message, sendMessage, colorTheme, placeholder } = props;

    return (
        <View style={styles.container}>
          <TextInput
            style={styles.textbox}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={message}
          />

          <ThemedButton type="fill" onPress={sendMessage}>
            <Feather name="send" size={24} color={colorTheme.buttonText} />
          </ThemedButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: Layout.padding,
    },
    textbox: {
        fontFamily: "PromptRegular",
        flex: 1,
    }
  });