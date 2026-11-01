import type { Colors } from '../theme/palette';

export function inputFill(colors: Colors, isDark: boolean): string {
  return isDark ? colors.surfaceMuted : '#FBF2E2';
}

export const INPUT_RADIUS = 14;
export const INPUT_HEIGHT = 52;
