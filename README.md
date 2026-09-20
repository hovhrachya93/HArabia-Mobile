# HArabia Mobile

Bare React Native app (no Expo, React Native 0.87.1) for HArabia. Same setup as
`../HCyprus-Mobile`. **This is only the starting point:** the project, the brand
icons, the native launch screen and one screen that shows the logo.

- App name: `HArabia` — JS name `HArabiaMobile`
- Android package / iOS bundle ID: `am.htours.harabia`
- Brand colour: `#182B3A` (dark mode `#0E1D28`)

## Run

```bash
npm install
npm run start            # Metro
npm run android          # needs the Android SDK and an emulator/device
```

iOS needs full Xcode: `cd ios && bundle install && bundle exec pod install`, then
`npm run ios`. The iOS project has not been built yet.

## Brand assets

`harabia-react-native-assets/` is the original icon/splash pack. Already applied:

- Android (`android/app/src/main/res`): launcher icons (legacy, adaptive and
  Android 13 themed), notification icons, and the launch screen. Android 12+
  (`values-v31/styles.xml`) uses the pack's splash icon; older Android uses
  `drawable/launch_screen.xml`. Colours are in `values/` and `values-night/`.
- iOS (`ios/HArabiaMobile/Images.xcassets`): `AppIcon`, the `Splash` logo and the
  light/dark `SplashBackground` colour, used by `LaunchScreen.storyboard`.
- In the app: `src/assets/logo.png` is shown by `App.tsx`, sized and centred to
  match the native splash, so the logo doesn't move when the app loads.

Not used yet: the store icons in `store/`.

Tested on the Android emulator (API 33, light and dark). The iOS files are in
place but have not been compiled: this machine has no full Xcode.

## Checks

```bash
npx tsc --noEmit
npx eslint .
npm test
```
