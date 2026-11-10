import { requireOptionalNativeModule } from 'expo';

/**
 * Hides expo-dev-client's floating gear and launch menu in development builds, so the
 * app looks the way it will in production. Set from JS rather than app.json so it never
 * changes the native configuration. The internal module is reached optionally and every
 * failure is swallowed: production builds have no dev menu.
 */
type DevMenuPreferences = {
  setPreferencesAsync?: (settings: Record<string, boolean>) => Promise<void>;
};

export function hideExpoDeveloperUi(): void {
  try {
    const preferences = requireOptionalNativeModule<DevMenuPreferences>('DevMenuPreferences');
    void preferences?.setPreferencesAsync?.({
      showFloatingActionButton: false,
      showsAtLaunch: false,
      isOnboardingFinished: true,
    }).catch(() => undefined);
  } catch {
    // No dev menu in this build. Nothing to hide.
  }
}
