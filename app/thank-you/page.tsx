import Link from "next/link";
import { Section } from "@/components/section";
import { getPageContent } from "@/lib/content";

function actionHref(action?: string) {
  const a = (action ?? "").trim();
  if (!a) return "/book";
  if (a.startsWith("scroll:")) return `/#${a.replace("scroll:", "").trim()}`;
  return a;
}

export default async function ThankYouPage() {
  const pc = await getPageContent();
  const href = actionHref(pc.thank_you_primary_cta_action);

  return (
    <Section tone="orange" title={pc.thank_you_title ?? "Thanks — we’ve received your details!"} subtitle={pc.thank_you_subtitle ?? ""}>
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-soft">
        <p className="text-neutral-700">If you’d like to lock in a time now, you can book your free assessment below.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={href} className="rounded-full bg-brand-orange px-6 py-3 text-center font-semibold text-white shadow-soft hover:brightness-95">
            {pc.thank_you_primary_cta_label ?? "Book Free Assessment"}
          </Link>
          <Link href="/" className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-center font-medium hover:bg-neutral-50">
            Back to home
          </Link>
        </div>
      </div>
    </Section>
  );
}