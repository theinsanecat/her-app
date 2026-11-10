import { Input, Label, TextField } from 'heroui-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Text, View } from 'react-native';

import { SkyBackdrop } from '@/components/sky-backdrop';
import { Orb } from '@/components/orb';
import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { GradientPanel } from '@/components/gradient-panel';
import { Icon } from '@/components/icon';
import { ListRow } from '@/components/list-row';
import { PillButton } from '@/components/pill-button';
import { SampleBadge } from '@/components/sample-badge';
import { Segmented } from '@/components/segmented';
import { Stepper } from '@/components/stepper';
import { Palette } from '@/constants/theme';
import { AGE_RANGES, CONCERNS, GOALS, REGULARITY } from '@/features/health/data/catalog';
import { useProfileScreen } from '@/features/health/hooks/use-profile-screen';
import type { Medication } from '@/features/health/types/health';

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="font-heading text-xl text-foreground">{title}</Text>
      {children}
    </View>
  );
}

export default function ProfileScreen() {
  const p = useProfileScreen();
  const toggle = (key: 'concerns' | 'goals', v: string) => p.updateProfile({ [key]: p.profile[key].includes(v) ? p.profile[key].filter((x) => x !== v) : [...p.profile[key], v] });

  return (
    <KeyboardAwareScrollView overScrollMode="never" className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-6" keyboardShouldPersistTaps="handled" bottomOffset={24}>
      <SkyBackdrop />
      <Text className="font-heading text-3xl text-foreground">Profile</Text>
      {p.isSample ? <SampleBadge /> : null}

      <Card>
        <TextField>
          <Label>What should HER call you?</Label>
          <Input value={p.profile.name ?? ''} onChangeText={(v) => p.updateProfile({ name: v || undefined })} placeholder="Your first name" className="leading-none" />
        </TextField>
        <Text className="text-base text-foreground">Age range</Text>
        <View className="flex-row flex-wrap gap-2">
          {AGE_RANGES.map((a) => (
            <Chip key={a} label={a} selected={p.profile.ageRange === a} onPress={() => p.updateProfile({ ageRange: p.profile.ageRange === a ? undefined : a })} />
          ))}
        </View>
      </Card>

      <Group title="Health information">
        <Card>
          <Text className="text-base text-foreground">How regular are your cycles?</Text>
          <View className="flex-row flex-wrap gap-2">
            {REGULARITY.map((r) => (
              <Chip key={r} label={r} tone="lilac" selected={p.profile.regularity === r} onPress={() => p.updateProfile({ regularity: p.profile.regularity === r ? undefined : r })} />
            ))}
          </View>
          <Stepper label="Typical cycle length" value={p.profile.cycleLength} unit="days" step={1} min={15} max={60} start={28} onChange={(v) => p.updateProfile({ cycleLength: v })} />
          <Text className="text-xs text-muted">Used only until you've logged two periods. After that, HER uses your records.</Text>
        </Card>
        <Card>
          <Text className="text-base text-foreground">What you'd like to understand</Text>
          <View className="flex-row flex-wrap gap-2">
            {CONCERNS.map((c) => (
              <Chip key={c} label={c} selected={p.profile.concerns.includes(c)} onPress={() => toggle('concerns', c)} />
            ))}
          </View>
          <Text className="text-base text-foreground">Goals</Text>
          <View className="flex-row flex-wrap gap-2">
            {GOALS.map((g) => (
              <Chip key={g} label={g} tone="lilac" selected={p.profile.goals.includes(g)} onPress={() => toggle('goals', g)} />
            ))}
          </View>
        </Card>
      </Group>

      <Group title="Medications & supplements">
        {p.medications.length ? (
          <Card list>
            {p.medications.map((m) => (
              <ListRow key={m.id} title={m.name} subtitle={[m.dose, m.kind === 'medication' ? 'Medication' : 'Supplement'].filter(Boolean).join(' · ')} left={<Icon sf="pills" md="medication" size={18} />} right={<Chip label="Remove" onPress={() => p.confirmRemoveMed(m)} />} />
            ))}
          </Card>
        ) : null}
        <Card>
          <Segmented values={['supplement', 'medication'] as Medication['kind'][]} labels={['Supplement', 'Medication']} value={p.medKind} onChange={p.setMedKind} />
          <TextField>
            <Input value={p.medName} onChangeText={p.setMedName} placeholder="Name, e.g. Iron" className="leading-none" />
          </TextField>
          <TextField>
            <Input value={p.medDose} onChangeText={p.setMedDose} placeholder="Dose (optional), e.g. 14 mg" className="leading-none" />
          </TextField>
          <PillButton label="Add to my list" variant="soft" sf="plus" md="add" onPress={p.addMed} disabled={!p.medName.trim()} />
        </Card>
      </Group>

      <Group title="Your data">
        <Card list>
          <ListRow title="Export my data" subtitle="Share a full copy of your entries as a file" left={<Icon sf="square.and.arrow.up" md="ios_share" size={18} />} onPress={p.exportData} />
          {p.isSample ? (
            <ListRow title="Start fresh" subtitle="Clear the sample profile and log your own" left={<Icon sf="sparkles" md="auto_awesome" size={18} />} onPress={p.startFresh} />
          ) : (
            <ListRow title="Explore the sample profile" subtitle="88 days of fictional entries to see what HER can do" left={<Icon sf="person.2.wave.2" md="groups" size={18} />} onPress={p.switchToSample} />
          )}
          <ListRow title="Delete all health records" subtitle="Permanently erase everything on this phone" left={<Icon sf="trash" md="delete" size={18} color={Palette.rose} />} onPress={p.deleteEverything} />
        </Card>
      </Group>

      <GradientPanel variant="insight">
        <View className="flex-row items-center gap-2">
          <Orb size="sm" source={require('@/assets/images/orb-privacy.jpg')} />
          <Text className="font-heading text-lg text-foreground">Your privacy</Text>
        </View>
        <Text className="text-sm leading-5 text-foreground">• Everything you log stays on this phone. There's no account and nothing is uploaded.</Text>
        <Text className="text-sm leading-5 text-foreground">• Your health data is never sent to AI services, never sold and never used for advertising.</Text>
        <Text className="text-sm leading-5 text-foreground">• Insights are calculated on your phone. You choose when to share a report or export.</Text>
        <Text className="text-sm leading-5 text-foreground">• Deleting the app or your records removes the data for good, so export first if you want a copy.</Text>
      </GradientPanel>

      <Card>
        <Text className="font-heading text-lg text-foreground">Medical disclaimer</Text>
        <Text className="text-sm leading-5 text-muted">
          HER helps you record and reflect on your health. It does not diagnose conditions, recommend treatments or replace care from a qualified clinician. If you have severe, sudden or worrying symptoms, contact a doctor or emergency services.
        </Text>
      </Card>
      <Text className="text-center font-heading-italic text-base text-muted">You have the right to know what's going on in your body.</Text>
    </KeyboardAwareScrollView>
  );
}
