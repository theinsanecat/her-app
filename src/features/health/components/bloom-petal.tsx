import { Group, Oval } from '@shopify/react-native-skia';
import { useEffect } from 'react';
import { useDerivedValue, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { Palette } from '@/constants/theme';
import { timing } from '@/lib/motion';

type BloomPetalProps = {
  index: number;
  cx: number;
  cy: number;
  length: number;
  width: number;
  value: number;
  color: string;
  token: number;
};

export function BloomPetal({ index, cx, cy, length, width, value, color, token }: BloomPetalProps) {
  const fill = useSharedValue(0);
  useEffect(() => {
    fill.set(0);
    fill.set(withDelay(index * 70, withTiming(value, timing.draw)));
  }, [value, token, index, fill]);

  const rotation = (index * 2 * Math.PI) / 5;
  const rect = { x: cx - width / 2, y: cy - length, width, height: length };
  const fillTransform = useDerivedValue(() => [{ scale: Math.max(0.001, fill.get()) }]);

  return (
    <Group transform={[{ rotate: rotation }]} origin={{ x: cx, y: cy }}>
      <Oval rect={rect} color={Palette.ivoryGlass} />
      <Oval rect={rect} color={Palette.plumFaint} style="stroke" strokeWidth={1} />
      <Group transform={fillTransform} origin={{ x: cx, y: cy }}>
        <Oval rect={rect} color={color} opacity={0.88} />
      </Group>
    </Group>
  );
}
