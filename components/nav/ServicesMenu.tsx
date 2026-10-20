import Link from "next/link";
import { serviceAnchor } from "@/lib/services";
import type { SiteContent } from "@/lib/i18n";

/**
 * Isi panel Services. `ServiceItem` dirakit di Navbar karena judul dan
 * deskripsi berasal dari i18n, sedangkan slug dari lib/services.ts.
 *
 * `ServicesMenu` dipakai mega panel desktop (tiga kolom), `ServicesMenuList`
 * dipakai lembar mobile (satu kolom).
 *
 * Barisnya sama tenangnya dengan panel Product: tanpa border, tanpa chip ikon,
 * hanya nama, deskripsi, dan latar mist saat hover.
 */

export type ServiceItem = {
  title: string;
  description: string;
  slug: string;
};

type MenuProps = {
  content: SiteContent;
  basePath: string;
  items: ServiceItem[];
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
      href={`${basePath}#${serviceAnchor(item.slug)}`}
      onClick={onNavigate}
      className="group hover:bg-mist-gray rounded-smallcards flex h-full items-start gap-3 px-4 py-3.5 transition"
    >
      <span className="min-w-0 flex-1">
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
}: {
  content: SiteContent;
  basePath: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={`${basePath}#services`}
      onClick={onNavigate}
      className="text-ink-black text-caption inline-flex items-center gap-1 hover:underline"
    >
      {content.nav.allServices}
      <Arrow />
    </Link>
  );
}

export function ServicesMenu({ content, basePath, items, onNavigate }: MenuProps) {
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
    </div>
  );
}

export function ServicesMenuList({ content, basePath, items, onNavigate }: MenuProps) {
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
        <AllServicesLink content={content} basePath={basePath} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
