import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import {
  BottomTabBarHeightContext,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';
import { brand } from '../theme/palette';
import { FONT_FAMILY } from '../theme/fonts';
import { useTabBarProgress } from './TabBarVisibility';

const BAR_HEIGHT = 64;
const PILL_W = 56;
const PILL_H = 30;
const MAX_WIDTH = 560;

export function useTabBarSpace(): number {
  const insets = useSafeAreaInsets();
  const inTabs = useContext(BottomTabBarHeightContext) !== undefined;
  return inTabs ? BAR_HEIGHT + insets.bottom + 16 : 0;
}

function Tab({
  label,
  focused,
  icon,
  onPress,
  onLongPress,
  active,
  idle,
  pill,
}: {
  label: string;
  focused: boolean;
  icon: (color: string) => React.ReactNode;
  onPress: () => void;
  onLongPress: () => void;
  active: string;
  idle: string;
  pill: string;
}) {
  const shown = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(shown, {
      toValue: focused ? 1 : 0,
      useNativeDriver: true,
      speed: 18,
      bounciness: 6,
    }).start();
  }, [focused, shown]);

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={label}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.item}
    >
      <View style={styles.iconWrap}>
        <Animated.View
          style={[
            styles.pill,
            {
              backgroundColor: pill,
              opacity: shown,
              transform: [
                {
                  scaleX: shown.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.4, 1],
                  }),
                },
              ],
            },
          ]}
        />
        {icon(focused ? active : idle)}
      </View>
      <Animated.Text
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        style={[
          styles.label,
          { color: focused ? active : idle },
          focused && styles.labelActive,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { isDark, colors } = useSettings();
  const insets = useSafeAreaInsets();
  const progress = useTabBarProgress();
  const active = isDark ? brand.goldLight : brand.goldDark;
  const idle = isDark ? 'rgba(255,255,255,0.68)' : '#5A6670';
  const pill = isDark ? 'rgba(233,186,99,0.18)' : 'rgba(201,139,46,0.16)';
  const focusedKey = state.routes[state.index]?.key;
  const tabs = state.routes.filter(route => route.name !== 'Home');

  return (
    <Animated.View
      style={[
        styles.wrap,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        progress && {
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, BAR_HEIGHT + insets.bottom + 8],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.row}>
        {tabs.map(route => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title ?? route.name;
          const focused = route.key === focusedKey;
          return (
            <Tab
              key={route.key}
              label={label}
              focused={focused}
              active={active}
              idle={idle}
              pill={pill}
              icon={color =>
                options.tabBarIcon?.({ focused, color, size: 22 })
              }
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              }}
              onLongPress={() =>
                navigation.emit({ type: 'tabLongPress', target: route.key })
              }
            />
          );
        })}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
  },
  row: {
    height: BAR_HEIGHT,
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconWrap: {
    width: PILL_W,
    height: PILL_H,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    ...StyleSheet.absoluteFill,
    borderRadius: PILL_H / 2,
  },
  label: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontFamily: FONT_FAMILY,
    fontSize: 11,
    fontWeight: '500',
    paddingHorizontal: 2,
  },
  labelActive: { fontWeight: '700' },
});
