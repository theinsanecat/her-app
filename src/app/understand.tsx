import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { SkyBackdrop } from '@/components/sky-backdrop';
import { BackHeader } from '@/components/back-header';
import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { GradientPanel } from '@/components/gradient-panel';
import { ListRow } from '@/components/list-row';
import { articleByID } from '@/features/health/data/articles';
import { symptomByID } from '@/features/health/data/catalog';
import { GUIDES } from '@/features/health/data/guides';
import { useHealthStore } from '@/features/health/store/health-store';
import { addDays, shortDate, todayKey } from '@/features/health/utils/dates';
import { symptomStats } from '@/features/health/utils/insights';
import { cn } from '@/lib/cn';

const EVIDENCE_STYLE = { Established: 'bg-plum', Emerging: 'bg-lavender', 'Commonly reported': 'bg-blush' } as const;

export default function UnderstandScreen() {
  const [id, setID] = useState(GUIDES[0].symptomID);
  const symptoms = useHealthStore((s) => s.symptoms);
  const guide = GUIDES.find((g) => g.symptomID === id) ?? GUIDES[0];
  const today = todayKey();
  const mine = symptomStats(symptoms, addDays(today, -89), today).find((x) => x.id === id);
  const label = symptomByID(id).label;

  return (
    <ScrollView overScrollMode="never" className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-4 gap-6">
      <SkyBackdrop />
      <BackHeader label="Knowledge" />
      <View className="gap-1">
        <Text className="font-heading text-3xl text-foreground">Understand my symptoms</Text>
        <Text className="text-base text-muted">Not every symptom is hormonal. Here's the wider picture.</Text>
      </View>

      <View className="flex-row flex-wrap gap-2">
        {GUIDES.map((g) => (
          <Chip key={g.symptomID} label={symptomByID(g.symptomID).label} sf={symptomByID(g.symptomID).sf} md={symptomByID(g.symptomID).md} selected={g.symptomID === id} onPress={() => setID(g.symptomID)} />
        ))}
      </View>

      <GradientPanel>
        <Text className="font-heading text-2xl text-foreground">{label}</Text>
        <Text className="text-base leading-6 text-foreground">{guide.intro}</Text>
        <View className="gap-1 rounded-2xl bg-ivory p-4">
          <Text className="text-sm font-semibold text-foreground">In your log · last 90 days</Text>
          <Text className="text-sm leading-5 text-foreground">
            {mine
              ? `${mine.count} entries, average intensity ${mine.avg}/10 (highest ${mine.max}). Last logged ${shortDate(mine.last)}.${mine.topTriggers.length ? ` You most often noted: ${mine.topTriggers.join(', ').toLowerCase()}.` : ''}`
              : `You haven't logged ${label.toLowerCase()} yet.`}
          </Text>
        </View>
      </GradientPanel>

      <View className="gap-3">
        <Text className="font-heading text-xl text-foreground">Things that can contribute</Text>
        {guide.factors.map((f) => (
          <Card key={f.label}>
            <View className="flex-row items-center justify-between gap-2">
              <Text className="flex-1 text-base font-semibold text-foreground">{f.label}</Text>
              <View className={cn('rounded-full px-2.5 py-1', EVIDENCE_STYLE[f.evidence])}>
                <Text className={cn('text-xs font-bold', f.evidence === 'Established' ? 'text-white' : 'text-foreground')}>{f.evidence}</Text>
              </View>
            </View>
            <Text className="text-sm leading-5 text-muted">{f.detail}</Text>
          </Card>
        ))}
      </View>

      <GradientPanel variant="plum">
        <Text className="font-heading text-lg text-white">Get care promptly if</Text>
        {guide.seekCare.map((s) => (
          <Text key={s} className="text-base leading-6 text-white">
            • {s}
          </Text>
        ))}
      </GradientPanel>

      <View className="gap-3">
        <Text className="font-heading text-xl text-foreground">Read more</Text>
        <Card list>
          {guide.articleIDs.map((aid) => {
            const a = articleByID(aid);
            return a ? <ListRow key={aid} title={a.title} subtitle={`${a.minutes} min read`} onPress={() => router.push({ pathname: '/article/[id]', params: { id: aid } })} /> : null;
          })}
        </Card>
      </View>
      <Text className="text-center text-xs leading-4 text-muted">General education, not a diagnosis. Evidence labels describe the research, not your situation.</Text>
    </ScrollView>
  );
}
