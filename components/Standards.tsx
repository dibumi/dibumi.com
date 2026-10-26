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
            baris pertama tidak perlu border-t ganda.

            Wadah ini `div`, bukan `Reveal`: tiap baris sudah punya `Reveal`
            sendiri, dan `Reveal` di dalam `Reveal` menggandakan animasi masuk —
            opasitas anak dikalikan opasitas induk (turun ke 0.25 di tengah
            jalan) dan translate-nya dijumlahkan (20px, bukan 10px). Satu
            reveal per elemen membuat cascade-nya terbaca seperti yang
            dimaksud. */}
        <div className="border-hairline mt-12 border-t">
          {content.standards.items.map((item, index) => (
            // 0.08s per baris, increment yang sama dengan Highlights dan rail
            // Process. Tiga baris berakhir di 0.16s: cukup untuk terbaca
            // sebagai tabel yang tersusun, bukan sebagai tiga kedipan.
            //
            // `18rem` adalah lebar kolom label, dan satu-satunya angka tata
            // letak di file ini. Ia harus cukup untuk memuat judul terpanjang
            // dalam dua baris pendek tanpa mendorong kolom penjelasan terlalu
            // sempit; `minmax(0,...)` di kedua sisi mencegah kolom melebar
            // melewati isinya saat teks panjang.
            <Reveal
              as="article"
              key={item.title}
              delay={index * 0.08}
              className="border-hairline group grid gap-3 border-b py-8 transition-colors hover:bg-mist-gray sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] sm:gap-10"
            >
              {/* Judul bergeser 4px saat barisnya di-hover — gerak sekecil itu
                  cukup menandai "baris ini hidup" tanpa perlu chevron. Arah
                  geser mengikuti sumbu baca, jadi RTL bergeser ke kiri.

                  Latar hover-nya `mist-gray`, bukan `fog-white`. `fog-white`
                  (#fafafb) di atas putih praktis tidak terlihat — feedback
                  yang tidak bisa dilihat sama saja dengan tidak ada. `mist-gray`
                  adalah permukaan hover yang sudah dipakai seluruh navigasi
                  dan tombol situs, jadi barisnya ikut bahasa yang sama.
                  Geserannya tetap ada sebagai penanda; yang berhenti hanya
                  animasinya, dan itu diurus satu aturan global di
                  globals.css, bukan utility lokal di sini. */}
              <h3 className="text-ink-black text-body-lg text-balance font-medium transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                {item.title}
              </h3>
              <p className="text-slate-gray text-body">{item.description}</p>
            </Reveal>
          ))}
        </div>

        {/* Band komitmen: tiga kolom dengan garis atas masing-masing, pola
            feature grid di referensi tanpa ikon. Band ini tidak lagi punya
            border-t sendiri — kalau ditumpuk dengan border tiap kolom, garisnya
            jadi dobel di baris pertama.

            `delay` 0.16s = dua langkah dari increment 0.08 di atas, bukan angka
            lepas. Band ini satu kelompok, bukan cascade: satu jeda supaya ia
            menyusul baris-baris di atasnya, bukan muncul serentak. */}
        <Reveal delay={0.16} className="mt-12 grid gap-8 sm:grid-cols-3">
          {content.standards.commitments.map((item) => (
            <div key={item.title} className="border-hairline border-t pt-5">
              <h3 className="text-ink-black text-body text-balance font-medium">{item.title}</h3>
              <p className="text-slate-gray mt-2 text-caption">{item.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
