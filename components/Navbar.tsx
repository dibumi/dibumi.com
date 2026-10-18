"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  Gamepad2,
  Menu,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ngambegHubUrl, productGroups, type ProductGroupId } from "@/lib/products";
import type { Locale, SiteContent } from "@/lib/i18n";

const groupIcons: Record<ProductGroupId, React.ComponentType<{ className?: string }>> = {
  aiParty: Sparkles,
  games: Gamepad2,
  apps: Smartphone,
};

export default function Navbar({
  locale,
  content,
  basePath,
}: {
  locale: Locale;
  content: SiteContent;
  basePath: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);
  const productButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const nav = content.nav;
  const productCopy = content.products;

  const anchorLinks = [
    { name: nav.services, href: `${basePath}#services` },
    { name: nav.process, href: `${basePath}#process` },
    { name: nav.standards, href: `${basePath}#standards` },
    { name: nav.contact, href: `${basePath}#contact` },
  ];

  // Panel produk tertutup saat rute berubah (misal setelah klik link).
  useEffect(() => {
    setProductOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!productOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!productRef.current?.contains(event.target as Node)) {
        setProductOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setProductOpen(false);
      productButtonRef.current?.focus();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [productOpen]);

  const aiParty = productGroups.find((group) => group.id === "aiParty")!;
  const aiPartyItem = aiParty.items[0];
  const AiPartyIcon = groupIcons.aiParty;

  function ProductItem({
    name,
    href,
    status,
  }: {
    name: string;
    href: string | null;
    status: "live" | "soon";
  }) {
    const badge =
      status === "soon" ? (
        <span className="border-line text-muted shrink-0 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
          {productCopy.soon}
        </span>
      ) : (
        <ArrowUpRight className="text-muted h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      );

    if (!href) {
      return (
        <span className="text-muted flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm">
          <span className="truncate">{name}</span>
          {badge}
        </span>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ink hover:bg-elevated hover:text-primary flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm transition"
      >
        <span className="truncate">{name}</span>
        {badge}
      </a>
    );
  }

  return (
    <header className="border-line/80 bg-canvas/95 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* Brand */}
        <Link href={basePath} className="flex min-w-0 items-center gap-2.5">
          <span className="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-glow">
            <span className="text-[11px] font-extrabold tracking-tight text-white">db</span>
          </span>
          <span className="text-ink truncate text-base font-semibold tracking-tight sm:text-lg">
            dibumi<span className="text-primary">.com</span>
          </span>
          <span className="border-line text-muted hidden rounded-md border px-1.5 py-0.5 text-[9px] font-semibold tracking-wider sm:inline">
            STUDIO
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="border-line bg-surface hidden items-center gap-1 rounded-full border p-1 text-[13px] lg:flex"
        >
          <Link
            href={basePath}
            aria-current={pathname === basePath ? "page" : undefined}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 transition ${
              pathname === basePath
                ? "bg-primary-soft text-primary font-semibold"
                : "text-muted hover:text-primary"
            }`}
          >
            {nav.home}
          </Link>

          <div ref={productRef} className="relative">
            <button
              ref={productButtonRef}
              type="button"
              onClick={() => setProductOpen((value) => !value)}
              aria-haspopup="true"
              aria-expanded={productOpen}
              aria-controls="product-menu"
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 transition ${
                productOpen
                  ? "bg-primary-soft text-primary font-semibold"
                  : "text-muted hover:text-primary"
              }`}
            >
              {nav.product}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${productOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {productOpen && (
              <div
                id="product-menu"
                className="border-line bg-surface shadow-card animate-panel-in absolute start-0 top-full mt-2 w-[32rem] rounded-2xl border p-2"
              >
                {/* Produk internal */}
                <div className="bg-primary-soft rounded-xl p-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-surface text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-sm">
                      <AiPartyIcon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-ink text-sm font-semibold">
                          {productCopy.groups.aiParty.label}
                        </span>
                        {aiPartyItem.status === "soon" && (
                          <span className="border-primary/20 text-primary bg-surface/70 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
                            {productCopy.soon}
                          </span>
                        )}
                      </div>
                      <p className="text-muted mt-1 text-[11px] leading-4">
                        {productCopy.groups.aiParty.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Games & Apps dari Ngambeg Cyber Media */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(["games", "apps"] as const).map((id) => {
                    const group = productGroups.find((item) => item.id === id)!;
                    const copy = productCopy.groups[id];
                    const GroupIcon = groupIcons[id];

                    return (
                      <div key={id} className="min-w-0">
                        <div className="flex items-start gap-2 px-2 pb-1 pt-1.5">
                          <GroupIcon className="text-muted mt-0.5 h-3.5 w-3.5 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-ink text-xs font-semibold">{copy.label}</p>
                            <p className="text-muted truncate text-[10px]">{copy.brand}</p>
                          </div>
                        </div>
                        <ul>
                          {group.items.map((item) => (
                            <li key={item.name}>
                              <ProductItem
                                name={item.name}
                                href={item.href}
                                status={item.status}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                <div className="border-line-subtle mt-2 border-t pt-2">
                  <a
                    href={ngambegHubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:bg-elevated flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-xs font-semibold transition"
                  >
                    {nav.allProducts}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {anchorLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:text-primary rounded-full px-3.5 py-2 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} label={nav.language} />

          <Link
            href={`${basePath}#contact`}
            className="bg-primary hover:bg-primary-hover hidden min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-xs font-semibold text-white transition sm:inline-flex sm:text-sm"
          >
            {nav.cta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? nav.closeMenu : nav.menu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="border-line text-ink flex h-10 w-10 items-center justify-center rounded-lg border lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-line bg-surface max-h-[calc(100dvh-5rem)] overflow-y-auto border-t px-5 py-3 lg:hidden"
        >
          <Link
            href={basePath}
            className="text-muted hover:bg-elevated flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition"
          >
            {nav.home}
          </Link>

          <p className="text-muted mt-2 px-3 pt-2 text-[10px] font-semibold uppercase tracking-wider">
            {nav.product}
          </p>

          <div className="border-line ms-4 border-s ps-2">
            <div className="bg-primary-soft mt-1 rounded-xl p-3">
              <div className="flex items-start gap-3">
                <span className="bg-surface text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm">
                  <AiPartyIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-ink text-sm font-semibold">
                      {productCopy.groups.aiParty.label}
                    </span>
                    <span className="border-primary/20 text-primary bg-surface/70 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
                      {productCopy.soon}
                    </span>
                  </div>
                  <p className="text-muted mt-1 text-[11px] leading-4">
                    {productCopy.groups.aiParty.description}
                  </p>
                </div>
              </div>
            </div>

            {(["games", "apps"] as const).map((id) => {
              const group = productGroups.find((item) => item.id === id)!;
              const copy = productCopy.groups[id];

              return (
                <div key={id} className="mt-3">
                  <p className="text-ink px-2 text-xs font-semibold">{copy.label}</p>
                  <p className="text-muted px-2 text-[10px]">{copy.brand}</p>
                  <ul className="mt-1">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <ProductItem name={item.name} href={item.href} status={item.status} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <a
              href={ngambegHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:bg-elevated mt-2 flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-xs font-semibold transition"
            >
              {nav.allProducts}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="border-line-subtle mt-2 border-t pt-2">
            {anchorLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-muted hover:bg-elevated hover:text-primary flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            href={`${basePath}#contact`}
            onClick={() => setMobileOpen(false)}
            className="bg-primary hover:bg-primary-hover mt-2 mb-2 flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition"
          >
            {nav.cta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  );
}
