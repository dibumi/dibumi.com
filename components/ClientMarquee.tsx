import React from "react";
import { clients } from "@/lib/clients";
import type { SiteContent } from "@/lib/i18n";

/**
 * Marquee logo klien.
 *
 * Referensinya memakai satu baris logo yang bergulir terus di bawah hero, dengan
 * fade putih di kedua tepi supaya logo tidak muncul dan hilang secara mendadak.
 * Mekanismenya CSS murni: dua salinan daftar duduk berdampingan sebagai dua
 * kelompok, lalu track-nya digeser sejauh setengah lebar total dengan durasi 50
 * detik linear. Karena salinan kedua identik, animasi yang mengulang tidak
 * pernah terlihat melompat.
 *
 * Strukturnya tiga lapis: label, strip ber-fade, lalu track. Fade-nya 20% lebar
 * layar di tiap tepi — lebih lebar dari versi pertama (12%), karena logo kini
 * tampil berwarna dan berukuran lebih besar, jadi tepi keras lebih terlihat.
 *
 * Marquee berhenti saat kursor di atasnya, jadi pengunjung bisa membaca nama
 * yang lewat tanpa mengejarnya. Saat prefers-reduced-motion aktif, animasinya
 * mati dan daftar berhenti sebagai baris statis.
 *
 * Logo memakai <img> biasa, bukan next/image: separuhnya SVG pihak ketiga
 * berukuran kecil, dan tidak perlu mengaktifkan dangerouslyAllowSVG.
 * Wap2Cash tidak punya aset logo, jadi namanya ditulis sebagai wordmark.
 *
 * Logo tampil berwarna penuh. Versi sebelumnya meredupkannya ke grayscale
 * dengan hover yang mengembalikan warna; itu dilepas karena satu-satunya alasan
 * peredupan adalah menjaga palet akromatik, dan baris logo adalah tempat merek
 * asing memang boleh muncul sebagai dirinya sendiri. Karena warnanya kini ikut
 * menyusun baris, lebarnya tetap dibatasi `max-w-[140px]`: Google AdSense
 * beraspek 512:74 akan menarik 304px pada tinggi 44px dan mendominasi seluruh
 * strip, sementara logo lain hanya 44–198px.
 *
 * Label di atas strip diset sebagai overline, bukan caption biasa: ia duduk di
 * tengah di atas rel yang bergerak ke samping, jadi tanpa uppercase dan
 * tracking lebar ia terbaca sebagai kata yang tersisa, bukan sebagai judul
 * strip. Ukurannya 13px, di bawah `caption` 15px di skala, karena tugasnya
 * menandai, bukan dibaca.
 *
 * Tracking-nya dinolkan di locale Arab (`:lang(ar)`, dipasang di
 * app/[locale]/layout.tsx). Letter-spacing memutus sambungan huruf Arab dan
 * merusak harakat, jadi di sana overline-nya hanya mengandalkan uppercase —
 * yang no-op di aksara Arab maupun Mandarin — dan warna abu.
 *
 * Jarak antar kelompok memakai padding inline-end (`pe-*`), bukan `pr-*`:
 * padding fisik kanan jatuh di sisi start saat `dir="rtl"`, dan sambungan antar
 * putaran akan rapat di satu locale saja.
 */
export default function ClientMarquee({ content }: { content: SiteContent["clients"] }) {
  return (
    // Padding atas dan bawah sengaja sama: strip ini duduk langsung di bawah
    // hero, dan tanpa pt ia menempel ke tepi bawah layar pertama. Nilainya
    // mengikuti skala section lain (py-20 / lg:py-24), bukan pb saja.
    <section className="overflow-hidden py-20 lg:py-24">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-7 md:gap-8">
        <p className="text-ash-gray text-center text-[13px] uppercase tracking-[0.18em] [&:lang(ar)]:tracking-normal">
          {content.marqueeLabel}
        </p>

        {/* Strip full-bleed: logo boleh keluar dari grid halaman, tapi fade-nya
            menahan tepi sehingga tidak ada logo yang terpotong di tengah. */}
        <div className="group relative w-full overflow-hidden">
          <div
            aria-hidden="true"
            className="from-paper-white pointer-events-none absolute inset-y-0 start-0 z-10 w-[20%] bg-gradient-to-r to-transparent"
          />
          <div
            aria-hidden="true"
            className="from-paper-white pointer-events-none absolute inset-y-0 end-0 z-10 w-[20%] bg-gradient-to-l to-transparent"
          />

          {/* Dua kelompok identik: geser -50% menutup satu putaran penuh tanpa
              celah. Padding inline-end di tiap kelompok menjaga jarak logo
              terakhir ke logo pertama putaran berikutnya sama dengan gap-nya. */}
          <div className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                // Salinan kedua disembunyikan dari pembaca layar: namanya sudah
                // dibacakan pada kelompok pertama.
                aria-hidden={copy === 1 ? true : undefined}
                className="flex shrink-0 items-center gap-8 pe-8 md:gap-16 md:pe-16"
              >
                {clients.map((client) => (
                  <li key={client.name} className="flex shrink-0 items-center justify-center">
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={client.name}
                        width={client.width}
                        height={client.height}
                        loading="lazy"
                        className="h-9 w-auto max-w-[140px] object-contain md:h-11"
                      />
                    ) : (
                      <span className="text-slate-gray text-body font-medium uppercase tracking-wide">
                        {client.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
