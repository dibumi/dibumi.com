/**
 * Satu sumber data untuk produk yang tampil di navbar, section Products, dan footer.
 *
 * Dua tingkat: grup (platforms, ngambeg) dan item di dalamnya. Nama produk
 * tidak diterjemahkan (nama merek), sedangkan label grup dan deskripsi tiap
 * produk ada di lib/i18n.ts dan dicari lewat `id`. Kalau situs sebuah produk
 * sudah terbit, cukup isi `href` di bawah dan seluruh link ikut aktif tanpa
 * menyentuh komponen.
 *
 * Semua produk Ngambeg Cyber Media (game maupun aplikasi) berada dalam satu
 * grup karena tampil sebagai satu daftar di bawah ngambeg.com.
 */

export type ProductStatus = "live" | "soon";

export type ProductId =
  | "aiParty"
  | "paymentOrchestration"
  | "adserverExchange"
  | "blockIqPuzzle"
  | "smashFest"
  | "bounce"
  | "bangun"
  | "financialToolkit"
  | "compoundInterestCalculator"
  | "netmeter"
  | "pdfToolkit"
  | "psikotes"
  | "seberapaIndonesia"
  | "vela"
  | "wetonku";

export type ProductItem = {
  id: ProductId;
  name: string;
  href: string | null;
  status: ProductStatus;
};

export type ProductGroupId = "platforms" | "ngambeg";

export type ProductGroup = {
  id: ProductGroupId;
  items: ProductItem[];
};

/** Halaman hub semua produk Ngambeg Cyber Media. */
export const ngambegHubUrl = "https://www.ngambeg.com";

export const productGroups: ProductGroup[] = [
  {
    id: "platforms",
    items: [
      // Produk platform milik dibumi.com, situsnya belum dipublikasikan.
      { id: "aiParty", name: "AI Party", href: null, status: "soon" },
      { id: "paymentOrchestration", name: "Payment Orchestration", href: null, status: "soon" },
      { id: "adserverExchange", name: "Adserver Exchange", href: null, status: "soon" },
    ],
  },
  {
    id: "ngambeg",
    items: [
      {
        id: "blockIqPuzzle",
        name: "Block IQ Puzzle",
        href: "https://blockiqpuzzle.ngambeg.com",
        status: "live",
      },
      { id: "smashFest", name: "SmashFest", href: "https://smashfest.ngambeg.com", status: "live" },
      { id: "bounce", name: "Bounce", href: null, status: "soon" },
      { id: "bangun", name: "Bangun!", href: "https://alarm.ngambeg.com", status: "live" },
      {
        id: "financialToolkit",
        name: "Financial Toolkit",
        href: "https://financialtoolkit.ngambeg.com",
        status: "live",
      },
      {
        id: "compoundInterestCalculator",
        name: "Compound Interest Calculator",
        href: "https://compoundinterestcalculator.ngambeg.com",
        status: "live",
      },
      { id: "netmeter", name: "NetMeter", href: "https://netmeter.ngambeg.com", status: "live" },
      { id: "pdfToolkit", name: "PDF Toolkit", href: "https://pdftoolkit.ngambeg.com", status: "live" },
      { id: "psikotes", name: "Psikotes", href: "https://psikotes.ngambeg.com", status: "live" },
      {
        id: "seberapaIndonesia",
        name: "Seberapa Indonesia Kamu?",
        href: "https://seberapaindonesia.ngambeg.com",
        status: "live",
      },
      { id: "vela", name: "Vela Browser", href: "https://vela.ngambeg.com", status: "live" },
      { id: "wetonku", name: "WetonKu", href: "https://wetonku.ngambeg.com", status: "live" },
    ],
  },
];

export function getProductGroup(id: ProductGroupId): ProductGroup {
  const group = productGroups.find((item) => item.id === id);
  if (!group) {
    throw new Error(`Unknown product group: ${id}`);
  }
  return group;
}

/** Produk platform yang tampil di kartu besar section Products. */
export function getPlatformProducts(): ProductItem[] {
  return getProductGroup("platforms").items;
}

/** Seluruh produk Ngambeg Cyber Media: game dan aplikasi dalam satu daftar. */
export function getNgambegProducts(): ProductItem[] {
  return getProductGroup("ngambeg").items;
}
