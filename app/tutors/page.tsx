import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/section";
import { getTutors } from "@/lib/content";

export default async function TutorsPage() {
  const tutors = await getTutors();
  return (
    <div className="pb-16 md:pb-0">
      <Section tone="blue" title="Our tutors" subtitle="Meet the team supporting students across Parramatta.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((t, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft">
              <div className="relative aspect-square w-full bg-neutral-100">
                <Image src={t.photo_url} alt={t.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <div className="font-semibold">{t.name}</div>
                <div className="mt-1 text-sm text-neutral-600">{t.role_title}</div>
                <div className="mt-3 text-sm text-neutral-700"><span className="font-medium">Subjects:</span> {t.subjects}</div>
                <div className="mt-1 text-sm text-neutral-700"><span className="font-medium">Year levels:</span> {t.year_levels}</div>
                {t.highlights && <div className="mt-2 text-sm text-neutral-600">{t.highlights}</div>}
                {t.bio_short && <p className="mt-3 text-sm text-neutral-600">{t.bio_short}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/book" className="inline-flex rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-soft hover:brightness-95">
            Book a free assessment
          </Link>
        </div>
      </Section>
    </div>
  );
}