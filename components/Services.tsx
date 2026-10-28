import React from "react";
import Link from "next/link";
import ServiceGlyph from "@/components/ServiceGlyph";
import { serviceAnchor, serviceMeta, servicePath } from "@/lib/services";
import Reveal from "@/components/motion/Reveal";
import type { SiteContent } from "@/lib/i18n";

/**
 * Irama reveal section ini: satu nilai untuk baris layanan, satu untuk diagram,
 * dan diagram memakai kelipatan nilai yang sama supaya kolom kiri dan kanan
 * bergerak dalam satu tempo. 0.08 bukan angka baru — itu jeda daftar yang sudah
 * dipakai di Highlights, WorkflowMethodology, dan ContactSection.
 *
 * Cascade sengaja berhenti di dua langkah. Tiap baris dipicu sendiri oleh
 * viewport (`whileInView` di Reveal), bukan oleh satu trigger untuk seluruh
 * daftar, jadi jeda yang menumpuk sampai baris kesembilan tidak membeli apa
 * pun: baris terakhir cuma menunggu 0.64 detik setelah ia sendiri terlihat.
 * Dua langkah cukup untuk tiga baris pertama yang masuk bersamaan.
 */
const ROW_STAGGER = 0.08;
const ROW_STAGGER_STEPS = 2;

/** Diagram masuk satu ketukan setelah baris kedua: mata membaca daftar dulu. */
const DIAGRAM_DELAY = ROW_STAGGER * ROW_STAGGER_STEPS;

