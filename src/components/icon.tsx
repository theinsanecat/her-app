import { SymbolView, type SymbolViewProps } from 'expo-symbols';

import { Palette } from '@/constants/theme';

type IconProps = {
  sf: string;
  md: string;
  size?: number;
  color?: string;
  weight?: SymbolViewProps['weight'];
};

export function Icon({ sf, md, size = 20, color = Palette.plum, weight = 'regular' }: IconProps) {
  return (
    <SymbolView
      name={{ ios: sf, android: md } as SymbolViewProps['name']}
      size={size}
      tintColor={color}
      weight={weight}
      type="hierarchical"
      style={{ width: size, height: size }}
    />
  );
}
