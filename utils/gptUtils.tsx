import OpenAI from "openai";
import { addMessage, getConversation } from "./conversationUtils";
import { DevEnvironment } from '@/environment/Dev';

const openai = new OpenAI({
  apiKey: DevEnvironment.openaiAPIKey,
});

export const makeChatRequest = async (chatOptions: {[key: string]: number}) => {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: getConversation(),
        ...chatOptions
      });
    
    if (response.choices) {
        let responseText = response.choices[0].message.content;
        responseText = responseText!.replace(/(\r\n|\n|\r)/gm, "");
        addMessage({
            role: "assistant",
            content: responseText
        });
        console.log(getConversation());
        return;
    }

    throw new Error("The response is in an unsupported format");
}

export const makeImageRequest = async (prompt: string) => {
    const image = await openai.images.generate({ 
        model: "dall-e-2", 
        prompt: prompt,
        n: 3,
        size: '256x256'
    });

    if (image.data) {
        return image.data;
    }

    throw new Error("The response is in an unsupported format");
}

