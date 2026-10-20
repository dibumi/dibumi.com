import React from "react";
import { getPlatformProducts, ngambegHubUrl } from "@/lib/products";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import type { SiteContent } from "@/lib/i18n";

/**
 * Showcase produk: satu panel besar yang mengapung di atas pita fog.
 *
 * Referensinya menaruh satu tangkapan dashboard besar di tengah section, dan
 * seluruh section dibangun sebagai gradien dari abu muda ke putih supaya panel
 * itu terlihat mengambang. Di sini panelnya bukan tangkapan layar karangan:
 * isinya katalog produk platform yang memang ada di lib/products.ts, disusun
 * sebagai daftar berkode urut — jadi yang tampil adalah data situs ini sendiri,
 * hanya dipresentasikan sebagai antarmuka.
 *
 * Satu-satunya kartu yang ber-elevasi di section ini adalah panel itu; kartu
 * kecil di dalamnya memakai latar mist tanpa shadow.
 */
export default function Products({ content }: { content: SiteContent }) {
  const copy = content.products;
  const platformCopy = copy.platforms as Record<string, { description: string }>;
  const platforms = getPlatformProducts();

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-gradient-to-b from-fog-white to-paper-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
        </Reveal>

        {/* Panel besar. Bingkai luar hanya memberi jarak 2px antara panel dan
            isinya, supaya terbaca sebagai perangkat, bukan sebagai kartu biasa. */}
        <Reveal delay={0.1} className="mt-14">
          <div className="bg-paper-white shadow-subtle-3 rounded-elevatedcards p-2">
            <div className="bg-fog-white rounded-cards px-5 py-4 sm:px-7 sm:py-6">
              {/* Bar judul panel: nama katalog dan jumlah produk. */}
              <div className="border-hairline flex flex-wrap items-center justify-between gap-3 border-b pb-4">
                <p className="text-ink-black text-body font-medium">
                  {copy.groups.platforms.label}
                </p>
                <p className="text-ash-gray tabular text-caption">
                  {copy.groups.platforms.brand}
                </p>
              </div>

              <ul className="divide-hairline divide-y">
                {platforms.map((item, index) => (
                  <li
                    key={item.id}
                    className="group flex items-start gap-4 py-5 transition-colors hover:bg-paper-white sm:items-center sm:gap-6"
                  >
                    <span className="text-ash-gray tabular w-6 shrink-0 text-caption">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-ink-black min-w-0 flex-1 text-body font-medium">
                      {item.name}
                    </span>

                    {/* Deskripsi hanya di layar lebar: di panel sempit ia akan
                        memaksa baris jadi tiga tingkat dan panel kehilangan
                        bentuk tabelnya. */}
                    <span className="text-slate-gray hidden max-w-[38ch] flex-1 text-caption sm:block">
                      {platformCopy[item.id]?.description}
                    </span>

                    <span className="border-hairline text-ash-gray rounded-full border px-2.5 py-0.5 text-caption">
                      {copy.soon}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Ngambeg Cyber Media: satu pintu keluar ke katalognya sendiri,
                  karena daftar game dan aplikasi hidup di sana. */}
              <div className="border-hairline mt-2 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
                <div className="min-w-0">
                  <p className="text-ink-black text-body font-medium">
                    {copy.groups.ngambeg.label}
                  </p>
                  <p className="text-ash-gray text-caption">{copy.groups.ngambeg.brand}</p>
                </div>

                <a
                  href={ngambegHubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-ink-black text-ink-black rounded-buttons hover:bg-mist-gray inline-flex h-10 shrink-0 items-center gap-1.5 border px-4 text-caption transition"
                >
                  {copy.hub}
                  <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
