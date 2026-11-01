import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { AppText } from '../ui/AppText';

export function MarkedText({ text }: { text: string }) {
  const { isDark } = useSettings();
  const parts = text.split(/==(.+?)==/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <AppText
            key={i}
            style={{
              backgroundColor: isDark
                ? 'rgba(233,186,99,0.28)'
                : 'rgba(233,186,99,0.45)',
              fontWeight: '600',
            }}
          >
            {part}
          </AppText>
        ) : (
          part
        ),
      )}
    </>
  );
}
