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

/**
 * Skrip penanda "JavaScript jalan", dikirim sebagai HTML mentah di dalam wadah
 * tersembunyi, bukan sebagai elemen `<script>` di pohon React.
 *
 * Sebagai elemen React, React membangun node `<script>`-nya sendiri setiap kali
 * layout ini dirender ulang di klien — yang terjadi tiap Fast Refresh — lalu
 * memperingatkan "Encountered a script tag while rendering React component".
 * Di dalam `dangerouslySetInnerHTML` browser tetap menjalankannya saat parsing
 * HTML (script dieksekusi parser, bukan saat elemennya ditampilkan), jadi kelas
 * `js` sudah ada sebelum isi body dirender dan tidak ada kedipan, sementara
 * React tidak pernah membuat elemen script.
 *
 * Konsekuensi yang perlu diketahui: kelas `js` ditambahkan ke `<html>` sebelum
 * hidrasi, sedangkan React merender `<html>` dengan prop `className`. Karena
 * itu `<html>` memasang `suppressHydrationWarning` — pintu keluar resmi React
 * untuk atribut yang memang berubah sebelum hidrasi. Tanpa keduanya, setiap
 * load memunculkan peringatan hydration mismatch pada `<html className>`.
 */
const JS_ENABLED_MARKER =
  "<script>document.documentElement.classList.add('js')</script>";

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

  /* `suppressHydrationWarning` wajib ada bersama penanda `js` di bawah; alasan
   * lengkapnya ada di komentar `JS_ENABLED_MARKER`. `data-scroll-behavior`
   * memberi tahu router Next bahwa smooth scroll di sini disengaja, sehingga ia
   * mematikannya sementara saat transisi rute (perilaku Next 15 ke bawah) alih-
   * alih memperingatkan bahwa atributnya tidak ada. */
  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fontVariables} ${localeFontClass[locale]} scroll-smooth motion-reduce:scroll-auto`}
    >
      <body className="bg-paper-white text-ink-black antialiased">
        {/* Menandai bahwa JavaScript jalan, sebelum isi body dirender.
            Reveal, hero, dan panel produk menyembunyikan dirinya lewat gaya
            inline yang di-render server; tanpa tanda ini, pengunjung yang
            mematikan JavaScript atau memblokir skrip melihat halaman kosong.
            Aturan `html:not(.js) [data-reveal]` di globals.css yang memakai
            tanda ini. Wadah `hidden` di bawah ini yang menjalankannya: skripnya
            sudah ada sebelum elemen pertama dirender, jadi tidak ada kedipan,
            dan karena inline ia tidak memerlukan permintaan jaringan, yang
            justru akan gagal persis pada kasus yang ingin ditangani. */}
        <div hidden dangerouslySetInnerHTML={{ __html: JS_ENABLED_MARKER }} />
        {/* Lewati navigasi. Sepuluh kontrol mendahului tautan pertama di hero — logo,
            lima item nav, pemilih bahasa, dan tombol CTA — jadi pengguna
            keyboard dan pembaca layar harus menekan Tab berkali-kali hanya untuk
            sampai ke isi. Tautannya disembunyikan sampai ia difokus, lalu
            muncul sebagai pil di sudut kiri atas, di atas navbar (`z-[60]` vs
            `z-50` milik header).

            Warnanya permukaan terang dengan cincin fokus gelap bawaan situs;
            di sini tidak perlu `.on-dark` karena ia tidak pernah berada di dalam
            band gelap. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:bg-paper-white focus:text-ink-black focus:rounded-buttons focus:fixed focus:start-5 focus:top-3 focus:z-[60] focus:px-4 focus:py-2 focus:text-caption"
        >
          {content.common.skipToContent}
        </a>
        <div className="bg-paper-white flex min-h-dvh flex-col">
          <Navbar locale={locale} content={content} basePath={basePath} />
          {/* `tabIndex={-1}` supaya tautan tadi benar-benar memindahkan fokus ke
              sini, bukan hanya menggulir. Tanpa itu fokus tetap di tautan, dan
              Tab berikutnya kembali ke awal navbar. */}
          <main id="main" tabIndex={-1} className="flex-grow">
            {children}
          </main>
          <Footer content={content} locale={locale} basePath={basePath} />
        </div>
      </body>
    </html>
  );
}
