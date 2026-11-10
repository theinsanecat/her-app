import type { DayLog, DoctorQuestion, Medication, Profile, SymptomEntry } from '@/features/health/types/health';
import { addDays, todayKey } from '@/features/health/utils/dates';

/** Deterministic PRNG so the fictional sample profile is the same every time it loads. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const SAMPLE_PROFILE: Profile = {
  name: 'Maya',
  ageRange: '25–34',
  regularity: 'Somewhat irregular',
  cycleLength: 29,
  concerns: ['Headaches', 'Fatigue', 'Digestion', 'Sleep'],
  goals: ['Understand my patterns', 'Prepare for a doctor visit'],
};

export const SAMPLE_MEDS: Medication[] = [
  { id: 'med-mag', name: 'Magnesium glycinate', kind: 'supplement', dose: '200 mg, evening' },
  { id: 'med-vitd', name: 'Vitamin D3', kind: 'supplement', dose: '1000 IU' },
  { id: 'med-ibu', name: 'Ibuprofen', kind: 'medication', dose: '200 mg as needed' },
];

export const SAMPLE_QUESTIONS: DoctorQuestion[] = [
  { id: 'q1', text: 'My headaches often follow short nights. Is that worth investigating further?' },
  { id: 'q2', text: 'Could my bloating before periods be checked, or is there anything to rule out?' },
];

interface SampleData {
  days: Record<string, DayLog>;
  symptoms: SymptomEntry[];
}

/** ~88 days of fictional entries, ending yesterday, so "today" is left for the user. */
export function buildSampleData(): SampleData {
  const rand = mulberry32(20261106);
  const today = todayKey();
  const starts = [-84, -55, -25].map((n) => addDays(today, n));
  const lengths = [29, 30, 29];
  const days: Record<string, DayLog> = {};
  const symptoms: SymptomEntry[] = [];
  let sid = 0;
  const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)];
  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

  const add = (date: string, symptomID: string, severity: number, extra: Partial<SymptomEntry> = {}) => {
    sid += 1;
    symptoms.push({ id: `s-${sid}`, date, symptomID, severity: clamp(Math.round(severity), 1, 10), triggers: [], ...extra });
  };

  for (let offset = -88; offset <= -1; offset++) {
    const date = addDays(today, offset);
    if (rand() < 0.07) continue;

    let ci = -1;
    for (let i = 0; i < starts.length; i++) if (starts[i] <= date) ci = i;
    const cycleLen = ci >= 0 ? lengths[ci] : 29;
    const cd = ci >= 0 ? Math.round((new Date(date).getTime() - new Date(starts[ci]).getTime()) / 86400000) + 1 : 20 + offset + 88;
    const preMenstrual = cd >= cycleLen - 5;
    const aroundStart = cd <= 2 || cd >= cycleLen - 1;

    const dow = new Date(date).getDay();
    const deadline = (offset >= -66 && offset <= -60) || (offset >= -19 && offset <= -14) || (offset >= -40 && offset <= -38);
    let stress = 3.5 + (dow >= 1 && dow <= 4 ? 1.2 : 0) + (rand() - 0.5) * 2 + (deadline ? 3.5 : 0);
    stress = clamp(Math.round(stress), 1, 10);

    let sleep = 7.3 + (rand() - 0.5) * 1.2;
    if (stress >= 7) sleep -= 1.3 + rand() * 0.6;
    if (rand() < 0.12) sleep -= 1.6;
    if (preMenstrual) sleep -= 0.3;
    sleep = Math.round(clamp(sleep, 4.5, 9) * 2) / 2;
    const poorSleep = sleep < 6;
    const sleepQuality = clamp(Math.round(sleep >= 7.5 ? 4 + rand() : sleep >= 6.5 ? 3 + rand() : sleep >= 6 ? 2 + rand() : 1 + rand()), 1, 5);

    let energy = sleepQuality - (cd <= 2 ? 1 : 0) + (rand() < 0.3 ? 1 : 0);
    energy = clamp(energy, 1, 5);

    let flow: DayLog['flow'];
    if (ci >= 0 && cd <= 6) flow = (['medium', 'heavy', 'medium', 'light', 'light', rand() < 0.5 ? 'spotting' : undefined] as const)[cd - 1];

    const moods: string[] = [];
    if (stress >= 7) moods.push(pick(['Anxious', 'Overwhelmed', 'Irritable']));
    else if (energy >= 4) moods.push(pick(['Calm', 'Content', 'Energetic', 'Hopeful']));
    else moods.push(pick(['Flat', 'Tender', 'Content', 'Sensitive']));
    if (preMenstrual && rand() < 0.4) moods.push('Sensitive');

    const exercised = rand() < 0.42 && energy >= 3;
    const medsTaken: string[] = [];
    if (rand() < 0.82) medsTaken.push('med-mag');
    if (rand() < 0.7) medsTaken.push('med-vitd');

    let headacheDay = false;
    const pHead = 0.04 + (poorSleep ? 0.5 : 0) + (aroundStart ? 0.25 : 0);
    if (rand() < pHead) {
      headacheDay = true;
      const migraine = poorSleep && aroundStart && rand() < 0.6;
      const triggers = [poorSleep ? 'Poor sleep' : undefined, stress >= 7 ? 'Stress' : undefined, rand() < 0.3 ? 'Screens' : undefined].filter((t): t is string => !!t);
      add(date, migraine ? 'migraine' : 'headache', migraine ? 7 + rand() * 2 : 4 + rand() * 3, {
        duration: migraine ? pick(['Half a day', 'All day']) : pick(['1–4 hours', 'Half a day', 'Under an hour']),
        location: migraine ? 'One side' : pick(['Temples', 'Forehead', 'Behind eyes']),
        frequency: migraine ? 'Constant' : 'On and off',
        triggers: triggers.length ? triggers : ['Not sure'],
        notes: migraine ? 'Light felt too bright, had to lie down.' : undefined,
      });
    }
    if (headacheDay && rand() < 0.5) medsTaken.push('med-ibu');

    if (rand() < 0.07 + (poorSleep ? 0.45 : 0) + (cd <= 3 && ci >= 0 ? 0.25 : 0)) {
      add(date, 'fatigue', 4 + rand() * 3 + (poorSleep ? 1 : 0), { duration: 'All day', frequency: 'Constant', triggers: poorSleep ? ['Poor sleep'] : ['Not sure'] });
    }
    const bloat = rand() < 0.05 + (preMenstrual ? 0.42 : 0);
    if (bloat) add(date, 'bloating', 3 + rand() * 4, { duration: pick(['Half a day', 'All day']), location: 'Lower abdomen', frequency: 'On and off', triggers: rand() < 0.4 ? ['Certain food'] : ['Not sure'] });
    if (rand() < 0.04 + (preMenstrual ? 0.3 : 0) + (stress >= 7 ? 0.15 : 0) + (bloat ? 0.15 : 0)) {
      add(date, 'digestive', 3 + rand() * 4, { duration: pick(['1–4 hours', 'Half a day']), location: pick(['Lower abdomen', 'Upper abdomen']), frequency: 'On and off', triggers: stress >= 7 ? ['Stress'] : [pick(['Certain food', 'Skipped meal', 'Not sure'])] });
    }
    if (ci >= 0 && (cd === 1 || cd === 2 || (cd === 3 && rand() < 0.4))) {
      add(date, 'cramps', 5 + rand() * 3, { duration: pick(['Half a day', 'All day']), location: 'Lower abdomen', frequency: 'On and off', triggers: [] });
      if (!medsTaken.includes('med-ibu') && rand() < 0.7) medsTaken.push('med-ibu');
    }
    if (rand() < 0.03 + (stress >= 7 ? 0.4 : 0)) add(date, 'anxiety', 4 + rand() * 3, { duration: pick(['1–4 hours', 'Half a day']), frequency: 'On and off', triggers: ['Stress'] });
    if (rand() < 0.03 + (poorSleep ? 0.3 : 0)) add(date, 'brain-fog', 3 + rand() * 3, { duration: 'Half a day', frequency: 'Constant', triggers: ['Poor sleep'] });
    if (preMenstrual && cd < cycleLen - 1 && rand() < 0.22) add(date, 'acne', 3 + rand() * 2, { location: pick(['Jawline', 'Chin']), duration: 'Several days', frequency: 'Constant', triggers: ['Not sure'] });
    if (preMenstrual && rand() < 0.25) add(date, 'breast-tenderness', 3 + rand() * 2, { location: 'Both', duration: 'All day', frequency: 'Constant', triggers: [] });
    if (rand() < 0.03) add(date, 'joint-pain', 3 + rand() * 2, { location: pick(['Neck', 'Shoulders', 'Lower back']), duration: 'Half a day', frequency: 'On and off', triggers: ['Exercise'] });

    days[date] = {
      date,
      checkedIn: true,
      energy,
      moods: Array.from(new Set(moods)),
      sleepHours: sleep,
      sleepQuality,
      stress,
      exerciseMin: exercised ? pick([20, 30, 35, 45, 60]) : 0,
      hydration: clamp(Math.round(5 + (rand() - 0.5) * 4), 2, 9),
      appetite: preMenstrual ? 'high' : rand() < 0.1 ? 'low' : 'usual',
      cravings: preMenstrual && rand() < 0.55 ? [pick(['Sweet', 'Chocolate', 'Carbs'])] : [],
      flow,
      medsTaken,
    };
  }
  return { days, symptoms };
}
