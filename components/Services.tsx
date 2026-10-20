import React from "react";
import Link from "next/link";
import { serviceAnchor, serviceMeta } from "@/lib/services";
import Reveal from "@/components/motion/Reveal";
import type { SiteContent } from "@/lib/i18n";

/**
 * Pita gelap: daftar layanan di kiri, diagram model kerja di kanan.
 *
 * Referensinya memakai satu section hitam pekat di tengah halaman, dengan
 * judul serif terang, daftar fitur yang dipisah garis di kolom kiri, dan
 * diagram besar di kanan. Pita itu berfungsi sebagai titik henti: setelah dua
 * section terang, mata butuh kontras.
 *
 * Yang tidak ikut masuk adalah warnanya. Peach hanya bekerja di atas putih —
 * di atas ink ia kehilangan sifat kertasnya. Jadi satu-satunya warna di pita ini
 * adalah putih pada hitam, dengan garis hairline sebagai pemisah.
 *
 * Diagram di kanan bukan gambar. Ia disusun dari data yang sama dengan daftar
 * di kiri: enam praktik yang masuk, satu tim yang mengolahnya, tiga keluaran
 * yang dampaknya. Garis konektor sengaja samar — diagram ini menjelaskan
 * bentuk kerja, bukan mengukur sesuatu.
 *
 * Ikon tetap tidak ada. Urutan ditandai ordinal 01–06.
 */
export default function Services({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  const copy = content.servicesSection;

  return (
    <section id="services" className="bg-ink-black py-20 lg:py-40">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <Reveal>
          <div className="max-w-[58ch]">
            <p className="text-paper-white/50 flex items-center gap-1.5 text-caption">
              {copy.eyebrow}
              <span aria-hidden="true" className="rtl:-scale-x-100">
                ›
              </span>
            </p>
            <h2 className="text-paper-white font-display mt-4 text-heading font-normal sm:text-heading-lg">
              {copy.title}
            </h2>
            <p className="text-paper-white/60 mt-5 max-w-[52ch] text-body">{copy.description}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-16">
          {/* Daftar kolom kiri. Dipisah garis hairline, bukan kartu: di atas
              latar gelap garis lebih terbaca daripada kotak berisi. */}
          <ul className="flex flex-col">
            {content.services.map((service, index) => {
              const meta = serviceMeta[index];

              return (
                <Reveal
                  key={service.title}
                  as="li"
                  delay={index * 0.05}
                  className="border-paper-white/15 border-t py-6 first:border-t-0 first:pt-0"
                >
                  <div id={meta ? serviceAnchor(meta.slug) : undefined} className="scroll-mt-28">
                    <div className="flex items-baseline gap-3">
                      <span className="text-paper-white/40 tabular text-caption">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-paper-white text-body font-medium">{service.title}</h3>
                    </div>

                    <p className="text-paper-white/60 mt-2 ps-8 text-caption">
                      {service.description}
                    </p>

                    <ul className="mt-3 flex flex-col gap-1 ps-8">
                      {service.points.map((point) => (
                        <li key={point} className="text-paper-white/40 text-caption">
                          {point}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`${basePath}#contact`}
                      className="text-paper-white/80 hover:text-paper-white mt-3 inline-flex items-center gap-1.5 ps-8 text-caption transition"
                    >
                      {copy.consult}
                      <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                        →
                      </span>
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          {/* Diagram: enam praktik → satu tim → tiga keluaran. */}
          {/* Diagram menempel saat daftar digulir: daftar layanan jauh lebih
              panjang dari diagram, dan tanpa ini sisi kanan menyisakan rongga
              kosong sepanjang sisa section. */}
          <Reveal delay={0.12} className="lg:sticky lg:top-28 lg:self-start">
            <figure className="border-paper-white/12 bg-ink-black/40 rounded-elevatedcards relative overflow-hidden border p-6 sm:p-10">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {content.services.map((service, index) => (
                  <div
                    key={service.title}
                    className="border-paper-white/15 rounded-smallcards border px-4 py-3"
                  >
                    <span className="text-paper-white/40 tabular text-caption">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-paper-white mt-1 text-caption leading-snug">
                      {service.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* Konektor: satu garis tegak di tengah dengan node kecil di
                  ujungnya. Sengaja sesederhana ini — percabangan tiga garis
                  butuh geometri presisi supaya tidak terlihat patah, dan
                  diagram ini tugasnya menjelaskan arah, bukan menggambar
                  skema. */}
              <Connector />

              <div className="border-paper-white/25 rounded-smallcards bg-paper-white/[0.04] px-6 py-7 text-center">
                <p className="text-paper-white font-display text-subheading font-normal">
                  {copy.oneTeam}
                </p>
                <p className="text-paper-white/50 mx-auto mt-2 max-w-[38ch] text-caption">
                  {copy.oneTeamNote}
                </p>
              </div>

              <Connector />

              <div className="grid grid-cols-3 gap-3">
                {copy.outputs.map((output) => (
                  <p
                    key={output}
                    className="border-paper-white/15 text-paper-white rounded-smallcards border px-4 py-4 text-center text-caption"
                  >
                    {output}
                  </p>
                ))}
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Garis penghubung antar blok diagram.
 *
 * Satu garis tegak setinggi 2.5rem dengan titik di ujung bawahnya. Dibuat
 * sebagai komponen, bukan tiga span absolut, supaya jaraknya simetris dan
 * tidak bergantung pada perhitungan posisi manual.
 */
function Connector() {
  return (
    <div aria-hidden="true" className="flex flex-col items-center">
      <span className="bg-paper-white/25 h-10 w-px" />
      <span className="bg-paper-white/25 h-1.5 w-1.5 rounded-full" />
    </div>
  );
}
