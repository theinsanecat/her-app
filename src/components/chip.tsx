import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';
import { Palette } from '@/constants/theme';
import { cn } from '@/lib/cn';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  sf?: string;
  md?: string;
  badge?: string;
  tone?: 'blush' | 'plum' | 'lilac';
};

export function Chip({ label, selected, onPress, sf, md, badge, tone = 'blush' }: ChipProps) {
  const on = tone === 'plum' ? 'bg-plum border-plum' : tone === 'lilac' ? 'bg-lavender border-lavender' : 'bg-blush border-rose';
  const text = selected && tone === 'plum' ? 'text-white' : 'text-foreground';
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: !!selected }}>
      <View className={cn('flex-row items-center gap-1.5 rounded-full border px-4 py-2.5', selected ? on : 'bg-ivory border-border')} style={{ minHeight: 40 }}>
        {sf && md ? <Icon sf={sf} md={md} size={16} color={selected && tone === 'plum' ? Palette.white : Palette.plum} /> : null}
        <Text className={cn('text-sm', selected ? 'font-semibold' : 'font-medium', text)}>{label}</Text>
        {badge ? (
          <View className="rounded-full bg-plum px-1.5 py-0.5">
            <Text className="text-xs font-bold text-white">{badge}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
