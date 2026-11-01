import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSettings } from '../context/SettingsContext';
import { AppText } from '../ui/AppText';
import { BRAND_COLORS, BRAND_ICONS } from '../ui/brandIcons';
import { Field } from '../ui/Field';
import { MailIcon, MessageIcon, PhoneIcon, UserIcon } from '../ui/icons';
import { inputFill } from '../ui/inputBox';
import { useLayout } from '../ui/useLayout';
import { CONTACT_CHANNELS, type ContactForm } from './useContactForm';

interface Labels {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactFields({
  form,
  labels,
}: {
  form: ContactForm;
  labels: Labels;
}) {
  const { colors, isDark, strings } = useSettings();
  const { wide } = useLayout();

  return (
    <View>
      <Field
        label={labels.name}
        icon={UserIcon}
        value={form.name}
        onChangeText={form.setName}
        error={form.errors.name}
        autoComplete="name"
        textContentType="name"
      />
      <View style={wide && styles.pair}>
        <View style={wide && styles.flex}>
          <Field
            label={labels.email}
            icon={MailIcon}
            value={form.email}
            onChangeText={form.setEmail}
            error={form.errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
          />
        </View>
        <View style={wide && styles.flex}>
          <Field
            label={labels.phone}
            icon={PhoneIcon}
            value={form.phone}
            onChangeText={form.setPhone}
            error={form.errors.phone}
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
          />
        </View>
      </View>
      <AppText variant="label" muted>
        {strings.contactVia}
      </AppText>
      <View style={styles.channels}>
        {CONTACT_CHANNELS.map(channel => {
          const on = form.channels.includes(channel);
          const tint =
            channel === 'phone' ? colors.accent : BRAND_COLORS[channel];
          return (
            <Pressable
              key={channel}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: on }}
              accessibilityLabel={strings.channels[channel]}
              onPress={() => form.toggleChannel(channel)}
              style={({ pressed }) => [
                styles.channel,
                {
                  backgroundColor: on ? tint : inputFill(colors, isDark),
                  borderColor: on ? tint : 'transparent',
                },
                pressed && styles.pressed,
              ]}
            >
              {channel === 'phone' ? (
                <PhoneIcon color={on ? '#FFFFFF' : tint} size={20} />
              ) : (
                <Svg width={20} height={20} viewBox="0 0 24 24">
                  <Path d={BRAND_ICONS[channel]} fill={on ? '#FFFFFF' : tint} />
                </Svg>
              )}
              <AppText
                variant="caption"
                numberOfLines={1}
                color={on ? '#FFFFFF' : colors.text}
                style={styles.channelName}
              >
                {strings.channels[channel]}
              </AppText>
            </Pressable>
          );
        })}
      </View>
      <Field
        label={labels.message}
        icon={MessageIcon}
        value={form.message}
        onChangeText={form.setMessage}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  pair: { flexDirection: 'row', gap: 16 },
  channels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  channel: {
    flexGrow: 1,
    flexBasis: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 46,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  channelName: { flex: 1, fontWeight: '600' },
  pressed: { opacity: 0.75 },
});
