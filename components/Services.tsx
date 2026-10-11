import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Smartphone,
  Globe2,
  AppWindow,
  Server,
  LifeBuoy,
} from "lucide-react";
import type { SiteContent } from "@/lib/i18n";

const icons = [Code2, Smartphone, Globe2, AppWindow, Server, LifeBuoy];

// Peta bento 6 sel tanpa lubang: 1 tile unggulan setinggi 2 baris, 4 tile reguler,
// lalu 1 tile lebar penuh. Urutan mengikuti konten, bukan angka.
const tiles = [
  { place: "lg:col-start-1 lg:row-start-1 lg:row-span-2", featured: true },
  { place: "lg:col-start-2 lg:row-start-1" },
  { place: "lg:col-start-3 lg:row-start-1" },
  { place: "lg:col-start-2 lg:row-start-2" },
  { place: "lg:col-start-3 lg:row-start-2" },
  { place: "lg:col-span-3 lg:col-start-1 lg:row-start-3", wide: true },
];

export default function Services({ content }: { content: SiteContent }) {
  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="h-px bg-hairline-x" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6 pt-16 sm:px-8 md:pt-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="mb-4 text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl">
            {content.servicesSection.title}
          </h2>
          <p className="text-base leading-relaxed text-slate-600">
            {content.servicesSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:grid-cols-3">
          {content.services.map((service, index) => {
            const Icon = icons[index];
            const tile = tiles[index];
            return (
              <div
                key={service.title}
                className={[
                  "group relative flex flex-col gap-5 bg-white p-7 transition-colors hover:bg-brand-50 sm:p-8",
                  tile.place,
                  tile.featured ? "bg-tile-wash" : "",
                  tile.wide ? "lg:flex-row lg:items-center lg:gap-7" : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                    index === 0
                      ? "bg-brand-600 text-white"
                      : "bg-brand-100 text-brand-900 group-hover:bg-brand-600 group-hover:text-white",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>

                <div className={["flex min-w-0 flex-col", tile.featured ? "flex-1" : ""].join(" ")}>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mb-4 max-w-prose text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>
                  <ul className={["mb-5 flex flex-wrap gap-x-4 gap-y-2", tile.wide ? "lg:mb-0" : ""].join(" ")}>
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-xs font-medium text-slate-600"
                      >
                        <span className="h-1 w-1 rounded-full bg-brand-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#contact"
                    className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors group-hover:text-brand-900"
                  >
                    {content.servicesSection.consult}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
