"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { clients } from "@/lib/clients";
import { ngambegLogoUrl } from "@/lib/products";
import type { SiteContent } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

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
 *    lalu empat kartu, masing-masing dengan jeda sendiri. Kartu masuk dengan
 *    sedikit putaran supaya terasa "diletakkan", bukan "muncul".
 * 2. Hanyutan sangat lambat setelah masuk (animate-float / animate-float-slow),
 *    dua fase berlawanan supaya kartu tidak bergerak serempak.
 * 3. Parallax keluar yang DIBATASI: saat hero ditinggalkan, judul naik 40px
 *    dan memudar, kartu ikut naik sedikit. Karena section-nya hanya 100dvh,
 *    rentangnya pendek — tidak ada ruang gulir yang kosong.
 *
 * Empat kartu artifact, komposisi yang sama dengan referensi: tabel wilayah
 * kiri atas, daftar layanan kanan atas, kartu statistik kiri bawah, kartu
 * Ngambeg kanan bawah, plus satu avatar bubble. Isinya tetap data nyata situs
 * ini. Elemen grafisnya cuma satu: garis gestural di kartu statistik.
 * DESIGN.md menyebutnya "a gestural line, not a data dashboard", jadi garis
 * itu digambar sebagai goresan tanpa sumbu, tanpa angka, dan digambar dengan
 * animasi pathLength saat kartu masuk.
 *
 * Seluruh lapisan artifact disembunyikan dari pembaca layar: isinya sudah
 * tercantum lengkap di section Clients, Services, dan Products. Karena itu
 * tidak ada tautan di dalam lapisan ini — tautan yang tersembunyi di dalam
 * aria-hidden akan hilang dari urutan navigasi keyboard.
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

  return (
    <section
      ref={sectionRef}
      className="relative isolate -mt-16 flex min-h-dvh items-center overflow-hidden lg:-mt-[4.5rem]"
    >
      <div
        className="hero-atmosphere hero-grain hero-fade absolute inset-0 -z-10"
        aria-hidden="true"
      />

      {/* Lapisan artifact: selebar section, diposisikan dari tepi layar supaya
          kartu-kartu menjorok sedikit dan dipotong di sana — potongan UI yang
          mengapung, bukan kartu yang tersusun rapi di dalam kontainer. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
        <Artifact
          position="start-[-1rem] top-[12%] w-64"
          floatClass="animate-float"
          delay={0.35}
          rotate={-2}
          parallax={artifactY}
          surface="bg-paper-white shadow-subtle-3 rounded-elevatedcards w-full p-4"
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
        </Artifact>

        <Artifact
          position="end-[-1.5rem] top-[10%] w-60"
          floatClass="animate-float-slow"
          delay={0.5}
          rotate={2}
          parallax={artifactY}
          surface="bg-paper-white shadow-subtle-3 rounded-elevatedcards w-full p-5"
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
        </Artifact>

        <Artifact
          position="bottom-[9%] start-[2%] w-56"
          floatClass="animate-float [animation-delay:1.5s]"
          delay={0.65}
          rotate={-1.5}
          parallax={artifactY}
          surface="bg-paper-white shadow-subtle-3 rounded-elevatedcards w-full p-5"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-ink-black tabular text-subheading font-normal">
              {clients.length}
            </span>
            <span className="text-ash-gray text-caption">{content.clients.eyebrow}</span>
          </div>

          {/* Baris delta: DESIGN.md menyebut kartu statistik punya "a delta
              line (↑ 5.5x vs last week)". Yang kita punya bukan angka
              mingguan, tapi tahun kami mulai — jujur dan tetap informatif. */}
          <p className="text-slate-gray mt-0.5 flex items-center gap-1 text-caption">
            <span aria-hidden="true" className="text-sienna-brown">
              ↑
            </span>
            {content.footer.since}
          </p>

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
        </Artifact>

        {/* Kartu Ngambeg: satu pintu keluar ke katalog game dan aplikasi.
            Referensi punya kartu composer di posisi ini; kita tidak punya
            produk chat, jadi yang mengisi slot itu adalah produk yang benar
            ada milik kita. */}
        <Artifact
          position="bottom-[11%] end-[6%] w-72"
          floatClass="animate-float-slow [animation-delay:2.1s]"
          delay={0.8}
          rotate={1.5}
          parallax={artifactY}
          surface="bg-paper-white shadow-subtle-3 rounded-elevatedcards w-full p-5"
        >
          <div className="flex items-center gap-3">
            <span className="bg-mist-gray flex h-10 w-10 shrink-0 items-center justify-center rounded-smallcards">
              <img
                src={ngambegLogoUrl}
                alt=""
                width={28}
                height={28}
                loading="lazy"
                className="h-7 w-7 object-contain"
              />
            </span>
            <div className="min-w-0">
              <p className="text-ink-black truncate text-caption font-medium">
                {content.products.groups.ngambeg.label}
              </p>
              <p className="text-ash-gray truncate text-caption">
                {content.products.groups.ngambeg.brand}
              </p>
            </div>
          </div>
        </Artifact>

        {/* Avatar bubble: satu orang sungguhan di balik studio ini. Lingkaran
            40px dengan monogram dan kursor kecil di tepinya — motif "seseorang
            sedang bekerja di sini" yang dipakai referensi. */}
        <div className="animate-float [animation-delay:2.6s] absolute bottom-[7%] start-[16%] motion-reduce:animate-none">
          <motion.div style={reduce ? undefined : { y: artifactY }}>
            <motion.span
              className="bg-blush-peach text-sienna-brown relative flex h-10 w-10 items-center justify-center rounded-full text-caption font-medium"
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
            >
              FN
              <svg
                viewBox="0 0 10 10"
                aria-hidden="true"
                className="fill-ink-black absolute -end-1 -top-1 h-2.5 w-2.5"
              >
                <path d="M0 0 L10 0 L10 10 Z" />
              </svg>
            </motion.span>
          </motion.div>
        </div>
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
            transition={{ duration: 0.7, ease: EASE }}
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
            transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
          >
            {hero.titleLead}
            <br />
            <em>{hero.titleAccent}</em>
          </motion.h1>

          <motion.p
            className="text-slate-gray max-w-xl text-body-lg"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
          >
            {hero.description}
          </motion.p>

          <motion.div
            className="mt-1 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
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
 * Satu kartu artifact.
 *
 * Tiga lapis, masing-masing dengan satu transform:
 * 1. Lapis luar: hanyutan CSS (`animate-float`). Keyframe CSS menulis
 *    `transform`, jadi tidak boleh ada yang lain di elemen yang sama.
 * 2. Lapis tengah: parallax scroll lewat MotionValue.
 * 3. Lapis dalam: entrance (opacity, geser, putar).
 *
 * Kalau ketiganya digabung di satu elemen, transform saling menimpa:
 * keyframe CSS menang atas inline style, dan motion menghitung ulang target
 * dari `initial` setiap kali parallax berubah — hasilnya kartu berkedip dan
 * server rendering tidak cocok dengan hidrasi.
 */
function Artifact({
  position,
  surface,
  delay,
  rotate,
  parallax,
  floatClass,
  children,
}: {
  position: string;
  surface: string;
  delay: number;
  rotate: number;
  parallax: MotionValue<number>;
  floatClass: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`absolute ${floatClass} ${position} motion-reduce:animate-none`}>
      <motion.div style={reduce ? undefined : { y: parallax }}>
        <motion.figure
          className={surface}
          initial={reduce ? false : { opacity: 0, y: 28, rotate }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay, ease: EASE }}
        >
          {children}
        </motion.figure>
      </motion.div>
    </div>
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
