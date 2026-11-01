import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const READABLE_WIDTH = 840;
export const WIDE_WIDTH = 1080;
export const GRID_GAP = 16;

export function useLayout() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const tablet = Math.min(width, height) >= 600;
  const gutter = tablet ? 32 : 20;
  const inset = Math.max(insets.left, insets.right);

  const side = (max = READABLE_WIDTH) =>
    Math.max(gutter + inset, (width - max) / 2);
  const contentWidth = (max = READABLE_WIDTH) => width - side(max) * 2;
  const columns = (minItem: number, max = WIDE_WIDTH, cap = 4) =>
    Math.max(
      1,
      Math.min(
        cap,
        Math.floor((contentWidth(max) + GRID_GAP) / (minItem + GRID_GAP)),
      ),
    );
  const wide = contentWidth(WIDE_WIDTH) >= 900;
  const pageWidth = wide ? WIDE_WIDTH : READABLE_WIDTH;
  const mediaHeight = (base: number, max = READABLE_WIDTH) => {
    const ceiling = height * 0.6;
    return Math.round(
      Math.max(
        Math.min(base, ceiling),
        Math.min(contentWidth(max) * 0.5, 460, ceiling),
      ),
    );
  };

  return {
    width,
    height,
    tablet,
    wide,
    pageWidth,
    landscape: width > height,
    gutter,
    inset,
    side,
    contentWidth,
    columns,
    mediaHeight,
  };
}

export function useWindowKey() {
  const { width, height } = useWindowDimensions();
  return `${width}x${height}`;
}
