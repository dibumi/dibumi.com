"use client";

import React, { useState } from "react";
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
 * menyusun baris, lebarnya tetap dibatasi `max-w-[130px]`: Google AdSense
 * beraspek 512:74 akan menarik 304px pada tinggi 44px dan mendominasi seluruh
 * strip, sementara logo lain hanya 44–198px.
 *
 * Angka 130 itu sama dengan batas di dinding logo `Clients.tsx`. Dua belas logo
 * yang sama muncul di dua tempat, jadi keduanya tidak boleh punya lebar
 * maksimum berbeda. Nilainya diambil dari sana, tempat yang lebih ketat, bukan
 * dari angka yang lebih longgar di sini, supaya menyeragamkannya tidak
 * menambah risiko luber di mana pun. Yang berbeda di kedua tempat hanya sumbu
 * yang dipatok: di sini tinggi (`h-9`/`md:h-11`, lebarnya mengikuti rasio
 * asli), di sana lebar sel. Keduanya memakai `object-contain`, jadi logo yang
 * kena batas mengecil di dalam kotaknya, bukan tertarik gepeng.
 *
 * Label di atas strip diset sebagai overline, bukan caption biasa: ia duduk di
 * tengah di atas rel yang bergerak ke samping, jadi tanpa uppercase dan
 * tracking lebar ia terbaca sebagai kata yang tersisa, bukan sebagai judul
 * strip. Identitasnya datang dari huruf kapital dan `tracking-widest` (0.1em),
 * bukan dari ukuran: ukurannya `text-caption` 15px, anak tangga terkecil di
 * skala. Versi sebelumnya memakai 13px dengan tracking 0.18em — keduanya nilai
 * di luar skala — supaya label ini lebih kecil dari baris kredensial hero di
 * atasnya. Itu merugikan locale Arab paling parah: di sana tracking dinolkan
 * (lihat di bawah), jadi labelnya tinggal 13px tanpa bantuan apa pun pada
 * aksara yang secara optis memang lebih kecil. 15px masih jauh di bawah tinggi
 * logo, jadi label ini tetap terbaca sebagai penanda, bukan sebagai isi.
 *
 * Tracking-nya dinolkan di locale Arab (`:lang(ar)`, dipasang di
 * app/[locale]/layout.tsx). Letter-spacing memutus sambungan huruf Arab dan
 * merusak harakat, jadi di sana overline-nya hanya mengandalkan uppercase —
 * yang no-op di aksara Arab maupun Mandarin — dan warna abu.
 *
 * Jarak antar kelompok memakai padding inline-end (`pe-*`), bukan `pr-*`:
 * padding fisik kanan jatuh di sisi start saat `dir="rtl"`, dan sambungan antar
 * putaran akan rapat di satu locale saja.
 *
 * ## Kontrol jeda
 *
 * Strip ini bergerak lebih dari lima detik tanpa henti, jadi WCAG 2.2.2 (Pause,
 * Stop, Hide) mewajibkan mekanisme untuk menghentikannya. Sebelumnya hanya ada
 * dua jalur: `group-hover` untuk penunjuk, dan `prefers-reduced-motion` untuk
 * pengunjung yang sudah menyetel preferensi OS. Pengguna keyboard tidak punya
 * keduanya, dan strip ini tidak berisi elemen fokus apa pun sehingga
 * `:focus-within` juga tidak bisa dipakai.
 *
 * Tombolnya duduk di ujung baris label, selalu terlihat dan bukan tersembunyi
 * sampai difokus: pengguna sentuh juga tidak punya hover, dan kontrol yang
 * hanya muncul saat difokus tidak akan pernah ditemukan oleh mereka. Labelnya
 * menyebut aksinya ("Jeda…" / "Lanjutkan…"), bukan keadaannya, jadi tidak perlu
 * `aria-pressed` — pembaca layar sudah mendengar aksi yang akan terjadi.
 *
 * Karena tombol ini butuh state, komponennya jadi client component. HTML yang
 * dirender server tetap sama persis; yang bertambah hanya hidrasi untuk satu
 * tombol.
 */
