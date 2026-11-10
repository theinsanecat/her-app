import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { Palette } from '@/constants/theme';

export function StatusHaze() {
  return (
    <View pointerEvents="none" className="absolute inset-x-0 top-0 pt-safe-offset-6">
      <LinearGradient colors={[Palette.baby, Palette.baby, Palette.babyHaze, Palette.babyClear]} locations={[0, 0.55, 0.8, 1]} style={StyleSheet.absoluteFill} />
    </View>
  );
}
