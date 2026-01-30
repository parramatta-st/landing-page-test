import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/section";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { FAQAccordion } from "@/components/faq-accordion";
import { HighLevelForm } from "@/components/highlevel-form";
import { StickyCTA } from "@/components/sticky-cta";
import { getFaqs, getGallery, getPageContent, getServices, getTestimonials, getTutors, isMeaningfulUrl } from "@/lib/content";

function actionHref(action?: string) {
  const a = (action ?? "").trim();
  if (!a) return "#enquire";
  if (a.startsWith("scroll:")) return `#${a.replace("scroll:", "").trim()}`;
  return a;
}

function toEmbedVideoUrl(url: string) {
  // Accept YouTube watch URLs and convert them into a safe embeddable URL.
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") && u.pathname === "/watch") {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (u.hostname === "youtu.be") {
      const v = u.pathname.replace("/", "");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
  } catch {
    // fall through
  }
  return url;
}

export default async function HomePage() {
  const pc = await getPageContent();
  const [tutors, faqs, gallery, services, testimonials] = await Promise.all([
    getTutors(), getFaqs(), getGallery(), getServices(), getTestimonials()
  ]);

  const primaryHref = actionHref(pc.primary_cta_action);
  const secondaryHref = actionHref(pc.secondary_cta_action);

  const showVideo = isMeaningfulUrl(pc.video_url);
  const showMap = isMeaningfulUrl(pc.google_maps_embed_url);

  return (
    <div className="pb-16 md:pb-0">
      <StickyCTA
        enquireId="enquire"
        bookHref={secondaryHref}
        enquireLabel={pc.primary_cta_label ?? "Enquire"}
        bookLabel={pc.secondary_cta_label ?? "Book"}
      />

      {/* HERO (v4 typography + Epping-inspired blobs) */}
      <section className="relative isolate overflow-hidden bg-mint">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Big blob shapes */}
          <div
            className="absolute -left-[360px] top-[-260px] h-[720px] w-[720px] animate-blob bg-brand-orange/30"
            style={{ borderRadius: "55% 45% 35% 65% / 55% 35% 65% 45%" }}
          />
          <div
            className="absolute -right-[360px] top-[-240px] h-[680px] w-[680px] animate-blob2 bg-brand-blue/24"
            style={{ borderRadius: "45% 55% 65% 35% / 55% 45% 55% 45%" }}
          />
          {/* Soft accent bubbles (avoid harsh white) */}
          <div className="absolute right-20 top-24 h-56 w-56 rounded-full bg-brand-blue/14 blur-sm" />
          <div className="absolute left-24 top-24 h-20 w-20 rounded-full bg-brand-orange/14 blur-sm" />
          <div className="absolute bottom-10 left-16 h-24 w-24 rounded-full bg-brand-blue/12 blur-sm" />
          <div
            className="absolute left-[58%] top-[62%] h-28 w-28 rounded-full bg-brand-orange/10 blur-sm animate-blob"
            style={{ animationDelay: "3s" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            {pc.hero_kicker && (
              <div className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-brand-orange shadow-soft">
                {pc.hero_kicker}
              </div>
            )}
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-brand-orange md:text-7xl">
              {pc.hero_headline ?? "Parramatta Tutoring"}
            </h1>
            <p className="mt-4 text-lg text-neutral-600 md:text-xl">
              {pc.hero_subheadline ?? "Skyrocket your child’s results at school."}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={primaryHref} className="rounded-full bg-brand-orange px-6 py-3 text-center font-semibold text-white shadow-soft hover:brightness-95">
                {pc.primary_cta_label ?? "Enquire Now"}
              </a>
              <Link href={secondaryHref} className="rounded-full border-2 border-brand-orange bg-white px-6 py-3 text-center font-semibold text-brand-orange hover:bg-cream">
                {pc.secondary_cta_label ?? "Book Free Assessment"}
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-sm text-neutral-700">
              <span className="rounded-full bg-white/85 px-3 py-1 shadow-soft">Local Parramatta centre</span>
              <span className="rounded-full bg-white/85 px-3 py-1 shadow-soft">Personalised learning plan</span>
              <span className="rounded-full bg-white/85 px-3 py-1 shadow-soft">Progress-focused tutoring</span>
            </div>
          </div>
        </div>
      </section>

      <Section tone="blue" id="services" title={pc.services_title ?? "Our Expert Tutoring Services"}>
        <div className="mx-auto max-w-5xl rounded-[52px] border-4 border-white bg-white/80 p-6 shadow-soft backdrop-blur md:p-10">
          <div className="flex flex-wrap items-center justify-center gap-4">
          {services.map((s, idx) => (
            <div key={idx} title={s.description ?? ""}>
              {s.href ? (
                <a
                  href={s.href}
                  className="inline-flex rounded-full border-2 border-brand-orange bg-white px-6 py-3 text-sm font-medium text-neutral-800 shadow-soft hover:bg-cream"
                >
                  {s.label}
                </a>
              ) : (
                <div className="inline-flex rounded-full border-2 border-brand-orange bg-white px-6 py-3 text-sm font-medium text-neutral-800 shadow-soft">
                  {s.label}
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </Section>

      <Section tone="orange" id="enquire" title={pc.enquire_title ?? "Enquire Today"} subtitle={pc.enquire_subtitle ?? ""}>
        <div className="mx-auto max-w-5xl rounded-[52px] border-4 border-white bg-white/70 p-6 shadow-soft backdrop-blur md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-soft">
              {/* Fixed container height => consistent layout, while the iframe reload helper makes the embed reliable */}
              <div className="h-[560px] md:h-[600px]">
                <HighLevelForm className="h-full w-full" retryAfterMs={5000} />
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-cream/70 p-5 shadow-soft">
            <div className="text-sm font-semibold text-brand-orange">What happens next?</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
              <li>We’ll contact you to understand your child’s year level and goals.</li>
              <li>We’ll recommend the right tutor and learning plan.</li>
              <li>You can book a free assessment at a time that suits your family.</li>
            </ul>
            <Link href={secondaryHref} className="mt-5 inline-flex rounded-full bg-brand-orange px-5 py-3 text-sm font-semibold text-white shadow-soft hover:brightness-95">
              {pc.secondary_cta_label ?? "Book Free Assessment"}
            </Link>
          </div>
          </div>
        </div>
      </Section>

      {/* VIDEO (placed after lead form) */}
      {showVideo && (
        <Section tone="blue" title={pc.video_title ?? "Why Choose Success Tutoring Parramatta?"}>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[40px] border-4 border-white bg-white/80 shadow-soft backdrop-blur">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={toEmbedVideoUrl(pc.video_url ?? "")}
                title="Success Tutoring Parramatta video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </Section>
      )}

      <Section tone="blue" id="tutors" title="Meet our tutors" subtitle="Friendly faces, strong subject knowledge, and a clear plan to lift results.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.slice(0, 6).map((t, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft">
              <div className="relative aspect-square w-full bg-neutral-100">
                <Image src={t.photo_url} alt={t.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <div className="font-semibold">{t.name}</div>
                <div className="mt-1 text-sm text-neutral-600">{t.role_title}</div>
                <div className="mt-2 text-sm text-neutral-700"><span className="font-medium">Subjects:</span> {t.subjects}</div>
                <div className="mt-1 text-sm text-neutral-700"><span className="font-medium">Year levels:</span> {t.year_levels}</div>
                {t.bio_short && <p className="mt-3 text-sm text-neutral-600">{t.bio_short}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/tutors" className="inline-flex rounded-full border-2 border-brand-orange bg-white px-5 py-3 text-sm font-semibold text-brand-orange hover:bg-cream">
            View all tutors
          </Link>
        </div>
      </Section>

      <Section tone="orange" id="gallery" title={pc.gallery_title ?? "Parramatta Gallery"}>
        <GalleryCarousel items={gallery} />
      </Section>

      {testimonials.length > 0 && (
        <Section tone="orange" id="testimonials" title="What families say">
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div key={idx} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-soft">
                <div className="text-sm font-medium">{t.name}</div>
                {t.tag && <div className="mt-1 text-xs text-neutral-500">{t.tag}</div>}
                <p className="mt-3 text-sm leading-6 text-neutral-700">{t.text}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {showMap && (
        <Section tone="blue" id="location" title={pc.map_title ?? "Where To Find Us?"}>
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-4 rounded-[32px] border-4 border-white bg-white/80 p-6 shadow-soft backdrop-blur">
              <div className="font-semibold">{pc.centre_name ?? ""}</div>
              <div className="mt-2 text-sm text-neutral-600">{pc.centre_address_line ?? ""}</div>
              <div className="mt-3 text-sm text-neutral-600">{pc.centre_phone ?? ""}</div>
              <div className="mt-1 text-sm text-neutral-600">{pc.centre_email ?? ""}</div>
              <Link href={secondaryHref} className="mt-5 inline-flex rounded-full bg-brand-orange px-5 py-3 text-sm font-semibold text-white shadow-soft hover:brightness-95">
                {pc.secondary_cta_label ?? "Book Free Assessment"}
              </Link>
            </div>
            <div className="md:col-span-8 overflow-hidden rounded-[32px] border-4 border-white bg-white/80 shadow-soft backdrop-blur">
              <iframe
                src={pc.google_maps_embed_url}
                className="h-[560px] w-full md:h-[620px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Section>
      )}

      {faqs.length > 0 && (
        <Section tone="blue" id="faqs" title="Frequently asked questions">
          <FAQAccordion items={faqs} />
        </Section>
      )}

      <Section tone="orange">
        <div className="mx-auto max-w-5xl rounded-[44px] border-4 border-white bg-white/80 p-8 shadow-soft backdrop-blur md:p-10">
          <h3 className="text-2xl font-semibold tracking-tight text-brand-orange">Ready to get started?</h3>
          <p className="mt-2 max-w-2xl text-neutral-700">Enquire now or book your free assessment at a time that suits your family.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={primaryHref} className="rounded-full bg-brand-orange px-6 py-3 text-center font-semibold text-white shadow-soft hover:brightness-95">
              {pc.primary_cta_label ?? "Enquire Now"}
            </a>
            <Link href={secondaryHref} className="rounded-full border-2 border-brand-orange bg-white px-6 py-3 text-center font-semibold text-brand-orange hover:bg-cream">
              {pc.secondary_cta_label ?? "Book Free Assessment"}
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}