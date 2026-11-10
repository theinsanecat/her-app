import { Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { Sparkline } from '@/features/health/components/sparkline';

type VitalTileProps = {
  label: string;
  value: string;
  caption: string;
  sf: string;
  md: string;
  series: (number | undefined)[];
  max: number;
  color: string;
};

export function VitalTile({ label, value, caption, sf, md, series, max, color }: VitalTileProps) {
  return (
    <View className="flex-1">
      <Card>
        <View className="flex-row items-center gap-1.5">
          <Icon sf={sf} md={md} size={15} />
          <Text className="text-sm font-medium text-muted">{label}</Text>
        </View>
        <View className="gap-0.5">
          <Text className="font-heading text-2xl text-foreground" numberOfLines={1}>
            {value}
          </Text>
          <Text className="text-xs text-muted" numberOfLines={1}>
            {caption}
          </Text>
        </View>
        <Sparkline values={series} max={max} color={color} width={120} />
      </Card>
    </View>
  );
}
