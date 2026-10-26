import React from "react";
import Reveal from "@/components/motion/Reveal";
import type { SiteContent } from "@/lib/i18n";

/**
 * Tiga kartu fase kerja, tepat di bawah Products.
 *
 * Bentuknya mengikuti baris kartu USP di referensi: tiga kartu tinggi beraspek
 * 3/4 di desktop, bertinggi sama dan sejajar tepi. Tidak ada skala bawaan —
 * zoom hanya terjadi pada kartu yang sedang ditunjuk kursor. Kartu itu membesar
 * sedikit, naik ke atas tetangganya, dan menggeser permukaannya, jadi "menunjuk"
 * terasa seperti mengangkat satu kartu dari barisnya, bukan seperti tiga kartu
 * yang memang beda ukuran. Di bawah `md` baris itu jadi carousel snap: satu
 * kartu per layar, digeser jari, tanpa tombol dan tanpa JavaScript — karena itu
 * komponen ini tetap server component.
 *
 * Isi kartu dibagi tiga seperti di referensi: tag di atas, satu visual besar di
 * tengah, judul dan deskripsi di bawah. Slot visualnya diisi ordinal serif
 * raksasa — 01, 02, 03 — bukan ilustrasi. Referensi menaruh SVG botol parfum,
 * balok lego, dan roket di slot itu; ketiganya aset produk Steep sendiri dan
 * tidak berarti apa pun untuk Discover/Build/Operate. Menggambar penggantinya
 * berarti mengarang gambar, dan aturan halaman ini melarangnya, jadi yang
 * bekerja adalah angka — bahan yang sudah dipakai rail Process dan nomor kartu
 * versi sebelumnya.
 *
 * Teks kartu selalu terlihat. Di referensi isinya disembunyikan (opacity-0)
 * sampai kursor menyentuh kartu; untuk section yang tugasnya menjelaskan cara
 * kerja, itu menahan informasi di balik mouse dan membuatnya tak pernah terbaca
 * di layar sentuh.
 *
 * Kartu pertama peach, dua lainnya mist. Referensi mewarnai kartu ketiga hijau
 * (#D8EFDF); palet halaman ini tidak punya warna fungsional selain pasangan
 * peach/sienna, jadi hijau itu tidak dibawa. Yang tersisa adalah satu kartu
 * berwarna per baris, aturan yang sama dengan versi sebelumnya.
 *
 * Satu jebakan yang harus dijaga: `Reveal` menulis `transform` inline untuk
 * animasi masuknya, dan inline style mengalahkan utility Tailwind. Karena itu
 * zoom hover dipegang `<div>` di dalam kartu, bukan elemen `Reveal` — kalau
 * keduanya digabung, `hover:scale` akan diam-diam tidak berlaku.
 *
 * Jebakan kedua, yang sempat terjadi di judul: `ch` diukur dari font-size
 * elemen yang memakai kelas itu, bukan dari elemen di dalamnya. Pembungkus
 * judul mewarisi 17px dari body, jadi `max-w-[26ch]` berarti 262px — bukan 26
 * karakter pada 64px seperti yang terbaca. Judul 64px dijejalkan ke 262px dan
 * pecah jadi lima baris. Batasnya sekarang `58ch`, sama dengan SectionHeading,
 * sehingga 585px dan dua baris. `text-balance` menemani batas itu: tanpa
 * penyeimbang, dua baris pecah jadi satu baris penuh plus satu kata.
 */

