import { Canvas, Circle, Group, Line, Path, Skia, vec } from '@shopify/react-native-skia';
import { View } from 'react-native';

import { ScrubArea } from '@/features/health/components/scrub-area';
import { Palette } from '@/constants/theme';

interface Series {
  values: (number | undefined)[];
  max: number;
  min?: number;
  color: string;
}

type LineChartProps = {
  series: Series[];
  width: number;
  height?: number;
  selected?: number;
  onSelect?: (index: number) => void;
};

export function LineChart({ series, width, height = 140, selected, onSelect }: LineChartProps) {
  const n = series[0]?.values.length ?? 0;
  const step = n > 1 ? width / (n - 1) : width;
  const y = (v: number, s: Series) => height - 8 - ((v - (s.min ?? 0)) / (s.max - (s.min ?? 0))) * (height - 16);
  const pick = (x: number) => onSelect?.(Math.min(n - 1, Math.max(0, Math.round(x / step))));

  return (
    <ScrubArea onPick={pick}>
      <Canvas style={{ width, height }}>
        {[0.25, 0.5, 0.75].map((f) => (
          <Line key={f} p1={vec(0, height * f)} p2={vec(width, height * f)} color={Palette.plumFaint} strokeWidth={1} />
        ))}
        {selected !== undefined ? <Line p1={vec(selected * step, 0)} p2={vec(selected * step, height)} color={Palette.plumSoft} strokeWidth={1.5} /> : null}
        {series.map((s, si) => {
          const path = Skia.Path.Make();
          let open = false;
          s.values.forEach((v, i) => {
            if (v === undefined) {
              open = false;
              return;
            }
            if (!open) path.moveTo(i * step, y(v, s));
            else path.lineTo(i * step, y(v, s));
            open = true;
          });
          const sv = selected !== undefined ? s.values[selected] : undefined;
          return (
            <Group key={si}>
              <Path path={path} color={s.color} style="stroke" strokeWidth={2.5} strokeCap="round" strokeJoin="round" />
              {sv !== undefined && selected !== undefined ? <Circle cx={selected * step} cy={y(sv, s)} r={5} color={s.color} /> : null}
            </Group>
          );
        })}
      </Canvas>
    </ScrubArea>
  );
}
