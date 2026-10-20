import React from "react";
import type { SiteContent } from "@/lib/i18n";

/**
 * Tiga kartu tenang di antara hero dan section layanan.
 *
 * Semuanya datar: mist-gray, radius cards, tanpa border, tanpa shadow. Kartu
 * konten di sistem ini tidak pernah ber-elevasi — shadow hanya milik floating
 * artifact di hero.
 *
 * Section ini tidak punya padding bawah sendiri: jarak ke section Services
 * diambil dari padding atas Services, supaya ritmenya tetap 80px dan tidak
 * dijumlahkan dua kali.
 *
 * Ikon dekoratif sudah dihapus. Penanda kategorinya murni tipografis (tag ash
 * 15px di atas kartu), sesuai komponen "Tag / Category Label" di DESIGN.md:
 * penanda yang mengelompokkan tanpa bobot visual. Urutan 01/02/03 yang dibawa
 * teks tag sudah cukup menjadi penanda urutan, jadi tidak perlu glyph.
 */
export default function Highlights({ content }: { content: SiteContent["highlights"] }) {
  return (
    <section className="mx-auto max-w-page px-5 sm:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {content.map((item) => (
          <article
            key={item.title}
            className="bg-mist-gray rounded-cards flex flex-col gap-6 p-8"
          >
            <p className="text-ash-gray text-caption">{item.tag}</p>
            <div>
              <h2 className="text-ink-black text-body-lg font-medium">{item.title}</h2>
              <p className="text-slate-gray mt-2 text-body">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
