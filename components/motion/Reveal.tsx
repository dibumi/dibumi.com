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
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
