import { type TouchableOpacityProps, StyleSheet, TouchableOpacity } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedButtonProps = TouchableOpacityProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'fill' | 'outline' | 'inactive'  
};

export function ThemedButton({
    style,
    lightColor,
    darkColor,
    type,
    onPress,
    ...rest
}: ThemedButtonProps) {
    const bgColor = useThemeColor({light: lightColor, dark: darkColor}, 'buttonBackground');
    const outlineColor = useThemeColor({light: lightColor, dark: darkColor}, 'text');

    return (
        <TouchableOpacity 
         style = {[
            { borderRadius: 3, padding: 8, alignItems: 'center', justifyContent: 'center' },
            type === 'fill' ? {backgroundColor: bgColor} : undefined,
            type === 'outline' ? {...styles.outline, borderColor: outlineColor} : undefined,
            type === 'inactive' ? styles.inactive : undefined,
            style
         ]}
         onPress = {onPress}
         {...rest}
        />
    )
}

const styles = StyleSheet.create({
    outline : {
        backgroundColor: 'transparent',
        borderWidth: 2
    },
    inactive : {
        backgroundColor: '#687076'
    }
})