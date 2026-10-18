import { companyAddress, type Locale } from "@/lib/i18n";

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

export type LegalDoc = "terms" | "privacy";

export const legalEntity = "Dibumi Teknologi Indonesia";
export const legalEmail = "fatkul@dibumi.com";
export const legalWhatsapp = "+62 856-0710-0255";

/*
 * Dokumen legal hanya tersedia dalam bahasa Inggris dan Indonesia. Menerjemahkan
 * teks hukum ke bahasa lain tanpa peninjauan ahli berisiko mengubah makna, jadi
 * locale lain menampilkan versi Inggris beserta pemberitahuan di halaman.
 */

const termsEn: LegalContent = {
  title: "Terms & Conditions",
  updated: "October 11, 2026",
  intro: `These Terms & Conditions govern your use of dibumi.com and the working relationship between you and ${legalEntity}. By accessing this site or signing our proposal, you confirm that you have read and agree to the terms below.`,
  sections: [
    {
      heading: "1. Definitions",
      paragraphs: [
        `"We", "us", or "Provider" refers to ${legalEntity}, with its registered address at ${companyAddress}.`,
        '"You" or "Client" refers to any individual or business entity using our services.',
        '"Services" covers custom software development, Android applications, company profile websites, WebView services, server and DevOps management, and maintenance and technical support.',
      ],
    },
    {
      heading: "2. Scope of Services",
      paragraphs: [
        "The scope of each project is defined in the Proposal or Statement of Work (SOW) agreed by both parties. That document forms an inseparable part of these Terms & Conditions.",
        "Work not listed in the SOW is considered out of scope and will be offered as additional work with its own cost and timeline.",
      ],
    },
    {
      heading: "3. Proposals, Estimates, and Scope Changes",
      paragraphs: [
        "Time and cost estimates are based on the information you provide during discovery. Changes to requirements after the SOW is agreed may affect the schedule and project value.",
        "Every change request will be confirmed in writing before work begins, so you keep full control over any additional cost.",
      ],
    },
    {
      heading: "4. Payment and Taxes",
      paragraphs: [
        "Payment is usually a deposit at project start and settlement against the agreed milestone terms.",
        "Invoices are payable by the due date stated in the proposal. Late payment may delay delivery and may incur administrative fees.",
        "All prices exclude applicable taxes unless stated otherwise in writing.",
      ],
    },
    {
      heading: "5. Client Obligations",
      paragraphs: [
        "You are responsible for providing the information, access, materials, and approvals needed for the work to proceed on schedule.",
        "You warrant that all materials you provide do not infringe the intellectual property rights of any third party.",
      ],
    },
    {
      heading: "6. Intellectual Property and Handover",
      paragraphs: [
        "After full payment, ownership of the source code, repositories, and project assets developed specifically for you transfers to you.",
        "Third-party components, open-source libraries, and our internal tooling remain subject to their respective licenses and are not transferred.",
        "We may reference the project name in general terms as part of our portfolio unless you request otherwise in writing.",
      ],
    },
    {
      heading: "7. Confidentiality",
      paragraphs: [
        "Both parties keep non-public information confidential, including business ideas, customer data, and software logic, during and after the project.",
        "We can sign a separate Non-Disclosure Agreement (NDA) if you need one before the project starts.",
      ],
    },
    {
      heading: "8. Warranty, Maintenance, and SLA",
      paragraphs: [
        "Every project includes a bug-fix warranty period as stated in the SOW. The warranty covers functional defects, not new features.",
        "Maintenance, monitoring, and emergency server support are governed by a separate service level agreement (SLA) for clients who need it.",
      ],
    },
    {
      heading: "9. Limitation of Liability",
      paragraphs: [
        "Services are provided to the best of our ability, but we do not warrant that the software will be free of all interruption or fit for any purpose outside the SOW.",
        "To the extent permitted by law, our total liability for a claim will not exceed the amount you paid for the work that is the basis of the claim.",
        "We are not liable for indirect losses, lost profits, or data loss arising from use outside the SOW.",
      ],
    },
    {
      heading: "10. Suspension and Termination",
      paragraphs: [
        "Either party may terminate the engagement in writing if the other party commits a material breach and does not remedy it within a reasonable time after notice.",
        "If the project is terminated, you remain responsible for paying for work completed up to the termination date, and we hand over the work produced up to that point.",
      ],
    },
    {
      heading: "11. Force Majeure",
      paragraphs: [
        "We are not liable for delays or failures caused by events beyond our reasonable control, such as natural disasters, widespread network outages, or government policy.",
      ],
    },
    {
      heading: "12. Governing Law and Dispute Resolution",
      paragraphs: [
        "These Terms & Conditions are governed by the laws of the Republic of Indonesia.",
        "Disputes will first be pursued through deliberation. If unresolved, the parties agree to settle them before a competent forum in Indonesia.",
      ],
    },
    {
      heading: "13. Changes to These Terms",
      paragraphs: [
        "We may update these Terms & Conditions from time to time. The latest version applies from the moment it is published on this page, with the update date shown at the top.",
      ],
    },
    {
      heading: "14. Contact",
      paragraphs: [
        `Questions about these Terms & Conditions can be sent to ${legalEntity} at ${legalEmail} or WhatsApp ${legalWhatsapp}, with correspondence address ${companyAddress}.`,
      ],
    },
  ],
};

