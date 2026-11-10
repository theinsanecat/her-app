import Link from "next/link";
import { asset } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <img src={asset("/app-icon.png")} alt="" className="h-8 w-8 rounded-full" />
            <span className="font-display text-lg font-semibold">HER</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            HER is a personal health journal, not medical care. It doesn&apos;t diagnose conditions or recommend treatment. If something feels wrong, talk to a clinician.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/privacy/" className="text-muted-foreground hover:text-foreground">Privacy &amp; terms</Link>
          <Link href="/support/" className="text-muted-foreground hover:text-foreground">Support</Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 pb-8 text-xs text-muted-foreground/80">
        <span>© {new Date().getFullYear()} HER</span>
      </div>
    </footer>
  );
}
