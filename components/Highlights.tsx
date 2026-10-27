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
 * yang memang beda ukuran. Di bawah `lg` baris itu jadi carousel snap: satu
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
 *
 * Keputusan soal kontras ordinal — sengaja dibiarkan di bawah ambang 3:1.
 *
 * Angka 01/02/03 itu `aria-hidden` dan tidak membawa satu bit informasi pun:
 * urutannya sudah terbaca dari posisi kartu di dalam `<ol>`/`<ul>` dan dari
 * tag di atasnya. Yang diukur detektor adalah elemen dekoratif, dan teks murni
 * dekoratif tidak punya ambang kontras — aturan 1.4.3 WCAG mengecualikan
 * dekorasi justru karena menaikkannya akan mengubah gambar, bukan
 * membacanya.
 *
 * Menaikkan ke 3:1 bukan penyesuaian kecil. Di atas peach, sienna butuh alpha
 * 0,56 (dari 0,25) dan di atas mist, ink butuh 0,47 (dari 0,12) — lebih dari
 * dua kali lebih pekat. Pada titik itu angkanya berhenti jadi wash di belakang
 * teks dan mulai jadi bidang depan yang bersaing dengan judul 26px di
 * bawahnya. Itu desain ulang, bukan poles. Jadi nilainya tetap, dengan waiver
 * `impeccable-disable-next-line low-contrast` di dekat kelasnya supaya
 * keputusan ini terbaca sebagai keputusan, bukan sebagai temuan yang lolos.
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
          kartu berikutnya bisa menggantung di luar layar.

          `w-[88%]` dan `max-w-[440px]` adalah satu keputusan, bukan dua:
          88% menyisakan 12% kartu berikutnya sebagai petunjuk bahwa barisnya
          bisa digeser — tanpa itu carousel terbaca sebagai satu kartu yang
          kebetulan terpotong. Batas 440px menjaga kartu tidak melebar sampai
          kehilangan bentuknya di tablet, tempat 88% sudah lebih dari cukup.
          Nilai ini unik untuk track ini; tidak ada carousel lain di halaman. */}
      <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:hidden">
        {content.highlights.map((item, index) => (
          <li key={item.title} className="w-[88%] max-w-[440px] shrink-0 snap-center">
            <Card item={item} index={index} className="aspect-[4/5]" />
          </li>
        ))}
      </ul>

      {/* Satu baris, tiga kartu bertinggi sama, mulai `lg` (1024px) — bukan `md`.
          Di 768px tiga kolom menghasilkan kartu 214px, yaitu LEBIH SEMPIT dari
          kartu carousel di layar ponsel (308–440px). Di lebar itu deskripsi
          pecah jadi lima baris, dan setelah tag (23px) serta teks (196px) hanya
          tersisa 27px untuk slot ordinal — angka 112px tidak mungkin muat di
          sana. Carousel sampai `lg` membuat tablet selalu memakai kartu lebar.
          `items-stretch` (bawaan flex) yang menyamakan tingginya: tiap `<li>`
          mengambil lebar `flex-1` dengan aspek 3/4, jadi tingginya otomatis
          identik. Tanpa skala bawaan apa pun — zoom hanya pada kartu yang
          di-hover.

          `z-10` duduk di `<li>`, bukan di kartu. `Reveal` menulis `transform`
          inline untuk animasi masuknya, dan elemen yang punya transform
          membentuk stacking context sendiri — `z-10` pada anak tidak bisa
          keluar dari situ, jadi kartu yang membesar akan tetap tertutup
          tetangganya di sebelah kanan. Di `<li>` ia mengangkat seluruh
          stacking context-nya, yang memang yang dibutuhkan. Kalau `Reveal`
          suatu saat berhenti memakai transform, pemindahan ini tetap benar.

          Jeda 0.08s per kartu, sama dengan rail Process dan baris Standards:
          satu increment untuk semua daftar yang di-reveal di halaman ini.
          Tiga kartu berarti kartu terakhir mulai pada 0.16s, masih di dalam
          durasi 0.6s — jadi barisnya masuk sebagai satu gelombang, bukan tiga
          kedipan terpisah. */}
      <ul className="mt-14 hidden gap-6 lg:flex">
        {content.highlights.map((item, index) => (
          <Reveal
            as="li"
            key={item.title}
            delay={index * 0.08}
            className="relative aspect-[3/4] flex-1 lg:hover:z-10"
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
 * mengalahkan utility Tailwind. `origin-bottom` membuat zoom tumbuh dari garis
 * bawah, jadi barisnya tetap terasa berpangkal pada satu lantai. Origin itu
 * aman untuk RTL apa adanya: `bottom` = `50% 100%`, komponen horizontalnya
 * tengah, jadi tidak ada sisi kiri/kanan yang harus dibalik.
 *
 * Pengangkatan kartu di atas tetangganya dipegang `z-10` pada `<li>` di
 * pemanggil, bukan di sini — lihat catatan di sana.
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

  // Waiver di bawah ini disengaja. Angka ordinal adalah dekorasi `aria-hidden`
  // tanpa informasi — lihat "Keputusan soal kontras ordinal" di kepala file
  // untuk alasan lengkapnya dan angka yang mendasarinya.
  // impeccable-disable-next-line low-contrast: ordinal is aria-hidden ornament, not information
  const ordinalColor = accent ? "text-sienna-brown/25" : "text-ink-black/[0.12]";

  return (
    // `p-[9%]` bukan nilai bulat asal: padding persen dihitung dari lebar
    // kartu, jadi tepi dalamnya ikut menyempit saat kartu mengecil di baris
    // tiga kolom. Padding rem tetap akan terlihat longgar di kartu 219px dan
    // sempit di kartu 384px. Sembilan persen dipilih supaya jarak tag ke tepi
    // atas terbaca sama dengan jarak teks ke tepi bawah di kedua aspek (4/5
    // dan 3/4).
    <div
      className={`rounded-cards group relative flex origin-bottom flex-col overflow-hidden p-[9%] transition-transform duration-500 ease-out lg:hover:scale-[1.04] ${className} ${
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

      {/* Ordinal serif: pengganti ilustrasi, dan satu-satunya isi slot tengah.

          Ia elemen flex di antara tag dan blok teks, bukan elemen absolut dengan
          `top` persentase. Versi sebelumnya memakai `top-[34%]`: karena tinggi
          kartu berbeda di tiap rezim (385px di carousel, 405px di 1024px, 484px
          di 1280px) sementara tinggi blok teksnya juga berbeda (111px untuk
          judul satu baris, 142px untuk dua baris), satu persentase tidak pernah
          benar di semua tempat. Terukur di 1280px angka 34% pas (jarak 16px),
          tapi di 1024px ordinal 8rem di 138px dari atas menabrak judul, dan di
          768px menembus ketiganya. Karena ia harus bebas tabrakan di semua
          lebar, ia masuk ke aliran flex dan `items-center` di sisa ruang yang
          disediakan tag dan blok teks: ia bisa mendekati keduanya, tapi tidak
          pernah melewatinya, berapa pun tinggi kartunya.

          Ongkosnya pergeseran kecil antar kartu: titik tengahnya adalah
          setengah tinggi blok teks, jadi kartu berjudul dua baris menaruh
          angkanya ~15px lebih rendah dari kartu berjudul satu baris. Pada wash
          12% itu tidak terlihat, dan itu harga yang pantas untuk jaminan tidak
          ada tabrakan di locale mana pun — panjang judul berbeda di tiap
          bahasa.

          `min-h-0` wajib: tanpa itu tinggi minimum flex item adalah tinggi
          isinya, jadi slot tidak pernah bisa menyusut dan blok teksnya yang
          terdorong keluar kartu.

          Ukurannya tangga yang naik di setiap rezim tata letak:
          - carousel (<lg): 28vw, berhenti di 10rem. Dulu `28vw` lalu `10rem`
            pada breakpoint `sm`, jadi antara 571px dan 639px angkanya 160–179px
            lalu tiba-tiba menyusut ke 160px padahal kartunya tidak berubah.
            `min()` membuat batas itu mulus, bukan snap.
          - baris tiga kolom (lg+): 8rem. Satu-satunya penurunan di seluruh
            tangga terjadi di sini, tepat saat kartu berhenti jadi selebar layar
            (440px di carousel 1023px) dan mengecil jadi 304px di 1024px —
            ordinalnya turun bersama kartunya, dari 36% ke 42% lebar kartu.
            Itu perubahan tata letak, bukan angka yang salah urut. */}
      <span
        aria-hidden="true"
        className="pointer-events-none flex min-h-0 flex-1 items-center justify-center"
      >
        <span
          className={`font-display text-center text-[length:min(28vw,10rem)] leading-none font-normal lg:text-[8rem] ${ordinalColor}`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>

      <div>
        {/* `font-[450]`, bukan `font-normal` atau `font-medium`: Inter dimuat
            sebagai variable font (tanpa daftar `weight` di layout.tsx), jadi
            450 benar-benar dirender. Pada 26px, 450 duduk setara dengan 500
            pada judul 20px di Standards dan Process — makin besar ukurannya,
            makin sedikit bobot yang dibutuhkan untuk bobot optis yang sama. */}
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
