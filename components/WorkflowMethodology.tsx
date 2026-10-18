import React from "react";
import { Code2, PanelsTopLeft, Rocket, Search } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import type { SiteContent } from "@/lib/i18n";

const icons = [Search, PanelsTopLeft, Code2, Rocket];

export default function WorkflowMethodology({
  content,
}: {
  content: SiteContent["workflow"];
}) {
  const lastIndex = content.steps.length - 1;

  return (
    <section id="process" className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="relative mt-14">
          {/* Rail vertikal untuk mobile */}
          <div
            className="bg-line absolute bottom-6 start-[5px] top-2 w-0.5 lg:hidden"
            aria-hidden="true"
          />
          {/* Rail horizontal untuk desktop: hanya sepanjang titik terakhir */}
          <div
            className="bg-rail-x absolute start-0 top-[5px] hidden h-0.5 w-3/4 lg:block"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 gap-x-8 gap-y-9 lg:grid-cols-4">
            {content.steps.map((step, index) => {
              const Icon = icons[index] ?? Search;

              return (
                <li key={step.title} className="relative ps-7 lg:ps-0">
                  <span
                    className={`absolute start-0 top-3.5 h-3 w-3 rounded-full border-2 bg-canvas lg:static lg:top-auto lg:mb-5 lg:block ${
                      index === lastIndex ? "border-primary/40" : "border-primary"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-3">
                    <span className="bg-primary-soft text-primary flex h-10 w-10 items-center justify-center rounded-xl">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="text-primary/50 font-mono text-sm font-semibold tabular">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-ink mt-4 text-base font-semibold">{step.title}</h3>
                  <p className="text-muted mt-2 text-sm leading-7">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
