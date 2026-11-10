import { Canvas, Circle, Path, Skia } from '@shopify/react-native-skia';

import { Palette } from '@/constants/theme';

type SparklineProps = {
  values: (number | undefined)[];
  max: number;
  min?: number;
  width?: number;
  height?: number;
  color?: string;
};

export function Sparkline({ values, max, min = 0, width = 96, height = 32, color = Palette.rose }: SparklineProps) {
  const path = Skia.Path.Make();
  const step = values.length > 1 ? width / (values.length - 1) : width;
  let started = false;
  let last: { x: number; y: number } | undefined;
  values.forEach((v, i) => {
    if (v === undefined) return;
    const x = i * step;
    const y = height - 4 - ((v - min) / (max - min || 1)) * (height - 8);
    if (!started) {
      path.moveTo(x, y);
      started = true;
    } else path.lineTo(x, y);
    last = { x, y };
  });
  return (
    <Canvas style={{ width, height }}>
      <Path path={path} color={color} style="stroke" strokeWidth={2} strokeCap="round" strokeJoin="round" />
      {last ? <Circle cx={last.x} cy={last.y} r={3.5} color={Palette.plum} /> : null}
    </Canvas>
  );
}
