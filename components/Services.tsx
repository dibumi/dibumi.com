import React from "react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { serviceAnchor, serviceMeta } from "@/lib/services";
import type { SiteContent } from "@/lib/i18n";

/**
 * Enam praktik layanan.
 *
 * Section ini duduk di atas kanvas putih, jadi tidak diberi background sendiri:
 * ritme pita terang/gelap diurus section lain, dan menambahkan satu lagi di
 * sini akan memecahnya.
 *
 * Ikon sudah dihapus dari kartu. Peran penanda urutan diambil alih nomor
 * ordinal (01–06) dalam tabular, dan tiap poin cukup ditumpuk sebagai teks
 * caption tanpa marker titik: sistem ini tidak punya warna fungsional untuk
 * sebuah bullet.
 *
 * `scroll-mt-28` dipertahankan karena navbar menaut langsung ke anchor
 * tiap layanan; tanpa itu judul kartu mendarat di bawah header sticky.
 */
export default function Services({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  return (
    <section id="services" className="py-20 lg:py-24">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.servicesSection.eyebrow}
          title={content.servicesSection.title}
          description={content.servicesSection.description}
        />

        {/* auto-rows-fr: semua baris memakai tinggi yang sama, jadi kartu di
            baris kedua setinggi kartu tertinggi di baris pertama. Tanpa ini,
            tiap baris grid diukur sendiri-sendiri. Hanya dari sm ke atas, supaya
            di mobile satu kolom tidak ada kartu pendek yang dipaksa tinggi. */}
        <div className="mt-16 grid gap-6 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service, index) => {
            const meta = serviceMeta[index];

            return (
              <article
                key={service.title}
                id={meta ? serviceAnchor(meta.slug) : undefined}
                className="bg-mist-gray rounded-cards flex scroll-mt-28 flex-col gap-6 p-8"
              >
                <span className="text-ash-gray tabular text-caption">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-ink-black text-body-lg font-medium">
                    {service.title}
                  </h3>
                  <p className="text-slate-gray mt-2 text-body">{service.description}</p>
                </div>

                <ul className="flex flex-col gap-1.5">
                  {service.points.map((point) => (
                    <li key={point} className="text-slate-gray text-caption">
                      {point}
                    </li>
                  ))}
                </ul>

                {/* mt-auto menempelkan tautan ke dasar kartu, supaya keenam
                    kartu punya baris aksi yang sejajar meski panjang teksnya
                    berbeda. Panah ditulis sebagai glyph di dalam label, dan
                    dibalik di RTL. */}
                <Link
                  href={`${basePath}#contact`}
                  className="text-ink-black mt-auto inline-flex w-fit items-center gap-1.5 text-body hover:underline"
                >
                  {content.servicesSection.consult}
                  <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                    →
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
