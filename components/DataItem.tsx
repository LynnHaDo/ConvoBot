import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureResponderEvent, View, StyleSheet, useColorScheme } from "react-native";

import { ThemedText } from "./ThemedText";

import { Colors } from "@/constants/Colors";
import Entypo from '@expo/vector-icons/Entypo';

export interface DataItemProps {
    title: string
    subTitle: string
    type: string,
    onPress: (((event: GestureResponderEvent) => void) & (() => void))
}

export default function DataItem({title, subTitle, type, onPress}: DataItemProps) {
    const colorScheme = useColorScheme();
    const colorTheme = Colors[colorScheme ?? "light"];

    return <TouchableOpacity onPress={onPress}>
        <View style={{...styles.container, borderColor: colorTheme.inactive}}>
            <View>
                <ThemedText type="header" numberOfLines={1}>{title}</ThemedText>
                <ThemedText type="subtitleHeader" numberOfLines={1}
                style={{color: colorTheme.inactive}}>{subTitle}</ThemedText>
            </View>

            {
                type === 'link' &&
                <View>
                    <Entypo name="chevron-thin-right" size={24} color={colorTheme.icon} />
                </View>
            }
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1
    },
})