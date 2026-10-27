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
 * - Tinggi bar 64px (h-16) di semua lebar. Angka itu disandikan di empat tempat
 *   di berkas ini — `h-16` pada bar, `h-16` pada spacer, `top-16` pada sheet
 *   mobile, dan `calc(100dvh-4rem)` pada tinggi maksimum mega panel — plus satu
 *   di luar berkas ini (`-mt-16` di Hero). `scroll-padding-top: 5rem` di
 *   app/globals.css adalah angka yang sama ditambah 16px napas. Ubah kelimanya
 *   bersamaan; tidak ada satu pun yang boleh bergeser sendiri.
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
 * 80px = bar 64px (h-16) + 16px napas, dan itu tepat nilai `scroll-padding-top:
 * 5rem` di app/globals.css. Angka ini perlu ditulis ulang di sini karena
 * IntersectionObserver tidak membaca kelas Tailwind; setiap tempat lain memakai
 * kelas `h-16`/`top-16` dan diberi komentar di titik pakainya. Kalau tinggi bar
 * berubah, ubah konstanta ini bersama kelima tempat itu.
 */
const ANCHOR_OFFSET_PX = 80;

const desktopItem =
  "group inline-flex h-8 items-center gap-1 rounded-buttons px-2 text-caption transition-colors";

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
 * medium/semibold (500/600): semuanya medium karena 16px medium jauh lebih
 * mudah dibaca daripada 16px regular — nav ini adalah pintu utama situs dan
 * dibaca cepat, bukan dibaca pelan — dan semibold sebagai penanda aktif tetap
 * terlihat jelas di atas medium. Di locale Arab (IBM Plex Sans Arabic memuat
 * 300/400/600/700) medium jatuh ke 400 dan semibold ke 600, jadi tangganya
 * malah lebih lebar di sana.
 *
 * Ukurannya `text-caption` (16px), sama dengan CTA dan isi dropdown. Lantai
 * 16px dipilih agar item nav tidak lagi menjadi teks tersempit di halaman;
 * token `caption` (nav, eyebrow section, tombol sekunder, isi dropdown) naik
 * dari 15px ke 16px bersama-sama, jadi tidak ada peran yang tertinggal.
 *
 * Lebar yang dibayar: lima label Polandia ("Produkty", "Usługi", "Proces",
 * "Standardy", "Zespół") harus masih muat di 1024px, lebar tersempit sebelum
 * nav berganti jadi hamburger, tanpa mendorong kluster aksi keluar dari pusat
 * bar. Kenaikan 15→16px plus medium dibayar dengan padding `px-2` (dari
 * `px-2.5`), menghapus `gap-0.5` antar item (spasi antar label kini murni dari
 * padding 8px+8px), chevron `h-3.5` yang menyesuaikan ukuran teks, dan pil
 * bahasa/CTA `px-2.5` (dari `px-3`). Sisa ruangnya tipis di 1024px locale
 * Polandia, jadi tidak ada satu pun penghemat di atas yang boleh dinaikkan lagi
 * tanpa mencabut yang lain.
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
      // Tautan desktop (`hidden lg:flex`) tetap ada di DOM walau tidak
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

  // Kalau layar melebar ke desktop saat sheet terbuka, tutup sheet agar scroll
  // halaman tidak tertinggal dalam keadaan terkunci. Arah sebaliknya juga
  // ditutup: mega panel disembunyikan `lg:block`, jadi state terbukanya harus
  // ikut padam — tanpa itu bar tetap memakai permukaan solid di puncak halaman
  // padahal panelnya sudah tidak dirender.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");

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
        {/* Tiga kolom saat lg, satu baris flex sebelumnya. Grid dipilih supaya
            kolom tengah benar-benar di tengah bar: dengan `flex-1` tautan hanya
            di tengah ruang sisa, dan karena merek (137px) lebih sempit daripada
            kluster aksi (222px) hasilnya meleset ~43px. Dua kolom `1fr` di kiri
            dan kanan membuat kolom `auto` di tengah selalu simetris.
            `h-16` = 64px, satu dari lima sandi tinggi bar. Lihat kepala berkas. */}
        <div className="mx-auto flex h-16 max-w-page items-center gap-2 px-5 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* Brand: sekaligus link ke beranda, jadi tidak ada item "Home".
              Wordmark satu warna; titik ".com" tidak lagi diberi aksen. */}
          <Link
            href={basePath}
            className="text-ink-black flex shrink-0 items-center gap-2.5 lg:justify-self-start"
          >
            <BrandMark className="h-8 w-8 shrink-0" />
            <span className="text-body truncate font-medium">dibumi.com</span>
          </Link>

          {/* Desktop navigation — di tengah bar, bukan menempel brand. */}
          <nav
            ref={navRef}
            aria-label={content.nav.mainLabel}
            className="hidden items-center lg:flex lg:justify-self-center"
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
                className={`${desktopItem} ${itemState(openPanel === "services" || servicesActive)}`}
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
          <div className="ms-auto flex items-center gap-1 sm:gap-2 lg:ms-0 lg:justify-self-end">
            <LanguageSwitcher locale={locale} label={nav.language} variant="ghost" />

            <Link
              href={`${basePath}#contact`}
              className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 ms-1 hidden h-8 shrink-0 items-center justify-center whitespace-nowrap px-2.5 text-caption transition lg:inline-flex"
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
                 seluruhnya disentuh jari. Bar tetap 64px, jadi tingginya tidak
                 mengubah kontrak anchor. */
              className="text-ink-black hover:bg-mist-gray rounded-smallcards inline-flex h-11 w-11 items-center justify-center transition lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mega panel: selebar viewport, menempel ke bawah bar, tanpa border
            dan tanpa radius. Bayangan modal yang memisahkannya dari isi.
            Tinggi maksimum `calc(100dvh-4rem)` = viewport dikurangi bar 64px,
            supaya panel tidak pernah menutupi bar-nya sendiri dan bagian
            bawahnya yang panjang tetap bisa digulir di dalam panel. */}
        {openPanel && (
          <div
            ref={panelRef}
            id={`${openPanel}-menu`}
            className="border-hairline bg-paper-white shadow-subtle-2 animate-panel-in absolute inset-x-0 top-full hidden max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b lg:block"
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
          sini supaya isi halaman tidak tertutup. `h-16` ini WAJIB sama dengan
          tinggi bar di atas dan dengan `scroll-padding-top` di app/globals.css
          (5rem = 64px bar + 16px napas): kalau salah satu bergeser, judul
          section mendarat di bawah bar atau terlalu jauh dari tepi. */}
      <div aria-hidden="true" className="h-16" />

      {/* Mobile sheet: di luar header karena backdrop-blur membuat header jadi
          containing block untuk elemen fixed. `top-16` adalah sandi tinggi bar
          yang ketiga: sheet mulai tepat di bawah bar, bukan menutupinya, jadi
          tombol X di bar tetap terjangkau saat sheet terbuka. */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          ref={sheetRef}
          aria-label={content.nav.mobileLabel}
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
