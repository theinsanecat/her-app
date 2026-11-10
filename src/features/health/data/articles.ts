import type { ImageSourcePropType } from 'react-native';

import type { Article } from '@/features/health/types/knowledge';

export const CATEGORY_IMAGES: Record<string, ImageSourcePropType> = {
  menstrual: require('@/assets/images/k-menstrual.jpg'),
  hormones: require('@/assets/images/k-hormones.jpg'),
  migraine: require('@/assets/images/k-migraine.jpg'),
  'pcos-endo': require('@/assets/images/k-pcos-endo.jpg'),
  thyroid: require('@/assets/images/k-thyroid.jpg'),
  sleep: require('@/assets/images/k-sleep.jpg'),
  metabolic: require('@/assets/images/k-metabolic.jpg'),
  gut: require('@/assets/images/k-gut.jpg'),
  reproductive: require('@/assets/images/k-reproductive.jpg'),
};

export const CATEGORIES = [
  { id: 'menstrual', label: 'Menstrual health' },
  { id: 'hormones', label: 'Hormonal fluctuations' },
  { id: 'migraine', label: 'Migraine & neurological health' },
  { id: 'pcos-endo', label: 'PCOS & endometriosis' },
  { id: 'thyroid', label: 'Thyroid health' },
  { id: 'sleep', label: 'Stress & sleep' },
  { id: 'metabolic', label: 'Metabolic health' },
  { id: 'gut', label: 'Gut health' },
  { id: 'reproductive', label: 'Reproductive health' },
];

