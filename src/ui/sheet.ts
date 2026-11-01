import { StyleSheet, type ModalProps } from 'react-native';

export const MODAL_ORIENTATIONS: ModalProps['supportedOrientations'] = [
  'portrait',
  'portrait-upside-down',
  'landscape-left',
  'landscape-right',
];

export const sheetFrame = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { flex: 1 },
  sheet: { width: '100%', maxWidth: 600, alignSelf: 'center' },
});
