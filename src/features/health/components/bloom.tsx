import { Canvas, Circle, Group } from '@shopify/react-native-skia';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDerivedValue, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { Palette } from '@/constants/theme';
import { BloomPetal } from '@/features/health/components/bloom-petal';
import type { PetalValue } from '@/features/health/utils/bloom';
import { timing } from '@/lib/motion';

const COLORS = [Palette.blush, Palette.rose, Palette.lavender, Palette.wisteria, Palette.peony];
const PAD_X = 52;
const PAD_Y = 34;

type BloomProps = {
  petals: PetalValue[];
  token: number;
  size?: number;
  halo?: boolean;
};

export function Bloom({ petals, token, size = 200, halo }: BloomProps) {
  const c = size / 2;
  const length = size * 0.46;
  const width = size * 0.3;
  const haloOpacity = useSharedValue(0);
  useEffect(() => {
    if (!halo) return;
    haloOpacity.set(0);
    haloOpacity.set(withDelay(420, withTiming(0.55, timing.draw)));
  }, [halo, token, haloOpacity]);
  const haloO = useDerivedValue(() => haloOpacity.get());

  return (
    <View style={{ width: size + PAD_X * 2, height: size + PAD_Y * 2 }} accessibilityLabel={petals.map((p) => `${p.label} ${p.display}`).join(', ')}>
      <Canvas style={{ width: size, height: size, position: 'absolute', left: PAD_X, top: PAD_Y }}>
        <Group>
          <Circle cx={c} cy={c} r={size * 0.49} color={Palette.lavender} opacity={haloO} style="stroke" strokeWidth={3} />
          {petals.map((p, i) => (
            <BloomPetal key={p.key} index={i} cx={c} cy={c} length={length} width={width} value={p.value} color={COLORS[i]} token={token} />
          ))}
          <Circle cx={c} cy={c} r={size * 0.075} color={Palette.ivory} />
          <Circle cx={c} cy={c} r={size * 0.045} color={Palette.plum} />
        </Group>
      </Canvas>
      <View pointerEvents="none" className="absolute inset-0">
        {petals.map((p, i) => {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const r = size * 0.6;
          return (
            <View key={p.key} className="absolute items-center" style={{ left: PAD_X + c + Math.cos(angle) * r - 36, top: PAD_Y + c + Math.sin(angle) * r - 16, width: 72 }}>
              <Text className="text-xs font-semibold text-foreground" numberOfLines={1}>
                {p.label}
              </Text>
              <Text className="text-xs text-muted" numberOfLines={1}>
                {p.display}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
