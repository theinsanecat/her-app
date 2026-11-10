import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Presets } from 'react-native-pulsar';
import { Label, TextArea, TextField } from 'heroui-native';

import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { Icon } from '@/components/icon';
import { PillButton } from '@/components/pill-button';
import { ScalePicker } from '@/components/scale-picker';
import { DURATIONS, FREQUENCIES, SYMPTOMS, TRIGGERS, symptomByID } from '@/features/health/data/catalog';
import { useHealthStore } from '@/features/health/store/health-store';
import { relativeDay, todayKey } from '@/features/health/utils/dates';
import { confirmDelete } from '@/lib/confirm';

export default function LogSymptomSheet() {
  const params = useLocalSearchParams<{ symptom?: string; date?: string; id?: string }>();
  const existing = useHealthStore((s) => s.symptoms.find((x) => x.id === params.id));
  const saveSymptom = useHealthStore((s) => s.saveSymptom);
  const removeSymptom = useHealthStore((s) => s.removeSymptom);
  const [symptomID, setSymptomID] = useState(existing?.symptomID ?? params.symptom ?? SYMPTOMS[0].id);
  const date = existing?.date ?? params.date ?? todayKey();
  const [severity, setSeverity] = useState<number | undefined>(existing?.severity);
  const [duration, setDuration] = useState(existing?.duration);
  const [location, setLocation] = useState(existing?.location);
  const [frequency, setFrequency] = useState(existing?.frequency);
  const [triggers, setTriggers] = useState<string[]>(existing?.triggers ?? []);
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const def = symptomByID(symptomID);
  const pick = !existing && !params.symptom;

  const toggleTrigger = (t: string) => setTriggers((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const save = () => {
    if (severity === undefined) return;
    saveSymptom({ id: existing?.id, date, symptomID, severity, duration, location, frequency, triggers, notes: notes.trim() || undefined });
    Presets.System.notificationSuccess();
    router.back();
  };

  const remove = () => {
    if (!existing) return;
    confirmDelete({
      title: `Delete this ${def.label.toLowerCase()} entry?`,
      message: 'It will be removed from your insights and doctor report.',
      onConfirm: () => {
        removeSymptom(existing.id);
        router.back();
      },
    });
  };

  return (
    <ScrollView overScrollMode="never" className="flex-1 bg-background" contentContainerClassName="px-5 pt-8 pb-safe-offset-4 gap-6" keyboardShouldPersistTaps="handled">
      <View className="flex-row items-center gap-3">
        <View className="size-12 items-center justify-center rounded-full bg-blush">
          <Icon sf={def.sf} md={def.md} size={22} />
        </View>
        <View className="flex-1 gap-0.5">
          <Text className="font-heading text-3xl text-foreground">{def.label}</Text>
          <Text className="text-sm text-muted">{relativeDay(date)}</Text>
        </View>
      </View>

      {pick ? (
        <View className="flex-row flex-wrap gap-2">
          {SYMPTOMS.map((s) => (
            <Chip key={s.id} label={s.label} selected={s.id === symptomID} onPress={() => setSymptomID(s.id)} />
          ))}
        </View>
      ) : null}

      <Card>
        <Text className="text-base text-foreground">How intense? {severity ? <Text className="font-semibold">{severity} / 10</Text> : null}</Text>
        <ScalePicker value={severity} onChange={setSeverity} lowLabel="Barely there" highLabel="Worst imaginable" />
      </Card>

      <View className="gap-3">
        <Text className="font-heading-medium text-lg text-foreground">How long</Text>
        <View className="flex-row flex-wrap gap-2">
          {DURATIONS.map((d) => (
            <Chip key={d} label={d} selected={duration === d} onPress={() => setDuration(duration === d ? undefined : d)} />
          ))}
        </View>
      </View>

      {def.locations ? (
        <View className="gap-3">
          <Text className="font-heading-medium text-lg text-foreground">Where</Text>
          <View className="flex-row flex-wrap gap-2">
            {def.locations.map((l) => (
              <Chip key={l} label={l} tone="lilac" selected={location === l} onPress={() => setLocation(location === l ? undefined : l)} />
            ))}
          </View>
        </View>
      ) : null}

      <View className="gap-3">
        <Text className="font-heading-medium text-lg text-foreground">How often today</Text>
        <View className="flex-row flex-wrap gap-2">
          {FREQUENCIES.map((f) => (
            <Chip key={f} label={f} tone="lilac" selected={frequency === f} onPress={() => setFrequency(frequency === f ? undefined : f)} />
          ))}
        </View>
      </View>

      <View className="gap-3">
        <Text className="font-heading-medium text-lg text-foreground">Anything that came before it?</Text>
        <Text className="text-sm text-muted">Your own observation, not a cause. It helps spot patterns over time.</Text>
        <View className="flex-row flex-wrap gap-2">
          {TRIGGERS.map((t) => (
            <Chip key={t} label={t} selected={triggers.includes(t)} onPress={() => toggleTrigger(t)} />
          ))}
        </View>
      </View>

      <TextField>
        <Label>Notes</Label>
        <TextArea value={notes} onChangeText={setNotes} placeholder="What it felt like, what helped…" className="min-h-24" />
      </TextField>

      <View className="gap-2">
        <PillButton label={severity ? 'Save symptom' : 'Choose an intensity to save'} sf="checkmark" md="check" onPress={save} disabled={!severity} />
        {existing ? <PillButton label="Delete entry" variant="ghost" sf="trash" md="delete" onPress={remove} /> : null}
      </View>
    </ScrollView>
  );
}
