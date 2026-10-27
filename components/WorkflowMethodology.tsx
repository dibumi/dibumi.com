import React from "react";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { SiteContent } from "@/lib/i18n";

/**
 * Section Process: empat langkah pada satu rail.
 *
 * Rail-nya satu garis hairline, bukan gradien: sistem ini tidak punya warna
 * fungsional selain peach, dan peach disimpan untuk satu kartu editorial.
 * Node terakhir dibedakan lewat slate, bukan lewat warna — tanda akhir urutan
 * cukup dibaca dari bobot garis.
 *
 * Nomor urut 01–04 menggantikan chip ikon. Ikon dekoratif sudah dihapus dari
 * seluruh situs; urutan langkah memang informasi, jadi yang ditampilkan adalah
 * angkanya, bukan gambar yang harus ditebak artinya.
 *
 * Section ini menyusul satu band gelap, jadi ia sengaja tidak punya latar
 * sendiri: kanvas putih polos setelah band gelap itulah "reset" yang membuat
 * mata berhenti sejenak sebelum membaca prosesnya.
 *
 * Sumbu horizontal memakai properti logis (start/end, ps/pe) karena halaman ini
 * juga dibaca dalam locale RTL.
 */
export default function WorkflowMethodology({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  const lastIndex = content.workflow.steps.length - 1;

  return (
    <section id="process" className="py-20 lg:py-28">
      {/* `column-guides` menggambar tiga hairline di padding atas section, bukan
          setinggi isi: grid empat kolom di bawah hanya menyelaraskan garis
          dengan gutter pada lebar tertentu, dan di antaranya garisnya menembus
          teks. Alasan lengkapnya di globals.css. */}
      <div className="column-guides mx-auto max-w-page px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={content.workflow.eyebrow}
            title={content.workflow.title}
            description={content.workflow.description}
            cta={{ label: content.workflow.ctaLabel, href: `${basePath}#standards` }}
          />
        </Reveal>

        <div className="relative mt-12">
          {/* Rail vertikal untuk mobile. Mulai di pusat node pertama (top-3),
              bukan di tepi container, supaya garis tidak menyembul di atasnya.
              `start-[5px]` adalah pusat node, bukan angka bulat: node 12px
              (`h-3 w-3`) berpusat di 6px, dan rail ini 2px (`w-0.5`), jadi
              tepinya jatuh di 5px. `start` dipakai supaya di RTL railnya
              mengikuti sisi baca.

              `animate-sweep` men-scaleY garis dari 0.3 ke 1, jadi rail terbaca
              sedang digambar saat section masuk — bukan muncul mendadak.
              Origin-nya `top`, bukan `left`: scaleY hanya menyentuh sumbu Y,
              jadi komponen horizontal pada origin tidak berpengaruh sama
              sekali, dan `top` membuat garisnya tumbuh ke bawah melewati
              langkah 01→04 seperti sedang ditulis. `origin-left` yang lama
              tumbuh dari tengah, arah yang tidak berarti apa-apa di sini.
              motion-reduce: matikan, karena gerak ini murni dekoratif. */}
          <div
            className="bg-hairline animate-sweep absolute bottom-6 start-[5px] top-3 w-0.5 origin-top lg:hidden"
            aria-hidden="true"
          />
          {/* Rail horizontal untuk desktop: hanya sepanjang titik terakhir, jadi
              w-3/4 dan bukan lebar penuh — garis yang berhenti di luar kolom
              keempat akan menggantung tanpa tujuan.
              `top-[5px]` mengulang aritmetika node yang sama: pusat node 12px
              ada di 6px, rail 2px, jadi tepinya 5px.
              Keyframe `sweep` adalah scaleY; pada garis horizontal ia justru
              menebalkan/menipiskan garisnya, bukan memanjangkannya, jadi efek
              itu tidak dipakai di sini. Rail-nya cukup di-reveal sebagai satu
              elemen, searah dengan node pertama yang muncul lebih dulu. */}
          <Reveal
            className="absolute start-0 top-[5px] hidden h-0.5 w-3/4 lg:block"
            delay={0.08}
          >
            <div className="bg-hairline h-full w-full" aria-hidden="true" />
          </Reveal>

          <ol className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-4">
            {content.workflow.steps.map((step, index) => (
              // Jeda 0.08s per langkah, increment yang sama dengan kartu
              // Highlights dan baris Standards: satu ritme untuk semua daftar
              // yang di-reveal. Empat langkah berakhir di 0.24s, masih di dalam
              // durasi 0.6s, jadi urutannya terbaca sebagai satu sapuan.
              <Reveal
                as="li"
                key={step.title}
                delay={index * 0.08}
                className="group relative ps-7 lg:ps-0"
              >
                {/* Node ikut membesar saat barisnya di-hover (CSS murni, tanpa
                    scroll listener) supaya rail terasa hidup saat dibaca satu
                    per satu. Yang di-hover adalah barisnya, bukan titiknya:
                    target 12px terlalu kecil untuk kursor. */}
                <span
                  className={`bg-paper-white absolute start-0 top-1.5 h-3 w-3 rounded-full border-2 transition-transform duration-500 group-hover:scale-125 lg:static lg:top-auto lg:mb-4 lg:block ${
                    index === lastIndex ? "border-slate-gray" : "border-ink-black"
                  }`}
                  aria-hidden="true"
                />

                <p className="text-ash-gray tabular text-caption">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="text-ink-black mt-2 text-body-lg font-medium">{step.title}</h3>
                <p className="text-slate-gray mt-2 text-body">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
