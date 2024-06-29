import { View, StyleSheet, useColorScheme, TextInput, KeyboardAvoidingView } from 'react-native';
import { useState, useCallback, useEffect } from 'react';

import { makeRequest } from '@/utils/gptUtils'

import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { Feather } from '@expo/vector-icons';
import { ThemedButton } from '@/components/ThemedButton';
import { addMessage, initConversation } from '@/utils/conversationUtils';


export default function ChatScreen() {
    const colorScheme = useColorScheme();
    const colorTheme = Colors[colorScheme ?? 'light'];

    const [messageText, setMessageText] = useState("");

    useEffect(() => {
        initConversation()
    }, [])

    const sendMessage = useCallback(async () => {
        try {
            addMessage({
                role: "user",
                content: messageText
            });
            await makeRequest();
        } catch (error) {
            console.log(error);
        }
        setMessageText("");
    }, [messageText])

    return (
        <KeyboardAvoidingView style = {{ flex: 1 }} behavior='padding' keyboardVerticalOffset={10}>
            <View style={{  ...styles.container, 
                        backgroundColor: colorTheme.background}}>
            
                <View style = {styles.messageContainer}>

                </View>
                
                <View style = {styles.inputContainer}>
                    <TextInput 
                        style = {styles.textbox}
                        placeholder = "Start a conversation..." 
                        onChangeText={(text) => setMessageText(text)}
                        value={messageText}/>
                    
                    <ThemedButton type="fill" onPress = {sendMessage}>
                        <Feather name="send" size={24} color={colorTheme.buttonText} />
                    </ThemedButton>
                </View>

            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    messageContainer: {
        flex: 1,
        padding: Layout.padding
    },
    inputContainer: {
        flexDirection: 'row',
        padding: Layout.padding
    },
    textbox: {
        fontFamily: 'PromptRegular',
        flex: 1
    }
})