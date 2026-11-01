import React, { useCallback, useEffect, useRef } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  type RefreshControlProps,
  View,
  type ScrollViewInstance,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useSettings } from '../context/SettingsContext';
import { brand } from '../theme/palette';
import { useTabBarSpace } from '../navigation/TabBar';
import { useHideTabBarOnScroll } from '../navigation/TabBarVisibility';
import { useKeyboardHeight } from './useKeyboardHeight';
import { useLayout, useWindowKey } from './useLayout';

interface Props {
  children: React.ReactNode;
  padded?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  scrollRef?: React.Ref<ScrollViewInstance>;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  background?: string;
  onScroll?: (y: number) => void;
  maxWidth?: number;
}

export function Screen({
  children,
  padded = true,
  contentStyle,
  scrollRef,
  refreshControl,
  background,
  onScroll,
  maxWidth: preferredWidth,
}: Props) {
  const { colors, isDark } = useSettings();
  const insets = useSafeAreaInsets();
  const tabBarSpace = useTabBarSpace();
  const hideOnScroll = useHideTabBarOnScroll();
  const keyboardHeight = useKeyboardHeight();
  const layout = useLayout();
  const maxWidth = preferredWidth ?? layout.pageWidth;
  const paddingHorizontal = padded
    ? layout.side(maxWidth)
    : Math.max(layout.inset, (layout.width - maxWidth) / 2);
  const page = [
    styles.flex,
    { backgroundColor: background ?? colors.background },
  ];
  const Wrapper = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

  const innerRef = useRef<ScrollViewInstance | null>(null);
  const offsetY = useRef(0);
  const setRefs = useCallback(
    (node: ScrollViewInstance | null) => {
      innerRef.current = node;
      if (typeof scrollRef === 'function') scrollRef(node);
      else if (scrollRef) scrollRef.current = node;
    },
    [scrollRef],
  );

  useScrollToTop(innerRef as unknown as Parameters<typeof useScrollToTop>[0]);

  useEffect(() => {
    if (Platform.OS !== 'android' || keyboardHeight === 0) return;
    const timer = setTimeout(() => {
      const input = TextInput.State.currentlyFocusedInput();
      const scroll = innerRef.current;
      if (!input || !scroll) return;
      scroll.measureInWindow((_x, top, _w, visible) => {
        input.measureInWindow((_ix, y, _iw, h) => {
          if (y >= top + 8 && y + h <= top + visible - 16) return;
          scroll.scrollTo({
            y: Math.max(0, offsetY.current + y - top - visible / 3),
            animated: true,
          });
        });
      });
    }, 60);
    return () => clearTimeout(timer);
  }, [keyboardHeight]);

  return (
    <Wrapper
      {...(Platform.OS === 'ios' ? { behavior: 'padding' as const } : {})}
      style={[
        page,
        Platform.OS === 'android' && { paddingBottom: keyboardHeight },
      ]}
    >
      <ScrollView
        ref={setRefs}
        {...hideOnScroll}
        scrollEventThrottle={16}
        onScroll={event => {
          offsetY.current = event.nativeEvent.contentOffset.y;
          hideOnScroll.onScroll?.(event);
          onScroll?.(event.nativeEvent.contentOffset.y);
        }}
        refreshControl={refreshControl}
        style={styles.flex}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.grow,
          padded && styles.padded,
          { paddingHorizontal },
          { paddingBottom: 32 + (tabBarSpace || insets.bottom) },
          contentStyle,
        ]}
      >
        {!background && (
          <>
            {padded && <Glow strength={isDark ? 0.16 : 0.08} at="top" />}
            <Glow strength={isDark ? 0.12 : 0.06} at="bottom" />
          </>
        )}
        {children}
      </ScrollView>
    </Wrapper>
  );
}

export function HeroGlow({ lift = 0 }: { lift?: number }) {
  const { isDark } = useSettings();
  return (
    <View style={[styles.heroGlow, { top: -lift }]} pointerEvents="none">
      <Glow strength={isDark ? 0.16 : 0.08} at="top" />
    </View>
  );
}

export function Glow({
  strength,
  at,
  offset = 0,
}: {
  strength: number;
  at: 'top' | 'bottom';
  offset?: number;
}) {
  const id = `${at}Glow`;
  const windowKey = useWindowKey();
  return (
    <View
      style={[styles.glow, at === 'top' ? { top: offset } : { bottom: offset }]}
      pointerEvents="none"
    >
      <Svg key={windowKey} width="100%" height="100%">
        <Defs>
          <RadialGradient
            id={id}
            cx={at === 'top' ? '20%' : '80%'}
            cy={at === 'top' ? '0%' : '100%'}
            rx="90%"
            ry="100%"
          >
            <Stop
              offset="0"
              stopColor={brand.oasisLight}
              stopOpacity={strength}
            />
            <Stop offset="1" stopColor={brand.oasisLight} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

export function Section({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.section, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  grow: { flexGrow: 1 },
  padded: { padding: 20 },
  section: { marginTop: 28 },
  heroGlow: { height: 0, zIndex: -1 },
  glow: { position: 'absolute', left: 0, right: 0, height: 320 },
});
