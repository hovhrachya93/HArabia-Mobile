import { Platform } from 'react-native';

export const FONT_FAMILY = Platform.select<string | undefined>({
  android: 'HArabiaSans',
  ios: 'HCyprus Sans',
  default: undefined,
});
