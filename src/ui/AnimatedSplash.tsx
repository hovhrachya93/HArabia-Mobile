import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { brand } from '../theme/palette';
import { FONT_FAMILY } from '../theme/fonts';

const ANDROID_12_SPLASH =
  Platform.OS === 'android' && Number(Platform.Version) >= 31;
const LOGO_SIZE = ANDROID_12_SPLASH
  ? 288
  : Platform.OS === 'android'
  ? 1024 / PixelRatio.get()
  : 240;

export function AnimatedSplash({ onDone }: { onDone: () => void }) {
  const isDark = useColorScheme() === 'dark';
  const fade = useRef(new Animated.Value(1)).current;
  const words = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(words, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.timing(fade, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start(() => onDone());
  }, [fade, words, onDone]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        styles.container,
        {
          opacity: fade,
          backgroundColor: isDark ? brand.nightDark : brand.night,
        },
      ]}
    >
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Animated.View
        style={[
          styles.textBlock,
          {
            opacity: words,
            transform: [
              {
                translateY: words.interpolate({
                  inputRange: [0, 1],
                  outputRange: [8, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.wordmark}>
          <Text style={styles.wordmarkH}>H</Text>Arabia
        </Text>
        <Text style={styles.byline}>BY HTOURS</Text>
      </Animated.View>
      <View />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  logo: { width: LOGO_SIZE, height: LOGO_SIZE },
  textBlock: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    marginTop: LOGO_SIZE * 0.28 + 16,
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: FONT_FAMILY,
    fontSize: 44,
    fontWeight: '700',
    color: '#FFF8EC',
  },
  wordmarkH: { color: '#E9B95F' },
  byline: {
    fontFamily: FONT_FAMILY,
    marginTop: 6,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 4,
    color: '#E9B95F',
  },
});
