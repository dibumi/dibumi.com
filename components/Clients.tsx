import React from "react";
import { Building2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import type { SiteContent } from "@/lib/i18n";

/** Inisial dua huruf untuk monogram kartu klien. */
function monogram(name: string): string {
  const words = name.split(/[^A-Za-z]+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Clients({ content }: { content: SiteContent["clients"] }) {
  return (
    <section id="clients" className="bg-surface py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          icon={<Building2 className="h-4 w-4" aria-hidden="true" />}
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {content.names.map((name, index) => (
            <li
              key={name}
              className={`border-line bg-surface hover:border-primary/30 flex items-center gap-4 rounded-2xl border p-6 transition ${
                index < 3 ? "lg:col-span-2" : "lg:col-span-3"
              }`}
            >
              <span
                className="bg-primary-soft text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold tracking-tight"
                aria-hidden="true"
              >
                {monogram(name)}
              </span>
              <span className="text-ink min-w-0 text-base font-semibold tracking-tight">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
