import Papa from "papaparse";

export const CSV_URLS = {
  page_content: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTk2sP7Qe7cTK20x2kkxLDOt5Kl5EKPdDp19VIEhP1r3_og-BUMSWsOQelW0HbPB_1rygqR_cJWPEo6/pub?gid=0&single=true&output=csv",
  tutors: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTk2sP7Qe7cTK20x2kkxLDOt5Kl5EKPdDp19VIEhP1r3_og-BUMSWsOQelW0HbPB_1rygqR_cJWPEo6/pub?gid=1226179854&single=true&output=csv",
  faqs: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTk2sP7Qe7cTK20x2kkxLDOt5Kl5EKPdDp19VIEhP1r3_og-BUMSWsOQelW0HbPB_1rygqR_cJWPEo6/pub?gid=1874111724&single=true&output=csv",
  gallery: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTk2sP7Qe7cTK20x2kkxLDOt5Kl5EKPdDp19VIEhP1r3_og-BUMSWsOQelW0HbPB_1rygqR_cJWPEo6/pub?gid=381124989&single=true&output=csv",
  services: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTk2sP7Qe7cTK20x2kkxLDOt5Kl5EKPdDp19VIEhP1r3_og-BUMSWsOQelW0HbPB_1rygqR_cJWPEo6/pub?gid=1394552525&single=true&output=csv",
  testimonials: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTk2sP7Qe7cTK20x2kkxLDOt5Kl5EKPdDp19VIEhP1r3_og-BUMSWsOQelW0HbPB_1rygqR_cJWPEo6/pub?gid=1787535026&single=true&output=csv",
  social_links: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTk2sP7Qe7cTK20x2kkxLDOt5Kl5EKPdDp19VIEhP1r3_og-BUMSWsOQelW0HbPB_1rygqR_cJWPEo6/pub?gid=1877596373&single=true&output=csv",
} as const;

export type PageContent = Record<string, string>;

async function fetchText(url: string) {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${url} (${res.status})`);
  return await res.text();
}

function parseCsv<T extends Record<string, any>>(csvText: string): T[] {
  const parsed = Papa.parse<T>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
    transform: (v) => (typeof v === "string" ? v.trim() : v),
  });
  if (parsed.errors?.length) console.warn("CSV parse warning:", parsed.errors[0]);
  return (parsed.data ?? []).filter(Boolean);
}

export async function getPageContent(): Promise<PageContent> {
  const csv = await fetchText(CSV_URLS.page_content);
  const rows = parseCsv<{ key: string; value: string }>(csv);
  const out: PageContent = {};
  for (const r of rows) {
    if (!r?.key) continue;
    out[r.key] = r.value ?? "";
  }
  return out;
}

export type Tutor = {
  active: string; order: string; name: string; photo_url: string; role_title: string;
  subjects: string; year_levels: string; bio_short: string; bio_long: string; highlights: string;
};
export async function getTutors(): Promise<Tutor[]> {
  const csv = await fetchText(CSV_URLS.tutors);
  const rows = parseCsv<Tutor>(csv);
  return rows.filter(r => String(r.active).toUpperCase()==="TRUE")
             .sort((a,b)=>Number(a.order||0)-Number(b.order||0));
}

export type FAQ = { active: string; order: string; question: string; answer: string };
export async function getFaqs(): Promise<FAQ[]> {
  const csv = await fetchText(CSV_URLS.faqs);
  const rows = parseCsv<FAQ>(csv);
  return rows.filter(r => String(r.active).toUpperCase()==="TRUE")
             .sort((a,b)=>Number(a.order||0)-Number(b.order||0));
}

export type GalleryItem = { active: string; order: string; image_url: string; alt_text: string; caption: string };
export async function getGallery(): Promise<GalleryItem[]> {
  const csv = await fetchText(CSV_URLS.gallery);
  const rows = parseCsv<GalleryItem>(csv);
  return rows.filter(r => String(r.active).toUpperCase()==="TRUE")
             .sort((a,b)=>Number(a.order||0)-Number(b.order||0));
}

export type ServiceItem = { active: string; order: string; label: string; href: string; description: string };
export async function getServices(): Promise<ServiceItem[]> {
  const csv = await fetchText(CSV_URLS.services);
  const rows = parseCsv<ServiceItem>(csv);
  return rows.filter(r => String(r.active).toUpperCase()==="TRUE")
             .sort((a,b)=>Number(a.order||0)-Number(b.order||0));
}

export type Testimonial = { active: string; order: string; name: string; text: string; tag: string; source: string };
export async function getTestimonials(): Promise<Testimonial[]> {
  const csv = await fetchText(CSV_URLS.testimonials);
  const rows = parseCsv<Testimonial>(csv);
  return rows.filter(r => String(r.active).toUpperCase()==="TRUE")
             .sort((a,b)=>Number(a.order||0)-Number(b.order||0));
}

export type SocialLink = { active: string; order: string; platform: string; label: string; url: string; icon: string };
export async function getSocialLinks(): Promise<SocialLink[]> {
  const csv = await fetchText(CSV_URLS.social_links);
  const rows = parseCsv<SocialLink>(csv);
  return rows.filter(r => String(r.active).toUpperCase()==="TRUE")
             .sort((a,b)=>Number(a.order||0)-Number(b.order||0));
}

export function isMeaningfulUrl(url?: string) {
  if (!url) return false;
  const u = url.trim();
  if (!u) return false;
  if (u.includes("REPLACE_ME")) return false;
  return true;
}