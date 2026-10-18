/**
 * Satu orang, satu sumber data.
 *
 * Nama dan tautan tidak diterjemahkan, jadi tinggal di sini. Peran, bio, dan
 * label fakta ada di `teamPage` pada lib/i18n.ts karena harus ikut locale.
 *
 * Foto: isi `photo` dengan path di public/ begitu asetnya ada, misalnya
 * "/team/fatkul.jpg". Selama masih null, halaman memakai tile monogram dari
 * BrandMark, jadi tidak ada gambar rusak yang tampil.
 */

export type TeamMember = {
  name: string;
  photo: string | null;
  email: string;
  /** Nomor internasional tanpa tanda plus, format yang dipakai tautan wa.me. */
  whatsapp: string;
  github: string;
};

export const teamMember: TeamMember = {
  name: "Fatkul Nur Koirudin",
  photo: null,
  email: "fatkul@dibumi.com",
  whatsapp: "6285607100255",
  github: "https://github.com/fatkulnurk",
};

/** Tautan wa.me dengan pesan pembuka yang sudah terisi. */
export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
