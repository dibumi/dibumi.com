/**
 * Kontak yang dipakai bersama oleh section Contact, footer, halaman team, dan
 * dokumen legal.
 *
 * Ditaruh terpisah supaya komponen tidak perlu mengimpor lib/legal.ts hanya
 * untuk satu nomor telepon, padahal file itu memuat seluruh teks syarat dan
 * kebijakan privasi. Nomor dan email juga tidak ditulis ulang di tiap komponen,
 * jadi mengubahnya cukup di satu tempat.
 */

export const contactEmail = "fatkul@dibumi.com";

export const contactPhone = {
  /** Format tampil, sama dengan yang sudah tertulis di dokumen legal. */
  display: "+62 856-0710-0255",
  /** Format tautan tel: tanpa spasi dan tanpa tanda plus ganda. */
  href: "+6285607100255",
};

export const contactWhatsapp = {
  /** Format tampil, dipakai di tombol WhatsApp. */
  display: "+62 856 0710 0255",
  /** Nomor internasional tanpa tanda plus, format yang dipakai tautan wa.me. */
  number: "6285607100255",
};

/** Tautan wa.me dengan pesan pembuka yang sudah terisi. */
export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
