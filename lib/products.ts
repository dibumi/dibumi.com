/**
 * Satu sumber data untuk produk yang tampil di navbar, section Products, dan footer.
 *
 * Hanya produk platform milik dibumi.com yang didaftar di sini. Seluruh katalog
 * Ngambeg Cyber Media (game dan aplikasi) tidak lagi dijabarkan satu per satu:
 * navbar dan section Products cukup menautkan ke `ngambegHubUrl`, dan daftar
 * lengkapnya hidup di ngambeg.com. Label dan deskripsi grup Ngambeg tetap di
 * lib/i18n.ts karena harus diterjemahkan.
 *
 * Nama produk tidak diterjemahkan (nama merek), sedangkan label grup dan
 * deskripsi tiap produk ada di lib/i18n.ts dan dicari lewat `id`. Kalau situs
 * sebuah produk sudah terbit, cukup isi `href` di bawah dan seluruh link ikut
 * aktif tanpa menyentuh komponen.
 */

export type ProductStatus = "live" | "soon";

export type ProductId =
  | "aiGateway"
  | "paymentOrchestration"
  | "adserverExchange"
  | "cloudHostingBilling"
  | "trafficAnalytics"
  | "selfHostedOnlineStore";

export type ProductItem = {
  id: ProductId;
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
  { id: "aiGateway", name: "AI Gateway", href: null, status: "soon" },
  { id: "paymentOrchestration", name: "Payment Orchestration", href: null, status: "soon" },
  { id: "adserverExchange", name: "Adserver Exchange", href: null, status: "soon" },
  { id: "cloudHostingBilling", name: "Cloud Hosting Billing", href: null, status: "soon" },
  { id: "trafficAnalytics", name: "Traffic Analytics", href: null, status: "soon" },
  {
    id: "selfHostedOnlineStore",
    name: "Self Hosted Online Store",
    href: null,
    status: "soon",
  },
];

/** Produk platform yang tampil di kartu besar section Products. */
export function getPlatformProducts(): ProductItem[] {
  return platformProducts;
}
