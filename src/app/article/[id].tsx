import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import { BackHeader } from "@/components/back-header";
import { Card } from "@/components/card";
import { GradientPanel } from "@/components/gradient-panel";
import { Icon } from "@/components/icon";
import { Image } from "@/components/image";
import { Palette } from "@/constants/theme";
import {
  ARTICLES,
  CATEGORIES,
  CATEGORY_IMAGES,
  articleByID,
} from "@/features/health/data/articles";

function Bullets({ items }: { items: string[] }) {
  return (
    <View className="gap-2">
      {items.map((i) => (
        <View key={i} className="flex-row gap-2">
          <Text className="text-base text-rose">•</Text>
          <Text className="flex-1 text-base leading-6 text-foreground">
            {i}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const a = articleByID(id) ?? ARTICLES[0];
  const cat = CATEGORIES.find((c) => c.id === a.category)?.label;

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        overScrollMode="never"
        className="flex-1"
        contentContainerClassName="px-5 pt-safe-offset-16 pb-safe-offset-4 gap-6"
      >
        <Image
          source={CATEGORY_IMAGES[a.category]}
          className="h-56 w-full rounded-3xl"
          contentFit="cover"
        />
        <View className="gap-2">
          <Text className="text-sm font-semibold text-muted">
            {cat} · {a.minutes} min read
          </Text>
          <Text className="font-heading text-3xl text-foreground">
            {a.title}
          </Text>
          <Text className="font-heading-italic text-lg text-muted">
            {a.dek}
          </Text>
        </View>

        <View className="gap-2">
          <Text className="font-heading text-xl text-foreground">
            In simple terms
          </Text>
          <Text className="text-base leading-6 text-foreground">
            {a.simple}
          </Text>
        </View>
        <View className="gap-2">
          <Text className="font-heading text-xl text-foreground">
            What research suggests
          </Text>
          <Text className="text-base leading-6 text-foreground">
            {a.research}
          </Text>
        </View>

        <Card>
          <View className="flex-row items-center gap-2">
            <View className="rounded-full bg-plum px-3 py-1">
              <Text className="text-xs font-bold text-white">Established</Text>
            </View>
            <Text className="text-sm text-muted">
              Well supported by evidence
            </Text>
          </View>
          <Bullets items={a.established} />
        </Card>
        <Card>
          <View className="flex-row items-center gap-2">
            <View className="rounded-full bg-lavender px-3 py-1">
              <Text className="text-xs font-bold text-foreground">
                Still being investigated
              </Text>
            </View>
          </View>
          <Bullets items={a.emerging} />
        </Card>

        <GradientPanel variant="plum">
          <View className="flex-row items-center gap-2">
            <Icon
              sf="cross.case"
              md="medical_services"
              size={18}
              color={Palette.white}
            />
            <Text className="font-heading text-lg text-white">
              When to seek care
            </Text>
          </View>
          {a.seekCare.map((i) => (
            <Text key={i} className="text-base leading-6 text-white">
              • {i}
            </Text>
          ))}
        </GradientPanel>

        <View className="gap-2">
          <Text className="font-heading text-lg text-foreground">Sources</Text>
          {a.sources.map((s) => (
            <Text key={s} className="text-sm leading-5 text-muted">
              {s}
            </Text>
          ))}
          <Text className="text-xs leading-4 text-muted">
            Summarised for education. Check the source for the full guidance; it
            doesn't replace personal medical advice.
          </Text>
        </View>
      </ScrollView>
      <View className="absolute left-5 top-0 pt-safe-offset-2">
        <BackHeader label="Knowledge" />
      </View>
    </View>
  );
}
