import React from "react";
import Reveal from "@/components/motion/Reveal";
import { clients } from "@/lib/clients";
import type { Locale, SiteContent } from "@/lib/i18n";

/**
 * Section Clients: pita warna dengan dinding logo.
 *
 * Ini padanan bagian customer story di referensi, yang di sana memakai
 * pita biru dengan kutipan besar, foto, dan sebaris logo. Foto tidak ada
 * di sini — tidak ada aset foto studio ini, dan mengarang foto orang yang
 * tidak pernah ada adalah memalsukannya. Yang menggantikannya adalah dinding
 * logo: empat belas klien, tiap selnya satu kotak yang dipisah garis sienna
 * tipis. Sebelas di antaranya punya aset logo; tiga sisanya ditulis sebagai
 * wordmark. Empat belas itu adalah jumlah merek yang tercatat di dinding,
 * bukan jumlah klien: angkanya jauh lebih besar dan ditulis di pita kiri.
 *
 * Dinding logo itu juga lebih jujur daripada tabel nama: yang ingin dilihat
 * prospective client adalah siapa yang pernah percaya pada kita, bukan
 * kebangsaan badan hukum mereka. Kode ISO dan bendera tetap ada, tapi di
 * bawah logo, bukan di sampingnya.
 *
 * Section ini adalah band warna halaman. Warnanya peach penuh, jadi seluruh
 * teks di dalamnya memakai sienna: abu-abu dingin di atas peach memutus efek
 * kertas kraft dan membuat band ini terbaca sebagai panel abu-abu yang
 * kebetulan berwarna, bukan sebagai kertas berwarna. Karena itu SectionHeading
 * tidak dipakai di sini; ia membawa slate dan ash yang tidak boleh masuk ke
 * dalam band.
 *
 * Logo memakai <img> biasa, bukan next/image, karena separuhnya SVG dan
 * beberapa di antaranya aset pihak ketiga berukuran kecil. Dengan begitu tidak
 * perlu mengaktifkan dangerouslyAllowSVG pada image optimizer.
 *
 * Wap2Cash, MyWapBlog, dan ZetMoney tidak punya aset logo yang bisa dipakai,
 * jadi namanya ditulis sebagai wordmark teks di slot logo. Tidak ada gambar
 * karangan.
 *
 * Logo pihak ketiga membawa warnanya masing-masing, dan satu baris warna di
 * tengah palet achromatic merusak halaman. Karena itu semuanya diredupkan ke
 * grayscale dan baru kembali berwarna saat selnya disentuh kursor — warnanya
 * tetap tersedia sebagai pengenal, tapi tidak pernah ikut menyusun komposisi.
 *
 * Hover itu dipasang di sel (`group`), bukan di gambarnya sendiri. Sebelumnya
 * latar sel menyala saat kursor ada di mana pun di dalam sel, tapi logonya baru
 * berwarna kalau kursor tepat di atas bitmap-nya: dua reaksi untuk satu
 * gerakan, dan yang kedua terasa meleset karena separuh sel adalah padding.
 * Sekarang keduanya dipicu oleh hal yang sama.
 *
 * Batas lebar logo 130px sama dengan yang dipakai marquee di ClientMarquee.tsx:
 * empat belas merek yang sama muncul di dua tempat, jadi keduanya tidak boleh
 * punya lebar maksimum berbeda. Angkanya diambil dari sini, tempat yang lebih
 * ketat, dan di sini ia hanya berperan sebagai langit-langit: lebar sel
 * menyisakan 92px di ponsel 320px, 120px di 1024px, dan 166px di desktop
 * penuh. Karena itu gambar memakai `w-full max-w-[130px]`, bukan `w-auto
 * max-w-[130px]`: dengan `w-auto` lebarnya mengikuti rasio asli lalu dijepit
 * 130px, dan di sel yang lebih sempit dari 130px logo itu luber ke sel
 * sebelahnya. `w-full` membuat lebarnya mengikuti sel lebih dulu, 130px hanya
 * batas atasnya, dan `object-contain` menjaga rasionya utuh di kedua arah.
 *
 * Tanpa state, jadi server component. Nama negara diambil dari Intl.DisplayNames
 * supaya alt bendera ikut locale tanpa menambah string baru ke lib/i18n.ts.
 */

