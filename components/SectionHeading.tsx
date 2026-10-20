import React from "react";

/**
 * Judul section yang konsisten di seluruh halaman.
 *
 * Tiga tingkat, semuanya tipografis:
 * - tag kategori 15px ash, tanpa huruf besar dan tanpa tracking. Di DESIGN.md
 *   ini "Tag / Category Label": penanda yang mengelompokkan tanpa bobot visual.
 * - judul serif weight 400. Tidak pernah bold: serif yang berbisik, bukan
 *   berteriak, adalah inti dari sistem ini.
 * - deskripsi 17px slate, dibatasi 52ch supaya baris tetap enak dibaca.
 *
 * Tidak ada ikon di sini. Ikon dekoratif sudah dihapus dari seluruh situs;
 * yang tersisa hanya glyph fungsional (chevron, panah, pemilih bahasa).
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
      <p className="text-ash-gray text-caption">{eyebrow}</p>
      <h2 className="text-ink-black font-display mt-4 text-heading font-normal sm:text-heading-lg">
        {title}
      </h2>
      <p className="text-slate-gray mt-5 max-w-[52ch] text-body">{description}</p>
    </div>
  );
}
