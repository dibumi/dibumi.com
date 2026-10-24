/**
 * Metadata per layanan: slug anchor.
 *
 * Urutan array ini WAJIB sejajar dengan array `services` di lib/i18n.ts pada
 * setiap locale (judul dan deskripsi tetap tinggal di sana karena harus
 * diterjemahkan). Dipakai bersama oleh navbar dan section Services supaya
 * anchor-nya selalu sama.
 *
 * Ikon sengaja tidak lagi disimpan di sini. Sistem desain di DESIGN.md tidak
 * punya ikon dekoratif, jadi urutan layanan ditandai nomor 01–07 dan bukan
 * glyph. Kalau suatu saat ikon dibutuhkan lagi, tambahkan di sini dan di
 * komponen yang merendernya, bukan di lib/i18n.ts.
 */

export type ServiceMeta = {
  slug: string;
};

export const serviceMeta: ServiceMeta[] = [
  { slug: "custom-software" },
  { slug: "custom-web-development" },
  { slug: "android-webview" },
  { slug: "company-profile" },
  { slug: "android-apps" },
  { slug: "server-devops" },
  { slug: "maintenance-sla" },
];

/** Anchor id kartu layanan, dipakai oleh link di navbar. */
export function serviceAnchor(slug: string): string {
  return `service-${slug}`;
}
