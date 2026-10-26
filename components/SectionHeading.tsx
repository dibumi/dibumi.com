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
 * Dua batas lebar itu (`58ch` di pembungkus, `52ch` di deskripsi) bukan bug
 * yang saling menimpa, dan jangan "dirapikan" jadi satu nilai:
 *
 * - `ch` diukur dari font-size elemen yang memakai kelasnya. Pembungkus ini
 *   mewarisi 17px dari body, dan deskripsinya juga 17px, jadi kedua batas itu
 *   berada di satuan yang sama dan bisa dibandingkan langsung: judul boleh
 *   selebar 58 karakter, paragraf 52.
 * - Itu memang pembagian peran yang lazim di halaman editorial. Judul 44–64px
 *   memuat 58 karakter dalam dua baris tanpa terasa padat, sementara paragraf
 *   17px pada 58 karakter mulai melelahkan mata. Paragraf yang lebih sempit
 *   membuat mata turun lebih pendek per baris.
 *
 * Konsekuensinya: batas dalam selalu menang untuk paragraf, dan itu
 * disengaja — bukan sisa dari nilai yang lupa dihapus.
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
      {/* `text-balance` hanya di judul. Paragraf di bawahnya sudah ditangani
          `text-wrap: pretty` dari globals.css; menaruh `balance` di keduanya
          membuat baris paragraf ditarik-tarik demi rata, padahal `pretty`
          cukup memindahkan satu kata supaya tidak ada anak yatim. */}
      <h2 className="text-ink-black font-display mt-4 text-balance text-heading font-normal sm:text-heading-lg">
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
