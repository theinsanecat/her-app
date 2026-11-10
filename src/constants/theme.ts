/**
 * HER's native-fallback palette — mirrors the tokens in src/global.css for surfaces that
 * take real color values (NativeTabs, Skia charts, LinearGradient, Slider).
 */
import '@/global.css';

import { Platform } from 'react-native';

export const Palette = {
  baby: '#FCEAF1',
  petal: '#F9DCE8',
  blush: '#F4B8CE',
  rose: '#D98EAD',
  lavender: '#C8B9EA',
  lilac: '#E8DFF8',
  plum: '#684568',
  muted: '#7E5A7A',
  ivory: '#FFF9FC',
  white: '#FFFFFF',
  wisteria: '#B9A6E4',
  peony: '#E9A3C0',
  plumFaint: 'rgba(104,69,104,0.12)',
  plumSoft: 'rgba(104,69,104,0.35)',
  ivoryGlass: 'rgba(255,249,252,0.7)',
  transparent: 'rgba(255,255,255,0)',
  babyClear: 'rgba(252,234,241,0)',
  babyHaze: 'rgba(252,234,241,0.55)',
} as const;

/** Gradients used sparingly: hero cards and insight cards only. */
export const Gradients = {
  bloom: [Palette.blush, Palette.petal, Palette.lilac] as const,
  insight: [Palette.lilac, Palette.petal] as const,
  page: [Palette.petal, Palette.baby] as const,
  plum: [Palette.plum, '#8A5A86'] as const,
};

/** Severity 1–10 mapped from soft blush to deep plum. */
export function severityColor(severity: number): string {
  const ramp = ['#F9DCE8', '#F4C6D8', '#F4B8CE', '#E9A3C0', '#D98EAD', '#C97FA6', '#B4729F', '#9C6194', '#83527F', '#684568'];
  const i = Math.max(0, Math.min(9, Math.round(severity) - 1));
  return ramp[i];
}

export const Colors = {
  light: {
    text: Palette.plum,
    background: Palette.baby,
    backgroundElement: Palette.petal,
    backgroundSelected: Palette.blush,
    textSecondary: Palette.muted,
  },
  dark: {
    text: Palette.plum,
    background: Palette.baby,
    backgroundElement: Palette.petal,
    backgroundSelected: Palette.blush,
    textSecondary: Palette.muted,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: { sans: 'system-ui', serif: 'ui-serif', rounded: 'ui-rounded', mono: 'ui-monospace' },
  default: { sans: 'normal', serif: 'serif', rounded: 'normal', mono: 'monospace' },
  web: { sans: 'var(--font-display)', serif: 'var(--font-serif)', rounded: 'var(--font-rounded)', mono: 'var(--font-mono)' },
});

export const Heading = {
  semibold: 'Fraunces_600SemiBold',
  medium: 'Fraunces_500Medium',
  italic: 'Fraunces_400Regular_Italic',
} as const;
