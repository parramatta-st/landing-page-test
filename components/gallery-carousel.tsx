"use client";

import { useMemo, useState } from "react";

export type GalleryItem = {
  image_url: string;
  alt_text: string;
  caption?: string;
};

export function GalleryCarousel({ items }: { items: GalleryItem[] }) {
  const activeItems = useMemo(() => (items ?? []).filter(Boolean), [items]);
  const [idx, setIdx] = useState(0);
  const current = activeItems[Math.min(idx, Math.max(0, activeItems.length - 1))];

  function prev() {
    setIdx((v) => (activeItems.length ? (v - 1 + activeItems.length) % activeItems.length : 0));
  }

  function next() {
    setIdx((v) => (activeItems.length ? (v + 1) % activeItems.length : 0));
  }

  if (!activeItems.length) {
    return <div className="text-sm text-neutral-600">No gallery images yet.</div>;
  }

  return (
    <div className="mx-auto max-w-6xl xl:max-w-7xl rounded-[40px] border-4 border-white bg-white/80 p-5 shadow-soft backdrop-blur">
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-neutral-50">
        {/* Main image */}
        <img
          src={current.image_url}
          alt={current.alt_text}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        {/* Controls */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-black/30 px-4 py-3 text-white backdrop-blur hover:bg-black/40"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-black/30 px-4 py-3 text-white backdrop-blur hover:bg-black/40"
        >
          ›
        </button>

        {/* Counter */}
        <div className="absolute bottom-3 right-3 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
          {idx + 1}/{activeItems.length}
        </div>
      </div>

      {/* Caption */}
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-neutral-800">{current.caption ?? ""}</div>
          <div className="text-xs text-neutral-600">{current.alt_text}</div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
        {activeItems.map((it, i) => (
          <button
            key={`${it.image_url}-${i}`}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Open image ${i + 1}`}
            className={`relative shrink-0 overflow-hidden rounded-2xl border-2 ${
              i === idx ? "border-brand-orange" : "border-white/80"
            } bg-white`}
          >
            <img
              src={it.image_url}
              alt={it.alt_text}
              className="h-20 w-32 object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
