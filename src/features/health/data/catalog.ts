import type { SymptomDef, SymptomGroup } from '@/features/health/types/health';

const HEAD = ['Forehead', 'Temples', 'One side', 'Behind eyes', 'Back of head', 'Whole head'];
const ABDOMEN = ['Lower abdomen', 'Upper abdomen', 'Lower back', 'Whole belly'];

export const SYMPTOMS: SymptomDef[] = [
  { id: 'cramps', label: 'Cramps', group: 'menstrual', sf: 'bolt.heart', md: 'bolt', locations: ABDOMEN },
  { id: 'pelvic-pain', label: 'Pelvic pain', group: 'menstrual', sf: 'circle.dotted', md: 'radio_button_unchecked', locations: ['Left side', 'Right side', 'Central', 'During sex'] },
  { id: 'irregular-bleeding', label: 'Irregular bleeding', group: 'menstrual', sf: 'drop.triangle', md: 'water_drop' },
  { id: 'headache', label: 'Headache', group: 'physical', sf: 'brain.head.profile', md: 'psychology', locations: HEAD },
  { id: 'migraine', label: 'Migraine', group: 'physical', sf: 'bolt.horizontal', md: 'flash_on', locations: HEAD },
  { id: 'acne', label: 'Acne & skin', group: 'physical', sf: 'face.dashed', md: 'face', locations: ['Jawline', 'Chin', 'Cheeks', 'Forehead', 'Back', 'Chest'] },
  { id: 'bloating', label: 'Bloating', group: 'physical', sf: 'circle.circle', md: 'blur_circular', locations: ABDOMEN },
  { id: 'digestive', label: 'Digestive discomfort', group: 'physical', sf: 'waveform.path', md: 'waves', locations: ABDOMEN },
  { id: 'breast-tenderness', label: 'Breast tenderness', group: 'physical', sf: 'heart', md: 'favorite_border', locations: ['Left', 'Right', 'Both'] },
  { id: 'fatigue', label: 'Fatigue', group: 'physical', sf: 'battery.25percent', md: 'battery_2_bar' },
  { id: 'joint-pain', label: 'Muscle & joint pain', group: 'physical', sf: 'figure.walk', md: 'accessibility', locations: ['Neck', 'Shoulders', 'Back', 'Hips', 'Knees', 'Hands', 'All over'] },
  { id: 'dizziness', label: 'Dizziness', group: 'physical', sf: 'tornado', md: 'cyclone' },
  { id: 'anxiety', label: 'Anxiety', group: 'mind', sf: 'wind', md: 'air' },
  { id: 'irritability', label: 'Irritability', group: 'mind', sf: 'flame', md: 'local_fire_department' },
  { id: 'brain-fog', label: 'Brain fog', group: 'mind', sf: 'cloud.fog', md: 'foggy' },
  { id: 'overstimulation', label: 'Sensory overload', group: 'mind', sf: 'speaker.wave.3', md: 'volume_up' },
  { id: 'concentration', label: 'Hard to concentrate', group: 'mind', sf: 'scope', md: 'center_focus_weak' },
  { id: 'low-mood', label: 'Low mood', group: 'mind', sf: 'cloud.drizzle', md: 'cloud' },
];

export const GROUPS: { id: SymptomGroup; label: string }[] = [
  { id: 'menstrual', label: 'Menstrual' },
  { id: 'physical', label: 'Body' },
  { id: 'mind', label: 'Mind & nervous system' },
];

export function symptomByID(id: string): SymptomDef {
  return SYMPTOMS.find((s) => s.id === id) ?? { id, label: id, group: 'physical', sf: 'circle', md: 'circle' };
}

export const MOODS = ['Calm', 'Content', 'Energetic', 'Hopeful', 'Tender', 'Sensitive', 'Anxious', 'Irritable', 'Low', 'Overwhelmed', 'Flat'];
export const ENERGY_LABELS = ['Depleted', 'Low', 'Steady', 'Good', 'Vibrant'];
export const SLEEP_QUALITY = ['Restless', 'Light', 'Okay', 'Good', 'Deep'];
export const DURATIONS = ['Under an hour', '1–4 hours', 'Half a day', 'All day', 'Several days'];
export const FREQUENCIES = ['Just once', 'On and off', 'Constant'];
export const TRIGGERS = ['Poor sleep', 'Stress', 'Skipped meal', 'Caffeine', 'Alcohol', 'Screens', 'Bright light', 'Weather', 'Exercise', 'Dehydration', 'Certain food', 'Not sure'];
export const CRAVINGS = ['Sweet', 'Salty', 'Chocolate', 'Carbs', 'Caffeine'];
export const FLOWS = [
  { id: 'spotting', label: 'Spotting' },
  { id: 'light', label: 'Light' },
  { id: 'medium', label: 'Medium' },
  { id: 'heavy', label: 'Heavy' },
] as const;

export const AGE_RANGES = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55+'];
export const REGULARITY = ['Regular', 'Somewhat irregular', 'Very irregular', 'No periods right now', 'Not sure'];
export const CONCERNS = ['Headaches', 'Fatigue', 'Painful periods', 'Irregular cycles', 'Skin changes', 'Digestion', 'Sleep', 'Mood & anxiety', 'Brain fog', 'Pelvic pain'];
export const GOALS = ['Understand my patterns', 'Prepare for a doctor visit', 'Sleep better', 'Manage stress', 'Track my cycle', 'Learn about my body'];
