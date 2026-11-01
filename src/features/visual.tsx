import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { useSettings } from '../context/SettingsContext';
import { brand } from '../theme/palette';
import { AppText } from '../ui/AppText';
import { ArrowRightIcon, StarIcon } from '../ui/icons';

export const GRADIENTS: string[][] = [
  [brand.nightSoft, brand.nightDark],
  [brand.goldLight, brand.gold, brand.terracotta],
  [brand.oasisLight, brand.night],
  [brand.sandLight, brand.sand, brand.gold],
];

export const SEASON_GRADIENTS: Record<string, string[]> = {
  newYear: [brand.nightSoft, brand.night, brand.nightDark],
  march8: [brand.terracotta, brand.goldDark, brand.night],
  summer: [brand.oasisLight, brand.oasis, brand.night],
};

export const SEASON_ICONS: Record<string, string> = {
  newYear:
    'M12 2v5m0 10v5M2 12h5m10 0h5M4.9 4.9l3.5 3.5m7.2 7.2 3.5 3.5M4.9 19.1l3.5-3.5m7.2-7.2 3.5-3.5M12 11v2m-1-1h2',
  march8:
    'M12 21c0-5 0-8 0-10m0 0c-3 0-5-2-5-5 2 0 4 .8 5 2.5C13 6.8 15 6 17 6c0 3-2 5-5 5Zm0 3c-2.5 0-4.5 1-5.5 3 1 .5 3.5.5 5.5-1m0-2c2.5 0 4.5 1 5.5 3-1 .5-3.5.5-5.5-1',
  summer:
    'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-14v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
};

export const isLightGradient = (colors: string[]) =>
  colors[0] === brand.sandLight;

let gradientId = 0;

export function Gradient({
  colors,
  style,
  children,
}: {
  colors: string[];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}) {
  const id = React.useMemo(() => `g${gradientId++}`, []);
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  return (
    <View
      style={[styles.gradient, style]}
      onLayout={event => {
        const { width, height } = event.nativeEvent.layout;
        setSize(current =>
          current.width === width && current.height === height
            ? current
            : { width, height },
        );
      }}
    >
      <Svg
        key={`${size.width}x${size.height}`}
        style={StyleSheet.absoluteFill}
        width={size.width}
        height={size.height}
      >
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            {colors.map((color, i) => (
              <Stop
                key={color + i}
                offset={colors.length === 1 ? 0 : i / (colors.length - 1)}
                stopColor={color}
              />
            ))}
          </LinearGradient>
        </Defs>
        <Rect width={size.width} height={size.height} fill={`url(#${id})`} />
      </Svg>
      {children}
    </View>
  );
}

export function LineIcon({
  path,
  color,
  size = 24,
}: {
  path: string;
  color: string;
  size?: number;
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d={path} />
    </Svg>
  );
}

export function Stars({ count, size = 14 }: { count: number; size?: number }) {
  if (!count) return null;
  return (
    <View style={styles.stars}>
      {Array.from({ length: count }, (_, i) => (
        <StarIcon key={i} color={brand.gold} size={size} />
      ))}
    </View>
  );
}

export function SectionHeader({
  title,
  body,
  action,
  onAction,
}: {
  title: string;
  body?: string;
  action?: string;
  onAction?: () => void;
}) {
  const { colors } = useSettings();
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        <AppText variant="heading" color={colors.heading}>
          {title}
        </AppText>
        {!!body && (
          <AppText variant="caption" muted style={styles.headerBody}>
            {body}
          </AppText>
        )}
      </View>
      {!!action && onAction && (
        <Pressable
          accessibilityRole="link"
          onPress={onAction}
          hitSlop={8}
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
        >
          <AppText variant="label" color={colors.accent}>
            {action}
          </AppText>
          <ArrowRightIcon color={colors.accent} size={14} />
        </Pressable>
      )}
    </View>
  );
}

export function Badge({
  label,
  tone = 'muted',
}: {
  label: string;
  tone?: 'muted' | 'accent' | 'gold';
}) {
  const { colors } = useSettings();
  const background =
    tone === 'accent'
      ? colors.accent
      : tone === 'gold'
      ? colors.action
      : colors.surfaceMuted;
  const color =
    tone === 'accent'
      ? '#FFFFFF'
      : tone === 'gold'
      ? colors.actionText
      : colors.text;
  return (
    <View style={[styles.badge, { backgroundColor: background }]}>
      <AppText variant="caption" color={color} style={styles.badgeText}>
        {label}
      </AppText>
    </View>
  );
}

export function Card({
  children,
  onPress,
  style,
  accessibilityLabel,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}) {
  const { colors } = useSettings();
  const frame = [
    styles.card,
    { backgroundColor: colors.surface, borderColor: colors.border },
    style,
  ];
  if (!onPress) return <View style={frame}>{children}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [frame, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

export function Notice({ text }: { text: string }) {
  const { colors } = useSettings();
  return (
    <View
      style={[
        styles.notice,
        { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
      ]}
    >
      <AppText variant="caption" muted>
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: { overflow: 'hidden' },
  stars: { flexDirection: 'row', gap: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  headerText: { flex: 1 },
  headerBody: { marginTop: 4 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  pressed: { opacity: 0.8 },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: { fontWeight: '600', fontSize: 12, lineHeight: 16 },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  notice: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },
});
