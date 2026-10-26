"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { SiteContent } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero: satu layar penuh, teks saja, di tengah.
 *
 * Riwayatnya panjang. Versi pertama menahan hero selama 180vh dan menggeser
 * kartunya keluar layar — itu keliru, yang terlihat justru kartu menghilang dan
 * sisa gulir yang kosong. Versi berikutnya menaruh empat kartu artifact
 * mengambang di tepi layar, meniru kolase produk steep.app. Itu juga dilepas:
 * kartu-kartu itu mengulang isi section Clients, Services, dan Products, jadi
 * hero berhenti menjadi pernyataan dan berubah jadi ringkasan halaman.
 *
 * Yang tersisa adalah wash gradien sebagai satu-satunya visual, dan tipografi
 * sebagai satu-satunya isi. Itu memang pembagian tugas di referensi: videonya
 * yang bergerak, teksnya yang diam dan besar.
 *
 * Gerak yang ada di sini tiga, dan semuanya halus:
 * 1. Entrance berjenjang. Tiap baris judul muncul dari balik mask (clip-path
 *    yang membuka dari atas ke bawah sambil naik sedikit), lalu paragraf,
 *    tombol, dan baris kredensial menyusul. Mask dipakai, bukan fade biasa,
 *    karena baris yang "terangkat dari balik garis" terbaca sebagai tipografi
 *    yang disusun, bukan teks yang sekadar muncul.
 * 2. Wash yang tidak pernah diam — `hero-drift` di globals.css, 26 detik.
 * 3. Parallax keluar yang DIBATASI: judul naik 40px dan memudar ke 0.35 saat
 *    hero ditinggalkan. Rentangnya pendek karena section-nya hanya 100dvh.
 *
 * Mask-nya `clip-path`, bukan `overflow: hidden`. Dengan leading 1.06 di 100px,
 * kotak baris lebih pendek daripada kotak glyph, jadi `overflow: hidden` akan
 * memotong descender ("p" di "keep") dan harakat Arab. `clip-path` bisa diberi
 * inset negatif, jadi keadaan akhirnya tidak memotong apa pun.
 */
