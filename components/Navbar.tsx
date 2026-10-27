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
 * - Tinggi bar 72px (`h-[4.5rem]`) di semua lebar. Angka itu disandikan di lima
 *   tempat di berkas ini — `h-[4.5rem]` pada bar, `h-[4.5rem]` pada spacer,
 *   `top-[4.5rem]` pada sheet mobile, `calc(100dvh-4.5rem)` pada tinggi
 *   maksimum mega panel, dan `ANCHOR_OFFSET_PX` — plus dua di luar berkas ini
 *   (`-mt-[4.5rem]` di Hero, `--header-offset: 5.5rem` di app/globals.css).
 *   Ubah semuanya bersamaan; tidak ada satu pun yang boleh bergeser sendiri.
 * - Nav desktop baru muncul di `xl` (1280px), bukan `lg`. Bukan pilihan gaya:
 *   item 17px dengan padding 12px membuat nav selebar 480–488px (Polandia/Inggris),
 *   sementara grid di 1024px hanya menyisakan (960 − 16 − 480) / 2 = 232px per
 *   sisi, dan kluster kanan saja butuh 281px di Polandia. Jadi di 1024px label
 *   menabrak CTA, bukan sekadar mepet. Antara 1024 dan 1279 bar tetap flex —
 *   merek di kiri, pil bahasa + CTA + hamburger di kanan — jadi tidak ada yang
 *   hilang di lebar itu; hanya nav tengahnya yang jadi sheet.
 * - Bar ini fixed, bukan sticky. Di posisi paling atas ia transparan dan menyatu
 *   dengan wash hero — persis seperti referensi, di mana nav tidak punya bidang
 *   sendiri sampai halaman digulir. Setelah digulir ia baru mendapat permukaan
 *   putih tembus pandang, garis hairline, dan blur. Transisi itulah yang membuat
 *   nav terasa sebagai lapisan yang mengambang di atas isi halaman.
 * - Karena fixed, bar keluar dari alur dokumen. Tingginya dibayar oleh spacer
 *   di bawah header, dan angka spacer itu harus sama dengan tinggi bar.
 * - Tata letaknya tiga kolom saat desktop: merek di tepi awal, tautan di tengah,
 *   aksi di tepi akhir. Grid `1fr auto 1fr`, bukan flex: dengan flex tautan
 *   hanya di tengah ruang sisa, dan karena merek lebih sempit daripada kluster
 *   aksi hasilnya meleset puluhan piksel dari pusat bar.
 * - Tautan tidak pernah punya latar atau border, bahkan saat hover: nav ini
 *   tidak punya bidang sendiri, jadi hover memudarkan teks ke slate, bukan
 *   menyalakan kotak. Item aktif dinyatakan lewat berat huruf, bukan warna,
 *   supaya penandanya tidak hilang saat kursor kebetulan ada di atasnya.
 * - Panel menempel langsung ke bawah bar (tanpa jarak), supaya kursor tidak
 *   pernah melewati celah yang menutup menu.
 * - Semua posisi memakai properti logis (ms/me/ps/pe/start/end) agar locale
 *   Arab otomatis tercermin.
 */

type OpenPanel = "product" | "services" | null;
type OpenSection = "product" | "services" | null;

/**
 * Garis tempat judul section mendarat setelah klik anchor, dalam piksel.
 *
 * 88px = bar 72px (`h-[4.5rem]`) + 16px napas, dan itu tepat nilai
 * `--header-offset: 5.5rem` di app/globals.css. Angka ini perlu ditulis ulang
 * di sini karena IntersectionObserver tidak membaca kelas Tailwind; setiap
 * tempat lain memakai kelas `h-[4.5rem]`/`top-[4.5rem]` dan diberi komentar di
 * titik pakainya. Kalau tinggi bar berubah, ubah konstanta ini bersama kelima
 * tempat itu.
 */
const ANCHOR_OFFSET_PX = 88;

const desktopItem =
  "group inline-flex h-10 items-center gap-1 rounded-buttons px-3 text-body transition-colors";

