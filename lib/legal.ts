import { companyAddress } from "@/lib/i18n";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalContent = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const legalEntity = "Dibumi Teknologi Indonesia";
export const legalEmail = "fatkul@dibumi.com";
export const legalWhatsapp = "+62 856-0710-0255";

export const terms: LegalContent = {
  title: "Syarat & Ketentuan",
  updated: "11 Oktober 2026",
  intro: `Syarat & Ketentuan ini mengatur penggunaan situs dibumi.com dan hubungan kerja sama antara Anda dengan ${legalEntity}. Dengan mengakses situs ini atau menandatangani penawaran kami, Anda menyatakan telah membaca dan menyetujui ketentuan di bawah ini.`,
  sections: [
    {
      heading: "1. Definisi",
      paragraphs: [
        `"Kami" atau "Penyedia" merujuk pada ${legalEntity}, beralamat di ${companyAddress}.`,
        '"Anda" atau "Klien" merujuk pada perorangan maupun badan usaha yang menggunakan layanan kami.',
        '"Layanan" mencakup pengembangan perangkat lunak kustom, aplikasi Android, website profil perusahaan, jasa WebView, pengelolaan server dan DevOps, serta pemeliharaan dan dukungan teknis.',
      ],
    },
    {
      heading: "2. Ruang Lingkup Layanan",
      paragraphs: [
        "Ruang lingkup setiap proyek dituangkan dalam dokumen Penawaran atau Statement of Work (SOW) yang disepakati kedua belah pihak. Dokumen tersebut menjadi bagian tidak terpisahkan dari Syarat & Ketentuan ini.",
        "Pekerjaan yang tidak dicantumkan dalam SOW dianggap di luar lingkup dan akan ditawarkan sebagai pekerjaan tambahan dengan biaya serta waktu tersendiri.",
      ],
    },
    {
      heading: "3. Penawaran, Estimasi, dan Perubahan Lingkup",
      paragraphs: [
        "Estimasi waktu dan biaya disusun berdasarkan informasi yang Anda berikan pada tahap discovery. Perubahan kebutuhan setelah SOW disepakati dapat memengaruhi jadwal dan nilai proyek.",
        "Setiap permintaan perubahan (change request) akan dikonfirmasi secara tertulis sebelum dikerjakan, sehingga Anda memiliki kendali penuh atas tambahan biaya.",
      ],
    },
    {
      heading: "4. Pembayaran dan Pajak",
      paragraphs: [
        "Skema pembayaran umumnya berupa uang muka di awal proyek dan pelunasan berdasarkan termin pencapaian yang disepakati.",
        "Faktur wajib dibayar sesuai tenggat pada dokumen penawaran. Keterlambatan pembayaran dapat menunda penyerahan pekerjaan dan berpotensi menimbulkan biaya administrasi.",
        "Seluruh harga belum termasuk pajak yang berlaku, kecuali dinyatakan lain secara tertulis.",
      ],
    },
    {
      heading: "5. Kewajiban Klien",
      paragraphs: [
        "Anda bertanggung jawab menyediakan informasi, akses, materi, dan persetujuan yang dibutuhkan agar pekerjaan dapat berjalan sesuai jadwal.",
        "Anda menjamin bahwa seluruh materi yang Anda serahkan tidak melanggar hak kekayaan intelektual pihak lain.",
      ],
    },
    {
      heading: "6. Hak Kekayaan Intelektual dan Serah Terima",
      paragraphs: [
        "Setelah pelunasan penuh, hak milik atas kode program, repositori, dan aset proyek yang dikembangkan khusus untuk Anda beralih kepada Anda.",
        "Komponen pihak ketiga, pustaka open source, dan perkakas internal kami tetap tunduk pada lisensi masing-masing dan tidak dialihkan kepemilikannya.",
        "Kami berhak menampilkan nama proyek secara umum sebagai portofolio, kecuali Anda meminta sebaliknya secara tertulis.",
      ],
    },
    {
      heading: "7. Kerahasiaan",
      paragraphs: [
        "Kedua belah pihak menjaga kerahasiaan informasi non-publik, termasuk ide bisnis, data pelanggan, dan logika perangkat lunak, baik selama maupun setelah proyek berakhir.",
        "Kami dapat menandatangani Perjanjian Kerahasiaan (NDA) tersendiri apabila Anda membutuhkannya sebelum proyek dimulai.",
      ],
    },
    {
      heading: "8. Garansi, Pemeliharaan, dan SLA",
      paragraphs: [
        "Setiap proyek disertai masa garansi perbaikan bug sesuai periode yang tercantum pada SOW. Garansi mencakup perbaikan cacat fungsi, bukan penambahan fitur baru.",
        "Layanan pemeliharaan, monitoring, dan dukungan darurat server diatur melalui perjanjian tingkat layanan (SLA) terpisah bagi klien yang membutuhkannya.",
      ],
    },
    {
      heading: "9. Batasan Tanggung Jawab",
      paragraphs: [
        "Layanan disediakan sesuai kemampuan terbaik kami, namun kami tidak menjamin bahwa perangkat lunak akan bebas dari segala gangguan atau sesuai untuk setiap tujuan di luar SOW.",
        "Sejauh diizinkan hukum, total tanggung jawab kami atas suatu klaim tidak melebihi nilai pembayaran yang telah Anda bayarkan untuk pekerjaan yang menjadi dasar klaim tersebut.",
        "Kami tidak bertanggung jawab atas kerugian tidak langsung, kehilangan keuntungan, atau kehilangan data yang timbul dari penggunaan di luar ketentuan SOW.",
      ],
    },
    {
      heading: "10. Penangguhan dan Pengakhiran",
      paragraphs: [
        "Salah satu pihak dapat mengakhiri kerja sama secara tertulis apabila pihak lain melakukan pelanggaran material dan tidak memperbaikinya dalam waktu yang wajar setelah pemberitahuan.",
        "Apabila proyek diakhiri, Anda tetap wajib membayar pekerjaan yang telah diselesaikan hingga tanggal pengakhiran, dan kami menyerahkan hasil pekerjaan pada tahap tersebut.",
      ],
    },
    {
      heading: "11. Keadaan Memaksa (Force Majeure)",
      paragraphs: [
        "Kami tidak dianggap lalai atas keterlambatan atau kegagalan yang disebabkan oleh keadaan di luar kendali wajar kami, seperti bencana alam, gangguan jaringan skala luas, atau kebijakan pemerintah.",
      ],
    },
    {
      heading: "12. Hukum yang Berlaku dan Penyelesaian Sengketa",
      paragraphs: [
        "Syarat & Ketentuan ini tunduk pada hukum Republik Indonesia.",
        "Sengketa diupayakan diselesaikan terlebih dahulu melalui musyawarah. Apabila tidak tercapai, para pihak sepakat menyelesaikannya melalui forum yang berwenang di Indonesia.",
      ],
    },
    {
      heading: "13. Perubahan Syarat",
      paragraphs: [
        "Kami dapat memperbarui Syarat & Ketentuan ini dari waktu ke waktu. Versi terbaru berlaku sejak dipublikasikan di halaman ini, dengan tanggal pembaruan yang tercantum di bagian atas.",
      ],
    },
    {
      heading: "14. Kontak",
      paragraphs: [
        `Pertanyaan mengenai Syarat & Ketentuan ini dapat disampaikan kepada ${legalEntity} melalui email ${legalEmail} atau WhatsApp ${legalWhatsapp}, dengan alamat surat di ${companyAddress}.`,
      ],
    },
  ],
};

