"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { clients } from "@/lib/clients";
import type { SiteContent } from "@/lib/i18n";

/**
 * Hero: satu layar penuh, tanpa pin.
 *
 * Versi sebelumnya menahan hero selama 180vh sambil menggeser kartunya keluar
 * layar. Itu keliru: yang terlihat justru kartu menghilang dan sisa gulir yang
 * kosong. Di referensi, gulir di dalam hero tidak menggeser kartu — yang
 * terjadi adalah kartu-kartu itu MASUK dengan urutan tertentu, lalu halaman
 * lanjut. Gerak yang terasa mahal ada di entrance, bukan di scroll.
 *
 * Jadi di sini:
 * 1. Entrance berjenjang saat halaman dibuka — pill, judul, paragraf, tombol,
 *    lalu tiga kartu, masing-masing dengan jeda sendiri. Kartu masuk dengan
 *    sedikit putaran supaya terasa "diletakkan", bukan "muncul".
 * 2. Hanyutan sangat lambat setelah masuk (animate-float / animate-float-slow),
 *    dua fase berlawanan supaya ketiga kartu tidak bergerak serempak.
 * 3. Parallax keluar yang DIBATASI: saat hero ditinggalkan, judul naik 40px
 *    dan memudar, kartu ikut naik sedikit. Karena section-nya hanya 100dvh,
 *    rentangnya pendek — tidak ada ruang gulir yang kosong.
 *
 * Isi kartu tetap data nyata situs ini. Satu-satunya elemen grafis adalah garis
 * gestural di kartu statistik: DESIGN.md menyebutnya "a gestural line, not a
 * data dashboard", jadi garis itu digambar sebagai goresan tanpa sumbu, tanpa
 * angka, dan digambar dengan animasi pathLength saat kartu masuk.
 *
 * Atmosfer wash ada di app/globals.css (.hero-atmosphere, .hero-grain,
 * .hero-fade) karena terdiri dari lima gradient bertumpuk.
 */
