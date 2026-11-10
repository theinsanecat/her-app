import { symptomByID } from '@/features/health/data/catalog';
import type { DayLog, Period, SymptomEntry } from '@/features/health/types/health';
import type { Factor, InsightsResult, Observation, PairObservation } from '@/features/health/types/insights';
import { distanceToPeriodStart } from '@/features/health/utils/cycles';
import { addDays } from '@/features/health/utils/dates';

const MIN_DAYS = 14;
const MIN_ENTRIES = 4;

export const isPoorSleep = (d: DayLog | undefined) => !!d && ((d.sleepHours !== undefined && d.sleepHours < 6) || (d.sleepQuality !== undefined && d.sleepQuality <= 2));
export const isHighStress = (d: DayLog | undefined) => !!d && d.stress !== undefined && d.stress >= 7;
const inCycleWindow = (date: string, periods: Period[]) => {
  const d = distanceToPeriodStart(date, periods);
  return d !== undefined && d >= -3 && d <= 1;
};

interface FactorStat {
  hits: number;
  total: number;
  factorDays: number;
  loggedDays: number;
}

function lower(label: string): string {
  return label.charAt(0).toLowerCase() + label.slice(1);
}

function associated(stat: FactorStat): boolean {
  if (stat.factorDays < 3 || stat.hits < 3) return false;
  const rateWith = stat.hits / stat.factorDays;
  const otherDays = stat.loggedDays - stat.factorDays;
  const rateWithout = otherDays > 0 ? (stat.total - stat.hits) / otherDays : 0;
  return rateWith >= 2 * rateWithout && stat.hits / stat.total >= 0.35;
}

export function computeInsights(days: Record<string, DayLog>, symptoms: SymptomEntry[], periods: Period[], end: string, rangeDays: number, avgCycle?: number): InsightsResult {
  const start = addDays(end, -rangeDays + 1);
  const logged = Object.values(days).filter((d) => d.checkedIn && d.date >= start && d.date <= end);
  const loggedDays = logged.length;
  const inRange = symptoms.filter((s) => s.date >= start && s.date <= end);
  const base = { loggedDays, rangeDays, daysNeeded: Math.max(0, MIN_DAYS - loggedDays), observations: [], pairs: [] };
  if (loggedDays < MIN_DAYS) return { ...base, enough: false };

  const bySymptom = new Map<string, Set<string>>();
  for (const s of inRange) {
    const set = bySymptom.get(s.symptomID) ?? new Set<string>();
    set.add(s.date);
    bySymptom.set(s.symptomID, set);
  }

  const poorDays = logged.filter(isPoorSleep).length;
  const stressDays = logged.filter(isHighStress).length;
  const cyclesInData = periods.filter((p) => p.start >= addDays(start, -3) && p.start <= addDays(end, 3)).length;
  const windowDays = logged.filter((d) => inCycleWindow(d.date, periods)).length;

  const observations: Observation[] = [];
  for (const [symptomID, dates] of bySymptom) {
    const total = dates.size;
    if (total < MIN_ENTRIES || symptomID === 'cramps') continue;
    const list = [...dates];
    const label = symptomByID(symptomID).label;
    const noun = lower(label);
    const sleepStat = { hits: list.filter((d) => isPoorSleep(days[d])).length, total, factorDays: poorDays, loggedDays };
    const stressStat = { hits: list.filter((d) => isHighStress(days[d])).length, total, factorDays: stressDays, loggedDays };
    const cycleStat = { hits: list.filter((d) => inCycleWindow(d, periods)).length, total, factorDays: windowDays, loggedDays };
    const cycleCount = new Set(list.filter((d) => inCycleWindow(d, periods)).map((d) => periods.find((p) => Math.abs((new Date(p.start).getTime() - new Date(d).getTime()) / 86400000) <= 4)?.start)).size;

    const factors: Factor[] = [];
    const support: string[] = [];
    if (associated(sleepStat)) {
      factors.push('sleep');
      support.push(`${sleepStat.hits} of ${total} ${noun} days followed a short or restless night. Poor sleep was logged on ${poorDays} of your ${loggedDays} check-in days.`);
    }
    if (associated(stressStat)) {
      factors.push('stress');
      support.push(`${stressStat.hits} of ${total} ${noun} days were high-stress days (7 or more). High stress was logged on ${stressDays} of ${loggedDays} days.`);
    }
    if (cyclesInData >= 2 && cycleCount >= 2 && associated(cycleStat)) {
      factors.push('cycle');
      support.push(`${cycleStat.hits} of ${total} fell within 3 days before to 1 day after a recorded period start, across ${cycleCount} different cycles.`);
    }
    if (factors.length === 0) continue;

    const main = factors[0];
    const window = `your last ${rangeDays} days`;
    const lead =
      main === 'sleep'
        ? `Your ${noun} entries have frequently coincided with poor sleep over ${window}.`
        : main === 'stress'
          ? `Your ${noun} entries have often landed on higher-stress days over ${window}.`
          : `Your ${noun} entries tend to cluster around the start of your recorded periods.`;
    const extras: string[] = [];
    if (main !== 'stress' && factors.includes('stress')) extras.push('Many were also on higher-stress days.');
    if (main !== 'cycle' && factors.includes('cycle')) extras.push('Some also appear around a recurring phase of your recorded menstrual cycles.');
    const hits = Math.max(sleepStat.hits, stressStat.hits, cycleStat.hits);
    const title = `${label} ${factors.map((f) => (f === 'sleep' ? 'poor sleep' : f === 'stress' ? 'stress' : 'cycle timing')).map((f, i) => (i === 0 ? `& ${f}` : `· ${f}`)).join(' ')}`;

    observations.push({
      id: `${symptomID}-${factors.join('-')}`,
      symptomID,
      title,
      headline: [lead, ...extras].join(' '),
      factors,
      support,
      meaning: meaningFor(factors, noun),
      cannotConclude: `This shows timing, not cause. ${total} entries over ${rangeDays} days is a small sample, other factors you didn't log could be involved, and HER can't tell whether one thing leads to the other${factors.includes('cycle') ? ' or whether any hormone is responsible' : ''}.`,
      discuss: discussFor(factors, label),
      strength: hits >= 6 && total >= 8 ? 'Recurring pattern' : 'Early pattern',
      entries: total,
    });
  }
  observations.sort((a, b) => b.entries * b.factors.length - a.entries * a.factors.length);

  const pairs: PairObservation[] = [];
  const ids = [...bySymptom.keys()];
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const A = bySymptom.get(ids[i]) ?? new Set<string>();
      const B = bySymptom.get(ids[j]) ?? new Set<string>();
      const together = [...A].filter((d) => B.has(d)).length;
      if (together >= 3 && together / Math.min(A.size, B.size) >= 0.4) pairs.push({ a: ids[i], b: ids[j], together, ofA: A.size, ofB: B.size });
    }
  }
  pairs.sort((a, b) => b.together - a.together);

  return { ...base, enough: true, observations, pairs: pairs.slice(0, 5) };
}

