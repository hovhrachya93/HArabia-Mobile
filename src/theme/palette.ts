export const brand = {
  night: '#182B3A',
  nightSoft: '#233E50',
  nightDark: '#0E1D28',
  gold: '#C98B2E',
  goldDark: '#9B641C',
  goldLight: '#E9BA63',
  sand: '#F1D7A5',
  sandLight: '#FFF4DD',
  terracotta: '#B8573F',
  oasis: '#147C72',
  oasisLight: '#38A89C',
};

export interface Colors {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textMuted: string;
  heading: string;
  primary: string;
  primaryText: string;
  accent: string;
  action: string;
  actionText: string;
  danger: string;
  overlay: string;
}

export const lightColors: Colors = {
  background: '#FFFCF6',
  surface: '#FFFFFF',
  surfaceMuted: '#FFF4DD',
  border: '#EAD9BA',
  text: '#17242E',
  textMuted: '#4F5B63',
  heading: brand.night,
  primary: '#FFFCF6',
  primaryText: brand.night,
  accent: brand.oasis,
  action: brand.gold,
  actionText: brand.nightDark,
  danger: '#C62828',
  overlay: 'rgba(0,0,0,0.45)',
};

export const darkColors: Colors = {
  background: '#0B131A',
  surface: '#111F2A',
  surfaceMuted: '#182B3A',
  border: '#344A58',
  text: '#F8EEDC',
  textMuted: '#B9B0A2',
  heading: brand.sandLight,
  primary: '#0B131A',
  primaryText: '#F8EEDC',
  accent: brand.oasisLight,
  action: brand.goldLight,
  actionText: brand.nightDark,
  danger: '#FF7B72',
  overlay: 'rgba(0,0,0,0.6)',
};
