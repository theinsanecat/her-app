import { symptomByID } from '@/features/health/data/catalog';
import type { CycleRecord, DayLog, DoctorQuestion, Medication, Period, Profile, SymptomEntry } from '@/features/health/types/health';
import type { Observation } from '@/features/health/types/insights';
import { addDays, longDate, rangeKeys, shortDate } from '@/features/health/utils/dates';
import { symptomStats } from '@/features/health/utils/insights';

export interface ReportInput {
  today: string;
  rangeDays: number;
  profile: Profile;
  days: Record<string, DayLog>;
  symptoms: SymptomEntry[];
  periods: Period[];
  cycles: CycleRecord[];
  avgCycle?: number;
  medications: Medication[];
  questions: DoctorQuestion[];
  observations: Observation[];
  isSample: boolean;
}

export function buildReport(i: ReportInput) {
  const start = addDays(i.today, -i.rangeDays + 1);
  const keys = rangeKeys(i.today, i.rangeDays);
  const logs = keys.map((k) => i.days[k]).filter((d): d is DayLog => !!d?.checkedIn);
  const avg = (xs: (number | undefined)[]) => {
    const v = xs.filter((x): x is number => x !== undefined);
    return v.length ? Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10 : undefined;
  };
  const stats = symptomStats(i.symptoms, start, i.today);
  const periods = i.periods.filter((p) => p.end >= start);
  const lengths = i.cycles.map((c) => c.length).filter((x): x is number => !!x);
  const spotting = keys.filter((k) => i.days[k]?.flow === 'spotting').length;
  const sleepAvg = avg(logs.map((d) => d.sleepHours));
  const shortNights = logs.filter((d) => d.sleepHours !== undefined && d.sleepHours < 6).length;
  const stressAvg = avg(logs.map((d) => d.stress));
  const highStress = logs.filter((d) => (d.stress ?? 0) >= 7).length;
  const medDays = (id: string) => keys.filter((k) => i.days[k]?.medsTaken.includes(id)).length;
  const timeline = stats.slice(0, 4).map((s) => ({
    id: s.id,
    label: symptomByID(s.id).label,
    weeks: Array.from({ length: Math.ceil(i.rangeDays / 7) }, (_, w) => {
      const wk = rangeKeys(addDays(i.today, -w * 7), 7);
      return i.symptoms.filter((x) => x.symptomID === s.id && wk.includes(x.date)).length;
    }).reverse(),
  }));

  return { start, logs: logs.length, stats, periods, lengths, spotting, sleepAvg, shortNights, stressAvg, highStress, medDays, timeline };
}

export function reportText(i: ReportInput): string {
  const r = buildReport(i);
  const lines: string[] = [];
  lines.push('HER — Health summary for my appointment');
  if (i.isSample) lines.push('SAMPLE REPORT — FICTIONAL DATA FOR DEMONSTRATION');
  lines.push(`${i.profile.name ?? 'Patient'}${i.profile.ageRange ? ` · age ${i.profile.ageRange}` : ''}`);
  lines.push(`Period covered: ${longDate(r.start)} – ${longDate(i.today)} (${r.logs} days logged)`);
  lines.push('');
  lines.push('MENSTRUAL HISTORY');
  lines.push(`Periods recorded: ${r.periods.length}${r.periods.length ? ` (${r.periods.map((p) => `${shortDate(p.start)}, ${p.length} days`).join('; ')})` : ''}`);
  if (r.lengths.length) lines.push(`Cycle lengths: ${r.lengths.join(', ')} days (average ${Math.round(r.lengths.reduce((a, b) => a + b, 0) / r.lengths.length)})`);
  lines.push(`Spotting days: ${r.spotting}`);
  if (i.profile.regularity) lines.push(`Self-described regularity: ${i.profile.regularity}`);
  lines.push('');
  lines.push('SYMPTOMS (entries · average / highest intensity out of 10)');
  for (const s of r.stats) lines.push(`- ${symptomByID(s.id).label}: ${s.count} · ${s.avg} / ${s.max}; first ${shortDate(s.first)}, last ${shortDate(s.last)}${s.topTriggers.length ? `; noted before: ${s.topTriggers.join(', ')}` : ''}`);
  if (!r.stats.length) lines.push('- None logged');
  lines.push('');
  lines.push('SLEEP & STRESS');
  lines.push(`Average sleep: ${r.sleepAvg ?? '–'} h; nights under 6 h: ${r.shortNights}`);
  lines.push(`Average stress: ${r.stressAvg ?? '–'}/10; high-stress days: ${r.highStress}`);
  lines.push('');
  lines.push('MEDICATIONS & SUPPLEMENTS');
  for (const m of i.medications) lines.push(`- ${m.name}${m.dose ? ` ${m.dose}` : ''} (${m.kind}) · taken on ${r.medDays(m.id)} logged days`);
  if (!i.medications.length) lines.push('- None listed');
  lines.push('');
  if (i.observations.length) {
    lines.push('PATTERNS NOTICED IN MY OWN LOG (timing only, not a diagnosis)');
    for (const o of i.observations) lines.push(`- ${o.headline}`);
    lines.push('');
  }
  lines.push('QUESTIONS I WANT TO ASK');
  for (const q of i.questions) lines.push(`- ${q.text}`);
  if (!i.questions.length) lines.push('- (none added)');
  lines.push('');
  lines.push('Self-reported data from the HER app. Not a medical record or diagnosis.');
  return lines.join('\n');
}
