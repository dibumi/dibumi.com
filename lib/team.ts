/**
 * Satu orang, satu sumber data.
 *
 * Nama dan tautan tidak diterjemahkan, jadi tinggal di sini. Peran, bio, dan
 * label fakta ada di `teamPage` pada lib/i18n.ts karena harus ikut locale.
 *
 * Nomor WhatsApp dan helper tautannya tinggal di lib/contact.ts karena dipakai
 * juga oleh section Contact dan footer; di sini hanya di-re-export supaya
 * pemanggil lama (TeamPage) tidak perlu berubah.
 *
 * Foto: isi `photo` dengan path di public/ begitu asetnya ada, misalnya
 * "/team/fatkul.jpg". Selama masih null, halaman memakai tile monogram dari
 * BrandMark, jadi tidak ada gambar rusak yang tampil.
 */

import { contactEmail, contactWhatsapp } from "@/lib/contact";

export { whatsappLink } from "@/lib/contact";

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
  email: contactEmail,
  whatsapp: contactWhatsapp.number,
  github: "https://github.com/fatkulnurk",
};
