import type { Metadata } from "next";
import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { asset } from "@/lib/utils";

export const metadata: Metadata = { title: "Support" };

// The owner's real support address. Left empty until they provide it, so the page never shows a placeholder.
const SUPPORT_EMAIL = "";

const faqs = [
  { q: "Where is my data stored?", a: "Only on your phone. HER has no account and no server holding your entries, so nothing you log leaves your device." },
  { q: "Can I move my data to a new phone?", a: "Not yet. Because entries live only on the device, deleting the app or switching phones starts HER fresh." },
  { q: "Why does Connect the Dots say it needs more check-ins?", a: "HER only shows a pattern when your own entries support one. Keep checking in and it will start looking once there's enough to go on." },
  { q: "Can HER tell me what's wrong?", a: "No. HER helps you notice and describe what you feel. It doesn't diagnose conditions or recommend treatment. Show your Doctor Mode summary to a clinician for that conversation." },
  { q: "How do I start over?", a: "Open Profile and tap Delete all health records, or delete and reinstall HER." },
];

export default function SupportPage() {
  return (
    <main className="relative isolate px-6 pb-24 pt-36">
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-cover bg-center opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" style={{ backgroundImage: `url(${asset("/img/sky.jpg")})` }} />
      <div className="mx-auto max-w-3xl space-y-8">
        <section className="glass rounded-[2.5rem] p-8 text-center sm:p-14">
          <img src={asset("/img/orb-checkin.jpg")} alt="" className="orb mx-auto mb-8 h-20 w-20" />
          <h1 className="font-display text-4xl font-medium sm:text-5xl">How can we help?</h1>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
            Questions, bugs or ideas for HER: we read every message.
          </p>
          {SUPPORT_EMAIL ? (
            <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-8 inline-block rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
              {SUPPORT_EMAIL}
            </a>
          ) : (
            <p className="mt-8 inline-block rounded-full border border-border bg-card px-6 py-3 text-sm text-muted-foreground">Contact email coming soon</p>
          )}
          <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-muted-foreground">
            Please don&apos;t email health details you&apos;d rather keep private. We can&apos;t give medical advice. For urgent concerns, contact a clinician or your local emergency services.
          </p>
        </section>

        <section className="glass rounded-[2.5rem] p-8 sm:p-12">
          <h2 className="mb-4 font-display text-3xl font-medium">Common questions</h2>
          <Accordion type="single" collapsible>
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-6 text-sm text-muted-foreground">
            More on how HER handles your information in the <Link href="/privacy/" className="font-medium text-foreground underline underline-offset-4">privacy policy</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
