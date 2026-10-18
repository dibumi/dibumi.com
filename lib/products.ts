/**
 * Satu sumber data untuk produk yang tampil di navbar, section Products, dan footer.
 *
 * Nama produk tidak diterjemahkan (nama merek), sedangkan label grup dan
 * deskripsinya ada di lib/i18n.ts. Kalau domain AI Party sudah tersedia, cukup
 * isi `href` di bawah dan seluruh link ikut aktif tanpa menyentuh komponen.
 */

export type ProductStatus = "live" | "soon";

export type ProductItem = {
  name: string;
  href: string | null;
  status: ProductStatus;
};

export type ProductGroupId = "aiParty" | "games" | "apps";

export type ProductGroup = {
  id: ProductGroupId;
  items: ProductItem[];
};

/** Halaman hub semua produk Ngambeg Cyber Media. */
export const ngambegHubUrl = "https://www.ngambeg.com";

export const productGroups: ProductGroup[] = [
  {
    id: "aiParty",
    items: [
      // Produk internal, situsnya belum dipublikasikan.
      { name: "AI Party", href: null, status: "soon" },
    ],
  },
  {
    id: "games",
    items: [
      { name: "Block IQ Puzzle", href: "https://blockiqpuzzle.ngambeg.com", status: "live" },
      { name: "SmashFest", href: "https://smashfest.ngambeg.com", status: "live" },
      { name: "Bounce", href: null, status: "soon" },
    ],
  },
  {
    id: "apps",
    items: [
      { name: "Bangun!", href: "https://alarm.ngambeg.com", status: "live" },
      { name: "Financial Toolkit", href: "https://financialtoolkit.ngambeg.com", status: "live" },
      {
        name: "Compound Interest Calculator",
        href: "https://compoundinterestcalculator.ngambeg.com",
        status: "live",
      },
      { name: "NetMeter", href: "https://netmeter.ngambeg.com", status: "live" },
      { name: "PDF Toolkit", href: "https://pdftoolkit.ngambeg.com", status: "live" },
      { name: "Psikotes", href: "https://psikotes.ngambeg.com", status: "live" },
      {
        name: "Seberapa Indonesia Kamu?",
        href: "https://seberapaindonesia.ngambeg.com",
        status: "live",
      },
      { name: "Vela Browser", href: "https://vela.ngambeg.com", status: "live" },
      { name: "WetonKu", href: "https://wetonku.ngambeg.com", status: "live" },
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
