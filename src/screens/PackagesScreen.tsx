import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSettings } from '../context/SettingsContext';
import { PackageCard } from '../features/cards';
import type { RootStackParamList, TabParamList } from '../navigation/types';
import { packages } from '../shared/packages-data';
import { AppText } from '../ui/AppText';
import { Grid } from '../ui/Grid';
import { Screen } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Packages'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function PackagesScreen({ navigation }: Props) {
  const { dict } = useSettings();
  const layout = useLayout();

  return (
    <Screen maxWidth={layout.pageWidth}>
      <AppText variant="caption" muted style={styles.intro}>
        {dict.packages.intro}
      </AppText>
      <Grid columns={layout.columns(320)}>
        {packages.map(item => (
          <View key={item.slug} style={styles.item}>
            <PackageCard
              item={item}
              onPress={() =>
                navigation.navigate('PackageDetail', { slug: item.slug })
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
