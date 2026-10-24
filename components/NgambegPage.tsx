import Link from "next/link";
import {
  ngambegCatalogUrl,
  ngambegHubUrl,
  platformProducts,
  productPath,
} from "@/lib/products";
import type { SiteContent } from "@/lib/i18n";

/**
 * Halaman detail grup Ngambeg Cyber Media.
 *
 * Grup ini butuh halaman sendiri karena navbar dan footer harus punya tujuan
 * internal — satu tautan keluar langsung ke ngambeg.com akan melewati situs ini
 * seluruhnya. Tapi ia bukan produk platform: tidak ada versi, tidak ada status
 * "segera", karena katalognya sudah terbit dan berjalan hari ini. Jadi tidak
 * ada badge Soon dan tidak ada catatan status di sini; yang ada hanya domain
 * mereknya, dua pintu ke katalog game dan aplikasi, lalu enam produk platform
 * sebagai tetangga di daftar produk.
 *
 * Isi katalog sengaja tidak dijabarkan: daftar game dan aplikasi hidup di
 * ngambeg.com dan berubah tanpa menyentuh situs ini, jadi menyalinnya di sini
 * hanya akan menghasilkan dua daftar yang perlahan berbeda. Halaman ini
 * menautkan, bukan menyalin.
 *
 * Bentuknya mengikuti halaman layanan: satu kolom baca, judul serif sekali
 * saja, blok yang dipisah hairline, dan CTA penutup. Tanpa state, jadi server
 * component. Tidak ada ikon dekoratif — panah di sini bagian dari label.
 */
export default function NgambegPage({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  const group = content.products.groups.ngambeg;
  const catalog = content.products.catalog;
  const labels = content.products.page;

  return (
    <article className="mx-auto max-w-page px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:pb-24 lg:pt-24">
      <div className="max-w-[62ch]">
        <Link
          href={`${basePath}#products`}
          className="text-ash-gray hover:text-slate-gray inline-flex items-center gap-1.5 text-caption transition"
        >
          {content.products.eyebrow}
          <span aria-hidden="true" className="rtl:-scale-x-100">
            ›
          </span>
        </Link>

        <h1 className="text-ink-black font-display text-heading mt-4 font-normal sm:text-heading-lg">
          {group.label}
        </h1>

        <p className="text-ash-gray mt-2 text-caption">{group.brand}</p>

        <p className="text-slate-gray mt-5 max-w-[58ch] text-body-lg">{group.description}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={ngambegHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 inline-flex h-12 items-center justify-center gap-2 px-6 text-body transition"
          >
            {content.products.visit} {group.brand}
            <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
              ↗
            </span>
          </a>
          <Link
            href={`${basePath}#products`}
            className="text-ink-black group inline-flex h-12 items-center gap-2 px-2 text-body transition hover:underline"
          >
            {labels.all}
            <Arrow />
          </Link>
        </div>
      </div>

      {/* Dua pintu katalog. Tile, bukan baris hairline: keduanya tautan keluar
          yang setara, jadi bentuk yang sama menandakan pilihan yang setara. */}
      <section className="mt-14 lg:mt-16">
        <h2 className="text-ash-gray text-caption">{catalog.heading}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a
            href={ngambegCatalogUrl.games}
            target="_blank"
            rel="noopener noreferrer"
            className="group border-hairline rounded-smallcards hover:bg-mist-gray flex h-full flex-col gap-1 border px-5 py-4 transition"
          >
            <span className="flex items-baseline justify-between gap-3">
              <span className="text-ink-black text-body font-medium">{catalog.games}</span>
              <span aria-hidden="true" className="text-ash-gray shrink-0">
                ↗
              </span>
            </span>
            <span className="text-slate-gray text-caption">{catalog.gamesNote}</span>
          </a>

          <a
            href={ngambegCatalogUrl.apps}
            target="_blank"
            rel="noopener noreferrer"
            className="group border-hairline rounded-smallcards hover:bg-mist-gray flex h-full flex-col gap-1 border px-5 py-4 transition"
          >
            <span className="flex items-baseline justify-between gap-3">
              <span className="text-ink-black text-body font-medium">{catalog.apps}</span>
              <span aria-hidden="true" className="text-ash-gray shrink-0">
                ↗
              </span>
            </span>
            <span className="text-slate-gray text-caption">{catalog.appsNote}</span>
          </a>
        </div>
      </section>

      {/* Produk lain: keenam produk platform, bukan `relatedProducts`, supaya
          halaman grup tetap jadi satu-satunya pintu ke seluruh katalog. */}
      <section className="mt-14 lg:mt-16">
        <h2 className="text-ash-gray text-caption">{labels.related}</h2>
        <ul className="border-hairline mt-4 border-t">
          {platformProducts.map((item) => (
            <li key={item.slug}>
              <Link
                href={`${basePath}${productPath(item.slug)}`}
                className="group border-hairline flex items-baseline justify-between gap-4 border-b py-4"
              >
                <span className="text-ink-black text-body font-medium group-hover:underline">
                  {item.name}
                </span>
                <span
                  aria-hidden="true"
                  className="text-slate-gray shrink-0 rtl:-scale-x-100"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="border-hairline mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
        <p className="text-slate-gray max-w-md text-caption">{content.contact.description}</p>
        <Link
          href={`${basePath}#contact`}
          className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 inline-flex h-11 items-center justify-center gap-2 px-5 text-caption transition"
        >
          {labels.discuss}
          <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

/**
 * Panah yang meluncur keluar lalu masuk dari sisi lain saat tautan di-hover.
 * Sama dengan panah di halaman layanan: pola dua glyph bertumpuk, dan dibalik
 * di RTL.
 */
function Arrow() {
  return (
    <span aria-hidden="true" className="relative inline-block h-4 w-4 overflow-hidden">
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-full rtl:-scale-x-100 rtl:group-hover:-translate-x-full">
        →
      </span>
      <span className="absolute inset-0 flex -translate-x-full items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0 rtl:-scale-x-100 rtl:group-hover:translate-x-0">
        →
      </span>
    </span>
  );
}