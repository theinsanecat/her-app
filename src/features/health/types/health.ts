export type Flow = 'spotting' | 'light' | 'medium' | 'heavy';
export type Appetite = 'low' | 'usual' | 'high';
export type SymptomGroup = 'menstrual' | 'physical' | 'mind';

export interface DayLog {
  date: string;
  checkedIn?: boolean;
  energy?: number;
  moods: string[];
  sleepHours?: number;
  sleepQuality?: number;
  stress?: number;
  exerciseMin?: number;
  hydration?: number;
  appetite?: Appetite;
  cravings: string[];
  flow?: Flow;
  medsTaken: string[];
  note?: string;
}

export interface SymptomEntry {
  id: string;
  date: string;
  symptomID: string;
  severity: number;
  duration?: string;
  location?: string;
  frequency?: string;
  triggers: string[];
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  kind: 'medication' | 'supplement';
  dose?: string;
}

export interface DoctorQuestion {
  id: string;
  text: string;
}

export interface Profile {
  name?: string;
  ageRange?: string;
  regularity?: string;
  cycleLength?: number;
  lastPeriod?: string;
  concerns: string[];
  goals: string[];
}

export interface SymptomDef {
  id: string;
  label: string;
  group: SymptomGroup;
  sf: string;
  md: string;
  locations?: string[];
}

export interface Period {
  start: string;
  end: string;
  length: number;
}

export interface CycleRecord {
  start: string;
  length?: number;
  periodLength: number;
}

export interface HealthState {
  onboarded: boolean;
  isSample: boolean;
  profile: Profile;
  days: Record<string, DayLog>;
  symptoms: SymptomEntry[];
  medications: Medication[];
  questions: DoctorQuestion[];
  bloomToken: number;
  celebratedStreak: boolean;
  completeOnboarding: (profile: Profile, useSample: boolean) => void;
  loadSample: () => void;
  startFresh: () => void;
  deleteAll: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
  upsertDay: (date: string, patch: Partial<DayLog>) => void;
  saveCheckIn: (date: string, patch: Partial<DayLog>) => void;
  saveSymptom: (entry: Omit<SymptomEntry, 'id'> & { id?: string }) => void;
  removeSymptom: (id: string) => void;
  addMedication: (med: Omit<Medication, 'id'>) => void;
  removeMedication: (id: string) => void;
  toggleMedTaken: (date: string, medID: string) => void;
  addQuestion: (text: string) => void;
  removeQuestion: (id: string) => void;
  markCelebrated: () => void;
}
