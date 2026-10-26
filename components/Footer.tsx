import React from "react";
import Link from "next/link";
import { getPlatformProducts, ngambegSlug, productPath } from "@/lib/products";
import { contactEmail, contactPhone } from "@/lib/contact";
import BrandMark from "@/components/BrandMark";
import type { Locale, SiteContent } from "@/lib/i18n";

/**
 * Tahun studio mulai berkarya, dipakai untuk rentang copyright.
 * Angka yang sama muncul sebagai teks di `footer.since` pada tiap locale,
 * jadi ubah keduanya bersamaan bila perlu.
 */
const foundedYear = 2013;

/**
 * Footer: mark di kiri, empat kolom tautan di kanan, satu baris penutup.
 *
 * Bentuknya mengikuti referensi: seluruh footer duduk di atas fog-white tanpa
 * garis atas, jadi tidak ada garis yang memotong penutup halaman. Di beranda ia
 * menyambung langsung pita fog section kontak — dua permukaan yang sama, jadi
 * jaraknya dijaga oleh padding, bukan oleh border. Di halaman lain footer
 * muncul sebagai perubahan permukaan dari paper-white. Mark berdiri sendiri
 * tanpa wordmark — logonya sudah cukup, dan mengulang nama di sebelahnya hanya
 * menambah teks.
 *
 * Wordmark raksasa WWW.DIBUMI.COM yang dulu menutup halaman sudah dihapus: itu
 * satu-satunya elemen berskala display di luar judul, dan di referensi footer
 * justru bagian paling tenang dari halaman.
 *
 * Semua ikon dekoratif tetap tidak ada. Satu-satunya glyph adalah panah keluar
 * pada tautan eksternal, yang memang membawa arti.
 */
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
    { label: nav.team, href: `${basePath}/teams` },
  ];

  const legalLinks = [
    { label: footer.privacy, href: `/${locale}/privacy` },
    { label: footer.terms, href: `/${locale}/terms` },
  ];

  /* Label kolom dan tautannya dulu dipisahkan oleh nilai abu yang jauh: slate
     gelap untuk tautan, ash jauh lebih terang untuk label. Setelah ramp digelap
     agar lolos WCAG AA, selisih ash–slate tinggal sekitar lima unit L*, jadi
     warnanya saja tidak lagi cukup memisahkan kepala kolom dari isinya. Weight
     jadi pembeda kedua: label medium, tautan regular. Urutan ramp tetap
     (label lebih terang dari tautan), dan baris penutup di bawah tetap ash
     regular sebagai lapis paling tenang. */
  const columnLabel = "text-ash-gray text-caption font-medium";
  const columnLink = "text-slate-gray text-caption transition hover:text-ink-black";

  return (
    <footer className="bg-fog-white">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-12 md:grid-cols-[auto_minmax(0,1fr)] md:gap-16">
          {/* Mark berdiri sendiri: nama studio sudah ada di title halaman dan di
              navbar, jadi tidak perlu diulang di sini. */}
          <Link href={basePath} aria-label="dibumi.com" className="text-ink-black h-fit w-fit">
            <BrandMark className="h-9 w-9" />
          </Link>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {/* Produk */}
            <nav aria-label={footer.product} className="flex flex-col gap-3">
              <span className={columnLabel}>{footer.product}</span>
              {/* Produk: semuanya menuju halaman internal. Tautan keluar ke
                  ngambeg.com hidup di halaman grupnya, bukan di footer — satu
                  tujuan per baris, dan tidak ada teks mati untuk produk yang
                  situsnya belum terbit. */}
              {getPlatformProducts().map((item) => (
                <Link
                  key={item.id}
                  href={`${basePath}${productPath(item.slug)}`}
                  className={columnLink}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={`${basePath}${productPath(ngambegSlug)}`}
                className={columnLink}
              >
                {content.products.groups.ngambeg.label}
              </Link>
            </nav>

            {/* Perusahaan */}
            <nav aria-label={footer.company} className="flex flex-col gap-3">
              <span className={columnLabel}>{footer.company}</span>
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href} className={columnLink}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Legal */}
            <nav aria-label={footer.legal} className="flex flex-col gap-3">
              <span className={columnLabel}>{footer.legal}</span>
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className={columnLink}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Kontak: nomor dan email dikunci ltr supaya tidak terbalik di
                locale Arab. Alamat lengkap turun ke baris penutup. */}
            <nav aria-label={footer.contact} className="flex flex-col gap-3">
              <span className={columnLabel}>{footer.contact}</span>
              <a
                href={`tel:${contactPhone.href}`}
                className={columnLink}
                dir="ltr"
              >
                {contactPhone.display}
              </a>
              <a href={`mailto:${contactEmail}`} className={columnLink} dir="ltr">
                {contactEmail}
              </a>
              <Link href={`${basePath}#contact`} className={columnLink}>
                {nav.cta}
              </Link>
            </nav>
          </div>
        </div>

        {/* Baris penutup: identitas hukum, lokasi, dan sejak kapan. */}
        <div className="border-hairline mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t pt-6">
          <span className="text-ash-gray text-caption">
            © {foundedYear}–{new Date().getFullYear()} dibumi.com — {footer.copyright}
          </span>
          <span className="text-ash-gray text-caption">{footer.location}</span>
          <span className="text-ash-gray text-caption">{footer.since}</span>
        </div>
      </div>
    </footer>
  );
}
