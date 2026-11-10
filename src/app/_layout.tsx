import '@/global.css';

import Constants from 'expo-constants';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Fraunces_400Regular_Italic, Fraunces_500Medium, Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
import { HeroUINativeProvider } from 'heroui-native';
import { Appearance } from 'react-native';
import { Uniwind } from 'uniwind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Newly } from '@newly/sdk-react-native';

import { ThemeSwitchHost } from '@/components/theme-switch-host';
import { hideExpoDeveloperUi } from '@/lib/dev-menu';
import { Palette } from '@/constants/theme';
import { StatusHaze } from '@/components/status-haze';
import generatedAnalytics from '@/lib/newly-analytics.json';

type NewlyAnalyticsExtra = {
  newlyAnalyticsEnabled?: unknown;
  newlyAnalyticsSamplingRate?: unknown;
  newlyApiUrl?: unknown;
  newlyIngestKey?: unknown;
};

// Analytics settings live in src/lib/newly-analytics.json (empty by default), with
// app.json `expo.extra` as a fallback for older configs.
const generated = generatedAnalytics as {
  ingestKey?: string;
  apiUrl?: string;
  enabled?: boolean;
  samplingRate?: number | null;
};
const analyticsExtra = (Constants.expoConfig?.extra ?? {}) as NewlyAnalyticsExtra;
const analytics = generated.ingestKey
  ? {
      ingestKey: generated.ingestKey,
      apiUrl: generated.apiUrl,
      enabled: generated.enabled,
      sampling: generated.samplingRate,
    }
  : {
      ingestKey: analyticsExtra.newlyIngestKey,
      apiUrl: analyticsExtra.newlyApiUrl,
      enabled: analyticsExtra.newlyAnalyticsEnabled,
      sampling: analyticsExtra.newlyAnalyticsSamplingRate,
    };

const newlyIngestKey = typeof analytics.ingestKey === 'string' ? analytics.ingestKey : '';
const newlyApiUrl = typeof analytics.apiUrl === 'string' ? analytics.apiUrl : '';
const newlyAnalyticsSampling = typeof analytics.sampling === 'number' ? analytics.sampling : undefined;

// Expo's floating gear and developer menu belong to whoever is debugging Expo, not to
// the person looking at their own app. See src/lib/dev-menu.ts for why this is JS and
// not an app.json plugin option.
hideExpoDeveloperUi();

// HER's identity is blush and lavender in every lighting, so the app stays in its light palette.
Appearance.setColorScheme('light');
Uniwind.setTheme('light');
SplashScreen.preventAutoHideAsync().catch(() => undefined);

const HerTheme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: Palette.baby, card: Palette.baby, text: Palette.plum, primary: Palette.plum } };

if (analytics.enabled !== false && newlyIngestKey && newlyApiUrl) {
  Newly.init({
    ingestKey: newlyIngestKey,
    apiUrl: newlyApiUrl,
    sampling: newlyAnalyticsSampling,
  });
}

// React Navigation uses HER's light theme. KeyboardProvider is mounted once at the root
// so any screen can use KeyboardAwareScrollView and the keyboard hooks for forms.
export default function RootLayout() {
  const [loaded] = useFonts({ Fraunces_400Regular_Italic, Fraunces_500Medium, Fraunces_600SemiBold });
  if (!loaded) return null;
  SplashScreen.hideAsync().catch(() => undefined);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <HeroUINativeProvider>
          <ThemeProvider value={HerTheme}>
            <ThemeSwitchHost>
              <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Palette.baby } }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="onboarding" options={{ presentation: 'fullScreenModal', gestureEnabled: false }} />
                <Stack.Screen name="check-in" options={{ presentation: 'formSheet', sheetAllowedDetents: [0.92], sheetGrabberVisible: true, sheetCornerRadius: 32 }} />
                <Stack.Screen name="log-symptom" options={{ presentation: 'formSheet', sheetAllowedDetents: [0.92], sheetGrabberVisible: true, sheetCornerRadius: 32 }} />
              </Stack>
              <StatusHaze />
            </ThemeSwitchHost>
          </ThemeProvider>
        </HeroUINativeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
