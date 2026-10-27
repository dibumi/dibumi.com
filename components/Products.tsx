"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { getPlatformProducts, ngambegCatalogUrl, ngambegHubUrl, ngambegSlug, productPath } from "@/lib/products";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import type { SiteContent } from "@/lib/i18n";

/**
 * Section Products: daftar produk di kiri, produk terpilih di kanan.
 *
 * Referensinya memakai device ini untuk demo produknya — daftar tab vertikal
 * di kiri, tangkapan layar aplikasi yang besar di kanan. Device itu yang bikin
 * section terasa seperti produk, bukan seperti tabel katalog.
 *
 * Yang di(frame) bukan tangkapan layar karangan: isinya data produk nyata
 * dari lib/products.ts dan lib/i18n.ts, ditata seperti dokumen. Tidak ada
 * grafik, angka, atau UI yang tidak benar-benar ada.
 *
 * Soalnya section ini harus client component: interaksi tab butuh state.
 * Data tetap masuk lewat props dari server, jadi tidak ada data yang bocor ke
 * bundle dan tidak ada request tambahan.
 *
 * Pita background-nya tetap gradien fog ke putih, supaya panel terasa
 * mengambang di atasnya — persis seperti dashboard yang berdiri sendiri di
 * referensi.
 *
 * Setiap tab punya halaman sendiri di `/{locale}/products/{slug}`, dan tautan
 * "Learn more" di samping badge Soon itulah pintunya. Tanpa itu, produk yang
 * situsnya belum terbit hanya berhenti di badge dan tidak bisa diklik.
 *
 * Geometri pill di sini mengikuti dua peran yang sama dengan halaman detail:
 * h-12 px-6 untuk aksi utama, h-11 px-4 untuk pill bergaris — di section ini
 * hanya yang kedua yang dipakai. Badge status bukan pill: tingginya mengikuti
 * baris teks. Tidak ada tinggi ketiga.
 */
