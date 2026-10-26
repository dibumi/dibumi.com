import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { LegalContent } from "@/lib/legal";

/**
 * Kerangka halaman legal (privasi, syarat). Satu kolom 40rem karena isinya teks
 * panjang: pada 17px, 640px dikurangi padding menyisakan 576–600px, yaitu
 * sekitar 68–70 karakter per baris — di dalam rentang 65–75ch yang nyaman
 * dibaca. 3xl sebelumnya (768px) menghasilkan ~85 karakter, terlalu lebar untuk
 * paragraf sepanjang ini.
 *
 * Halaman ini dibaca, bukan dijelajahi, jadi tidak ada kartu dan tidak ada
 * elevasi — hanya garis hairline yang memisahkan kepala halaman dari isinya.
 * Panah kembali di tautan atas adalah glyph fungsional, satu-satunya ikon yang
 * tersisa di sini; ia dibalik di locale RTL.
 *
 * Padding shell-nya sama dengan halaman panjang lain (produk, layanan, tim):
 * pt-16/sm:pt-20/lg:pt-24 dan pb-20/lg:pb-24.
 */
export default function LegalLayout({
  locale,
  content,
  isFallback = false,
}: {
  locale: Locale;
  content: LegalContent;
  isFallback?: boolean;
}) {
  const dict = getDictionary(locale);

  return (
    <article className="mx-auto max-w-[40rem] px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:pb-24 lg:pt-24">
      <Link
        href={`/${locale}`}
        className="text-slate-gray hover:text-ink-black mb-8 inline-flex items-center gap-2 text-caption transition"
      >
        <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
        <BrandMark className="text-ink-black h-4 w-4" />
        dibumi.com
      </Link>

      <header className="border-hairline mb-10 border-b pb-8">
        <p className="text-ash-gray text-caption">{dict.footer.legal}</p>
        <h1 className="text-ink-black font-display text-heading font-normal mt-4">
          {content.title}
        </h1>
        <p className="text-ash-gray text-caption mt-3">
          {dict.legal.updated}: {content.updated}
        </p>

        {isFallback && (
          /* Catatan, bukan error: bidang mist tanpa warna aksen dan tanpa ikon,
             supaya terbaca sebagai keterangan dokumen. Versi sebelumnya memakai
             fog + hairline di atas paper-white, yang praktis tidak terlihat. */
          <p className="bg-mist-gray text-slate-gray rounded-smallcards mt-5 px-4 py-3 text-caption">
            {dict.legal.englishOnly}
          </p>
        )}
      </header>

      {/* Intro adalah paragraf pemimpin, jadi naik satu tingkat ke 20px. */}
      <p className="text-ink-black text-body-lg">{content.intro}</p>

      <div className="mt-10 space-y-9">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-ink-black font-display text-subheading font-normal mb-3">
              {section.heading}
            </h2>
            {/* Jarak antar paragraf 16px: pada 17px/1.35 itu ~0.95em, cukup untuk
                memisahkan paragraf tanpa memutus alurnya. 12px sebelumnya hanya
                setengah baris dan membuat blok panjang terbaca sebagai satu
                dinding teks. Jarak antar section (36px) tetap lebih dari dua
                kali jarak antar paragraf, jadi hierarkinya masih terbaca. */}
            <div className="space-y-4">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-slate-gray text-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
