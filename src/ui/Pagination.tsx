import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';
import { inputFill } from './inputBox';

type Item = number | 'gap';

function pageItems(page: number, total: number): Item[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, 'gap', total];
  if (page >= total - 3)
    return [1, 'gap', total - 4, total - 3, total - 2, total - 1, total];
  return [1, 'gap', page - 1, page, page + 1, 'gap', total];
}

function Chevron({ color, flip }: { color: string; flip?: boolean }) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={flip ? styles.flip : undefined}
    >
      <Path d="m15 6-6 6 6 6" />
    </Svg>
  );
}

export function Pagination({
  page,
  totalPages,
  onChange,
  prevLabel,
  nextLabel,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  prevLabel: string;
  nextLabel: string;
}) {
  const { colors, isDark } = useSettings();
  if (totalPages <= 1) return null;

  const arrow = (dir: -1 | 1) => {
    const target = page + dir;
    const disabled = target < 1 || target > totalPages;
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={dir < 0 ? prevLabel : nextLabel}
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={() => onChange(target)}
        hitSlop={6}
        style={({ pressed }) => [
          styles.cell,
          { backgroundColor: inputFill(colors, isDark) },
          disabled && styles.disabled,
          pressed && styles.pressed,
        ]}
      >
        <Chevron color={colors.text} flip={dir > 0} />
      </Pressable>
    );
  };

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: colors.surface,
          borderColor: isDark ? colors.border : 'rgba(20,124,114,0.08)',
        },
      ]}
    >
      {arrow(-1)}
      {pageItems(page, totalPages).map((item, i) =>
        item === 'gap' ? (
          <View key={`gap-${i}`} style={styles.gap}>
            <AppText variant="label" muted>
              …
            </AppText>
          </View>
        ) : (
          <Pressable
            key={item}
            accessibilityRole="button"
            accessibilityLabel={String(item)}
            accessibilityState={{ selected: item === page }}
            onPress={() => item !== page && onChange(item)}
            hitSlop={4}
            style={({ pressed }) => [
              styles.cell,
              item === page ? { backgroundColor: colors.accent } : undefined,
              pressed && styles.pressed,
            ]}
          >
            <AppText
              variant="label"
              color={item === page ? colors.background : colors.text}
              style={styles.number}
            >
              {item}
            </AppText>
          </Pressable>
        ),
      )}
      {arrow(1)}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 8,
    padding: 5,
    borderRadius: 999,
    borderWidth: 1,
    shadowColor: '#182B3A',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
  },
  cell: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gap: { width: 22, alignItems: 'center' },
  number: { fontWeight: '700' },
  disabled: { opacity: 0.35 },
  pressed: { opacity: 0.6 },
  flip: { transform: [{ scaleX: -1 }] },
});
