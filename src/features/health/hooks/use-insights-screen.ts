import { useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { useHealthDerived } from '@/features/health/hooks/use-health-derived';
import { useHealthStore } from '@/features/health/store/health-store';
import { cycleDayOn } from '@/features/health/utils/cycles';
import { addDays, rangeKeys } from '@/features/health/utils/dates';
import { computeInsights, symptomStats } from '@/features/health/utils/insights';

export type Range = '30' | '60' | '90';

export function useInsightsScreen() {
  const d = useHealthDerived();
  const isSample = useHealthStore((s) => s.isSample);
  const { width } = useWindowDimensions();
  const [range, setRange] = useState<Range>('60');
  const [openID, setOpenID] = useState<string | undefined>();
  const [selectedDay, setSelectedDay] = useState<string | undefined>();
  const [sleepIndex, setSleepIndex] = useState<number | undefined>();
  const n = Number(range);
  const end = d.today;
  const start = addDays(end, -n + 1);
  const keys = rangeKeys(end, n);
  const insights = computeInsights(d.days, d.symptoms, d.periods, end, n, d.avgCycle);
  const stats = symptomStats(d.symptoms, start, end);
  const heatRows = stats.slice(0, 6).map((s) => s.id);
  const chartW = width - 40 - 32;

  const byCycleDay = Array.from({ length: 35 }, () => 0);
  for (const s of d.symptoms) {
    if (s.date < start || s.date > end || s.symptomID === 'cramps') continue;
    const cd = cycleDayOn(s.date, d.periods);
    if (cd && cd <= 35) byCycleDay[cd - 1] += 1;
  }
  const lateCycle = Math.round(d.avgCycle ?? 29);

  const sleepKeys = rangeKeys(end, Math.min(n, 30));
  const sleepSeries = sleepKeys.map((k) => d.days[k]?.sleepHours);
  const energySeries = sleepKeys.map((k) => d.days[k]?.energy);

  const weeks = Math.floor(n / 7);
  const weekly = Array.from({ length: weeks }, (_, w) => {
    const wEnd = addDays(end, -(weeks - 1 - w) * 7);
    const wKeys = rangeKeys(wEnd, 7);
    const stress = wKeys.map((k) => d.days[k]?.stress).filter((v): v is number => v !== undefined);
    const count = d.symptoms.filter((s) => wKeys.includes(s.date) && s.symptomID !== 'cramps').length;
    return { wEnd, avgStress: stress.length ? stress.reduce((a, b) => a + b, 0) / stress.length : undefined, count };
  });

  const selectedSymptoms = selectedDay ? d.symptoms.filter((s) => s.date === selectedDay) : [];
  const selectedLog = selectedDay ? d.days[selectedDay] : undefined;

  return {
    ...d,
    isSample,
    range,
    setRange,
    openID,
    toggleOpen: (id: string) => setOpenID(openID === id ? undefined : id),
    insights,
    stats,
    keys,
    heatRows,
    chartW,
    selectedDay,
    setSelectedDay,
    selectedSymptoms,
    selectedLog,
    byCycleDay,
    lateCycle,
    sleepKeys,
    sleepSeries,
    energySeries,
    sleepIndex,
    setSleepIndex,
    weekly,
  };
}
