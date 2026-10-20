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
    <section id="process" className="py-20 lg:py-36">
      <div className="column-guides mx-auto max-w-page px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={content.workflow.eyebrow}
            title={content.workflow.title}
            description={content.workflow.description}
            cta={{ label: content.common.learnMore, href: `${basePath}#standards` }}
          />
        </Reveal>

        <div className="relative mt-16">
          {/* Rail vertikal untuk mobile. Mulai di pusat node pertama (top-3),
              bukan di tepi container, supaya garis tidak menyembul di atasnya.
              `animate-sweep` men-scaleY garis dari 0.3 ke 1, jadi rail terbaca
              sedang digambar saat section masuk — bukan muncul mendadak.
              motion-reduce: matikan, karena gerak ini murni dekoratif. */}
          <div
            className="bg-hairline animate-sweep absolute bottom-6 start-[5px] top-3 w-0.5 origin-left motion-reduce:animate-none lg:hidden"
            aria-hidden="true"
          />
          {/* Rail horizontal untuk desktop: hanya sepanjang titik terakhir, jadi
              w-3/4 dan bukan lebar penuh — garis yang berhenti di luar kolom
              keempat akan menggantung tanpa tujuan.
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
              // Jeda 0.09s per langkah: cukup untuk membaca 01→04 sebagai
              // urutan, tidak cukup lambat untuk terasa seperti loading.
              <Reveal
                as="li"
                key={step.title}
                delay={index * 0.09}
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
