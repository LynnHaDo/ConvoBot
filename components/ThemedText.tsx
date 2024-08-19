import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'danger' | 'header' | 'subtitleHeader' | 'heading1' | 'heading2' ;
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
        type === 'heading1' ? styles.heading1 : undefined,
        type === 'heading2' ? styles.heading2 : undefined,
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
    fontFamily: 'WorkSans-Regular',
  },
  title: {
    fontSize: 28,
    fontFamily: 'WorkSans-Bold',
    lineHeight: 32,
  },
  header: {
    fontSize: 17,
    fontFamily: 'WorkSans-Bold',
    lineHeight: 24,
  },
  heading1: {
    fontSize: 17,
    fontFamily: 'WorkSans-SemiBold',
    lineHeight: 24,
  },
  heading2: {
    fontSize: 17,
    fontFamily: 'WorkSans-Medium',
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'WorkSans-Regular',
  },
  subtitleHeader: {
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
  },
  description: {
    fontFamily: 'WorkSans-Light',
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
