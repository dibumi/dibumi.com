import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/i18n";

/**
 * Hero terpusat tanpa ilustrasi: judul, satu paragraf, dua jalur, dan satu
 * baris jaminan. Tidak ada state maupun animasi, jadi ini server component dan
 * tidak ikut masuk bundle klien.
 */
export default function Hero({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  const hero = content.hero;

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pt-24 lg:pb-28 lg:pt-28">
      <div className="animate-fade-up mx-auto flex max-w-4xl flex-col items-center gap-7 text-center">
        {/*
          Skala judul dibatasi oleh panjang baris terpanjang, bukan oleh selera.
          Geist Mono berlebar 0.6em per karakter, dan tracking -0.05em membuat
          lebar efektifnya 0.55em. Baris terpanjang, "We keep it running.",
          berisi 19 karakter. Di lg wadahnya 56rem, jadi batas atasnya 84px.
          Di mobile baris itu patah dua, dan itu wajar untuk layar sempit.
        */}
        <h1 className="hero-title text-ink text-[2.5rem] font-medium leading-[1.06] tracking-[-0.05em] sm:text-[3.25rem] md:text-[4rem] lg:text-[5.25rem]">
          {hero.titleLead}
          <br />
          <span className="text-primary">{hero.titleAccent}</span>
        </h1>

        <p className="text-muted max-w-xl text-base leading-7 sm:text-lg">
          {hero.description}
        </p>

        <div className="mt-1 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
          <Link
            href={`${basePath}#contact`}
            className="bg-primary hover:bg-primary-hover inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg px-6 text-sm font-semibold text-white transition sm:w-auto"
          >
            {hero.primaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${basePath}#services`}
            className="text-muted hover:text-primary inline-flex items-center gap-1.5 text-sm font-medium transition"
          >
            {hero.secondaryCta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="text-muted mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
          {hero.chips.map((chip, index) => (
            <li key={chip} className="flex items-center gap-3">
              {index > 0 && (
                <span className="text-muted/50" aria-hidden="true">
                  ·
                </span>
              )}
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
