import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  useWindowDimensions,
  type GestureResponderEvent,
  type HostInstance,
} from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import {
  BottomTabBarHeightContext,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';
import { brand } from '../theme/palette';
import { useTabBarProgress } from './TabBarVisibility';
import { FONT_FAMILY } from '../theme/fonts';

const BAR_HEIGHT = 58;
const BAR_GAP = 12;
const BAR_LIFT = 10;
const BAR_RADIUS = 22;
const BAR_PAD = 26;
const BEAD = 42;
const BEAD_R = BEAD / 2;
const BEAD_Y = -6;
const DRAG_RISE = 6;
const SOCKET = BEAD_R + 5;
const SHOULDER = 10;
const OVERHANG = BEAD_R - BEAD_Y + DRAG_RISE + 4;
const GLOW_R = BEAD * 0.75;
const SVG_TOP = OVERHANG + 16;
const LONG_PRESS_MS = 260;
const MAX_WIDTH = 560;
const EDGE = 14;
const NARROW = 380;
const ACTIVE = brand.gold;

export function useTabBarSpace(): number {
  const insets = useSafeAreaInsets();
  const inTabs = useContext(BottomTabBarHeightContext) !== undefined;
  return inTabs ? BAR_HEIGHT + BAR_GAP + insets.bottom + BAR_LIFT + 16 : 0;
}

interface Spring {
  v: number;
  vel: number;
  to: number;
}

const spring = (v: number): Spring => ({ v, vel: 0, to: v });

function step(s: Spring, k: number, c: number, dt: number, eps: number) {
  s.vel += (k * (s.to - s.v) - c * s.vel) * dt;
  s.v += s.vel * dt;
  if (Math.abs(s.to - s.v) < eps && Math.abs(s.vel) < eps * 20) {
    s.v = s.to;
    s.vel = 0;
    return true;
  }
  return false;
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

function platePath(
  W: number,
  top: number,
  cx: number,
  cy: number,
  sink: number,
  lean: number,
) {
  const R = BAR_RADIUS;
  const H = BAR_HEIGHT;
  const by = cy - (1 - sink) * (SOCKET + SHOULDER * 2.5);
  const rL = SHOULDER * (1 + lean);
  const rR = SHOULDER * (1 - lean);
  const reach = (r: number) => {
    const q = (SOCKET + r) ** 2 - (r - by) ** 2;
    return q > 0 ? Math.sqrt(q) : null;
  };
  const dL = reach(rL);
  const dR = reach(rR);
  const notched = sink > 0.001 && dL !== null && dR !== null;

  const rl = notched ? clamp(cx - dL!, 2, R) : R;
  const rr = notched ? clamp(W - cx - dR!, 2, R) : R;

  let notch = '';
  if (notched) {
    const cyAbs = top + by;
    const meet = (sx: number, r: number) => {
      const t = SOCKET / (SOCKET + r);
      return [cx + (sx - cx) * t, cyAbs + (top + r - cyAbs) * t];
    };
    const [px, py] = meet(cx - dL!, rL);
    const [qx, qy] = meet(cx + dR!, rR);
    notch =
      `L${cx - dL!},${top} A${rL},${rL} 0 0 1 ${px},${py} ` +
      `A${SOCKET},${SOCKET} 0 0 0 ${qx},${qy} ` +
      `A${rR},${rR} 0 0 1 ${cx + dR!},${top} `;
  }

  return (
    `M${rl},${top} ${notch}L${W - rr},${top} ` +
    `A${rr},${rr} 0 0 1 ${W},${top + rr} L${W},${top + H - R} ` +
    `A${R},${R} 0 0 1 ${W - R},${top + H} L${R},${top + H} ` +
    `A${R},${R} 0 0 1 0,${top + H - R} L0,${top + rl} ` +
    `A${rl},${rl} 0 0 1 ${rl},${top} Z`
  );
}

interface PlateFrame {
  x: number;
  beadY: number;
  lift: number;
  lean: number;
}

function Plate({
  width,
  isDark,
  drawRef,
}: {
  width: number;
  isDark: boolean;
  drawRef: React.RefObject<((frame: PlateFrame) => void) | null>;
}) {
  const [f, setF] = useState<PlateFrame>({
    x: 0,
    beadY: BEAD_Y,
    lift: 0,
    lean: 0,
  });
  drawRef.current = setF;

  return (
    <Svg
      pointerEvents="none"
      width={width}
      height={BAR_HEIGHT + SVG_TOP}
      style={styles.plate}
    >
      <Defs>
        <LinearGradient id="mnPlate" x1="0" y1="0" x2="0" y2="1">
          <Stop
            offset="0"
            stopColor={isDark ? '#1E3445' : '#FFFFFF'}
            stopOpacity={0.97}
          />
          <Stop
            offset="1"
            stopColor={isDark ? '#0E1D28' : '#FFF4DD'}
            stopOpacity={0.97}
          />
        </LinearGradient>
        <LinearGradient id="mnRim" x1="0" y1="0" x2="0" y2="1">
          <Stop
            offset="0"
            stopColor={isDark ? '#FFFFFF' : '#000000'}
            stopOpacity={isDark ? 0.18 : 0.08}
          />
          <Stop
            offset="1"
            stopColor={isDark ? '#FFFFFF' : '#000000'}
            stopOpacity={isDark ? 0.04 : 0.05}
          />
        </LinearGradient>
        <RadialGradient id="mnGlow" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={ACTIVE} stopOpacity={0.22} />
          <Stop offset="0.55" stopColor={ACTIVE} stopOpacity={0.07} />
          <Stop offset="1" stopColor={ACTIVE} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle
        cx={f.x}
        cy={SVG_TOP + f.beadY}
        r={GLOW_R}
        fill="url(#mnGlow)"
        opacity={f.lift}
      />
      <Path
        d={platePath(width, SVG_TOP, f.x, f.beadY, f.lift, f.lean)}
        fill="url(#mnPlate)"
        stroke="url(#mnRim)"
        strokeWidth={1}
      />
    </Svg>
  );
}

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { isDark, rtl } = useSettings();
  const insets = useSafeAreaInsets();
  const idle = isDark ? 'rgba(255,255,255,0.72)' : '#3B4A55';
  const progress = useTabBarProgress();
  const bottom = insets.bottom + BAR_LIFT;
  const { width: windowWidth } = useWindowDimensions();
  const narrow = windowWidth < NARROW;
  const pad = narrow ? 10 : BAR_PAD;
  const edge = Math.max(
    (narrow ? 8 : EDGE) + Math.max(insets.left, insets.right),
    (windowWidth - MAX_WIDTH) / 2,
  );
  const offscreen = BAR_HEIGHT + OVERHANG + bottom + 30;

  const tabs = state.routes.filter(route => route.name !== 'Home');
  const visible = rtl ? [...tabs].reverse() : tabs;
  const focusedKey = state.routes[state.index]?.key;
  const focusedSlot = visible.findIndex(route => route.key === focusedKey);

  const [width, setWidth] = useState(0);
  const slotW = width > 0 ? (width - pad * 2) / visible.length : 0;
  const center = (slot: number) => pad + slotW * (slot + 0.5);
  const nearest = (x: number) =>
    clamp(Math.round((x - pad) / slotW - 0.5), 0, visible.length - 1);

  const sim = useRef({
    x: spring(0),
    lift: spring(0),
    up: spring(0),
    dragging: false,
    ready: false,
  }).current;
  const anim = useRef({
    beadX: new Animated.Value(0),
    beadY: new Animated.Value(BEAD_Y),
    scaleX: new Animated.Value(0),
    scaleY: new Animated.Value(0),
    iconOpacity: new Animated.Value(0),
    near: [] as Animated.Value[],
  }).current;
  while (anim.near.length < visible.length) {
    anim.near.push(new Animated.Value(0));
  }
  const drawPlate = useRef<((frame: PlateFrame) => void) | null>(null);
  const [hover, setHover] = useState(Math.max(0, focusedSlot));
  const hoverRef = useRef(hover);
  const raf = useRef<number | null>(null);

  function draw() {
    if (!slotW) return;
    const x = sim.x.v;
    const lift = clamp(sim.lift.v, 0, 1.2);
    const up = clamp(sim.up.v, 0, 1.2);
    const speed = sim.x.vel;
    const lean = clamp(speed / 1600, -0.45, 0.45);
    const squash = 1 + Math.min(0.12, Math.abs(speed) / 7000);
    const beadY = BEAD_Y - up * DRAG_RISE;
    const scale = lift * (1 + up * 0.08);

    drawPlate.current?.({ x, beadY, lift, lean });
    anim.beadX.setValue(x - BEAD_R);
    anim.beadY.setValue(beadY - BEAD_R);
    anim.scaleX.setValue(scale * squash);
    anim.scaleY.setValue(scale / squash);

    const n = live.current.count;
    for (let slot = 0; slot < n; slot++) {
      const c = pad + slotW * (slot + 0.5);
      anim.near[slot].setValue(
        clamp(1 - Math.abs(x - c) / slotW, 0, 1) * clamp(lift, 0, 1),
      );
    }
    const h = clamp(Math.round((x - pad) / slotW - 0.5), 0, n - 1);
    const hNear = clamp(
      1 - Math.abs(x - (pad + slotW * (h + 0.5))) / slotW,
      0,
      1,
    );
    anim.iconOpacity.setValue(Math.max(up, clamp((hNear - 0.35) / 0.55, 0, 1)));
    if (h !== hoverRef.current) {
      hoverRef.current = h;
      setHover(h);
    }
  }

  function kick() {
    if (raf.current !== null) return;
    let last = Date.now();
    const tick = () => {
      const now = Date.now();
      const dt = Math.min(0.034, (now - last) / 1000);
      last = now;
      let rest = true;
      for (let i = 0; i < 4; i++) {
        const h = dt / 4;
        const xRest = sim.dragging
          ? step(sim.x, 900, 60, h, 0.3)
          : step(sim.x, 320, 26, h, 0.3);
        const lRest = step(sim.lift, 300, 22, h, 0.002);
        const uRest = step(sim.up, 420, 28, h, 0.002);
        rest = xRest && lRest && uRest;
      }
      live.current.draw();
      raf.current = rest && !sim.dragging ? null : requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }

  useEffect(
    () => () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    },
    [],
  );

  useEffect(() => {
    if (!width || sim.dragging) return;
    const lift = focusedSlot >= 0 ? 1 : 0;
    if (focusedSlot >= 0) {
      sim.x.to = center(focusedSlot);
      if (!sim.ready || sim.lift.v < 0.05) sim.x.v = sim.x.to;
    }
    if (!sim.ready) {
      sim.lift.v = lift;
      sim.ready = true;
    }
    sim.lift.to = lift;
    draw();
    kick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedSlot, width]);

  function select(slot: number) {
    const route = visible[slot];
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    if (route.key !== focusedKey && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    } else {
      sim.x.to = focusedSlot >= 0 ? center(focusedSlot) : sim.x.v;
      sim.lift.to = focusedSlot >= 0 ? 1 : 0;
      kick();
    }
  }

  const live = useRef({ select, center, nearest, kick, draw, count: 0 });
  live.current = { select, center, nearest, kick, draw, count: visible.length };

  const barRef = useRef<HostInstance>(null);
  const barX = useRef(0);
  const measure = () =>
    barRef.current?.measureInWindow((x: number) => {
      barX.current = x;
    });

  const touch = useRef({
    timer: null as ReturnType<typeof setTimeout> | null,
    startX: 0,
    onBead: false,
    moved: false,
  }).current;

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => !sim.dragging,
      onPanResponderGrant: (e: GestureResponderEvent) => {
        measure();
        const fx = e.nativeEvent.pageX - barX.current;
        touch.startX = fx;
        touch.moved = false;
        touch.onBead = sim.lift.v > 0.5 && Math.abs(fx - sim.x.v) < BEAD_R + 8;
        touch.timer = setTimeout(() => startDrag(fx), LONG_PRESS_MS);
      },
      onPanResponderMove: (e, g) => {
        const fx = e.nativeEvent.pageX - barX.current;
        if (sim.dragging) {
          const { center: c, count } = live.current;
          sim.x.to = clamp(fx, c(0), c(count - 1));
          live.current.kick();
          return;
        }
        if (Math.abs(g.dx) > 8 || Math.abs(g.dy) > 8) {
          touch.moved = true;
          clearLongPress();
          if (touch.onBead && Math.abs(g.dx) > Math.abs(g.dy)) startDrag(fx);
        }
      },
      onPanResponderRelease: () => finish(true),
      onPanResponderTerminate: () => finish(false),
    }),
  ).current;

  function clearLongPress() {
    if (touch.timer) clearTimeout(touch.timer);
    touch.timer = null;
  }

  function startDrag(fx: number) {
    clearLongPress();
    const { center: c, count, kick: k } = live.current;
    sim.dragging = true;
    sim.x.to = clamp(fx, c(0), c(count - 1));
    if (sim.lift.v < 0.05) sim.x.v = sim.x.to;
    sim.lift.to = 1;
    sim.up.to = 1;
    k();
  }

  function finish(commit: boolean) {
    clearLongPress();
    const { center: c, nearest: n, select: sel, kick: k } = live.current;
    if (sim.dragging) {
      sim.dragging = false;
      sim.up.to = 0;
      const slot = n(sim.x.to);
      sim.x.to = c(slot);
      k();
      if (commit) sel(slot);
    } else if (commit && !touch.moved) {
      const slot = n(touch.startX);
      sim.x.to = c(slot);
      sim.lift.to = 1;
      k();
      sel(slot);
    }
  }

  const hoverRoute = visible[hover];

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.wrap,
        { bottom, left: edge, right: edge, direction: 'ltr' },
        progress && {
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, offscreen],
              }),
            },
          ],
          opacity: progress.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [1, 0.6, 0],
          }),
        },
      ]}
    >
      <View
        ref={barRef}
        style={[styles.bar, isDark ? styles.barDark : styles.barLight]}
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
          measure();
        }}
        {...responder.panHandlers}
      >
        {width > 0 && (
          <>
            <Plate width={width} isDark={isDark} drawRef={drawPlate} />

            <View
              pointerEvents="box-none"
              style={[styles.row, { paddingHorizontal: pad }]}
            >
              {visible.map((route, slot) => {
                const { options } = descriptors[route.key];
                const label =
                  typeof options.tabBarLabel === 'string'
                    ? options.tabBarLabel
                    : options.title ?? route.name;
                const near = anim.near[slot];
                return (
                  <View
                    key={route.key}
                    style={styles.item}
                    accessible
                    accessibilityRole="tab"
                    accessibilityState={{ selected: slot === focusedSlot }}
                    accessibilityLabel={label}
                    accessibilityActions={[{ name: 'activate' }]}
                    onAccessibilityAction={() => select(slot)}
                  >
                    <Animated.View
                      style={{
                        opacity: near.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0],
                        }),
                        transform: [
                          {
                            translateY: near.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, -8],
                            }),
                          },
                          {
                            scale: near.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 0.6],
                            }),
                          },
                        ],
                      }}
                    >
                      {options.tabBarIcon?.({
                        focused: false,
                        color: idle,
                        size: 22,
                      })}
                    </Animated.View>
                    <Animated.Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.7}
                      style={[
                        styles.label,
                        {
                          color: near.interpolate({
                            inputRange: [0, 1],
                            outputRange: [idle, ACTIVE],
                          }),
                        },
                      ]}
                    >
                      {label}
                    </Animated.Text>
                  </View>
                );
              })}
            </View>

            <Animated.View
              pointerEvents="none"
              style={[
                styles.bead,
                {
                  transform: [
                    { translateX: anim.beadX },
                    { translateY: anim.beadY },
                    { scaleX: anim.scaleX },
                    { scaleY: anim.scaleY },
                  ],
                },
              ]}
            >
              <Animated.View style={{ opacity: anim.iconOpacity }}>
                {hoverRoute &&
                  descriptors[hoverRoute.key].options.tabBarIcon?.({
                    focused: true,
                    color: '#FFFFFF',
                    size: 20,
                  })}
              </Animated.View>
            </Animated.View>
          </>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    zIndex: 100,
    elevation: 24,
  },
  bar: {
    height: BAR_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
  },
  barDark: { shadowOpacity: 0.5 },
  barLight: { shadowOpacity: 0.18 },
  plate: { position: 'absolute', left: 0, top: -SVG_TOP },
  row: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    height: BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 9,
    gap: 3,
  },
  label: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontFamily: FONT_FAMILY,
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 1,
  },
  bead: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: BEAD,
    height: BEAD,
    borderRadius: BEAD_R,
    backgroundColor: ACTIVE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ACTIVE,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
});
