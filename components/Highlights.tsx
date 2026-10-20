import React from "react";
import Reveal from "@/components/motion/Reveal";
import type { SiteContent } from "@/lib/i18n";

/**
 * Tiga kartu fitur di antara hero dan section layanan.
 *
 * Kartu pertama memakai peach: di referensi, satu kartu dalam baris fitur
 * selalu jadi kartu berwarna, dan itu penekanan editorial yang sah — bukan
 * latar. Dua kartu lain tetap mist-gray. Peach kedua di halaman ini adalah band
 * penuh di section Clients, dan keduanya tidak bertabrakan: DESIGN.md membatasi
 * *kartu* peach menjadi satu, sedangkan band adalah permukaan section, bukan
 * kartu. Kartu kontak tetap netral.
 *
 * Tidak ada ilustrasi garis seperti di referensi: asetnya tidak ada, dan
 * menggambar SVG hiasan sendiri justru menghasilkan gambar karangan. Sebagai
 * gantinya, tiap kartu membawa nomor besar dalam serif yang berfungsi sebagai
 * blok visual — tipografi yang mengisi peran ilustrasi tanpa mengarang gambar.
 *
 * Ritmenya mengikuti baris fitur referensi: kartu tidak muncul serentak, tapi
 * naik berurutan 0 / 0.08 / 0.16 detik. Mata membaca kiri ke kanan, jadi jeda
 * kecil itu yang membuat barisnya terasa disusun, bukan dilempar.
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
            <Reveal key={item.title} as="article" delay={index * 0.08} className="group">
              {/* Lift dan pendalaman warna ada di elemen dalam, bukan di
                  pembungkus Reveal: motion menulis `transform` inline untuk
                  animasi masuknya, dan inline style mengalahkan utility
                  `hover:-translate-y` dari Tailwind. `h-full` menjaga tinggi
                  ketiga kartu tetap sama walau isinya beda panjang. */}
              <div
                className={`rounded-cards flex h-full min-h-[22rem] flex-col justify-between p-8 transition duration-500 hover:-translate-y-1 ${
                  accent
                    ? "bg-blush-peach hover:brightness-[0.98]"
                    : "bg-mist-gray"
                }`}
              >
                {/* Nomor besar: peran ilustrasi, tapi tetap tipografi. Warna
                    mengikuti pasangan permukaannya — sienna di atas peach, ink
                    di atas mist. Membesar 3% saat kartu disentuh supaya kartu
                    terasa hidup tanpa perlu bayangan, yang dilarang untuk kartu
                    konten. */}
                <span
                  aria-hidden="true"
                  className={`font-display text-display inline-block origin-left leading-none transition-transform duration-500 group-hover:scale-[1.03] ${
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
                    className={`mt-3 text-body ${
                      accent ? "text-sienna-brown/85" : "text-slate-gray"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
