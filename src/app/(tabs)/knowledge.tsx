import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { SkyBackdrop } from '@/components/sky-backdrop';
import { Orb } from '@/components/orb';
import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { GradientPanel } from '@/components/gradient-panel';
import { Icon } from '@/components/icon';
import { Image } from '@/components/image';
import { ListRow } from '@/components/list-row';
import { Pressable } from '@/components/pressable';
import { ARTICLES, CATEGORIES, CATEGORY_IMAGES } from '@/features/health/data/articles';

export default function KnowledgeScreen() {
  const [category, setCategory] = useState<string | undefined>();
  const list = category ? ARTICLES.filter((a) => a.category === category) : ARTICLES;
  const label = CATEGORIES.find((c) => c.id === category)?.label;

  return (
    <ScrollView overScrollMode="never" className="flex-1 bg-background" contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-6">
      <SkyBackdrop />
      <View className="gap-1">
        <Text className="font-heading text-3xl text-foreground">Knowledge</Text>
        <Text className="text-base text-muted">What's established, what's still being studied, and when to get care.</Text>
      </View>

      <Pressable onPress={() => router.push('/understand')}>
        <GradientPanel>
          <View className="flex-row items-center gap-3">
            <Orb source={require('@/assets/images/orb-understand.jpg')} />
            <View className="flex-1 gap-0.5">
              <Text className="font-heading text-xl text-foreground">Understand my symptoms</Text>
              <Text className="text-sm text-foreground">Explore what can contribute to a symptom, alongside what you've logged.</Text>
            </View>
          </View>
        </GradientPanel>
      </Pressable>

      <View className="gap-3">
        <Text className="font-heading text-xl text-foreground">Topics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5" contentContainerClassName="px-5 gap-3">
          {CATEGORIES.map((c) => (
            <Pressable key={c.id} onPress={() => setCategory(category === c.id ? undefined : c.id)} accessibilityLabel={c.label} accessibilityState={{ selected: category === c.id }}>
              <View className="w-36 gap-2">
                <Image source={CATEGORY_IMAGES[c.id]} className={category === c.id ? 'h-44 w-36 rounded-3xl border-2 border-plum' : 'h-44 w-36 rounded-3xl'} contentFit="cover" />
                <Text className={category === c.id ? 'text-sm font-bold text-foreground' : 'text-sm font-medium text-foreground'} numberOfLines={2}>
                  {c.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View className="gap-3">
        <View className="flex-row items-center justify-between">
          <Text className="font-heading text-xl text-foreground">{label ?? 'All articles'}</Text>
          {category ? <Chip label="Show all" onPress={() => setCategory(undefined)} /> : null}
        </View>
        {list.length ? (
          <Card list>
            {list.map((a) => (
              <ListRow key={a.id} title={a.title} subtitle={`${a.minutes} min read · ${a.dek}`} onPress={() => router.push({ pathname: '/article/[id]', params: { id: a.id } })} />
            ))}
          </Card>
        ) : (
          <Card>
            <Text className="text-sm text-muted">Articles for this topic are on the way.</Text>
          </Card>
        )}
      </View>

      <Text className="text-center text-xs leading-4 text-muted">Educational information only, drawn from public health bodies and clinical guidelines. It doesn't replace advice from a clinician who knows you.</Text>
    </ScrollView>
  );
}
