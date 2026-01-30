"use client";

import { useState } from "react";
import type { FAQ } from "@/lib/content";
import { ChevronDown } from "lucide-react";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx}>
            <button
              className="flex w-full items-center justify-between gap-4 rounded-full border-2 border-brand-orange bg-white px-6 py-5 text-left shadow-soft transition hover:bg-cream/70"
              onClick={() => setOpen(isOpen ? null : idx)}
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-brand-orange underline underline-offset-4">
                {it.question}
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-brand-orange">
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </span>
            </button>
            {isOpen && (
              <div className="mt-3 px-6">
                <p className="max-w-4xl text-sm leading-6 text-neutral-700">{it.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}