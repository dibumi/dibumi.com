import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Book,
  CreditCard,
  Gamepad2,
  Layers,
  Megaphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { getPlatformProducts, ngambegHubUrl } from "@/lib/products";
import type { Locale, SiteContent } from "@/lib/i18n";

/** Ikon per produk platform, dipetakan lewat id dari lib/products.ts. */
const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  aiParty: Sparkles,
  paymentOrchestration: CreditCard,
  adserverExchange: Megaphone,
};

export default function Footer({
  content,
  locale,
  basePath,
}: {
  content: SiteContent;
  locale: Locale;
  basePath: string;
}) {
  const nav = content.nav;
  const footer = content.footer;

  const companyLinks = [
    { label: nav.services, href: `${basePath}#services` },
    { label: nav.process, href: `${basePath}#process` },
    { label: nav.standards, href: `${basePath}#standards` },
    { label: nav.contact, href: `${basePath}#contact` },
  ];

  return (
    <footer className="border-line bg-surface border-t">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1fr_auto] md:py-20">
        <div className="flex flex-col items-start gap-4">
          <Link href={basePath} className="text-ink flex items-center gap-2.5">
            <span className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg">
              <span className="text-[11px] font-extrabold tracking-tight text-white">db</span>
            </span>
            <span className="text-lg font-semibold tracking-tight">
              dibumi<span className="text-primary">.com</span>
            </span>
          </Link>

          <p className="text-muted max-w-sm text-sm leading-7">{footer.description}</p>
          <p className="text-muted max-w-sm text-xs leading-6">{footer.address}</p>

          <div className="mt-1 flex gap-2" aria-hidden="true">
            <span className="bg-primary-soft text-primary flex h-9 w-9 items-center justify-center rounded-xl">
              <Layers className="h-4 w-4" />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Smartphone className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 text-sm sm:gap-16 md:grid-cols-3">
          {/* Produk */}
          <nav aria-label={footer.product} className="flex flex-col gap-3.5">
            <span className="text-muted mb-1 text-xs font-semibold uppercase tracking-widest">
              {footer.product}
            </span>
            {getPlatformProducts().map((item) => {
              const Icon = platformIcons[item.id] ?? Sparkles;

              if (!item.href) {
                return (
                  <span key={item.id} className="text-muted inline-flex items-center gap-2">
                    <Icon className="text-muted h-4 w-4" aria-hidden="true" />
                    {item.name}
                    <span className="border-line rounded border px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
                      {content.products.soon}
                    </span>
                  </span>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary inline-flex items-center gap-2 transition"
                >
                  <Icon className="text-muted h-4 w-4" aria-hidden="true" />
                  {item.name}
                </a>
              );
            })}
            <a
              href={ngambegHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary inline-flex items-center gap-2 transition"
            >
              <Gamepad2 className="text-muted h-4 w-4" aria-hidden="true" />
              {content.products.groups.games.label}
            </a>
            <a
              href={ngambegHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary inline-flex items-center gap-2 transition"
            >
              <Smartphone className="text-muted h-4 w-4" aria-hidden="true" />
              {content.products.groups.apps.label}
            </a>
            <a
              href={ngambegHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary inline-flex items-center gap-2 transition"
            >
              <ArrowUpRight className="text-muted h-4 w-4" aria-hidden="true" />
              {content.products.groups.apps.brand}
            </a>
          </nav>

          {/* Perusahaan */}
          <nav aria-label={footer.company} className="flex flex-col gap-3.5">
            <span className="text-muted mb-1 text-xs font-semibold uppercase tracking-widest">
              {footer.company}
            </span>
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary inline-flex items-center gap-2 transition"
              >
                <Layers className="text-muted h-4 w-4" aria-hidden="true" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Legal */}
          <nav aria-label={footer.legal} className="flex flex-col gap-3.5">
            <span className="text-muted mb-1 text-xs font-semibold uppercase tracking-widest">
              {footer.legal}
            </span>
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-primary inline-flex items-center gap-2 transition"
            >
              <ShieldCheck className="text-muted h-4 w-4" aria-hidden="true" />
              {footer.privacy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-primary inline-flex items-center gap-2 transition"
            >
              <Book className="text-muted h-4 w-4" aria-hidden="true" />
              {footer.terms}
            </Link>
            <a
              href="mailto:fatkul@dibumi.com"
              className="hover:text-primary inline-flex items-center gap-2 transition"
            >
              <ArrowUpRight className="text-muted h-4 w-4" aria-hidden="true" />
              fatkul@dibumi.com
            </a>
          </nav>
        </div>
      </div>

      <div className="border-line-subtle mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t px-5 py-6 text-xs sm:px-8">
        <span className="text-muted">
          © {new Date().getFullYear()} dibumi.com — {footer.copyright}
        </span>
        <span className="text-muted">
          {footer.builtFor} · {footer.location}
        </span>
      </div>
    </footer>
  );
}
