import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSettings } from '../context/SettingsContext';
import { useGoTo } from '../features/useGoTo';
import type { RootStackParamList } from '../navigation/types';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { CheckIcon } from '../ui/icons';
import { Screen } from '../ui/Screen';
import { Summary } from './RequestScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Confirmation'>;

export function ConfirmationScreen({ route }: Props) {
  const { colors, dict, strings } = useSettings();
  const { tab } = useGoTo();
  const { title, rows, id } = route.params;

  return (
    <Screen>
      <View style={[styles.check, { backgroundColor: colors.accent }]}>
        <CheckIcon color="#FFFFFF" size={30} />
      </View>
      <AppText variant="title" style={styles.title} color={colors.heading}>
        {title}
      </AppText>
      <AppText variant="body" muted style={styles.body}>
        {dict.request.successBody}
      </AppText>
      <Summary rows={[{ label: strings.requestNumber, value: id }, ...rows]} />
      <Button
        style={styles.button}
        label={strings.backHome}
        onPress={() => tab('Home')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  check: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 12,
  },
  title: { textAlign: 'center', marginTop: 16 },
  body: { textAlign: 'center', marginTop: 8, marginBottom: 20 },
  button: { marginTop: 24 },
});
