import Link from "next/link";

const pillars = [
  {
    orb: "/img/orb-checkin.jpg",
    kicker: "Whole-body logging",
    title: "Your whole body, not just your cycle.",
    body: "A one-minute check-in for energy, mood, sleep and stress. Log symptoms from head to toe, with severity, duration and where it hurts. Periods sit alongside everything else instead of standing in for it.",
    tags: ["Energy", "Mood", "Sleep", "Stress", "Symptoms", "Cycle"],
  },
  {
    orb: "/img/orb-insights.jpg",
    kicker: "Connect the dots",
    title: "Patterns from your entries, and nothing more.",
    body: "HER looks across your own logs for things that tend to show up together, and tells you how many entries each observation rests on. When there isn't enough to go on, it says so plainly. It never invents a link, and it never pins a symptom on a hormone.",
    tags: ["Based on your entries", "Says what it can't conclude"],
  },
  {
    orb: "/img/orb-doctor.jpg",
    kicker: "Doctor Mode",
    title: "Walk in with a clear history.",
    body: "Turn weeks of notes into a calm, readable summary of your symptoms, cycle and medications for your next appointment, so the ten minutes you get are spent on you, not on trying to remember.",
    tags: ["Symptom timeline", "Cycle summary", "Medications"],
  },
  {
    orb: "/img/orb-understand.jpg",
    kicker: "Knowledge",
    title: "Gentle context, clearly labelled.",
    body: "Short, plain-language reads on cycles, sleep, gut health, migraines and more, with questions you might bring to a clinician. Each piece is labelled as general information, not medical advice.",
    tags: ["Plain language", "Questions to ask"],
  },
];

const walkthrough = [
  { orb: "/img/orb-cycle.jpg", title: "Tell HER about you", body: "A gentle setup: your name, your cycle if you track one, and what you'd like to keep an eye on. Skip anything you like." },
  { orb: "/img/orb-checkin.jpg", title: "Check in each day", body: "One quiet minute for energy, mood, sleep and stress. Your five petals bloom as you answer." },
  { orb: "/img/orb-physical.jpg", title: "Log what you feel", body: "Add a symptom whenever it shows up, with how strong it was, how long it lasted and where." },
  { orb: "/img/orb-doctor.jpg", title: "See what your entries show", body: "Connect the Dots shows what your entries support. Doctor Mode turns them into a clear summary for your appointment." },
];

