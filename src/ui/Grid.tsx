import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GRID_GAP } from './useLayout';

export function Grid({
  columns,
  children,
}: {
  columns: number;
  children: React.ReactNode;
}) {
  if (columns <= 1) return <>{children}</>;
  return (
    <View style={styles.grid}>
      {React.Children.toArray(children).map((child, i) => (
        <View
          key={React.isValidElement(child) ? child.key ?? i : i}
          style={[styles.cell, { width: `${100 / columns}%` }]}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -GRID_GAP / 2,
  },
  cell: { paddingHorizontal: GRID_GAP / 2 },
});
