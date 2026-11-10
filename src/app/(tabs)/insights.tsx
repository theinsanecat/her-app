import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { SkyBackdrop } from '@/components/sky-backdrop';
import { Orb } from '@/components/orb';
import { Card } from '@/components/card';
import { GradientPanel } from '@/components/gradient-panel';
import { Icon } from '@/components/icon';
import { ListRow } from '@/components/list-row';
import { PillButton } from '@/components/pill-button';
import { SampleBadge } from '@/components/sample-badge';
import { Segmented } from '@/components/segmented';
import { Palette, severityColor } from '@/constants/theme';
import { BarChart } from '@/features/health/components/bar-chart';
import { LineChart } from '@/features/health/components/line-chart';
import { ObservationCard } from '@/features/health/components/observation-card';
import { SymptomHeatmap } from '@/features/health/components/symptom-heatmap';
import { ENERGY_LABELS, symptomByID } from '@/features/health/data/catalog';
import { useInsightsScreen } from '@/features/health/hooks/use-insights-screen';
import type { Range } from '@/features/health/hooks/use-insights-screen';
import { longDate, shortDate } from '@/features/health/utils/dates';

function ChartTitle({ title, caption }: { title: string; caption: string }) {
  return (
    <View className="gap-0.5">
      <Text className="font-heading text-lg text-foreground">{title}</Text>
      <Text className="text-sm text-muted">{caption}</Text>
    </View>
  );
}

function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <View className="flex-row flex-wrap gap-4">
      {items.map((i) => (
        <View key={i.label} className="flex-row items-center gap-1.5">
          <View className="size-2.5 rounded-full" style={{ backgroundColor: i.color }} />
          <Text className="text-xs text-muted">{i.label}</Text>
        </View>
      ))}
    </View>
  );
}

