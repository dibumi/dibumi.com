import React from "react";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { serviceAnchor, serviceMeta } from "@/lib/services";
import type { SiteContent } from "@/lib/i18n";

export default function Services({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  return (
    <section id="services" className="bg-surface py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.servicesSection.eyebrow}
          title={content.servicesSection.title}
          description={content.servicesSection.description}
        />

        {/* auto-rows-fr: semua baris memakai tinggi yang sama, jadi kartu di
            baris kedua setinggi kartu tertinggi di baris pertama. Tanpa ini,
            tiap baris grid diukur sendiri-sendiri. Hanya dari sm ke atas, supaya
            di mobile satu kolom tidak ada kartu pendek yang dipaksa tinggi. */}
        <div className="mt-16 grid gap-6 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {content.services.map((service, index) => {
            const meta = serviceMeta[index];
            const Icon = meta?.icon ?? Code2;

            return (
              <article
                key={service.title}
                id={meta ? serviceAnchor(meta.slug) : undefined}
                className="border-line bg-surface hover:border-primary/30 group flex scroll-mt-28 flex-col gap-6 rounded-2xl border p-9 transition"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="bg-primary-soft text-primary group-hover:bg-primary flex h-12 w-12 items-center justify-center rounded-2xl transition-colors group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="text-muted font-mono text-[10px] tracking-widest tabular">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h3 className="text-ink text-lg font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted mt-2 text-sm leading-7">{service.description}</p>
                </div>

                <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2">
                  {service.points.map((point) => (
                    <li key={point} className="text-muted flex items-center gap-2 text-xs">
                      <span className="bg-primary h-1 w-1 rounded-full" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`${basePath}#contact`}
                  className="text-primary inline-flex w-fit items-center gap-1.5 text-sm font-semibold"
                >
                  {content.servicesSection.consult}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
