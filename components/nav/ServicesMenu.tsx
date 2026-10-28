import Link from "next/link";
import ServiceGlyph from "@/components/ServiceGlyph";
import { servicePath, type ServiceSlug } from "@/lib/services";
import type { SiteContent } from "@/lib/i18n";

/**
 * Isi panel Services. `ServiceItem` dirakit di Navbar karena judul dan
 * deskripsi berasal dari i18n, sedangkan slug dari lib/services.ts.
 *
 * `ServicesMenu` dipakai mega panel desktop (tiga kolom), `ServicesMenuList`
 * dipakai lembar mobile (satu kolom).
 *
 * Barisnya tetap setenang panel Product: tanpa border, tanpa chip, tanpa
 * lingkaran latar. Yang ada hanya glyph garis 20px di kiri judul, nama,
 * deskripsi, dan latar mist saat hover. Glyph itu satu gambar per layanan dari
 * `components/ServiceGlyph.tsx`, warnanya turun dari slate ke ink saat hover,
 * dan selalu `aria-hidden` karena namanya sudah hadir sebagai teks di
 * sebelahnya. Menu adalah tempat orang memindai tujuh pilihan, jadi satu tanda
 * pengenal per baris membeli sesuatu di sini; di pita beranda glyph itu
 * menggantikan ordinal yang sebelumnya memikul tugas yang sama.
 *
 * Sejak halaman layanan ada, setiap baris menuju
 * `/{locale}/services/{slug}` — bukan anchor beranda — karena menu "Services"
 * yang tidak membawa ke halamannya sendiri akan menyembunyikan tujuh halaman
 * itu dari pembaca.
 *
 * Di kaki kedua varian ada `retired`: layanan yang sudah tidak ditawarkan.
 * Barisnya diam — bukan tautan, karena tidak ada anchor yang bisa dituju dan
 * tautan mati lebih buruk daripada baris tanpa affordance — dipisah hairline
 * dan diredupkan seperti baris pensiun di section Services. Baris pensiun
 * sengaja tanpa glyph: glyph menandai apa yang bisa dipilih.
 */

export type ServiceItem = {
  title: string;
  description: string;
  slug: ServiceSlug;
};

/** Layanan yang sudah tidak ditawarkan: tampil di kaki panel, tanpa tautan. */
export type RetiredServiceItem = {
  title: string;
  note: string;
};

type MenuProps = {
  content: SiteContent;
  basePath: string;
  items: ServiceItem[];
  retired: RetiredServiceItem[];
  onNavigate?: () => void;
};

/** Panah teks untuk affordance tautan. Dibalik di RTL supaya tetap menunjuk maju. */
function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
      →
    </span>
  );
}

function ServiceRow({
  item,
  basePath,
  onNavigate,
}: {
  item: ServiceItem;
  basePath: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={`${basePath}${servicePath(item.slug)}`}
      onClick={onNavigate}
      className="group hover:bg-mist-gray focus-visible:bg-mist-gray rounded-smallcards flex h-full items-start gap-3 px-4 py-3.5 transition"
    >
      {/* `mt-0.5` menyelaraskan garis tengah glyph 20px dengan garis tengah
          baris judul 17px/1.5, bukan dengan kotak paddingnya. `group-focus-within`
          bukan hiasan: baris ini adalah tautan utuh, jadi saat keyboard masuk,
          latar dan glyph harus bereaksi bersama, seperti saat kursor masuk. */}
      <ServiceGlyph
        slug={item.slug}
        className="text-slate-gray group-hover:text-ink-black group-focus-within:text-ink-black mt-0.5 h-5 w-5 shrink-0 transition-colors duration-150"
      />      <span className="min-w-0 flex-1">
        <span className="text-ink-black text-body block font-medium">{item.title}</span>
        <span className="text-slate-gray text-caption line-clamp-2 mt-0.5 block">
          {item.description}
        </span>
      </span>
    </Link>
  );
}

/** Tautan teks, bukan pill: panah di ujung label yang membawa affordance-nya. */
function AllServicesLink({
  content,
  basePath,
  onNavigate,
  className = "",
}: {
  content: SiteContent;
  basePath: string;
  onNavigate?: () => void;
  /** Dipakai varian mobile untuk menaikkan tinggi sasaran sentuh ke 44px. */
  className?: string;
}) {
  return (
    <Link
      href={`${basePath}#services`}
      onClick={onNavigate}
      className={`text-ink-black text-caption inline-flex items-center gap-1 hover:underline ${className}`}
    >
      {content.nav.allServices}
      <Arrow />
    </Link>
  );
}

/**
 * Layanan yang sudah tidak ditawarkan, di kaki panel.
 *
 * Sengaja bukan tautan: tidak ada anchor yang bisa dituju, dan baris yang bisa
 * diklik tapi tidak membawa ke mana-mana lebih buruk daripada baris diam.
 * Hairline memisahkannya dari yang masih bisa dibeli, dan redupnya mengikuti
 * baris pensiun di section Services — satu status, satu rupa.
 */
function RetiredRows({ retired }: { retired: RetiredServiceItem[] }) {
  return (
    <ul className="border-hairline mt-3 grid gap-x-6 gap-y-1 border-t pt-3 sm:grid-cols-2 lg:grid-cols-3">
      {retired.map((item) => (
        <li
          key={item.title}
          className="flex flex-wrap items-baseline gap-x-2 px-4 py-1.5"
        >
          <span className="text-slate-gray text-caption font-medium">{item.title}</span>
          <span className="text-ash-gray text-caption">
            <span aria-hidden="true">·</span> {item.note}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ServicesMenu({
  content,
  basePath,
  items,
  retired,
  onNavigate,
}: MenuProps) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="text-ash-gray text-caption">{content.nav.services}</p>
        <AllServicesLink content={content} basePath={basePath} onNavigate={onNavigate} />
      </div>
      <ul className="mt-2 grid auto-rows-fr gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.slug}>
            <ServiceRow item={item} basePath={basePath} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
      <RetiredRows retired={retired} />
    </div>
  );
}

export function ServicesMenuList({
  content,
  basePath,
  items,
  retired,
  onNavigate,
}: MenuProps) {
  return (
    <div>
      <ul className="grid auto-rows-fr gap-1">
        {items.map((item) => (
          <li key={item.slug}>
            <ServiceRow item={item} basePath={basePath} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
      <div className="mt-1.5">
        {/* `min-h-11`: satu-satunya tautan teks di sheet mobile, dan tinggi
            barisnya saja (23px) jauh di bawah ambang sentuh 44px. */}
        <AllServicesLink
          content={content}
          basePath={basePath}
          onNavigate={onNavigate}
          className="min-h-11"
        />
      </div>
      <RetiredRows retired={retired} />
    </div>
  );
}
