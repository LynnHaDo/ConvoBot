import {
  View,
  StyleSheet,
  useColorScheme,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { useState, useCallback, useEffect, useRef } from "react";

import { makeRequest } from "@/utils/gptUtils";

import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";

import { Feather } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedButton } from "@/components/ThemedButton";

import {
  addMessage,
  getConversation,
  resetConversation,
} from "@/utils/conversationUtils";
import { ChatBubble } from "@/components/ChatBubble";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";

export default function ChatScreen() {
  const flatList = useRef<FlatList<any> | null>();
  const colorScheme = useColorScheme();
  const colorTheme = Colors[colorScheme ?? "light"];

  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ThemedButton
          type="transparent"
          onPress={() => {
            setConversation([]);
            resetConversation();
          }}
        >
          <ThemedText type="danger">Reset</ThemedText>
        </ThemedButton>
      ),
    });
  }, []);

  /**
   * Initialize conversation with system setup for ChatGPT
   */
  useEffect(() => {
    resetConversation();
    setConversation([]);
  }, []);

  const sendMessage = useCallback(async () => {
    if (messageText === "") {
      return;
    }

    try {
      setLoading(true);
      addMessage({
        role: "user",
        content: messageText,
      });
      setMessageText("");
      setConversation([...getConversation()]);
      await makeRequest();
    } catch (error) {
      console.log(error);
    } finally {
      setConversation([...getConversation()]);
      setLoading(false);
    }
  }, [messageText]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View
        style={{ ...styles.container, backgroundColor: colorTheme.background }}
      >
        <View style={styles.messageContainer}>
          {
            conversation.length == 0 && !loading &&
            <View style={styles.nothingContainer}>
                <AntDesign name="frowno" size={44} color={colorTheme.inactive} />
                <ThemedText style={{color: colorTheme.inactive, marginTop: 15}}>Oops... Nothing to show here.</ThemedText>
            </View>
          }
          {conversation.length > 0 && (
            <FlatList
              ref={(ref) => (flatList.current = ref)}
              onLayout={() => flatList.current?.scrollToEnd()}
              onContentSizeChange={() => flatList.current?.scrollToEnd()}
              style={styles.flatList}
              data={conversation}
              renderItem={(item) => {
                const conversationItem = item.item;
                const { role, content } = conversationItem;

                return role == "system" ? null : (
                  <ChatBubble content={content} type={role} />
                );
              }}
            />
          )}

          {loading && (
            <View style={styles.loadingContainer}>
              <ChatBubble type="loading" />
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textbox}
            placeholder="Start a conversation..."
            onChangeText={(text) => setMessageText(text)}
            value={messageText}
          />

          <ThemedButton type="fill" onPress={sendMessage}>
            <Feather name="send" size={24} color={colorTheme.buttonText} />
          </ThemedButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    padding: Layout.padding,
  },
  nothingContainer: {
    alignSelf: 'center',
    margin: 'auto',
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: "row",
    padding: Layout.padding,
  },
  textbox: {
    fontFamily: "PromptRegular",
    flex: 1,
  },
  flatList: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  loadingContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
  },
});