export default function Hero({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  const hero = content.hero;
  const reduce = useReducedMotion();

  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Nilai kecil dan berbatas: hero ini editorial, bukan pertunjukan.
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);

  // `-mt-16` menarik hero ke atas menutupi spacer `h-16` yang dibayarkan
  // Navbar untuk bar fixed-nya, supaya wash hero duduk di balik nav yang masih
  // transparan di puncak halaman. Angka ini satu kontrak dengan empat angka
  // lain, dan kelimanya harus bergerak bersama:
  //   - `h-16` di bar Navbar,
  //   - spacer `h-16` di bawah bar itu,
  //   - `scroll-padding-top: 5rem` di app/globals.css,
  //   - `top-16` sheet mobile Navbar.
  // Kalau tinggi bar berubah dan angka ini tidak, hero menyisakan pita putih
  // di bawah nav atau naik menutupi baris pertamanya. Jangan diubah sendirian.
  return (
    <section
      ref={sectionRef}
      className="relative isolate -mt-16 flex min-h-dvh items-center overflow-hidden"
    >
      <div
        className="hero-atmosphere hero-grain hero-fade absolute inset-0 -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-page px-5 py-28 sm:px-8 lg:py-32">
        <motion.div
          className="mx-auto flex max-w-5xl flex-col items-center gap-7 text-center lg:gap-9"
          style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
        >
          {/* 100px di xl adalah satu-satunya ukuran teks di halaman ini yang
              duduk DI ATAS tangga token: `text-display` berhenti di 90px.
              Itu disengaja dan dipin di DESIGN.reference.md maupun README
              ("a centred serif headline at 100px"), bukan sisa nilai lama.
              Tanpa kartu di kiri dan kanan, judulnya punya seluruh lebar
              kontainer untuk diri sendiri.

              `text-display` tetap tidak dipakai karena dua dari tiga angkanya
              tidak cocok untuk hero: leading 1.3 memberi jarak antar baris yang
              memutus dua baris judul yang seharusnya terbaca sebagai satu blok
              (dan memaksa mask `clip-path` di bawah menutupi celah yang lebih
              lebar), sementara tracking -2.25px hanya benar di 90px. Nilai di
              sini diturunkan dari rasio yang sama dengan token, bukan dikarang:
              -0.025em (rasio tracking display di referensi) x 100px = -2.5px.
              Jadi hurufnya tetap dirapatkan sebanding, tidak lebih rapat.
              Kalau `--text-display` suatu saat bergeser, dua angka ini yang
              harus ikut dihitung ulang dari rasio yang sama.

              Dua baris dipisah elemen sendiri supaya mask-nya bisa berjalan
              berurutan. */}
          {/* Baris aksen dimiringkan dengan `<em>`. Ini keputusan yang disadari,
              bukan kelalaian: Source Serif 4 dimuat dengan style italic, jadi di
              locale Latin hasilnya italic sungguhan.

              Untuk Arab dan Cina hasilnya berbeda. IBM Plex Sans Arabic dan Noto
              Sans SC tidak punya potongan italic, jadi browser membuat oblique
              sintetis dengan menggeser glyph — dan pada aksara Arab shear itu
              merusak bentuk kaligrafi, karena italic bukan konvensi aksara
              tersebut. Sudah dipertimbangkan dan diputuskan untuk dibiarkan:
              mematikan italic lewat `:lang(ar) em { font-style: normal }` akan
              membuat kedua baris judul identik gayanya, dan pembeda miring itulah
              yang memisahkan baris aksen dari baris utama. Oblique sintetis pada
              Cina jauh lebih bisa diterima, jadi menanganinya per aksara juga
              akan membuat dua locale non-Latin tampil berbeda tanpa alasan yang
              terlihat pembaca. */}
          <h1 className="hero-title text-ink-black font-display text-heading font-normal md:text-heading-lg xl:text-[100px] xl:leading-[1.06] xl:tracking-[-2.5px]">
            <MaskLine delay={0}>{hero.titleLead}</MaskLine>
            <MaskLine delay={0.1}>
              <em>{hero.titleAccent}</em>
            </MaskLine>
          </h1>

          <motion.p
            className="text-slate-gray max-w-xl text-body-lg"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.3, ease: EASE }}
          >
            {hero.description}
          </motion.p>

          <motion.div
            className="mt-1 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.4, ease: EASE }}
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

          {/* Baris kredensial: kota/provinsi dan tahun berdiri. Satu-satunya
              bukti pengalaman yang bisa diklaim tanpa mengarang metrik, jadi
              ia duduk di layar pertama, bukan hanya di pita Clients dan footer
              yang jauh di bawah. `-mt-3` memotong gap-7/gap-9 induknya: 16px di
              mobile dan 24px di desktop, cukup dekat untuk terbaca sebagai
              bagian dari blok CTA, bukan paragraf keempat. */}
          <motion.p
            className="text-ash-gray -mt-3 text-caption"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.52, ease: EASE }}
          >
            {hero.established}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Satu baris judul yang terangkat dari balik mask.
 *
 * Inset negatif di keadaan akhir (-40% atas dan bawah, -14% kiri dan kanan)
 * sengaja lebih besar dari glyph box: huruf italic miring keluar dari kotak
 * baris di kedua ujung, dan Arab membawa harakat jauh di atas ascent. Tanpa
 * ruang itu, baris yang sudah "selesai" masih terpotong.
 */
function MaskLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className="block"
      initial={
        reduce ? false : { clipPath: "inset(0% 0% 100% 0%)", y: "16%" }
      }
      animate={{ clipPath: "inset(-40% -14% -40% -14%)", y: "0%" }}
      transition={{ duration: 1.05, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

/**
 * Panah yang meluncur keluar lalu masuk dari sisi lain saat tautan di-hover.
 * Pola `arrow-slide-frames` di referensi: glyph bergerak ke kanan, hilang, dan
 * muncul lagi dari kiri. Dua glyph ditumpuk supaya tidak ada ruang kosong.
 *
 * Arah geser itu fisik, jadi di RTL keduanya harus ditukar: glyph pertama
 * keluar ke kiri (`rtl:group-hover:-translate-x-full`) dan glyph kedua mulai
 * dari kanan (`rtl:translate-x-full`). Tanpa yang terakhir, glyph kedua masuk
 * dari sisi yang baru saja ditinggalkan glyph pertama — panahnya terlihat
 * memantul balik, bukan mengalir ke arah baca. `-scale-x-100` hanya membalik
 * glyph-nya, tidak membalik sumbu gesernya, jadi keduanya perlu ditulis.
 */
function ArrowGlyph() {
  return (
    <span aria-hidden="true" className="relative inline-block h-4 w-4 overflow-hidden">
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-full rtl:-scale-x-100 rtl:group-hover:-translate-x-full">
        →
      </span>
      <span className="absolute inset-0 flex -translate-x-full items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0 rtl:translate-x-full rtl:-scale-x-100 rtl:group-hover:translate-x-0">
        →
      </span>
    </span>
  );
}
