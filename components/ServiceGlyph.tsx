import type { ReactElement } from "react";
import type { ServiceSlug } from "@/lib/services";

/**
 * Glyph navigasi untuk tujuh layanan.
 *
 * Bukan ikon pustaka. Lucide hanya dipakai untuk glyph fungsional yang sudah
 * ada di situs ini (chevron, play/pause, panah), dan set generiknya untuk
 * "software / web / mobile / games" adalah bahasa visual yang dipakai setiap
 * agensi, jadi tidak membedakan apa pun di sini. Tujuh bentuk di bawah digambar
 * sendiri di grid 24px dengan satu ketebalan garis, supaya keluarga bentuknya
 * sama dengan hairline di seluruh situs.
 *
 * Aturan bentuk yang dijaga:
 * - `viewBox` 24, satu bentuk luar dan paling banyak tiga garis lurus di
 *   dalamnya. Setiap garis tambahan memakan sekitar 1,25 unit ruang kosong di
 *   tiap sisinya, dan di bawah 1,5 unit garis-garis itu menyatu setelah
 *   dirasterisasi ke 20px.
 * - `strokeWidth` 1.25 dengan `fill="none"`: nilai ini yang membuat glyph
 *   terbaca sebagai garis tipis, bukan sebagai kotak berisi. Sudut dan ujung
 *   membulat supaya tidak ada siku tajam di antara hairline halaman.
 *   Pengecualiannya dua titik LED pada glyph server: itu `circle` berisi
 *   `currentColor` tanpa stroke, karena `path` sepanjang 0.01 unit dengan cap
 *   bulat hanya menyisakan kepek abu yang hilang saat dirasterisasi.
 * - Warna selalu `currentColor`. Glyph ini muncul di atas putih (mega menu,
 *   sheet mobile) dan di atas ink (pita Services), jadi warnanya ditentukan
 *   pemanggil, bukan di sini.
 * - `aria-hidden`: nama layanan selalu hadir sebagai teks di sebelahnya, jadi
 *   glyph tidak pernah membawa arti sendiri bagi pembaca layar.
 *
 * Dua bentuk sengaja bukan metafora yang paling mudah dibaca. Games memakai
 * empat ubin terpisah, bukan satu kotak bergaris empat sel: kotak tunggal
 * bergaris itu adalah ikon launcher aplikasi, dan di sebelah teks "games" ia
 * justru menjawab hal yang salah. Maintenance memakai garis pulse, bukan
 * perisai, karena perisai terbaca sebagai jasa keamanan yang justru baru saja
 * dihentikan. Profile tetap fasad gedung: kisi tanpa atap terbaca sebagai
 * tabel, bukan sebagai bangunan.
 */

type GlyphProps = {
  className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Tiga node terhubung: otomasi proses, modul ERP/CRM. */
function SoftwareGlyph({ className }: GlyphProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="4.5" y="4.5" width="4.5" height="4.5" rx="1" />
      <rect x="15" y="4.5" width="4.5" height="4.5" rx="1" />
      <rect x="9.75" y="15" width="4.5" height="4.5" rx="1" />
      <path d="M6.75 9v3.5a1 1 0 0 0 1 1h2" />
      <path d="M17.25 9v3.5a1 1 0 0 1-1 1h-2" />
    </svg>
  );
}

/** Jendela aplikasi: dasbor, portal, alat admin. */
function WebGlyph({ className }: GlyphProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9.5h18" />
      <path d="M9 9.5V19" />
    </svg>
  );
}

/** Ponsel: Android dan iOS. */
function MobileGlyph({ className }: GlyphProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M10.5 18h3" />
    </svg>
  );
}

/** Empat ubin terpisah: permainan sebagai kotak papan, bukan launcher aplikasi. */
function GamesGlyph({ className }: GlyphProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

/** Fasad gedung: dua kolom jendela dan pintu di tengah. */
function ProfileGlyph({ className }: GlyphProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="5" y="4.5" width="14" height="15" rx="1" />
      <path d="M9.25 4.5v15" />
      <path d="M14.75 4.5v15" />
      <path d="M5 9.5h14" />
      <path d="M10.5 19.5v-4h3v4" />
    </svg>
  );
}

/** Dua unit rack: server dan infrastruktur. */
function ServerGlyph({ className }: GlyphProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <circle cx="16.5" cy="7" r="0.45" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="17" r="0.45" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Garis pulse: pemantauan, patch, respons SLA. */
function MaintenanceGlyph({ className }: GlyphProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 12h3.5l2.5-6 3.5 12 2-6h4.5" />    </svg>
  );
}

const glyphs: Record<ServiceSlug, (props: GlyphProps) => ReactElement> = {
  "custom-software": SoftwareGlyph,
  "custom-web-development": WebGlyph,
  "custom-mobile-apps": MobileGlyph,
  "custom-games": GamesGlyph,
  "company-profile": ProfileGlyph,
  "server-devops": ServerGlyph,
  "maintenance-sla": MaintenanceGlyph,
};

export type ServiceGlyphProps = {
  slug: ServiceSlug;
  /** Kelas ukuran dan warna; glyph mewarisi `currentColor`. */
  className?: string;
};

export default function ServiceGlyph({ slug, className }: ServiceGlyphProps) {
  const Glyph = glyphs[slug];
  return <Glyph className={className} />;
}