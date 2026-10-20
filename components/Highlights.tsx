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
 * Yang tidak ada di sini adalah ilustrasi garis seperti di referensi: asetnya
 * tidak ada, dan menggambar SVG hiasan sendiri menghasilkan gambar karangan.
 * Peran visualnya diambil oleh angka besar serif yang jadi air tanda di
 * belakang kartu — bukan elemen terpisah di atas, karena di situ ia meninggalkan
 * rongga kosong di tengah kartu.
 *
 * Judul kartu diset sans 26px, bukan serif. Referensi memakai sans untuk
 * judul di dalam kartu dan serif hanya untuk heading halaman: dua tingkat
 * ini sengaja dibedakan supaya kartu tidak bersaing dengan judul section.
 *
 * Ritmenya mengikuti baris fitur referensi: kartu tidak muncul serentak, tapi
 * naik berurutan 0 / 0.08 / 0.16 detik. Mata membaca kiri ke kanan, jadi jeda
 * kecil itu yang membuat barisnya terasa disusun, bukan dilempar.
 *
 * Section ini tidak punya padding bawah sendiri: jarak ke section Clients
 * diambil dari padding atas Clients, supaya ritmenya tidak dijumlahkan dua kali.
 */
export default function Highlights({ content }: { content: SiteContent["highlights"] }) {
  return (
    <section className="column-guides mx-auto max-w-page px-5 sm:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {content.map((item, index) => {
          const accent = index === 0;

          return (
            <Reveal key={item.title} as="article" delay={index * 0.08} className="group h-full">
              {/* Lift dan pendalaman warna ada di elemen dalam, bukan di
                  pembungkus Reveal: motion menulis `transform` inline untuk
                  animasi masuknya, dan inline style mengalahkan utility
                  `hover:-translate-y` dari Tailwind. `h-full` menjaga tinggi
                  ketiga kartu tetap sama walau isinya beda panjang. */}
              <div
                className={`rounded-cards relative flex h-full min-h-[24rem] flex-col overflow-hidden p-8 transition duration-500 hover:-translate-y-1 ${
                  accent ? "bg-blush-peach hover:brightness-[0.98]" : "bg-mist-gray"
                }`}
              >
                {/* Air tanda: angka besar serif di belakang isi kartu. Warnanya
                    mengikuti pasangan permukaannya — sienna di atas peach, ink
                    di atas mist. Bleeding keluar dari tepi kartu, jadi kartu
                    terasa lebih besar darikotaknya. */}
                <span
                  aria-hidden="true"
                  className={`font-display pointer-events-none absolute -end-6 -bottom-12 text-[190px] leading-none transition-transform duration-500 group-hover:scale-[1.03] ${
                    accent ? "text-sienna-brown/25" : "text-ink-black/[0.07]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Tag kategori: tipografi, bukan badge. Tidak ada latar dan
                    tidak ada border — tugasnya hanya mengelompokkan. */}
                <p
                  className={`text-caption uppercase tracking-wide ${
                    accent ? "text-sienna-brown/70" : "text-ash-gray"
                  }`}
                >
                  {item.tag}
                </p>

                <div className="relative mt-auto">
                  <h2
                    className={`text-[26px] leading-[1.18] font-[450] ${
                      accent ? "text-sienna-brown" : "text-ink-black/70"
                    }`}
                  >
                    {item.title}
                  </h2>
                  <p
                    className={`mt-3 max-w-[34ch] text-body ${
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
