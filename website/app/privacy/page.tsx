import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/utils";

export const metadata: Metadata = { title: "Privacy & terms" };

const sections: { h: string; p: string[] }[] = [
  {
    h: "Your health entries stay on your phone",
    p: [
      "Everything you enter in HER (check-ins, moods, sleep, stress, symptoms, periods, medications, notes and your profile) is stored only on your device, in the app's local storage. HER has no account and no server that holds your entries.",
      "HER does not send your health entries to us, to any AI service or to anyone else. They are never sold, shared or used for advertising.",
      "Doctor Mode builds its summary on your phone and shows it on screen, so you can walk a clinician through it. It isn't uploaded anywhere.",
    ],
  },
  {
    h: "Anonymous app analytics",
    p: [
      "To understand whether the app works and how many people use it, HER uses Newly's first-party analytics. It records that the app was installed and opened, along with a random install ID created on your device, your platform (iOS or Android) and its operating-system version.",
      "These analytics contain no health information and nothing you type into the app, and they are not linked to your name or contact details. They are not used for advertising or shared with advertisers.",
    ],
  },
  {
    h: "Deleting your data",
    p: [
      "You can erase everything at any time with Delete all health records in the app's Profile tab. Deleting HER from your phone removes everything it stored locally. Because we never receive your health entries, there is nothing for us to delete on our side.",
    ],
  },
  {
    h: "Children",
    p: ["HER is not directed at children under 13, and we do not knowingly collect information from them."],
  },
  {
    h: "Not medical care",
    p: [
      "HER is a personal journal for noticing and describing how you feel. It does not diagnose medical conditions, recommend hormone treatments or replace a clinician. Patterns HER shows are observations from your own entries, not proof of cause. Knowledge articles are general information, labelled as such, and not medical advice.",
      "Always seek the advice of a qualified health professional about a medical condition. In an emergency, contact your local emergency services.",
    ],
  },
  {
    h: "Terms of use",
    p: [
      "HER is provided as-is for personal, non-commercial use. You are responsible for the entries you make and for keeping your device secure. We may update the app and these terms; when we do, the date below changes.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative isolate px-6 pb-24 pt-36">
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-cover bg-center opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" style={{ backgroundImage: `url(${asset("/img/sky.jpg")})` }} />
      <article className="glass mx-auto max-w-3xl rounded-[2.5rem] p-8 sm:p-14">
        <img src={asset("/img/orb-privacy.jpg")} alt="" className="orb mb-8 h-20 w-20" />
        <h1 className="font-display text-4xl font-medium sm:text-5xl">Privacy &amp; terms</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated 6 November 2026</p>
        <p className="mt-8 text-lg leading-relaxed">
          The short version: your health entries live on your phone and nowhere else.
        </p>
        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-2xl font-medium">{s.h}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                {s.p.map((t) => (
                  <p key={t.slice(0, 24)}>{t}</p>
                ))}
              </div>
            </section>
          ))}
          <section>
            <h2 className="font-display text-2xl font-medium">Questions</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Reach us through the <Link href="/support/" className="font-medium text-foreground underline underline-offset-4">support page</Link>.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
