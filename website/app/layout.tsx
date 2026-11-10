import type { Metadata } from "next";

import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { pairFor } from "@/lib/fonts";

import "./globals.css";

const description = "You have the right to know what's going on in your body. Log your whole body, see what your own entries show, and walk into appointments with a clear history. Private by design.";

export const metadata: Metadata = {
  title: { default: "HER — Women's Health Intelligence", template: "%s · HER" },
  description,
  openGraph: {
    title: "HER — Women's Health Intelligence",
    description,
    siteName: "HER",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pairFor("expressive")}>
      <body className="font-body min-h-screen">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
