import { useEffect, useState } from 'react';
import { Presets } from 'react-native-pulsar';

import { useHealthDerived } from '@/features/health/hooks/use-health-derived';
import { useHealthStore } from '@/features/health/store/health-store';
import { bloomPetals } from '@/features/health/utils/bloom';
import { computeInsights, symptomStats } from '@/features/health/utils/insights';
import { addDays, rangeKeys } from '@/features/health/utils/dates';

export function useTodayScreen() {
  const derived = useHealthDerived();
  const { today, days, symptoms, periods, avgCycle, streak } = derived;
  const isSample = useHealthStore((s) => s.isSample);
  const bloomToken = useHealthStore((s) => s.bloomToken);
  const celebratedStreak = useHealthStore((s) => s.celebratedStreak);
  const markCelebrated = useHealthStore((s) => s.markCelebrated);
  const [celebrating, setCelebrating] = useState(false);

  const checkedToday = !!days[today]?.checkedIn;
  useEffect(() => {
    if (streak < 7 || celebratedStreak || !checkedToday) return;
    setCelebrating(true);
    markCelebrated();
    Presets.System.notificationSuccess();
  }, [streak, celebratedStreak, checkedToday, markCelebrated]);

  const todayLog = days[today];
  const todaysSymptoms = symptoms.filter((s) => s.date === today);
  const petals = bloomPetals(todayLog, todaysSymptoms);
  const week = rangeKeys(today, 7);
  const series = {
    energy: week.map((d) => days[d]?.energy),
    sleep: week.map((d) => days[d]?.sleepHours),
    stress: week.map((d) => days[d]?.stress),
    mood: week.map((d) => (days[d]?.moods.length ? petalsFor(days[d]?.moods ?? []) : undefined)),
  };
  const lastWith = <K extends 'energy' | 'sleepHours' | 'stress'>(k: K) => {
    for (let i = 0; i < 7; i++) {
      const v = days[addDays(today, -i)]?.[k];
      if (v !== undefined) return { v, i };
    }
    return undefined;
  };
  const recent = [...symptoms].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4);
  const frequent = symptomStats(symptoms, addDays(today, -60), today).slice(0, 4).map((s) => s.id);
  const insights = computeInsights(days, symptoms, periods, today, 30, avgCycle);
  const topObservation = insights.observations[0];

  return { ...derived, isSample, bloomToken, celebrating, todayLog, petals, series, lastWith, recent, frequent, insights, topObservation };
}

function petalsFor(moods: string[]): number {
  const up = ['Calm', 'Content', 'Energetic', 'Hopeful'].filter((m) => moods.includes(m)).length;
  const down = ['Anxious', 'Irritable', 'Low', 'Overwhelmed'].filter((m) => moods.includes(m)).length;
  return 3 + up - down;
}