function meaningFor(factors: Factor[], noun: string): string {
  const parts: string[] = [];
  if (factors.includes('sleep')) parts.push(`Sleep loss is a recognised trigger for some people's headaches, fatigue and concentration problems, so short nights may be one piece of your ${noun} picture, or both may share a cause such as stress or pain.`);
  if (factors.includes('stress')) parts.push('Stress affects sleep, digestion, muscle tension and pain sensitivity, so it may be part of the picture rather than the whole explanation.');
  if (factors.includes('cycle')) parts.push(`Some symptoms are known to follow menstrual timing for some people (for example menstrual migraine or premenstrual bloating). A cycle-linked pattern in your ${noun} is worth noting, not assuming.`);
  return parts.join(' ');
}

function discussFor(factors: Factor[], label: string): string {
  const q: string[] = [`Show this pattern and your ${label.toLowerCase()} timeline from Doctor Mode.`];
  if (factors.includes('sleep')) q.push('Ask whether your sleep itself is worth looking into.');
  if (factors.includes('cycle')) q.push('Ask whether a cycle-linked pattern changes how your symptoms should be assessed.');
  if (factors.includes('stress')) q.push('Mention how stress and symptoms have tracked together.');
  return q.join(' ');
}

/** Per-symptom stats for reports and Understand My Symptoms. */
export function symptomStats(symptoms: SymptomEntry[], start: string, end: string) {
  const map = new Map<string, { count: number; total: number; max: number; first: string; last: string; triggers: Map<string, number> }>();
  for (const s of symptoms) {
    if (s.date < start || s.date > end) continue;
    const st = map.get(s.symptomID) ?? { count: 0, total: 0, max: 0, first: s.date, last: s.date, triggers: new Map<string, number>() };
    st.count += 1;
    st.total += s.severity;
    st.max = Math.max(st.max, s.severity);
    if (s.date < st.first) st.first = s.date;
    if (s.date > st.last) st.last = s.date;
    for (const t of s.triggers) st.triggers.set(t, (st.triggers.get(t) ?? 0) + 1);
    map.set(s.symptomID, st);
  }
  return [...map.entries()]
    .map(([id, st]) => ({
      id,
      count: st.count,
      avg: Math.round((st.total / st.count) * 10) / 10,
      max: st.max,
      first: st.first,
      last: st.last,
      topTriggers: [...st.triggers.entries()].filter(([t]) => t !== 'Not sure').sort((a, b) => b[1] - a[1]).slice(0, 2).map(([t]) => t),
    }))
    .sort((a, b) => b.count - a.count);
}
