import type { DayLog, SymptomEntry } from '@/features/health/types/health';

export interface PetalValue {
  key: string;
  label: string;
  value: number;
  display: string;
}

/** Five petals of the day, each 0–1 where fuller means "this felt better". */
export function bloomPetals(day: DayLog | undefined, todaysSymptoms: SymptomEntry[]): PetalValue[] {
  const maxSeverity = todaysSymptoms.reduce((m, s) => Math.max(m, s.severity), 0);
  return [
    { key: 'energy', label: 'Energy', value: day?.energy ? day.energy / 5 : 0, display: day?.energy ? `${day.energy}/5` : '–' },
    { key: 'mood', label: 'Mood', value: day?.moods.length ? moodScore(day.moods) : 0, display: day?.moods[0] ?? '–' },
    { key: 'sleep', label: 'Sleep', value: day?.sleepHours ? Math.min(1, day.sleepHours / 8.5) : 0, display: day?.sleepHours ? `${day.sleepHours}h` : '–' },
    { key: 'stress', label: 'Stress', value: day?.stress ? (11 - day.stress) / 10 : 0, display: day?.stress ? `${day.stress}/10` : '–' },
    { key: 'body', label: 'Body', value: day?.checkedIn ? 1 - maxSeverity / 11 : 0, display: day?.checkedIn ? (todaysSymptoms.length ? `${todaysSymptoms.length} logged` : 'clear') : '–' },
  ];
}

const GENTLE = ['Calm', 'Content', 'Energetic', 'Hopeful'];
const HEAVY = ['Anxious', 'Irritable', 'Low', 'Overwhelmed'];

function moodScore(moods: string[]): number {
  let score = 0.6;
  for (const m of moods) {
    if (GENTLE.includes(m)) score += 0.2;
    if (HEAVY.includes(m)) score -= 0.15;
  }
  return Math.max(0.25, Math.min(1, score));
}
