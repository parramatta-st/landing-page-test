import Link from "next/link";
import { Section } from "@/components/section";
import { getPageContent, isMeaningfulUrl } from "@/lib/content";

export default async function BookPage() {
  const pc = await getPageContent();
  const url = pc.calendly_url ?? "";
  const show = isMeaningfulUrl(url);

  return (
    <div className="pb-16 md:pb-0">
      <Section tone="blue" title={pc.book_page_title ?? "Book a free assessment"} subtitle={pc.book_page_subtitle ?? ""}>
        {!show ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600 shadow-soft">
            Add your Calendly link in <code className="rounded bg-neutral-100 px-1">page_content</code> → <code className="rounded bg-neutral-100 px-1">calendly_url</code>.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft">
            <div className="h-[760px] w-full">
              <iframe src={url} className="h-full w-full" title="Book a diagnostic" frameBorder="0" />
            </div>
          </div>
        )}
        <div className="mt-6 text-sm text-neutral-600">
          Prefer to enquire first? <Link href="/#enquire" className="text-brand-orange hover:underline">Enquire here</Link>.
        </div>
      </Section>
    </div>
  );
}