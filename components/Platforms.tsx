import React from "react";
import type { SiteContent } from "@/lib/i18n";

export default function Platforms({ content }: { content: SiteContent["platforms"] }) {
  return (
    <section id="platforms" className="bg-brand-50 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <h2 className="mb-4 text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl">
            {content.title}
          </h2>
          <p className="text-base leading-relaxed text-slate-600">{content.description}</p>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-brand-200 bg-brand-200 sm:grid-cols-2 lg:grid-cols-6">
          {content.names.map((name, index) => (
            <li
              key={name}
              className={[
                "flex items-center gap-4 bg-white p-6",
                index < 3 ? "lg:col-span-2" : "lg:col-span-3",
                index === content.names.length - 1 ? "sm:col-span-2" : "",
              ].join(" ")}
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-sm font-bold tracking-tight text-brand-800"
                aria-hidden="true"
              >
                {name.replace(/[^A-Za-z]/g, "").charAt(0)}
              </span>
              <span className="text-base font-semibold tracking-tight text-slate-800">{name}</span>
            </li>
          ))}
        </ul>

        <p className="mt-7 max-w-3xl border-l-2 border-brand-500 pl-4 text-xs leading-6 text-slate-600">
          {content.disclaimer}
        </p>
      </div>
    </section>
  );
}
