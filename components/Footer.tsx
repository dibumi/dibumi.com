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
 * Footer: brand, tiga kolom tautan, band kontak terpusat, baris copyright, dan
 * wordmark penutup.
 *
 * Semua ikon dihapus. Tiga tile berwarna (primary-soft, violet, amber) dan ikon
 * per tautan sudah tidak ada: sistem ini 97% achromatic, dan satu-satunya warna
 * di halaman sudah dipakai kartu peach di section Contact. Footer yang tenang
 * justru menutup halaman dengan lebih baik.
 *
 * Tautan memakai text-caption 15px slate; hover ke ink-black. Tidak ada
 * uppercase dan tracking di label kolom: DESIGN.md menyebut tag sebagai penanda
 * tipografis, bukan badge.
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
    { label: nav.contact, href: `${basePath}#contact` },
  ];

  const columnLabel = "text-ash-gray text-caption";
  const columnLink = "text-slate-gray text-caption transition hover:text-ink-black";

  return (
    <footer className="border-hairline bg-paper-white border-t">
      <div className="mx-auto grid max-w-page gap-16 px-5 py-20 sm:px-8 md:grid-cols-[1fr_auto] lg:py-24">
        <div className="flex flex-col items-start gap-4">
          <Link href={basePath} className="text-ink-black flex items-center gap-2.5">
            <BrandMark className="text-ink-black h-9 w-9" />
            {/* ".com" memakai ink yang sama, tanpa warna aksen: aksen hanya
                milik kartu peach. */}
            <span className="text-ink-black text-body-lg font-medium">
              dibumi<span>.com</span>
            </span>
          </Link>

          <p className="text-slate-gray max-w-sm text-caption">{footer.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:gap-16 md:grid-cols-3">
          {/* Produk */}
          <nav aria-label={footer.product} className="flex flex-col gap-3">
            <span className={`${columnLabel} mb-1`}>{footer.product}</span>
            {getPlatformProducts().map((item) => {
              if (!item.href) {
                return (
                  <span key={item.id} className="text-slate-gray inline-flex items-center gap-2 text-caption">
                    {item.name}
                    {/* Penanda "segera hadir" tetap ada, tapi sebagai pill
                        hairline supaya tidak terbaca sebagai badge berwarna. */}
                    <span className="border-hairline text-ash-gray rounded-full border px-2 py-0.5 text-caption">
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
                  className={columnLink}
                >
                  {item.name}
                </a>
              );
            })}
            <a
              href={ngambegHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={columnLink}
            >
              {content.products.groups.ngambeg.label}
            </a>
          </nav>

          {/* Perusahaan */}
          <nav aria-label={footer.company} className="flex flex-col gap-3">
            <span className={`${columnLabel} mb-1`}>{footer.company}</span>
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href} className={columnLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Legal */}
          <nav aria-label={footer.legal} className="flex flex-col gap-3">
            <span className={`${columnLabel} mb-1`}>{footer.legal}</span>
            <Link href={`/${locale}/privacy`} className={columnLink}>
              {footer.privacy}
            </Link>
            <Link href={`/${locale}/terms`} className={columnLink}>
              {footer.terms}
            </Link>
          </nav>
        </div>
      </div>

      {/* Kontak: alamat lengkap, telepon, dan email dalam satu blok terpusat.
          Alamatnya terlalu panjang untuk kolom grid, jadi ia mendapat barisnya
          sendiri. Nomor dan email dikunci ltr supaya tidak terbalik di locale
          Arab, sementara perataan tetap di tengah. */}
      <div className="border-hairline mx-auto max-w-page border-t px-5 py-14 sm:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className={columnLabel}>{footer.contact}</h2>

          <p className="text-slate-gray max-w-md text-caption">{footer.address}</p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a
              href={`tel:${contactPhone.href}`}
              className="text-ink-black text-caption transition hover:underline"
            >
              <span dir="ltr">{contactPhone.display}</span>
            </a>

            <span aria-hidden="true" className="bg-hairline hidden h-4 w-px sm:block" />

            <a
              href={`mailto:${contactEmail}`}
              className="text-ink-black text-caption transition hover:underline"
            >
              <span dir="ltr">{contactEmail}</span>
            </a>
          </div>

          <p className={columnLabel}>{footer.since}</p>
        </div>
      </div>

      <div className="border-hairline mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 border-t px-5 py-6 sm:px-8">
        <span className="text-ash-gray text-caption">
          © {foundedYear}–{new Date().getFullYear()} dibumi.com — {footer.copyright}
        </span>
        <span className="text-ash-gray text-caption">
          {footer.builtFor} · {footer.location}
        </span>
      </div>

      {/* Wordmark penutup: satu-satunya elemen di footer yang berskala display.
          Sengaja SVG, bukan teks CSS: textLength dengan lengthAdjust membuatnya
          benar-benar mengisi lebar kontainer di semua ukuran, sedangkan clamp
          hanya mendekati dan menyisakan celah di sebagian breakpoint. Hurufnya
          kini serif (font-display), sama seperti judul lain di halaman. Hiasan,
          jadi aria-hidden: brand yang bisa diklik sudah ada di atas footer. */}
      <div className="mx-auto max-w-page px-5 pb-10 sm:px-8">
        <svg
          viewBox="0 0 1000 104"
          className="text-ink-black block w-full"
          role="presentation"
          aria-hidden="true"
          focusable="false"
        >
          <text
            x="500"
            y="92"
            textAnchor="middle"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="font-display"
            fontSize="115"
            fill="currentColor"
          >
            WWW.DIBUMI.COM
          </text>
        </svg>
      </div>
    </footer>
  );
}
