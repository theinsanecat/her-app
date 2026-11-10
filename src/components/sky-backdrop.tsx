import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { Image } from '@/components/image';
import { Palette } from '@/constants/theme';

export function SkyBackdrop() {
  return (
    <View pointerEvents="none" className="absolute inset-x-0 top-0 h-96">
      <Image source={require('@/assets/images/sky.jpg')} className="absolute inset-0" contentFit="cover" />
      <LinearGradient colors={[Palette.babyHaze, Palette.babyClear, Palette.baby]} locations={[0, 0.35, 1]} style={StyleSheet.absoluteFill} />
    </View>
  );
}
