import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fontVariables } from "@/lib/fonts";
import { getDictionary, getDirection, isLocale, locales, type Locale } from "@/lib/i18n";

/*
 * Root layout aplikasi ini berada di dalam segmen dinamis `[locale]`, bukan di
 * `app/layout.tsx`.
 *
 * Alasannya `lang` dan `dir`: sebelumnya `<html lang="en">` ditulis mati di root
 * layout dan hanya diperbaiki setelah hidrasi oleh sebuah komponen klien.
 * Artinya HTML yang keluar dari server selalu berbahasa Inggris tanpa arah, untuk
 * kelima locale. Crawler yang tidak menjalankan JavaScript melihat `/ar` sebagai
 * halaman Inggris LTR, dan sebelum hidrasi selesai halaman Arab memang tampil
 * dengan arah yang salah.
 *
 * Root layout hanya bisa tahu locale kalau ia berada di bawah segmen yang
 * membawa locale itu. Next mengizinkan root layout di bawah dynamic segment,
 * dan segmen itulah yang menjadi "root parameter": karena root layout duduk di
 * `app/[locale]/`, `locale` bisa dibaca dari Server Component mana pun lewat
 * `next/root-params`, tanpa dioper sebagai prop. Jadi `<html lang dir>` sekarang
 * benar sejak byte pertama.
 *
 * Konsekuensi yang perlu diketahui saat mengubah file ini:
 * - `app/page.tsx` tidak bisa dipertahankan (ia akan menggantung tanpa root
 *   layout), jadi redirect `/` -> `/en` pindah ke `next.config.ts`.
 * - Rute yang tidak cocok dengan apa pun ditangani `app/global-not-found.tsx`,
 *   bukan `app/not-found.tsx`: file itu harus membawa `<html>` sendiri karena
 *   tidak ada layout di atas `app/` yang bisa membungkusnya.
 * - `app/api/*` dan `sitemap.ts` tidak terpengaruh: keduanya tidak butuh layout.
 */

/**
 * Locale Arab dan Cina tidak punya glyph di dua wajah utama, jadi keduanya
 * memakai keluarga pendamping sebagai dasar, bukan sebagai fallback per glyph.
 */
const localeFontClass: Record<Locale, string> = {
  en: "font-sans",
  id: "font-sans",
  pl: "font-sans",
  ar: "font-ar",
  zh: "font-zh",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Hanya lima locale di atas yang merupakan rute yang sah.
 *
 * Tanpa ini, segmen `[locale]` menelan path apa pun: `/tidak-ada` masuk sebagai
 * locale "tidak-ada", layout memanggil `notFound()`, dan 404-nya jatuh ke batas
 * error React — Next mengirim `<html id="__next_error__">` lalu merendernya di
 * klien. Artinya 404 tanpa `lang`/`dir` yang baru muncul setelah JavaScript
 * jalan. Dengan `false`, path seperti itu tidak cocok dengan rute mana pun, jadi
 * yang menjawab `app/global-not-found.tsx` dan dirender penuh di server.
 */
export const dynamicParams = false;

/*
 * Metadata bawaan. Setiap halaman menimpanya lewat `generateMetadata`-nya
 * sendiri (judul, deskripsi, canonical, dan og:locale per locale), jadi yang di
 * sini hanya fondasi yang dipakai kalau ada halaman yang lupa.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://dibumi.com"),
  title: "dibumi.com | App & Software Production Studio in Lamongan",
  description:
    "A software production studio in Lamongan, Indonesia. Custom software, Android apps, company websites, and server operations.",
  keywords: [
    "software production studio",
    "software house lamongan",
    "custom software development indonesia",
    "android app development indonesia",
    "android webview services",
    "server and devops management",
    "company profile website",
    "it consultant indonesia",
    "dibumi",
    "dibumi.com",
    "ngambeg cyber media",
  ],
  authors: [{ name: "dibumi.com — App & Software Production Studio" }],
  alternates: {
    canonical: "/en",
    languages: {
      ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])),
      "x-default": "/en",
    },
  },
  openGraph: {
    title: "dibumi.com | App & Software Production Studio",
    description:
      "A strategic technology partner based in Lamongan, Indonesia: custom software, Android apps, WebView builds for the Play Store, corporate websites, and enterprise-grade server operations.",
    url: "https://dibumi.com",
    siteName: "dibumi.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dibumi.com | App & Software Production Studio",
    description:
      "Digital engineering you can rely on: custom software, Android, WebView, corporate websites, and server management.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getDictionary(locale);
  const basePath = `/${locale}`;
  const dir = getDirection(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontVariables} ${localeFontClass[locale]} scroll-smooth motion-reduce:scroll-auto`}
    >
      <body className="bg-paper-white text-ink-black antialiased">
        <div className="bg-paper-white flex min-h-dvh flex-col">
          <Navbar locale={locale} content={content} basePath={basePath} />
          <main className="flex-grow">{children}</main>
          <Footer content={content} locale={locale} basePath={basePath} />
        </div>
      </body>
    </html>
  );
}
