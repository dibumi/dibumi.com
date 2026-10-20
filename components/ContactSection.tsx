import React from "react";
import { contactEmail, contactWhatsapp, whatsappLink } from "@/lib/contact";
import type { SiteContent } from "@/lib/i18n";

/**
 * Section penutup: klaim di kiri, satu kartu peach berisi dua jalur aksi di
 * kanan, fakta operasional di band bawah.
 *
 * Kartu peach adalah SATU-SATUNYA kartu berwarna di seluruh halaman. DESIGN.md
 * membatasinya satu per halaman supaya tetap terbaca sebagai penekanan
 * editorial, bukan sebagai latar. Karena itu section ini wajib tetap
 * bg-paper-white: peach hanya bekerja di atas putih, bukan di atas mist atau
 * fog.
 *
 * Di dalam kartu peach semua teks dan garis memakai sienna-brown; slate, ash,
 * dan ink dilarang di sana karena akan memecah efek "tinta di atas kertas
 * kraft". Satu-satunya pengecualian adalah pill WhatsApp yang terisi ink
 * dengan teks paper, sesuai pasangan pill di DESIGN.md.
 *
 * Nomor, email, dan URL wa.me dibaca dari lib/contact.ts, jadi tidak ada nilai
 * kontak yang ditulis ulang di komponen ini.
 *
 * Tanpa state, jadi server component.
 */
export default function ContactSection({
  content,
}: {
  content: SiteContent["contact"];
}) {
  const whatsappUrl = whatsappLink(contactWhatsapp.number, content.whatsappMessage);

  /* Dua pill dengan geometri sama supaya terbaca sebagai pasangan, bukan dua
     tombol berbeda tingkat. Yang membedakan hanya isi dan warnanya. */
  const filledPill =
    "bg-ink-black text-paper-white rounded-buttons inline-flex h-12 w-full items-center justify-between px-5 text-body transition hover:bg-ink-black/90";
  const ghostPill =
    "border-sienna-brown text-sienna-brown rounded-buttons hover:bg-sienna-brown/5 inline-flex h-12 w-full items-center justify-between border px-5 text-body transition";

  return (
    <section id="contact" className="bg-paper-white py-20 lg:py-24">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start">
          <div>
            {/* Judul serif weight 400. Sama seperti SectionHeading: serif tidak
                pernah bold di sistem ini. */}
            <h2 className="text-ink-black font-display text-heading font-normal sm:text-heading-lg">
              {content.title}
            </h2>
            <p className="text-slate-gray mt-5 max-w-[52ch] text-body">
              {content.description}
            </p>
          </div>

          {/* Kartu peach: tanpa border, tanpa shadow. Kartu konten selalu datar;
              elevasi hanya milik floating artifact di hero. */}
          <div className="bg-blush-peach rounded-cards p-8">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={filledPill}
                >
                  <span>WhatsApp</span>
                  <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                    →
                  </span>
                </a>
                {/* Nilai kontak dikunci ltr supaya tidak terbalik di locale Arab;
                    tabular menjaga angka tetap rata. */}
                <p className="text-sienna-brown tabular text-body" dir="ltr">
                  {contactWhatsapp.display}
                </p>
                <p className="text-sienna-brown/80 text-caption">{content.whatsappHint}</p>
              </div>

              <div className="flex flex-col gap-2">
                <a href={`mailto:${contactEmail}`} className={ghostPill}>
                  <span>{content.emailLabel}</span>
                  <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                    →
                  </span>
                </a>
                <p className="text-sienna-brown text-body break-words" dir="ltr">
                  {contactEmail}
                </p>
                <p className="text-sienna-brown/80 text-caption">{content.emailHint}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fakta operasional: tidak bisa diklik, jadi dipisah dari dua aksi di
            atas dan turun jadi label + nilai, tanpa ikon. */}
        <dl className="border-hairline mt-20 grid gap-10 border-t pt-12 sm:grid-cols-2">
          <div>
            <dt className="text-ash-gray text-caption">{content.hoursLabel}</dt>
            <dd className="text-ink-black mt-2 text-body">{content.hours}</dd>
            <dd className="text-slate-gray mt-1 text-caption">{content.hoursNote}</dd>
          </div>

          <div>
            <dt className="text-ash-gray text-caption">{content.locationLabel}</dt>
            <dd className="text-ink-black mt-2 text-body">{content.location}</dd>
            <dd className="text-slate-gray mt-1 text-caption">{content.locationNote}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