export default function ClientMarquee({ content }: { content: SiteContent["clients"] }) {
  const [paused, setPaused] = useState(false);

  return (
    // Padding atas dan bawah sengaja sama: strip ini duduk langsung di bawah
    // hero, dan tanpa pt ia menempel ke tepi bawah layar pertama. Nilainya
    // mengikuti skala section lain (py-20 / lg:py-24), bukan pb saja.
    <section className="overflow-hidden py-20 lg:py-24">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-7 md:gap-8">
        {/* Di layar sempit label dan tombol tidak muat sebaris — teks tombolnya
            kalimat penuh di tiap locale, dan memendekkannya jadi "Pause" berarti
            mengembalikan teks Inggris hardcoded ke situs lima bahasa. Jadi di
            bawah `md` keduanya bertumpuk di tengah, dan baru di `md` ke atas
            tombol pindah ke ujung kanan. Grid tiga kolom dengan kolom kiri
            kosong dipakai supaya label tetap di tengah optis ketika tombol
            muncul di kanan; `justify-between` akan menggeser label ke kiri
            sebesar lebar tombol. */}
        <div className="flex w-full flex-col items-center gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <span aria-hidden="true" className="hidden md:block" />
          <p className="text-ash-gray text-center text-caption uppercase tracking-widest [&:lang(ar)]:tracking-normal">
            {content.marqueeLabel}
          </p>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="text-slate-gray hover:text-ink-black text-caption underline decoration-1 underline-offset-4 transition md:justify-self-end"
          >
            {paused ? content.marqueeResume : content.marqueePause}
          </button>
        </div>

        {/* Strip full-bleed: logo boleh keluar dari grid halaman, tapi fade-nya
            menahan tepi sehingga tidak ada logo yang terpotong di tengah.

            Posisi fade-nya logis (`start-0` / `end-0`), arah gradiennya tidak:
            `bg-gradient-to-r` selalu pekat di kiri, apa pun arah tulisnya.
            Jadi di RTL — saat tepi `start` jatuh di kanan — gradien itu
            menggambar pekat di sisi yang salah, dan fade-nya terbalik: pekat
            ke arah tengah, potongan keras di tepi layar. Karena itu tiap fade
            membawa salinan `rtl:` dengan arah yang ditukar, sehingga yang pekat
            selalu sisi luar miliknya sendiri. Yang menang di RTL adalah salinan
            `rtl:` itu karena urutan, bukan bobot: aturan bervarian keluar di
            lapisan `variants`, setelah utility biasa, dan `:where()` di dalam
            varian `rtl` tidak menambah spesifisitas sama sekali.

            Saat prefers-reduced-motion, dua fade ini dimatikan: tanpa gerak
            tidak ada logo yang masuk atau keluar, jadi fade hanya meredupkan
            logo pertama dan terakhir yang sedang diam. */}
        <div className="group relative w-full overflow-hidden">
          <div
            aria-hidden="true"
            className="from-paper-white pointer-events-none absolute inset-y-0 start-0 z-10 w-[20%] bg-gradient-to-r to-transparent rtl:bg-gradient-to-l motion-reduce:hidden"
          />
          <div
            aria-hidden="true"
            className="from-paper-white pointer-events-none absolute inset-y-0 end-0 z-10 w-[20%] bg-gradient-to-l to-transparent rtl:bg-gradient-to-r motion-reduce:hidden"
          />

          {/* Dua kelompok identik: geser -50% menutup satu putaran penuh tanpa
              celah. Padding inline-end di tiap kelompok menjaga jarak logo
              terakhir ke logo pertama putaran berikutnya sama dengan gap-nya.

              Saat prefers-reduced-motion, track yang berhenti di posisi nol
              menyisakan salinan kedua di luar layar sementara salinan pertama
              terpotong di tepi kontainer — sebagian besar logo jadi tidak bisa
              dijangkau sama sekali. Jadi di jalur itu salinan kedua dibuang dan
              kelompok pertama dibiarkan membungkus di dalam lebar kontainer:
              yang tersisa adalah dinding logo statis yang bisa dibaca sampai
              habis. `motion-reduce:` menang atas `w-max`/`shrink-0` di
              sebelahnya karena aturan bervarian keluar setelah utility biasa.

              `pe` dinolkan lewat dua kelas, bukan satu: `md:` didaftarkan
              setelah `motion-reduce:` di lapisan varian, jadi `md:pe-16` akan
              menang atas `motion-reduce:pe-0` di layar lebar. Kalau tidak
              dinolkan, sisa padding 64px itu membuat kelompok yang dibungkus
              meleset 32px dari tengah.

              Jeda dari tombol dan dari hover memakai properti yang sama, jadi
              keduanya tidak bisa saling membatalkan. */}
          <div
            className={`animate-marquee flex w-max items-center group-hover:[animation-play-state:paused] motion-reduce:w-full ${
              paused ? "[animation-play-state:paused]" : ""
            }`}
          >
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                // Salinan kedua disembunyikan dari pembaca layar: namanya sudah
                // dibacakan pada kelompok pertama. Di jalur reduced-motion ia
                // juga disembunyikan secara visual, karena di sana tidak ada
                // putaran yang perlu ditutup.
                aria-hidden={copy === 1 ? true : undefined}
                className={`flex shrink-0 items-center gap-8 pe-8 md:gap-16 md:pe-16 ${
                  copy === 1
                    ? "motion-reduce:hidden"
                    : "motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pe-0 md:motion-reduce:pe-0"
                }`}
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
                        className="h-9 w-auto max-w-[130px] object-contain md:h-11"
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
