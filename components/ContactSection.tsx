import React from "react";
import Reveal from "@/components/motion/Reveal";
import { contactEmail, contactWhatsapp, whatsappLink } from "@/lib/contact";
import type { SiteContent } from "@/lib/i18n";

/**
 * Section penutup: satu pernyataan, dua jalan keluar.
 *
 * Sebelumnya section ini adalah blok terpusat di atas fog: judul, deskripsi,
 * dua pill, lalu jam operasional, alamat, nomor telepon, dan email sebagai
 * caption. Tiga masalah membuatnya dirombak. Pertama, footer tepat di bawahnya
 * mengulang nomor, email, dan alamat yang sama, jadi satu layar memuat dua
 * salinan daftar kontak. Kedua, siluet judul-tengah + dua pill adalah bentuk
 * paling umum untuk penutup halaman, sementara seluruh section lain di halaman
 * ini punya komposisi sendiri. Ketiga, nilai kontak yang dicetak itu tidak
 * menambah jalan keluar apa pun: yang bisa diklik tetap dua tautan.
 *
 * Sekarang section ini adalah pita peach penuh, sejajar dengan pita Clients di
 * tengah halaman, dan hanya membawa judul, deskripsi, dan dua aksi teks. Nilai
 * kontak (jam, alamat, nomor, email) hidup di footer, tempat orang mencarinya
 * setelah selesai membaca. Yang tersisa di sini adalah keputusan, bukan
 * direktori.
 *
 * Semua teks memakai sienna, termasuk deskripsi dan aksi. Di atas peach, abu-abu
 * dingin memutus efek kertas dan membuat pita ini terbaca sebagai panel abu-abu
 * yang kebetulan berwarna. Aturan yang sama dipakai pita Clients, dan karena
 * itu SectionHeading tidak dipakai di sini: ia membawa slate dan ash.
 *
 * Tidak ada pill. Dua aksi yang sejajar dan setara tidak butuh bentuk tombol
 * untuk dibedakan tingkatnya; garis bawah hairline sudah cukup sebagai
 * penanda tautan, dan panah tipografis menanggung afordansinya. Hover
 * menggeser panah, bukan mengubah latar.
 *
 * Nomor WhatsApp dan alamat surel tetap dibaca dari lib/contact.ts, jadi tidak
 * ada nilai kontak yang ditulis ulang di komponen ini.
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

  /* Satu geometri untuk kedua aksi: tinggi 48px (batas tap target), label
     sejajar, panah di ujung baris. Di ponsel barisnya melebar penuh, dipisah
     hairline, dan panah didorong ke tepi kanan; di `sm` ke atas keduanya kembali
     selebar isinya, duduk berdampingan, dan garis bawah pindah ke label supaya
     menempel di huruf alih-alih menggantung di dasar kotak 48px. */
  const actionLink =
    "group text-sienna-brown border-sienna-brown/40 inline-flex min-h-12 items-center justify-between gap-4 border-b text-body-lg transition-colors sm:justify-start sm:gap-3 sm:border-b-0";
  const actionLabel =
    "transition-colors sm:border-sienna-brown/40 sm:border-b sm:pb-0.5 sm:group-hover:border-sienna-brown";

  return (
    <section
      id="contact"
      aria-labelledby={titleId}
      className="bg-blush-peach py-24 lg:py-32"
    >
      <div className="mx-auto max-w-page px-5 sm:px-8">
        {/* Dua kolom, bukan tumpukan tengah: judul memegang sisi kiri selebar
            matanya, deskripsi dan aksi mengisi sisi kanan. Di layar sempit
            urutannya kembali satu kolom. */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <Reveal>
            <p className="text-sienna-brown/80 flex items-center gap-1.5 text-caption">
              {content.nav.contact}
              <span aria-hidden="true" className="rtl:-scale-x-100">
                ›
              </span>
            </p>
            {/* Judul serif weight 400, seperti seluruh sistem ini: serif tidak
                pernah bold. `16ch` memaksa pecah dua baris di desktop tanpa
                mengikat titik pecahnya ke satu locale. */}
            <h2
              id={titleId}
              className="text-sienna-brown font-display mt-4 max-w-[16ch] text-heading font-normal sm:text-heading-lg"
            >
              {contact.title}
            </h2>
          </Reveal>

          {/* `lg:pt-10` menyelaraskan baris pertama deskripsi dengan judul,
              bukan dengan overline di kolom kiri: 24px tinggi baris overline
              ditambah 16px jarak ke judul. */}
          <Reveal delay={0.08} className="lg:pt-10">
            <p className="text-sienna-brown/80 max-w-[42ch] text-body-lg">
              {contact.description}
            </p>

            <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={actionLink}
              >
                <span className={actionLabel}>WhatsApp</span>
                <Arrow />
              </a>
              <a href={`mailto:${contactEmail}`} className={actionLink}>
                <span className={actionLabel}>{contact.emailLabel}</span>
                <Arrow />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Panah teks untuk affordance tautan.
 *
 * `-scale-x-100` di RTL membalik glyph sekaligus sistem koordinat elemen, jadi
 * geseran `translate-x-1` saat hover tetap terbaca sebagai gerak ke arah baca:
 * ke kanan di LTR, ke kiri di RTL. Tidak perlu override arah terpisah.
 */
function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100"
    >
      →
    </span>
  );
}