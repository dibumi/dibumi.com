import React from "react";
import { Braces, Eye, FileCheck2, Headset, KeyRound, LockKeyhole } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import type { SiteContent } from "@/lib/i18n";

const standardIcons = [FileCheck2, LockKeyhole, Braces];
const commitmentIcons = [KeyRound, Eye, Headset];

export default function Standards({ content }: { content: SiteContent["standards"] }) {
  return (
    <section id="standards" className="bg-elevated py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {content.items.map((item, index) => {
            const Icon = standardIcons[index] ?? FileCheck2;

            return (
              <article
                key={item.title}
                className="border-line bg-surface rounded-2xl border p-7"
              >
                <span className="bg-primary-soft text-primary mb-5 flex h-11 w-11 items-center justify-center rounded-xl">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="text-ink text-base font-semibold">{item.title}</h3>
                <p className="text-muted mt-2 text-sm leading-7">{item.description}</p>
              </article>
            );
          })}
        </div>

        <div className="border-line mt-10 grid gap-8 border-t pt-10 sm:grid-cols-3">
          {content.commitments.map((item, index) => {
            const Icon = commitmentIcons[index] ?? KeyRound;

            return (
              <div key={item.title}>
                <span className="border-primary/15 text-primary mb-4 flex h-9 w-9 items-center justify-center rounded-xl border bg-surface">
                  <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="text-ink text-sm font-semibold">{item.title}</h3>
                <p className="text-muted mt-2 text-sm leading-7">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
