export const locales = ["en", "id", "ar", "zh", "pl"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  id: "ID",
  ar: "عربي",
  zh: "中文",
  pl: "PL",
};

/** Nama bahasa lengkap, dipakai di menu pemilih bahasa. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
  ar: "العربية",
  zh: "中文",
  pl: "Polski",
};

export const companyAddress =
  "RT 003 RW 003, Desa Ngambeg, Kecamatan Pucuk, Kabupaten Lamongan, Provinsi Jawa Timur, Indonesia 62257";

export type ProductGroupCopy = {
  label: string;
  brand: string;
  description: string;
};

export type SiteContent = {
  nav: {
    home: string;
    product: string;
    services: string;
    process: string;
    standards: string;
    contact: string;
    team: string;
    cta: string;
    menu: string;
    closeMenu: string;
    language: string;
    soon: string;
    allServices: string;
  };
  hero: {
    titleLead: string;
    titleAccent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    chips: string[];
  };
  teamPage: {
    eyebrow: string;
    role: string;
    bio: string[];
    linksLabel: string;
    emailLabel: string;
    whatsappLabel: string;
    githubLabel: string;
    facts: { label: string; value: string }[];
    cta: string;
    metaTitle: string;
    metaDescription: string;
  };
  highlights: { tag: string; title: string; description: string }[];
  servicesSection: {
    eyebrow: string;
    title: string;
    description: string;
    consult: string;
  };
  services: { title: string; description: string; points: string[] }[];
  products: {
    eyebrow: string;
    title: string;
    description: string;
    soon: string;
    visit: string;
    hub: string;
    groups: Record<"platforms" | "ngambeg", ProductGroupCopy>;
    platforms: Record<
      | "aiGateway"
      | "paymentOrchestration"
      | "adserverExchange"
      | "cloudHostingBilling"
      | "trafficAnalytics",
      { description: string }
    >;
  };
  clients: {
    eyebrow: string;
    title: string;
    description: string;
  };
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  standards: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; description: string }[];
    commitments: { title: string; description: string }[];
  };
  contact: {
    title: string;
    description: string;
    locationLabel: string;
    location: string;
    locationNote: string;
    emailLabel: string;
    emailHint: string;
    hoursLabel: string;
    hours: string;
    hoursNote: string;
    whatsappHint: string;
    whatsappMessage: string;
  };
  footer: {
    description: string;
    location: string;
    address: string;
    product: string;
    company: string;
    contact: string;
    legal: string;
    terms: string;
    privacy: string;
    copyright: string;
    builtFor: string;
    whatsapp: string;
    since: string;
  };
  legal: {
    updated: string;
    englishOnly: string;
  };
  metadata: { title: string; description: string };
};

const en: SiteContent = {
  nav: {
    home: "Home",
    product: "Product",
    services: "Services",
    process: "Process",
    standards: "Standards",
    contact: "Contact",
    team: "Team",
    cta: "Start a project",
    menu: "Open navigation",
    closeMenu: "Close navigation",
    language: "Language",
    soon: "Soon",
    allServices: "All services",
  },
  hero: {
    titleLead: "We build it.",
    titleAccent: "We keep it running.",
    description:
      "Custom software, Android apps, and the servers they run on. One team ships it and stays on call.",
    primaryCta: "Start a project",
    secondaryCta: "View services",
    chips: ["Fixed scope", "Full code ownership", "24/7 SLA for servers"],
  },
  teamPage: {
    eyebrow: "Team",
    role: "Founder & Lead Engineer",
    bio: [
      "Fatkul runs dibumi.com from Lamongan, East Java. He writes the custom software, ships the Android apps, and handles the servers when something breaks.",
      "The studio's own products are his too: AI Gateway, Payment Orchestration, Adserver Exchange, and the apps and games published under Ngambeg Cyber Media.",
    ],
    linksLabel: "Reach him directly",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    githubLabel: "GitHub",
    facts: [
      { label: "Based in", value: "Lamongan, East Java" },
      { label: "Studio", value: "Dibumi Technology Indonesia" },
      { label: "Focus", value: "Custom software, Android, servers" },
      { label: "Hours", value: "Monday to Saturday, 08:30-20:00 WIB" },
    ],
    cta: "Start a project",
    metaTitle: "Fatkul Nur Koirudin | dibumi.com",
    metaDescription:
      "Founder and lead engineer at dibumi.com in Lamongan, East Java. Custom software, Android apps, and the servers they run on.",
  },
  highlights: [
    {
      tag: "01 / DISCOVER",
      title: "Scope before code",
      description:
        "Discovery, a written scope, and a fixed estimate before the first line is written.",
    },
    {
      tag: "02 / BUILD",
      title: "Built to be maintained",
      description:
        "Modular architecture, clean code, and tests that survive the next developer.",
    },
    {
      tag: "03 / OPERATE",
      title: "Handover without handcuffs",
      description:
        "You own the code, the repositories, and the cloud accounts from day one.",
    },
  ],
  servicesSection: {
    eyebrow: "Services",
    title: "What we build",
    description:
      "Six practices, one team. From core business systems to the server room.",
    consult: "Discuss a project",
  },
  services: [
    {
      title: "Custom Software Development",
      description:
        "Custom software for your workflow, from internal automation to modular ERP and CRM platforms.",
      points: ["API & payment gateway integration", "Secure, modular architecture"],
    },
    {
      title: "Android WebView Services",
      description:
        "Turn your website into an official Android app ready for the Google Play Store.",
      points: ["Play Store ready", "1-2 day delivery"],
    },
    {
      title: "Modern Company Profiles",
      description:
        "Corporate websites with on-page SEO, fast performance, and direct sales team connections.",
      points: ["Optimized Core Web Vitals", "Dynamic schema & metadata"],
    },
    {
      title: "Custom Android Apps",
      description:
        "Native or cross-platform Android apps with stable performance and offline synchronization.",
      points: ["MVVM / clean architecture", "Offline-first database"],
    },
    {
      title: "Server & DevOps Management",
      description:
        "Server setup, hardening, tuning, and maintenance to protect your business uptime.",
      points: ["Hardening & Fail2ban", "Nginx, reverse proxy & backup"],
    },
    {
      title: "Maintenance & SLA",
      description:
        "Monitoring, security updates, encrypted backups, and long-term technical support.",
      points: ["Regular monitoring", "Priority incident response"],
    },
  ],
  products: {
    eyebrow: "Products",
    title: "Our own products",
    description:
      "Alongside client work, we design, ship, and maintain our own apps and games.",
    soon: "Soon",
    visit: "Open site",
    hub: "All products on ngambeg.com",
    groups: {
      platforms: {
        label: "Platforms",
        brand: "dibumi.com",
        description:
          "Our own products, built and operated by the team that ships client work.",
      },
      ngambeg: {
        label: "Ngambeg Cyber Media",
        brand: "ngambeg.com",
        description:
          "Games and everyday Android utilities, built and published under our own label.",
      },
    },
    platforms: {
      aiGateway: {
        description:
          "One API key, one wallet, and a catalogue of models for builders.",
      },
      paymentOrchestration: {
        description:
          "One API for every payment gateway: automatic routing, fallback, idempotency, and normalized webhooks.",
      },
      adserverExchange: {
        description:
          "Campaigns, placements, creatives, targeting rules, and daily stats in a single ad server.",
      },
      cloudHostingBilling: {
        description:
          "White-label billing and provisioning for hosting businesses: orders, invoices, domains, tickets.",
      },
      trafficAnalytics: {
        description:
          "Visits, referrers, and conversion funnels in a single dashboard.",
      },
    },
  },
  clients: {
    eyebrow: "Clients",
    title: "Clients we have worked with",
    description:
      "Teams and networks we have supported across software, mobile, and infrastructure work.",
  },
  workflow: {
    eyebrow: "Process",
    title: "A structured way of working",
    description:
      "A transparent agile process lets you follow project progress at every stage.",
    steps: [
      {
        title: "Discovery & Requirements",
        description:
          "We understand your business flow, users, and system needs, then create a clear Scope of Work.",
      },
      {
        title: "System Design & Architecture",
        description:
          "We design the database, API, UI/UX, and server specifications for future growth.",
      },
      {
        title: "Development & Quality Assurance",
        description:
          "Every module is built with clean code and tested for function, security, and performance.",
      },
      {
        title: "Deployment, Training & Warranty",
        description:
          "We launch the system, guide your team, and include a bug-fix warranty period.",
      },
    ],
  },
  standards: {
    eyebrow: "Standards",
    title: "How we work",
    description: "Professional commitments applied to every project we deliver.",
    items: [
      {
        title: "Non-Disclosure Agreement",
        description:
          "We protect your business ideas, customer data, and software logic through a formal NDA.",
      },
      {
        title: "Security from the Start",
        description:
          "Systems are designed to reduce common attack risks and API endpoint exposure.",
      },
      {
        title: "Clean, Maintainable Code",
        description:
          "Organized, modular, and documented code makes future development easier.",
      },
    ],
    commitments: [
      {
        title: "Full ownership",
        description:
          "Your company owns the code, repository, cloud accounts, and database access.",
      },
      {
        title: "Transparent",
        description:
          "Scope, timeline, and costs are agreed upfront with no hidden fees.",
      },
      {
        title: "Ongoing support",
        description:
          "Continued technical support after handover, including a bug-fix warranty.",
      },
    ],
  },
  contact: {
    title: "Start building your system",
    description:
      "Contact our technical desk in Lamongan for a quick response and technical discovery.",
    locationLabel: "Office location",
    location: companyAddress,
    locationNote: "Serving clients across Indonesia",
    emailLabel: "Correspondence email",
    emailHint: "For briefs, documents, and anything long.",
    hoursLabel: "Business hours",
    hours: "Monday-Saturday (08:30-20:00 WIB)",
    hoursNote: "24/7 emergency server service for SLA clients",
    whatsappHint: "The fastest route. No form, no queue.",
    whatsappMessage:
      "Hello dibumi.com Lamongan team,\n\nI would like to discuss my project needs. Thank you!",
  },
  footer: {
    description:
      "An app and software production studio based in Lamongan, Indonesia. We help teams ship reliable software, mobile apps, and the infrastructure behind them.",
    location: "Lamongan, East Java, Indonesia",
    address: companyAddress,
    product: "Product",
    company: "Company",
    contact: "Contact",
    legal: "Legal",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    copyright: "All rights reserved.",
    builtFor: "Built in Lamongan, shipped worldwide.",
    whatsapp: "WhatsApp consultation",
    since: "Building since 2013",
  },
  legal: {
    updated: "Last updated",
    englishOnly: "This document is available in English.",
  },
  metadata: {
    title: "dibumi.com | App & Software Production Studio in Lamongan",
    description:
      "A software production studio in Lamongan, Indonesia. Custom software, Android apps, company websites, and server operations.",
  },
};

const id: SiteContent = {
  nav: {
    home: "Beranda",
    product: "Produk",
    services: "Layanan",
    process: "Proses",
    standards: "Standar",
    contact: "Kontak",
    team: "Tim",
    cta: "Mulai proyek",
    menu: "Buka navigasi",
    closeMenu: "Tutup navigasi",
    language: "Bahasa",
    soon: "Segera",
    allServices: "Semua layanan",
  },
  hero: {
    titleLead: "Kami yang bangun.",
    titleAccent: "Kami yang jaga.",
    description:
      "Software kustom, aplikasi Android, dan server yang menjalankannya. Satu tim yang sama merilis dan berjaga setelahnya.",
    primaryCta: "Mulai proyek",
    secondaryCta: "Lihat layanan",
    chips: ["Lingkup tetap", "Kode sepenuhnya milik Anda", "SLA server 24/7"],
  },
  teamPage: {
    eyebrow: "Tim",
    role: "Pendiri & Lead Engineer",
    bio: [
      "Fatkul menjalankan dibumi.com dari Lamongan, Jawa Timur. Ia menulis software kustom, merilis aplikasi Android, dan menangani server saat ada yang bermasalah.",
      "Produk milik studio juga dia yang urus: AI Gateway, Payment Orchestration, Adserver Exchange, dan aplikasi serta game yang terbit di bawah Ngambeg Cyber Media.",
    ],
    linksLabel: "Hubungi langsung",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    githubLabel: "GitHub",
    facts: [
      { label: "Berbasis di", value: "Lamongan, Jawa Timur" },
      { label: "Studio", value: "Dibumi Technology Indonesia" },
      { label: "Fokus", value: "Software kustom, Android, server" },
      { label: "Jam kerja", value: "Senin sampai Sabtu, 08.30-20.00 WIB" },
    ],
    cta: "Mulai proyek",
    metaTitle: "Fatkul Nur Koirudin | dibumi.com",
    metaDescription:
      "Pendiri dan lead engineer dibumi.com di Lamongan, Jawa Timur. Software kustom, aplikasi Android, dan server yang menjalankannya.",
  },
  highlights: [
    {
      tag: "01 / DISCOVER",
      title: "Lingkup sebelum kode",
      description:
        "Discovery, lingkup tertulis, dan estimasi tetap sebelum satu baris kode ditulis.",
    },
    {
      tag: "02 / BUILD",
      title: "Dibangun untuk dirawat",
      description:
        "Arsitektur modular, kode bersih, dan pengujian yang bertahan sampai developer berikutnya.",
    },
    {
      tag: "03 / OPERATE",
      title: "Serah terima tanpa jerat",
      description:
        "Kode, repositori, dan akun cloud menjadi milik Anda sejak hari pertama.",
    },
  ],
  servicesSection: {
    eyebrow: "Layanan",
    title: "Yang kami bangun",
    description:
      "Enam praktik, satu tim. Dari sistem inti bisnis sampai ruang server.",
    consult: "Konsultasikan",
  },
  services: [
    {
      title: "Custom Software Development",
      description:
        "Perangkat lunak kustom sesuai workflow bisnis Anda, dari automasi internal hingga ERP dan CRM modular.",
      points: ["Integrasi API & payment gateway", "Arsitektur aman & modular"],
    },
    {
      title: "Jasa WebView Android",
      description:
        "Konversi website menjadi aplikasi Android resmi yang siap rilis ke Google Play Store.",
      points: ["Play Store ready", "Pengerjaan 1-2 hari"],
    },
    {
      title: "Company Profile Modern",
      description:
        "Website profil korporat dengan SEO on-page, performa cepat, dan koneksi langsung ke tim sales.",
      points: ["Core Web Vitals optimal", "Schema markup & meta dinamis"],
    },
    {
      title: "Custom Android Apps",
      description:
        "Aplikasi Android native atau cross-platform dengan performa stabil dan sinkronisasi offline.",
      points: ["MVVM / clean architecture", "Database offline-first"],
    },
    {
      title: "Kelola Server & DevOps",
      description:
        "Setup, hardening, tuning, dan pemeliharaan server untuk menjaga uptime bisnis Anda.",
      points: ["Hardening & Fail2ban", "Nginx, reverse proxy & backup"],
    },
    {
      title: "Maintenance & SLA",
      description:
        "Monitoring, security update, backup terenkripsi, dan pendampingan teknis jangka panjang.",
      points: ["Monitoring berkala", "Respons darurat prioritas"],
    },
  ],
  products: {
    eyebrow: "Produk",
    title: "Produk milik kami sendiri",
    description:
      "Selain pekerjaan klien, kami merancang, merilis, dan merawat aplikasi serta game kami sendiri.",
    soon: "Segera",
    visit: "Buka situs",
    hub: "Semua produk di ngambeg.com",
    groups: {
      platforms: {
        label: "Platform",
        brand: "dibumi.com",
        description:
          "Produk kami sendiri, dibangun dan dikelola oleh tim yang sama dengan pekerjaan klien.",
      },
      ngambeg: {
        label: "Ngambeg Cyber Media",
        brand: "ngambeg.com",
        description:
          "Game dan utilitas Android sehari-hari, dibangun dan diterbitkan dengan label kami sendiri.",
      },
    },
    platforms: {
      aiGateway: {
        description:
          "Satu API key, satu dompet, dan katalog model untuk para builder.",
      },
      paymentOrchestration: {
        description:
          "Satu API untuk semua payment gateway: routing otomatis, fallback, idempotency, dan webhook ternormalisasi.",
      },
      adserverExchange: {
        description:
          "Kampanye, placement, creative, aturan penargetan, dan statistik harian dalam satu ad server.",
      },
      cloudHostingBilling: {
        description:
          "Billing white-label untuk bisnis hosting: order, invoice, domain, tiket, dan provisioning server otomatis.",
      },
      trafficAnalytics: {
        description:
          "Kunjungan, referrer, dan funnel konversi dalam satu dashboard.",
      },
    },
  },
  clients: {
    eyebrow: "Klien",
    title: "Klien yang pernah bekerja sama",
    description:
      "Tim dan jaringan yang pernah kami dukung dalam pekerjaan software, mobile, dan infrastruktur.",
  },
  workflow: {
    eyebrow: "Proses",
    title: "Alur kerja yang terstruktur",
    description:
      "Metode agile yang transparan, sehingga Anda dapat memantau progres proyek secara berkala.",
    steps: [
      {
        title: "Discovery & Analisis Kebutuhan",
        description:
          "Kami memahami alur bisnis, target pengguna, dan kebutuhan sistem, lalu menyusun Scope of Work yang jelas.",
      },
      {
        title: "Desain Sistem & Arsitektur",
        description:
          "Kami merancang database, API, UI/UX, dan spesifikasi server agar sistem siap berkembang.",
      },
      {
        title: "Pengembangan & Quality Assurance",
        description:
          "Setiap modul dibangun dengan clean code dan diuji dari sisi fungsi, keamanan, dan performa.",
      },
      {
        title: "Deployment, Training & Garansi",
        description:
          "Sistem diluncurkan, tim Anda mendapat panduan, dan proyek disertai masa garansi bug.",
      },
    ],
  },
  standards: {
    eyebrow: "Standar",
    title: "Cara kami bekerja",
    description:
      "Komitmen profesionalitas yang berlaku di setiap proyek yang kami kerjakan.",
    items: [
      {
        title: "Perjanjian Kerahasiaan (NDA)",
        description:
          "Kami menjaga kerahasiaan ide bisnis, database pelanggan, dan seluruh logika software Anda.",
      },
      {
        title: "Keamanan Sejak Awal",
        description:
          "Sistem dirancang untuk mengurangi risiko serangan umum dan kebocoran endpoint API.",
      },
      {
        title: "Kode Bersih & Mudah Dirawat",
        description:
          "Kode ditulis terorganisir, modular, dan terdokumentasi agar mudah dikembangkan.",
      },
    ],
    commitments: [
      {
        title: "Hak milik penuh",
        description:
          "Kode program, repositori, akun cloud, dan akses database menjadi aset perusahaan Anda.",
      },
      {
        title: "Transparan",
        description:
          "Lingkup kerja, timeline, dan biaya disepakati di awal tanpa biaya tersembunyi.",
      },
      {
        title: "Pendampingan",
        description:
          "Dukungan teknis berkelanjutan setelah serah terima, termasuk masa garansi bug.",
      },
    ],
  },
  contact: {
    title: "Mulai bangun sistem Anda",
    description:
      "Hubungi technical desk kami di Lamongan untuk respons cepat dan analisis kebutuhan teknis.",
    locationLabel: "Domisili kantor",
    location: companyAddress,
    locationNote: "Melayani klien di seluruh Indonesia",
    emailLabel: "Email korespondensi",
    emailHint: "Untuk brief, dokumen, dan hal yang butuh penjelasan panjang.",
    hoursLabel: "Jam operasional",
    hours: "Senin-Sabtu (08.30-20.00 WIB)",
    hoursNote: "Layanan darurat server aktif 24/7 bagi klien SLA",
    whatsappHint: "Jalur tercepat. Tanpa formulir, tanpa antre.",
    whatsappMessage:
      "Halo tim dibumi.com Lamongan,\n\nSaya ingin berkonsultasi mengenai kebutuhan proyek. Terima kasih!",
  },
  footer: {
    description:
      "Studio produksi aplikasi dan software yang berbasis di Lamongan, Indonesia. Kami membantu tim merilis software, aplikasi mobile, dan infrastruktur yang andal.",
    location: "Lamongan, Jawa Timur, Indonesia",
    address: companyAddress,
    product: "Produk",
    company: "Perusahaan",
    contact: "Kontak",
    legal: "Legal",
    terms: "Syarat & Ketentuan",
    privacy: "Kebijakan Privasi",
    copyright: "Hak cipta dilindungi undang-undang.",
    builtFor: "Dibangun di Lamongan, dikirim ke seluruh dunia.",
    whatsapp: "Konsultasi WhatsApp",
    since: "Berkarya sejak 2013",
  },
  legal: {
    updated: "Terakhir diperbarui",
    englishOnly: "Dokumen ini tersedia dalam bahasa Inggris.",
  },
  metadata: {
    title: "dibumi.com | Studio Produksi Aplikasi & Software di Lamongan",
    description:
      "Studio produksi software di Lamongan, Indonesia. Custom software, aplikasi Android, website perusahaan, dan operasional server.",
  },
};

const ar: SiteContent = {
  nav: {
    home: "الرئيسية",
    product: "المنتجات",
    services: "الخدمات",
    process: "المنهجية",
    standards: "المعايير",
    contact: "تواصل معنا",
    team: "الفريق",
    cta: "ابدأ مشروعك",
    menu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
    language: "اللغة",
    soon: "قريباً",
    allServices: "جميع الخدمات",
  },
  hero: {
    titleLead: "نبنيها.",
    titleAccent: "ونواصل تشغيلها.",
    description:
      "برمجيات مخصصة وتطبيقات Android والخوادم التي تعمل عليها. فريق واحد يسلّمها ويبقى في الخدمة بعد الإطلاق.",
    primaryCta: "ابدأ مشروعاً",
    secondaryCta: "استكشف الخدمات",
    chips: ["نطاق ثابت", "ملكية كاملة للكود", "دعم خوادم 24/7"],
  },
  teamPage: {
    eyebrow: "الفريق",
    role: "المؤسس وكبير المهندسين",
    bio: [
      "يدير فتكُل موقع dibumi.com من لامونجان، جاوة الشرقية. يكتب البرمجيات المخصصة، ويطلق تطبيقات Android، ويتولى الخوادم عند حدوث عطل.",
      "منتجات الاستوديو الخاصة به أيضاً: AI Gateway وPayment Orchestration وAdserver Exchange، والتطبيقات والألعاب المنشورة تحت Ngambeg Cyber Media.",
    ],
    linksLabel: "تواصل معه مباشرة",
    emailLabel: "البريد الإلكتروني",
    whatsappLabel: "واتساب",
    githubLabel: "GitHub",
    facts: [
      { label: "المقر", value: "لامونجان، جاوة الشرقية" },
      { label: "الاستوديو", value: "Dibumi Technology Indonesia" },
      { label: "التخصص", value: "برمجيات مخصصة، Android، خوادم" },
      { label: "ساعات العمل", value: "الاثنين إلى السبت، 08:30-20:00 بتوقيت غرب إندونيسيا" },
    ],
    cta: "ابدأ مشروعك",
    metaTitle: "Fatkul Nur Koirudin | dibumi.com",
    metaDescription:
      "المؤسس وكبير المهندسين في dibumi.com بلامونجان، جاوة الشرقية. برمجيات مخصصة وتطبيقات Android والخوادم التي تعمل عليها.",
  },
  highlights: [
    {
      tag: "01 / DISCOVER",
      title: "النطاق قبل الكود",
      description:
        "استكشاف ونطاق مكتوب وتقدير ثابت قبل كتابة أول سطر من الكود.",
    },
    {
      tag: "02 / BUILD",
      title: "مبني ليبقى قابلاً للصيانة",
      description:
        "بنية معيارية وكود نظيف واختبارات تصمد أمام المطوّر التالي.",
    },
    {
      tag: "03 / OPERATE",
      title: "تسليم بلا قيود",
      description:
        "الكود والمستودعات وحسابات السحابة ملكك من اليوم الأول.",
    },
  ],
  servicesSection: {
    eyebrow: "الخدمات",
    title: "ما نبنيه",
    description:
      "ست ممارسات وفريق واحد. من أنظمة الأعمال الأساسية إلى غرفة الخوادم.",
    consult: "ناقش مشروعك",
  },
  services: [
    {
      title: "تطوير برمجيات مخصصة",
      description:
        "برمجيات مخصصة لسير عملك، من الأتمتة الداخلية إلى منصات ERP وCRM المرنة.",
      points: ["تكامل API وبوابات الدفع", "بنية آمنة ومرنة"],
    },
    {
      title: "خدمات Android WebView",
      description:
        "حوّل موقعك إلى تطبيق Android رسمي جاهز للنشر على Google Play.",
      points: ["جاهز للمتجر", "تسليم خلال يوم أو يومين"],
    },
    {
      title: "موقع شركة عصري",
      description:
        "مواقع شركات سريعة مع تحسين SEO وربط مباشر بفريق المبيعات.",
      points: ["أداء Core Web Vitals ممتاز", "بيانات وصفية ديناميكية"],
    },
    {
      title: "تطبيقات Android مخصصة",
      description:
        "تطبيقات أصلية أو متعددة المنصات بأداء مستقر ومزامنة دون اتصال.",
      points: ["بنية MVVM نظيفة", "قاعدة بيانات تعمل دون اتصال"],
    },
    {
      title: "إدارة الخوادم وDevOps",
      description:
        "إعداد وتأمين وصيانة الخوادم للحفاظ على استمرارية أعمالك.",
      points: ["تقوية وحماية Fail2ban", "Nginx والنسخ الاحتياطي"],
    },
    {
      title: "الصيانة وSLA",
      description:
        "مراقبة وتحديثات أمنية ونسخ احتياطية ودعم تقني طويل الأمد.",
      points: ["مراقبة دورية", "استجابة أولوية للحوادث"],
    },
  ],
  products: {
    eyebrow: "المنتجات",
    title: "منتجاتنا الخاصة",
    description:
      "إلى جانب أعمال العملاء، نصمم ونطلق ونصون تطبيقاتنا وألعابنا.",
    soon: "قريباً",
    visit: "افتح الموقع",
    hub: "جميع المنتجات على ngambeg.com",
    groups: {
      platforms: {
        label: "المنصات",
        brand: "dibumi.com",
        description:
          "منتجاتنا الخاصة، نبنيها ونديرها بالفريق نفسه الذي ينفذ أعمال العملاء.",
      },
      ngambeg: {
        label: "Ngambeg Cyber Media",
        brand: "ngambeg.com",
        description:
          "ألعاب وأدوات Android يومية، نطورها وننشرها بعلامتنا الخاصة.",
      },
    },
    platforms: {
      aiGateway: {
        description:
          "مفتاح API واحد ومحفظة واحدة وكتالوج من النماذج للمطورين.",
      },
      paymentOrchestration: {
        description:
          "واجهة API واحدة لكل بوابات الدفع: توجيه تلقائي وبديل احتياطي ومنع تكرار الطلبات وتوحيد الـ webhooks.",
      },
      adserverExchange: {
        description:
          "الحملات والمواضع والتصاميم وقواعد الاستهداف والإحصاءات اليومية في خادم إعلانات واحد.",
      },
      cloudHostingBilling: {
        description:
          "فواتير بعلامة بيضاء ولوحة عميل وتجهيز لشركات الاستضافة: الطلبات والفواتير والنطاقات والتذاكر.",
      },
      trafficAnalytics: {
        description: "الزيارات والمصادر ومسارات التحويل في لوحة واحدة.",
      },
    },
  },
  clients: {
    eyebrow: "العملاء",
    title: "عملاء تعاملنا معهم",
    description:
      "فرق وشبكات دعمناها في أعمال البرمجيات والجوال والبنية التحتية.",
  },
  workflow: {
    eyebrow: "المنهجية",
    title: "منهجية عمل منظمة",
    description:
      "منهجية Agile شفافة تتيح لك متابعة تقدم المشروع في كل مرحلة.",
    steps: [
      {
        title: "الاستكشاف والمتطلبات",
        description:
          "نفهم أعمالك ومستخدميك واحتياجات النظام، ثم نعد نطاق عمل واضحاً.",
      },
      {
        title: "تصميم النظام والبنية",
        description:
          "نصمم قاعدة البيانات وواجهات API وتجربة المستخدم ومواصفات الخادم.",
      },
      {
        title: "التطوير وضمان الجودة",
        description: "نبني كل وحدة بكود نظيف ونختبر الوظائف والأمان والأداء.",
      },
      {
        title: "الإطلاق والتدريب والضمان",
        description:
          "نطلق النظام وندرب فريقك ونقدم فترة ضمان لإصلاح الأخطاء.",
      },
    ],
  },
  standards: {
    eyebrow: "المعايير",
    title: "كيف نعمل",
    description: "التزامات مهنية نطبقها في كل مشروع نقدمه.",
    items: [
      {
        title: "اتفاقية عدم الإفصاح",
        description:
          "نحمي أفكارك وبيانات عملائك ومنطق برنامجك عبر اتفاقية رسمية.",
      },
      {
        title: "الأمان منذ البداية",
        description:
          "نصمم الأنظمة لتقليل مخاطر الهجمات الشائعة وتسرب نقاط API.",
      },
      {
        title: "كود نظيف وسهل الصيانة",
        description: "كود منظم ومرن وموثق يسهل تطويره مستقبلاً.",
      },
    ],
    commitments: [
      {
        title: "ملكية كاملة",
        description:
          "تمتلك شركتك الكود والمستودع وحسابات السحابة وقاعدة البيانات.",
      },
      {
        title: "شفافية",
        description: "نتفق على النطاق والجدول والتكلفة مسبقاً دون رسوم مخفية.",
      },
      {
        title: "دعم مستمر",
        description: "دعم تقني بعد التسليم، مع ضمان لإصلاح الأخطاء.",
      },
    ],
  },
  contact: {
    title: "ابدأ بناء نظامك",
    description:
      "تواصل مع مكتبنا التقني في لامونجان للحصول على رد سريع وتحليل تقني.",
    locationLabel: "موقع المكتب",
    location: companyAddress,
    locationNote: "نخدم العملاء في جميع أنحاء إندونيسيا",
    emailLabel: "البريد الإلكتروني",
    emailHint: "للرسائل والملفات وكل ما يحتاج تفصيلاً.",
    hoursLabel: "ساعات العمل",
    hours: "الإثنين-السبت (08:30-20:00 WIB)",
    hoursNote: "خدمة طوارئ الخوادم متاحة 24/7 لعملاء SLA",
    whatsappHint: "أسرع طريق. بلا نموذج وبلا انتظار.",
    whatsappMessage:
      "مرحباً فريق dibumi.com في لامونجان،\n\nأرغب في مناقشة احتياجات مشروعي. شكراً!",
  },
  footer: {
    description:
      "استوديو إنتاج تطبيقات وبرمجيات في لامونجان، إندونيسيا. نساعد الفرق على إطلاق برمجيات وتطبيقات جوال وبنية تحتية موثوقة.",
    location: "لامونجان، جاوة الشرقية، إندونيسيا",
    address: companyAddress,
    product: "المنتجات",
    company: "الشركة",
    contact: "تواصل معنا",
    legal: "قانوني",
    terms: "الشروط والأحكام",
    privacy: "سياسة الخصوصية",
    copyright: "جميع الحقوق محفوظة.",
    builtFor: "مبني في لامونجان، ويصل إلى العالم.",
    whatsapp: "استشارة عبر WhatsApp",
    since: "نصنع منذ 2013",
  },
  legal: {
    updated: "آخر تحديث",
    englishOnly: "هذا المستند متاح باللغة الإنجليزية.",
  },
  metadata: {
    title: "dibumi.com | استوديو إنتاج التطبيقات والبرمجيات في لامونجان",
    description:
      "استوديو برمجيات في لامونجان، إندونيسيا: برمجيات مخصصة وتطبيقات Android ومواقع شركات وتشغيل خوادم.",
  },
};

const zh: SiteContent = {
  nav: {
    home: "首页",
    product: "产品",
    services: "服务",
    process: "流程",
    standards: "标准",
    contact: "联系我们",
    team: "团队",
    cta: "开始项目",
    menu: "打开菜单",
    closeMenu: "关闭菜单",
    language: "语言",
    soon: "即将上线",
    allServices: "全部服务",
  },
  hero: {
    titleLead: "我们造出来。",
    titleAccent: "我们继续运营。",
    description:
      "定制软件、Android 应用，以及运行它们的服务器。同一个团队交付，并在上线后继续值守。",
    primaryCta: "开始项目",
    secondaryCta: "查看服务",
    chips: ["范围固定", "代码完全归属你", "服务器 24/7 SLA"],
  },
  teamPage: {
    eyebrow: "团队",
    role: "创始人兼首席工程师",
    bio: [
      "Fatkul 在印尼东爪哇省拉蒙岸运营 dibumi.com。他编写定制软件、发布 Android 应用，服务器出问题时也由他处理。",
      "工作室的自有产品同样由他负责：AI Gateway、Payment Orchestration、Adserver Exchange，以及以 Ngambeg Cyber Media 名义发布的应用和游戏。",
    ],
    linksLabel: "直接联系",
    emailLabel: "邮箱",
    whatsappLabel: "WhatsApp",
    githubLabel: "GitHub",
    facts: [
      { label: "所在地", value: "东爪哇省拉蒙岸" },
      { label: "工作室", value: "Dibumi Technology Indonesia" },
      { label: "方向", value: "定制软件、Android、服务器" },
      { label: "工作时间", value: "周一至周六 08:30-20:00（印尼西部时间）" },
    ],
    cta: "开始项目",
    metaTitle: "Fatkul Nur Koirudin | dibumi.com",
    metaDescription:
      "dibumi.com 创始人兼首席工程师，常驻印尼东爪哇省拉蒙岸。定制软件、Android 应用，以及运行它们的服务器。",
  },
  highlights: [
    {
      tag: "01 / DISCOVER",
      title: "先定范围，再写代码",
      description: "在写下第一行代码前完成需求发现、书面范围和固定报价。",
    },
    {
      tag: "02 / BUILD",
      title: "为长期维护而构建",
      description: "模块化架构、整洁代码，以及能经得起下一位开发者接手的测试。",
    },
    {
      tag: "03 / OPERATE",
      title: "交付不设枷锁",
      description: "代码、仓库和云账户从第一天起就归你所有。",
    },
  ],
  servicesSection: {
    eyebrow: "服务",
    title: "我们构建什么",
    description: "六项能力，一个团队。从核心业务系统到服务器机房。",
    consult: "讨论项目",
  },
  services: [
    {
      title: "定制软件开发",
      description:
        "根据您的业务流程定制软件，从内部自动化到模块化 ERP 和 CRM 平台。",
      points: ["API 与支付网关集成", "安全、模块化架构"],
    },
    {
      title: "Android WebView 服务",
      description: "将网站转换为可发布到 Google Play 的官方 Android 应用。",
      points: ["支持上架 Play Store", "1-2 天交付"],
    },
    {
      title: "现代企业官网",
      description:
        "拥有页面 SEO、快速性能和销售团队直连功能的企业网站。",
      points: ["优化 Core Web Vitals", "动态 Schema 与元数据"],
    },
    {
      title: "定制 Android 应用",
      description: "原生或跨平台 Android 应用，性能稳定并支持离线同步。",
      points: ["MVVM / 清晰架构", "离线优先数据库"],
    },
    {
      title: "服务器与 DevOps 管理",
      description:
        "服务器部署、安全加固、性能调优和维护，保障业务稳定运行。",
      points: ["安全加固与 Fail2ban", "Nginx、反向代理与备份"],
    },
    {
      title: "维护与 SLA",
      description: "持续监控、安全更新、加密备份和长期技术支持。",
      points: ["定期监控", "优先处理紧急事件"],
    },
  ],
  products: {
    eyebrow: "产品",
    title: "我们自有的产品",
    description: "在客户项目之外，我们设计、发布并维护自己的应用与游戏。",
    soon: "即将上线",
    visit: "打开网站",
    hub: "ngambeg.com 上的全部产品",
    groups: {
      platforms: {
        label: "平台",
        brand: "dibumi.com",
        description: "我们自研并运营的产品，与客户项目由同一个团队打造。",
      },
      ngambeg: {
        label: "Ngambeg Cyber Media",
        brand: "ngambeg.com",
        description: "游戏与日常 Android 工具，由我们自有品牌开发与发行。",
      },
    },
    platforms: {
      aiGateway: {
        description: "一个 API Key、一个钱包，以及面向开发者的模型目录。",
      },
      paymentOrchestration: {
        description:
          "一个 API 覆盖所有支付网关：自动路由、故障回退、幂等处理与统一 Webhook。",
      },
      adserverExchange: {
        description: "广告系列、广告位、创意、定向规则与每日统计，集中在一个广告服务器。",
      },
      cloudHostingBilling: {
        description: "面向主机业务的白标账单、客户中心与开通：订单、发票、域名、工单与服务器自动部署。",
      },
      trafficAnalytics: {
        description: "访问量、来源与转化漏斗，集中在一个面板。",
      },
    },
  },
  clients: {
    eyebrow: "客户",
    title: "合作过的客户",
    description: "我们在软件、移动端和基础设施项目中支持过的团队与网络。",
  },
  workflow: {
    eyebrow: "流程",
    title: "结构化工作流程",
    description: "透明的敏捷流程，让您随时了解项目进展。",
    steps: [
      {
        title: "需求发现与分析",
        description: "了解您的业务流程、用户和系统需求，制定清晰的工作范围。",
      },
      {
        title: "系统设计与架构",
        description: "规划数据库、API、UI/UX 和服务器规格，为未来增长做好准备。",
      },
      {
        title: "开发与质量保障",
        description: "采用整洁代码开发每个模块，并测试功能、安全和性能。",
      },
      {
        title: "部署、培训与保障",
        description: "完成系统上线，培训您的团队，并提供缺陷修复保障期。",
      },
    ],
  },
  standards: {
    eyebrow: "标准",
    title: "我们的工作方式",
    description: "我们在每个项目中坚持的专业承诺。",
    items: [
      {
        title: "保密协议（NDA）",
        description: "通过正式协议保护您的商业创意、客户数据和软件逻辑。",
      },
      {
        title: "安全从一开始",
        description: "从设计阶段降低常见攻击风险和 API 端点暴露风险。",
      },
      {
        title: "整洁且易维护的代码",
        description: "结构清晰、模块化并有文档的代码，方便未来持续开发。",
      },
    ],
    commitments: [
      {
        title: "完整所有权",
        description: "代码、仓库、云账户和数据库访问权均属于您的公司。",
      },
      {
        title: "透明合作",
        description: "提前确认范围、时间和费用，没有隐藏收费。",
      },
      {
        title: "持续支持",
        description: "交付后继续提供技术支持，并包含缺陷修复保障。",
      },
    ],
  },
  contact: {
    title: "开始构建您的系统",
    description:
      "联系我们位于拉蒙岸的技术团队，快速获得响应和技术需求分析。",
    locationLabel: "办公地点",
    location: companyAddress,
    locationNote: "服务印度尼西亚各地客户",
    emailLabel: "联系邮箱",
    emailHint: "适合详细需求、文档和任何长内容。",
    hoursLabel: "工作时间",
    hours: "周一至周六（08:30-20:00 WIB）",
    hoursNote: "SLA 客户享有 24/7 服务器紧急服务",
    whatsappHint: "最快的渠道。没有表单，不用排队。",
    whatsappMessage: "您好，dibumi.com 拉蒙岸团队：\n\n我想咨询项目需求。谢谢！",
  },
  footer: {
    description:
      "位于印度尼西亚拉蒙岸的应用与软件生产工作室。我们帮助团队交付可靠的软件、移动应用及其背后的基础设施。",
    location: "印度尼西亚东爪哇拉蒙岸",
    address: companyAddress,
    product: "产品",
    company: "公司",
    contact: "联系",
    legal: "法律",
    terms: "条款与条件",
    privacy: "隐私政策",
    copyright: "版权所有。",
    builtFor: "在拉蒙岸构建，交付到世界各地。",
    whatsapp: "WhatsApp 咨询",
    since: "自 2013 年起",
  },
  legal: {
    updated: "最后更新",
    englishOnly: "本文档仅提供英文版本。",
  },
  metadata: {
    title: "dibumi.com | 拉蒙岸应用与软件生产工作室",
    description:
      "位于印度尼西亚拉蒙岸的软件工作室：定制软件、Android 应用、企业网站与服务器运维。",
  },
};

const pl: SiteContent = {
  nav: {
    home: "Start",
    product: "Produkty",
    services: "Usługi",
    process: "Proces",
    standards: "Standardy",
    contact: "Kontakt",
    team: "Zespół",
    cta: "Rozpocznij projekt",
    menu: "Otwórz nawigację",
    closeMenu: "Zamknij nawigację",
    language: "Język",
    soon: "Wkrótce",
    allServices: "Wszystkie usługi",
  },
  hero: {
    titleLead: "Budujemy go.",
    titleAccent: "Utrzymujemy go.",
    description:
      "Dedykowane oprogramowanie, aplikacje Android i serwery, na których działają. Jeden zespół wdraża je i pozostaje w gotowości po premierze.",
    primaryCta: "Rozpocznij projekt",
    secondaryCta: "Zobacz usługi",
    chips: ["Stały zakres", "Pełna własność kodu", "SLA serwerów 24/7"],
  },
  teamPage: {
    eyebrow: "Zespół",
    role: "Założyciel i główny inżynier",
    bio: [
      "Fatkul prowadzi dibumi.com z Lamongan we wschodniej Jawie. Pisze dedykowane oprogramowanie, wdraża aplikacje Android i zajmuje się serwerami, gdy coś zawiedzie.",
      "Produkty własne studia też są jego: AI Gateway, Payment Orchestration, Adserver Exchange oraz aplikacje i gry wydawane pod szyldem Ngambeg Cyber Media.",
    ],
    linksLabel: "Napisz bezpośrednio",
    emailLabel: "E-mail",
    whatsappLabel: "WhatsApp",
    githubLabel: "GitHub",
    facts: [
      { label: "Siedziba", value: "Lamongan, Jawa Wschodnia" },
      { label: "Studio", value: "Dibumi Technology Indonesia" },
      { label: "Specjalizacja", value: "Oprogramowanie, Android, serwery" },
      { label: "Godziny", value: "Poniedziałek do soboty, 08:30-20:00 WIB" },
    ],
    cta: "Rozpocznij projekt",
    metaTitle: "Fatkul Nur Koirudin | dibumi.com",
    metaDescription:
      "Założyciel i główny inżynier dibumi.com w Lamongan we wschodniej Jawie. Dedykowane oprogramowanie, aplikacje Android i serwery, na których działają.",
  },
  highlights: [
    {
      tag: "01 / DISCOVER",
      title: "Zakres przed kodem",
      description:
        "Odkrywanie, spisany zakres i stała wycena, zanim powstanie pierwsza linia kodu.",
    },
    {
      tag: "02 / BUILD",
      title: "Zbudowane do utrzymania",
      description:
        "Modułowa architektura, czysty kod i testy, które przetrwają zmianę developera.",
    },
    {
      tag: "03 / OPERATE",
      title: "Przekazanie bez haczyków",
      description:
        "Kod, repozytoria i konta chmurowe należą do Ciebie od pierwszego dnia.",
    },
  ],
  servicesSection: {
    eyebrow: "Usługi",
    title: "Co budujemy",
    description:
      "Sześć praktyk, jeden zespół. Od systemów biznesowych po serwerownię.",
    consult: "Porozmawiaj o projekcie",
  },
  services: [
    {
      title: "Dedykowane oprogramowanie",
      description:
        "Oprogramowanie dopasowane do Twojego procesu, od automatyzacji po modułowe systemy ERP i CRM.",
      points: ["Integracje API i płatności", "Bezpieczna, modułowa architektura"],
    },
    {
      title: "Usługi Android WebView",
      description:
        "Zamieniamy stronę internetową w oficjalną aplikację Android gotową do publikacji w Google Play.",
      points: ["Gotowe do Play Store", "Realizacja w 1-2 dni"],
    },
    {
      title: "Nowoczesne strony firmowe",
      description:
        "Strony korporacyjne z SEO, szybkim działaniem i bezpośrednim kontaktem z zespołem sprzedaży.",
      points: ["Zoptymalizowane Core Web Vitals", "Dynamiczne schema i meta dane"],
    },
    {
      title: "Dedykowane aplikacje Android",
      description:
        "Natywne lub wieloplatformowe aplikacje Android ze stabilnym działaniem i synchronizacją offline.",
      points: ["MVVM / clean architecture", "Baza danych offline-first"],
    },
    {
      title: "Serwery i DevOps",
      description:
        "Konfiguracja, zabezpieczenie, optymalizacja i utrzymanie serwerów dla ciągłości biznesu.",
      points: ["Hardening i Fail2ban", "Nginx, reverse proxy i backup"],
    },
    {
      title: "Maintenance i SLA",
      description:
        "Monitoring, aktualizacje bezpieczeństwa, szyfrowane kopie i długoterminowe wsparcie.",
      points: ["Regularny monitoring", "Priorytetowa reakcja na awarie"],
    },
  ],
  products: {
    eyebrow: "Produkty",
    title: "Nasze własne produkty",
    description:
      "Obok pracy dla klientów projektujemy, wydajemy i utrzymujemy własne aplikacje i gry.",
    soon: "Wkrótce",
    visit: "Otwórz stronę",
    hub: "Wszystkie produkty na ngambeg.com",
    groups: {
      platforms: {
        label: "Platformy",
        brand: "dibumi.com",
        description:
          "Nasze własne produkty, budowane i utrzymywane przez ten sam zespół, który realizuje projekty klientów.",
      },
      ngambeg: {
        label: "Ngambeg Cyber Media",
        brand: "ngambeg.com",
        description:
          "Gry i codzienne narzędzia Android, tworzone i wydawane pod własną marką.",
      },
    },
    platforms: {
      aiGateway: {
        description:
          "Jeden klucz API, jeden portfel i katalog modeli dla twórców.",
      },
      paymentOrchestration: {
        description:
          "Jedno API do wszystkich bramek płatności: automatyczny routing, fallback, idempotencja i znormalizowane webhooki.",
      },
      adserverExchange: {
        description:
          "Kampanie, miejsca emisji, kreacje, reguły targetowania i dzienne statystyki w jednym serwerze reklam.",
      },
      cloudHostingBilling: {
        description:
          "Billing white-label i provisioning dla firm hostingowych: zamówienia, faktury, domeny i zgłoszenia.",
      },
      trafficAnalytics: {
        description: "Odwiedziny, źródła i lejki konwersji w jednym panelu.",
      },
    },
  },
  clients: {
    eyebrow: "Klienci",
    title: "Klienci, z którymi pracowaliśmy",
    description:
      "Zespoły i sieci, które wspieraliśmy w projektach software, mobile i infrastrukturalnych.",
  },
  workflow: {
    eyebrow: "Proces",
    title: "Uporządkowany proces pracy",
    description:
      "Przejrzysta metodyka Agile pozwala śledzić postęp projektu na każdym etapie.",
    steps: [
      {
        title: "Odkrywanie i wymagania",
        description:
          "Poznajemy procesy, użytkowników i potrzeby systemu, a następnie przygotowujemy jasny zakres prac.",
      },
      {
        title: "Projekt systemu i architektura",
        description:
          "Projektujemy bazę danych, API, UI/UX i specyfikację serwera z myślą o rozwoju.",
      },
      {
        title: "Development i jakość",
        description:
          "Każdy moduł powstaje zgodnie z zasadami clean code i przechodzi testy funkcjonalne, bezpieczeństwa i wydajności.",
      },
      {
        title: "Wdrożenie, szkolenie i gwarancja",
        description:
          "Uruchamiamy system, szkolimy zespół i zapewniamy okres gwarancyjny na poprawki błędów.",
      },
    ],
  },
  standards: {
    eyebrow: "Standardy",
    title: "Jak pracujemy",
    description:
      "Profesjonalne zobowiązania, których przestrzegamy w każdym projekcie.",
    items: [
      {
        title: "Umowa poufności (NDA)",
        description:
          "Chronimy pomysły biznesowe, dane klientów i logikę oprogramowania formalną umową NDA.",
      },
      {
        title: "Bezpieczeństwo od początku",
        description:
          "Projektujemy systemy tak, aby ograniczyć typowe ryzyka ataków i wycieku endpointów API.",
      },
      {
        title: "Czysty i łatwy w utrzymaniu kod",
        description:
          "Uporządkowany, modułowy i udokumentowany kod ułatwia dalszy rozwój.",
      },
    ],
    commitments: [
      {
        title: "Pełna własność",
        description:
          "Twoja firma otrzymuje kod, repozytorium, konta chmurowe i dostęp do bazy danych.",
      },
      {
        title: "Przejrzystość",
        description:
          "Zakres, harmonogram i koszty ustalamy z góry, bez ukrytych opłat.",
      },
      {
        title: "Stałe wsparcie",
        description:
          "Zapewniamy wsparcie techniczne po wdrożeniu oraz gwarancję na poprawki błędów.",
      },
    ],
  },
  contact: {
    title: "Zacznijmy budować Twój system",
    description:
      "Skontaktuj się z naszym zespołem technicznym w Lamongan, aby szybko omówić potrzeby projektu.",
    locationLabel: "Lokalizacja biura",
    location: companyAddress,
    locationNote: "Obsługujemy klientów w całej Indonezji",
    emailLabel: "Adres e-mail",
    emailHint: "Do briefów, dokumentów i dłuższych opisów.",
    hoursLabel: "Godziny pracy",
    hours: "Poniedziałek-sobota (08:30-20:00 WIB)",
    hoursNote: "Awaryjna obsługa serwerów 24/7 dla klientów SLA",
    whatsappHint: "Najszybsza droga. Bez formularza i bez kolejki.",
    whatsappMessage:
      "Dzień dobry, zespole dibumi.com Lamongan,\n\nChcę porozmawiać o potrzebach mojego projektu. Dziękuję!",
  },
  footer: {
    description:
      "Studio produkcji aplikacji i oprogramowania z Lamongan w Indonezji. Pomagamy zespołom dostarczać niezawodne oprogramowanie, aplikacje mobilne i infrastrukturę.",
    location: "Lamongan, Jawa Wschodnia, Indonezja",
    address: companyAddress,
    product: "Produkty",
    company: "Firma",
    contact: "Kontakt",
    legal: "Prawne",
    terms: "Regulamin",
    privacy: "Polityka prywatności",
    copyright: "Wszelkie prawa zastrzeżone.",
    builtFor: "Zbudowane w Lamongan, dostarczane na cały świat.",
    whatsapp: "Konsultacja WhatsApp",
    since: "Tworzymy od 2013",
  },
  legal: {
    updated: "Ostatnia aktualizacja",
    englishOnly: "Ten dokument jest dostępny w języku angielskim.",
  },
  metadata: {
    title: "dibumi.com | Studio produkcji aplikacji i oprogramowania w Lamongan",
    description:
      "Studio software w Lamongan w Indonezji: dedykowane oprogramowanie, aplikacje Android, strony firmowe i utrzymanie serwerów.",
  },
};

const dictionaries: Record<Locale, SiteContent> = { en, id, ar, zh, pl };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): SiteContent {
  return dictionaries[locale];
}

/** Direction teks per locale, dipakai di shell halaman. */
export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}
