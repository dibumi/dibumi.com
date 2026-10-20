import React from "react";
import { ArrowUpRight, CreditCard, Layers, Megaphone, Sparkles } from "lucide-react";
import { getPlatformProducts, ngambegHubUrl, type ProductItem } from "@/lib/products";
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
 * Radius yang dipakai konsisten: badge 6px, baris klik 8px, tile tautan 12px,
 * panel tanpa radius karena menempel penuh ke tepi viewport.
 */

/** Ikon per produk platform, dipetakan lewat id dari lib/products.ts. */
const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  aiGateway: Sparkles,
  paymentOrchestration: CreditCard,
  adserverExchange: Megaphone,
};

type MenuProps = {
  content: SiteContent;
  /** Dipanggil setelah link diklik, dipakai untuk menutup panel atau sheet. */
  onNavigate?: () => void;
};

function SoonBadge({ label }: { label: string }) {
  return (
    <span className="border-line text-muted shrink-0 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
      {label}
    </span>
  );
}

function GroupLabel({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <p className="text-muted flex flex-wrap items-baseline gap-x-2 px-2.5 text-[10px] font-semibold uppercase tracking-wider">
      <span>{children}</span>
      {note && (
        <span className="text-muted/70 text-[10px] font-normal normal-case tracking-normal">
          {note}
        </span>
      )}
    </p>
  );
}

/** Produk platform: ikon, nama, deskripsi satu baris, badge Soon. */
function PlatformRow({ item, content }: { item: ProductItem; content: SiteContent }) {
  const Icon = platformIcons[item.id] ?? Sparkles;
  const description =
    (content.products.platforms as Record<string, { description: string }>)[item.id]
      ?.description ?? "";

  const body = (
    <>
      <span className="bg-primary-soft text-primary mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <bdi className="text-ink text-sm font-semibold">{item.name}</bdi>
          {item.status === "soon" && <SoonBadge label={content.products.soon} />}
        </span>
        <span className="text-muted mt-0.5 block text-[11px] leading-4">{description}</span>
      </span>
    </>
  );

  if (!item.href) {
    return <div className="flex items-start gap-3 px-2.5 py-2.5">{body}</div>;
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:bg-elevated flex items-start gap-3 rounded-lg px-2.5 py-2.5 transition"
    >
      {body}
    </a>
  );
}

/**
 * Satu tile tautan keluar ke ngambeg.com, menggantikan daftar dua belas game
 * dan aplikasi. Nama grup sekaligus jadi judul tile, jadi tidak ada label grup
 * terpisah di atasnya yang akan mengulang teks yang sama.
 */
function NgambegTile({ content, onNavigate }: { content: SiteContent; onNavigate?: () => void }) {
  const group = content.products.groups.ngambeg;

  return (
    <a
      href={ngambegHubUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className="border-line hover:border-primary/40 hover:bg-elevated group flex items-start gap-3 rounded-xl border p-3 transition"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
        <Layers className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <span className="text-ink group-hover:text-primary text-sm font-semibold transition">
            {group.label}
          </span>
          <ArrowUpRight className="text-muted h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </span>
        <span className="text-muted mt-0.5 block text-[11px] leading-4">{group.brand}</span>
        <span className="text-muted mt-1.5 block text-[11px] leading-4">{group.description}</span>
      </span>
    </a>
  );
}

/** Mega panel desktop: platform di kiri, tautan katalog Ngambeg di kanan. */
export function ProductMenu({ content, onNavigate }: MenuProps) {
  const platforms = getPlatformProducts();

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-0">
      <div className="md:pe-8">
        <GroupLabel note={content.products.groups.platforms.brand}>
          {content.products.groups.platforms.label}
        </GroupLabel>
        <ul className="mt-1.5">
          {platforms.map((item) => (
            <li key={item.id}>
              <PlatformRow item={item} content={content} />
            </li>
          ))}
        </ul>
      </div>

      <div className="border-line-subtle border-t pt-6 md:border-s md:border-t-0 md:ps-8 md:pt-0">
        <NgambegTile content={content} onNavigate={onNavigate} />
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
        <ul className="mt-1">
          {platforms.map((item) => (
            <li key={item.id}>
              <PlatformRow item={item} content={content} />
            </li>
          ))}
        </ul>
      </div>

      <div className="border-line-subtle border-t pt-4">
        <NgambegTile content={content} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
