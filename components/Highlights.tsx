import React from "react";
import { PanelsTopLeft, Search, Server } from "lucide-react";
import type { SiteContent } from "@/lib/i18n";

const icons = [Search, PanelsTopLeft, Server];

const tints = [
  "border-primary/10 bg-tint-mint hover:border-primary/30",
  "border-violet-100 bg-tint-violet hover:border-violet-300",
  "border-amber-100 bg-tint-amber hover:border-amber-300",
];

const iconTints = [
  "text-primary",
  "text-violet-700",
  "text-amber-700",
];

const tagTints = [
  "text-primary/60",
  "text-violet-700/60",
  "text-amber-700/60",
];

export default function Highlights({ content }: { content: SiteContent["highlights"] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {content.map((item, index) => {
          const Icon = icons[index] ?? Search;

          return (
            <article
              key={item.title}
              className={`flex flex-col gap-6 rounded-2xl border p-7 transition ${tints[index] ?? tints[0]}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`bg-surface flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ${iconTints[index] ?? iconTints[0]}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span
                  className={`font-mono text-[10px] tracking-widest ${tagTints[index] ?? tagTints[0]}`}
                >
                  {item.tag}
                </span>
              </div>
              <div>
                <h2 className="text-ink text-lg font-semibold tracking-tight">{item.title}</h2>
                <p className="text-muted mt-2 text-sm leading-7">{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