export default function Products({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  const copy = content.products;
  const platforms = getPlatformProducts();
  const platformCopy = copy.platforms as Record<string, { description: string }>;

  // Tab terakhir adalah grup Ngambeg, bukan produk platform, jadi daftar tab
  // dibangun dari dua sumber: katalog platform dan satu pintu keluar.
  // `pageHref` selalu menuju halaman internal; `href` hanya terisi kalau
  // produknya memang punya situs sendiri yang bisa dibuka.
  const tabs = [
    ...platforms.map((item) => ({
      key: item.id,
      name: item.name,
      group: copy.groups.platforms.label,
      brand: copy.groups.platforms.brand,
      description: platformCopy[item.id]?.description ?? "",
      status: copy.soon as string | null,
      href: null as string | null,
      pageHref: `${basePath}${productPath(item.slug)}`,
    })),
    {
      key: "ngambeg",
      name: copy.groups.ngambeg.label,
      group: copy.groups.ngambeg.label,
      brand: copy.groups.ngambeg.brand,
      description: copy.groups.ngambeg.description,
      status: null,
      href: ngambegHubUrl,
      pageHref: `${basePath}${productPath(ngambegSlug)}`,
    },
  ];

  // Tab pertama yang benar-benar punya situs terbit. Enam produk platform masih
  // berstatus "Soon", jadi membuka section ini pada tab 0 berarti panel besar
  // pertama yang dibaca pengunjung adalah produk yang belum ada — di section
  // yang tugasnya membuktikan bahwa studio ini mengirim sesuatu. Urutan tab
  // TIDAK diubah (katalog platform tetap 01-06, sama seperti menu navbar yang
  // juga menaruh platform lebih dulu); yang berubah hanya panel yang terbuka.
  //
  // `Math.max(0, ...)` menjaga keadaan yang hari ini tidak terjadi: kalau suatu
  // saat tidak ada satu pun produk terbit, tab 0 tetap jadi pilihan yang sah
  // dan tidak ada indeks -1 yang membuat `current` undefined.
  const liveTabIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.href !== null),
  );

  const [active, setActive] = React.useState(liveTabIndex);
  const current = tabs[active];
  const reduce = useReducedMotion();

  /**
   * Papan ketik tablist, mengikuti pola APG: panah kiri/kanan — dan atas/bawah,
   * karena di desktop daftarnya vertikal — memindah pilihan, Home/End melompat
   * ke ujung. Fokus ikut dipindah supaya pengguna tidak perlu Tab lagi setelah
   * panah; `tabIndex` di bawah menjaga hanya satu tab yang jadi titik Tab.
   */
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) {
      return;
    }
    event.preventDefault();

    let next: number;
    if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = tabs.length - 1;
    } else {
      const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
      next = forward ? (active + 1) % tabs.length : (active - 1 + tabs.length) % tabs.length;
    }

    setActive(next);
    document.getElementById(`product-tab-${tabs[next].key}`)?.focus();
  };

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-gradient-to-b from-fog-white to-paper-white py-20 lg:py-40"
    >
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
          {/* Daftar tab. Di desktop vertikal seperti referensi; di layar
              sempit menjadi baris chip yang bisa digulir horizontal, supaya
              device-nya tetap ada tanpa memaksa kolom sempit.

              `pt-2` + `-mt-2` hanya untuk cincin fokus: `overflow-x-auto`
              memotong apa pun di luar padding box, jadi tanpa ruang itu outline
              2px di tepi atas chip terpangkas. Margin negatifnya mengembalikan
              posisi chip ke tempat semula, dan keduanya dilepas di lg saat
              daftarnya sudah tidak menggulir. */}
          <div
            role="tablist"
            aria-label={copy.eyebrow}
            aria-orientation="vertical"
            className="-mx-5 -mt-2 flex gap-2 overflow-x-auto px-5 pb-2 pt-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:py-0"
          >
            {tabs.map((tab, index) => {
              const selected = index === active;

              return (
                <button
                  key={tab.key}
                  id={`product-tab-${tab.key}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="product-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={onKeyDown}
                  className={`group shrink-0 whitespace-nowrap text-start transition lg:shrink lg:whitespace-normal lg:border-b lg:border-hairline lg:py-4 ${
                    selected
                      ? "text-ink-black lg:font-medium"
                      : "text-slate-gray hover:text-ink-black"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-ash-gray tabular text-caption">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body">{tab.name}</span>
                  </span>

                  {/* Penanda tab aktif: garis pendek di bawah, seperti
                      referensi. Bukan bullet, bukan latar — cukup satu
                      tanda tangan. Yang bertransisi hanya lebar dan opasitas;
                      `transition-all` ikut memindahkan properti lain tanpa
                      perlu, dan `motion-reduce` mematikan gerak garisnya. */}
                  <span
                    aria-hidden="true"
                    className={`mt-2 hidden h-px bg-ink-black transition-[width,opacity] duration-300 lg:block ${
                      selected ? "w-10 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Panel: bingkai produk. Bingkai luar hanya jarak 2px antara
              perangkat dan isinya, supaya terbaca sebagai perangkat, bukan
              sebagai kartu biasa.

              Jeda reveal-nya 0.08 dan 0.16 — pasangan yang sudah dipakai
              ContactSection untuk dua blok berurutan: satu langkah untuk panel,
              dua langkah untuk katalog di bawahnya. */}
          <Reveal delay={0.08}>
            <div
              id="product-panel"
              role="tabpanel"
              aria-labelledby={`product-tab-${current.key}`}
              tabIndex={0}
              className="bg-paper-white shadow-subtle-3 rounded-elevatedcards p-2"
            >
              {/* Chrome: tiga titik dan address bar. Ini yang membuat panel
                  terbaca sebagai tangkapan layar, bukan sebagai kartu teks. */}
              <div className="bg-fog-white rounded-cards flex items-center gap-3 px-4 py-3">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="bg-smoke-gray h-2.5 w-2.5 rounded-full" />
                  <span className="bg-smoke-gray h-2.5 w-2.5 rounded-full" />
                  <span className="bg-smoke-gray h-2.5 w-2.5 rounded-full" />
                </span>
                <span className="bg-paper-white text-ash-gray mx-auto truncate rounded-buttons px-4 py-1 text-caption">
                  {current.brand}
                </span>
              </div>

              {/* `initial` dimatikan DAN durasinya dinolkan saat preferensi
                  reduced-motion aktif. Durasinya ikut nol, bukan hanya
                  `initial`, karena preferensi itu baru terbaca setelah mount —
                  dan karena komponen ini remount tiap ganti tab (`key`), animasi
                  0.35s akan tetap diputar di setiap pergantian tab kalau hanya
                  `initial` yang dimatikan.

                  `data-reveal` menahannya tetap terlihat saat JavaScript tidak
                  jalan: tanpa itu panel tab pertama keluar kosong, karena
                  opasitas 0 dari `initial` tidak ada yang menghapus. */}
              <motion.div
                key={current.key}
                data-reveal
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="px-2 pb-2 pt-10 sm:px-8 sm:pb-8 sm:pt-14"
              >
                <p className="text-ash-gray text-caption">{current.group}</p>

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <h3 className="text-ink-black font-display text-heading font-normal">
                    {current.name}
                  </h3>
                  {current.href ? (
                    <a
                      href={current.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-ink-black text-ink-black rounded-buttons inline-flex h-11 items-center gap-1.5 border px-4 text-caption transition hover:bg-mist-gray"
                    >
                      {copy.hub}
                      <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                        ↗
                      </span>
                    </a>
                  ) : (
                    /* Badge status, bukan pill: geometrinya sama dengan SoonBadge
                       di menu produk (px-2 py-0.5) — yang di sebelah kanan adalah
                       aksi, ini keterangan. Radiusnya token `buttons`, dan
                       `inline-flex items-center` menaruh teks di tengah kotaknya
                       (padding vertikal pada elemen inline tidak menggeser line
                       box). */
                    <span className="border-hairline text-ash-gray shrink-0 rounded-buttons inline-flex items-center border px-2 py-0.5 text-caption">
                      {current.status}
                    </span>
                  )}
                  {/* Panel ini dulu berhenti di badge atau tautan keluar saja:
                      produk yang situsnya belum terbit tidak bisa diklik ke mana
                      pun. Sekarang setiap produk punya halaman sendiri. */}
                  <Link
                    href={current.pageHref}
                    className="text-ink-black text-caption inline-flex items-center gap-1 hover:underline"
                  >
                    {content.common.learnMore}
                    <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
                      →
                    </span>
                  </Link>
                </div>

                {/* Lebar baris di dalam panel diukur sendiri: panel ini lebih
                    lebar dari kolom baca 62ch di halaman detail, dan deskripsinya
                    lead 20px — 54ch menjaga barisnya tetap pendek di panel yang
                    lebar. */}
                <p className="text-slate-gray mt-5 max-w-[54ch] text-body-lg">
                  {current.description}
                </p>

                {/* Baris bawah: posisi produk dalam katalog. Angkanya nyata,
                    bukan dekorasi. */}
                <div className="border-hairline mt-12 flex items-center justify-between border-t pt-5">
                  <span className="text-ash-gray tabular text-caption">
                    {String(active + 1).padStart(2, "0")} / {String(tabs.length).padStart(2, "0")}
                  </span>
                  <span className="text-ash-gray text-caption">{copy.eyebrow}</span>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* Katalog lengkap Ngambeg: satu pintu keluar ke daftar game dan
            aplikasinya, karena katalog itu hidup di sana dan tidak perlu
            diduplikasi di sini. */}
        <Reveal delay={0.16}>
          <div className="border-hairline mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8 lg:mt-24">
            <div className="min-w-0">
              <p className="text-ink-black text-body font-medium">
                {copy.catalog.heading}
              </p>
              <p className="text-ash-gray mt-1 text-caption">
                {copy.groups.ngambeg.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={ngambegCatalogUrl.games}
                className="border-ink-black text-ink-black rounded-buttons inline-flex h-11 items-center border px-4 text-caption transition hover:bg-mist-gray"
              >
                {copy.catalog.games}
              </Link>
              <Link
                href={ngambegCatalogUrl.apps}
                className="border-ink-black text-ink-black rounded-buttons inline-flex h-11 items-center border px-4 text-caption transition hover:bg-mist-gray"
              >
                {copy.catalog.apps}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