export const ARTICLES: Article[] = [
  {
    id: 'what-is-normal-period',
    category: 'menstrual',
    title: 'What a "normal" period actually covers',
    dek: 'Cycle length, flow and pain vary more than most of us were told — and some things are worth checking.',
    minutes: 4,
    simple:
      'A menstrual cycle is counted from the first day of one period to the day before the next. Cycles commonly vary from person to person and month to month. What matters most is what is usual for you, and noticing when that changes.',
    research:
      'Clinical guidance describes a typical adult cycle as roughly 21 to 35 days, with bleeding lasting up to about a week. Period pain is common, but pain severe enough to stop daily life, or heavy bleeding that affects quality of life, is recognised as something to assess rather than accept.',
    established: [
      'Cycle length varies between people and can vary month to month in the same person.',
      'Heavy menstrual bleeding is defined by its impact on your physical, social or emotional life, not only by volume.',
      'Severe period pain can have underlying causes, such as endometriosis or adenomyosis, that are worth investigating.',
    ],
    emerging: ['How wearable and app data can help describe cycle variability at a population level is an active research area.'],
    seekCare: [
      'Bleeding that soaks through a pad or tampon every hour or two, or passing large clots.',
      'Pain that painkillers do not help, or that stops you working or sleeping.',
      'Bleeding between periods, after sex or after menopause.',
      'Periods that stop for three months or more when you are not pregnant.',
    ],
    sources: ['NHS — Periods and heavy periods (nhs.uk)', 'ACOG — Heavy Menstrual Bleeding FAQ', 'NICE guideline NG88 — Heavy menstrual bleeding: assessment and management'],
  },
  {
    id: 'hormones-across-cycle',
    category: 'hormones',
    title: 'Hormones across the cycle, without the myths',
    dek: 'Estrogen and progesterone rise and fall each month. That explains some experiences, and is overused to explain others.',
    minutes: 5,
    simple:
      'Across a cycle, estrogen and progesterone change in a broad pattern. Many people notice shifts in energy, mood, appetite or skin that seem to follow it. But not every symptom that appears at a certain time is hormonal, and the same timing can have other explanations.',
    research:
      'Premenstrual symptoms and premenstrual dysphoric disorder (PMDD) are recognised conditions. Current thinking is that they relate to sensitivity to normal hormone changes, rather than abnormal hormone levels. Single blood tests usually cannot confirm or rule out a "hormone imbalance" for these symptoms.',
    established: [
      'Premenstrual syndrome and PMDD are recognised diagnoses, assessed using symptom diaries across at least two cycles.',
      'Hormone levels change through the cycle, so one test result reflects one moment.',
    ],
    emerging: [
      'Why some people are more sensitive to normal hormone changes than others is still being studied.',
      'Cycle-based training and nutrition advice is popular, but evidence is limited and mixed.',
    ],
    seekCare: ['Mood changes that are severe, affect relationships or work, or include thoughts of self-harm.', 'Symptoms that are getting steadily worse over several cycles.'],
    sources: ['NHS — PMS (premenstrual syndrome)', 'ACOG — Premenstrual Syndrome (PMS) FAQ', 'International Association for Premenstrual Disorders (IAPMD)'],
  },
  {
    id: 'menstrual-migraine',
    category: 'migraine',
    title: 'Migraine, headaches and the menstrual cycle',
    dek: 'For some people migraine follows the cycle. For others, sleep, stress or meals matter more. Often it is several.',
    minutes: 5,
    simple:
      'Migraine is a neurological condition, not "just a bad headache". Some people find attacks cluster around their period. Others notice links with poor sleep, skipped meals, stress or bright light. A diary is one of the most useful tools for understanding your own pattern.',
    research:
      'The International Classification of Headache Disorders describes menstrual migraine, where attacks occur around the start of menstruation in at least two of three cycles. The drop in estrogen before a period is thought to be one trigger for some people. Sleep disruption, stress and missed meals are also commonly reported triggers.',
    established: [
      'Menstrual migraine is a defined subtype, identified by keeping a headache diary for at least three cycles.',
      'Migraine is more common in women than in men after puberty.',
      'Overusing painkillers on many days a month can itself cause more frequent headaches.',
    ],
    emerging: ['How strongly individual triggers matter differs widely between people, and research on trigger avoidance is still developing.'],
    seekCare: [
      'A sudden, severe headache that peaks within a minute or so.',
      'Headache with fever, stiff neck, confusion, weakness, numbness or changes in speech or vision that are new to you.',
      'Migraine with aura if you use, or are considering, combined hormonal contraception.',
      'Headaches that are changing in pattern or happening on many days a month.',
    ],
    sources: ['International Headache Society — ICHD-3 (Appendix A1.1, menstrual migraine)', 'NHS — Migraine', 'The Migraine Trust — Hormones and migraine'],
  },
  {
    id: 'pcos-explained',
    category: 'pcos-endo',
    title: 'PCOS: more than ovaries',
    dek: 'Polycystic ovary syndrome affects cycles, skin, metabolism and mood. Diagnosis uses defined criteria.',
    minutes: 5,
    simple:
      'PCOS is a common hormonal condition. It can show up as irregular or absent periods, acne or extra hair growth, and changes in how the body handles insulin. Despite the name, you do not need "cysts" to have PCOS, and having polycystic-looking ovaries alone is not PCOS.',
    research:
      'The 2023 international evidence-based guideline uses criteria that combine irregular cycles, signs of higher androgens, and ovary findings on ultrasound or blood tests, after ruling out other causes. It also highlights links with metabolic health, emotional wellbeing and long-term health checks.',
    established: [
      'Diagnosis requires at least two of: irregular ovulation, clinical or biochemical signs of higher androgens, and polycystic ovary appearance or raised AMH in adults.',
      'Other conditions, such as thyroid problems, are ruled out first.',
      'PCOS is associated with higher risk of type 2 diabetes, so regular checks are recommended.',
    ],
    emerging: ['The causes of PCOS, including genetic and developmental factors, are still being researched.'],
    seekCare: ['Periods that are very infrequent or absent.', 'New or worsening acne, hair growth or hair thinning.', 'Difficulty getting pregnant.'],
    sources: ['International Evidence-based Guideline for the Assessment and Management of PCOS (2023, Monash University)', 'NHS — Polycystic ovary syndrome', 'WHO — Polycystic ovary syndrome fact sheet'],
  },
  {
    id: 'endometriosis-explained',
    category: 'pcos-endo',
    title: 'Endometriosis: pain that deserves to be taken seriously',
    dek: 'Tissue similar to the womb lining grows elsewhere. Diagnosis often takes years. Your symptom record can help.',
    minutes: 5,
    simple:
      'Endometriosis is a long-term condition where tissue similar to the lining of the womb grows outside it. It can cause painful periods, pelvic pain, pain during sex, bowel or bladder symptoms, fatigue and fertility problems. Symptoms vary and do not always match how much endometriosis is present.',
    research:
      'Health bodies recognise that diagnosis is often delayed for years. Guidance encourages clinicians to consider endometriosis when someone describes these symptoms, and notes that a normal scan does not rule it out.',
    established: [
      'WHO estimates endometriosis affects roughly 10% of reproductive-age women and girls worldwide.',
      'A normal ultrasound does not exclude endometriosis.',
      'Keeping a pain and symptom diary is recommended to support assessment.',
    ],
    emerging: ['Non-invasive tests and new treatments are being actively researched.'],
    seekCare: ['Period pain that stops you from daily activities.', 'Pain during or after sex.', 'Bowel or bladder pain that is worse around your period.', 'Difficulty getting pregnant.'],
    sources: ['WHO — Endometriosis fact sheet (2023)', 'NICE guideline NG73 — Endometriosis: diagnosis and management', 'Endometriosis UK'],
  },
  {
    id: 'thyroid-basics',
    category: 'thyroid',
    title: 'Your thyroid and how you feel',
    dek: 'Fatigue, cycle changes, feeling cold or anxious: thyroid conditions can overlap with many everyday symptoms.',
    minutes: 4,
    simple:
      'The thyroid makes hormones that help regulate your metabolism. An underactive thyroid can cause tiredness, weight gain, feeling cold and heavier or irregular periods. An overactive thyroid can cause anxiety, a racing heart, weight loss and lighter periods. These symptoms overlap with many other things, which is why a blood test is used.',
    research: 'Thyroid conditions are more common in women than men. They are diagnosed with blood tests, usually starting with TSH.',
    established: ['Thyroid disorders are diagnosed with blood tests, not symptoms alone.', 'Thyroid conditions can affect menstrual cycles and fertility.'],
    emerging: ['How best to manage borderline (subclinical) results is still debated.'],
    seekCare: ['Ongoing tiredness with weight change, feeling cold or a swelling in your neck.', 'A racing or irregular heartbeat, tremor or unexplained weight loss.'],
    sources: ['American Thyroid Association — Thyroid and women', 'NHS — Underactive thyroid; Overactive thyroid'],
  },
  {
    id: 'stress-sleep',
    category: 'sleep',
    title: 'Stress, sleep and the symptoms in between',
    dek: 'Short nights and stressful weeks affect pain, digestion, mood and focus. They are also easy to overlook.',
    minutes: 4,
    simple:
      'Sleep and stress influence nearly every system in the body. A run of short nights can lower pain tolerance, make concentrating harder and affect appetite. Stress can disturb sleep, and poor sleep can make stress feel bigger, so the two often travel together.',
    research:
      'Adults are generally advised to aim for 7 or more hours of sleep. Insomnia is common and treatable; cognitive behavioural therapy for insomnia (CBT-I) is recommended as a first-line treatment in clinical guidance. Some people report sleep changes around their period.',
    established: ['Most adults need 7 or more hours of sleep regularly.', 'CBT-I is a recommended first treatment for long-term insomnia.'],
    emerging: ['How hormone changes across the cycle affect sleep quality is being studied, with mixed findings.'],
    seekCare: ['Trouble sleeping for three months or more that affects daytime life.', 'Loud snoring, gasping or stopping breathing at night.', 'Stress or low mood that feels unmanageable.'],
    sources: ['CDC — Sleep and sleep disorders', 'NHS — Insomnia', 'American Academy of Sleep Medicine — Clinical practice guideline on insomnia'],
  },
  {
    id: 'metabolic-health',
    category: 'metabolic',
    title: 'Metabolic health, beyond the scale',
    dek: 'Blood sugar, cholesterol and blood pressure matter at every age, and life stages can shift them.',
    minutes: 4,
    simple:
      'Metabolic health describes how well your body processes energy, reflected in things like blood sugar, blood pressure and cholesterol. These can change with life stages such as pregnancy and the menopause transition, and with conditions like PCOS.',
    research:
      'Gestational diabetes and PCOS are both associated with a higher later risk of type 2 diabetes. Cardiovascular risk tends to rise after menopause. Routine checks are how these changes are noticed.',
    established: ['A history of gestational diabetes increases future type 2 diabetes risk, so follow-up testing is recommended.', 'PCOS is associated with insulin resistance.'],
    emerging: ['Continuous glucose monitors for people without diabetes are popular, but evidence for their everyday benefit is still limited.'],
    seekCare: ['Excessive thirst, frequent urination or unexplained tiredness.', 'If you had gestational diabetes and haven\'t had follow-up tests.'],
    sources: ['American Diabetes Association — Standards of Care', 'NHS — Type 2 diabetes; Gestational diabetes'],
  },
  {
    id: 'gut-cycle',
    category: 'gut',
    title: 'Gut symptoms and your cycle',
    dek: 'Bloating and bowel changes around periods are commonly reported. Persistent symptoms deserve a proper look.',
    minutes: 4,
    simple:
      'Many people notice bloating, constipation or looser stools before or during their period. Irritable bowel syndrome (IBS) is common and can feel worse at certain cycle times. Bowel symptoms that are linked to periods can also be a sign of endometriosis.',
    research:
      'Studies have reported that gut symptoms, including in people with IBS, can change across the menstrual cycle. Prostaglandins released around menstruation are thought to affect bowel movement as well as the uterus.',
    established: ['IBS is common and is diagnosed based on symptoms after ruling out other conditions.', 'Bloating can have many causes, including diet, constipation and stress.'],
    emerging: ['The role of the gut microbiome in hormone metabolism (sometimes called the "estrobolome") is an early research area.'],
    seekCare: ['Persistent bloating most days for three weeks or more.', 'Blood in your stool, unexplained weight loss, or a change in bowel habit that lasts.', 'Bowel pain that is worse around your period.'],
    sources: ['NHS — Bloating; Irritable bowel syndrome', 'NICE guideline CG61 — Irritable bowel syndrome in adults'],
  },
  {
    id: 'reproductive-checkups',
    category: 'reproductive',
    title: 'Reproductive health checkups worth knowing',
    dek: 'Screening, contraception reviews and what to mention, at any life stage.',
    minutes: 3,
    simple:
      'Reproductive health includes cervical screening, contraception, sexual health, fertility and the menopause transition. Many concerns, like pain during sex or changes in bleeding, are common and treatable, but often go unmentioned.',
    research: 'Cervical screening programmes are recommended at regular intervals for most people with a cervix, with schedules that vary by country and age.',
    established: ['Regular cervical screening reduces cervical cancer risk.', 'Perimenopause symptoms can begin years before periods stop.'],
    emerging: ['Self-sampling for cervical screening is being introduced in some countries.'],
    seekCare: ['Bleeding after sex or between periods.', 'Pelvic pain, unusual discharge or pain during sex.', 'Hot flushes, sleep changes or cycle changes in your 40s that affect daily life.'],
    sources: ['WHO — Cervical cancer fact sheet', 'NHS — Cervical screening; Menopause', 'ACOG — Perimenopausal bleeding FAQ'],
  },
];

export function articleByID(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}
