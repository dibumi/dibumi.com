import React from "react";
import Link from "next/link";
import { getPlatformProducts, ngambegHubUrl } from "@/lib/products";
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
 * garis pemisah, jadi perpindahan dari isi halaman ke footer terbaca sebagai
 * perubahan permukaan, bukan sebagai garis. Mark berdiri sendiri tanpa wordmark
 * — logonya sudah cukup, dan mengulang nama di sebelahnya hanya menambah teks.
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

  const columnLabel = "text-ash-gray text-caption";
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
              {getPlatformProducts().map((item) =>
                item.href ? (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={columnLink}
                  >
                    {item.name}
                    <span aria-hidden="true" className="ms-1 inline-block rtl:-scale-x-100">
                      ↗
                    </span>
                  </a>
                ) : (
                  <span key={item.id} className="text-slate-gray text-caption">
                    {item.name}
                  </span>
                ),
              )}
              <a
                href={ngambegHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={columnLink}
              >
                {content.products.groups.ngambeg.label}
                <span aria-hidden="true" className="ms-1 inline-block rtl:-scale-x-100">
                  ↗
                </span>
              </a>
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
