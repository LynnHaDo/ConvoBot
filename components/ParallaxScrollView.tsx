import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { Layout } from '@/constants/Layout';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';

const HEADER_HEIGHT = 180;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  headerTitle?: string;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  headerTitle
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
          {headerImage}

          {
            headerTitle && <ThemedText type='title' numberOfLines={1} style={styles.headerText}>{headerTitle}</ThemedText>
          }
        </Animated.View>
        
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  headerText: {
    overflow: 'hidden',
    margin: Layout.padding,
    position: 'absolute',
    bottom: 10,
    zIndex: 1,
    backgroundColor: Colors.theme.white,
    borderWidth: 2,
    paddingVertical: 0.7,
    paddingHorizontal: 2,
    textTransform: 'uppercase'
  },
  content: {
    flex: 1,
    padding: Layout.padding,
    gap: 16,
    overflow: 'hidden',
  },
});
