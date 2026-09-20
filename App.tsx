import React from 'react';
import {
  Image,
  PixelRatio,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// Brand colours from harabia-react-native-assets. The background matches the
// native launch screen (light: #182B3A, dark: #0E1D28) so there is no flash
// when the app takes over from the splash.
const colors = {
  backgroundLight: '#182B3A',
  backgroundDark: '#0E1D28',
  gold: '#E9B95F',
  cream: '#FFF8EC',
};

// Same size as the native launch screen, so the logo doesn't move or resize
// when the app takes over. Android 12+ draws its splash icon on a 288dp
// canvas; older Android shows the 1024px logo at native pixels; iOS shows it
// at 240pt.
const ANDROID_12_SPLASH = Platform.OS === 'android' && Number(Platform.Version) >= 31;
const LOGO_SIZE = ANDROID_12_SPLASH
  ? 288
  : Platform.OS === 'android'
    ? 1024 / PixelRatio.get()
    : 240;

function App() {
  const isDark = useColorScheme() === 'dark';
  const background = isDark ? colors.backgroundDark : colors.backgroundLight;

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('./src/assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="HArabia logo"
      />
      <View style={styles.textBlock}>
        <Text style={styles.wordmark} accessibilityRole="header">
          <Text style={styles.wordmarkH}>H</Text>Arabia
        </Text>
        <Text style={styles.byline}>BY HTOURS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  // Sits under the logo, which stays exactly centred like the native splash.
  textBlock: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    marginTop: LOGO_SIZE * 0.28 + 16,
    alignItems: 'center',
  },
  wordmark: {
    fontSize: 44,
    color: colors.cream,
  },
  wordmarkH: {
    color: colors.gold,
    fontWeight: '700',
  },
  byline: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 4,
    color: colors.gold,
  },
});

export default App;
