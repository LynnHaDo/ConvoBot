let conversation: any[] = [];

export const getConversation = () => {
    return conversation;
}

export const initConversation = (personality: string) => {
    let conversationStarter = 'Your name is ConvoBot. ';
    if (personality !== 'normal') {
        conversationStarter += `Respond as if you are ${personality}`
    }

    addMessage({
        role: "system",
        content: conversationStarter
    })
}

export const addMessage = (msg: any) => {
    conversation.push(msg);
}

export const resetConversation = (personality: string) => {
    conversation = [];
    initConversation(personality);
}