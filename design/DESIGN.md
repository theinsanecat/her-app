# HER — Women's Health Intelligence

> You have the right to know what's going on in your body.

## Ground

- **Subject:** the whole body, interconnected: symptoms, sleep, stress, mood, energy, and cycles as context (never the centre).
- **Who:** women 20–45 who've been told "it's probably hormones" or "it's just stress" and want their experience on paper. Often tracking because something has been off for months.
- **Core action:** logging how today feels (a quick check-in, a symptom with severity) in under ten seconds.
- **Moment of use:** evening on the sofa, or the moment a headache starts; one hand, a calm mind wanted. Later, in a waiting room, opening the doctor report.

## Directions considered

1. **Blush atelier**: baby-pink page, translucent ivory cards, deep plum serif headings, pink→lilac gradient on hero cards, data in rose and lavender. Soft, premium, unmistakably HER.
2. **Clinical lavender**: white page, lavender accents, mono numerals, lab-report density. Lost: reads as a generic health dashboard, which the brief rules out.
3. **Night plum**: deep plum page with glowing pink data. Lost: dramatic but the user's non-negotiable is a predominantly blush and lavender identity.

**Chosen: Blush atelier.** It is the user's own palette, and the serif + translucent glass make it feel like a wellness brand, not a template.

## Palette (tokens in src/global.css; JS mirrors in src/constants/theme.ts)

| Name | Hex | Token |
| --- | --- | --- |
| Baby pink | #FCEAF1 | `--background` (every page) |
| Pastel pink | #F9DCE8 | `--color-petal`, `--surface-secondary` |
| Blush | #F4B8CE | `--color-blush` (pills, period, gradient start) |
| Dusty rose | #D98EAD | `--color-rose` (symptom data, severity) |
| Lavender | #C8B9EA | `--color-lavender` (sleep/insight data, gradient end) |
| Soft lilac | #E8DFF8 | `--color-lilac` (insight cards, secondary sections) |
| Deep plum | #684568 | `--foreground`, `--accent` (type, primary pills, tab tint) |
| Muted plum | #7E5A7A | `--muted` (secondary text, 5:1 on baby pink) |
| Warm ivory | #FFF9FC | `--surface` at ~80% (translucent cards) |

Never pale pink text on pink: all text is plum or muted plum. Forced light appearance: the identity *is* blush.

## Type

- **Headings:** Fraunces (soft serif, loaded with useFonts) — `font-heading` 600 for titles, `font-heading-italic` for the voice lines ("Your body, connected.").
- **Body & controls:** SF Pro. Numerals large in Fraunces beside what they measure.

## Imagery

One shoot: minimal fine-art still life, blush/lilac silk and frosted glass, diffused morning light. Used on onboarding and as Knowledge category covers only. No illustrations, no emoji.

## Shell

```
┌──────────────────────────────┐
│ (screen scrolls under bar)   │
│                              │
│ ░░ Liquid glass tab bar ░░░░ │
│ Today · My Body · Insights · │
│ Knowledge · Profile          │
└──────────────────────────────┘
Stack over tabs: onboarding (full screen), check-in + log symptom (form sheets),
Doctor Mode, article, Understand My Symptoms (pushed, own back chevron).
```

## Screens

**Today** (first screen drawn two ways)

A — stat grid first (rejected: default look #4).
B — kept:
```
Friday, 6 November              (o) avatar
Good evening, Maya   (serif)
[ sample data · fictional ]
┌ gradient blush→lilac ───────┐
│  ✿ five-petal bloom          │  energy · mood · sleep · stress · body
│  "Today, in full"            │
│  ( Check in )  pill          │
└──────────────────────────────┘
Cycle day 13 ◔  usually 29 days   (small, contextual)
Energy 4/5 · Mood calm · Sleep 7.2h · Stress 3   each with 7-day sparkline
┌ lilac: Connect the dots ─────┐  top observation, entries count
Recent symptoms (severity dots)   + quick-log chips
Doctor Mode card
```

**My Body**: week date strip (like the reference) → Period card (flow pills) → Feelings (energy, mood bubble cloud) → Sleep, stress, lifestyle steppers → Symptoms by group as pill chips; tap = sheet with 1–10 severity dots, duration, location, frequency, triggers, notes.

**Insights**: range segmented (30/60/90) → Connect the Dots observations (each opens: observed, support, could mean, cannot conclude, ask your clinician) → symptom heatmap timeline with period band (tap a day) → symptoms by cycle day → sleep & energy chart (scrub) → stress vs symptoms weekly → recurring pairs → cycle history.

**Knowledge**: Understand My Symptoms hero → category covers (photos) → article: simple explanation, what research suggests, Established / Emerging tags, sources, when to seek care.

**Doctor Mode**: a report sheet in ivory with plum serif heading — menstrual history, symptom table (frequency, avg/max severity), timeline sparkline, sleep/stress, meds, questions (editable). Share as text or image.

**Profile**: identity, preferences, meds & supplements, sample profile toggle, export, delete everything, privacy, disclaimer.

## Signature moment — "The bloom"

Saving a check-in returns to Today where the five petals fill one after another (timing.draw, 60 ms stagger, ease-out), then the centre settles and a success haptic fires. The bloom *is* the day's state, so it stays meaningful. Celebration: a 7-day check-in streak lights a halo around the bloom once, with "Seven days, fully heard."

Motion dial: `standard` (timing only; calm product).

## Check

First drafts had a stat grid on top and a period calendar on My Body; replaced with the bloom hero and a week strip so cycles stay context, not the centre.

**Unmistakable:** a blush-and-lilac health journal whose day is a flower of five petals, and whose insights always say what they *can't* conclude.

## Reference vibe (user's image)

The user's reference screen is the vibe target: frosted ivory glass, dreamy pink→lilac orbs, a floating mood bubble cloud. Applied: orb tiles row on Today (assets/images/orb-*.jpg) and the MoodCloud (src/components/mood-cloud.tsx) in check-in and My Body.
Extended (user loved the orb image): a cloud sky (assets/images/sky.jpg, SkyBackdrop) fades in behind the top of every tab, Doctor Mode and Understand; round glowing orbs (Orb component, assets/images/orb-*.jpg) mark section headers in My Body, empty states in Insights, Understand my symptoms, Privacy and each onboarding step; a blush haze (StatusHaze) sits under the status bar. Keep new imagery in this one style: frosted glass orb, one glowing object inside, pink→lavender haze.
