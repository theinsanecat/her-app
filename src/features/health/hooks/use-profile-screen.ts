import { router } from 'expo-router';
import { useState } from 'react';
import { Share } from 'react-native';
import { Presets } from 'react-native-pulsar';

import { useHealthStore } from '@/features/health/store/health-store';
import type { Medication } from '@/features/health/types/health';
import { confirmDelete } from '@/lib/confirm';

export function useProfileScreen() {
  const s = useHealthStore();
  const [medName, setMedName] = useState('');
  const [medDose, setMedDose] = useState('');
  const [medKind, setMedKind] = useState<Medication['kind']>('supplement');

  const addMed = () => {
    if (!medName.trim()) return;
    s.addMedication({ name: medName.trim(), dose: medDose.trim() || undefined, kind: medKind });
    setMedName('');
    setMedDose('');
    Presets.System.impactLight();
  };
  const confirmRemoveMed = (m: Medication) => confirmDelete({ title: `Remove ${m.name}?`, message: 'It will no longer appear in your logs or doctor report. Past days keep their record.', confirmLabel: 'Remove', onConfirm: () => s.removeMedication(m.id) });

  const exportData = () => {
    const payload = { app: 'HER', exportedAt: new Date().toISOString(), sampleData: s.isSample, profile: s.profile, days: s.days, symptoms: s.symptoms, medications: s.medications, questions: s.questions };
    Share.share({ title: 'HER data export', message: JSON.stringify(payload, null, 2) });
  };

  const switchToSample = () =>
    confirmDelete({
      title: 'Load the sample profile?',
      message: 'This replaces your entries on this phone with 88 days of fictional data. Export first if you want to keep them.',
      confirmLabel: 'Load sample',
      onConfirm: () => {
        s.loadSample();
        router.navigate('/');
      },
    });
  const startFresh = () =>
    confirmDelete({
      title: s.isSample ? 'Clear the sample and start fresh?' : 'Start fresh?',
      message: 'All entries on this phone will be removed. Your preferences stay.',
      confirmLabel: 'Start fresh',
      onConfirm: () => {
        s.startFresh();
        router.navigate('/');
      },
    });
  const deleteEverything = () =>
    confirmDelete({
      title: 'Delete all health records?',
      message: 'Every check-in, symptom, period, medication and question is permanently deleted from this phone. This cannot be undone.',
      confirmLabel: 'Delete everything',
      onConfirm: () => s.deleteAll(),
    });

  return { ...s, medName, setMedName, medDose, setMedDose, medKind, setMedKind, addMed, confirmRemoveMed, exportData, switchToSample, startFresh, deleteEverything };
}
