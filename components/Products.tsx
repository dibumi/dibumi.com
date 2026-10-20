import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformProducts, ngambegHubUrl } from "@/lib/products";
import type { SiteContent } from "@/lib/i18n";

/**
 * Produk sendiri, dibagi dua grup.
 *
 * Kartu platform memakai mist-gray datar tanpa border, shadow, dan ikon: status
 * "Soon" cukup dibawa pill hairline tipis di atas nama produk. Baris judul grup
 * dipertahankan supaya "Platforms" dan "Ngambeg Cyber Media" tetap terbaca
 * sebagai dua katalog berbeda, bukan satu daftar panjang.
 *
 * Kartu Ngambeg adalah satu-satunya entri selebar penuh dan memakai fog-white
 * ber-border hairline, bukan mist-gray: ia pintu keluar situs, jadi permukaan
 * yang berbeda menandainya sebagai penutup daftar. Tautannya pill ghost dengan
 * panah di dalam label — glyph dekoratif lain sudah dihapus dari sistem ini.
 */
export default function Products({ content }: { content: SiteContent }) {
  const copy = content.products;
  const platformCopy = copy.platforms as Record<string, { description: string }>;

  return (
    <section id="products" className="py-20 lg:py-24">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-16 flex flex-col gap-6">
          {/* Platforms: produk milik dibumi.com, situsnya belum tayang */}
          <div>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-ink-black text-body font-medium">
                {copy.groups.platforms.label}
              </h3>
              <span className="text-ash-gray text-caption">{copy.groups.platforms.brand}</span>
            </div>

            {/* auto-rows-fr menyamakan tinggi baris pertama dan kedua, jadi
                enam kartu produk tampil dengan tinggi identik. Dibatasi ke md ke
                atas karena di mobile kartu bertumpuk satu kolom. */}
            <div className="grid gap-6 md:auto-rows-fr md:grid-cols-3">
              {getPlatformProducts().map((item) => (
                <article
                  key={item.id}
                  className="bg-mist-gray rounded-cards flex flex-col gap-6 p-8"
                >
                  <span className="border-hairline text-ash-gray rounded-full w-fit border px-2.5 py-0.5 text-caption">
                    {copy.soon}
                  </span>

                  <div>
                    <h4 className="text-ink-black text-body-lg font-medium">{item.name}</h4>
                    <p className="text-slate-gray mt-2 text-body">
                      {platformCopy[item.id]?.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Ngambeg Cyber Media: katalog game dan aplikasi tinggal di ngambeg.com,
              jadi kartu ini hanya pintu masuk, bukan daftar yang harus ikut diperbarui. */}
          <article className="bg-fog-white rounded-cards border-hairline flex flex-col gap-6 border p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-ink-black text-body-lg font-medium">
                {copy.groups.ngambeg.label}
              </h3>
              <p className="text-ash-gray text-caption">{copy.groups.ngambeg.brand}</p>
              <p className="text-slate-gray mt-3 max-w-xl text-body">
                {copy.groups.ngambeg.description}
              </p>
            </div>

            <a
              href={ngambegHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink-black text-ink-black rounded-buttons hover:bg-mist-gray inline-flex h-11 w-fit shrink-0 items-center gap-1.5 border px-5 text-caption transition"
            >
              {copy.hub}
              <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                →
              </span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
