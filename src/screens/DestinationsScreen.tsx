import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSettings } from '../context/SettingsContext';
import { DestinationCard } from '../features/cards';
import type { RootStackParamList } from '../navigation/types';
import { liveDestinations } from '../shared/destinations-data';
import { AppText } from '../ui/AppText';
import { Grid } from '../ui/Grid';
import { Screen } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';

type Props = NativeStackScreenProps<RootStackParamList, 'Destinations'>;

export function DestinationsScreen({ navigation }: Props) {
  const { dict, locale } = useSettings();
  const layout = useLayout();
  return (
    <Screen maxWidth={layout.pageWidth}>
      <AppText variant="caption" muted style={styles.intro}>
        {dict.destinations.intro}
      </AppText>
      <Grid columns={layout.columns(300)}>
        {liveDestinations.map(d => (
          <View key={d.country} style={styles.item}>
            <DestinationCard
              country={d.country}
              tagline={d.tagline[locale]}
              onPress={() =>
                navigation.navigate('DestinationDetail', { country: d.country })
              }
            />
          </View>
        ))}
      </Grid>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { marginBottom: 16 },
  item: { marginBottom: 16 },
});
