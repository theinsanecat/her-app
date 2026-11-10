import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Gradients } from '@/constants/theme';

type GradientPanelProps = {
  children: ReactNode;
  variant?: 'bloom' | 'insight' | 'plum';
};

/** The one gradient surface: hero and insight cards only. */
export function GradientPanel({ children, variant = 'bloom' }: GradientPanelProps) {
  return (
    <View className="overflow-hidden rounded-3xl border border-border">
      <LinearGradient colors={[...Gradients[variant]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View className="gap-4 p-5">{children}</View>
      </LinearGradient>
    </View>
  );
}
