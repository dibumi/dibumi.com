import React from "react";
import Reveal from "@/components/motion/Reveal";
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
 * Latarnya sengaja dibiarkan putih. Referensi menaruh feature grid seperti ini
 * di atas band gelap, tapi band gelap itu milik section lain; di sini bobotnya
 * dipindahkan ke tipografi dan hairline supaya tidak bersaing dengan band itu.
 *
 * Tidak ada ikon di sini. Ikon dekoratif sudah dihapus dari seluruh situs, jadi
 * judulnya yang memikul hierarki, bukan chip di atasnya.
 */
export default function Standards({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  return (
    <section id="standards" className="py-20 lg:py-28">
      <div className="column-guides mx-auto max-w-page px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={content.standards.eyebrow}
            title={content.standards.title}
            description={content.standards.description}
            cta={{ label: content.common.learnMore, href: `${basePath}#contact` }}
          />
        </Reveal>

        {/* Baris standar. Wadahnya sendiri yang menyimpan garis atas, jadi
            baris pertama tidak perlu border-t ganda. */}
        <Reveal className="border-hairline mt-12 border-t">
          {content.standards.items.map((item, index) => (
            // 0.07s per baris: ritmenya lebih rapat daripada rail proses,
            // karena baris-baris ini dibaca sebagai satu tabel, bukan urutan.
            <Reveal
              as="article"
              key={item.title}
              delay={index * 0.07}
              className="border-hairline group grid gap-3 border-b py-8 transition-colors hover:bg-fog-white sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] sm:gap-10"
            >
              {/* Judul bergeser 4px saat barisnya di-hover — gerak sekecil itu
                  cukup menandai "baris ini hidup" tanpa perlu chevron. Arah
                  geser mengikuti sumbu baca, jadi RTL bergeser ke kiri. */}
              <h3 className="text-ink-black text-body-lg font-medium transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                {item.title}
              </h3>
              <p className="text-slate-gray text-body">{item.description}</p>
            </Reveal>
          ))}
        </Reveal>

        {/* Band komitmen: tiga kolom dengan garis atas masing-masing, pola
            feature grid di referensi tanpa ikon. Band ini tidak lagi punya
            border-t sendiri — kalau ditumpuk dengan border tiap kolom, garisnya
            jadi dobel di baris pertama. */}
        <Reveal delay={0.15} className="mt-12 grid gap-8 sm:grid-cols-3">
          {content.standards.commitments.map((item) => (
            <div key={item.title} className="border-hairline border-t pt-5">
              <h3 className="text-ink-black text-body font-medium">{item.title}</h3>
              <p className="text-slate-gray mt-2 text-caption">{item.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
