import { View, StyleSheet, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import DataItem from '@/components/DataItem';
import { Layout } from '@/constants/Layout';

export interface SettingsScreenProps {
    title: string
}

export default function SettingsScreen({title}: SettingsScreenProps) {
    const colorScheme = useColorScheme();

    return (
        <View style={{  ...styles.container, 
                        backgroundColor: Colors[colorScheme ?? 'light'].background}}>
            <DataItem 
                title="Personality"
                subTitle="Change the personality of the model"
                type="link"
                onPress={() => console.log("personality pressed")}
            />

<DataItem 
                title="Mood"
                subTitle="Change the mood of the model"
                type="link"
                onPress={() => console.log("mood pressed")}
            />

<DataItem 
                title="Model"
                subTitle="Change the the model"
                type="link"
                onPress={() => console.log("model pressed")}
            />
            <StatusBar style="auto"></StatusBar>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        padding: Layout.padding
    }
})