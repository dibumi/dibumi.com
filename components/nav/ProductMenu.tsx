import React from "react";
import { ArrowUpRight, CreditCard, Megaphone, Sparkles } from "lucide-react";
import { getProductGroup, ngambegHubUrl, type ProductItem } from "@/lib/products";
import type { SiteContent } from "@/lib/i18n";

/**
 * Isi panel Product. Dua bentuk: `ProductMenu` untuk mega panel desktop dan
 * `ProductMenuList` untuk lembar navigasi mobile. Keduanya membaca data yang
 * sama dari lib/products.ts, jadi produk baru cukup ditambah di sana.
 *
 * Radius yang dipakai konsisten: badge 6px, baris klik 8px, panel tanpa radius
 * karena menempel penuh ke tepi viewport.
 */

/** Ikon per produk platform, dipetakan lewat id dari lib/products.ts. */
const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  aiGateway: Sparkles,
  paymentOrchestration: CreditCard,
  adserverExchange: Megaphone,
};

type MenuProps = {
  content: SiteContent;
  /** Dipanggil setelah link internal diklik, dipakai mobile untuk menutup sheet. */
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

/** Produk Ngambeg: satu baris rapat, karena ada dua belas dan semuanya setara. */
function NgambegRow({
  item,
  content,
  onNavigate,
}: {
  item: ProductItem;
  content: SiteContent;
  onNavigate?: () => void;
}) {
  if (!item.href) {
    return (
      <span className="text-muted flex items-center justify-between gap-2 px-2.5 py-[7px] text-[13px] leading-snug">
        <bdi className="min-w-0 break-words">{item.name}</bdi>
        <SoonBadge label={content.products.soon} />
      </span>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className="text-ink hover:bg-elevated hover:text-primary flex items-center justify-between gap-2 rounded-lg px-2.5 py-[7px] text-[13px] leading-snug transition"
    >
      <bdi className="min-w-0 break-words">{item.name}</bdi>
      <ArrowUpRight className="text-muted h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </a>
  );
}

function AllProductsLink({ label, onNavigate }: { label: string; onNavigate?: () => void }) {
  return (
    <a
      href={ngambegHubUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className="text-primary hover:bg-elevated inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition"
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

/** Mega panel desktop: platform di kiri, Ngambeg dalam dua kolom di kanan. */
export function ProductMenu({ content, onNavigate }: MenuProps) {
  const platforms = getProductGroup("platforms");
  const ngambeg = getProductGroup("ngambeg");

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-0">
      <div className="md:pe-8">
        <GroupLabel note={content.products.groups.platforms.brand}>
          {content.products.groups.platforms.label}
        </GroupLabel>
        <ul className="mt-1.5">
          {platforms.items.map((item) => (
            <li key={item.id}>
              <PlatformRow item={item} content={content} />
            </li>
          ))}
        </ul>
      </div>

      <div className="border-line-subtle border-t pt-6 md:border-s md:border-t-0 md:ps-8 md:pt-0">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <GroupLabel note={content.products.groups.ngambeg.brand}>
            {content.products.groups.ngambeg.label}
          </GroupLabel>
          <AllProductsLink label={content.nav.allProducts} onNavigate={onNavigate} />
        </div>
        <ul className="mt-1.5 grid gap-x-4 sm:grid-cols-2">
          {ngambeg.items.map((item) => (
            <li key={item.id}>
              <NgambegRow item={item} content={content} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Versi mobile: satu kolom, dengan pemisah tipis antar grup. */
export function ProductMenuList({ content, onNavigate }: MenuProps) {
  const platforms = getProductGroup("platforms");
  const ngambeg = getProductGroup("ngambeg");

  return (
    <div className="space-y-4">
      <div>
        <GroupLabel note={content.products.groups.platforms.brand}>
          {content.products.groups.platforms.label}
        </GroupLabel>
        <ul className="mt-1">
          {platforms.items.map((item) => (
            <li key={item.id}>
              <PlatformRow item={item} content={content} />
            </li>
          ))}
        </ul>
      </div>

      <div className="border-line-subtle border-t pt-4">
        <GroupLabel note={content.products.groups.ngambeg.brand}>
          {content.products.groups.ngambeg.label}
        </GroupLabel>
        <ul className="mt-1">
          {ngambeg.items.map((item) => (
            <li key={item.id}>
              <NgambegRow item={item} content={content} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
        <div className="mt-1.5">
          <AllProductsLink label={content.nav.allProducts} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