const termsId: LegalContent = {
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

const privacyEn: LegalContent = {
  title: "Privacy Policy",
  updated: "October 11, 2026",
  intro: `This Privacy Policy explains how ${legalEntity} collects, uses, and protects your personal data when you visit dibumi.com or communicate with us. We process personal data in line with Law No. 27 of 2022 on Personal Data Protection.`,
  sections: [
    {
      heading: "1. Personal Data We Collect",
      paragraphs: [
        "Data you provide directly, such as your name, email address, WhatsApp number, company name, and message content when you fill in the contact form or contact us.",
        "Data recorded automatically, such as IP address, browser type, device, pages visited, and access time, used to maintain security and improve the quality of the site.",
      ],
    },
    {
      heading: "2. How We Obtain Data",
      paragraphs: [
        "Through the contact form on the site, email correspondence, WhatsApp conversations, and other interactions you initiate with our team.",
      ],
    },
    {
      heading: "3. Legal Basis for Processing",
      paragraphs: [
        "Your consent, when you submit data through the form or contact us first.",
        "Performance of a contract, when data is needed to prepare a proposal or deliver a project you have agreed to.",
        "Our legitimate interests, to maintain system security, prevent misuse, and develop our services reasonably.",
      ],
    },
    {
      heading: "4. Purposes of Use",
      paragraphs: [
        "Responding to your questions, quotation requests, and technical consultation needs.",
        "Delivering, managing, and maintaining the projects and services you use.",
        "Complying with applicable legal and administrative obligations.",
      ],
    },
    {
      heading: "5. Cookies and Similar Technologies",
      paragraphs: [
        "This site may use cookies or local storage to remember language preferences, basic analytics, and other technical functions.",
        "You can configure your browser to reject cookies, though some site features may not work optimally.",
      ],
    },
    {
      heading: "6. Sharing Data with Third Parties",
      paragraphs: [
        "We may engage service providers needed for operations, such as hosting and content delivery networks, email services, and messaging services such as WhatsApp.",
        "Those third parties only process data as required for their service and are not permitted to use it for other purposes.",
        "We do not sell your personal data to anyone.",
      ],
    },
    {
      heading: "7. Data Transfer and Retention",
      paragraphs: [
        "Where a service provider is located outside Indonesia, we seek to ensure adequate protection under the applicable rules.",
        "Data is stored only as long as needed for the purpose of collection, for performing a contract, or to meet legal obligations. After that, data is deleted or anonymized.",
      ],
    },
    {
      heading: "8. Data Security",
      paragraphs: [
        "We apply reasonable technical and organizational measures, such as access restrictions, encryption in transit, and system monitoring, to protect data from unauthorized access.",
        "No method of transmission or storage is entirely risk-free. We keep improving our security practices on a regular basis.",
      ],
    },
    {
      heading: "9. Your Rights as a Data Subject",
      paragraphs: [
        "You may request information about the personal data we process, and ask for a copy, update, or correction of inaccurate data.",
        "You may request deletion, withdraw consent, object to certain processing, and request restriction of processing as provided by law.",
        `To exercise these rights, contact us at ${legalEmail}. We will follow up on valid requests within a reasonable time.`,
      ],
    },
    {
      heading: "10. Children's Data",
      paragraphs: [
        "Our services are intended for business needs and do not knowingly collect personal data of children below the age set by law without parental or guardian consent.",
      ],
    },
    {
      heading: "11. Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy as our services or regulations change. The latest version applies from publication, with the update date shown at the top of the page.",
      ],
    },
    {
      heading: "12. Data Controller Contact",
      paragraphs: [
        `The data controller under this policy is ${legalEntity}, with its address at ${companyAddress}. You can reach us at ${legalEmail} or WhatsApp ${legalWhatsapp}.`,
      ],
    },
  ],
};

const privacyId: LegalContent = {
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

const documents: Record<"en" | "id", Record<LegalDoc, LegalContent>> = {
  en: { terms: termsEn, privacy: privacyEn },
  id: { terms: termsId, privacy: privacyId },
};

/**
 * Mengembalikan dokumen legal untuk locale tertentu. Locale tanpa terjemahan
 * memakai versi Inggris dan menandai `isFallback`, supaya halaman bisa
 * menampilkan pemberitahuan bahasa.
 */
export function getLegal(
  locale: Locale,
  doc: LegalDoc,
): { content: LegalContent; isFallback: boolean } {
  if (locale === "en" || locale === "id") {
    return { content: documents[locale][doc], isFallback: false };
  }

  return { content: documents.en[doc], isFallback: true };
}
