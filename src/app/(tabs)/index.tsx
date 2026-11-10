import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollShadow } from 'heroui-native';

import { SkyBackdrop } from '@/components/sky-backdrop';
import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { GradientPanel } from '@/components/gradient-panel';
import { Icon } from '@/components/icon';
import { ListRow } from '@/components/list-row';
import { PillButton } from '@/components/pill-button';
import { Pressable } from '@/components/pressable';
import { SampleBadge } from '@/components/sample-badge';
import { Palette, severityColor } from '@/constants/theme';
import { Bloom } from '@/features/health/components/bloom';
import { OrbTile } from '@/features/health/components/orb-tile';
import { VitalTile } from '@/features/health/components/vital-tile';
import { ENERGY_LABELS, symptomByID } from '@/features/health/data/catalog';
import { useTodayScreen } from '@/features/health/hooks/use-today-screen';
import { greeting, longDate, relativeDay, shortDate } from '@/features/health/utils/dates';

export default function TodayScreen() {
  const t = useTodayScreen();
  const name = t.profile.name;
  const checkedIn = !!t.todayLog?.checkedIn;
  const energy = t.lastWith('energy');
  const sleep = t.lastWith('sleepHours');
  const stress = t.lastWith('stress');
  const mood = t.todayLog?.moods[0];

  return (
    <ScrollView overScrollMode="never" className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-6">
      <SkyBackdrop />
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 gap-1">
          <Text className="text-sm font-medium text-muted">{longDate(t.today)}</Text>
          <Text className="font-heading text-3xl text-foreground">
            {greeting()}
            {name ? `, ${name}` : ''}
          </Text>
        </View>
        <Pressable onPress={() => router.navigate('/profile')} accessibilityLabel="Profile">
          <View className="size-11 items-center justify-center rounded-full bg-blush">
            <Text className="font-heading text-lg text-foreground">{name ? name.slice(0, 1) : 'H'}</Text>
          </View>
        </Pressable>
      </View>

      {t.isSample ? <SampleBadge /> : null}

      <ScrollShadow LinearGradientComponent={LinearGradient} className="-mx-5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 px-5">
          <OrbTile image={require('@/assets/images/orb-checkin.jpg')} title={checkedIn ? 'Checked in' : 'Check in'} caption={checkedIn ? 'Update today' : 'One quiet minute'} onPress={() => router.push('/check-in')} />
          <OrbTile image={require('@/assets/images/orb-cycle.jpg')} title={t.cycleDay ? `Day ${t.cycleDay}` : 'Your cycle'} caption={t.cycleDay ? 'Of your cycle' : 'Add a period'} onPress={() => router.navigate('/body')} />
          <OrbTile image={require('@/assets/images/orb-insights.jpg')} title="Connect" caption="The dots" onPress={() => router.navigate('/insights')} />
          <OrbTile image={require('@/assets/images/orb-doctor.jpg')} title="Doctor Mode" caption="Your report" onPress={() => router.push('/doctor')} />
        </ScrollView>
      </ScrollShadow>

      <GradientPanel>
        <View className="flex-row items-center justify-between">
          <View className="gap-0.5">
            <Text className="font-heading-italic text-xl text-foreground">Today, in full</Text>
            <Text className="text-sm text-muted">{checkedIn ? 'Your five petals for today' : 'Five petals, one quiet minute'}</Text>
          </View>
          {t.streak > 0 ? (
            <View className="flex-row items-center gap-1 rounded-full bg-ivory px-3 py-1.5">
              <Icon sf="sparkle" md="auto_awesome" size={13} />
              <Text className="text-xs font-semibold text-foreground">{t.streak}-day streak</Text>
            </View>
          ) : null}
        </View>
        <View className="items-center">
          <Bloom petals={t.petals} token={t.bloomToken} size={190} halo={t.celebrating} />
        </View>
        {t.celebrating ? <Text className="text-center font-heading-italic text-lg text-foreground">{t.streak} days in a row, fully heard.</Text> : null}
        <PillButton label={checkedIn ? 'Update check-in' : 'Check in for today'} sf={checkedIn ? 'pencil' : 'sparkles'} md={checkedIn ? 'edit' : 'auto_awesome'} onPress={() => router.push('/check-in')} />
      </GradientPanel>

      <View className="gap-3">
        <Text className="font-heading text-xl text-foreground">How you've been</Text>
        <View className="flex-row gap-3">
          <VitalTile label="Energy" sf="bolt.heart" md="bolt" value={energy ? ENERGY_LABELS[energy.v - 1] : '–'} caption={energy ? (energy.i === 0 ? 'today' : `logged ${energy.i}d ago`) : 'not logged'} series={t.series.energy} max={5} color={Palette.blush} />
          <VitalTile label="Mood" sf="face.smiling" md="mood" value={mood ?? '–'} caption={mood ? 'today' : 'check in to add'} series={t.series.mood} max={6} color={Palette.rose} />
        </View>
        <View className="flex-row gap-3">
          <VitalTile label="Sleep" sf="moon.zzz" md="bedtime" value={sleep ? `${sleep.v} h` : '–'} caption={sleep ? (sleep.i === 0 ? 'last night' : `${sleep.i}d ago`) : 'not logged'} series={t.series.sleep} max={9} color={Palette.lavender} />
          <VitalTile label="Stress" sf="waveform.path.ecg" md="monitor_heart" value={stress ? `${stress.v} / 10` : '–'} caption={stress ? (stress.i === 0 ? 'today' : `${stress.i}d ago`) : 'not logged'} series={t.series.stress} max={10} color={Palette.wisteria} />
        </View>
      </View>

      <Card>
        <View className="flex-row items-center gap-3">
          <View className="size-11 items-center justify-center rounded-full bg-petal">
            <Icon sf="circle.dashed" md="donut_large" size={20} />
          </View>
          <View className="flex-1 gap-0.5">
            {t.cycleDay ? (
              <>
                <Text className="text-base font-semibold text-foreground">Cycle day {t.cycleDay}</Text>
                <Text className="text-sm text-muted">{t.nextStart ? `Next period may start around ${shortDate(t.nextStart)} · from your records` : 'Log another period to estimate timing'}</Text>
              </>
            ) : (
              <>
                <Text className="text-base font-semibold text-foreground">Cycle context</Text>
                <Text className="text-sm text-muted">Add a period in My Body to see your symptoms alongside your cycle.</Text>
              </>
            )}
          </View>
        </View>
      </Card>

      {t.topObservation ? (
        <Pressable onPress={() => router.navigate('/insights')}>
          <GradientPanel variant="insight">
            <View className="flex-row items-center gap-2">
              <Icon sf="point.3.connected.trianglepath.dotted" md="hub" size={18} />
              <Text className="text-sm font-semibold text-foreground">Connect the dots</Text>
              <View className="flex-1" />
              <Text className="text-xs font-medium text-muted">{t.topObservation.strength}</Text>
            </View>
            <Text className="font-heading-medium text-lg text-foreground">{t.topObservation.headline}</Text>
            <Text className="text-sm text-muted">
              {t.isSample ? 'Observation from fictional sample data · ' : ''}Based on {t.topObservation.entries} entries. Not a diagnosis.
            </Text>
          </GradientPanel>
        </Pressable>
      ) : (
        <GradientPanel variant="insight">
          <Text className="text-sm font-semibold text-foreground">Connect the dots</Text>
          <Text className="font-heading-medium text-lg text-foreground">
            {t.insights.enough ? 'No clear patterns in your last 30 days yet.' : `${t.insights.daysNeeded} more check-ins and HER can start looking for patterns.`}
          </Text>
          <Text className="text-sm text-muted">HER only shows what your entries support.</Text>
        </GradientPanel>
      )}

      <View className="gap-3">
        <Text className="font-heading text-xl text-foreground">Log a symptom</Text>
        <View className="flex-row flex-wrap gap-2">
          {(t.frequent.length ? t.frequent : ['headache', 'fatigue', 'bloating', 'cramps']).map((id) => {
            const def = symptomByID(id);
            return <Chip key={id} label={def.label} sf={def.sf} md={def.md} onPress={() => router.push({ pathname: '/log-symptom', params: { symptom: id, date: t.today } })} />;
          })}
          <Chip label="Everything else" sf="plus" md="add" onPress={() => router.navigate('/body')} />
        </View>
      </View>

      {t.recent.length ? (
        <View className="gap-3">
          <Text className="font-heading text-xl text-foreground">Recent symptoms</Text>
          <Card list>
            {t.recent.map((s) => (
              <ListRow
                key={s.id}
                title={symptomByID(s.symptomID).label}
                subtitle={[relativeDay(s.date), s.duration, s.location].filter(Boolean).join(' · ')}
                left={
                  <View className="size-9 items-center justify-center rounded-full" style={{ backgroundColor: severityColor(s.severity) }}>
                    <Text className={s.severity >= 7 ? 'text-sm font-bold text-white' : 'text-sm font-bold text-foreground'}>{s.severity}</Text>
                  </View>
                }
                onPress={() => router.push({ pathname: '/log-symptom', params: { id: s.id } })}
              />
            ))}
          </Card>
        </View>
      ) : null}

      <Pressable onPress={() => router.push('/doctor')}>
        <GradientPanel variant="plum">
          <View className="flex-row items-center gap-3">
            <View className="size-11 items-center justify-center rounded-full bg-ivory">
              <Icon sf="stethoscope" md="medical_services" size={20} />
            </View>
            <View className="flex-1 gap-0.5">
              <Text className="font-heading text-lg text-white">Doctor Mode</Text>
              <Text className="text-sm text-white">Turn your entries into a clear health history for your next appointment.</Text>
            </View>
          </View>
        </GradientPanel>
      </Pressable>
    </ScrollView>
  );
}
