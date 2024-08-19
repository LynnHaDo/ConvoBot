import {
  View,
  StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { useState, useCallback, useEffect, useRef } from "react";

import { makeChatRequest } from "@/utils/gptUtils";

import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";

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
import InputContainer from "@/components/InputContainer";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useHeaderHeight } from '@react-navigation/elements'

export default function ChatScreen() {
  const flatList = useRef<FlatList<any> | null>();
  const colorScheme = useColorScheme();
  const colorTheme = Colors[colorScheme ?? "light"];

  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const headerHeight = useHeaderHeight();

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
          <Ionicons name="trash-bin-outline" size={24} color={Colors.danger} />
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

    const text = messageText;

    try {
      setLoading(true);
      addMessage({
        role: "user",
        content: messageText,
      });
      setMessageText("");
      setConversation([...getConversation()]);
      await makeChatRequest();
    } catch (error) {
      console.log(error);
      setMessageText(text);
    } finally {
      setConversation([...getConversation()]);
      setLoading(false);
    }
  }, [messageText]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={headerHeight + 10}
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
        
        <InputContainer onChangeText={(text: string) => setMessageText(text)}
                        message={messageText}
                        sendMessage={sendMessage}
                        colorTheme={colorTheme}
                        placeholder={"Start a conversation..."}/>
        
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
