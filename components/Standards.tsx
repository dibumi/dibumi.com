import React from "react";
import { FileCheck2, LockKeyhole, Braces, KeyRound, Eye, Headset } from "lucide-react";
import type { SiteContent } from "@/lib/i18n";

const standardIcons = [FileCheck2, LockKeyhole, Braces];
const commitmentIcons = [KeyRound, Eye, Headset];

export default function Standards({ content }: { content: SiteContent["standards"] }) {
  return (
    <section id="standards" className="bg-brand-100/60 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <h2 className="mb-4 text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl">
            {content.title}
          </h2>
          <p className="text-base leading-relaxed text-slate-600">{content.description}</p>
        </div>

        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {content.items.map((std, index) => {
            const Icon = standardIcons[index];
            return (
              <div key={std.title} className="border-l-2 border-brand-600 pl-5">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-800">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mb-2 text-base font-semibold text-slate-900">{std.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{std.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-brand-200 pt-8 sm:grid-cols-3">
          {content.commitments.map((item, index) => {
            const Icon = commitmentIcons[index];
            return (
              <div key={item.title}>
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-200 text-brand-900">
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
