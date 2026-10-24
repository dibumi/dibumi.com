/**
 * Metadata per layanan: slug, halaman detail, dan anchor beranda.
 *
 * Urutan array ini WAJIB sejajar dengan array `services` di lib/i18n.ts pada
 * setiap locale (judul dan deskripsi tetap tinggal di sana karena harus
 * diterjemahkan). Dipakai bersama oleh navbar, section Services, halaman
 * detail, dan sitemap supaya ketiganya tidak pernah berbeda urutan.
 *
 * Slug sengaja tidak diterjemahkan: LanguageSwitcher mempertahankan sisa path,
 * jadi `/en/services/custom-web-development` harus punya alamat yang sama di
 * semua locale.
 *
 * Ikon sengaja tidak lagi disimpan di sini. Sistem desain di DESIGN.md tidak
 * punya ikon dekoratif, jadi urutan layanan ditandai nomor 01–07 dan bukan
 * glyph. Kalau suatu saat ikon dibutuhkan lagi, tambahkan di sini dan di
 * komponen yang merendernya, bukan di lib/i18n.ts.
 */

export const serviceSlugs = [
  "custom-software",
  "custom-web-development",
  "android-webview",
  "company-profile",
  "android-apps",
  "server-devops",
  "maintenance-sla",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export type ServiceMeta = {
  slug: ServiceSlug;
};

export const serviceMeta: ServiceMeta[] = serviceSlugs.map((slug) => ({ slug }));

/** Anchor id kartu layanan di beranda. */
export function serviceAnchor(slug: string): string {
  return `service-${slug}`;
}

/** Path halaman detail satu layanan, tanpa prefix locale. */
export function servicePath(slug: ServiceSlug): string {
  return `/services/${slug}`;
}

/** Type guard untuk segmen URL: slug asing harus jadi 404, bukan halaman kosong. */
export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}

/**
 * Layanan lain untuk blok "Other services" di kaki halaman detail.
 *
 * Diambil berurutan dari daftar yang sama dan berputar di ujungnya, jadi
 * setiap halaman selalu menaut ke tetangganya dan tidak ada tautan yang
 * menunjuk dirinya sendiri.
 */
export function relatedServices(slug: ServiceSlug, count = 3): ServiceSlug[] {
  const start = serviceSlugs.indexOf(slug);
  if (start === -1) return [];

  const total = Math.min(count, serviceSlugs.length - 1);
  return Array.from(
    { length: total },
    (_, offset) => serviceSlugs[(start + offset + 1) % serviceSlugs.length],
  );
}