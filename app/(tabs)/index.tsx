import { Text, View } from "react-native";
import { ThemedText } from '@/components/ThemedText';

export default function Index() {
  return (
    <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
    >
    <ThemedText type = "title">Edit app/index.tsx to edit this screen.</ThemedText>
    </View>
  );
}