const rowDelay = (index: number) => Math.min(index, ROW_STAGGER_STEPS) * ROW_STAGGER;

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
 * di kiri: tujuh praktik yang masuk, satu tim yang mengolahnya, tiga keluaran
 * yang dampaknya. Garis konektor sengaja samar — diagram ini menjelaskan
 * bentuk kerja, bukan mengukur sesuatu.
 *
 * Di ujung daftar ada `retired`: layanan yang sudah tidak ditawarkan. Barisnya
 * redup, tanpa glyph, tanpa bullet, dan tanpa CTA, karena menawarkan jasa yang
 * tidak ada lebih buruk daripada tidak menyebutnya sama sekali. Ia juga tidak
 * masuk diagram — diagram itu menggambarkan apa yang hari ini masuk ke satu
 * tim, dan ordinal 01–07 di sana hanya menghitung yang masih bisa dibeli.
 * Di mega menu navbar ia tetap muncul, tapi sebagai baris diam di kaki
 * panel, bukan tautan.
 *
 * Satu baris layanan hanya memuat penanda, judul, dan satu keterangan. Dua butir
 * bullet yang dulu menempel di tiap baris sudah dilepas: teksnya hidup di
 * halaman detail tiap layanan dalam bentuk yang lebih lengkap (`servicePages`
 * punya empat poin "yang termasuk" per layanan), jadi yang tinggal di beranda
 * hanya mengulanginya dengan versi yang lebih pendek. Tautan "Discuss a project"
 * juga dilepas dari tiap baris dan diganti satu CTA di ujung daftar: tujuh
 * tautan ke satu tujuan yang sama bukan pilihan, hanya kebisingan.
 *
 * Di layar lebar daftar itu dibatasi tingginya dan menggulir sendiri. Tanpa
 * batas, sembilan barisnya (tujuh praktik + dua yang pensiun) membuat kolom
 * kiri 500px lebih panjang dari diagram di kanannya, dan section-nya jadi
 * hampir dua layar penuh di monitor besar. Batasnya `min(36rem, 100dvh - 12rem)`:
 * 576px di layar biasa, menyusut di layar pendek, dan selalu lebih pendek dari
 * isinya — jadi daftar ini selalu bisa digulir, bukan hanya di layar yang
 * kebetulan kecil.
 *
 * Tiap baris ditandai glyph navigasi dari `components/ServiceGlyph.tsx`, bukan
 * ordinal lagi. Ordinal 01–07 sekarang hanya hidup di diagram kanan, tempat ia
 * memang menghitung urutan alur; di daftar, angka yang sama dengan glyph
 * menandai hal yang sama dua kali. Yang diuntungkan glyph: satu gambar per
 * layanan terbaca sekilas tanpa membaca judulnya, dan karena glyph itu 20px
 * dengan gap 12px, lebarnya 32px — persis `ps-8` yang dulu dipakai deskripsi,
 * jadi teks tidak bergeser satu piksel pun.
 *
 * Glyph selalu `aria-hidden`: judulnya sudah tautan yang terbaca. Di atas ink ia
 * memakai `paper-white/45` lalu penuh saat hover, karena slate tidak terbaca di
 * pita gelap ini.
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
    <section id="services" className="bg-ink-black on-dark py-20 lg:py-32">
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

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
          {/* Kolom kiri: daftar layanan, lalu satu CTA untuk seluruhnya.
              Daftar dipisah garis hairline, bukan kartu: di atas latar gelap
              garis lebih terbaca daripada kotak berisi.

              Dulu tiap baris membawa tautan "Discuss a project" sendiri dan
              dua butir bullet tambahan; tujuh baris berarti tujuh tautan ke
              tujuan yang sama, dan bulletnya hanya mengulang apa yang sudah
              lebih lengkap ada di halaman detail tiap layanan. */}
          <div className="flex flex-col">
            {/* Panel gulir untuk daftar (alasannya di komentar atas file).

                `overscroll-contain` menahan gulirannya supaya tidak merambat ke
                halaman saat mencapai ujung. `pt-1 -mt-1` hanya ruang untuk cincin
                fokus baris pertama: `overflow-y-auto` memotong apa pun di luar
                padding box, dan judul layanan adalah tautan yang menerima fokus
                keyboard. Margin negatifnya mengembalikan posisi daftar.

                Di bawah `lg` semuanya dilepas: daftar mengalir normal, karena
                panel gulir di dalam halaman yang juga menggulir menyiksa di
                ponsel. */}
            <ul className="services-scroll flex flex-col lg:-mt-1 lg:max-h-[min(36rem,calc(100dvh_-_12rem))] lg:overflow-y-auto lg:overscroll-contain lg:pt-1">
              {content.services.map((service, index) => {
                const meta = serviceMeta[index];

                return (
                  <Reveal
                    key={service.title}
                    as="li"
                    delay={rowDelay(index)}
                    className="border-paper-white/15 border-t py-5 first:border-t-0 first:pt-0"
                  >
                    {/* Pembungkus ini hanya membawa id anchor. Tanpa
                        `scroll-margin-top`: `scroll-padding-top: 5rem` di
                        globals.css sudah menyisakan 80px, dan menambah margin di
                        sini membuat browser menjumlahkan keduanya sehingga baris
                        mendarat jauh di bawah header. */}
                    <div id={meta ? serviceAnchor(meta.slug) : undefined}>
                      <div className="group flex items-start gap-3">
                        <ServiceGlyph
                          slug={meta.slug}
                          className="text-paper-white/45 group-hover:text-paper-white group-focus-within:text-paper-white mt-0.5 h-5 w-5 shrink-0 transition-colors duration-150"
                        />
                        <h3 className="text-body font-medium">
                          {/* Judul sekaligus pintu masuk halaman detail: di pita
                              gelap ini tidak ada ruang untuk tautan kedua tanpa
                              memecah ritme barisnya.

                              Warna cincin fokus di pita gelap ini datang dari
                              kelas `on-dark` di section, bukan dari utility per
                              elemen: cincin global berwarna ink-black dan tidak
                              terlihat di sini. */}
                          <Link
                            href={`${basePath}${servicePath(meta.slug)}`}
                            className="text-paper-white underline-offset-4 transition hover:underline"
                          >
                            {service.title}
                          </Link>
                        </h3>
                      </div>

                      <p className="text-paper-white/60 mt-2 ps-8 text-caption">
                        {service.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}

              {/* Baris pensiun: statusnya ditulis sebagai teks, bukan hanya
                  warna, supaya tetap terbaca tanpa warna dan oleh screen reader.
                  Hairline di atasnya sama dengan item lain, jadi ia menyambung
                  daftar, bukan memulai section baru. */}
              {copy.retired.map((item, index) => (
                <Reveal
                  key={item.title}
                  as="li"
                  delay={rowDelay(index)}
                  className="border-paper-white/15 border-t py-5"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-paper-white/60 text-body font-medium">{item.title}</h3>
                    <span className="text-paper-white/55 text-caption">
                      <span aria-hidden="true">·</span> {item.note}
                    </span>
                  </div>
                  <p className="text-paper-white/55 mt-2 text-caption">{item.description}</p>
                </Reveal>
              ))}
            </ul>

            {/* Satu pintu keluar untuk seluruh daftar, bukan tujuh. Pil
                penuh, bukan tautan teks: di ujung daftar sepanjang ini ia
                harus terbaca sebagai tujuan, bukan sebagai baris kesembilan.

                `self-start` menahannya selebar isinya; tanpa itu ia melar
                mengikuti kolom flex. */}
            <Reveal delay={DIAGRAM_DELAY} className="mt-10 self-start">
              <Link
                href={`${basePath}#contact`}
                className="bg-paper-white text-ink-black rounded-buttons hover:bg-paper-white/90 inline-flex h-11 items-center justify-center gap-2 px-5 text-body transition"
              >
                {copy.consult}
                <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          {/* Diagram: tujuh praktik → satu tim → tiga keluaran.
              Hanya <figure> di bawah yang berupa kartu. Sebelumnya tiap praktik,
              blok "One team", dan tiap keluaran membawa border + radius sendiri:
              sebelas kartu di dalam satu kartu, dan wadah bersarang selalu
              terbaca sebagai dua bingkai yang saling bertengkar. Pemisahnya kini
              garis atas per sel — perangkat yang sama dengan daftar di kolom
              kiri — dan hierarki dibawa oleh ukuran huruf serta konektor, bukan
              oleh kotak.

              Diagram dulu menempel saat daftar digulir: daftarnya jauh lebih
              panjang dari diagram, dan tanpa itu sisi kanan menyisakan rongga
              kosong sepanjang sisa section. Sekarang daftarnya dibatasi
              tingginya dan menggulir sendiri, jadi kedua kolom berhenti di
              ketinggian yang hampir sama dan sticky tidak lagi membeli apa pun. */}
          <Reveal delay={DIAGRAM_DELAY} className="lg:self-start">
            <figure className="border-paper-white/15 bg-ink-black/40 rounded-elevatedcards relative overflow-hidden border p-6 sm:p-10">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                {content.services.map((service, index) => {
                  // Dengan tujuh praktik, kotak terakhir duduk sendirian di
                  // baris ketiga grid tiga kolom. `col-start-2` menaruhnya di
                  // tengah, bukan menempel kiri dengan rongga di kanan.
                  const aloneInRow =
                    content.services.length % 3 === 1 &&
                    index === content.services.length - 1;

                  return (
                    <div
                      key={service.title}
                      className={`border-paper-white/15 border-t pt-3${
                        aloneInRow ? " sm:col-start-2" : ""
                      }`}
                    >
                      <span className="text-paper-white/55 tabular text-caption">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-paper-white mt-1 text-caption leading-snug">
                        {service.title}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Konektor: satu garis tegak di tengah dengan node kecil di
                  ujungnya. Sengaja sesederhana ini — percabangan tiga garis
                  butuh geometri presisi supaya tidak terlihat patah, dan
                  diagram ini tugasnya menjelaskan arah, bukan menggambar
                  skema. */}
              <Connector />

              {/* Titik poros diagram. Dulu ia panel berisi (border, radius, dan
                  tint 4%), jadi kartu kedua di dalam kartu pertama. Sekarang
                  yang membedakannya dari sel caption di atas dan di bawah hanya
                  tipografi: serif 22px, di tengah, dengan dua konektor yang
                  menunjuk ke sini. Hierarkinya tetap, tanpa kotak ketiga. */}
              <div className="py-4 text-center">
                <p className="text-paper-white font-display text-subheading font-normal">
                  {copy.oneTeam}
                </p>
                <p className="text-paper-white/50 mx-auto mt-2 max-w-[38ch] text-caption">
                  {copy.oneTeamNote}
                </p>
              </div>

              <Connector />

              {/* Tiga keluaran: garis atas saja, rata tengah, tanpa kotak.
                  Iramanya sama dengan grid praktik di atas (gap-x-6) supaya
                  kedua deret garis punya jarak yang sama. */}
              <div className="grid grid-cols-3 gap-x-6">
                {copy.outputs.map((output) => (
                  <p
                    key={output}
                    className="border-paper-white/15 text-paper-white border-t pt-3 text-center text-caption"
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
