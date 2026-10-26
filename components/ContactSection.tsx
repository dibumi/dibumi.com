import React from "react";
import Reveal from "@/components/motion/Reveal";
import { contactEmail, contactWhatsapp, whatsappLink } from "@/lib/contact";
import type { SiteContent } from "@/lib/i18n";

/**
 * Section penutup: satu blok terpusat, bukan dua kolom.
 *
 * Referensinya menutup halaman dengan CTA besar di tengah, di atas bidang yang
 * sedikit berbeda dari section sebelumnya. Di sini bentuknya sama: judul serif,
 * satu paragraf, sepasang pill, lalu fakta operasional sebagai catatan kecil.
 * Semua terpusat supaya mata berhenti di satu titik — penutup halaman tidak
 * perlu lagi dibagi kiri/kanan seperti section yang menjelaskan sesuatu.
 *
 * Latar memakai fog (satu langkah di atas putih) plus satu radial peach tipis di
 * belakang judul. Ini gema dari wash hero, bukan pengulangannya: wash hero
 * penuh lima gradient, di sini hanya satu bercak lembut supaya halaman terasa
 * kembali ke tempat awalnya tanpa mengulang pertunjukan yang sama. Bercak itu
 * memakai var(--color-blush-peach), bukan hex yang ditulis ulang di sini.
 *
 * Padding-nya py-20 lg:py-28, sama dengan section sebelumnya (Standards). Dua
 * pita terakhir halaman jadi satu irama; sebelumnya section ini memakai
 * py-24 lg:py-32 dan terasa seperti lompatan tepat di penutup.
 *
 * Hierarki dua jalur tetap: WhatsApp adalah pill terisi ink, email adalah pill
 * bergaris. Yang membedakan tingkat, bukan warna — peach tetap tidak dipakai
 * sebagai permukaan komponen di section ini.
 *
 * Nomor, email, dan URL wa.me dibaca dari lib/contact.ts, jadi tidak ada nilai
 * kontak yang ditulis ulang di komponen ini.
 *
 * Tanpa state, jadi server component; gerak masuknya dititipkan ke Reveal.
 */
export default function ContactSection({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  const contact = content.contact;
  const whatsappUrl = whatsappLink(contactWhatsapp.number, contact.whatsappMessage);

  // basePath dipakai untuk id judul, supaya setiap locale punya id yang unik dan
  // section ini bisa dinamai lewat aria-labelledby tanpa bertabrakan kalau
  // markup dua locale pernah hidup berdampingan.
  const titleId = `${basePath.replace(/\//g, "") || "home"}-contact-title`;

  /* Dua pill dengan geometri sama supaya terbaca sebagai pasangan, bukan dua
     tombol berbeda tingkat. Yang membedakan hanya isi dan garisnya. */
  const filledPill =
    "bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 inline-flex h-12 w-full items-center justify-center gap-2 px-6 text-body transition sm:w-auto";
  const ghostPill =
    "border-ink-black text-ink-black rounded-buttons hover:bg-mist-gray inline-flex h-12 w-full items-center justify-center gap-2 border px-6 text-body transition sm:w-auto";

  return (
    <section
      id="contact"
      aria-labelledby={titleId}
      className="bg-fog-white relative isolate overflow-hidden py-20 lg:py-28"
    >
      {/* Satu radial peach di belakang judul. -z-10 masih di atas latar section
          karena section ini isolate, jadi bercaknya tidak bocor ke section lain
          dan tidak menutupi teks. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_20%,var(--color-blush-peach)_0%,rgba(251,225,209,0)_70%)]"
      />

      <div className="mx-auto max-w-page px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Judul serif weight 400. Sama seperti SectionHeading: serif tidak
              pernah bold di sistem ini. Lebar dibatasi 24ch supaya barisnya
              pecah di titik yang enak dibaca, bukan mengikuti lebar container. */}
          <Reveal className="w-full">
            <h2
              id={titleId}
              className="text-ink-black font-display text-heading mx-auto max-w-[24ch] font-normal sm:text-heading-lg"
            >
              {contact.title}
            </h2>
            <p className="text-slate-gray text-body-lg mx-auto mt-6 max-w-[46ch] text-center">
              {contact.description}
            </p>
          </Reveal>

          {/* Jalur aksi. Di ponsel keduanya melebar penuh dan ditumpuk, karena
              dua pill sebaris di layar sempit memaksa label terpotong. */}
          <Reveal
            delay={0.08}
            className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={filledPill}
            >
              <span>WhatsApp</span>
              <Arrow />
            </a>
            <a href={`mailto:${contactEmail}`} className={ghostPill}>
              <span>{contact.emailLabel}</span>
              <Arrow />
            </a>
          </Reveal>

          {/* Fakta operasional dan nilai kontak: tidak bisa diklik, jadi turun
              jadi caption abu-abu di bawah aksi, dipisah titik tengah. Nilai
              kontak dikunci ltr supaya tidak terbalik di locale Arab; tabular
              menjaga angka nomor tetap rata. */}
          <Reveal delay={0.16} className="mt-8 flex flex-col items-center gap-2">
            <p className="text-slate-gray text-caption flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
              <span>{contact.hours}</span>
              <span aria-hidden="true">·</span>
              <span>{contact.location}</span>
            </p>
            <p className="text-slate-gray text-caption flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
              <span className="tabular" dir="ltr">
                {contactWhatsapp.display}
              </span>
              <span aria-hidden="true">·</span>
              <span dir="ltr">{contactEmail}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Panah teks untuk affordance tautan. Dibalik di RTL supaya tetap menunjuk maju. */
function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
      →
    </span>
  );
}
