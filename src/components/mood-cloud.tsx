import { Text, View } from 'react-native';

import { Pressable } from '@/components/pressable';
import { cn } from '@/lib/cn';

const SIZES = ['size-20', 'size-22', 'size-20', 'size-22'];
const sizeFor = (label: string, i: number) => (label.length >= 8 ? 'size-26' : SIZES[i % SIZES.length]);

export function MoodCloud({ moods, selected, onToggle }: { moods: string[]; selected: string[]; onToggle: (mood: string) => void }) {
  return (
    <View className="flex-row flex-wrap items-center justify-center gap-1.5">
      {moods.map((m, i) => {
        const on = selected.includes(m);
        return (
          <Pressable key={m} onPress={() => onToggle(m)} accessibilityRole="button" accessibilityState={{ selected: on }} accessibilityLabel={m}>
            <View className={cn('items-center justify-center rounded-full p-1', sizeFor(m, i), on ? 'border-2 border-lavender bg-lilac' : 'border border-border bg-ivory')}>
              <Text className={cn('text-center text-sm text-foreground', on ? 'font-semibold' : 'font-normal')} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                {m}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
