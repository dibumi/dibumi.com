"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, Code2, Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BrandMark from "@/components/BrandMark";
import { ProductMenu, ProductMenuList } from "@/components/nav/ProductMenu";
import {
  ServicesMenu,
  ServicesMenuList,
  type ServiceItem,
} from "@/components/nav/ServicesMenu";
import { getPlatformProducts } from "@/lib/products";
import { serviceMeta } from "@/lib/services";
import type { Locale, SiteContent } from "@/lib/i18n";

/**
 * Navigasi utama: satu bar datar tanpa pill pembungkus.
 *
 * Aturan yang dijaga di sini:
 * - Tinggi bar 64px di bawah lg dan 72px mulai lg. Offset anchor di globals.css
 *   mengikuti angka ini, jadi ubah keduanya bersamaan.
 * - Panel menempel langsung ke bawah bar (tanpa jarak), supaya kursor tidak
 *   pernah melewati celah yang menutup menu.
 * - Radius: kontrol 8px, popover 12px, panel 0 karena penuh ke tepi layar.
 * - Semua posisi memakai properti logis (ms/me/start/end) agar locale Arab
 *   otomatis tercermin.
 */

type OpenPanel = "product" | "services" | null;
type OpenSection = "product" | "services" | null;

/** Garis bawah penanda item aktif, tumbuh dari sisi awal teks. */
function Underline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-2.5 bottom-0.5 h-[2px] origin-left rounded-full transition-transform duration-200 ease-out group-hover:scale-x-100 rtl:origin-right ${
        active ? "bg-primary scale-x-100" : "bg-line scale-x-0"
      }`}
    />
  );
}

const desktopItem =
  "group relative inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-medium transition-colors";

export default function Navbar({
  locale,
  content,
  basePath,
}: {
  locale: Locale;
  content: SiteContent;
  basePath: string;
}) {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<OpenSection>(null);
  const [activeHash, setActiveHash] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const productButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const nav = content.nav;

  // Judul dan deskripsi layanan ada di i18n; slug dan ikon di lib/services.ts.
  const serviceItems: ServiceItem[] = content.services.map((service, index) => ({
    title: service.title,
    description: service.description,
    slug: serviceMeta[index]?.slug ?? "",
    Icon: serviceMeta[index]?.icon ?? Code2,
  }));

  const anchorLinks = [
    { name: nav.process, href: `${basePath}#process`, hash: "#process" },
    { name: nav.standards, href: `${basePath}#standards`, hash: "#standards" },
  ];

  const teamHref = `${basePath}/teams`;
  const teamActive = pathname === teamHref;

  // Panel Product berisi tiga produk platform plus satu tautan ke ngambeg.com,
  // bukan dua belas item, jadi hitungannya mengikuti isi panel.
  const productCount = getPlatformProducts().length + 1;

  // Rute berubah: semua panel dan sheet ditutup.
  useEffect(() => {
    setOpenPanel(null);
    setMobileOpen(false);
    setOpenSection(null);
  }, [pathname]);

  // Sorot Process/Standards sesuai posisi baca. IntersectionObserver, bukan
  // listener scroll, supaya tidak ada kerja di setiap frame.
  useEffect(() => {
    const ids = ["process", "standards"];
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) {
      setActiveHash(null);
      return;
    }

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const next = ids.find((id) => visible.has(id)) ?? null;
        setActiveHash(next ? `#${next}` : null);
      },
      { rootMargin: "-88px 0px -55% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  // Panel desktop: tutup saat klik di luar, saat Escape, dan kembalikan fokus
  // ke tombol pemicunya.
  useEffect(() => {
    if (!openPanel) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (navRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      setOpenPanel(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const trigger =
        openPanel === "product" ? productButtonRef.current : servicesButtonRef.current;
      setOpenPanel(null);
      trigger?.focus();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openPanel]);

  // Sheet mobile: kunci scroll halaman, jebak fokus, Escape menutup, fokus
  // kembali ke tombol menu.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    const sheet = sheetRef.current;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      [
        menuButton,
        ...(sheet
          ? Array.from(
              sheet.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
              ),
            )
          : []),
      ].filter((node): node is HTMLElement => node !== null);

    focusables()[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        setOpenSection(null);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      menuButton?.focus();
    };
  }, [mobileOpen]);

  // Kalau layar melebar ke desktop saat sheet terbuka, tutup sheet agar scroll
  // halaman tidak tertinggal dalam keadaan terkunci.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");

    function handleChange(event: MediaQueryListEvent) {
      if (!event.matches) return;
      setMobileOpen(false);
      setOpenSection(null);
    }

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  function closeMobile() {
    setMobileOpen(false);
    setOpenSection(null);
  }

  function togglePanel(panel: Exclude<OpenPanel, null>) {
    setOpenPanel((value) => (value === panel ? null : panel));
  }

  return (
    <>
      <header className="border-line/70 bg-canvas/90 sticky top-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-5 sm:px-8 lg:h-[4.5rem]">
          {/* Brand: sekaligus link ke beranda, jadi tidak ada item "Home". */}
          <Link
            href={basePath}
            className="text-ink flex shrink-0 items-center gap-2.5"
          >
            <BrandMark className="text-primary h-8 w-8 shrink-0" />
            <span className="truncate text-base font-semibold tracking-tight">
              dibumi<span className="text-primary">.com</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            ref={navRef}
            aria-label="Main navigation"
            className="ms-6 hidden items-center gap-0.5 lg:flex"
          >
            <div className="relative">
              <button
                ref={productButtonRef}
                type="button"
                onClick={() => togglePanel("product")}
                onMouseEnter={() => {
                  if (openPanel) setOpenPanel("product");
                }}
                aria-expanded={openPanel === "product"}
                aria-controls="product-menu"
                className={`${desktopItem} ${
                  openPanel === "product" ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {nav.product}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openPanel === "product" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
                <Underline active={openPanel === "product"} />
              </button>
            </div>

            <div className="relative">
              <button
                ref={servicesButtonRef}
                type="button"
                onClick={() => togglePanel("services")}
                onMouseEnter={() => {
                  if (openPanel) setOpenPanel("services");
                }}
                aria-expanded={openPanel === "services"}
                aria-controls="services-menu"
                className={`${desktopItem} ${
                  openPanel === "services" ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {nav.services}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openPanel === "services" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
                <Underline active={openPanel === "services"} />
              </button>
            </div>

            {anchorLinks.map((link) => {
              const active = activeHash === link.hash;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpenPanel(null)}
                  aria-current={active ? "location" : undefined}
                  className={`${desktopItem} ${active ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  {link.name}
                  <Underline active={active} />
                </Link>
              );
            })}

            <Link
              href={teamHref}
              onClick={() => setOpenPanel(null)}
              aria-current={teamActive ? "page" : undefined}
              className={`${desktopItem} ${teamActive ? "text-ink" : "text-muted hover:text-ink"}`}
            >
              {nav.team}
              <Underline active={teamActive} />
            </Link>
          </nav>

          {/* Right cluster */}
          <div className="ms-auto flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher locale={locale} label={nav.language} variant="bare" />

            <Link
              href={`${basePath}#contact`}
              className="bg-primary hover:bg-primary-hover ms-1 hidden min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-[13px] font-semibold text-white transition lg:inline-flex"
            >
              {nav.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => {
                setMobileOpen((value) => !value);
                setOpenSection(null);
              }}
              aria-label={mobileOpen ? nav.closeMenu : nav.menu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="text-ink hover:bg-elevated inline-flex h-10 w-10 items-center justify-center rounded-lg transition lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mega panel: selebar viewport, menempel ke bawah bar. */}
        {openPanel && (
          <div
            ref={panelRef}
            id={`${openPanel}-menu`}
            className="border-line bg-surface shadow-float animate-panel-in absolute inset-x-0 top-full hidden max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-b lg:block"
          >
            <div className="mx-auto max-w-7xl px-8 py-7">
              {openPanel === "product" ? (
                <ProductMenu content={content} onNavigate={() => setOpenPanel(null)} />
              ) : (
                <ServicesMenu
                  content={content}
                  basePath={basePath}
                  items={serviceItems}
                  onNavigate={() => setOpenPanel(null)}
                />
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile sheet: di luar header karena backdrop-blur membuat header jadi
          containing block untuk elemen fixed. */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          ref={sheetRef}
          aria-label="Mobile navigation"
          className="bg-canvas fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col lg:hidden"
        >
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-1">
            <MobileSection
              id="product"
              label={nav.product}
              meta={String(productCount)}
              open={openSection === "product"}
              onToggle={() =>
                setOpenSection((value) => (value === "product" ? null : "product"))
              }
            >
              <ProductMenuList content={content} onNavigate={closeMobile} />
            </MobileSection>

            <MobileSection
              id="services"
              label={nav.services}
              meta={String(serviceItems.length)}
              open={openSection === "services"}
              onToggle={() =>
                setOpenSection((value) => (value === "services" ? null : "services"))
              }
            >
              <ServicesMenuList
                content={content}
                basePath={basePath}
                items={serviceItems}
                onNavigate={closeMobile}
              />
            </MobileSection>

            {anchorLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="text-ink border-line flex items-center justify-between gap-3 border-b py-4 text-sm font-semibold"
              >
                {link.name}
                <ArrowRight className="text-muted h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            ))}

            <Link
              href={teamHref}
              onClick={closeMobile}
              aria-current={teamActive ? "page" : undefined}
              className="text-ink border-line flex items-center justify-between gap-3 border-b py-4 text-sm font-semibold last:border-b-0"
            >
              {nav.team}
              <ArrowRight className="text-muted h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>

          <div className="border-line bg-canvas border-t px-5 py-3">
            <Link
              href={`${basePath}#contact`}
              onClick={closeMobile}
              className="bg-primary hover:bg-primary-hover flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition"
            >
              {nav.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}

/** Satu bagian akordeon di dalam sheet mobile. */
function MobileSection({
  id,
  label,
  meta,
  open,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  meta: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`mobile-${id}`}
        className="text-ink flex w-full items-center justify-between gap-3 py-4 text-start text-sm font-semibold"
      >
        <span>{label}</span>
        <span className="flex items-center gap-2">
          <span className="text-muted tabular text-[10px] font-medium">{meta}</span>
          <ChevronDown
            className={`text-muted h-4 w-4 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </span>
      </button>

      {open && (
        <div id={`mobile-${id}`} className="animate-panel-in pb-3">
          {children}
        </div>
      )}
    </div>
  );
}
