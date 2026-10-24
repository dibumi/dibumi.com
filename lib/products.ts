/**
 * Satu sumber data untuk produk yang tampil di navbar, section Products, footer,
 * dan halaman detailnya.
 *
 * Tujuh alamat: enam produk platform milik dibumi.com, plus satu halaman untuk
 * grup Ngambeg Cyber Media. Katalog game dan aplikasi Ngambeg tidak dijabarkan
 * di sini — daftar lengkapnya hidup di ngambeg.com, dan situs ini hanya
 * menautkannya.
 *
 * Nama produk tidak diterjemahkan (nama merek), sedangkan label grup dan
 * deskripsi tiap produk ada di lib/i18n.ts dan dicari lewat `id`. Kalau situs
 * sebuah produk sudah terbit, cukup isi `href` di bawah: halaman detailnya
 * otomatis menampilkan tautan keluar, sementara menu dan footer tetap menuju
 * halaman internal.
 *
 * Slug sengaja tidak diterjemahkan: LanguageSwitcher mempertahankan sisa path,
 * jadi `/en/products/ai-gateway` harus punya alamat yang sama di semua locale.
 */

export type ProductStatus = "live" | "soon";

export type ProductId =
  | "aiGateway"
  | "paymentOrchestration"
  | "adserverExchange"
  | "cloudHostingBilling"
  | "trafficAnalytics"
  | "selfHostedOnlineStore";

export const platformSlugs = [
  "ai-gateway",
  "payment-orchestration",
  "adserver-exchange",
  "cloud-hosting-billing",
  "traffic-analytics",
  "self-hosted-online-store",
] as const;

export type PlatformSlug = (typeof platformSlugs)[number];

/** Grup Ngambeg punya halaman sendiri, tapi bukan produk platform. */
export const ngambegSlug = "ngambeg";

export type ProductSlug = PlatformSlug | typeof ngambegSlug;

/** Semua slug produk, urut seperti di menu: platform dulu, grup terakhir. */
export const productSlugs: ProductSlug[] = [...platformSlugs, ngambegSlug];

export type ProductItem = {
  id: ProductId;
  slug: PlatformSlug;
  name: string;
  href: string | null;
  status: ProductStatus;
};

/** Halaman hub semua produk Ngambeg Cyber Media. */
export const ngambegHubUrl = "https://www.ngambeg.com";

/** Halaman katalog di hub Ngambeg, dipakai sel Games dan Apps di panel Product. */
export const ngambegCatalogUrl = {
  games: "https://www.ngambeg.com/p/games",
  apps: "https://www.ngambeg.com/p/apps",
};

/** Logo resmi Ngambeg, PNG transparan 512x512. */
export const ngambegLogoUrl = "https://www.ngambeg.com/ngambeg_logo.png";

export const platformProducts: ProductItem[] = [
  // Produk platform milik dibumi.com, situsnya belum dipublikasikan.
  { id: "aiGateway", slug: "ai-gateway", name: "AI Gateway", href: null, status: "soon" },
  {
    id: "paymentOrchestration",
    slug: "payment-orchestration",
    name: "Payment Orchestration",
    href: null,
    status: "soon",
  },
  {
    id: "adserverExchange",
    slug: "adserver-exchange",
    name: "Adserver Exchange",
    href: null,
    status: "soon",
  },
  {
    id: "cloudHostingBilling",
    slug: "cloud-hosting-billing",
    name: "Cloud Hosting Billing",
    href: null,
    status: "soon",
  },
  {
    id: "trafficAnalytics",
    slug: "traffic-analytics",
    name: "Traffic Analytics",
    href: null,
    status: "soon",
  },
  {
    id: "selfHostedOnlineStore",
    slug: "self-hosted-online-store",
    name: "Self Hosted Online Store",
    href: null,
    status: "soon",
  },
];

/** Produk platform yang tampil di kartu besar section Products. */
export function getPlatformProducts(): ProductItem[] {
  return platformProducts;
}

/** Path halaman detail satu produk, tanpa prefix locale. */
export function productPath(slug: ProductSlug): string {
  return `/products/${slug}`;
}

/** Type guard untuk segmen URL: slug asing harus jadi 404, bukan halaman kosong. */
export function isProductSlug(value: string): value is ProductSlug {
  return (productSlugs as string[]).includes(value);
}

export function isPlatformSlug(value: ProductSlug): value is PlatformSlug {
  return (platformSlugs as readonly string[]).includes(value);
}

/**
 * Produk lain untuk blok "Other products" di kaki halaman detail.
 *
 * Diambil berurutan dan berputar di ujungnya, jadi setiap halaman selalu
 * menaut ke tetangganya — termasuk dari halaman grup ke produk platform — dan
 * tidak ada tautan yang menunjuk dirinya sendiri.
 */
export function relatedProducts(slug: ProductSlug, count = 3): ProductSlug[] {
  const start = productSlugs.indexOf(slug);
  if (start === -1) return [];

  const total = Math.min(count, productSlugs.length - 1);
  return Array.from(
    { length: total },
    (_, offset) => productSlugs[(start + offset + 1) % productSlugs.length],
  );
}