import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useSettings } from '../context/SettingsContext';

interface Props {
  images: ImageSourcePropType[];
  height?: number;
  rounded?: boolean;
}

export function ImageCarousel({ images, height = 240, rounded = true }: Props) {
  const { colors } = useSettings();
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const onLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);
  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (width > 0)
      setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  return (
    <View
      onLayout={onLayout}
      style={[styles.wrap, { height }, rounded && styles.rounded]}
    >
      {width > 0 && (
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => String(i)}
          onMomentumScrollEnd={onScrollEnd}
          renderItem={({ item }) => (
            <Image source={item} style={{ width, height }} resizeMode="cover" />
          )}
        />
      )}
      {images.length > 1 && (
        <View style={styles.dots}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === index ? '#fff' : 'rgba(255,255,255,0.5)',
                },
              ]}
            />
          ))}
        </View>
      )}
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { borderColor: colors.border }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', overflow: 'hidden', backgroundColor: '#0E1D28' },
  rounded: { borderRadius: 16 },
  dots: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: { width: 7, height: 7, borderRadius: 4 },
});
