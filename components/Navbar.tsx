"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  CreditCard,
  Layers,
  Megaphone,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BrandMark from "@/components/BrandMark";
import {
  ngambegHubUrl,
  productGroups,
  type ProductItem,
} from "@/lib/products";
import { serviceAnchor, serviceMeta } from "@/lib/services";
import type { Locale, SiteContent } from "@/lib/i18n";

/** Ikon per produk platform, dipetakan lewat id dari lib/products.ts. */
const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  aiParty: Sparkles,
  paymentOrchestration: CreditCard,
  adserverExchange: Megaphone,
};

type OpenMenu = "product" | "services" | null;

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
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const menusRef = useRef<HTMLDivElement>(null);
  const productButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const nav = content.nav;
  const productCopy = content.products;
  const platforms = productGroups.find((group) => group.id === "platforms")!;
  const ngambeg = productGroups.find((group) => group.id === "ngambeg")!;

  // Judul dan deskripsi layanan ada di i18n; slug dan ikon di lib/services.ts.
  const serviceItems = content.services.map((service, index) => ({
    title: service.title,
    description: service.description,
    slug: serviceMeta[index]?.slug ?? "",
    Icon: serviceMeta[index]?.icon ?? Code2,
  }));

  const anchorLinks = [
    { name: nav.process, href: `${basePath}#process` },
    { name: nav.standards, href: `${basePath}#standards` },
    { name: nav.contact, href: `${basePath}#contact` },
  ];

  // Semua panel tertutup saat rute berubah (misal setelah klik link).
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!openMenu) return;

    function handlePointerDown(event: MouseEvent) {
      if (!menusRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const trigger =
        openMenu === "product" ? productButtonRef.current : servicesButtonRef.current;
      setOpenMenu(null);
      trigger?.focus();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  function toggleMenu(menu: Exclude<OpenMenu, null>) {
    setOpenMenu((value) => (value === menu ? null : menu));
  }

  const triggerClass = (isOpen: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-3.5 py-2 transition ${
      isOpen ? "bg-primary-soft text-primary font-semibold" : "text-muted hover:text-primary"
    }`;

  function SoonBadge() {
    return (
      <span className="border-line text-muted shrink-0 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
        {productCopy.soon}
      </span>
    );
  }

  /** Baris produk Ngambeg (Games/Apps): link aktif atau label Soon. */
  function GroupItem({ item }: { item: ProductItem }) {
    if (!item.href) {
      return (
        <span className="text-muted flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13px] leading-snug">
          <span className="min-w-0 break-words">{item.name}</span>
          <SoonBadge />
        </span>
      );
    }

    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ink hover:bg-elevated hover:text-primary flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13px] leading-snug transition"
      >
        <span className="min-w-0 break-words">{item.name}</span>
        <ArrowUpRight className="text-muted h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      </a>
    );
  }

  /** Baris produk platform: ikon, nama, deskripsi, dan badge Soon. */
  function PlatformRow({ item }: { item: ProductItem }) {
    const Icon = platformIcons[item.id] ?? Sparkles;
    const description =
      (productCopy.platforms as Record<string, { description: string }>)[item.id]?.description ??
      "";

    const body = (
      <>
        <span className="bg-primary-soft text-primary mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-ink text-sm font-semibold">{item.name}</span>
            {item.status === "soon" && <SoonBadge />}
          </span>
          <span className="text-muted mt-0.5 block text-[11px] leading-4">{description}</span>
        </span>
      </>
    );

    if (!item.href) {
      return <div className="flex items-start gap-3 rounded-xl px-2.5 py-2.5">{body}</div>;
    }

    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:bg-elevated flex items-start gap-3 rounded-xl px-2.5 py-2.5 transition"
      >
        {body}
      </a>
    );
  }

  /** Baris layanan di panel dropdown Services. */
  function ServiceRow({ item }: { item: (typeof serviceItems)[number] }) {
    const Icon = item.Icon;

    return (
      <li>
        <Link
          href={`${basePath}#${serviceAnchor(item.slug)}`}
          onClick={() => setOpenMenu(null)}
          className="hover:bg-elevated group flex items-start gap-3 rounded-xl px-2.5 py-2.5 transition"
        >
          <span className="bg-primary-soft text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-ink group-hover:text-primary block text-sm font-semibold transition">
              {item.title}
            </span>
            <span className="text-muted mt-0.5 line-clamp-1 block text-[11px] leading-4">
              {item.description}
            </span>
          </span>
        </Link>
      </li>
    );
  }

  return (
    <header className="border-line/80 bg-canvas/95 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* Brand */}
        <Link href={basePath} className="flex min-w-0 items-center gap-2.5">
          <BrandMark className="text-primary h-9 w-9 shrink-0" />
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

          <div ref={menusRef} className="flex items-center gap-1">
            {/* Product */}
            <div className="relative">
              <button
                ref={productButtonRef}
                type="button"
                onClick={() => toggleMenu("product")}
                aria-haspopup="true"
                aria-expanded={openMenu === "product"}
                aria-controls="product-menu"
                className={triggerClass(openMenu === "product")}
              >
                {nav.product}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${
                    openMenu === "product" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {openMenu === "product" && (
                <div
                  id="product-menu"
                  className="border-line bg-surface shadow-card animate-panel-in absolute start-0 top-full mt-2 w-[38rem] rounded-2xl border p-2"
                >
                  {/* Platforms: produk milik dibumi.com */}
                  <p className="text-muted px-2.5 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-wider">
                    {productCopy.groups.platforms.label}
                  </p>
                  <ul>
                    {platforms.items.map((item) => (
                      <li key={item.id}>
                        <PlatformRow item={item} />
                      </li>
                    ))}
                  </ul>

                  {/* Ngambeg Cyber Media: game dan aplikasi dalam satu daftar */}
                  <div className="border-line-subtle mt-2 border-t pt-2">
                    <div className="flex items-start gap-2 px-2 pb-1 pt-1.5">
                      <Layers className="text-muted mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-ink text-xs font-semibold">
                          {productCopy.groups.ngambeg.label}
                        </p>
                        <p className="text-muted truncate text-[10px]">
                          {productCopy.groups.ngambeg.brand}
                        </p>
                      </div>
                    </div>
                    <ul className="grid grid-cols-2 gap-x-2">
                      {ngambeg.items.map((item) => (
                        <li key={item.id}>
                          <GroupItem item={item} />
                        </li>
                      ))}
                    </ul>
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

            {/* Services */}
            <div className="relative">
              <button
                ref={servicesButtonRef}
                type="button"
                onClick={() => toggleMenu("services")}
                aria-haspopup="true"
                aria-expanded={openMenu === "services"}
                aria-controls="services-menu"
                className={triggerClass(openMenu === "services")}
              >
                {nav.services}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${
                    openMenu === "services" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {openMenu === "services" && (
                <div
                  id="services-menu"
                  className="border-line bg-surface shadow-card animate-panel-in absolute start-0 top-full mt-2 w-[26rem] rounded-2xl border p-2"
                >
                  <ul>
                    {serviceItems.map((item) => (
                      <ServiceRow key={item.slug} item={item} />
                    ))}
                  </ul>

                  <div className="border-line-subtle mt-2 border-t pt-2">
                    <Link
                      href={`${basePath}#services`}
                      onClick={() => setOpenMenu(null)}
                      className="text-primary hover:bg-elevated flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-xs font-semibold transition"
                    >
                      {nav.allServices}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
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
            <p className="text-ink px-2 pt-1 text-xs font-semibold">
              {productCopy.groups.platforms.label}
            </p>
            <p className="text-muted px-2 text-[10px]">{productCopy.groups.platforms.brand}</p>
            <ul className="mt-1">
              {platforms.items.map((item) => (
                <li key={item.id}>
                  <PlatformRow item={item} />
                </li>
              ))}
            </ul>

            <div className="mt-3">
              <p className="text-ink px-2 text-xs font-semibold">
                {productCopy.groups.ngambeg.label}
              </p>
              <p className="text-muted px-2 text-[10px]">{productCopy.groups.ngambeg.brand}</p>
              <ul className="mt-1">
                {ngambeg.items.map((item) => (
                  <li key={item.id}>
                    <GroupItem item={item} />
                  </li>
                ))}
              </ul>
            </div>

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

          <p className="text-muted mt-2 px-3 pt-2 text-[10px] font-semibold uppercase tracking-wider">
            {nav.services}
          </p>

          <div className="border-line ms-4 border-s ps-2">
            <ul className="mt-1">
              {serviceItems.map((item) => {
                const Icon = item.Icon;

                return (
                  <li key={item.slug}>
                    <Link
                      href={`${basePath}#${serviceAnchor(item.slug)}`}
                      onClick={() => setMobileOpen(false)}
                      className="text-muted hover:bg-elevated hover:text-primary flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm transition"
                    >
                      <Icon className="text-muted h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href={`${basePath}#services`}
              onClick={() => setMobileOpen(false)}
              className="text-primary hover:bg-elevated mt-2 flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-xs font-semibold transition"
            >
              {nav.allServices}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
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
