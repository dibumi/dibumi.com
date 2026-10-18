import React from "react";
import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { serviceAnchor } from "@/lib/services";
import type { SiteContent } from "@/lib/i18n";

/**
 * Isi panel Services. `ServiceItem` dirakit di Navbar karena judul dan
 * deskripsi berasal dari i18n, sedangkan slug dan ikon dari lib/services.ts.
 *
 * `ServicesMenu` dipakai mega panel desktop (tiga kolom), `ServicesMenuList`
 * dipakai lembar mobile (satu kolom).
 */

export type ServiceItem = {
  title: string;
  description: string;
  slug: string;
  Icon: LucideIcon;
};

type MenuProps = {
  content: SiteContent;
  basePath: string;
  items: ServiceItem[];
  onNavigate?: () => void;
};

function ServiceRow({
  item,
  basePath,
  onNavigate,
}: {
  item: ServiceItem;
  basePath: string;
  onNavigate?: () => void;
}) {
  const Icon = item.Icon;

  return (
    <Link
      href={`${basePath}#${serviceAnchor(item.slug)}`}
      onClick={onNavigate}
      className="hover:bg-elevated group flex items-start gap-3 rounded-lg px-2.5 py-2.5 transition"
    >
      <span className="bg-primary-soft text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-ink group-hover:text-primary block text-sm font-semibold transition">
          {item.title}
        </span>
        <span className="text-muted mt-0.5 line-clamp-2 block text-[11px] leading-4">
          {item.description}
        </span>
      </span>
    </Link>
  );
}

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
      className="text-primary hover:bg-elevated inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition"
    >
      {content.nav.allServices}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

export function ServicesMenu({ content, basePath, items, onNavigate }: MenuProps) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="text-muted px-2.5 text-[10px] font-semibold uppercase tracking-wider">
          {content.nav.services}
        </p>
        <AllServicesLink content={content} basePath={basePath} onNavigate={onNavigate} />
      </div>
      <ul className="mt-1.5 grid gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
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
      <ul>
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
