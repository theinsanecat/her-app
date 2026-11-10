# HER — Women's Health Intelligence

> You have the right to know what's going on in your body.

HER is a calm, private health journal for iPhone and Android. Log how your whole body
feels, see what your own entries actually show, and bring a clear history to every
appointment. Everything stays on the device.

## Why HER

How is it possible that in 2026 we are still discovering how much we don't understand
about women's bodies? We are still correcting the way we name, classify, research and
treat conditions that affect millions of women.

One example: in May 2026, what we have known for decades as PCOS (Polycystic Ovary
Syndrome) was renamed **PMOS: Polyendocrine Metabolic Ovarian Syndrome**. The old name
pointed people at ovarian cysts, when the condition involves endocrine, metabolic,
reproductive and psychological health. A condition affecting roughly one in eight women
of reproductive age needed a fundamental change in how we describe it.

So how many other women's health experiences are we still oversimplifying?

Recurring headaches, unexplained fatigue, acne, digestive problems, sleep disturbances,
irregular periods, changes in mood: too often each is managed on its own. Treat the
headache, address the acne, prescribe something for the periods, move on. Where is the
bigger picture? Where is the timeline, the recurring pattern, the effort to connect the
dots?

Women's health is not confined to reproductive health. Hormones, metabolism, neurological
health, sleep, stress, immune function and mental well-being can intersect in complicated
ways. According to the NIH, nearly four out of five people diagnosed with an autoimmune
disease are female, yet many mechanisms behind that difference remain incompletely
understood. Research has also found associations between stress-related disorders and
later autoimmune disease. Association is not causation, but it is a reason not to dismiss
the relationship between psychological and physical well-being.

I don't want to build another app that tells a woman when her next period is due. I want
to build something that helps her understand what her body has been trying to tell her:
a place to document seemingly disconnected symptoms, recognise recurring patterns,
explore relevant research, and walk into a doctor's appointment with a much clearer
picture of her own health history.

**Not an AI doctor. Not another period tracker. Not a tool that claims to diagnose.**
A platform that helps women become more informed participants in their own healthcare.

Because sometimes the most important thing isn't finding another way to suppress a
symptom. It's making sure we don't stop asking why it's happening.

## Features

- **Daily check-in**: energy, mood, sleep and stress in about a minute.
- **Symptom log**: head-to-toe symptoms with severity, duration and body location.
- **Cycle tracking**: periods logged alongside everything else, not instead of it.
- **Connect the Dots**: observations drawn only from your own entries, with how many
  entries each rests on and what it can't conclude. No invented correlations, no
  hormone attributions.
- **Doctor Mode**: a readable summary of symptoms, cycle and medications for your
  next appointment.
- **Knowledge**: short, plain-language reads, each labelled as general information.

## Privacy

All health entries are stored locally with MMKV. There are no accounts, no health data
leaves the device, and nothing is used for advertising. HER does not diagnose conditions
or recommend treatments.

## Tech stack

- [Expo](https://expo.dev) (React Native) with Expo Router and native tabs
- [HeroUI Native](https://heroui.com) components styled with [Uniwind](https://uniwind.dev) (Tailwind v4)
- Zustand + MMKV for local-first state
- React Native Skia for charts, Reanimated for motion
- Next.js static site in `website/`

## Getting started

```bash
bun install
bun run ios       # or: bun run android / bun run web
```

## Project structure

```
src/
├── app/              Expo Router screens
├── components/       Shared UI primitives (Section, Card, ListRow, Segmented, …)
├── features/         Domain modules: components, hooks, store, utils, types
├── lib/              Motion tokens, storage, helpers
└── constants/        Theme palette
design/               Design plan and visual tokens
website/              Marketing, privacy and support site
```

## Checks

```bash
bun run typecheck
```

## Disclaimer

HER is a personal journal, not a medical device. It does not replace professional medical
advice. In an emergency, contact your local emergency services.
