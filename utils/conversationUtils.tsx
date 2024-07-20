let conversation: any[] = [];

export const getConversation = () => {
    return conversation;
}

export const initConversation = () => {
    addMessage({
        role: "system",
        content: 'Your name is ConvoBot'
    })
}

export const addMessage = (msg: any) => {
    conversation.push(msg);
}

export const resetConversation = () => {
    conversation = [];
    initConversation();
}