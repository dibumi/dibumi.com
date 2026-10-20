import React from "react";
import Reveal from "@/components/motion/Reveal";
import type { SiteContent } from "@/lib/i18n";

/**
 * Tiga kartu fase kerja, tepat di bawah Products.
 *
 * Bentuknya mengikuti baris kartu USP di referensi: kartu tinggi beraspek 3/4
 * di desktop, disusun sebagai kipas — kartu kiri dan kanan menyusut ke 90% dan
 * kartu tengah membesar ke 110%, semuanya berpangkal di bawah sehingga
 * membesarnya terasa seperti kartu yang terangkat ke depan, bukan kotak yang
 * membengkak. Di bawah `md` baris itu jadi carousel snap: satu kartu per layar,
 * digeser jari, tanpa tombol dan tanpa JavaScript — karena itu komponen ini
 * tetap server component.
 *
 * Isi kartu dibagi tiga seperti di referensi: tag di atas, satu visual besar di
 * tengah, judul dan deskripsi di bawah. Slot visualnya diisi ordinal serif
 * raksasa, bukan ilustrasi. Referensi menaruh SVG botol parfum, balok lego, dan
 * roket di slot itu; ketiganya aset produk Steep sendiri dan tidak berarti apa
 * pun untuk Discover/Build/Operate. Menggambar penggantinya berarti mengarang
 * gambar, dan aturan halaman ini melarangnya, jadi yang bekerja adalah angka —
 * bahan yang sudah dipakai rail Process dan nomor kartu versi sebelumnya.
 *
 * Teks kartu selalu terlihat. Di referensi isinya disembunyikan (opacity-0)
 * sampai kursor menyentuh kartu; untuk section yang tugasnya menjelaskan cara
 * kerja, itu menahan informasi di balik mouse dan membuatnya tak pernah terbaca
 * di layar sentuh. Hover di sini hanya mengangkat kartu satu piksel.
 *
 * Kartu pertama peach, dua lainnya mist. Referensi mewarnai kartu ketiga hijau
 * (#D8EFDF); palet halaman ini tidak punya warna fungsional selain pasangan
 * peach/sienna, jadi hijau itu tidak dibawa. Yang tersisa adalah satu kartu
 * berwarna per baris, aturan yang sama dengan versi sebelumnya.
 *
 * Satu jebakan yang harus dijaga: `Reveal` menulis `transform` inline untuk
 * animasi masuknya, dan inline style mengalahkan utility Tailwind. Karena itu
 * skala kipas TIDAK boleh menempel di elemen `Reveal` — ia dipegang `<div>` di
 * dalamnya, sementara `Reveal` hanya membawa kotak tata letaknya (`flex-1` dan
 * `aspect`). Kalau keduanya digabung, `scale-90` akan diam-diam tidak berlaku.
 *
 * Transform kipas memakai varian `rtl:` karena geseran horizontal mengikuti
 * sumbu baca: di Arab kartu pertama harus bergeser ke kiri agar busurnya tetap
 * simetris.
 */

/** Kelas kipas per posisi kartu. Dipakai carousel dan baris desktop. */
const fan = [
  "md:scale-90 md:translate-x-[6%] rtl:md:-translate-x-[6%]",
  "md:scale-90 md:-translate-x-[2%] rtl:md:translate-x-[2%]",
  "md:scale-110",
];

export default function Highlights({ content }: { content: SiteContent }) {
  return (
    // Jarak bawahnya sendiri: section ini duduk di antara panel Products dan
    // pita peach Clients, dan dua permukaan berbeda warna tidak boleh bertemu
    // tanpa jeda.
    <section className="mx-auto max-w-page px-5 pb-20 pt-4 sm:px-8 lg:pb-28">
      <Reveal className="mx-auto max-w-[26ch] text-center">
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

      {/* Desktop: satu baris kipas. `items-end` menjaga ketiga kartu berpangkal
          di garis bawah yang sama, jadi yang berbeda hanyalah skalanya.
          Barisnya sendiri digeser -3% seperti di referensi: kartu pertama
          bergeser +6% dan kartu ketiga membesar 110%, dan tanpa imbangan itu
          pusat komposisinya condong ke kanan. */}
      <ul className="mt-14 hidden items-end gap-6 md:flex md:-translate-x-[3%] rtl:md:translate-x-[3%]">
        {content.highlights.map((item, index) => (
          <Reveal
            as="li"
            key={item.title}
            delay={index * 0.08}
            className="aspect-[3/4] flex-1"
          >
            <Card item={item} index={index} className={`h-full ${fan[index]}`} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/**
 * Satu kartu: tag, ordinal, judul, deskripsi.
 *
 * `className` membawa aspek dan skala kipas, bukan `Card` sendiri, karena
 * carousel memakai aspek 4/5 dan baris desktop 3/4.
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
      className={`rounded-cards group flex origin-bottom flex-col overflow-hidden p-[9%] transition-transform duration-500 hover:-translate-y-1 ${className} ${
        accent ? "bg-blush-peach" : "bg-mist-gray"
      }`}
    >
      <p
        className={`text-caption uppercase tracking-wide ${
          accent ? "text-sienna-brown/70" : "text-ash-gray"
        }`}
      >
        {item.tag}
      </p>

      {/* Ordinal serif di tengah: pengganti ilustrasi. Ukurannya relatif
          terhadap lebar kartu (`text-[28vw]` di mobile, dibatasi `lg:text-[8rem]`)
          supaya tidak meluber saat kartu menyempit di antara breakpoint.
          Dibungkus `flex-1` agar ia benar-benar duduk di tengah sisa ruang
          antara tag di atas dan teks di bawah, bukan sekadar di antaranya. */}
      <span className="flex flex-1 items-center justify-center" aria-hidden="true">
        <span
          className={`font-display text-center text-[28vw] leading-none font-normal sm:text-[10rem] md:text-[7rem] lg:text-[8rem] ${
            accent ? "text-sienna-brown/25" : "text-ink-black/[0.08]"
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
