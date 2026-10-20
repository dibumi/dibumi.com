import React from "react";
import Link from "next/link";

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
 * Opsi `cta` menambah pil abu "Learn more →" di bawah deskripsi, persis seperti
 * di referensi: setiap section punya satu pintu keluar, dan pintunya berupa
 * pil abu penuh, bukan ghost berborder. Tanpa prop ini, section tidak berubah —
 * dipakai hanya di section yang memang punya tujuan berikutnya.
 *
 * Tidak ada ikon dekoratif di sini.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  cta,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description: string;
  /** Tujuan opsional: label + href. Menambah pil abu di bawah deskripsi. */
  cta?: { label: string; href: string };
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

      {cta ? (
        <Link
          href={cta.href}
          className="bg-mist-gray text-ink-black hover:bg-smoke-gray/40 mt-7 inline-flex h-11 items-center gap-2 rounded-buttons px-5 text-body transition"
        >
          {cta.label}
          <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
            →
          </span>
        </Link>
      ) : null}
    </div>
  );
}
