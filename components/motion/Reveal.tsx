"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Reveal saat masuk viewport.
 *
 * Padanan `fade-in-y` di referensi: elemen muncul dari 10px di bawah dengan
 * opasitas 0 ke 1. Durasi dan easing-nya sengaja pendek (0.6s, ease-out) karena
 * halaman ini punya banyak section; gerak yang lebih lambat membuat scroll
 * terasa berat.
 *
 * `once: true` supaya elemen tidak berkedip lagi saat digulir balik — reveal
 * yang berulang terbaca sebagai bug, bukan sebagai animasi.
 *
 * Saat prefers-reduced-motion aktif, `initial` dimatikan dan durasinya nol:
 * elemen langsung tampil. Durasinya ikut dinolkan, bukan hanya `initial`,
 * karena preferensi itu baru terbaca setelah mount — kalau hanya `initial`
 * yang dimatikan, elemen sudah sempat dirender pada opasitas 0 dan transisi
 * 0.6 detik tetap dijalankan saat masuk viewport.
 */
/**
 * Easing untuk setiap reveal.
 *
 * Nilai ini sama dengan `cubic-bezier(0.22, 1, 0.36, 1)` — ease-out-quint —
 * yang juga dipakai di empat tempat lain: `tailwind.config.ts` (animasi
 * `fade-up` dan `panel-in`), `components/Hero.tsx`, dan `components/Products.tsx`.
 * Semuanya menyalin angka yang sama.
 *
 * Disimpan sebagai konstanta bernama di sini, bukan ditulis ulang di dalam
 * `transition`, karena file ini pemilik gerak masuk situs: kalau kurvanya
 * berubah, ini titik yang harus dibaca lebih dulu. Menjadikannya ekspor
 * bersama untuk file lain sengaja belum dilakukan — file ini `"use client"`,
 * jadi nilai yang diekspor dari sini akan sampai ke server component sebagai
 * client reference, bukan sebagai array. Kalau nanti keempat salinan itu mau
 * disatukan, rumah yang benar adalah modul biasa tanpa `"use client"`.
 */
const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  /** Jeda dalam detik, untuk efek bertahap pada daftar atau grid. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduce ? 0 : 0.6,
        delay: reduce ? 0 : delay,
        ease: REVEAL_EASE,
      }}
    >
      {children}
    </Component>
  );
}
