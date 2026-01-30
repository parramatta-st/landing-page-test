"use client";

export function StickyCTA({
  enquireId = "enquire",
  bookHref = "/book",
  enquireLabel = "Enquire",
  bookLabel = "Book",
}: {
  enquireId?: string;
  bookHref?: string;
  enquireLabel?: string;
  bookLabel?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/90 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl gap-3 px-4 py-3">
        <a href={`#${enquireId}`} className="flex-1 rounded-full border border-neutral-300 bg-white px-4 py-3 text-center text-sm font-medium">
          {enquireLabel}
        </a>
        <a href={bookHref} className="flex-1 rounded-full bg-brand-orange px-4 py-3 text-center text-sm font-semibold text-white shadow-soft hover:brightness-95">
          {bookLabel}
        </a>
      </div>
    </div>
  );
}