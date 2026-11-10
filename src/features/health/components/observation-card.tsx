import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';
import { GradientPanel } from '@/components/gradient-panel';
import { symptomByID } from '@/features/health/data/catalog';
import type { Observation } from '@/features/health/types/insights';

type ObservationCardProps = {
  observation: Observation;
  open: boolean;
  onToggle: () => void;
  sample: boolean;
};

function Block({ sf, md, title, children }: { sf: string; md: string; title: string; children: string | string[] }) {
  return (
    <View className="gap-1.5 rounded-2xl bg-ivory p-4">
      <View className="flex-row items-center gap-2">
        <Icon sf={sf} md={md} size={15} />
        <Text className="text-sm font-semibold text-foreground">{title}</Text>
      </View>
      {(Array.isArray(children) ? children : [children]).map((c) => (
        <Text key={c} className="text-sm leading-5 text-foreground">
          {c}
        </Text>
      ))}
    </View>
  );
}

export function ObservationCard({ observation: o, open, onToggle, sample }: ObservationCardProps) {
  const def = symptomByID(o.symptomID);
  return (
    <GradientPanel variant="insight">
      <Pressable onPress={onToggle} accessibilityRole="button" accessibilityState={{ expanded: open }}>
        <View className="gap-3">
          <View className="flex-row items-center gap-2">
            <View className="size-9 items-center justify-center rounded-full bg-ivory">
              <Icon sf={def.sf} md={def.md} size={17} />
            </View>
            <Text className="flex-1 text-sm font-semibold text-foreground">{o.title}</Text>
            <View className="rounded-full bg-ivory px-2.5 py-1">
              <Text className="text-xs font-medium text-foreground">{o.strength}</Text>
            </View>
          </View>
          <Text className="font-heading-medium text-lg leading-6 text-foreground">{o.headline}</Text>
          <View className="flex-row items-center gap-1.5">
            <Text className="flex-1 text-xs text-muted">
              {o.entries} entries{sample ? ' · fictional sample data' : ''} · observation, not diagnosis
            </Text>
            <Text className="text-xs font-semibold text-foreground">{open ? 'Less' : 'Why HER thinks so'}</Text>
            <Icon sf={open ? 'chevron.up' : 'chevron.down'} md={open ? 'expand_less' : 'expand_more'} size={12} />
          </View>
        </View>
      </Pressable>
      {open ? (
        <View className="gap-2">
          <Block sf="eye" md="visibility" title="What was observed">
            {o.headline}
          </Block>
          <Block sf="list.number" md="format_list_numbered" title="Entries that support it">
            {o.support}
          </Block>
          <Block sf="lightbulb" md="lightbulb" title="What it could mean">
            {o.meaning}
          </Block>
          <Block sf="exclamationmark.circle" md="error_outline" title="What can't be concluded">
            {o.cannotConclude}
          </Block>
          <Block sf="stethoscope" md="medical_services" title="Worth discussing with a clinician">
            {o.discuss}
          </Block>
        </View>
      ) : null}
    </GradientPanel>
  );
}
