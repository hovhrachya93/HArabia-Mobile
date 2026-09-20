# HArabia React Native assets

Complete mobile branding pack for Expo and bare React Native projects.

## Expo setup

1. Copy the PNG files from `expo/` into your project, for example `assets/harabia/`.
2. Merge `expo/app.json.example` into your existing Expo configuration.
3. Keep the background color `#182B3A`; the adaptive foreground and splash icon were designed for this color.

Main Expo files:

- `icon.png` — 1024×1024 opaque application icon
- `adaptive-icon-foreground.png` — Android safe-zone foreground
- `monochrome-icon.png` — Android 13 themed icon
- `splash-icon.png` — transparent native splash-screen mark
- `notification-icon.png` — white transparent Android notification icon

## Bare React Native: iOS

Copy `ios/AppIcon.appiconset/` into your Xcode `Images.xcassets` directory. It contains iPhone, iPad and App Store icon sizes with a valid `Contents.json`.

Copy `ios/Splash.imageset/` into `Images.xcassets` and place the image in the center of your `LaunchScreen.storyboard`. Set the launch-screen background to:

```text
#182B3A
```

## Bare React Native: Android

Merge the contents of `android/res/` into `android/app/src/main/res/`.

- Density-specific legacy icons are in `mipmap-*`.
- Adaptive launcher definitions are in `mipmap-anydpi-v26`.
- Android 13 monochrome and adaptive foreground resources are in `drawable-nodpi`.
- `launch_screen.xml` supports a centered-logo legacy launch screen.
- `android-12-splash-theme.xml.example` shows the Android 12 SplashScreen API theme.

Use the notification assets from `android/notification/drawable-*` with Firebase or Notifee. Android notification icons must be white with transparency.

## Full-screen splash previews

- `splash/splash-portrait-1242x2688.png`
- `splash/splash-landscape-2688x1242.png`

The operating systems normally build launch screens from a background color plus a centered image. The full-screen files are included for design previews, onboarding, or a custom React Native splash screen after native startup.

## Store artwork

- `store/app-store-icon-1024.png`
- `store/play-store-icon-512.png`

Both store icons are opaque and ready for upload. Always verify current Apple and Google submission requirements before release.
