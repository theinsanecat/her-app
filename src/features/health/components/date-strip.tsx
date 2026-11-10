import { ScrollView, Text, View } from 'react-native';

import { Pressable } from '@/components/pressable';
import { fromKey, rangeKeys, weekdayLetter } from '@/features/health/utils/dates';
import type { DayLog } from '@/features/health/types/health';
import { cn } from '@/lib/cn';

type DateStripProps = {
  end: string;
  selected: string;
  days: Record<string, DayLog>;
  onSelect: (date: string) => void;
};

export function DateStrip({ end, selected, days, onSelect }: DateStripProps) {
  const keys = rangeKeys(end, 14);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5" contentContainerClassName="px-5 gap-2" contentOffset={{ x: 400, y: 0 }}>
      {keys.map((k) => {
        const on = k === selected;
        const log = days[k];
        const period = log?.flow && log.flow !== 'spotting';
        return (
          <Pressable key={k} onPress={() => onSelect(k)} accessibilityLabel={k}>
            <View className={cn('w-12 items-center gap-1 rounded-full py-3', on ? 'bg-plum' : 'bg-ivory')}>
              <Text className={cn('text-xs font-medium', on ? 'text-white' : 'text-muted')}>{weekdayLetter(k)}</Text>
              <Text className={cn('font-heading text-lg', on ? 'text-white' : 'text-foreground')}>{fromKey(k).getDate()}</Text>
              <View className={cn('size-1.5 rounded-full', period ? 'bg-rose' : log?.checkedIn ? 'bg-lavender' : 'bg-transparent')} />
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
