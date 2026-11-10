import type { SymptomGuide } from '@/features/health/types/knowledge';

export const GUIDES: SymptomGuide[] = [
  {
    symptomID: 'headache',
    intro: 'Headaches are very common and have many possible causes. Most are not serious, but patterns are worth understanding.',
    factors: [
      { label: 'Sleep loss or irregular sleep', evidence: 'Established', detail: 'A recognised trigger for tension-type headache and migraine in many people.' },
      { label: 'Menstrual timing', evidence: 'Established', detail: 'Menstrual migraine is a defined subtype; attacks cluster around period start.' },
      { label: 'Stress and muscle tension', evidence: 'Established', detail: 'Commonly linked with tension-type headaches.' },
      { label: 'Dehydration and skipped meals', evidence: 'Commonly reported', detail: 'Often reported triggers; individual effects vary.' },
      { label: 'Frequent painkiller use', evidence: 'Established', detail: 'Using painkillers on many days a month can cause medication-overuse headache.' },
    ],
    seekCare: ['A sudden, severe "worst ever" headache.', 'Headache with fever, stiff neck, weakness, numbness, confusion or new vision changes.'],
    articleIDs: ['menstrual-migraine', 'stress-sleep'],
  },
  {
    symptomID: 'fatigue',
    intro: 'Fatigue is one of the most common symptoms women report, and one of the easiest to dismiss. It usually has more than one contributor.',
    factors: [
      { label: 'Sleep quantity and quality', evidence: 'Established', detail: 'Short or disturbed sleep is a leading cause of daytime tiredness.' },
      { label: 'Iron deficiency', evidence: 'Established', detail: 'Heavy periods can lead to low iron, which causes tiredness; it is checked with a blood test.' },
      { label: 'Thyroid conditions', evidence: 'Established', detail: 'An underactive thyroid commonly causes fatigue.' },
      { label: 'Stress, low mood and anxiety', evidence: 'Established', detail: 'Mental load affects energy and sleep.' },
      { label: 'Cycle phase', evidence: 'Commonly reported', detail: 'Many people notice lower energy around their period; this varies widely.' },
    ],
    seekCare: ['Tiredness lasting weeks without a clear reason.', 'Fatigue with heavy periods, breathlessness, weight change or low mood.'],
    articleIDs: ['thyroid-basics', 'what-is-normal-period', 'stress-sleep'],
  },
  {
    symptomID: 'bloating',
    intro: 'Bloating is common and usually harmless, but persistent bloating is something clinicians want to know about.',
    factors: [
      { label: 'Premenstrual changes', evidence: 'Commonly reported', detail: 'Many people report bloating in the days before a period.' },
      { label: 'Diet and constipation', evidence: 'Established', detail: 'Certain foods and slower bowel movements cause bloating.' },
      { label: 'IBS', evidence: 'Established', detail: 'Bloating is a core symptom of irritable bowel syndrome.' },
      { label: 'Endometriosis', evidence: 'Established', detail: 'Can cause bloating and bowel symptoms, often worse around periods.' },
    ],
    seekCare: ['Bloating most days for three weeks or more.', 'Bloating with weight loss, appetite loss or a change in bowel habit.'],
    articleIDs: ['gut-cycle', 'endometriosis-explained'],
  },
  {
    symptomID: 'digestive',
    intro: 'Digestive discomfort covers pain, cramping, nausea and bowel changes. Timing and triggers help narrow it down.',
    factors: [
      { label: 'Stress', evidence: 'Established', detail: 'The gut and nervous system are closely linked; stress commonly affects digestion.' },
      { label: 'Menstrual prostaglandins', evidence: 'Emerging', detail: 'Thought to affect bowel movement around periods.' },
      { label: 'Food intolerance', evidence: 'Commonly reported', detail: 'Specific foods can trigger symptoms; testing should be guided by a clinician.' },
      { label: 'IBS or other gut conditions', evidence: 'Established', detail: 'Diagnosed after ruling out other causes.' },
    ],
    seekCare: ['Blood in stool, unexplained weight loss or vomiting.', 'Severe or worsening abdominal pain.'],
    articleIDs: ['gut-cycle'],
  },
  {
    symptomID: 'acne',
    intro: 'Skin changes can follow the cycle, stress, products or medication. Persistent adult acne is worth discussing.',
    factors: [
      { label: 'Cycle-linked flares', evidence: 'Commonly reported', detail: 'Flares along the jaw and chin before periods are frequently reported.' },
      { label: 'Androgens and PCOS', evidence: 'Established', detail: 'Acne can be a sign of higher androgens, one feature of PCOS.' },
      { label: 'Products and friction', evidence: 'Established', detail: 'Some skincare, makeup or masks can block pores.' },
      { label: 'Stress', evidence: 'Emerging', detail: 'Associated with flares in some studies.' },
    ],
    seekCare: ['Acne with irregular periods or new hair growth.', 'Painful, scarring or rapidly worsening acne.'],
    articleIDs: ['pcos-explained'],
  },
  {
    symptomID: 'brain-fog',
    intro: '"Brain fog" isn\'t a diagnosis, but difficulty thinking clearly is a real experience with several possible contributors.',
    factors: [
      { label: 'Sleep loss', evidence: 'Established', detail: 'Reduces attention, memory and processing speed.' },
      { label: 'Stress and anxiety', evidence: 'Established', detail: 'Compete for attention and working memory.' },
      { label: 'Perimenopause', evidence: 'Emerging', detail: 'Memory and concentration changes are commonly reported during the transition.' },
      { label: 'Iron or thyroid issues', evidence: 'Established', detail: 'Both can affect energy and concentration.' },
    ],
    seekCare: ['Memory or thinking changes that are getting worse.', 'Confusion that comes on suddenly.'],
    articleIDs: ['stress-sleep', 'thyroid-basics', 'reproductive-checkups'],
  },
  {
    symptomID: 'cramps',
    intro: 'Period cramps are common. Pain that stops your life is not something you should have to just push through.',
    factors: [
      { label: 'Prostaglandins', evidence: 'Established', detail: 'Cause the uterus to contract; the main cause of common period pain.' },
      { label: 'Endometriosis or adenomyosis', evidence: 'Established', detail: 'Can cause severe or worsening period pain.' },
      { label: 'Fibroids', evidence: 'Established', detail: 'Can cause pain and heavier bleeding.' },
    ],
    seekCare: ['Pain that painkillers don\'t help or that stops daily activities.', 'Pain that is getting worse over time or happens outside periods.'],
    articleIDs: ['what-is-normal-period', 'endometriosis-explained'],
  },
  {
    symptomID: 'anxiety',
    intro: 'Anxiety can feel physical as well as mental: racing heart, tight chest, stomach upset. It is common and treatable.',
    factors: [
      { label: 'Life stress', evidence: 'Established', detail: 'The most common contributor.' },
      { label: 'Premenstrual changes', evidence: 'Established', detail: 'Anxiety can be part of PMS or PMDD for some people.' },
      { label: 'Overactive thyroid', evidence: 'Established', detail: 'Can cause anxiety, palpitations and tremor.' },
      { label: 'Caffeine and poor sleep', evidence: 'Commonly reported', detail: 'Can worsen anxious feelings.' },
    ],
    seekCare: ['Anxiety that affects work, relationships or sleep most days.', 'Any thoughts of harming yourself — contact emergency services or a crisis line.'],
    articleIDs: ['hormones-across-cycle', 'stress-sleep', 'thyroid-basics'],
  },
  {
    symptomID: 'dizziness',
    intro: 'Dizziness ranges from light-headedness to spinning. Many causes are minor, some need checking.',
    factors: [
      { label: 'Dehydration or low blood sugar', evidence: 'Established', detail: 'Common causes of light-headedness.' },
      { label: 'Low iron', evidence: 'Established', detail: 'Heavy periods can lead to anaemia, which can cause dizziness.' },
      { label: 'Low blood pressure on standing', evidence: 'Established', detail: 'Light-headedness when getting up quickly.' },
      { label: 'Inner ear conditions and migraine', evidence: 'Established', detail: 'Can cause spinning (vertigo).' },
    ],
    seekCare: ['Fainting, chest pain, or a racing or irregular heartbeat.', 'Dizziness with weakness, slurred speech or vision loss — call emergency services.'],
    articleIDs: ['what-is-normal-period', 'menstrual-migraine'],
  },
];
