import React from "react";
import SectionHeading from "@/components/SectionHeading";
import type { SiteContent } from "@/lib/i18n";

/**
 * Section Standards: tiga standar sebagai baris hairline, bukan kartu.
 *
 * Halaman ini sudah memakai grid tiga kartu di Highlights dan Services. Kalau
 * standar diulang dengan bentuk yang sama, ketiga section itu jadi satu pola
 * yang monoton. Baris bertumpuk memberi keluarga tata letak yang lain: judul di
 * kolom kiri yang sempit, penjelasan di kolom kanan, dan garis rambut sebagai
 * satu-satunya pemisah.
 *
 * Tidak ada ikon di sini. Ikon dekoratif sudah dihapus dari seluruh situs, jadi
 * judulnya yang memikul hierarki, bukan chip di atasnya.
 */
export default function Standards({ content }: { content: SiteContent["standards"] }) {
  return (
    <section id="standards" className="bg-fog-white py-20 lg:py-24">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="border-hairline mt-16 border-t">
          {content.items.map((item) => (
            <article
              key={item.title}
              className="border-hairline grid gap-3 border-b py-8 sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] sm:gap-10"
            >
              <h3 className="text-ink-black text-body-lg font-medium">{item.title}</h3>
              <p className="text-slate-gray text-body">{item.description}</p>
            </article>
          ))}
        </div>

        {/* Band komitmen di bawah tetap tiga kolom, tapi tanpa chip ikon: yang
            tersisa hanya judul 17px dan penjelasan 15px, jadi bobotnya lebih
            ringan daripada baris standar di atasnya dan tidak bersaing. */}
        <div className="border-hairline mt-12 grid gap-10 border-t pt-12 sm:grid-cols-3">
          {content.commitments.map((item) => (
            <div key={item.title}>
              <h3 className="text-ink-black text-body font-medium">{item.title}</h3>
              <p className="text-slate-gray mt-2 text-caption">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
