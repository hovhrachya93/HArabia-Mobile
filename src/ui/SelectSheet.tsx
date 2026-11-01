import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';
import { CaretDownIcon, CheckIcon } from './icons';
import { FONT_FAMILY } from '../theme/fonts';
import { INPUT_HEIGHT, INPUT_RADIUS, inputFill } from './inputBox';
import { SheetModal } from './SheetModal';

export interface SelectOption<T extends string> {
  value: T;
  label: string;
  count?: number;
  image?: ImageSourcePropType;
}

function PinIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <Circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

function SearchIcon({ color }: { color: string }) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    >
      <Circle cx="11" cy="11" r="7" />
      <Path d="m20 20-3.5-3.5" />
    </Svg>
  );
}

export function SelectSheet<T extends string>({
  label,
  value,
  options,
  onChange,
  searchPlaceholder,
  renderField,
}: {
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  searchPlaceholder?: string;
  renderField?: (open: () => void) => React.ReactNode;
}) {
  const { colors, isDark } = useSettings();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const selected = options.find(o => o.value === value);
  const searchable = options.length > 8;

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter(o => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  function close() {
    setOpen(false);
    setQuery('');
  }

  return (
    <View style={renderField ? undefined : styles.wrap}>
      {renderField ? (
        renderField(() => setOpen(true))
      ) : (
        <>
          <AppText variant="label" muted>
            {label}
          </AppText>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${label}: ${selected?.label ?? ''}`}
            onPress={() => setOpen(true)}
            style={({ pressed }) => [
              styles.field,
              {
                backgroundColor: inputFill(colors, isDark),
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <PinIcon color={colors.accent} />
            <AppText variant="body" style={styles.flex} numberOfLines={1}>
              {selected?.label}
            </AppText>
            <CaretDownIcon color={colors.accent} />
          </Pressable>
        </>
      )}

      <SheetModal
        visible={open}
        onClose={close}
        style={[
          styles.sheet,
          {
            backgroundColor: colors.surface,
            paddingBottom: Math.max(insets.bottom, 12),
          },
        ]}
      >
        <View style={[styles.handle, { backgroundColor: colors.border }]} />
        <AppText variant="heading" style={styles.title}>
          {label}
        </AppText>

        {searchable && (
          <View
            style={[styles.search, { backgroundColor: colors.surfaceMuted }]}
          >
            <SearchIcon color={colors.textMuted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder={searchPlaceholder}
              placeholderTextColor={colors.textMuted}
              autoCorrect={false}
              style={[styles.searchInput, { color: colors.text }]}
            />
          </View>
        )}

        <FlatList
          data={shown}
          keyExtractor={o => o.value}
          keyboardShouldPersistTaps="handled"
          style={styles.list}
          renderItem={({ item }) => {
            const active = item.value === value;
            return (
              <Pressable
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                onPress={() => {
                  onChange(item.value);
                  close();
                }}
                style={({ pressed }) => [
                  styles.option,
                  active && { backgroundColor: colors.surfaceMuted },
                  pressed && styles.pressed,
                ]}
              >
                {item.image ? (
                  <Image
                    source={item.image}
                    style={[
                      styles.optionImage,
                      active && { borderColor: colors.accent },
                    ]}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={[
                      styles.optionIcon,
                      {
                        backgroundColor: active
                          ? colors.accent
                          : colors.surfaceMuted,
                      },
                    ]}
                  >
                    <PinIcon
                      color={active ? colors.background : colors.accent}
                      size={16}
                    />
                  </View>
                )}
                <AppText
                  variant="subheading"
                  color={active ? colors.accent : colors.text}
                  style={styles.flex}
                >
                  {item.label}
                </AppText>
                {item.count !== undefined && (
                  <AppText variant="label" muted>
                    {item.count}
                  </AppText>
                )}
                <View style={styles.check}>
                  {active && <CheckIcon color={colors.accent} size={18} />}
                </View>
              </Pressable>
            );
          }}
        />
      </SheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  flex: { flex: 1 },
  field: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: INPUT_RADIUS,
    minHeight: INPUT_HEIGHT,
    paddingHorizontal: 14,
  },
  sheet: {
    maxHeight: '75%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 14,
  },
  title: { marginBottom: 12, paddingHorizontal: 4 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  searchInput: {
    fontFamily: FONT_FAMILY,
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
  },
  list: { flexGrow: 0 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 11,
  },
  optionIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  check: { width: 20, alignItems: 'flex-end' },
  pressed: { opacity: 0.6 },
});
