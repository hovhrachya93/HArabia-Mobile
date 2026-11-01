import { useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';

const HIDE_DELAY_MS = 250;

export function useKeyboardHeight(): number {
  const [height, setHeight] = useState(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clear = () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = null;
    };
    const show = Keyboard.addListener('keyboardDidShow', e => {
      clear();
      setHeight(e.endCoordinates.height);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      clear();
      hideTimer.current = setTimeout(() => setHeight(0), HIDE_DELAY_MS);
    });
    return () => {
      clear();
      show.remove();
      hide.remove();
    };
  }, []);

  return height;
}
