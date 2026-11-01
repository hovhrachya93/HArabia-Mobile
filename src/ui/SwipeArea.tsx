import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Easing,
  PanResponder,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

const START_DISTANCE = 24;
const SWITCH_DISTANCE = 60;
const SWITCH_VELOCITY = 0.3;
const SLIDE = 40;

export function SwipeArea<T extends string>({
  value,
  order,
  onChange,
  children,
  style,
}: {
  value: T;
  order: readonly T[];
  onChange: (value: T) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  const previous = useRef(value);
  const latest = useRef({ value, order, onChange });
  latest.current = { value, order, onChange };

  const responder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) =>
          Math.abs(g.dx) > START_DISTANCE &&
          Math.abs(g.dx) > Math.abs(g.dy) * 2,
        onPanResponderRelease: (_, g) => {
          if (
            Math.abs(g.dx) < SWITCH_DISTANCE &&
            Math.abs(g.vx) < SWITCH_VELOCITY
          )
            return;
          const current = latest.current;
          const index = current.order.indexOf(current.value);
          const next = current.order[index + (g.dx < 0 ? 1 : -1)];
          if (next !== undefined) current.onChange(next);
        },
      }),
    [],
  );

  useEffect(() => {
    if (previous.current === value) return;
    const forward =
      latest.current.order.indexOf(value) >
      latest.current.order.indexOf(previous.current);
    previous.current = value;
    anim.setValue(forward ? 1 : -1);
    Animated.timing(anim, {
      toValue: 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [value, anim]);

  const motion = {
    opacity: anim.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0.3, 1, 0.3],
    }),
    transform: [
      {
        translateX: anim.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-SLIDE, 0, SLIDE],
        }),
      },
    ],
  };

  return (
    <Animated.View {...responder.panHandlers} style={[style, motion]}>
      {children}
    </Animated.View>
  );
}