const floating = [
  { src: "/img/orb-menstrual.jpg", cls: "left-[6%] top-[22%] h-20 w-20 sm:h-28 sm:w-28", delay: "0s" },
  { src: "/img/orb-mind.jpg", cls: "right-[7%] top-[18%] h-16 w-16 sm:h-24 sm:w-24", delay: "1.5s" },
  { src: "/img/orb-physical.jpg", cls: "left-[12%] bottom-[14%] h-14 w-14 sm:h-20 sm:w-20", delay: "3s" },
  { src: "/img/orb-lifestyle.jpg", cls: "right-[12%] bottom-[18%] h-20 w-20 sm:h-28 sm:w-28", delay: "2.2s" },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero: the cloud sky the app opens on */}
      <section className="relative isolate flex min-h-[100svh] items-center justify-center px-6 pb-24 pt-32">
        <img src="/img/sky.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        {floating.map((o) => (
          <img key={o.src} src={o.src} alt="" aria-hidden className={`orb animate-float absolute hidden md:block ${o.cls}`} style={{ animationDelay: o.delay }} />
        ))}

        <div className="mx-auto max-w-3xl text-center">
          <img src="/img/orb-cycle.jpg" alt="" className="orb animate-rise mx-auto mb-8 h-28 w-28 sm:h-32 sm:w-32" />
          <p className="animate-rise mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground" style={{ animationDelay: "0.08s" }}>
            HER · Women&apos;s Health Intelligence
          </p>
          <h1 className="animate-rise font-display text-5xl font-medium leading-[1.04] sm:text-7xl" style={{ animationDelay: "0.16s" }}>
            You have the right to know <em className="font-normal italic text-[hsl(330_45%_52%)]">what&apos;s going on in your body.</em>
          </h1>
          <p className="animate-rise mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "0.26s" }}>
            Log how your whole body feels, see what your own entries actually show, and bring a clear history to every appointment. Everything stays on your phone.
          </p>
          <div className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "0.36s" }}>
            <Link href="#inside" className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-14px_hsl(300_30%_30%/0.7)] transition-transform hover:-translate-y-0.5">
              See what&apos;s inside
            </Link>
            <span className="glass rounded-full px-6 py-3.5 text-sm font-medium">Coming soon to iPhone &amp; Android</span>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section id="inside" className="relative mx-auto max-w-5xl scroll-mt-28 px-6 py-20">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Inside HER</p>
          <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
            A quiet place to be <em className="italic">fully heard.</em>
          </h2>
        </div>

        <div className="space-y-8">
          {pillars.map((p, i) => (
            <article key={p.kicker} className={`glass grid items-center gap-8 rounded-[2.5rem] p-8 sm:p-12 md:grid-cols-[auto_1fr] ${i % 2 ? "md:ml-16" : "md:mr-16"}`}>
              <img src={p.orb} alt="" className="orb h-28 w-28 sm:h-36 sm:w-36" />
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(330_45%_52%)]">{p.kicker}</p>
                <h3 className="font-display text-3xl font-medium leading-snug">{p.title}</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{p.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Walkthrough */}
      <section id="how" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-20">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">How it works</p>
          <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
            Four quiet steps, <em className="italic">at your pace.</em>
          </h2>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {walkthrough.map((s, i) => (
            <li key={s.title} className="glass relative rounded-[2rem] p-7">
              <span className="absolute right-6 top-5 font-display text-4xl italic text-[hsl(330_45%_52%/0.35)]">{i + 1}</span>
              <img src={s.orb} alt="" className="orb mb-6 h-16 w-16" />
              <h3 className="font-display text-xl font-medium leading-snug">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Honesty example */}
      <section className="relative isolate px-6 py-20">
        <div className="absolute inset-x-0 top-1/2 -z-10 h-[28rem] -translate-y-1/2 bg-[radial-gradient(closest-side,hsl(256_60%_85%/0.55),transparent)]" />
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-medium leading-tight">
              Honest about <em className="italic">what it doesn&apos;t know.</em>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Most apps hand you confident answers. HER shows you what your entries support, how strong that is, and where the evidence runs out, so you stay in charge of the story.
            </p>
          </div>
          <div className="glass rounded-[2rem] p-7 shadow-[0_30px_80px_-30px_hsl(300_30%_40%/0.45)]">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Connect the dots</span>
              <span className="rounded-full bg-secondary/70 px-2.5 py-1 text-[11px]">Example</span>
            </div>
            <p className="mt-4 font-display text-xl font-medium leading-snug">Headaches were logged more often on days after less than six hours of sleep.</p>
            <p className="mt-3 text-sm text-muted-foreground">An example of how an observation reads. Real ones are built only from your own entries and show how many they rest on.</p>
            <div className="hr-fade my-5" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">What this can&apos;t tell you</p>
            <p className="mt-2 text-sm leading-relaxed">Whether one causes the other, or what else was going on. Not a diagnosis.</p>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="scroll-mt-28 px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-primary px-8 py-14 text-center text-primary-foreground sm:px-16">
          <img src="/img/orb-privacy.jpg" alt="" className="orb mx-auto mb-8 h-24 w-24" />
          <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
            Your body. Your phone. <em className="italic">Your data.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-primary-foreground/80">
            Every check-in, symptom and note stays on your device. HER has no account, sends none of your health entries to any server or AI service, and never uses them for advertising.
          </p>
          <Link href="/privacy/" className="mt-8 inline-block rounded-full bg-card px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5">
            Read the privacy policy
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <img src="/img/orb-empty.jpg" alt="" className="orb h-16 w-16" />
          <p className="font-display text-2xl italic">A companion, not a clinician.</p>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            HER helps you notice and describe what you&apos;re experiencing. It doesn&apos;t diagnose conditions, recommend hormone treatments or replace medical care. In an emergency, contact your local emergency services.
          </p>
        </div>
      </section>
    </main>
  );
}
