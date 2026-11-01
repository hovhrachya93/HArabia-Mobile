import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';
import { brand } from '../theme/palette';
import { AppText } from './AppText';

export function HArabiaMark({ size = 36 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="24 24 232 232">
      <Defs>
        <LinearGradient
          id="panel"
          x1="36"
          y1="28"
          x2="244"
          y2="256"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#233E50" />
          <Stop offset="1" stopColor="#0E1D28" />
        </LinearGradient>
        <LinearGradient
          id="gold"
          x1="90"
          y1="86"
          x2="190"
          y2="164"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#E9BA63" />
          <Stop offset="1" stopColor="#C98B2E" />
        </LinearGradient>
        <LinearGradient
          id="dune"
          x1="48"
          y1="199"
          x2="233"
          y2="199"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#E9BA63" />
          <Stop offset="0.56" stopColor="#C98B2E" />
          <Stop offset="1" stopColor="#B8573F" />
        </LinearGradient>
        <ClipPath id="panelClip">
          <Rect x="24" y="24" width="232" height="232" rx="48" />
        </ClipPath>
      </Defs>
      <Rect x="24" y="24" width="232" height="232" rx="48" fill="url(#panel)" />
      <G clipPath="url(#panelClip)">
        <Circle cx="140" cy="109" r="46" fill="#C98B2E" fillOpacity={0.13} />
      </G>
      <Rect x="68" y="66" width="25" height="128" rx="12.5" fill="#FFF8ED" />
      <Rect x="187" y="66" width="25" height="128" rx="12.5" fill="#FFF8ED" />
      <Path
        d="M89 150V136C108 134 119 109 140 91C161 109 172 134 191 136V150H166V137C166 121 156 108 140 97C124 108 114 121 114 137V150H89Z"
        fill="url(#gold)"
      />
      <Circle cx="140" cy="83" r="4.5" fill="#E9BA63" />
      <Path
        d="M49 205C79 179 113 182 139 201C164 219 191 221 231 192"
        stroke="url(#dune)"
        strokeWidth={10}
        strokeLinecap="round"
      />
      <Path
        d="M60 222C91 207 119 207 145 219C169 230 192 228 220 211"
        stroke="#147C72"
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.92}
      />
    </Svg>
  );
}

export function HArabiaWordmark({
  size = 24,
  light = false,
}: {
  size?: number;
  light?: boolean;
}) {
  return (
    <View style={styles.row}>
      <AppText
        style={[styles.word, { fontSize: size, lineHeight: size * 1.2 }]}
        color={light ? brand.sandLight : brand.night}
      >
        <AppText
          style={[styles.word, { fontSize: size }]}
          color={brand.gold}
        >
          H
        </AppText>
        Arabia
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  word: { fontWeight: '800', letterSpacing: 0.3 },
});