export default function Highlights({ content }: { content: SiteContent }) {
  return (
    // Jarak bawahnya sendiri: section ini duduk di antara panel Products dan
    // pita peach Clients, dan dua permukaan berbeda warna tidak boleh bertemu
    // tanpa jeda.
    <section className="mx-auto max-w-page px-5 pb-20 pt-4 sm:px-8 lg:pb-28">
      <Reveal className="mx-auto max-w-[58ch] text-balance text-center">
        <p className="text-ash-gray flex items-center justify-center gap-1.5 text-caption">
          {content.highlightsSection.eyebrow}
          <span aria-hidden="true" className="rtl:-scale-x-100">
            ›
          </span>
        </p>
        <h2 className="text-ink-black font-display mt-4 text-heading font-normal sm:text-heading-lg">
          {content.highlightsSection.title}
        </h2>
      </Reveal>

      {/* Mobile: carousel snap. `-mx-5`/`px-5` mengembalikan padding kontainer
          di dalam track, supaya kartu pertama tetap sejajar tepi halaman tapi
          kartu berikutnya bisa menggantung di luar layar. */}
      <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 md:hidden">
        {content.highlights.map((item, index) => (
          <li key={item.title} className="w-[88%] max-w-[440px] shrink-0 snap-center">
            <Card item={item} index={index} className="aspect-[4/5]" />
          </li>
        ))}
      </ul>

      {/* Desktop: satu baris, tiga kartu bertinggi sama. `items-stretch` (bawaan
          flex) yang menyamakan tingginya: tiap `<li>` mengambil lebar `flex-1`
          dengan aspek 3/4, jadi tingginya otomatis identik. Tanpa skala bawaan
          apa pun — zoom hanya pada kartu yang di-hover. */}
      <ul className="mt-14 hidden gap-6 md:flex">
        {content.highlights.map((item, index) => (
          <Reveal
            as="li"
            key={item.title}
            delay={index * 0.08}
            className="aspect-[3/4] flex-1"
          >
            <Card item={item} index={index} className="h-full" />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/**
 * Satu kartu: tag, ordinal, judul, deskripsi.
 *
 * `className` membawa aspek dan tinggi, bukan `Card` sendiri, karena carousel
 * memakai aspek 4/5 dan baris desktop 3/4.
 *
 * Zoom hover ada di sini, di `<div>` kartu — bukan di `Reveal` pembungkusnya,
 * karena motion menulis `transform` inline untuk animasi masuk dan inline style
 * mengalahkan utility Tailwind. `relative` + `z-10` saat hover membuat kartu
 * yang membesar naik di atas tetangganya, bukan tertutup olehnya. `origin-bottom`
 * membuat zoom tumbuh dari garis bawah, jadi barisnya tetap terasa berpangkal
 * pada satu lantai.
 */
function Card({
  item,
  index,
  className,
}: {
  item: SiteContent["highlights"][number];
  index: number;
  className: string;
}) {
  // Kartu pertama peach; dua sisanya mist. Lihat catatan kepala file soal
  // kenapa tidak ada kartu ketiga berwarna.
  const accent = index === 0;

  return (
    <div
      className={`rounded-cards group relative flex origin-bottom flex-col justify-between overflow-hidden p-[9%] transition-transform duration-500 ease-out md:hover:z-10 md:hover:scale-[1.04] ${className} ${
        accent ? "bg-blush-peach" : "bg-mist-gray"
      }`}
    >
      <p
        className={`text-caption uppercase tracking-wide ${
          accent ? "text-sienna-brown/80" : "text-ash-gray"
        }`}
      >
        {item.tag}
      </p>

      {/* Ordinal serif: pengganti ilustrasi. Diletakkan absolut pada persentase
          tinggi kartu, bukan di tengah sisa ruang flex. Alasannya terlihat saat
          judul kartu berbeda panjang: "Scope before code" satu baris,
          "Handover without handcuffs" dua baris, jadi ruang sisa di tengah tiap
          kartu berbeda dan ordinalnya turun-naik sendiri. Dengan `top-[38%]`
          ketiga angka duduk di garis yang sama, seperti slot ilustrasi di
          referensi (`top-[35%]`). Ukurannya relatif terhadap lebar layar di
          mobile (`text-[28vw]`) lalu dipatok supaya tidak meluber. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[38%] flex justify-center"
      >
        <span
          className={`font-display text-center text-[28vw] leading-none font-normal sm:text-[10rem] md:text-[7rem] lg:text-[8rem] ${
            accent ? "text-sienna-brown/25" : "text-ink-black/[0.12]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>

      <div>
        <h3
          className={`text-heading-sm font-[450] ${
            accent ? "text-sienna-brown" : "text-ink-black/70"
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`mt-3 text-body ${
            accent ? "text-sienna-brown/85" : "text-slate-gray"
          }`}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}
