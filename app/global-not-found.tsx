import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";

/**
 * 404 untuk rute yang tidak dikenal.
 *
 * Ini pengganti `app/not-found.tsx`, yang tidak bisa dipertahankan: sejak root
 * layout pindah ke `app/[locale]/layout.tsx`, tidak ada layout di atas `app/`
 * untuk membungkusnya. `global-not-found.tsx` adalah jalur yang disediakan Next
 * untuk keadaan itu. Ia melewati layout sepenuhnya, jadi ia harus membawa
 * `<html>`, `<body>`, stylesheet, dan font-nya sendiri — itulah kenapa
 * `globals.css` dan `lib/fonts` diimpor di sini, bukan diwarisi.
 *
 * Ia juga yang menjawab slug karangan seperti `/en/services/tidak-ada`, karena
 * `dynamicParams = false` di rute `[slug]` membuat URL itu berhenti di lapisan
 * routing. Satu file ini menangani kedua bentuk 404, dan keduanya dirender penuh
 * di server — tidak ada halaman kosong yang menunggu JavaScript.
 *
 * Teksnya berbahasa Inggris karena file ini berada di luar segmen locale dan
 * tidak punya akses ke kamus; dua tautan di bawah yang menawarkan versi
 * Indonesia. Halaman ini juga tidak membawa Navbar dan Footer: satu kolom teks di
 * tengah, tag 404, judul serif, satu paragraf, lalu sepasang pill. Panah di pill
 * pertama adalah glyph fungsional "kembali", bukan hiasan.
 *
 * Karena selalu dirender di luar segmen locale, `dir`-nya selalu ltr dan varian
 * `rtl:` pada panah tidak pernah aktif. Varian itu tetap dipertahankan supaya
 * file ini benar kalau suatu saat dipindah ke dalam `[locale]`.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={`${fontVariables} font-sans scroll-smooth`}>
      <body className="bg-paper-white text-ink-black antialiased">
        <main className="bg-paper-white flex min-h-dvh items-center justify-center px-5 py-20">
          <div className="max-w-md text-center">
            <p className="text-ash-gray text-caption">404</p>
            <h1 className="text-ink-black font-display text-heading font-normal sm:text-heading-lg mt-3">
              This page does not exist
            </h1>
            <p className="text-slate-gray text-body mt-3">
              The link may be outdated. Head back to the home page, or read the site in another
              language.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/en"
                className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 inline-flex h-11 items-center justify-center gap-2 px-5 text-caption transition"
              >
                <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                Back to English
              </Link>
              <Link
                href="/id"
                className="border-ink-black text-ink-black rounded-buttons hover:bg-mist-gray inline-flex h-11 items-center justify-center border px-5 text-caption transition"
              >
                Versi Indonesia
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
