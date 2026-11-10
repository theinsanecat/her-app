import { useState } from 'react';

import { dayOrEmpty, useHealthStore } from '@/features/health/store/health-store';
import { todayKey } from '@/features/health/utils/dates';

export function useBodyScreen() {
  const today = todayKey();
  const [date, setDate] = useState(today);
  const days = useHealthStore((s) => s.days);
  const symptoms = useHealthStore((s) => s.symptoms);
  const medications = useHealthStore((s) => s.medications);
  const upsertDay = useHealthStore((s) => s.upsertDay);
  const toggleMedTaken = useHealthStore((s) => s.toggleMedTaken);
  const day = dayOrEmpty(days, date);
  const daySymptoms = symptoms.filter((s) => s.date === date);
  const severityFor = (id: string) => daySymptoms.find((s) => s.symptomID === id);
  const toggleCraving = (c: string) => upsertDay(date, { cravings: day.cravings.includes(c) ? day.cravings.filter((x) => x !== c) : [...day.cravings, c] });
  const toggleMood = (m: string) => upsertDay(date, { moods: day.moods.includes(m) ? day.moods.filter((x) => x !== m) : [...day.moods, m] });
  return { today, date, setDate, days, day, daySymptoms, severityFor, medications, upsertDay, toggleMedTaken, toggleCraving, toggleMood };
}
