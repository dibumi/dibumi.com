import React from "react";
import SectionHeading from "@/components/SectionHeading";
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
    <section id="clients" className="bg-fog-white py-20 lg:py-24">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="mt-16 grid gap-x-10 sm:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <ul key={columnIndex} className="divide-y divide-hairline">
              {column.map((client) => (
                <li key={client.name} className="flex items-center gap-4 py-4">
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
                      className="max-h-8 w-auto max-w-[120px] shrink-0 object-contain opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0"
                    />
                  ) : (
                    <span className="text-ink-black shrink-0 text-caption font-medium uppercase tracking-tight">
                      {client.name}
                    </span>
                  )}

                  {/* Label nama hanya muncul kalau logonya ada. Untuk Wap2Cash
                      namanya sudah jadi wordmark di slot logo, jadi mengulangnya
                      di sini akan menulis nama yang sama dua kali. */}
                  {client.logo ? (
                    <span className="text-slate-gray min-w-0 truncate text-caption">
                      {client.name}
                    </span>
                  ) : null}

                  <span className="text-ash-gray tabular ms-auto shrink-0 text-caption uppercase">
                    {client.region}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
