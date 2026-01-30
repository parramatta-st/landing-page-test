import type { Metadata } from "next";
import "./globals.css";

import { GlobalBubbles } from "@/components/global-bubbles";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Success Tutoring Parramatta",
  description: "Tutoring centre landing page for Parramatta.",
  // Using the same asset for both the header logo and favicon is fine.
  // Replace /public/logo.svg with your real logo and the favicon will update too.
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-mint2 text-neutral-900 antialiased overflow-x-hidden flex flex-col">
        <GlobalBubbles />

        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />

          <main className="flex-1">{children}</main>

          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
