import { router } from 'expo-router';
import { Input, Label, TextField } from 'heroui-native';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import type { ImageSourcePropType } from 'react-native';
import { Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Presets } from 'react-native-pulsar';

import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { Image } from '@/components/image';
import { Orb } from '@/components/orb';
import { PillButton } from '@/components/pill-button';
import { Stepper } from '@/components/stepper';
import { AGE_RANGES, CONCERNS, GOALS, REGULARITY } from '@/features/health/data/catalog';
import { useHealthStore } from '@/features/health/store/health-store';
import type { Profile } from '@/features/health/types/health';
import { addDays, shortDate, todayKey } from '@/features/health/utils/dates';
import { fadeIn } from '@/lib/motion';
import { cn } from '@/lib/cn';

const STEPS = 5;
const LAST_PERIOD = [
  { label: 'This week', days: 3 },
  { label: '1–2 weeks ago', days: 10 },
  { label: '2–4 weeks ago', days: 21 },
  { label: 'Over a month ago', days: 40 },
];

export default function Onboarding() {
  const complete = useHealthStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>({ concerns: [], goals: [] });
  const set = (patch: Partial<Profile>) => setProfile({ ...profile, ...patch });
  const toggle = (key: 'concerns' | 'goals', v: string) => set({ [key]: profile[key].includes(v) ? profile[key].filter((x) => x !== v) : [...profile[key], v] });
  const next = () => setStep(Math.min(STEPS, step + 1));
  const finish = (sample: boolean) => {
    complete(profile, sample);
    Presets.System.notificationSuccess();
    router.replace('/');
  };

  if (step === 0) {
    return (
      <View className="flex-1 bg-background">
        <Image source={require('@/assets/images/her-hero.jpg')} className="absolute inset-0" contentFit="cover" />
        <View className="flex-1 justify-end gap-6 px-6 pb-safe-offset-6">
          <Card>
            <Text className="font-heading text-5xl text-foreground">HER</Text>
            <Text className="font-heading-italic text-xl leading-7 text-foreground">You have the right to know what's going on in your body.</Text>
            <Text className="text-base leading-6 text-muted">Log how your whole body feels — sleep, stress, mood, symptoms and cycles — and see what connects, honestly.</Text>
            <View className="rounded-2xl bg-lilac p-3">
              <Text className="text-xs leading-4 text-foreground">HER is not medical care. It doesn't diagnose conditions or recommend treatments. In an emergency, contact emergency services.</Text>
            </View>
            <PillButton label="Begin" sf="arrow.right" md="arrow_forward" onPress={next} />
          </Card>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView overScrollMode="never" className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-6 pb-safe-offset-6 gap-6 grow" keyboardShouldPersistTaps="handled" bottomOffset={24}>
      <View className="flex-row items-center gap-1.5">
        {Array.from({ length: STEPS }, (_, i) => (
          <View key={i} className={cn('h-1.5 flex-1 rounded-full', i < step ? 'bg-plum' : 'bg-blush')} />
        ))}
      </View>
      <Animated.View key={step} entering={fadeIn} className="flex-1 gap-6">
        {step === 1 ? (
          <>
            <Title orb={require('@/assets/images/orb-checkin.jpg')} title="A little about you" caption="Everything here is optional and stays on this phone." />
            <TextField>
              <Label>First name</Label>
              <Input value={profile.name ?? ''} onChangeText={(v) => set({ name: v || undefined })} placeholder="What should HER call you?" className="leading-none" />
            </TextField>
            <Text className="text-base text-foreground">Age range</Text>
            <View className="flex-row flex-wrap gap-2">
              {AGE_RANGES.map((a) => (
                <Chip key={a} label={a} selected={profile.ageRange === a} onPress={() => set({ ageRange: a })} />
              ))}
            </View>
          </>
        ) : null}
        {step === 2 ? (
          <>
            <Title orb={require('@/assets/images/orb-cycle.jpg')} title="Your cycle, as context" caption="Cycles are one part of the picture, not the whole of it." />
            <Text className="text-base text-foreground">How regular are your periods?</Text>
            <View className="flex-row flex-wrap gap-2">
              {REGULARITY.map((r) => (
                <Chip key={r} label={r} tone="lilac" selected={profile.regularity === r} onPress={() => set({ regularity: r })} />
              ))}
            </View>
            <Card>
              <Stepper label="Typical cycle length" value={profile.cycleLength} unit="days" step={1} min={15} max={60} start={28} onChange={(v) => set({ cycleLength: v })} />
            </Card>
            <Text className="text-base text-foreground">When did your last period start?</Text>
            <View className="flex-row flex-wrap gap-2">
              {LAST_PERIOD.map((l) => {
                const date = addDays(todayKey(), -l.days);
                const on = profile.lastPeriod !== undefined && Math.abs(new Date(profile.lastPeriod).getTime() - new Date(date).getTime()) < 86400000;
                return <Chip key={l.label} label={l.label} selected={on} onPress={() => set({ lastPeriod: date })} />;
              })}
            </View>
            {profile.lastPeriod ? <Text className="text-sm text-muted">Saved as around {shortDate(profile.lastPeriod)}. You can correct it in My Body.</Text> : null}
          </>
        ) : null}
        {step === 3 ? (
          <>
            <Title orb={require('@/assets/images/orb-mind.jpg')} title="What's on your mind?" caption="Pick anything you'd like to understand better." />
            <View className="flex-row flex-wrap gap-2">
              {CONCERNS.map((c) => (
                <Chip key={c} label={c} selected={profile.concerns.includes(c)} onPress={() => toggle('concerns', c)} />
              ))}
            </View>
          </>
        ) : null}
        {step === 4 ? (
          <>
            <Title orb={require('@/assets/images/orb-lifestyle.jpg')} title="What would help most?" caption="HER shapes Today around these." />
            <View className="flex-row flex-wrap gap-2">
              {GOALS.map((g) => (
                <Chip key={g} label={g} tone="lilac" selected={profile.goals.includes(g)} onPress={() => toggle('goals', g)} />
              ))}
            </View>
          </>
        ) : null}
        {step === 5 ? (
          <>
            <Title orb={require('@/assets/images/orb-insights.jpg')} title="How would you like to start?" caption="You can switch any time in Profile." />
            <Card>
              <Text className="font-heading text-xl text-foreground">Explore a sample profile</Text>
              <Text className="text-sm leading-5 text-muted">88 days of fictional entries (headaches, poor sleep, fatigue, digestion and three cycles) so you can see Connect the Dots and Doctor Mode working. Clearly marked as sample data.</Text>
              <PillButton label="Explore sample profile" sf="sparkles" md="auto_awesome" onPress={() => finish(true)} />
            </Card>
            <Card>
              <Text className="font-heading text-xl text-foreground">Start fresh</Text>
              <Text className="text-sm leading-5 text-muted">Begin with an empty journal. Insights appear after about two weeks of check-ins.</Text>
              <PillButton label="Start my own journal" variant="soft" sf="leaf" md="spa" onPress={() => finish(false)} />
            </Card>
          </>
        ) : null}
      </Animated.View>
      {step < STEPS ? (
        <View className="gap-2">
          <PillButton label="Continue" onPress={next} />
          <PillButton label="Skip" variant="ghost" onPress={next} />
        </View>
      ) : null}
    </KeyboardAwareScrollView>
  );
}

function Title({ orb, title, caption }: { orb: ImageSourcePropType; title: string; caption: string }) {
  return (
    <View className="gap-3">
      <Orb size="lg" source={orb} />
      <View className="gap-1">
      <Text className="font-heading text-3xl text-foreground">{title}</Text>
      <Text className="text-base text-muted">{caption}</Text>
      </View>
    </View>
  );
}
