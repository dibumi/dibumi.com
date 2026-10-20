import React from "react";

/**
 * Judul section yang konsisten di seluruh halaman.
 *
 * Tiga tingkat, semuanya tipografis:
 * - tag kategori 15px ash dengan chevron `›`, mengikuti pola "Product ›" di
 *   referensi. Chevron-nya bagian dari label, bukan ikon terpisah.
 * - judul serif weight 400. Tidak pernah bold: serif yang berbisik, bukan
 *   berteriak, adalah inti dari sistem ini.
 * - deskripsi 17px slate, dibatasi 52ch supaya baris tetap enak dibaca.
 *
 * Tidak ada ikon dekoratif di sini.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={`max-w-[58ch] ${className}`}>
      <p className="text-ash-gray flex items-center gap-1.5 text-caption">
        {eyebrow}
        <span aria-hidden="true" className="rtl:-scale-x-100">
          ›
        </span>
      </p>
      <h2 className="text-ink-black font-display mt-4 text-heading font-normal sm:text-heading-lg">
        {title}
      </h2>
      <p className="text-slate-gray mt-5 max-w-[52ch] text-body">{description}</p>
    </div>
  );
}