/** Nama negara dari kode ISO, mengikuti locale aktif. */
function regionName(region: string, locale: Locale): string {
  const code = region.toUpperCase();

  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export default function Clients({
  content,
  locale,
}: {
  content: SiteContent["clients"];
  locale: Locale;
}) {
  // Angka di pita ini adalah klaim total sepanjang 2013–sekarang, bukan
  // jumlah logo di dinding kanan: hanya sebagian klien yang aset logonya
  // tersimpan, jadi empat belas sel logo dan "100+" bukan dua versi angka yang
  // sama. Karena itu ketiganya ditulis tetap, bukan diturunkan dari data —
  // kalau dihitung, angkanya berubah jadi 14 dan 10 setiap kali daftar logo
  // bertambah atau berkurang.
  const facts = [
    { value: "100+", label: content.facts.clients },
    { value: "10+", label: content.facts.countries },
    { value: "2013", label: content.facts.since },
  ];

  // Daftar berakhir dengan baris tidak penuh kalau sisanya dua (14 = 4×3 + 2).
  // Dipakai untuk melebarkan dua sel terakhir di `sm` ke atas; lihat komentar
  // dinding logo di bawah.
  const wideTail = clients.length % 3 === 2;

  return (
    <section id="clients" className="bg-blush-peach py-20 lg:py-40">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* Kolom kiri: judul, deskripsi, dan tiga angka keras. */}
          <Reveal>
            <p className="text-sienna-brown/80 flex items-center gap-1.5 text-caption">
              {content.eyebrow}
              <span aria-hidden="true" className="rtl:-scale-x-100">
                ›
              </span>
            </p>
            <h2 className="text-sienna-brown font-display mt-4 text-heading font-normal sm:text-heading-lg">
              {content.title}
            </h2>
            <p className="text-sienna-brown/80 mt-5 max-w-[46ch] text-body">
              {content.description}
            </p>

            {/* Tiga angka, dipisah garis. Di band peach ini satu-satunya
                tempat yang boleh memakai garis penuh selebar kolom. */}
            <dl className="border-sienna-brown/20 mt-12 grid grid-cols-3 gap-6 border-t pt-6">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sienna-brown/85 text-caption">{fact.label}</dt>
                  <dd className="text-sienna-brown font-display tabular mt-1 text-heading-sm font-normal">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Kolom kanan: dinding logo. Jarak 1px antar sel memperlihatkan
              warna latar sebagai garis pemisah, jadi tidak perlu border per
              sel dan tidak ada garis yang penggantung di tepi.

              Di `sm` ke atas grid-nya enam kolom, bukan tiga. Tiap sel
              mengambil dua kolom (tiga sel per baris), dan ketika daftar
              berakhir dengan sisa dua — 14 = 4×3 + 2 — dua sel terakhir
              mengambil tiga kolom, jadi masing-masing selebar setengah dinding
              dan baris terakhir tetap penuh. Tanpa itu slot kosong di baris
              terakhir memperlihatkan `bg-sienna-brown/20` sebagai kotak
              kecokelatan, bukan kertas. */}
          <Reveal delay={0.12}>
            <ul className="grid grid-cols-2 gap-px bg-sienna-brown/20 sm:grid-cols-6">
              {clients.map((client, index) => (
                <li
                  key={client.name}
                  className={`group bg-blush-peach flex flex-col items-center justify-center p-6 transition-colors hover:bg-sienna-brown/5 ${
                    wideTail && index >= clients.length - 2
                      ? "sm:col-span-3"
                      : "sm:col-span-2"
                  }`}
                >
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      width={client.width}
                      height={client.height}
                      loading="lazy"
                      className="max-h-9 w-full max-w-[130px] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  ) : (
                    <span className="text-sienna-brown text-caption font-medium tracking-tight">
                      {client.name}
                    </span>
                  )}

                  {client.tagline ? (
                    <span className="text-sienna-brown/85 mt-1 text-caption">
                      {client.tagline}
                    </span>
                  ) : null}

                  <span className="text-sienna-brown/85 mt-3 flex items-center gap-1.5 text-caption uppercase">
                    {/* Bendera 15x10 bukan kartu, jadi lantai radius 16px tidak
                        berlaku di sini: token terkecil (`rounded-images` 12px)
                        di kotak setinggi 10px dijepit CSS jadi 5px dan mengubah
                        bendera menjadi lozenge — sudut adalah bagian dari
                        siluet bendera. 2px adalah nilai terkecil yang
                        menghilangkan gigir bitmap tanpa mengubah bentuknya. */}
                    {client.region ? (
                      <>
                        <img
                          src={`/flags/${client.region}.svg`}
                          alt={regionName(client.region, locale)}
                          width={18}
                          height={12}
                          loading="lazy"
                          className="h-2.5 w-[15px] shrink-0 rounded-[2px] object-cover"
                        />
                        <span className="tabular">{client.region}</span>
                      </>
                    ) : (
                      <span>{content.global}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