/**
 * Keadaan warna item desktop.
 *
 * Semua item berdiri dengan ink yang sama, dan hover meredupkannya ke slate.
 * Arahnya sengaja dibalik dari kebiasaan: nav ini tidak punya bidang sendiri,
 * jadi menyalakan latar saat hover akan menambahkan satu permukaan yang tidak
 * ada di sistem. Meredupkan teks justru terbaca sebagai "item ini hidup" tanpa
 * menggambar apa pun.
 *
 * Penanda aktif tetap berat huruf, bukan warna, supaya penandanya tidak hilang
 * saat kursor kebetulan ada di atasnya. Tangganya dinaikkan satu tingkat ke
 * medium/semibold (500/600): semuanya medium karena 17px medium jauh lebih
 * mudah dibaca daripada 17px regular — nav ini adalah pintu utama situs dan
 * dibaca cepat, bukan dibaca pelan — dan semibold sebagai penanda aktif tetap
 * terlihat jelas di atas medium. Di locale Arab (IBM Plex Sans Arabic memuat
 * 300/400/600/700) medium jatuh ke 400 dan semibold ke 600, jadi tangganya
 * malah lebih lebar di sana.
 *
 * Ukurannya `text-body` (17px), sebesar paragraf: item nav adalah tujuan
 * navigasi utama, bukan keterangan kecil, dan di bar 72px ia punya ruang
 * vertikal untuk itu. CTA dan pil bahasa ikut naik ke ukuran yang sama supaya
 * ketiganya duduk di satu garis baca — sebelumnya ketiganya `text-caption`
 * (16px), lantai kontrol yang dipilih saat bar masih 64px.
 *
 * Lebar yang dibayar: lima label Polandia ("Produkty", "Usługi", "Proces",
 * "Standardy", "Zespół") harus masih muat, dan itulah alasan nav desktop
 * berganti ambang dari `lg` ke `xl`. Diukur di Polandia: nav 480px, kluster
 * kanan 281px. Di 1280px grid menyediakan (1136 − 16 − 480) / 2 = 320px per
 * sisi, jadi sisa 39px. Tipis, tapi terukur; di bawah 1280 nav menjadi sheet,
 * jadi tidak ada lebar di mana label menabrak kluster aksi.
 */
