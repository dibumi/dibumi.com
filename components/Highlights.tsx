import React from "react";
import type { SiteContent } from "@/lib/i18n";

/**
 * Tiga kartu fitur di antara hero dan section layanan.
 *
 * Kartu pertama memakai peach: di referensi, satu kartu dalam baris fitur
 * selalu jadi kartu berwarna, dan itu penekanan editorial yang sah — bukan
 * latar. Dua kartu lain tetap mist-gray. Aturan "satu kartu peach per halaman"
 * di DESIGN.md tetap dipegang: kartu kontak turun jadi netral, dan peach
 * sekarang tinggal di sini, tempat ia memang menerangkan hal pertama yang
 * dikerjakan studio.
 *
 * Tidak ada ilustrasi garis seperti di referensi: asetnya tidak ada, dan
 * menggambar SVG hiasan sendiri justru menghasilkan gambar karangan. Sebagai
 * gantinya, tiap kartu membawa nomor besar dalam serif yang berfungsi sebagai
 * blok visual — tipografi yang mengisi peran ilustrasi tanpa mengarang gambar.
 *
 * Section ini tidak punya padding bawah sendiri: jarak ke section Services
 * diambil dari padding atas Services, supaya ritmenya tidak dijumlahkan dua kali.
 */
export default function Highlights({ content }: { content: SiteContent["highlights"] }) {
  return (
    <section className="mx-auto max-w-page px-5 sm:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {content.map((item, index) => {
          const accent = index === 0;

          return (
            <article
              key={item.title}
              className={`rounded-cards flex min-h-[22rem] flex-col justify-between p-8 ${
                accent ? "bg-blush-peach" : "bg-mist-gray"
              }`}
            >
              {/* Nomor besar: peran ilustrasi, tapi tetap tipografi. Warna
                  mengikuti pasangan permukaannya — sienna di atas peach, ink
                  di atas mist. */}
              <span
                aria-hidden="true"
                className={`font-display text-display leading-none ${
                  accent ? "text-sienna-brown/35" : "text-ink-black/10"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h2
                  className={`font-display text-heading-sm font-normal ${
                    accent ? "text-sienna-brown" : "text-ink-black"
                  }`}
                >
                  {item.title}
                </h2>
                <p
                  className={`mt-3 text-body ${accent ? "text-sienna-brown/85" : "text-slate-gray"}`}
                >
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
