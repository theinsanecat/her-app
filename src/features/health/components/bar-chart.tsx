import { Canvas, Circle, Path, RoundedRect, Skia } from '@shopify/react-native-skia';

import { Palette } from '@/constants/theme';

type BarChartProps = {
  bars: number[];
  max: number;
  width: number;
  height?: number;
  color?: string;
  line?: (number | undefined)[];
  lineMax?: number;
  highlight?: number[];
};

export function BarChart({ bars, max, width, height = 120, color = Palette.rose, line, lineMax = 10, highlight }: BarChartProps) {
  const slot = width / bars.length;
  const bw = Math.max(2, slot * 0.62);
  const path = Skia.Path.Make();
  let open = false;
  (line ?? []).forEach((v, i) => {
    if (v === undefined) return;
    const x = i * slot + slot / 2;
    const yy = height - 4 - (v / lineMax) * (height - 12);
    if (!open) path.moveTo(x, yy);
    else path.lineTo(x, yy);
    open = true;
  });
  return (
    <Canvas style={{ width, height }}>
      {bars.map((v, i) => {
        const h = max > 0 ? (v / max) * (height - 12) : 0;
        const hl = highlight?.includes(i);
        return <RoundedRect key={i} x={i * slot + (slot - bw) / 2} y={height - h} width={bw} height={Math.max(h, 2)} r={Math.min(4, bw / 2)} color={hl ? Palette.rose : color} opacity={v ? 1 : 0.3} />;
      })}
      {line ? <Path path={path} color={Palette.plum} style="stroke" strokeWidth={2} strokeCap="round" /> : null}
      {line
        ? line.map((v, i) => (v === undefined ? null : <Circle key={`c${i}`} cx={i * slot + slot / 2} cy={height - 4 - (v / lineMax) * (height - 12)} r={3} color={Palette.plum} />))
        : null}
    </Canvas>
  );
}
