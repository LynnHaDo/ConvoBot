import OpenAI from "openai";
import { addMessage, getConversation } from "./conversationUtils";
import { DevEnvironment } from '@/environment/Dev';

export const makeChatRequest = async (chatOptions: {[key: string]: number}) => {
    const response = await fetch(`${DevEnvironment.server}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages: getConversation(),
            chatOptions: chatOptions
        })
    })

    if (!response.ok) {
        throw new Error('Failed to load chat request')
    }

    const data = await response.json();
    
    addMessage({
        role: "assistant",
        content: data.response
    });
}

export const makeImageRequest = async (prompt: string) => {
    const response = await fetch(`${DevEnvironment.server}/image`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: prompt
        })
    })

    if (!response.ok) {
        throw new Error('Failed to load chat request')
    }

    const data = await response.json();
    return data.response;
}

