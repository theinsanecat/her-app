import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';

export function SampleBadge() {
  return (
    <View className="flex-row">
      <View className="flex-row items-center gap-1.5 rounded-full bg-lilac px-3 py-1.5">
        <Icon sf="flask" md="science" size={13} />
        <Text className="text-xs font-semibold text-foreground">Sample profile · fictional data</Text>
      </View>
    </View>
  );
}