export default function Hero({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  const hero = content.hero;
  const tableClients = clients.slice(0, 5);
  const reduce = useReducedMotion();

  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Semua nilai kecil dan berbatas: hero ini editorial, bukan pertunjukan.
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);
  const artifactY = useTransform(scrollYProgress, [0, 1], [0, -22]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-dvh items-center overflow-hidden"
    >
      <div
        className="hero-atmosphere hero-grain hero-fade absolute inset-0 -z-10"
        aria-hidden="true"
      />

      {/* Lapisan artifact: selebar section, diposisikan dari tepi layar supaya
          dua kartu menjorok sedikit dan dipotong di sana — potongan UI yang
          mengapung, bukan kartu yang tersusun rapi di dalam kontainer. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
        <motion.figure
          className="bg-paper-white shadow-subtle-3 rounded-elevatedcards animate-float absolute start-[-1rem] top-[16%] w-64 p-4 motion-reduce:animate-none"
          style={reduce ? undefined : { y: artifactY }}
          initial={reduce ? false : { opacity: 0, y: 28, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
        >
          <table className="w-full border-collapse">
            <tbody>
              {tableClients.map((client) => (
                <tr key={client.name} className="border-hairline border-b last:border-b-0">
                  <td className="w-7 py-2.5 pe-1.5 align-middle">
                    <img
                      src={`/flags/${client.region}.svg`}
                      alt=""
                      width={16}
                      height={11}
                      loading="lazy"
                      className="h-2.5 w-4 rounded-[2px] object-cover"
                    />
                  </td>
                  <td className="text-ink-black truncate py-2.5 pe-2 align-middle text-caption">
                    {client.name}
                  </td>
                  <td className="text-ash-gray tabular py-2.5 align-middle text-caption uppercase">
                    {client.region}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.figure>

        <motion.figure
          className="bg-paper-white shadow-subtle-3 rounded-elevatedcards animate-float-slow absolute end-[-1.5rem] top-[14%] w-60 p-5 motion-reduce:animate-none"
          style={reduce ? undefined : { y: artifactY }}
          initial={reduce ? false : { opacity: 0, y: 28, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
        >
          <ol className="space-y-3">
            {content.services.map((service, index) => (
              <li key={service.title} className="flex items-baseline gap-3">
                <span className="text-ash-gray tabular shrink-0 text-caption">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-ink-black leading-snug text-caption">
                  {service.title}
                </span>
              </li>
            ))}
          </ol>
        </motion.figure>

        <motion.figure
          className="bg-paper-white shadow-subtle-3 rounded-elevatedcards animate-float absolute bottom-[12%] start-[3%] w-56 p-5 [animation-delay:1.5s] motion-reduce:animate-none"
          style={reduce ? undefined : { y: artifactY }}
          initial={reduce ? false : { opacity: 0, y: 28, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease }}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-ink-black tabular text-subheading font-normal">
              {clients.length}
            </span>
            <span className="text-ash-gray text-caption">{content.clients.eyebrow}</span>
          </div>

          {/* Garis gestural: satu goresan sienna tanpa sumbu dan tanpa angka.
              Digambar dengan pathLength supaya terlihat "ditarik" saat masuk. */}
          <svg viewBox="0 0 160 36" className="mt-3 h-9 w-full" aria-hidden="true" fill="none">
            <motion.path
              d="M2 30 C 22 30, 30 22, 46 21 S 72 25, 88 17 S 118 12, 132 7 S 150 4, 158 3"
              stroke="#5d2a1a"
              strokeWidth="1.25"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.9, ease: "easeInOut" }}
            />
          </svg>

          <div className="border-hairline mt-3 flex items-baseline gap-2 border-t pt-3">
            <span className="text-ink-black tabular text-subheading font-normal">
              {content.services.length}
            </span>
            <span className="text-ash-gray text-caption">
              {content.servicesSection.eyebrow}
            </span>
          </div>
        </motion.figure>
      </div>

      <div className="mx-auto w-full max-w-page px-5 py-24 sm:px-8 lg:py-28">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center gap-7 text-center"
          style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
        >
          {/* Pil abu penuh, tanpa border dan tanpa blur. Referensi memakai
              permukaan abu solid di atas wash; border hairline bikin pil itu
              terbaca sebagai kotak, bukan sebagai label. */}
          <motion.p
            className="bg-mist-gray text-slate-gray rounded-buttons inline-flex flex-wrap items-center justify-center gap-x-2 px-4 py-1.5 text-caption"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {hero.chips.map((chip, index) => (
              <React.Fragment key={chip}>
                {index > 0 && (
                  <span aria-hidden="true" className="text-ash-gray">
                    ·
                  </span>
                )}
                <span>{chip}</span>
              </React.Fragment>
            ))}
          </motion.p>

          {/* 92px, bukan 100px seperti referensi: baris "We keep it running."
              lebih panjang daripada headline referensi, dan 100px memecahnya
              jadi tiga baris. Kontainer diperlebar ke max-w-4xl supaya ukuran
              itu muat tanpa wrap. */}
          <motion.h1
            className="hero-title text-ink-black font-display text-heading font-normal md:text-heading-lg xl:text-[92px] xl:leading-[1.08] xl:tracking-[-2px]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease }}
          >
            {hero.titleLead}
            <br />
            <em>{hero.titleAccent}</em>
          </motion.h1>

          <motion.p
            className="text-slate-gray max-w-xl text-body-lg"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
          >
            {hero.description}
          </motion.p>

          <motion.div
            className="mt-1 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
          >
            <Link
              href={`${basePath}#contact`}
              className="bg-ink-black text-paper-white rounded-buttons group inline-flex h-12 w-full items-center justify-center gap-2 px-6 text-body transition hover:bg-ink-black/90 sm:w-auto"
            >
              {hero.primaryCta}
              <ArrowGlyph />
            </Link>
            <Link
              href={`${basePath}#services`}
              className="text-ink-black group inline-flex h-12 w-full items-center justify-center gap-2 px-2 text-body transition hover:underline sm:w-auto"
            >
              {hero.secondaryCta}
              <ArrowGlyph />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Panah yang meluncur keluar lalu masuk dari sisi lain saat tautan di-hover.
 * Pola `arrow-slide-frames` di referensi: glyph bergerak ke kanan, hilang, dan
 * muncul lagi dari kiri. Dua glyph ditumpuk supaya tidak ada ruang kosong.
 */
function ArrowGlyph() {
  return (
    <span aria-hidden="true" className="relative inline-block h-4 w-4 overflow-hidden">
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-full rtl:-scale-x-100 rtl:group-hover:-translate-x-full">
        →
      </span>
      <span className="absolute inset-0 flex -translate-x-full items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0 rtl:-scale-x-100 rtl:group-hover:translate-x-0">
        →
      </span>
    </span>
  );
}
