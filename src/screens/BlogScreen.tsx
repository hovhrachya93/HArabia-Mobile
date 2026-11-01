import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSettings } from '../context/SettingsContext';
import { ArticleCard } from '../features/cards';
import { EventCards } from '../features/EventCards';
import type { RootStackParamList, TabParamList } from '../navigation/types';
import { articles } from '../shared/articles-data';
import { AppText } from '../ui/AppText';
import { ChipRow } from '../ui/ChipRow';
import { Grid } from '../ui/Grid';
import { Screen } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Blog'>,
  NativeStackScreenProps<RootStackParamList>
>;

type Filter = 'all' | 'guide' | 'news' | 'events';

export function BlogScreen({ navigation }: Props) {
  const { dict } = useSettings();
  const layout = useLayout();
  const [filter, setFilter] = useState<Filter>('all');
  const shown =
    filter === 'events'
      ? []
      : articles.filter(a => filter === 'all' || a.kind === filter);

  return (
    <Screen maxWidth={layout.pageWidth}>
      <AppText variant="caption" muted>
        {dict.blog.intro}
      </AppText>
      <View style={styles.filters}>
        <ChipRow
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: dict.common.all },
            { value: 'guide', label: dict.blog.filters.guide },
            { value: 'news', label: dict.blog.filters.news },
            { value: 'events', label: dict.blog.filters.events },
          ]}
        />
      </View>
      {(filter === 'all' || filter === 'events') && (
        <View style={styles.events}>
          <EventCards
            onConcerts={() => navigation.navigate('Concerts')}
            onQatar={() => navigation.navigate('QatarEvents')}
          />
        </View>
      )}
      <Grid columns={layout.columns(300)}>
        {shown.map(article => (
          <View key={article.slug} style={styles.item}>
            <ArticleCard
              article={article}
              onPress={() =>
                navigation.navigate('Article', { slug: article.slug })
              }
            />
          </View>
        ))}
      </Grid>
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: { marginVertical: 14 },
  events: { marginBottom: 16 },
  item: { marginBottom: 16 },
});
