import { View, StyleSheet, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

export default function SettingsScreen() {
    const colorScheme = useColorScheme();

    return (
        <View style={{  ...styles.container, 
                        backgroundColor: Colors[colorScheme ?? 'light'].background}}>
        <ThemedText type="title">Settings screen</ThemedText>
        <StatusBar style="auto"></StatusBar>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})