import type { ImageSourcePropType } from 'react-native';
import { Text, View } from 'react-native';

import { Card } from '@/components/card';
import { Image } from '@/components/image';
import { Pressable } from '@/components/pressable';

export function OrbTile({ image, title, caption, onPress }: { image: ImageSourcePropType; title: string; caption: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${title} ${caption}`}>
      <View className="w-32">
        <Card>
        <Image source={image} className="size-14 rounded-full" contentFit="cover" />
        <View>
          <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-xs text-muted" numberOfLines={1}>
            {caption}
          </Text>
        </View>
        </Card>
      </View>
    </Pressable>
  );
}
