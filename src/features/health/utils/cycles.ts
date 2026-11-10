import type { CycleRecord, DayLog, Period } from '@/features/health/types/health';
import { addDays, diffDays } from '@/features/health/utils/dates';

function isBleeding(day: DayLog | undefined): boolean {
  return day?.flow === 'light' || day?.flow === 'medium' || day?.flow === 'heavy';
}

export function derivePeriods(days: Record<string, DayLog>): Period[] {
  const keys = Object.keys(days).filter((k) => isBleeding(days[k])).sort();
  const periods: Period[] = [];
  for (const key of keys) {
    const last = periods[periods.length - 1];
    if (last && diffDays(key, last.end) <= 2) {
      last.end = key;
      last.length = diffDays(key, last.start) + 1;
      continue;
    }
    periods.push({ start: key, end: key, length: 1 });
  }
  return periods;
}

export function deriveCycles(periods: Period[]): CycleRecord[] {
  return periods.map((p, i) => {
    const next = periods[i + 1];
    return { start: p.start, periodLength: p.length, length: next ? diffDays(next.start, p.start) : undefined };
  });
}

export function averageCycleLength(cycles: CycleRecord[], fallback?: number): number | undefined {
  const lengths = cycles.map((c) => c.length).filter((l): l is number => typeof l === 'number');
  if (lengths.length === 0) return fallback;
  return Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
}

/** Cycle day (1-based) of a date, from the most recent recorded period start on or before it. */
export function cycleDayOn(date: string, periods: Period[]): number | undefined {
  let start: string | undefined;
  for (const p of periods) {
    if (p.start <= date) start = p.start;
  }
  if (!start) return undefined;
  return diffDays(date, start) + 1;
}

/** Signed distance (days) from a date to the nearest recorded period start. */
export function distanceToPeriodStart(date: string, periods: Period[]): number | undefined {
  let best: number | undefined;
  for (const p of periods) {
    const d = diffDays(date, p.start);
    if (best === undefined || Math.abs(d) < Math.abs(best)) best = d;
  }
  return best;
}

export function predictedNextStart(periods: Period[], avg?: number): string | undefined {
  const last = periods[periods.length - 1];
  if (!last || !avg) return undefined;
  return addDays(last.start, avg);
}
