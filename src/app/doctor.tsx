import { Input, TextField } from 'heroui-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Text, View } from 'react-native';

import { SkyBackdrop } from '@/components/sky-backdrop';
import { BackHeader } from '@/components/back-header';
import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { PillButton } from '@/components/pill-button';
import { Pressable } from '@/components/pressable';
import { Segmented } from '@/components/segmented';
import { Palette, severityColor } from '@/constants/theme';
import { BarChart } from '@/features/health/components/bar-chart';
import { symptomByID } from '@/features/health/data/catalog';
import { useDoctorScreen } from '@/features/health/hooks/use-doctor-screen';
import { longDate, shortDate } from '@/features/health/utils/dates';
import { confirmDelete } from '@/lib/confirm';

function Heading({ children }: { children: string }) {
  return <Text className="text-xs font-bold uppercase tracking-widest text-muted">{children}</Text>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between gap-3">
      <Text className="text-sm text-muted">{label}</Text>
      <Text className="flex-1 text-right text-sm font-semibold text-foreground">{value}</Text>
    </View>
  );
}

export default function DoctorScreen() {
  const d = useDoctorScreen();
  const r = d.report;

  return (
    <KeyboardAwareScrollView overScrollMode="never" className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-4 gap-6" keyboardShouldPersistTaps="handled" bottomOffset={24}>
      <SkyBackdrop />
      <BackHeader />
      <View className="gap-1">
        <Text className="font-heading text-3xl text-foreground">Doctor Mode</Text>
        <Text className="text-base text-muted">A clear, factual summary to bring to your appointment.</Text>
      </View>
      <Segmented values={['30', '90'] as const} labels={['Last 30 days', 'Last 90 days']} value={d.range} onChange={d.setRange} />

      <Card>
        <View className="gap-1">
          {d.isSample ? (
            <View className="self-start rounded-full bg-lilac px-3 py-1">
              <Text className="text-xs font-bold text-foreground">Sample report · fictional data</Text>
            </View>
          ) : null}
          <Text className="font-heading text-2xl text-foreground">Health summary</Text>
          <Text className="text-sm text-muted">
            {d.profile.name ?? 'Patient'}
            {d.profile.ageRange ? ` · ${d.profile.ageRange}` : ''} · {longDate(r.start)} – {longDate(d.today)} · {r.logs} days logged
          </Text>
        </View>

        <View className="h-px bg-separator" />
        <Heading>Menstrual history</Heading>
        <Fact label="Periods recorded" value={String(r.periods.length)} />
        {r.periods.map((p) => (
          <Fact key={p.start} label={`Started ${shortDate(p.start)}`} value={`${p.length} days`} />
        ))}
        <Fact label="Cycle lengths" value={r.lengths.length ? `${r.lengths.join(', ')} days` : 'Not enough data'} />
        <Fact label="Spotting days" value={String(r.spotting)} />
        {d.profile.regularity ? <Fact label="Self-described" value={d.profile.regularity} /> : null}

        <View className="h-px bg-separator" />
        <Heading>Symptoms</Heading>
        <View className="flex-row gap-2">
          <Text className="flex-1 text-xs font-semibold text-muted">Symptom</Text>
          <Text className="w-14 text-right text-xs font-semibold text-muted">Entries</Text>
          <Text className="w-16 text-right text-xs font-semibold text-muted">Avg / max</Text>
        </View>
        {r.stats.map((s) => (
          <View key={s.id} className="flex-row items-center gap-2">
            <View className="size-2.5 rounded-full" style={{ backgroundColor: severityColor(Math.round(s.avg)) }} />
            <View className="flex-1">
              <Text className="text-sm font-medium text-foreground">{symptomByID(s.id).label}</Text>
              <Text className="text-xs text-muted">
                {shortDate(s.first)} – {shortDate(s.last)}
                {s.topTriggers.length ? ` · noted: ${s.topTriggers.join(', ').toLowerCase()}` : ''}
              </Text>
            </View>
            <Text className="w-14 text-right text-sm text-foreground">{s.count}</Text>
            <Text className="w-16 text-right text-sm text-foreground">
              {s.avg} / {s.max}
            </Text>
          </View>
        ))}
        {r.stats.length ? null : <Text className="text-sm text-muted">No symptoms logged in this range.</Text>}

        {r.timeline.length ? (
          <>
            <View className="h-px bg-separator" />
            <Heading>Timeline · entries per week</Heading>
            {r.timeline.map((t) => (
              <View key={t.id} className="flex-row items-center gap-3">
                <Text className="w-24 text-xs text-foreground" numberOfLines={1}>
                  {t.label}
                </Text>
                <BarChart bars={t.weeks} max={7} width={180} height={28} color={Palette.rose} />
              </View>
            ))}
          </>
        ) : null}

        <View className="h-px bg-separator" />
        <Heading>Sleep & stress</Heading>
        <Fact label="Average sleep" value={r.sleepAvg !== undefined ? `${r.sleepAvg} h` : '–'} />
        <Fact label="Nights under 6 h" value={String(r.shortNights)} />
        <Fact label="Average stress" value={r.stressAvg !== undefined ? `${r.stressAvg} / 10` : '–'} />
        <Fact label="High-stress days (7+)" value={String(r.highStress)} />

        <View className="h-px bg-separator" />
        <Heading>Medications & supplements</Heading>
        {d.medications.map((m) => (
          <Fact key={m.id} label={`${m.name}${m.dose ? ` ${m.dose}` : ''}`} value={`${r.medDays(m.id)} days taken`} />
        ))}
        {d.medications.length ? null : <Text className="text-sm text-muted">None listed.</Text>}

        {d.observations.length ? (
          <>
            <View className="h-px bg-separator" />
            <Heading>Patterns in my log (timing only)</Heading>
            {d.observations.map((o) => (
              <Text key={o.id} className="text-sm leading-5 text-foreground">
                • {o.headline}
              </Text>
            ))}
          </>
        ) : null}

        <View className="h-px bg-separator" />
        <Heading>My questions</Heading>
        {d.questions.map((q, i) => (
          <View key={q.id} className="flex-row items-start gap-2">
            <Text className="text-sm font-semibold text-foreground">{i + 1}.</Text>
            <Text className="flex-1 text-sm leading-5 text-foreground">{q.text}</Text>
            <Pressable
              onPress={() => confirmDelete({ title: 'Remove this question?', message: q.text, confirmLabel: 'Remove', onConfirm: () => d.removeQuestion(q.id) })}
              accessibilityLabel="Remove question"
              hitSlop={8}
            >
              <Icon sf="xmark.circle" md="cancel" size={18} color={Palette.muted} />
            </Pressable>
          </View>
        ))}
        <TextField>
          <Input value={d.draft} onChangeText={d.setDraft} placeholder="Add a question for your doctor" className="leading-none" returnKeyType="done" onSubmitEditing={d.submitQuestion} />
        </TextField>
        {d.draft.trim() ? <PillButton label="Add question" variant="soft" sf="plus" md="add" onPress={d.submitQuestion} /> : null}

        <View className="h-px bg-separator" />
        <Text className="text-xs leading-4 text-muted">Self-reported data from the HER app. Not a medical record or a diagnosis.</Text>
      </Card>

      <PillButton label="Share report" sf="square.and.arrow.up" md="share" onPress={d.share} />
    </KeyboardAwareScrollView>
  );
}
