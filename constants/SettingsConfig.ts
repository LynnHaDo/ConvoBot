import { SettingsState } from "@/store/settingsSlice";

export const personalities = [
  "normal",
  "pirate",
  "baby",
  "old man",
  "pikachu",
  "alien",
  "teacher",
  "Elon Musk",
  "Kanye West",
  "Taylor Swift",
];

export const moods = [
  "normal",
  "exhilarating",
  "shy",
  "sad",
  "angry",
  "furious",
  "excited",
];

export const responseSizes = ["short", "medium", "long"];

export const advancedSettings = [
  {
    id: "temperature",
    title: "Temperature",
    description:
      "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.\n\nWe generally recommend altering this or top_p but not both.",
    default: 1,
    min: 0,
    max: 2,
    type: "number",
  },
  {
    id: "top_p",
    title: "Top P",
    description:
      "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.\n\nWe generally recommend altering this or temperature but not both.",
    default: 1,
    min: 0,
    max: 1,
    type: "number",
  },
  {
    id: "max_tokens",
    title: "Max Tokens",
    description:
      "The maximum number of tokens that can be generated in the chat completion.\n\nThe total length of input tokens and generated tokens is limited by the model's context length.",
    default: 1000,
    min: 10,
    max: 1000,
    type: "integer",
  },
  {
    id: "presence_penalty",
    title: "Presence Penalty",
    description:
      "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
    default: 0,
    min: -2,
    max: 2,
    type: "number",
  },
  {
    id: "frequency_penalty",
    title: "Frequency Penalty",
    description:
      "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
    default: 0,
    min: -2,
    max: 2,
    type: "number",
  },
];
