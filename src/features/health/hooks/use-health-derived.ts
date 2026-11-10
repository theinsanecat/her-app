import { useHealthStore } from '@/features/health/store/health-store';
import { averageCycleLength, cycleDayOn, deriveCycles, derivePeriods, predictedNextStart } from '@/features/health/utils/cycles';
import { addDays, todayKey } from '@/features/health/utils/dates';

export function useHealthDerived() {
  const days = useHealthStore((s) => s.days);
  const symptoms = useHealthStore((s) => s.symptoms);
  const profile = useHealthStore((s) => s.profile);
  const today = todayKey();
  const periods = derivePeriods(days);
  const cycles = deriveCycles(periods);
  const avgCycle = averageCycleLength(cycles, profile.cycleLength);
  const cycleDay = cycleDayOn(today, periods);
  const nextStart = predictedNextStart(periods, avgCycle);

  let streak = 0;
  for (let i = 0; i < 400; i++) {
    const key = addDays(today, -i);
    if (days[key]?.checkedIn) {
      streak += 1;
      continue;
    }
    if (i === 0) continue;
    break;
  }

  return { today, days, symptoms, profile, periods, cycles, avgCycle, cycleDay, nextStart, streak };
}
