import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';

type BackHeaderProps = {
  label?: string;
};

export function BackHeader({ label = 'Back' }: BackHeaderProps) {
  return (
    <View className="flex-row">
      <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel={label} hitSlop={8}>
        <View className="flex-row items-center gap-1 rounded-full bg-ivory px-3 py-2" style={{ minHeight: 40 }}>
          <Icon sf="chevron.left" md="chevron_left" size={15} weight="semibold" />
          <Text className="text-sm font-medium text-foreground">{label}</Text>
        </View>
      </Pressable>
    </View>
  );
}
