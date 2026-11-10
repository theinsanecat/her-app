import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type ScrubAreaProps = {
  onPick: (x: number) => void;
  children: ReactNode;
};

// Taps and sideways drags pick a point; vertical drags fail fast so the page keeps scrolling.
export function ScrubArea({ onPick, children }: ScrubAreaProps) {
  const tap = Gesture.Tap()
    .runOnJS(true)
    .onEnd((e) => onPick(e.x));
  const pan = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([-8, 8])
    .failOffsetY([-8, 8])
    .onUpdate((e) => onPick(e.x));

  return (
    <GestureDetector gesture={Gesture.Exclusive(pan, tap)}>
      <View collapsable={false}>{children}</View>
    </GestureDetector>
  );
}
