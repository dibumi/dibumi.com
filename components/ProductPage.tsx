import Link from "next/link";
import {
  ngambegSlug,
  platformProducts,
  productPath,
  relatedProducts,
  type PlatformSlug,
} from "@/lib/products";
import type { SiteContent } from "@/lib/i18n";

/**
 * Halaman detail satu produk platform.
 *
 * Halaman ini ada supaya menu produk punya tujuan. Sebelumnya nama produk di
 * navbar dan di section Products hanya berhenti di sana; sekarang tiap nama
 * punya alamat sendiri, dan halaman grup Ngambeg tetap satu pintu keluar ke
 * katalognya.
 *
 * Bentuknya mengikuti halaman layanan, bukan beranda: satu kolom baca, judul
 * serif sekali saja, lalu blok yang dipisah hairline. Isinya sengaja kurus —
 * tidak ada harga, jumlah pengguna, tanggal rilis, atau testimoni, karena
 * semua itu belum tentu benar dan yang belum tentu benar tidak ditulis.
 *
 * Geometri pill-nya tiga peran, dan ketiganya dipakai sama persis di halaman
 * layanan dan halaman grup: h-12 px-6 untuk aksi utama, h-12 px-2 untuk tautan
 * sekunder, h-11 px-5 untuk CTA penutup. Badge Soon bukan pill — tingginya
 * mengikuti baris teks, sama dengan SoonBadge di menu produk.
 *
 * Karena produknya belum terbit, deskripsi ditemani `page.statusNote`. Begitu
 * `href` di lib/products.ts diisi, halaman ini otomatis menukar pill "diskusi"
 * dengan tautan keluar ke situs produknya, tanpa satu string pun disunting.
 *
 * Tanpa state, jadi server component.
 */
export default function ProductPage({
  content,
  basePath,
  slug,
}: {
  content: SiteContent;
  basePath: string;
  slug: PlatformSlug;
}) {
  const item = platformProducts.find((product) => product.slug === slug)!;
  const copy = content.products.platforms[item.id];
  const labels = content.products.page;

  return (
    <article className="mx-auto max-w-page px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:pb-24 lg:pt-24">
      {/* Satu kolom baca, dan `62ch` inilah ukuran barisnya — angka yang sama
          dengan ServicePage dan NgambegPage. Paragraf di dalamnya karena itu
          tidak membawa batas lebar sendiri. Dulu paragraf pengantar diberi
          `58ch`: karena 58 lebih sempit dari 62, batas itu tidak pernah aktif
          dan hanya meninggalkan dua angka untuk satu kolom. */}
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

        {/* Nama produk tidak diterjemahkan (nama merek), jadi datang dari
            lib/products.ts; hanya label dan deskripsi yang lewat i18n. */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="text-ink-black font-display text-heading mt-0 font-normal sm:text-heading-lg">
            {item.name}
          </h1>
          {item.status === "soon" ? (
            <span className="border-hairline text-ash-gray shrink-0 rounded-buttons inline-flex items-center border px-2 py-0.5 text-caption">
              {content.products.soon}
            </span>
          ) : null}
        </div>

        <p className="text-slate-gray mt-5 text-body-lg">{copy.description}</p>

        {item.status === "soon" ? (
          <p className="text-ash-gray mt-3 text-caption">{labels.statusNote}</p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 inline-flex h-12 items-center justify-center gap-2 px-6 text-body transition"
            >
              {content.products.visit}
              <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                ↗
              </span>
            </a>
          ) : (
            <Link
              href={`${basePath}#contact`}
              className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 group inline-flex h-12 items-center justify-center gap-2 px-6 text-body transition"
            >
              {labels.discuss}
              <Arrow />
            </Link>
          )}
          <Link
            href={`${basePath}#products`}
            className="text-ink-black group inline-flex h-12 items-center gap-2 px-2 text-body transition hover:underline"
          >
            {labels.all}
            <Arrow />
          </Link>
        </div>
      </div>

      {/* Yang termasuk. Baris hairline, bukan kartu: di halaman ini tidak ada
          satu pun permukaan yang perlu diangkat dari latar. */}
      <section className="mt-14 lg:mt-16">
        <h2 className="text-ash-gray text-caption">{labels.included}</h2>
        <ul className="border-hairline mt-4 grid gap-x-10 border-t sm:grid-cols-2">
          {copy.points.map((point) => (
            <li key={point} className="border-hairline text-ink-black border-b py-4 text-body">
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Produk lain, dihitung dari daftar yang sama dan berputar di ujungnya
          supaya tidak pernah menaut ke halaman ini sendiri. */}
      <section className="mt-14 lg:mt-16">
        <h2 className="text-ash-gray text-caption">{labels.related}</h2>
        <ul className="border-hairline mt-4 border-t">
          {relatedProducts(slug, 3).map((other) => (
            <li key={other}>
              <Link
                href={`${basePath}${productPath(other)}`}
                className="group border-hairline flex items-baseline justify-between gap-4 border-b py-4"
              >
                <span className="text-ink-black text-body font-medium group-hover:underline">
                  {other === ngambegSlug
                    ? content.products.groups.ngambeg.label
                    : (platformProducts.find((product) => product.slug === other)?.name ?? "")}
                </span>
                <span aria-hidden="true" className="text-slate-gray shrink-0 rtl:-scale-x-100">
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
 *
 * Dua glyph, bukan satu, karena satu glyph tidak bisa keluar dan masuk
 * sekaligus: yang pertama keluar ke arah baca, yang kedua sudah menunggu di
 * seberang dan mengisi tempatnya. Di RTL arah bacanya ke kiri, jadi glyph
 * pertama keluar ke kiri dan glyph kedua harus mulai dari kanan. Tanpa
 * `rtl:translate-x-full` keduanya bergerak ke tepi kiri dan sempat bertumpuk di
 * tengah kotak — terbaca sebagai dua panah, bukan satu panah yang lewat.
 */
function Arrow() {
  return (
    <span aria-hidden="true" className="relative inline-block h-4 w-4 overflow-hidden">
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-full rtl:-scale-x-100 rtl:group-hover:-translate-x-full">
        →
      </span>
      <span className="absolute inset-0 flex -translate-x-full items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0 rtl:translate-x-full rtl:-scale-x-100 rtl:group-hover:translate-x-0">
        →
      </span>
    </span>
  );
}