export default function InsightsScreen() {
  const s = useInsightsScreen();
  const r = s.insights;
  const si = s.sleepIndex;

  return (
    <ScrollView overScrollMode="never" className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-6">
      <SkyBackdrop />
      <View className="gap-1">
        <Text className="font-heading text-3xl text-foreground">Insights</Text>
        <Text className="font-heading-italic text-lg text-muted">Your body, connected.</Text>
      </View>
      {s.isSample ? <SampleBadge /> : null}
      <Segmented values={['30', '60', '90'] as Range[]} labels={['30 days', '60 days', '90 days']} value={s.range} onChange={s.setRange} />

      <View className="gap-3">
        <View className="flex-row items-center gap-2">
          <Icon sf="point.3.connected.trianglepath.dotted" md="hub" size={20} />
          <Text className="font-heading text-xl text-foreground">Connect the dots</Text>
        </View>
        <Text className="text-sm text-muted">
          {r.loggedDays} check-in days in this range. HER only describes timing your entries show, and always says what it can't conclude.
        </Text>
        {!r.enough ? (
          <GradientPanel variant="insight">
            <Orb size="lg" center source={require('@/assets/images/orb-empty.jpg')} />
            <Text className="font-heading-medium text-lg text-foreground">Not enough entries yet</Text>
            <Text className="text-sm leading-5 text-foreground">
              Patterns need at least 14 check-in days and a few entries per symptom. Log {r.daysNeeded} more days and HER will start looking. Until then, any pattern would be a guess.
            </Text>
            <PillButton label="Check in now" variant="soft" sf="sparkles" md="auto_awesome" onPress={() => router.push('/check-in')} />
          </GradientPanel>
        ) : r.observations.length === 0 ? (
          <GradientPanel variant="insight">
            <Orb size="lg" center source={require('@/assets/images/orb-empty.jpg')} />
            <Text className="font-heading-medium text-lg text-foreground">No consistent patterns in this range</Text>
            <Text className="text-sm leading-5 text-foreground">Nothing in your entries lines up often enough to point out. That's a real result, not a gap.</Text>
          </GradientPanel>
        ) : (
          r.observations.map((o) => <ObservationCard key={o.id} observation={o} open={s.openID === o.id} onToggle={() => s.toggleOpen(o.id)} sample={s.isSample} />)
        )}
      </View>

      {s.heatRows.length ? (
        <Card>
          <ChartTitle title="Symptoms over time" caption="Darker means more intense. Tap or drag across a day." />
          <SymptomHeatmap keys={s.keys} rows={s.heatRows} symptoms={s.symptoms} days={s.days} width={s.chartW} selected={s.selectedDay} onSelect={s.setSelectedDay} />
          <Legend items={[{ color: Palette.blush, label: 'Period' }, { color: severityColor(3), label: 'Mild' }, { color: severityColor(9), label: 'Severe' }]} />
          {s.selectedDay ? (
            <View className="gap-1 rounded-2xl bg-lilac p-3">
              <Text className="text-sm font-semibold text-foreground">{longDate(s.selectedDay)}</Text>
              <Text className="text-sm text-foreground">
                {s.selectedSymptoms.length ? s.selectedSymptoms.map((x) => `${symptomByID(x.symptomID).label} ${x.severity}/10`).join(' · ') : 'No symptoms logged'}
              </Text>
              {s.selectedLog ? (
                <Text className="text-xs text-muted">
                  {[s.selectedLog.sleepHours !== undefined ? `Sleep ${s.selectedLog.sleepHours} h` : '', s.selectedLog.stress !== undefined ? `Stress ${s.selectedLog.stress}/10` : '', s.selectedLog.flow ? `Flow: ${s.selectedLog.flow}` : ''].filter(Boolean).join(' · ')}
                </Text>
              ) : null}
            </View>
          ) : null}
        </Card>
      ) : null}

      {s.periods.length ? (
        <Card>
          <ChartTitle title="Symptoms by cycle day" caption={`How many symptom entries fell on each day of your recorded cycles (cramps excluded). Your cycles average about ${s.lateCycle} days.`} />
          <BarChart bars={s.byCycleDay} max={Math.max(1, ...s.byCycleDay)} width={s.chartW} color={Palette.lavender} highlight={[0, 1, s.lateCycle - 3, s.lateCycle - 2, s.lateCycle - 1]} />
          <View className="flex-row justify-between">
            <Text className="text-xs text-muted">Day 1</Text>
            <Text className="text-xs text-muted">Day 18</Text>
            <Text className="text-xs text-muted">Day 35</Text>
          </View>
          <Legend items={[{ color: Palette.rose, label: 'Days around period start' }, { color: Palette.lavender, label: 'Other cycle days' }]} />
        </Card>
      ) : null}

      <Card>
        <ChartTitle
          title="Sleep & energy"
          caption={si !== undefined ? `${shortDate(s.sleepKeys[si])}: ${s.sleepSeries[si] !== undefined ? `${s.sleepSeries[si]} h sleep` : 'no sleep logged'} · ${s.energySeries[si] ? `energy ${ENERGY_LABELS[(s.energySeries[si] ?? 1) - 1].toLowerCase()}` : 'no energy logged'}` : 'Last 30 days · drag to read a day'}
        />
        <LineChart width={s.chartW} selected={si} onSelect={s.setSleepIndex} series={[{ values: s.sleepSeries, max: 10, min: 3, color: Palette.lavender }, { values: s.energySeries, max: 5, min: 0, color: Palette.rose }]} />
        <Legend items={[{ color: Palette.lavender, label: 'Sleep hours' }, { color: Palette.rose, label: 'Energy' }]} />
      </Card>

      <Card>
        <ChartTitle title="Stress & symptoms by week" caption="Bars count symptom entries each week; the line is average stress (0–10)." />
        <BarChart bars={s.weekly.map((w) => w.count)} max={Math.max(1, ...s.weekly.map((w) => w.count))} width={s.chartW} color={Palette.blush} line={s.weekly.map((w) => w.avgStress)} lineMax={10} />
        <Legend items={[{ color: Palette.blush, label: 'Symptom entries' }, { color: Palette.plum, label: 'Average stress' }]} />
      </Card>

      {r.pairs.length ? (
        <View className="gap-3">
          <ChartTitle title="Often logged together" caption="Symptoms that showed up on the same day. Co-occurring isn't the same as connected." />
          <Card list>
            {r.pairs.map((p) => (
              <ListRow
                key={`${p.a}${p.b}`}
                title={`${symptomByID(p.a).label} + ${symptomByID(p.b).label}`}
                subtitle={`${p.together} shared days · ${symptomByID(p.a).label.toLowerCase()} ${p.ofA}, ${symptomByID(p.b).label.toLowerCase()} ${p.ofB}`}
                left={<Icon sf="link" md="link" size={18} />}
              />
            ))}
          </Card>
        </View>
      ) : null}

      {s.cycles.length ? (
        <View className="gap-3">
          <ChartTitle title="Cycle history" caption="From the periods you've logged." />
          <Card list>
            {[...s.cycles].reverse().map((c) => (
              <ListRow key={c.start} title={`Started ${shortDate(c.start)}`} subtitle={`${c.length ? `${c.length}-day cycle` : 'Current cycle'} · ${c.periodLength}-day period`} left={<Icon sf="drop" md="water_drop" size={18} color={Palette.rose} />} />
            ))}
          </Card>
        </View>
      ) : null}

      <PillButton label="Open Doctor Mode" sf="stethoscope" md="medical_services" onPress={() => router.push('/doctor')} />
      <Text className="text-center text-xs leading-4 text-muted">Insights are observations from your own entries{s.isSample ? ' (here, fictional sample data)' : ''}. They are not medical advice or a diagnosis.</Text>
    </ScrollView>
  );
}
