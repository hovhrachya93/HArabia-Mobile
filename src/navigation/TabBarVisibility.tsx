import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  Animated,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

const SHOW_AFTER_MS = 700;
const THRESHOLD = 6;
const TOP_ZONE = 60;

interface Visibility {
  progress: Animated.Value;
  show: () => void;
  hide: () => void;
}

const VisibilityContext = createContext<Visibility | null>(null);

export function TabBarVisibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const progress = useRef(new Animated.Value(0)).current;
  const hidden = useRef(false);

  const value = useMemo<Visibility>(() => {
    const animate = (to: 0 | 1) => {
      if (hidden.current === (to === 1)) return;
      hidden.current = to === 1;
      Animated.timing(progress, {
        toValue: to,
        duration: to ? 220 : 260,
        useNativeDriver: true,
      }).start();
    };
    return { progress, show: () => animate(0), hide: () => animate(1) };
  }, [progress]);

  return (
    <VisibilityContext.Provider value={value}>
      {children}
    </VisibilityContext.Provider>
  );
}

export function useTabBarProgress(): Animated.Value | null {
  return useContext(VisibilityContext)?.progress ?? null;
}

export function useHideTabBarOnScroll() {
  const visibility = useContext(VisibilityContext);
  const lastY = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      visibility?.show();
    },
    [visibility],
  );

  return useMemo(() => {
    if (!visibility) return {};
    return {
      scrollEventThrottle: 16,
      onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = event.nativeEvent.contentOffset.y;
        const dy = y - lastY.current;
        lastY.current = y;
        if (y < TOP_ZONE || dy < -THRESHOLD) visibility.show();
        else if (dy > THRESHOLD) visibility.hide();
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(visibility.show, SHOW_AFTER_MS);
      },
    };
  }, [visibility]);
}
