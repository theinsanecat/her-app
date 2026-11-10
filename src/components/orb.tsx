import type { ImageSourcePropType } from 'react-native';

import { Image } from '@/components/image';
import { cn } from '@/lib/cn';

const SIZE = { sm: 'size-10', md: 'size-14', lg: 'size-24' };

export function Orb({ source, size = 'md', center }: { source: ImageSourcePropType; size?: keyof typeof SIZE; center?: boolean }) {
  return <Image source={source} className={cn('rounded-full', SIZE[size], center ? 'self-center' : null)} contentFit="cover" accessibilityIgnoresInvertColors />;
}
