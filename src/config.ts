import { Platform } from 'react-native';
import { CONTACT, SOCIAL } from './shared/contact';

const PRODUCTION_API_URL = 'https://harabia.am';

const DEV_API_URL = Platform.select({
  android: 'http://10.0.2.2:3001',
  default: 'http://localhost:3001',
});

export const API_BASE_URL = __DEV__ ? DEV_API_URL : PRODUCTION_API_URL;

export const WEBSITE_URL = PRODUCTION_API_URL;

export { CONTACT, SOCIAL };

export function websiteLink(locale: string, path: string): string {
  const prefix = locale === 'hy' ? '' : `/${locale}`;
  return `${WEBSITE_URL}${prefix}${path === '/' && prefix ? '' : path}`;
}

export function imageUrl(path: string): string {
  return /^https?:/.test(path) ? path : `${WEBSITE_URL}${path}`;
}
