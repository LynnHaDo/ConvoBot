import {
    View,
    StyleSheet,
    useColorScheme,
    KeyboardAvoidingView,
    FlatList,
    Image
  } from "react-native";
  import { useState, useCallback, useEffect, useRef } from "react";
  
  import { makeImageRequest } from "@/utils/gptUtils";
  
  import { Colors } from "@/constants/Colors";
  import { Layout } from "@/constants/Layout";
  
  import AntDesign from '@expo/vector-icons/AntDesign';
  import { ThemedButton } from "@/components/ThemedButton";
  
  import {
    resetConversation
  } from "@/utils/conversationUtils";
  import { ChatBubble } from "@/components/ChatBubble";
  import { useNavigation } from "@react-navigation/native";
  import { ThemedText } from "@/components/ThemedText";
  import InputContainer from "@/components/InputContainer";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useHeaderHeight } from '@react-navigation/elements'
  
  export default function ImageScreen() {
    const flatList = useRef<FlatList<any> | null>();
    const colorScheme = useColorScheme();
    const colorTheme = Colors[colorScheme ?? "light"];
  
    const [promptText, setPromptText] = useState("");
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
              resetConversation('image');
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
      resetConversation('image');
      setConversation([]);
    }, []);
  
    const sendMessage = useCallback(async () => {
      if (promptText === "") {
        return;
      }

      const text = promptText;
      const tempConversation = [...conversation, {role: 'user', content: text}]

      try {
        setLoading(true);
        setConversation(tempConversation)
        setPromptText("");

        const responseData = await makeImageRequest(promptText);
        const urls = responseData.map(i => ({role: 'assistant', content: i.url}));
        tempConversation.push(...urls);
        setConversation(tempConversation);
      } catch (error) {
        console.log(error);
        setPromptText(text);
      } finally {
        setLoading(false);
      }
    }, [promptText]);
  
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={
            headerHeight + 10
        }
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
                  const role: string = conversationItem.role;
                  const content: string = conversationItem.content;

                  if (content.startsWith("http://") || content.startsWith("https://")) {
                    return <Image width={256}
                                  height={256}
                                  source={{uri: content}}
                                  style={{marginBottom: 5}}/>
                  }
  
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
          
          <InputContainer onChangeText={(text: string) => setPromptText(text)}
                          message={promptText}
                          sendMessage={sendMessage}
                          colorTheme={colorTheme}
                          placeholder={"Send an image prompt..."}/>
          
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
  