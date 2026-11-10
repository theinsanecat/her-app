import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { SkyBackdrop } from '@/components/sky-backdrop';
import { Orb } from '@/components/orb';
import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { MoodCloud } from '@/components/mood-cloud';
import { ScalePicker } from '@/components/scale-picker';
import { Segmented } from '@/components/segmented';
import { Stepper } from '@/components/stepper';
import { DateStrip } from '@/features/health/components/date-strip';
import { CRAVINGS, ENERGY_LABELS, FLOWS, GROUPS, MOODS, SLEEP_QUALITY, SYMPTOMS } from '@/features/health/data/catalog';
import { useBodyScreen } from '@/features/health/hooks/use-body-screen';
import type { Appetite, Flow } from '@/features/health/types/health';
import { longDate, relativeDay } from '@/features/health/utils/dates';

export default function BodyScreen() {
  const b = useBodyScreen();
  const { day, date } = b;

  return (
    <ScrollView overScrollMode="never" className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-6">
      <SkyBackdrop />
      <View className="gap-1">
        <Text className="font-heading text-3xl text-foreground">My Body</Text>
        <Text className="text-base text-muted">
          {relativeDay(date)}
          {relativeDay(date) === longDate(date) ? '' : ` · ${longDate(date)}`}
        </Text>
      </View>

      <DateStrip end={b.today} selected={date} days={b.days} onSelect={b.setDate} />

      {GROUPS.map((g) => (
        <View key={g.id} className="gap-3">
          <View className="flex-row items-center gap-3">
            <Orb size="sm" source={g.id === 'menstrual' ? require('@/assets/images/orb-menstrual.jpg') : g.id === 'mind' ? require('@/assets/images/orb-mind.jpg') : require('@/assets/images/orb-physical.jpg')} />
            <Text className="font-heading text-xl text-foreground">{g.label}</Text>
          </View>
          {g.id === 'menstrual' ? (
            <Card>
              <Text className="text-base text-foreground">Bleeding</Text>
              <View className="flex-row flex-wrap gap-2">
                <Chip label="None" selected={!day.flow} onPress={() => b.upsertDay(date, { flow: undefined })} />
                {FLOWS.map((f) => (
                  <Chip key={f.id} label={f.label} tone="plum" selected={day.flow === f.id} onPress={() => b.upsertDay(date, { flow: day.flow === f.id ? undefined : (f.id as Flow) })} />
                ))}
              </View>
              <Text className="text-xs text-muted">Consecutive days with flow become one period. Spotting is kept separate.</Text>
            </Card>
          ) : null}
          <View className="flex-row flex-wrap gap-2">
            {SYMPTOMS.filter((s) => s.group === g.id).map((s) => {
              const entry = b.severityFor(s.id);
              return (
                <Chip
                  key={s.id}
                  label={s.label}
                  sf={s.sf}
                  md={s.md}
                  selected={!!entry}
                  badge={entry ? String(entry.severity) : undefined}
                  onPress={() => router.push({ pathname: '/log-symptom', params: entry ? { id: entry.id } : { symptom: s.id, date } })}
                />
              );
            })}
          </View>
        </View>
      ))}

      <View className="gap-3">
        <View className="flex-row items-center gap-3">
          <Orb size="sm" source={require('@/assets/images/orb-checkin.jpg')} />
          <Text className="font-heading text-xl text-foreground">Feelings</Text>
        </View>
        <Card>
          <Text className="text-base text-foreground">Energy</Text>
          <View className="flex-row flex-wrap gap-2">
            {ENERGY_LABELS.map((label, i) => (
              <Chip key={label} label={label} selected={day.energy === i + 1} onPress={() => b.upsertDay(date, { energy: day.energy === i + 1 ? undefined : i + 1 })} />
            ))}
          </View>
          <Text className="text-base text-foreground">Mood</Text>
          <MoodCloud moods={MOODS} selected={day.moods} onToggle={b.toggleMood} />
        </Card>
      </View>

      <View className="gap-3">
        <View className="flex-row items-center gap-3">
          <Orb size="sm" source={require('@/assets/images/orb-lifestyle.jpg')} />
          <Text className="font-heading text-xl text-foreground">Lifestyle</Text>
        </View>
        <Card>
          <Stepper label="Sleep" value={day.sleepHours} unit="hours" step={0.5} max={14} start={7} onChange={(v) => b.upsertDay(date, { sleepHours: v })} />
          <View className="flex-row flex-wrap gap-2">
            {SLEEP_QUALITY.map((q, i) => (
              <Chip key={q} label={q} tone="lilac" selected={day.sleepQuality === i + 1} onPress={() => b.upsertDay(date, { sleepQuality: i + 1 })} />
            ))}
          </View>
        </Card>
        <Card>
          <Text className="text-base text-foreground">Stress</Text>
          <ScalePicker value={day.stress} onChange={(v) => b.upsertDay(date, { stress: v })} lowLabel="At ease" highLabel="Overwhelmed" />
        </Card>
        <Card>
          <Stepper label="Movement" value={day.exerciseMin} unit="minutes" step={10} max={300} start={30} onChange={(v) => b.upsertDay(date, { exerciseMin: v })} />
          <Stepper label="Water" value={day.hydration} unit="glasses" step={1} max={20} start={6} onChange={(v) => b.upsertDay(date, { hydration: v })} />
        </Card>
        <Card>
          <Text className="text-base text-foreground">Appetite</Text>
          <Segmented values={['low', 'usual', 'high']} labels={['Low', 'Usual', 'High']} value={day.appetite ?? 'usual'} onChange={(v) => b.upsertDay(date, { appetite: v as Appetite })} />
          <Text className="text-base text-foreground">Cravings</Text>
          <View className="flex-row flex-wrap gap-2">
            {CRAVINGS.map((c) => (
              <Chip key={c} label={c} selected={day.cravings.includes(c)} onPress={() => b.toggleCraving(c)} />
            ))}
          </View>
        </Card>
      </View>

      <View className="gap-3">
        <Text className="font-heading text-xl text-foreground">Medications & supplements</Text>
        <Card>
          {b.medications.length ? (
            <View className="flex-row flex-wrap gap-2">
              {b.medications.map((m) => (
                <Chip key={m.id} label={m.dose ? `${m.name} · ${m.dose}` : m.name} tone="lilac" sf={day.medsTaken.includes(m.id) ? 'checkmark' : 'pills'} md={day.medsTaken.includes(m.id) ? 'check' : 'medication'} selected={day.medsTaken.includes(m.id)} onPress={() => b.toggleMedTaken(date, m.id)} />
              ))}
            </View>
          ) : (
            <Text className="text-sm text-muted">Nothing added yet.</Text>
          )}
          <Chip label="Manage list in Profile" sf="plus" md="add" onPress={() => router.navigate('/profile')} />
        </Card>
      </View>
    </ScrollView>
  );
}
