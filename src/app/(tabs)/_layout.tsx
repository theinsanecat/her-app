import { Redirect } from 'expo-router';

import AppTabs from '@/components/app-tabs';
import { useHealthStore } from '@/features/health/store/health-store';

export default function TabsLayout() {
  const onboarded = useHealthStore((s) => s.onboarded);
  if (!onboarded) return <Redirect href="/onboarding" />;
  return <AppTabs />;
}
