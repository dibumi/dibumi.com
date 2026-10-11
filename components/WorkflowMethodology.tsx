import React from "react";
import { Search, PanelsTopLeft, Code2, Rocket } from "lucide-react";
import type { SiteContent } from "@/lib/i18n";

const icons = [Search, PanelsTopLeft, Code2, Rocket];

export default function WorkflowMethodology({ content }: { content: SiteContent["workflow"] }) {
  const lastIndex = content.steps.length - 1;

  return (
    <section id="methodology" className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <h2 className="mb-4 text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl">
            {content.title}
          </h2>
          <p className="text-base leading-relaxed text-slate-600">{content.description}</p>
        </div>

        <div className="relative">
          {/* Rail vertikal untuk mobile */}
          <div
            className="absolute bottom-6 left-[5px] top-2 w-0.5 bg-brand-200 lg:hidden"
            aria-hidden="true"
          />
          {/* Rail horizontal untuk desktop: hanya sepanjang 4 titik, lalu memudar */}
          <div
            className="absolute left-0 top-[5px] hidden h-0.5 w-3/4 bg-rail-x lg:block"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 gap-x-8 gap-y-9 lg:grid-cols-4">
            {content.steps.map((item, index) => {
              const Icon = icons[index];
              return (
                <li key={item.title} className="relative pl-7 lg:pl-0">
                  <span
                    className={[
                      "absolute left-0 top-3.5 h-3 w-3 rounded-full border-2 bg-white lg:static lg:top-auto lg:mb-5 lg:block",
                      index === lastIndex ? "border-brand-300" : "border-brand-500",
                    ].join(" ")}
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-900">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-sm font-semibold text-brand-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mb-2 mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
