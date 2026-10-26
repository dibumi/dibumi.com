import { IBM_Plex_Sans_Arabic, Inter, Noto_Sans_SC, Source_Serif_4 } from "next/font/google";

/*
 * Empat wajah huruf situs ini, di satu tempat.
 *
 * Dipakai dua root yang berbeda: `app/[locale]/layout.tsx` (root layout
 * sebenarnya) dan `app/global-not-found.tsx` (yang melewati layout, jadi harus
 * memuat fontnya sendiri). Sebelumnya keduanya mendefinisikan ulang wajah yang
 * sama; menyimpannya di sini berarti menambah atau mengganti wajah cukup di satu
 * file.
 *
 * Signifier dan Sohne adalah lisensi komersial, jadi substitusinya Source Serif 4
 * dan Inter. Source Serif 4 dimuat sebagai variable font supaya display tetap
 * bisa duduk di weight 400 di semua ukuran, dan italic-nya tersedia untuk frasa
 * miring di judul hero.
 */
export const display = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Source Serif 4 dan Inter tidak punya glyph Arab dan CJK, jadi dua locale ini
// memakai font pendamping agar teks tetap terbaca.
export const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});

export const chinese = Noto_Sans_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chinese",
});

/** Kelas yang harus dipasang di `<html>` supaya keempat variabel font tersedia. */
export const fontVariables = `${display.variable} ${sans.variable} ${arabic.variable} ${chinese.variable}`;
