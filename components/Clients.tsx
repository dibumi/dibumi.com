import React from "react";
import Reveal from "@/components/motion/Reveal";
import { clients } from "@/lib/clients";
import type { Locale, SiteContent } from "@/lib/i18n";

/**
 * Section Clients: tabel wilayah, bukan grid kartu.
 *
 * Halaman ini sudah punya dua grid tiga kartu (Highlights dan Services). Kalau
 * klien juga tampil sebagai kartu, ketiganya melebur dan section ini kehilangan
 * fungsinya sebagai jeda. DESIGN.md memakai tabel wilayah kecil sebagai artifact
 * khasnya, dan daftar dua belas nama memang lebih jujur dibaca sebagai baris
 * daripada dua belas kotak.
 *
 * Section ini adalah band warna halaman — padanan bagian customer story biru di
 * referensi. Warnanya peach penuh, jadi seluruh teks di dalamnya memakai sienna:
 * abu-abu dingin di atas peach memutus efek kertas kraft dan membuat band ini
 * terbaca sebagai panel abu-abu yang kebetulan berwarna, bukan sebagai kertas
 * berwarna. Karena itu SectionHeading tidak dipakai di sini; ia membawa slate
 * dan ash yang tidak boleh masuk ke dalam band.
 *
 * Logo memakai <img> biasa, bukan next/image, karena separuhnya SVG dan
 * beberapa di antaranya aset pihak ketiga berukuran kecil. Dengan begitu tidak
 * perlu mengaktifkan dangerouslyAllowSVG pada image optimizer.
 *
 * Wap2Cash tidak punya aset logo (situsnya mati dan arsipnya tidak menyimpan
 * logo), jadi namanya ditulis sebagai wordmark teks di slot logo. Tidak ada
 * gambar karangan.
 *
 * Logo pihak ketiga membawa warnanya masing-masing, dan satu baris warna di
 * tengah palet achromatic merusak halaman. Karena itu semuanya diredupkan ke
 * grayscale dan baru kembali berwarna saat disentuh kursor — warnanya tetap
 * tersedia sebagai pengenal, tapi tidak pernah ikut menyusun komposisi.
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
  // Dua belas baris dibagi rata ke dua kolom supaya tingginya tetap pendek.
  // Tanpa pembagian manual, satu kolom akan memanjang dan section ini menelan
  // satu layar penuh.
  const midpoint = Math.ceil(clients.length / 2);
  const columns = [clients.slice(0, midpoint), clients.slice(midpoint)];

  return (
    <section id="clients" className="bg-blush-peach py-20 lg:py-40">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        {/* Judul masuk lebih dulu, dua kolom menyusul dengan jeda: band ini
            panjang, dan tanpa jeda semuanya muncul sekaligus seperti gambar. */}
        <Reveal className="max-w-[58ch]">
          <p className="text-sienna-brown/70 flex items-center gap-1.5 text-caption">
            {content.eyebrow}
            <span aria-hidden="true" className="rtl:-scale-x-100">
              ›
            </span>
          </p>
          <h2 className="text-sienna-brown font-display mt-4 text-heading font-normal sm:text-heading-lg">
            {content.title}
          </h2>
          <p className="text-sienna-brown/80 mt-5 max-w-[52ch] text-body">
            {content.description}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-10 sm:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <Reveal key={columnIndex} delay={columnIndex === 0 ? 0.1 : 0.18}>
              <ul className="divide-sienna-brown/15 divide-y">
                {column.map((client) => (
                  <li
                    key={client.name}
                    // Margin negatif menarik wash hover sedikit ke luar kolom
                    // teks, supaya barisnya terbaca sebagai baris yang disorot
                    // dan bukan sebagai kotak yang menempel di tepi.
                    className="hover:bg-sienna-brown/5 -mx-3 flex items-center gap-4 px-3 py-4 transition-colors"
                  >
                    <img
                      src={`/flags/${client.region}.svg`}
                      alt={regionName(client.region, locale)}
                      width={18}
                      height={12}
                      loading="lazy"
                      className="h-3 w-[18px] shrink-0 rounded-[2px] object-cover"
                    />

                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt=""
                        width={client.width}
                        height={client.height}
                        loading="lazy"
                        className="max-h-8 w-auto max-w-[120px] shrink-0 object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                      />
                    ) : (
                      <span className="text-sienna-brown shrink-0 text-caption font-medium uppercase tracking-tight">
                        {client.name}
                      </span>
                    )}

                    {/* Label nama hanya muncul kalau logonya ada. Untuk Wap2Cash
                        namanya sudah jadi wordmark di slot logo, jadi mengulangnya
                        di sini akan menulis nama yang sama dua kali. */}
                    {client.logo ? (
                      <span className="text-sienna-brown min-w-0 truncate text-caption">
                        {client.name}
                      </span>
                    ) : null}

                    <span className="text-sienna-brown/60 tabular ms-auto shrink-0 text-caption uppercase">
                      {client.region}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
