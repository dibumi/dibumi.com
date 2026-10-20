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
 *    yang membuka dari atas ke bawah sambil naik sedikit), lalu paragraf dan
 *    tombol menyusul. Mask dipakai, bukan fade biasa, karena baris yang
 *    "terangkat dari balik garis" terbaca sebagai tipografi yang disusun, bukan
 *    teks yang sekadar muncul.
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
          {/* 100px di xl, bukan 92px: tanpa kartu di kiri dan kanan, judulnya
              punya seluruh lebar kontainer untuk diri sendiri. Dua baris
              dipisah elemen sendiri supaya mask-nya bisa berjalan berurutan. */}
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