export const privacy: LegalContent = {
  title: "Kebijakan Privasi",
  updated: "11 Oktober 2026",
  intro: `Kebijakan Privasi ini menjelaskan bagaimana ${legalEntity} mengumpulkan, menggunakan, dan melindungi data pribadi Anda ketika Anda mengunjungi dibumi.com atau berkomunikasi dengan kami. Kami memproses data pribadi sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.`,
  sections: [
    {
      heading: "1. Data Pribadi yang Kami Kumpulkan",
      paragraphs: [
        "Data yang Anda berikan secara langsung, seperti nama, alamat email, nomor WhatsApp, nama perusahaan, dan isi pesan ketika Anda mengisi formulir kontak atau menghubungi kami.",
        "Data yang tercatat secara otomatis, seperti alamat IP, jenis peramban, perangkat, halaman yang dikunjungi, dan waktu akses, yang digunakan untuk menjaga keamanan dan meningkatkan kualitas situs.",
      ],
    },
    {
      heading: "2. Cara Kami Memperoleh Data",
      paragraphs: [
        "Melalui formulir kontak pada situs, korespondensi email, percakapan WhatsApp, serta interaksi lain yang Anda inisiasi sendiri dengan tim kami.",
      ],
    },
    {
      heading: "3. Dasar Hukum Pemrosesan",
      paragraphs: [
        "Persetujuan Anda, ketika Anda mengirimkan data melalui formulir atau menghubungi kami lebih dahulu.",
        "Pelaksanaan perjanjian, ketika data diperlukan untuk menyiapkan penawaran atau menjalankan proyek yang Anda sepakati.",
        "Kepentingan sah kami, untuk menjaga keamanan sistem, mencegah penyalahgunaan, dan mengembangkan layanan secara wajar.",
      ],
    },
    {
      heading: "4. Tujuan Penggunaan Data",
      paragraphs: [
        "Menanggapi pertanyaan, permintaan penawaran, dan kebutuhan konsultasi teknis Anda.",
        "Menjalankan, mengelola, dan memelihara proyek serta layanan yang Anda gunakan.",
        "Memenuhi kewajiban hukum dan administrasi yang berlaku.",
      ],
    },
    {
      heading: "5. Cookie dan Teknologi Serupa",
      paragraphs: [
        "Situs ini dapat menggunakan cookie atau penyimpanan lokal untuk menjaga preferensi bahasa, analitik dasar, dan fungsi teknis lainnya.",
        "Anda dapat mengatur peramban untuk menolak cookie, dengan catatan sebagian fitur situs mungkin tidak bekerja optimal.",
      ],
    },
    {
      heading: "6. Berbagi Data dengan Pihak Ketiga",
      paragraphs: [
        "Kami dapat melibatkan penyedia layanan yang diperlukan untuk operasional, seperti penyedia hosting dan jaringan distribusi konten, layanan email, serta layanan pesan seperti WhatsApp.",
        "Pihak ketiga tersebut hanya memproses data sesuai kebutuhan layanan dan tidak kami izinkan menggunakannya untuk tujuan lain.",
        "Kami tidak menjual data pribadi Anda kepada pihak lain.",
      ],
    },
    {
      heading: "7. Transfer dan Retensi Data",
      paragraphs: [
        "Apabila penyedia layanan berada di luar Indonesia, kami berupaya memastikan adanya perlindungan yang memadai sesuai ketentuan yang berlaku.",
        "Data disimpan hanya selama diperlukan untuk tujuan pengumpulannya, untuk pelaksanaan perjanjian, atau untuk memenuhi kewajiban hukum. Setelah itu data dihapus atau dianonimkan.",
      ],
    },
    {
      heading: "8. Keamanan Data",
      paragraphs: [
        "Kami menerapkan langkah teknis dan organisasi yang wajar, seperti pembatasan akses, enkripsi pada transmisi, dan pemantauan sistem, untuk melindungi data dari akses tidak sah.",
        "Meski demikian, tidak ada metode transmisi atau penyimpanan yang sepenuhnya bebas risiko. Kami terus memperbaiki praktik keamanan kami secara berkala.",
      ],
    },
    {
      heading: "9. Hak Anda sebagai Subjek Data",
      paragraphs: [
        "Anda berhak meminta informasi mengenai data pribadi Anda yang kami proses, serta meminta salinan, pembaruan, atau koreksi atas data yang tidak akurat.",
        "Anda berhak meminta penghapusan data, menarik kembali persetujuan, mengajukan keberatan atas pemrosesan tertentu, dan meminta pembatasan pemrosesan sesuai ketentuan hukum.",
        `Untuk menggunakan hak tersebut, hubungi kami melalui ${legalEmail}. Kami akan menindaklanjuti permintaan yang sah dalam waktu yang wajar.`,
      ],
    },
    {
      heading: "10. Data Anak",
      paragraphs: [
        "Layanan kami ditujukan untuk kebutuhan bisnis dan tidak dengan sengaja mengumpulkan data pribadi anak di bawah usia yang ditentukan hukum tanpa persetujuan orang tua atau wali.",
      ],
    },
    {
      heading: "11. Perubahan Kebijakan",
      paragraphs: [
        "Kami dapat memperbarui Kebijakan Privasi ini seiring perubahan layanan atau peraturan. Versi terbaru berlaku sejak dipublikasikan, dengan tanggal pembaruan di bagian atas halaman.",
      ],
    },
    {
      heading: "12. Kontak Pengendali Data",
      paragraphs: [
        `Pengendali data dalam kebijakan ini adalah ${legalEntity}, beralamat di ${companyAddress}. Anda dapat menghubungi kami melalui email ${legalEmail} atau WhatsApp ${legalWhatsapp}.`,
      ],
    },
  ],
};
