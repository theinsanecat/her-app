import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';
import { Palette } from '@/constants/theme';
import { cn } from '@/lib/cn';

type PillButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'plum' | 'soft' | 'ghost';
  sf?: string;
  md?: string;
  disabled?: boolean;
};

export function PillButton({ label, onPress, variant = 'plum', sf, md, disabled }: PillButtonProps) {
  const bg = variant === 'plum' ? 'bg-plum' : variant === 'soft' ? 'bg-ivory border border-border' : 'bg-transparent';
  const fg = variant === 'plum' ? Palette.white : Palette.plum;
  return (
    <Pressable onPress={onPress} isDisabled={disabled} accessibilityRole="button">
      <View className={cn('flex-row items-center justify-center gap-2 rounded-full px-6 py-3.5', bg, disabled ? 'opacity-50' : '')} style={{ minHeight: 48 }}>
        {sf && md ? <Icon sf={sf} md={md} size={17} color={fg} weight="medium" /> : null}
        <Text className={cn('text-base font-semibold', variant === 'plum' ? 'text-white' : 'text-foreground')}>{label}</Text>
      </View>
    </Pressable>
  );
}
