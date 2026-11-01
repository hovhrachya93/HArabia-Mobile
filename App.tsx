import React, { useCallback, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CurrencyProvider } from './src/context/CurrencyContext';
import { SettingsProvider, useSettings } from './src/context/SettingsContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AnimatedSplash } from './src/ui/AnimatedSplash';

function Shell() {
  const { colors, isDark, ready, rtl } = useSettings();
  if (!ready) return null;

  const base = isDark ? DarkTheme : DefaultTheme;
  const theme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.accent,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <View style={[styles.flex, { direction: rtl ? 'rtl' : 'ltr' }]}>
      <NavigationContainer theme={theme} direction={rtl ? 'rtl' : 'ltr'}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  const [splash, setSplash] = useState(true);
  const hideSplash = useCallback(() => setSplash(false), []);

  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <CurrencyProvider>
          <Shell />
        </CurrencyProvider>
        {splash && <AnimatedSplash onDone={hideSplash} />}
      </SettingsProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
