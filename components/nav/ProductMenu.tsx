import React from "react";
import {
  ArrowUpRight,
  ChartLine,
  CreditCard,
  Gamepad2,
  Megaphone,
  Receipt,
  Smartphone,
  Sparkles,
  Store,
} from "lucide-react";
import {
  getPlatformProducts,
  ngambegCatalogUrl,
  ngambegHubUrl,
  ngambegLogoUrl,
  type ProductItem,
} from "@/lib/products";
import { iconTints, rowTints, tintAt } from "@/lib/tints";
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
  cloudHostingBilling: Receipt,
  trafficAnalytics: ChartLine,
  selfHostedOnlineStore: Store,
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
    <p className="text-muted flex flex-wrap items-baseline gap-x-2 text-[10px] font-semibold uppercase tracking-wider">
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
function PlatformRow({
  item,
  content,
  tint,
}: {
  item: ProductItem;
  content: SiteContent;
  tint: number;
}) {
  const Icon = platformIcons[item.id] ?? Sparkles;
  const description =
    (content.products.platforms as Record<string, { description: string }>)[item.id]
      ?.description ?? "";

  const shell = `flex h-full items-start gap-3 rounded-xl border px-4 py-4 transition ${rowTints[tint]}`;

  const body = (
    <>
      <span
        className={`bg-surface mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm ${iconTints[tint]}`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <bdi className="text-ink group-hover:text-primary text-sm font-semibold transition">
            {item.name}
          </bdi>
          {item.status === "soon" && <SoonBadge label={content.products.soon} />}
        </span>
        <span className="text-muted mt-0.5 line-clamp-2 block text-xs leading-5">{description}</span>
      </span>
    </>
  );

  if (!item.href) {
    return <div className={shell}>{body}</div>;
  }

  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${shell} group`}>
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
 */
function NgambegTile({
  content,
  onNavigate,
  tint,
}: {
  content: SiteContent;
  onNavigate?: () => void;
  tint: number;
}) {
  const group = content.products.groups.ngambeg;

  return (
    <a
      href={ngambegHubUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className={`group flex items-start gap-3 rounded-xl border px-4 py-4 transition ${rowTints[tint]}`}
    >
      <span className="bg-surface mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm">
        <img
          src={ngambegLogoUrl}
          alt=""
          width={24}
          height={24}
          loading="lazy"
          decoding="async"
          className="h-6 w-6 object-contain"
        />
      </span>
      <span className="min-w-0 flex-1">
        {/* Domain menempel di baris judul, bukan barisnya sendiri: tile ini
            duduk di samping baris produk, jadi tinggi barisnya harus sama.
            Tiga baris teks membuatnya lebih jangkung dari tetangganya. */}
        <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <span className="text-ink group-hover:text-primary text-sm font-semibold transition">
            {group.label}
          </span>
          <span className="text-muted text-[11px]">{group.brand}</span>
          <ArrowUpRight className="text-muted h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </span>
        <span className="text-muted mt-0.5 line-clamp-2 block text-xs leading-5">
          {group.description}
        </span>
      </span>
    </a>
  );
}

/** Satu sel katalog: ikon, label, dan panah keluar. */
function CatalogCell({
  href,
  label,
  Icon,
  tint,
  onNavigate,
}: {
  href: string;
  label: string;
  Icon: typeof Gamepad2;
  tint: number;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavigate}
      className={`group flex h-full items-center gap-2.5 rounded-xl border px-3 py-3 transition ${rowTints[tint]}`}
    >
      <span
        className={`bg-surface flex h-7 w-7 shrink-0 items-center justify-center rounded-lg shadow-sm ${iconTints[tint]}`}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <span className="text-ink group-hover:text-primary min-w-0 flex-1 truncate text-sm font-semibold transition">
        {label}
      </span>
      <ArrowUpRight className="text-muted h-3.5 w-3.5 shrink-0" aria-hidden="true" />
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
  tint,
}: {
  content: SiteContent;
  onNavigate?: () => void;
  /** Indeks warna tile Ngambeg; dua sel di bawahnya melanjutkan deret itu. */
  tint: number;
}) {
  const catalog = content.products.catalog;

  return (
    <div>
      <GroupLabel>{catalog.heading}</GroupLabel>
      <ul className="mt-2 grid auto-rows-fr grid-cols-2 gap-2.5">
        <li>
          <CatalogCell
            href={ngambegCatalogUrl.games}
            label={catalog.games}
            Icon={Gamepad2}
            tint={tintAt(tint + 1)}
            onNavigate={onNavigate}
          />
        </li>
        <li>
          <CatalogCell
            href={ngambegCatalogUrl.apps}
            label={catalog.apps}
            Icon={Smartphone}
            tint={tintAt(tint + 2)}
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
        <ul className="mt-2 grid auto-rows-fr gap-2.5">
          {platforms.map((item, index) => (
            <li key={item.id}>
              <PlatformRow item={item} content={content} tint={tintAt(index)} />
            </li>
          ))}
        </ul>
      </div>

      <div className="border-line-subtle border-t pt-6 md:border-s md:border-t-0 md:ps-8 md:pt-0">
        {/* Label di sini bukan hiasan: kolom kiri didahului label PLATFORMS, jadi
            tanpa label yang setara, tile Ngambeg akan sejajar dengan label itu
            dan bukan dengan baris AI Gateway. Siklus warna melanjutkan deret
            kolom kiri, sehingga dua kolom terbaca sebagai satu urutan. */}
        <GroupLabel>{content.products.groups.ngambeg.label}</GroupLabel>
        <div className="mt-2 space-y-2.5">
          <NgambegTile
            content={content}
            onNavigate={onNavigate}
            tint={tintAt(platforms.length)}
          />
          <NgambegCatalog
            content={content}
            onNavigate={onNavigate}
            tint={tintAt(platforms.length)}
          />
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
        <ul className="mt-2 grid auto-rows-fr gap-2.5">
          {platforms.map((item, index) => (
            <li key={item.id}>
              <PlatformRow item={item} content={content} tint={tintAt(index)} />
            </li>
          ))}
        </ul>
      </div>

      <div className="border-line-subtle space-y-4 border-t pt-4">
        <NgambegTile
          content={content}
          onNavigate={onNavigate}
          tint={tintAt(platforms.length)}
        />
        <NgambegCatalog
          content={content}
          onNavigate={onNavigate}
          tint={tintAt(platforms.length)}
        />
      </div>
    </div>
  );
}
