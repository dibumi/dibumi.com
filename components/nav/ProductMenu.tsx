import React from "react";
import {
  getPlatformProducts,
  ngambegCatalogUrl,
  ngambegHubUrl,
  ngambegLogoUrl,
  type ProductItem,
} from "@/lib/products";
import type { SiteContent } from "@/lib/i18n";

/**
 * Isi panel Product. Dua bentuk: `ProductMenu` untuk mega panel desktop dan
 * `ProductMenuList` untuk lembar navigasi mobile. Keduanya membaca data yang
 * sama dari lib/products.ts, jadi produk baru cukup ditambah di sana.
 *
 * Katalog Ngambeg Cyber Media tidak dijabarkan lagi di sini: satu tile tautan
 * keluar ke ngambeg.com, karena daftar game dan aplikasinya hidup di sana dan
 * berubah tanpa menyentuh situs ini.
 *
 * Tidak ada ikon dekoratif dan tidak ada chip ikon. Baris menu adalah baris
 * teks yang tenang: nama, deskripsi, dan latar mist saat hover. Satu-satunya
 * gambar yang tersisa adalah logo Ngambeg, karena itu aset merek pihak ketiga,
 * bukan glyph hiasan.
 */

type MenuProps = {
  content: SiteContent;
  /** Dipanggil setelah link diklik, dipakai untuk menutup panel atau sheet. */
  onNavigate?: () => void;
};

/** Satu baris menu: tanpa border, hanya latar saat hover. */
const rowClass =
  "group flex items-start gap-3 rounded-smallcards px-4 py-3.5 transition hover:bg-mist-gray";

/** Panah teks untuk tautan keluar. Dibalik di RTL supaya tetap menunjuk maju. */
function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
      →
    </span>
  );
}

function SoonBadge({ label }: { label: string }) {
  return (
    <span className="border-hairline text-ash-gray text-caption shrink-0 rounded-full border px-2 py-0.5">
      {label}
    </span>
  );
}

function GroupLabel({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <p className="text-ash-gray text-caption flex flex-wrap items-baseline gap-x-2">
      <span>{children}</span>
      {note && <span className="text-smoke-gray text-caption">{note}</span>}
    </p>
  );
}

/** Produk platform: nama, deskripsi dua baris, badge Soon. */
function PlatformRow({ item, content }: { item: ProductItem; content: SiteContent }) {
  const description =
    (content.products.platforms as Record<string, { description: string }>)[item.id]
      ?.description ?? "";

  const body = (
    <span className="min-w-0 flex-1">
      <span className="flex flex-wrap items-center gap-2">
        <bdi className="text-ink-black text-body font-medium">{item.name}</bdi>
        {item.status === "soon" && <SoonBadge label={content.products.soon} />}
      </span>
      <span className="text-slate-gray text-caption line-clamp-2 mt-0.5 block">
        {description}
      </span>
    </span>
  );

  if (!item.href) {
    return <div className={rowClass}>{body}</div>;
  }

  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
      {body}
    </a>
  );
}

/**
 * Satu tile tautan keluar ke ngambeg.com, menggantikan daftar dua belas game
 * dan aplikasi. Nama grup sekaligus jadi judul tile, jadi tidak ada label grup
 * terpisah di atasnya yang akan mengulang teks yang sama.
 *
 * Ikonnya logo resmi Ngambeg dari situsnya sendiri, bukan glyph lucide: ini
 * satu-satunya label pihak ketiga di panel, jadi mark aslinya yang dipakai.
 * Diambil langsung dari ngambeg.com supaya tidak ada salinan yang bisa basi.
 * Tidak ada chip putih di belakangnya; logonya berdiri sendiri di atas latar.
 */
