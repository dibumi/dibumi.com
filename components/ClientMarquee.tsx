import React from "react";
import { clients } from "@/lib/clients";
import type { SiteContent } from "@/lib/i18n";

/**
 * Marquee logo klien.
 *
 * Referensinya memakai satu baris logo yang bergulir terus di bawah hero, dengan
 * fade putih di kedua tepi supaya logo tidak muncul dan hilang secara mendadak.
 * Mekanismenya CSS murni: daftar digandakan dua kali, lalu track-nya digeser
 * sejauh setengah lebar total dengan durasi 50 detik linear. Karena salinan
 * kedua identik, animasi yang mengulang tidak pernah terlihat melompat.
 *
 * Marquee berhenti saat kursor di atasnya, jadi pengunjung bisa membaca nama
 * yang lewat tanpa mengejarnya. Saat prefers-reduced-motion aktif, animasinya
 * mati dan daftar berhenti sebagai baris statis.
 *
 * Logo memakai <img> biasa, bukan next/image: separuhnya SVG pihak ketiga
 * berukuran kecil, dan tidak perlu mengaktifkan dangerouslyAllowSVG.
 * Wap2Cash tidak punya aset logo, jadi namanya ditulis sebagai wordmark.
 */
export default function ClientMarquee({ content }: { content: SiteContent["clients"] }) {
  // Satu daftar digandakan: salinan kedua hanya untuk menyambung putaran.
  const row = [...clients, ...clients];

  return (
    <section className="overflow-hidden pb-20 lg:pb-24">
      <p className="text-ash-gray text-center text-caption">{content.eyebrow}</p>

      <div className="group relative mt-6">
        {/* Fade tepi: gradien dari paper-white, bukan mask, supaya tetap
            bekerja di atas latar apa pun yang dipakai section ini. */}
        <div
          aria-hidden="true"
          className="from-paper-white pointer-events-none absolute inset-y-0 start-0 z-10 w-[12%] bg-gradient-to-r to-transparent"
        />
        <div
          aria-hidden="true"
          className="from-paper-white pointer-events-none absolute inset-y-0 end-0 z-10 w-[12%] bg-gradient-to-l to-transparent"
        />

        <ul className="animate-marquee flex w-max items-center gap-14 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row.map((client, index) => (
            <li
              key={`${client.name}-${index}`}
              // Salinan kedua disembunyikan dari pembaca layar: namanya sudah
              // dibacakan pada daftar pertama.
              aria-hidden={index >= clients.length ? true : undefined}
              className="shrink-0"
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  loading="lazy"
                  className="h-7 w-auto max-w-[130px] object-contain opacity-45 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="text-slate-gray text-caption font-medium uppercase tracking-wide">
                  {client.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
