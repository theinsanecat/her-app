export type Factor = 'sleep' | 'stress' | 'cycle';

export interface Observation {
  id: string;
  symptomID: string;
  title: string;
  headline: string;
  factors: Factor[];
  support: string[];
  meaning: string;
  cannotConclude: string;
  discuss: string;
  strength: 'Early pattern' | 'Recurring pattern';
  entries: number;
}

export interface PairObservation {
  a: string;
  b: string;
  together: number;
  ofA: number;
  ofB: number;
}

export interface InsightsResult {
  loggedDays: number;
  rangeDays: number;
  enough: boolean;
  daysNeeded: number;
  observations: Observation[];
  pairs: PairObservation[];
}