function NgambegTile({
  content,
  onNavigate,
}: {
  content: SiteContent;
  onNavigate?: () => void;
}) {
  const group = content.products.groups.ngambeg;

  return (
    <a
      href={ngambegHubUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className={rowClass}
    >
      <img
        src={ngambegLogoUrl}
        alt=""
        width={24}
        height={24}
        loading="lazy"
        decoding="async"
        className="mt-0.5 h-6 w-6 shrink-0 object-contain"
      />
      <span className="min-w-0 flex-1">
        {/* Domain menempel di baris judul, bukan barisnya sendiri: tile ini
            duduk di samping baris produk, jadi tinggi barisnya harus sama.
            Tiga baris teks membuatnya lebih jangkung dari tetangganya. */}
        <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <span className="text-ink-black text-body font-medium">{group.label}</span>
          <span className="text-ash-gray text-caption">{group.brand}</span>
          <span className="text-ash-gray text-caption">
            <Arrow />
          </span>
        </span>
        <span className="text-slate-gray text-caption line-clamp-2 mt-0.5 block">
          {group.description}
        </span>
      </span>
    </a>
  );
}

/** Satu sel katalog: label dan panah keluar, tanpa chip ikon. */
function CatalogCell({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className="group hover:bg-mist-gray rounded-smallcards flex h-full items-center gap-2.5 px-4 py-3 transition"
    >
      <span className="text-ink-black text-caption min-w-0 flex-1 truncate font-medium">
        {label}
      </span>
      <span className="text-ash-gray text-caption shrink-0">
        <Arrow />
      </span>
    </a>
  );
}

/**
 * Dua pintu ke katalog Ngambeg: game dan aplikasi, masing-masing ke halaman
 * kategorinya sendiri di ngambeg.com.
 */
function NgambegCatalog({
  content,
  onNavigate,
}: {
  content: SiteContent;
  onNavigate?: () => void;
}) {
  const catalog = content.products.catalog;

  return (
    <div>
      <GroupLabel>{catalog.heading}</GroupLabel>
      <ul className="mt-2 grid auto-rows-fr grid-cols-2 gap-1">
        <li>
          <CatalogCell
            href={ngambegCatalogUrl.games}
            label={catalog.games}
            onNavigate={onNavigate}
          />
        </li>
        <li>
          <CatalogCell
            href={ngambegCatalogUrl.apps}
            label={catalog.apps}
            onNavigate={onNavigate}
          />
        </li>
      </ul>
    </div>
  );
}

/** Mega panel desktop: platform di kiri, tautan katalog Ngambeg di kanan. */
export function ProductMenu({ content, onNavigate }: MenuProps) {
  const platforms = getPlatformProducts();

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-0">
      <div className="md:pe-8">
        <GroupLabel note={content.products.groups.platforms.brand}>
          {content.products.groups.platforms.label}
        </GroupLabel>
        <ul className="mt-2 grid auto-rows-fr gap-1">
          {platforms.map((item) => (
            <li key={item.id}>
              <PlatformRow item={item} content={content} />
            </li>
          ))}
        </ul>
      </div>

      <div className="border-hairline border-t pt-6 md:border-s md:border-t-0 md:ps-8 md:pt-0">
        {/* Label di sini bukan hiasan: kolom kiri didahului label platforms,
            jadi tanpa label yang setara, tile Ngambeg akan sejajar dengan
            label itu dan bukan dengan baris AI Gateway. */}
        <GroupLabel>{content.products.groups.ngambeg.label}</GroupLabel>
        <div className="mt-2 space-y-1">
          <NgambegTile content={content} onNavigate={onNavigate} />
          <NgambegCatalog content={content} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

/** Versi mobile: satu kolom, dengan pemisah tipis antar grup. */
export function ProductMenuList({ content, onNavigate }: MenuProps) {
  const platforms = getPlatformProducts();

  return (
    <div className="space-y-4">
      <div>
        <GroupLabel note={content.products.groups.platforms.brand}>
          {content.products.groups.platforms.label}
        </GroupLabel>
        <ul className="mt-2 grid auto-rows-fr gap-1">
          {platforms.map((item) => (
            <li key={item.id}>
              <PlatformRow item={item} content={content} />
            </li>
          ))}
        </ul>
      </div>

      <div className="border-hairline space-y-4 border-t pt-4">
        <NgambegTile content={content} onNavigate={onNavigate} />
        <NgambegCatalog content={content} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
