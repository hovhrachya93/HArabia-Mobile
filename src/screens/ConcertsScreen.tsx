import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { imageUrl } from '../config';
import { useSettings } from '../context/SettingsContext';
import { ConcertCard } from '../features/cards';
import { CONCERTS_BANNER } from '../features/EventCards';
import { Notice } from '../features/visual';
import type { RootStackParamList } from '../navigation/types';
import { concerts } from '../shared/concerts-data';
import { AppText } from '../ui/AppText';
import { Grid } from '../ui/Grid';
import { Screen, Section } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';

type Props = NativeStackScreenProps<RootStackParamList, 'Concerts'>;

export function ConcertsScreen({ navigation }: Props) {
  const { dict, isDark, colors } = useSettings();
  const layout = useLayout();

  return (
    <Screen maxWidth={layout.pageWidth}>
      <Image
        source={{
          uri: imageUrl(isDark ? CONCERTS_BANNER.night : CONCERTS_BANNER.day),
        }}
        style={styles.banner}
        resizeMode="cover"
      />
      <AppText variant="caption" color={colors.accent} style={styles.eyebrow}>
        {dict.concerts.eyebrow}
      </AppText>
      <AppText variant="body" style={styles.intro}>
        {dict.concerts.intro}
      </AppText>
      <Grid columns={layout.columns(300)}>
        {concerts.map(concert => (
          <View key={concert.slug} style={styles.item}>
            <ConcertCard
              concert={concert}
              onPress={() =>
                navigation.navigate('ConcertDetail', { slug: concert.slug })
              }
            />
          </View>
        ))}
      </Grid>
      <Section>
        <Notice text={dict.concerts.note} />
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  banner: { width: '100%', aspectRatio: 2048 / 576, borderRadius: 18 },
  eyebrow: {
    marginTop: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  intro: { marginTop: 6, marginBottom: 16 },
  item: { marginBottom: 16 },
});
