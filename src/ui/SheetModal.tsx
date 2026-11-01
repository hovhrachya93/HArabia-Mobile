import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { MODAL_ORIENTATIONS, sheetFrame } from './sheet';

export function SheetModal({
  visible,
  onClose,
  style,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) {
  const { colors } = useSettings();
  const [mounted, setMounted] = useState(visible);
  const [sheetHeight, setSheetHeight] = useState(600);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.timing(progress, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => finished && setMounted(false));
    }
  }, [visible, progress]);

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      supportedOrientations={MODAL_ORIENTATIONS}
      onRequestClose={onClose}
    >
      <View style={sheetFrame.root}>
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colors.overlay, opacity: progress },
          ]}
        />
        <Pressable style={sheetFrame.backdrop} onPress={onClose} />
        <Animated.View
          onLayout={e => setSheetHeight(e.nativeEvent.layout.height)}
          style={[
            sheetFrame.sheet,
            style,
            {
              transform: [
                {
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [sheetHeight + 40, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}
