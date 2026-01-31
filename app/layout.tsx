import { getPageContent } from "@/lib/content";
import type { Metadata } from "next";
import "./globals.css";

import { GlobalBubbles } from "@/components/global-bubbles";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * Default metadata (title will be overridden dynamically below)
 */
export const metadata: Metadata = {
  title: "Success Tutoring Parramatta",
  description: "Tutoring centre landing page for Parramatta.",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ Load site content from Google Sheets
  const pc = await getPageContent();

  return (
    <html lang="en">
      <body className="relative min-h-screen bg-white text-neutral-900 antialiased overflow-x-hidden flex flex-col">
        {/* ✅ Continuous animated bubbles behind the entire page */}
        <GlobalBubbles />

        {/* ✅ Foreground layout */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* ✅ Header now correctly receives siteName */}
          <SiteHeader siteName={pc.site_name ?? "Success Tutoring Parramatta"} />

          {/* Page content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
