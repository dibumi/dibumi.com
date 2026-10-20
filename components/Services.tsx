import React from "react";
import Link from "next/link";
import { serviceAnchor, serviceMeta } from "@/lib/services";
import Reveal from "@/components/motion/Reveal";
import type { SiteContent } from "@/lib/i18n";

/**
 * Pita gelap berisi enam praktik layanan.
 *
 * Referensinya memakai satu section hitam pekat (#121212) di tengah halaman,
 * dengan judul serif terang, tab di kiri, dan grid fitur di bawahnya. Pita itu
 * berfungsi sebagai titik henti: setelah dua section terang, mata butuh
 * kontras. Di sini peran itu diambil section Services, dengan ink-black sebagai
 * permukaannya dan paper-white sebagai tintanya.
 *
 * Warna aksen tidak ikut masuk: peach hanya bekerja di atas putih, dan di atas
 * ink ia kehilangan sifat kertasnya. Satu-satunya warna di pita ini adalah
 * putih pada hitam.
 *
 * Ikon tetap tidak ada. Urutan ditandai ordinal 01–06, dan tiap kartu punya
 * garis hairline tipis sebagai pemisah — di atas latar gelap, garis lebih
 * terbaca daripada kartu berisi.
 */
export default function Services({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  return (
    <section id="services" className="bg-ink-black py-20 lg:py-40">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[58ch]">
            <p className="text-paper-white/50 flex items-center gap-1.5 text-caption">
              {content.servicesSection.eyebrow}
              <span aria-hidden="true" className="rtl:-scale-x-100">
                ›
              </span>
            </p>
            <h2 className="text-paper-white font-display mt-4 text-heading font-normal sm:text-heading-lg">
              {content.servicesSection.title}
            </h2>
            <p className="text-paper-white/60 mt-5 max-w-[52ch] text-body">
              {content.servicesSection.description}
            </p>
          </div>
        </Reveal>

        {/* auto-rows-fr menyamakan tinggi kartu dalam satu baris. Di pita gelap
            ini yang menyusun ritme adalah garis, bukan kotak: setiap sel punya
            border atas, sehingga enam layanan terbaca sebagai satu tabel. */}
        <div className="mt-14 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service, index) => {
            const meta = serviceMeta[index];

            return (
              <Reveal
                key={service.title}
                as="article"
                delay={index * 0.06}
                className="group border-paper-white/15 border-t py-8"
              >
                <div
                  id={meta ? serviceAnchor(meta.slug) : undefined}
                  className="flex scroll-mt-28 flex-col gap-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-paper-white/40 tabular text-caption">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="bg-paper-white/20 h-px flex-1 transition-colors duration-500 group-hover:bg-paper-white/50"
                    />
                  </div>

                  <h3 className="text-paper-white text-body-lg font-medium">
                    {service.title}
                  </h3>

                  <p className="text-paper-white/60 text-caption">{service.description}</p>

                  <ul className="mt-1 flex flex-col gap-1.5">
                    {service.points.map((point) => (
                      <li key={point} className="text-paper-white/40 text-caption">
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`${basePath}#contact`}
                    className="text-paper-white mt-3 inline-flex w-fit items-center gap-1.5 text-caption hover:underline"
                  >
                    {content.servicesSection.consult}
                    <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
