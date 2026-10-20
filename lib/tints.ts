/**
 * Siklus tiga wash warna yang dipakai kartu Highlights dan baris di panel
 * Product serta Services.
 *
 * Satu definisi supaya deret warnanya konsisten: mint, violet, amber, lalu
 * berulang. Nilai tint ada di tailwind.config.ts (tint.mint/violet/amber) dan
 * sudah dipilih agar teks muted tetap lolos AA di atasnya.
 */

export const rowTints = [
  "border-primary/10 bg-tint-mint hover:border-primary/30",
  "border-violet-100 bg-tint-violet hover:border-violet-300",
  "border-amber-100 bg-tint-amber hover:border-amber-300",
] as const;

/** Warna ikon di atas chip putih, pasangan dari tiap wash. */
export const iconTints = ["text-primary", "text-violet-700", "text-amber-700"] as const;

/** Indeks siklus, aman untuk daftar sepanjang apa pun. */
export function tintAt(index: number): number {
  return index % rowTints.length;
}
