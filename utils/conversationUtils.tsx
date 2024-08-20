let conversation: any[] = [];

export const getConversation = () => {
  return conversation;
};

export const initConversation = (options?: {
  personality: string;
  mood: string;
  responseSize: string;
}) => {
  let conversationStarter = "Your name is ConvoBot. ";

  if (options) {
    const { personality, mood, responseSize } = options;

    if (personality && personality !== "normal") {
      conversationStarter += `Respond as if you are ${personality}. `;
    }

    if (mood && mood !== "normal") {
      conversationStarter += `Your mood is ${mood}. `;
    }

    if (responseSize) {
        conversationStarter += `Keep your responses at a ${responseSize} length.`;
    }
  }

  addMessage({
    role: "system",
    content: conversationStarter,
  });
};

export const addMessage = (msg: any) => {
  conversation.push(msg);
};

export const resetConversation = (
  type: "chat" | "image",
  options?: { personality: string; mood: string, responseSize: string }
) => {
  conversation = [];
  if (type === "chat") {
    initConversation(options);
    return;
  }
  initConversation();
};