function itemState(active: boolean) {
  return active
    ? "text-ink-black font-semibold"
    : "text-ink-black font-medium hover:text-slate-gray";
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
  // Status permukaan bar: transparan di puncak halaman, solid setelah digulir.
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const productButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const nav = content.nav;

  // Judul dan deskripsi layanan ada di i18n; slug di lib/services.ts.
  // `flatMap` menjaga dua array itu tetap sejajar tanpa fallback slug kosong.
  const serviceItems: ServiceItem[] = content.services.flatMap((service, index) => {
    const meta = serviceMeta[index];
    return meta
      ? [{ title: service.title, description: service.description, slug: meta.slug }]
      : [];
  });

  // Halaman detail layanan adalah anak dari menu Services, jadi tombolnya tetap
  // menyala saat pembaca sudah berada di salah satunya.
  const servicesActive = pathname?.startsWith(`${basePath}/services`) ?? false;
  // Alasan yang sama untuk produk: menu Product adalah pintu masuk tujuh
  // halaman `/{locale}/products/{slug}`.
  const productsActive = pathname?.startsWith(`${basePath}/products`) ?? false;

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

  // Satu-satunya listener scroll di proyek ini, dan sengaja dibiarkan ada: bar
  // ini fixed di atas seluruh halaman, jadi ia harus tahu posisi gulir apa pun
  // section yang sedang tampil, dan tidak ada hook lain yang bisa memberi tahu
  // itu untuk elemen di luar alur. Kerjanya dijaga seminimal mungkin — membaca
  // scrollY, tanpa rAF dan tanpa pembacaan layout — dan React membatalkan
  // render sendiri saat nilainya tidak berubah. Passive supaya tidak menahan
  // thread gulir. Pemanggilan awal menangani halaman yang dibuka lewat anchor
  // atau di-refresh dalam keadaan sudah tergulir.
  useEffect(() => {
    function handleScroll() {
      // Ambang 8px bukan ukuran desain dan sengaja bukan token: ini zona mati
      // untuk derau masukan. Di puncak halaman scrollY masih bisa menyentuh
      // 1–2px karena jitter trackpad atau rubber-band iOS, dan tanpa ambang
      // permukaan bar akan berkedip antara transparan dan solid. Nilainya cukup
      // kecil untuk tidak terasa sebagai jeda, cukup besar untuk menahan itu.
      setScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sorot Process/Standards sesuai posisi baca. IntersectionObserver, bukan
  // listener scroll, supaya tidak ada kerja di setiap frame.
  //
  // `rootMargin` atas memotong viewport tepat di bawah bar + napas, yaitu garis
  // yang sama dengan `scroll-padding-top` (lihat ANCHOR_OFFSET_PX), supaya
  // section baru dihitung "sedang dibaca" saat judulnya benar-benar muncul di
  // bawah bar — bukan saat ia masih tersembunyi di baliknya. Nilai bawah -55%
  // menyisakan pita baca di paruh atas layar, jadi satu section yang panjang
  // tetap jadi sorotan sampai section berikutnya masuk ke pita itu.
  // Format rootMargin: `atas kanan bawah kiri`.
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
      { rootMargin: `-${ANCHOR_OFFSET_PX}px 0px -55% 0px` },
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
  //
  // Daftar fokus sengaja mencakup header DAN sheet, bukan sheet saja. Sheet
  // menutupi seluruh layar di bawah bar, tetapi bar-nya sendiri tetap terlihat
  // dan tetap hidup: merek dan pemilih bahasa masih bisa diklik. Kalau
  // keduanya tidak masuk daftar, Tab dari item terakhir memutar kembali ke
  // tombol menu, dan dua kontrol yang terlihat itu mustahil dicapai dengan
  // keyboard. Urutannya urutan dokumen — header dulu, sheet kemudian — jadi
  // Tab berjalan merek → bahasa → tombol menu → isi sheet → kembali.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const header = headerRef.current;
    const menuButton = menuButtonRef.current;
    const sheet = sheetRef.current;
    document.body.style.overflow = "hidden";

    const focusables = () => {
      const roots = [header, sheet].filter((node): node is HTMLElement => node !== null);
      const nodes = roots.flatMap((root) =>
        Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ),
      );
      // Tautan desktop (`hidden xl:flex`) tetap ada di DOM walau tidak
      // dirender. Memfokuskannya gagal diam-diam, dan ujung jebakan yang
      // menunjuk elemen tak terlihat akan menelan Tab. Elemen yang benar-benar
      // dirender selalu punya client rect.
      return nodes.filter((node) => node.getClientRects().length > 0);
    };

    // Fokus ditinggalkan di tombol menu, bukan dilempar ke isi sheet: sheet ini
    // disclosure, bukan dialog, dan pemicunyalah yang harus memegang fokus
    // sampai pengguna menekan Tab. `focus()` eksplisit karena Safari tidak
    // memfokuskan tombol saat diklik.
    menuButton?.focus();

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

  // Kalau layar melebar ke lebar desktop saat sheet terbuka, tutup sheet agar
  // scroll halaman tidak tertinggal dalam keadaan terkunci. Arah sebaliknya juga
  // ditutup: mega panel disembunyikan `xl:block`, jadi state terbukanya harus
  // ikut padam — tanpa itu bar tetap memakai permukaan solid di puncak halaman
  // padahal panelnya sudah tidak dirender. Angkanya `xl` (1280px), sama dengan
  // ambang nav desktop; kalau salah satu bergeser, ada pita lebar di mana sheet
  // sudah tertutup tapi hamburger masih tampil (atau sebaliknya).
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");

    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setMobileOpen(false);
        setOpenSection(null);
      } else {
        setOpenPanel(null);
      }
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

  // Panel mega dan sheet mobile sama-sama putih penuh dan menempel ke bawah bar.
  // Kalau bar di atasnya tetap transparan, wash hero akan terlihat di balik
  // tautan nav di atas bidang putih — jadi keduanya ikut menuntut permukaan
  // solid, bukan hanya status gulir.
  const solidBar = scrolled || openPanel !== null || mobileOpen;

  return (
    <>
      {/* Bar fixed: transparan di puncak halaman, lalu menguat jadi permukaan
          putih tembus pandang dengan garis hairline dan blur setelah digulir
          atau saat panel/sheet dibuka. Border selalu ada (transparan saat belum
          digulir) supaya tinggi bar tidak melompat 1px saat statusnya berubah. */}
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solidBar
            ? "bg-paper-white/85 border-hairline border-b backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* Tiga kolom saat xl, satu baris flex sebelumnya. Grid dipilih supaya
            kolom tengah benar-benar di tengah bar: dengan `flex-1` tautan hanya
            di tengah ruang sisa, dan karena merek (137px) lebih sempit daripada
            kluster aksi (222px) hasilnya meleset ~43px. Dua kolom `1fr` di kiri
            dan kanan membuat kolom `auto` di tengah selalu simetris.
            `h-[4.5rem]` = 72px, satu dari lima sandi tinggi bar. Lihat kepala
            berkas. */}
        <div className="mx-auto flex h-[4.5rem] max-w-page items-center gap-2 px-5 sm:px-8 xl:grid xl:grid-cols-[1fr_auto_1fr]">
          {/* Brand: sekaligus link ke beranda, jadi tidak ada item "Home".
              Wordmark satu warna; titik ".com" tidak lagi diberi aksen. */}
          <Link
            href={basePath}
            className="text-ink-black flex shrink-0 items-center gap-2.5 xl:justify-self-start"
          >
            <BrandMark className="h-9 w-9 shrink-0" />
            <span className="text-body truncate font-medium">dibumi.com</span>
          </Link>

          {/* Desktop navigation — di tengah bar, bukan menempel brand. */}
          <nav
            ref={navRef}
            aria-label={content.nav.mainLabel}
            className="hidden items-center xl:flex xl:justify-self-center"
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
                className={`${desktopItem} ${itemState(openPanel === "product" || productsActive)}`}
              >
                {nav.product}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
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
                className={`${desktopItem} ${itemState(openPanel === "services" || servicesActive)}`}
              >
                {nav.services}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
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
          <div className="ms-auto flex items-center gap-1 sm:gap-2 xl:ms-0 xl:justify-self-end">
            <LanguageSwitcher locale={locale} label={nav.language} variant="ghost" compact />

            <Link
              href={`${basePath}#contact`}
              className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 ms-1 hidden h-10 shrink-0 items-center justify-center whitespace-nowrap px-4 text-body transition lg:inline-flex"
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
              /* 44px, bukan 40px: ini satu-satunya kontrol pembuka sheet dan
                 seluruhnya disentuh jari. Bar 72px, jadi tingginya masih di
                 bawah tinggi bar dan tidak mengubah kontrak anchor. */
              className="text-ink-black hover:bg-mist-gray rounded-smallcards inline-flex h-11 w-11 items-center justify-center transition xl:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mega panel: selebar viewport, menempel ke bawah bar, tanpa border
            dan tanpa radius. Bayangan modal yang memisahkannya dari isi.
            Tinggi maksimum `calc(100dvh-4.5rem)` = viewport dikurangi bar 72px,
            supaya panel tidak pernah menutupi bar-nya sendiri dan bagian
            bawahnya yang panjang tetap bisa digulir di dalam panel. */}
        {openPanel && (
          <div
            ref={panelRef}
            id={`${openPanel}-menu`}
            className="border-hairline bg-paper-white shadow-subtle-2 animate-panel-in absolute inset-x-0 top-full hidden max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-b xl:block"
          >
            <div className="mx-auto max-w-page px-5 py-6 sm:px-8">
              {openPanel === "product" ? (
                <ProductMenu
                  content={content}
                  basePath={basePath}
                  onNavigate={() => setOpenPanel(null)}
                />
              ) : (
                <ServicesMenu
                  content={content}
                  basePath={basePath}
                  items={serviceItems}
                  retired={content.servicesSection.retired}
                  onNavigate={() => setOpenPanel(null)}
                />
              )}
            </div>
          </div>
        )}
      </header>

      {/* Bar fixed keluar dari alur dokumen, jadi tingginya harus dibayar di
          sini supaya isi halaman tidak tertutup. `h-[4.5rem]` ini WAJIB sama
          dengan tinggi bar di atas dan dengan `--header-offset` di
          app/globals.css (5.5rem = 72px bar + 16px napas): kalau salah satu
          bergeser, judul section mendarat di bawah bar atau terlalu jauh dari
          tepi. */}
      <div aria-hidden="true" className="h-[4.5rem]" />

      {/* Mobile sheet: di luar header karena backdrop-blur membuat header jadi
          containing block untuk elemen fixed. `top-[4.5rem]` adalah sandi
          tinggi bar yang ketiga: sheet mulai tepat di bawah bar, bukan
          menutupinya, jadi tombol X di bar tetap terjangkau saat sheet terbuka. */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          ref={sheetRef}
          aria-label={content.nav.mobileLabel}
          className="bg-paper-white fixed inset-x-0 bottom-0 top-[4.5rem] z-40 flex flex-col xl:hidden"
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
              <ProductMenuList content={content} basePath={basePath} onNavigate={closeMobile} />
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
                retired={content.servicesSection.retired}
                onNavigate={closeMobile}
              />
            </MobileSection>

            {anchorLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                /* Penanda section yang sedang dibaca sama dengan versi desktop:
                   baris ini selalu medium, jadi statusnya tidak mengubah rupa,
                   tapi pembaca layar tetap tahu di mana ia berada. */
                aria-current={activeHash === link.hash ? "location" : undefined}
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
