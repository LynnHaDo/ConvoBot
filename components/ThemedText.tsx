import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'danger' | 'header' | 'subtitleHeader' ;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'danger' ? styles.danger : undefined,
        type === 'header'? styles.header : undefined,
        type === 'subtitleHeader' ? styles.subtitleHeader : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'PromptRegular'
  },
  title: {
    fontSize: 28,
    fontFamily: 'PromptBold',
    lineHeight: 32,
  },
  header: {
    fontSize: 17,
    fontFamily: 'PromptBold',
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'PromptRegular',
  },
  subtitleHeader: {
    fontSize: 16,
    fontFamily: 'PromptRegular'
  },
  description: {
    fontFamily: 'PromptLight'
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    textDecorationLine: 'underline'
  },
  danger: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.danger
  }
});
