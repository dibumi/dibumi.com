/**
 * Daftar klien yang tampil di section Clients.
 *
 * Nama merek tidak diterjemahkan, jadi tinggal di sini, bukan di lib/i18n.ts.
 * `region` adalah kode ISO 3166-1 alpha-2 dan dipakai untuk memilih bendera di
 * public/flags. Negara mengikuti badan hukum yang menaungi klien, bukan pasar
 * yang dilayani: Zeed berbadan hukum Singapura walau pasarnya Indonesia,
 * PopAds milik Tomksoft S.A. di Kosta Rika, dan PopCash di Bucharest.
 * `region: null` berarti klien tidak terikat satu yurisdiksi: selnya tidak
 * memuat bendera dan captionnya berbunyi "Global" (lihat `content.global`).
 *
 * `logo: null` berarti tidak ada aset logo yang bisa dipakai. Wap2Cash,
 * MyWapBlog, dan ZetMoney yang begini: tidak ada logo yang tersimpan (situs
 * Wap2Cash dan mywapblog.net sudah mati, arsipnya pun tidak menyimpan logo),
 * jadi namanya ditulis sebagai wordmark teks. Jangan mengarang gambar.
 *
 * `tagline` adalah keterangan satu baris di bawah nama, dipakai saat mereknya
 * tidak menjelaskan dirinya sendiri. Teksnya tidak diterjemahkan: ia bagian
 * dari identitas klien, sama seperti namanya.
 *
 * Dimensi width/height adalah ukuran asli file, dipakai supaya tata letak tidak
 * bergeser saat gambar dimuat.
 */

export type Client = {
  name: string;
  logo: string | null;
  /** Kode ISO 3166-1 alpha-2, atau null untuk merek global tanpa yurisdiksi. */
  region: string | null;
  width: number;
  height: number;
  /** Keterangan singkat di bawah nama; tidak diterjemahkan. */
  tagline?: string;
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
  {
    name: "MyWapBlog",
    logo: null,
    region: null,
    width: 0,
    height: 0,
    tagline: "Mobile Blog Builder",
  },
  {
    name: "ZetMoney",
    logo: null,
    region: null,
    width: 0,
    height: 0,
    tagline: "Mobile Advertising Network",
  },
];
