"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
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
 * Navigasi utama: bar yang berbisik, tanpa garis dan tanpa bayangan.
 *
 * Aturan yang dijaga di sini:
 * - Tinggi bar 64px di bawah lg dan 72px mulai lg. Offset anchor di globals.css
 *   mengikuti angka ini, jadi ubah keduanya bersamaan.
 * - Tidak ada border bawah maupun shadow. Bar hanya dibedakan dari isi halaman
 *   oleh latar putih yang sedikit tembus pandang plus backdrop-blur. Begitu ada
 *   garis 1px, nav berhenti terasa sebagai lapisan yang mengambang.
 * - Item aktif dinyatakan lewat warna saja (slate -> ink), bukan garis bawah.
 *   Warna sudah cukup; garis menambah satu elemen visual yang tidak dibutuhkan.
 * - Panel menempel langsung ke bawah bar (tanpa jarak), supaya kursor tidak
 *   pernah melewati celah yang menutup menu.
 * - Semua posisi memakai properti logis (ms/me/ps/pe/start/end) agar locale
 *   Arab otomatis tercermin.
 */

type OpenPanel = "product" | "services" | null;
type OpenSection = "product" | "services" | null;

const desktopItem =
  "group inline-flex h-9 items-center gap-1.5 rounded-smallcards px-2.5 text-caption transition-colors hover:bg-mist-gray";

/** Keadaan warna item desktop: diam itu slate, aktif atau hover itu ink. */
function itemState(active: boolean) {
  return active ? "text-ink-black" : "text-slate-gray hover:text-ink-black";
}

/** Panah teks untuk affordance tautan. Dibalik di RTL supaya tetap menunjuk maju. */
function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
      →
    </span>
  );
}

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

  // Judul dan deskripsi layanan ada di i18n; slug di lib/services.ts.
  const serviceItems: ServiceItem[] = content.services.map((service, index) => ({
    title: service.title,
    description: service.description,
    slug: serviceMeta[index]?.slug ?? "",
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
      {/* Tanpa border dan tanpa shadow: bar hanya dibaca sebagai lapisan UI
          karena latarnya putih tembus pandang di atas isi halaman. */}
      <header className="bg-paper-white/85 sticky top-0 z-50 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-page items-center gap-2 px-5 sm:px-8 lg:h-[4.5rem]">
          {/* Brand: sekaligus link ke beranda, jadi tidak ada item "Home".
              Wordmark satu warna; titik ".com" tidak lagi diberi aksen. */}
          <Link href={basePath} className="text-ink-black flex shrink-0 items-center gap-2.5">
            <BrandMark className="h-8 w-8 shrink-0" />
            <span className="text-body truncate font-medium">dibumi.com</span>
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
                className={`${desktopItem} ${itemState(openPanel === "product")}`}
              >
                {nav.product}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openPanel === "product" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
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
                className={`${desktopItem} ${itemState(openPanel === "services")}`}
              >
                {nav.services}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openPanel === "services" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
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
                  className={`${desktopItem} ${itemState(active)}`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href={teamHref}
              onClick={() => setOpenPanel(null)}
              aria-current={teamActive ? "page" : undefined}
              className={`${desktopItem} ${itemState(teamActive)}`}
            >
              {nav.team}
            </Link>
          </nav>

          {/* Right cluster */}
          <div className="ms-auto flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher locale={locale} label={nav.language} variant="bare" />

            <Link
              href={`${basePath}#contact`}
              className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 ms-1 hidden h-10 items-center justify-center px-4 text-caption transition lg:inline-flex"
            >
              {nav.cta}
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
              className="text-ink-black hover:bg-mist-gray rounded-smallcards inline-flex h-10 w-10 items-center justify-center transition lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mega panel: selebar viewport, menempel ke bawah bar, tanpa border
            dan tanpa radius. Bayangan modal yang memisahkannya dari isi. */}
        {openPanel && (
          <div
            ref={panelRef}
            id={`${openPanel}-menu`}
            className="border-hairline bg-paper-white shadow-subtle-2 animate-panel-in absolute inset-x-0 top-full hidden max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-b lg:block"
          >
            <div className="mx-auto max-w-page px-5 py-6 sm:px-8">
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
          className="bg-paper-white fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col lg:hidden"
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
                className="text-ink-black border-hairline text-body flex items-center justify-between gap-3 border-b py-4 font-medium"
              >
                {link.name}
                <span className="text-ash-gray text-caption">
                  <Arrow />
                </span>
              </Link>
            ))}

            <Link
              href={teamHref}
              onClick={closeMobile}
              aria-current={teamActive ? "page" : undefined}
              className="text-ink-black border-hairline text-body flex items-center justify-between gap-3 border-b py-4 font-medium last:border-b-0"
            >
              {nav.team}
              <span className="text-ash-gray text-caption">
                <Arrow />
              </span>
            </Link>
          </div>

          <div className="border-hairline bg-paper-white border-t px-5 py-3">
            <Link
              href={`${basePath}#contact`}
              onClick={closeMobile}
              className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 flex h-11 w-full items-center justify-center px-4 text-caption transition"
            >
              {nav.cta}
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
    <div className="border-hairline border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`mobile-${id}`}
        className="flex w-full items-center justify-between gap-3 py-4 text-start"
      >
        <span className="text-ink-black text-body font-medium">{label}</span>
        <span className="flex items-center gap-2">
          <span className="text-ash-gray tabular text-caption">{meta}</span>
          <ChevronDown
            className={`text-slate-gray h-4 w-4 transition-transform duration-200 ${
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
