import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { buildSampleData, SAMPLE_MEDS, SAMPLE_PROFILE, SAMPLE_QUESTIONS } from '@/features/health/data/sample';
import type { DayLog, HealthState } from '@/features/health/types/health';
import { zustandStorage } from '@/lib/storage';

const emptyDay = (date: string): DayLog => ({ date, moods: [], cravings: [], medsTaken: [] });
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const blank = {
  isSample: false,
  profile: { concerns: [], goals: [] },
  days: {},
  symptoms: [],
  medications: [],
  questions: [],
  celebratedStreak: false,
};

export const useHealthStore = create<HealthState>()(
  persist(
    (set, get) => ({
      onboarded: false,
      bloomToken: 0,
      ...blank,
      completeOnboarding: (profile, useSample) => {
        if (useSample) {
          const sample = buildSampleData();
          set({ ...blank, onboarded: true, isSample: true, profile: { ...SAMPLE_PROFILE, name: profile.name || SAMPLE_PROFILE.name }, ...sample, medications: SAMPLE_MEDS, questions: SAMPLE_QUESTIONS });
          return;
        }
        const days = { ...get().days };
        if (profile.lastPeriod) days[profile.lastPeriod] = { ...emptyDay(profile.lastPeriod), flow: 'medium' };
        set({ ...blank, onboarded: true, profile, days });
      },
      loadSample: () => {
        const sample = buildSampleData();
        set({ ...blank, isSample: true, profile: SAMPLE_PROFILE, ...sample, medications: SAMPLE_MEDS, questions: SAMPLE_QUESTIONS });
      },
      startFresh: () => set({ ...blank, profile: { concerns: [], goals: [], name: get().isSample ? undefined : get().profile.name } }),
      deleteAll: () => set({ ...blank, onboarded: false }),
      updateProfile: (patch) => set({ profile: { ...get().profile, ...patch } }),
      upsertDay: (date, patch) => {
        const prev = get().days[date] ?? emptyDay(date);
        set({ days: { ...get().days, [date]: { ...prev, ...patch } } });
      },
      saveCheckIn: (date, patch) => {
        const prev = get().days[date] ?? emptyDay(date);
        set({ days: { ...get().days, [date]: { ...prev, ...patch, checkedIn: true } }, bloomToken: get().bloomToken + 1 });
      },
      saveSymptom: (entry) => {
        const list = get().symptoms;
        if (entry.id && list.some((s) => s.id === entry.id)) {
          set({ symptoms: list.map((s) => (s.id === entry.id ? { ...s, ...entry, id: s.id } : s)) });
          return;
        }
        set({ symptoms: [...list, { ...entry, id: uid() }] });
      },
      removeSymptom: (id) => set({ symptoms: get().symptoms.filter((s) => s.id !== id) }),
      addMedication: (med) => set({ medications: [...get().medications, { ...med, id: uid() }] }),
      removeMedication: (id) => set({ medications: get().medications.filter((m) => m.id !== id) }),
      toggleMedTaken: (date, medID) => {
        const prev = get().days[date] ?? emptyDay(date);
        const taken = prev.medsTaken.includes(medID) ? prev.medsTaken.filter((m) => m !== medID) : [...prev.medsTaken, medID];
        set({ days: { ...get().days, [date]: { ...prev, medsTaken: taken } } });
      },
      addQuestion: (text) => set({ questions: [...get().questions, { id: uid(), text }] }),
      removeQuestion: (id) => set({ questions: get().questions.filter((q) => q.id !== id) }),
      markCelebrated: () => set({ celebratedStreak: true }),
    }),
    { name: 'her-health', storage: createJSONStorage(() => zustandStorage) },
  ),
);

export function dayOrEmpty(days: Record<string, DayLog>, date: string): DayLog {
  return days[date] ?? emptyDay(date);
}
