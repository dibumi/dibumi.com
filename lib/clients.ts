/**
 * Daftar klien yang tampil di section Clients.
 *
 * Nama merek tidak diterjemahkan, jadi tinggal di sini, bukan di lib/i18n.ts.
 * `region` adalah kode ISO 3166-1 alpha-2 dan dipakai untuk memilih bendera di
 * public/flags. Negara mengikuti badan hukum yang menaungi klien, bukan pasar
 * yang dilayani: Zeed berbadan hukum Singapura walau pasarnya Indonesia,
 * PopAds milik Tomksoft S.A. di Kosta Rika, dan PopCash di Bucharest.
 *
 * `logo: null` berarti tidak ada aset logo yang bisa dipakai. Hanya Wap2Cash
 * yang begini: situsnya sudah mati dan arsipnya tidak menyimpan logo, jadi
 * namanya ditulis sebagai wordmark teks. Jangan mengarang gambar untuknya.
 *
 * Dimensi width/height adalah ukuran asli file, dipakai supaya tata letak tidak
 * bergeser saat gambar dimuat.
 */

export type Client = {
  name: string;
  logo: string | null;
  region: string;
  width: number;
  height: number;
};

export const clients: Client[] = [
  { name: "UC Browser / UCWeb", logo: "/clients/ucweb.png", region: "cn", width: 299, height: 299 },
  { name: "BuzzCity", logo: "/clients/buzzcity.png", region: "sg", width: 183, height: 66 },
  { name: "PropellerAds", logo: "/clients/propellerads.png", region: "cy", width: 190, height: 56 },
  { name: "Zeed Sharia", logo: "/clients/zeed.png", region: "sg", width: 359, height: 129 },
  { name: "Motmaina", logo: "/clients/motmaina.png", region: "sa", width: 259, height: 138 },
  { name: "Bukuku Personal", logo: "/clients/bukuku.png", region: "id", width: 244, height: 68 },
  { name: "Dynavolt", logo: "/clients/dynavolt.png", region: "id", width: 300, height: 75 },
  { name: "PopAds", logo: "/clients/popads.png", region: "cr", width: 192, height: 74 },
  { name: "PopCash", logo: "/clients/popcash.svg", region: "ro", width: 165, height: 50 },
  { name: "Ylix", logo: "/clients/yllix.png", region: "pa", width: 166, height: 37 },
  { name: "Google AdSense", logo: "/clients/adsense.svg", region: "us", width: 512, height: 74 },
  { name: "Wap2Cash", logo: null, region: "in", width: 0, height: 0 },
];
