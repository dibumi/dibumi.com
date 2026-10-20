import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * 404. Teks bahasa Inggris karena file ini berada di luar segmen locale dan
 * tidak punya akses ke kamus; tautan di bawahnya yang menawarkan versi
 * Indonesia.
 *
 * Halamannya sendiri adalah satu kolom teks di tengah: tag 404, judul serif,
 * satu paragraf, lalu sepasang pill. Tidak ada ikon dekoratif — panah di pill
 * pertama adalah glyph fungsional "kembali", dibalik di locale RTL.
 */
export default function NotFound() {
  return (
    <main className="bg-paper-white flex min-h-dvh items-center justify-center px-5 py-20">
      <div className="max-w-md text-center">
        <p className="text-ash-gray text-caption">404</p>
        <h1 className="text-ink-black font-display text-heading font-normal sm:text-heading-lg mt-3">
          This page does not exist
        </h1>
        <p className="text-slate-gray text-body mx-auto mt-3 max-w-md">
          The link may be outdated. Head back to the home page, or read the site in another
          language.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/en"
            className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 inline-flex h-11 items-center justify-center gap-2 px-5 text-caption transition"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
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
  );
}
