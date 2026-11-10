import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';

type StepperProps = {
  label: string;
  value?: number;
  unit: string;
  step: number;
  min?: number;
  max: number;
  start: number;
  onChange: (value: number) => void;
};

export function Stepper({ label, value, unit, step, min = 0, max, start, onChange }: StepperProps) {
  const current = value ?? start;
  return (
    <View className="flex-row items-center justify-between gap-3" style={{ minHeight: 44 }}>
      <Text className="flex-1 text-base text-foreground">{label}</Text>
      <Pressable onPress={() => onChange(Math.max(min, Math.round((current - step) * 10) / 10))} accessibilityLabel={`Less ${label}`}>
        <View className="size-10 items-center justify-center rounded-full bg-petal">
          <Icon sf="minus" md="remove" size={16} />
        </View>
      </Pressable>
      <View className="items-center" style={{ minWidth: 64 }}>
        <Text className="font-heading text-2xl text-foreground">{value === undefined ? '–' : value}</Text>
        <Text className="text-xs text-muted">{unit}</Text>
      </View>
      <Pressable onPress={() => onChange(value === undefined ? start : Math.min(max, Math.round((current + step) * 10) / 10))} accessibilityLabel={`More ${label}`}>
        <View className="size-10 items-center justify-center rounded-full bg-petal">
          <Icon sf="plus" md="add" size={16} />
        </View>
      </Pressable>
    </View>
  );
}
