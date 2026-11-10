import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Presets } from 'react-native-pulsar';

import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { MoodCloud } from '@/components/mood-cloud';
import { PillButton } from '@/components/pill-button';
import { ScalePicker } from '@/components/scale-picker';
import { Stepper } from '@/components/stepper';
import { ENERGY_LABELS, MOODS, SLEEP_QUALITY } from '@/features/health/data/catalog';
import { dayOrEmpty, useHealthStore } from '@/features/health/store/health-store';
import { todayKey } from '@/features/health/utils/dates';

export default function CheckInSheet() {
  const today = todayKey();
  const stored = useHealthStore((s) => s.days[today]);
  const existing = stored ?? dayOrEmpty({}, today);
  const saveCheckIn = useHealthStore((s) => s.saveCheckIn);
  const [energy, setEnergy] = useState(existing.energy);
  const [moods, setMoods] = useState<string[]>(existing.moods);
  const [sleepHours, setSleepHours] = useState(existing.sleepHours);
  const [sleepQuality, setSleepQuality] = useState(existing.sleepQuality);
  const [stress, setStress] = useState(existing.stress);

  const toggleMood = (m: string) => setMoods((cur) => (cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m].slice(-3)));
  const ready = energy !== undefined || moods.length > 0 || sleepHours !== undefined || stress !== undefined;

  const save = () => {
    saveCheckIn(today, { energy, moods, sleepHours, sleepQuality, stress });
    Presets.System.notificationSuccess();
    router.back();
  };

  return (
    <ScrollView overScrollMode="never" className="flex-1 bg-background" contentContainerClassName="px-5 pt-8 pb-safe-offset-4 gap-6">
      <View className="gap-1">
        <Text className="font-heading text-3xl text-foreground">Today's check-in</Text>
        <Text className="text-base text-muted">Answer what you like. Everything is optional.</Text>
      </View>

      <View className="gap-3">
        <Text className="font-heading-medium text-lg text-foreground">Energy</Text>
        <View className="flex-row flex-wrap gap-2">
          {ENERGY_LABELS.map((label, i) => (
            <Chip key={label} label={label} selected={energy === i + 1} onPress={() => setEnergy(i + 1)} />
          ))}
        </View>
      </View>

      <View className="gap-3">
        <Text className="font-heading-medium text-lg text-foreground">Mood · pick up to three</Text>
        <MoodCloud moods={MOODS} selected={moods} onToggle={toggleMood} />
      </View>

      <Card>
        <Stepper label="Sleep last night" value={sleepHours} unit="hours" step={0.5} max={14} start={7} onChange={setSleepHours} />
        <View className="flex-row flex-wrap gap-2">
          {SLEEP_QUALITY.map((q, i) => (
            <Chip key={q} label={q} tone="lilac" selected={sleepQuality === i + 1} onPress={() => setSleepQuality(i + 1)} />
          ))}
        </View>
      </Card>

      <Card>
        <Text className="text-base text-foreground">Stress today</Text>
        <ScalePicker value={stress} onChange={setStress} lowLabel="At ease" highLabel="Overwhelmed" />
      </Card>

      <PillButton label="Save check-in" sf="checkmark" md="check" onPress={save} disabled={!ready} />
    </ScrollView>
  );
}
