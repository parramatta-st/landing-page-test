import { getPageContent, getSocialLinks } from "@/lib/content";
import Link from "next/link";

export async function SiteFooter() {
  const pc = await getPageContent();
  const socials = await getSocialLinks().catch(() => []);
  return (
    <footer className="relative border-t border-neutral-200 bg-cream/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-2">
          <div className="font-semibold">{pc.centre_name ?? pc.site_name ?? "Success Tutoring Parramatta"}</div>
          <div className="text-sm text-neutral-600">{pc.centre_address_line ?? ""}</div>
          <div className="text-sm text-neutral-600">{pc.centre_phone ?? ""}</div>
          <div className="text-sm text-neutral-600">{pc.centre_email ?? ""}</div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="font-semibold">Quick links</div>
          <div className="flex flex-col gap-1 text-neutral-600">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/tutors" className="hover:underline">Tutors</Link>
            <Link href="/book" className="hover:underline">Book Diagnostic</Link>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="font-semibold">Social</div>
          <div className="flex flex-wrap gap-2">
            {socials.length ? (
              socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border-2 border-brand-orange bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-soft hover:bg-cream"
                  aria-label={s.label}
                >
                  {s.label}
                </a>
              ))
            ) : (
              <div className="text-neutral-500">Add links in the social_links sheet tab.</div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4">
        <div className="mx-auto max-w-6xl px-4 text-xs text-neutral-500">
          {pc.footer_disclaimer ?? ""}
        </div>
      </div>
    </footer>
  );
}