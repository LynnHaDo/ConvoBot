import {
  View,
  StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";

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
import { useAppSelector } from "@/store/store";
import { advancedSettings } from "@/constants/SettingsConfig";

export default function ChatScreen() {
  const flatList = useRef<FlatList<any> | null>();
  const colorScheme = useColorScheme();
  const colorTheme = Colors[colorScheme ?? "light"];

  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const headerHeight = useHeaderHeight();
  
  /** Model config */
  const {personality, mood, responseSize, advanced} = useAppSelector((state) => state.settings);
  
  /** Parse chat options before inputting to the model */
  const chatOptions = useMemo(() => {
    const options: {[key: string]: number} = {};

    for (let i = 0; i < advancedSettings.length; i++) {
        const option = advancedSettings[i];
        const id = option.id;

        let value = advanced[id];
        if (value == undefined || value == null) {
            continue;
        }

        if (option.type === 'number') {
            value = parseFloat(value)
        } else if (option.type === 'integer') {
            value = parseInt(value)
        }

        options[id] = value;
    }

    return options;
  }, [advancedSettings, advanced])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ThemedButton
          type="transparent"
          onPress={() => {
            setConversation([]);
            resetConversation('chat', {personality: personality, mood: mood, responseSize: responseSize});
          }}
        >
          <Ionicons name="trash-bin-outline" size={24} color={Colors.danger} />
        </ThemedButton>
      ),
    });
  }, [personality, mood, responseSize]);

  /**
   * Initialize conversation with system setup for ChatGPT
   */
  useEffect(() => {
    resetConversation('chat', {personality: personality, mood: mood, responseSize: responseSize});
    setConversation([]);
  }, [personality, mood, responseSize]);

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
      await makeChatRequest(chatOptions);
    } catch (error) {
      setMessageText(text);
    } finally {
      setConversation([...getConversation()]);
      setLoading(false);
    }
  }, [messageText, chatOptions]);

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
