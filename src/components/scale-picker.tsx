import { Text, View } from 'react-native';

import { Pressable } from '@/components/pressable';
import { cn } from '@/lib/cn';

type ScalePickerProps = {
  value?: number;
  onChange: (value: number) => void;
  max?: number;
  lowLabel?: string;
  highLabel?: string;
};

/** A row of tappable 1…max dots that fill up to the chosen value. */
export function ScalePicker({ value, onChange, max = 10, lowLabel, highLabel }: ScalePickerProps) {
  return (
    <View className="gap-2">
      <View className="flex-row justify-between">
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
          const filled = value !== undefined && n <= value;
          const current = value === n;
          return (
            <Pressable key={n} onPress={() => onChange(n)} accessibilityLabel={`${n} of ${max}`} hitSlop={4}>
              <View className={cn('size-8 items-center justify-center rounded-full border', filled ? 'bg-rose border-rose' : 'bg-ivory border-border', current ? 'bg-plum border-plum' : '')}>
                <Text className={cn('text-xs font-semibold', current ? 'text-white' : 'text-foreground')}>{n}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      {lowLabel || highLabel ? (
        <View className="flex-row justify-between">
          <Text className="text-xs text-muted">{lowLabel}</Text>
          <Text className="text-xs text-muted">{highLabel}</Text>
        </View>
      ) : null}
    </View>
  );
}
