import React from "react";
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
 * Sumbu horizontal memakai properti logis (start/end, ps/pe) karena halaman ini
 * juga dibaca dalam locale RTL.
 */
export default function WorkflowMethodology({
  content,
}: {
  content: SiteContent["workflow"];
}) {
  const lastIndex = content.steps.length - 1;

  return (
    <section id="process" className="py-20 lg:py-24">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="relative mt-16">
          {/* Rail vertikal untuk mobile. Mulai di pusat node pertama (top-3),
              bukan di tepi container, supaya garis tidak menyembul di atasnya. */}
          <div
            className="bg-hairline absolute bottom-6 start-[5px] top-3 w-0.5 lg:hidden"
            aria-hidden="true"
          />
          {/* Rail horizontal untuk desktop: hanya sepanjang titik terakhir, jadi
              w-3/4 dan bukan lebar penuh — garis yang berhenti di luar kolom
              keempat akan menggantung tanpa tujuan. */}
          <div
            className="bg-hairline absolute start-0 top-[5px] hidden h-0.5 w-3/4 lg:block"
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-4">
            {content.steps.map((step, index) => (
              <li key={step.title} className="relative ps-7 lg:ps-0">
                <span
                  className={`bg-paper-white absolute start-0 top-1.5 h-3 w-3 rounded-full border-2 lg:static lg:top-auto lg:mb-4 lg:block ${
                    index === lastIndex ? "border-slate-gray" : "border-ink-black"
                  }`}
                  aria-hidden="true"
                />

                <p className="text-ash-gray tabular text-caption">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="text-ink-black mt-2 text-body-lg font-medium">{step.title}</h3>
                <p className="text-slate-gray mt-2 text-body">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
