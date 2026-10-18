import React from "react";
import Link from "next/link";
import {
  AppWindow,
  ArrowUpRight,
  Code2,
  Globe2,
  LifeBuoy,
  Server,
  Smartphone,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import type { SiteContent } from "@/lib/i18n";

const icons = [Code2, Smartphone, Globe2, AppWindow, Server, LifeBuoy];

export default function Services({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  return (
    <section id="services" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.servicesSection.eyebrow}
          title={content.servicesSection.title}
          description={content.servicesSection.description}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service, index) => {
            const Icon = icons[index] ?? Code2;

            return (
              <article
                key={service.title}
                className="border-line bg-surface hover:border-primary/30 group flex flex-col gap-5 rounded-2xl border p-7 transition"
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
