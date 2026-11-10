import { useState } from 'react';
import { Share } from 'react-native';
import { Presets } from 'react-native-pulsar';

import { useHealthDerived } from '@/features/health/hooks/use-health-derived';
import { useHealthStore } from '@/features/health/store/health-store';
import { computeInsights } from '@/features/health/utils/insights';
import { buildReport, reportText } from '@/features/health/utils/report';
import type { ReportInput } from '@/features/health/utils/report';

export function useDoctorScreen() {
  const d = useHealthDerived();
  const medications = useHealthStore((s) => s.medications);
  const questions = useHealthStore((s) => s.questions);
  const addQuestion = useHealthStore((s) => s.addQuestion);
  const removeQuestion = useHealthStore((s) => s.removeQuestion);
  const isSample = useHealthStore((s) => s.isSample);
  const [range, setRange] = useState<'30' | '90'>('90');
  const [draft, setDraft] = useState('');
  const rangeDays = Number(range);
  const observations = computeInsights(d.days, d.symptoms, d.periods, d.today, rangeDays, d.avgCycle).observations;
  const input: ReportInput = { today: d.today, rangeDays, profile: d.profile, days: d.days, symptoms: d.symptoms, periods: d.periods, cycles: d.cycles, avgCycle: d.avgCycle, medications, questions, observations, isSample };
  const report = buildReport(input);

  const submitQuestion = () => {
    if (!draft.trim()) return;
    addQuestion(draft.trim());
    setDraft('');
    Presets.System.impactLight();
  };
  const share = () => Share.share({ title: 'HER health summary', message: reportText(input) });

  return { ...d, input, report, observations, medications, questions, removeQuestion, isSample, range, setRange, draft, setDraft, submitQuestion, share };
}
