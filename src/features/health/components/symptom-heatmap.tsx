import { Canvas, Rect, RoundedRect } from '@shopify/react-native-skia';
import { Text, View } from 'react-native';

import { ScrubArea } from '@/features/health/components/scrub-area';
import { Palette, severityColor } from '@/constants/theme';
import { symptomByID } from '@/features/health/data/catalog';
import type { DayLog, SymptomEntry } from '@/features/health/types/health';

type SymptomHeatmapProps = {
  keys: string[];
  rows: string[];
  symptoms: SymptomEntry[];
  days: Record<string, DayLog>;
  width: number;
  selected?: string;
  onSelect: (date: string) => void;
};

const LABEL_W = 112;
const ROW_H = 22;
const BAND_H = 10;

export function SymptomHeatmap({ keys, rows, symptoms, days, width, selected, onSelect }: SymptomHeatmapProps) {
  const gridW = width - LABEL_W;
  const cell = gridW / keys.length;
  const height = BAND_H + 6 + rows.length * ROW_H;
  const sev = new Map<string, number>();
  for (const s of symptoms) {
    const k = `${s.symptomID}|${s.date}`;
    sev.set(k, Math.max(sev.get(k) ?? 0, s.severity));
  }
  const selIndex = selected ? keys.indexOf(selected) : -1;
  const pick = (x: number) => {
    const i = Math.min(keys.length - 1, Math.max(0, Math.floor(x / cell)));
    onSelect(keys[i]);
  };

  return (
    <View className="flex-row">
      <View style={{ width: LABEL_W, paddingTop: BAND_H + 6 }}>
        {rows.map((r) => (
          <View key={r} style={{ height: ROW_H }} className="justify-center">
            <Text className="text-xs text-muted" numberOfLines={1}>
              {symptomByID(r).label}
            </Text>
          </View>
        ))}
      </View>
      <ScrubArea onPick={pick}>
        <Canvas style={{ width: gridW, height }}>
          {selIndex >= 0 ? <RoundedRect x={selIndex * cell - 1} y={0} width={cell + 2} height={height} r={3} color={Palette.lilac} /> : null}
          {keys.map((k, i) => {
            const flow = days[k]?.flow;
            if (!flow || flow === 'spotting') return null;
            return <Rect key={`p${k}`} x={i * cell} y={0} width={cell + 0.5} height={BAND_H} color={Palette.blush} />;
          })}
          {rows.map((r, ri) =>
            keys.map((k, i) => {
              const v = sev.get(`${r}|${k}`);
              return <RoundedRect key={`${r}${k}`} x={i * cell + 0.5} y={BAND_H + 6 + ri * ROW_H + 3} width={Math.max(1, cell - 1)} height={ROW_H - 6} r={Math.min(3, cell / 3)} color={v ? severityColor(v) : Palette.plumFaint} opacity={v ? 1 : 0.35} />;
            }),
          )}
        </Canvas>
      </ScrubArea>
    </View>
  );
}
