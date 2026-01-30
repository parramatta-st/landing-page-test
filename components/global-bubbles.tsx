

/**
 * Global animated bubbles/blobs that sit behind the whole page.
 *
 * Important: this is global (not per-section) so shapes aren't clipped at
 * section boundaries and the background feels continuous while scrolling.
 */
export function GlobalBubbles({ className }: { className?: string }) {
  return (
<div
  aria-hidden
  className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className ?? ""}`}
>
      {/* Big corner / anchor bubbles (span multiple sections) */}
      <div className="bubble-shape bubble-orange absolute -left-48 -top-40 h-[560px] w-[560px] animate-blob" />
      <div className="bubble-shape bubble-blue absolute -right-56 top-[8%] h-[520px] w-[520px] animate-blob2" />

      {/* Mid-page anchors */}
      <div className="bubble-shape bubble-blue absolute -left-52 top-[36%] h-[460px] w-[460px] animate-blob2" />
      <div className="bubble-shape bubble-orange absolute -right-56 top-[52%] h-[520px] w-[520px] animate-blob" />

      {/* Bottom anchors (mimic the footer vibe but keep it continuous) */}
      <div className="bubble-shape bubble-orange absolute -left-56 top-[74%] h-[560px] w-[560px] animate-blob2" />
      <div className="bubble-shape bubble-blue absolute -right-60 bottom-[-220px] h-[620px] w-[620px] animate-blob" />

      {/* Smaller floating bubbles (adds depth + makes it feel more "alive") */}
      <div className="bubble-shape bubble-white absolute left-[52%] top-[18%] h-[160px] w-[160px] animate-blob" />
      <div className="bubble-shape bubble-white absolute left-[10%] top-[58%] h-[140px] w-[140px] animate-blob2" />
      <div className="bubble-shape bubble-white absolute right-[12%] top-[70%] h-[120px] w-[120px] animate-blob" />
      <div className="bubble-shape bubble-blue absolute right-[32%] top-[28%] h-[110px] w-[110px] animate-blob2" />
      <div className="bubble-shape bubble-orange absolute left-[28%] top-[44%] h-[120px] w-[120px] animate-blob" />
      <div className="bubble-shape bubble-white absolute left-[40%] bottom-[6%] h-[160px] w-[160px] animate-blob2" />
    </div>
  );
}
