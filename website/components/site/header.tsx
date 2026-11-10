import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-5xl items-center justify-between rounded-full py-2 pl-2 pr-5 shadow-[0_10px_40px_-20px_hsl(300_30%_40%/0.5)]">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/app-icon.png" alt="" className="h-9 w-9 rounded-full" />
          <span className="font-display text-xl font-semibold tracking-tight">HER</span>
        </Link>
        <div className="flex items-center gap-5 text-sm font-medium text-muted-foreground sm:gap-7">
          <Link href="/#inside" className="hidden transition-colors hover:text-foreground sm:inline">Inside HER</Link>
          <Link href="/#how" className="hidden transition-colors hover:text-foreground sm:inline">How it works</Link>
          <Link href="/#privacy" className="hidden transition-colors hover:text-foreground sm:inline">Privacy</Link>
          <Link href="/support/" className="transition-colors hover:text-foreground">Support</Link>
        </div>
      </nav>
    </header>
  );
}
