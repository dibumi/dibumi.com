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
    cta: string;
    menu: string;
    closeMenu: string;
    language: string;
    soon: string;
    allProducts: string;
  };
  hero: {
    eyebrow: string;
    titleTop: string;
    titleAccent: string;
    titleBottom: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    chips: string[];
    panel: {
      eyebrow: string;
      requestTitle: string;
      requestSubtitle: string;
      requestMethod: string;
      requestPath: string;
      gatewayTitle: string;
      gatewaySubtitle: string;
      gatewayBadge: string;
      nodes: string[];
      responseLabel: string;
      responseNote: string;
      responseText: string;
      footnote: string[];
      pause: string;
      resume: string;
      pauseLabel: string;
      resumeLabel: string;
    };
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
    groups: Record<"aiParty" | "games" | "apps", ProductGroupCopy>;
  };
  clients: {
    eyebrow: string;
    title: string;
    description: string;
    names: string[];
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
    eyebrow: string;
    title: string;
    description: string;
    office: string;
    locationLabel: string;
    location: string;
    locationNote: string;
    emailLabel: string;
    hoursLabel: string;
    hours: string;
    hoursNote: string;
    ideaTitle: string;
    ideaDescription: string;
    whatsapp: string;
    whatsappMessage: string;
    form: {
      title: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      service: string;
      servicePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      successNote: string;
      error: string;
      required: string;
      services: string[];
    };
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
    cta: "Start a project",
    menu: "Open navigation",
    closeMenu: "Close navigation",
    language: "Language",
    soon: "Soon",
    allProducts: "All products",
  },
  hero: {
    eyebrow: "Software production studio in Lamongan",
    titleTop: "Big ideas.",
    titleAccent: "Meet your",
    titleBottom: "production studio.",
    description:
      "We design, build, and run custom software, Android apps, and the servers behind them. One studio from the first sketch to production.",
    primaryCta: "Start a project",
    secondaryCta: "View services",
    chips: ["Fixed scope", "Full code ownership", "24/7 SLA for servers"],
    panel: {
      eyebrow: "Your stack, simplified",
      requestTitle: "Your idea",
      requestSubtitle: "One studio. Every layer of the stack.",
      requestMethod: "SCOPE",
      requestPath: "/discovery → production",
      gatewayTitle: "dibumi studio",
      gatewaySubtitle: "Design, build, operate",
      gatewayBadge: "One team",
      nodes: ["Web app", "Android app", "Server"],
      responseLabel: "Delivery preview",
      responseNote: "Illustrated flow",
      responseText: "Shipped. Running. Yours.",
      footnote: ["One team", "One contract", "Full ownership"],
      pause: "Pause",
      resume: "Resume",
      pauseLabel: "Pause the process animation",
      resumeLabel: "Resume the process animation",
    },
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
    title: "Products we build and run",
    description:
      "Alongside client work, we design, ship, and maintain our own apps and games.",
    soon: "Soon",
    visit: "Open site",
    hub: "All products on ngambeg.com",
    groups: {
      aiParty: {
        label: "AI Party",
        brand: "AI Party",
        description:
          "An AI gateway: one API key, one wallet, and a catalogue of models for builders.",
      },
      games: {
        label: "Games",
        brand: "Ngambeg Cyber Media",
        description:
          "Offline-first Android games, built and published under our own label.",
      },
      apps: {
        label: "Apps",
        brand: "Ngambeg Cyber Media",
        description: "Everyday Android utilities, published on Google Play.",
      },
    },
  },
  clients: {
    eyebrow: "Clients",
    title: "Clients we have worked with",
    description:
      "Teams and networks we have supported across software, mobile, and infrastructure work.",
    names: [
      "UC Browser / UCWeb",
      "BuzzCity",
      "PropellerAds",
      "Zeedsharia",
      "Motmaina.com",
    ],
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
    eyebrow: "Contact",
    title: "Start building your system",
    description:
      "Contact our technical desk in Lamongan for a quick response and technical discovery.",
    office: "Office & technical desk",
    locationLabel: "Office location",
    location: companyAddress,
    locationNote: "Serving clients across Indonesia",
    emailLabel: "Correspondence email",
    hoursLabel: "Business hours",
    hours: "Monday-Saturday (08:30-20:00 WIB)",
    hoursNote: "24/7 emergency server service for SLA clients",
    ideaTitle: "Have a project in mind?",
    ideaDescription:
      "Tell us about your business challenge. Our technical team will help find a practical, secure, and scalable solution.",
    whatsapp: "Chat on WhatsApp",
    whatsappMessage:
      "Hello dibumi.com Lamongan team,\n\nI would like to discuss my project needs. Thank you!",
    form: {
      title: "Tell us about the project",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      service: "Service",
      servicePlaceholder: "Choose a service",
      message: "Project details",
      messagePlaceholder: "What are you building, and by when?",
      submit: "Send message",
      sending: "Sending…",
      success: "Message received",
      successNote: "We usually reply within one business day.",
      error: "Something went wrong. Please try again or email us directly.",
      required: "Please fill in your name, email, and message.",
      services: [
        "Custom Software Development",
        "Android WebView Services",
        "Modern Company Profiles",
        "Custom Android Apps",
        "Server & DevOps Management",
        "Maintenance & SLA",
      ],
    },
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
    cta: "Mulai proyek",
    menu: "Buka navigasi",
    closeMenu: "Tutup navigasi",
    language: "Bahasa",
    soon: "Segera",
    allProducts: "Semua produk",
  },
  hero: {
    eyebrow: "Studio produksi software di Lamongan",
    titleTop: "Ide besar.",
    titleAccent: "Kenali",
    titleBottom: "studio produksimu.",
    description:
      "Kami merancang, membangun, dan mengelola software kustom, aplikasi Android, serta server di belakangnya. Satu studio dari sketsa pertama sampai produksi.",
    primaryCta: "Mulai proyek",
    secondaryCta: "Lihat layanan",
    chips: ["Lingkup tetap", "Kode sepenuhnya milik Anda", "SLA server 24/7"],
    panel: {
      eyebrow: "Teknologi Anda, disederhanakan",
      requestTitle: "Ide Anda",
      requestSubtitle: "Satu studio. Semua lapisan teknologi.",
      requestMethod: "LINGKUP",
      requestPath: "/discovery → produksi",
      gatewayTitle: "dibumi studio",
      gatewaySubtitle: "Rancang, bangun, operasikan",
      gatewayBadge: "Satu tim",
      nodes: ["Web app", "Aplikasi Android", "Server"],
      responseLabel: "Pratinjau pengiriman",
      responseNote: "Ilustrasi alur",
      responseText: "Rilis. Berjalan. Milik Anda.",
      footnote: ["Satu tim", "Satu kontrak", "Kepemilikan penuh"],
      pause: "Jeda",
      resume: "Lanjut",
      pauseLabel: "Jeda animasi proses",
      resumeLabel: "Lanjutkan animasi proses",
    },
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
    title: "Produk yang kami bangun dan kelola",
    description:
      "Selain pekerjaan klien, kami merancang, merilis, dan merawat aplikasi serta game kami sendiri.",
    soon: "Segera",
    visit: "Buka situs",
    hub: "Semua produk di ngambeg.com",
    groups: {
      aiParty: {
        label: "AI Party",
        brand: "AI Party",
        description:
          "Gateway AI: satu API key, satu dompet, dan katalog model untuk para builder.",
      },
      games: {
        label: "Game",
        brand: "Ngambeg Cyber Media",
        description:
          "Game Android offline-first, dibangun dan diterbitkan dengan label kami sendiri.",
      },
      apps: {
        label: "Aplikasi",
        brand: "Ngambeg Cyber Media",
        description: "Utilitas Android sehari-hari, terbit di Google Play.",
      },
    },
  },
  clients: {
    eyebrow: "Klien",
    title: "Klien yang pernah bekerja sama",
    description:
      "Tim dan jaringan yang pernah kami dukung dalam pekerjaan software, mobile, dan infrastruktur.",
    names: [
      "UC Browser / UCWeb",
      "BuzzCity",
      "PropellerAds",
      "Zeedsharia",
      "Motmaina.com",
    ],
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
    eyebrow: "Kontak",
    title: "Mulai bangun sistem Anda",
    description:
      "Hubungi technical desk kami di Lamongan untuk respons cepat dan analisis kebutuhan teknis.",
    office: "Kantor & technical desk",
    locationLabel: "Domisili kantor",
    location: companyAddress,
    locationNote: "Melayani klien di seluruh Indonesia",
    emailLabel: "Email korespondensi",
    hoursLabel: "Jam operasional",
    hours: "Senin-Sabtu (08.30-20.00 WIB)",
    hoursNote: "Layanan darurat server aktif 24/7 bagi klien SLA",
    ideaTitle: "Punya kebutuhan proyek?",
    ideaDescription:
      "Ceritakan tantangan bisnis Anda. Tim teknis kami siap membantu menemukan solusi yang tepat, aman, dan bisa berkembang.",
    whatsapp: "Chat WhatsApp",
    whatsappMessage:
      "Halo tim dibumi.com Lamongan,\n\nSaya ingin berkonsultasi mengenai kebutuhan proyek. Terima kasih!",
    form: {
      title: "Ceritakan proyek Anda",
      name: "Nama",
      namePlaceholder: "Nama Anda",
      email: "Email",
      emailPlaceholder: "anda@perusahaan.com",
      service: "Layanan",
      servicePlaceholder: "Pilih layanan",
      message: "Detail proyek",
      messagePlaceholder: "Apa yang ingin dibangun, dan kapan targetnya?",
      submit: "Kirim pesan",
      sending: "Mengirim…",
      success: "Pesan diterima",
      successNote: "Kami biasanya membalas dalam satu hari kerja.",
      error: "Terjadi kesalahan. Coba lagi atau kirim email langsung.",
      required: "Mohon isi nama, email, dan pesan Anda.",
      services: [
        "Custom Software Development",
        "Jasa WebView Android",
        "Company Profile Modern",
        "Custom Android Apps",
        "Kelola Server & DevOps",
        "Maintenance & SLA",
      ],
    },
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
    cta: "ابدأ مشروعك",
    menu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
    language: "اللغة",
    soon: "قريباً",
    allProducts: "جميع المنتجات",
  },
  hero: {
    eyebrow: "استوديو إنتاج البرمجيات في لامونجان",
    titleTop: "أفكار كبيرة.",
    titleAccent: "تعرّف على",
    titleBottom: "استوديو الإنتاج.",
    description:
      "نصمم ونبني ونشغّل البرمجيات المخصصة وتطبيقات Android والخوادم التي تدعمها. استوديو واحد من أول رسم إلى الإنتاج.",
    primaryCta: "ابدأ مشروعاً",
    secondaryCta: "استكشف الخدمات",
    chips: ["نطاق ثابت", "ملكية كاملة للكود", "دعم خوادم 24/7"],
    panel: {
      eyebrow: "بنيتك التقنية، ببساطة",
      requestTitle: "فكرتك",
      requestSubtitle: "استوديو واحد. كل طبقات التقنية.",
      requestMethod: "النطاق",
      requestPath: "/الاستكشاف ← الإنتاج",
      gatewayTitle: "dibumi studio",
      gatewaySubtitle: "تصميم، بناء، تشغيل",
      gatewayBadge: "فريق واحد",
      nodes: ["تطبيق ويب", "تطبيق Android", "خادم"],
      responseLabel: "معاينة التسليم",
      responseNote: "مخطط توضيحي",
      responseText: "أُطلق. يعمل. ملكك.",
      footnote: ["فريق واحد", "عقد واحد", "ملكية كاملة"],
      pause: "إيقاف",
      resume: "متابعة",
      pauseLabel: "إيقاف حركة العملية",
      resumeLabel: "متابعة حركة العملية",
    },
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
    title: "منتجات نبنيها ونديرها",
    description:
      "إلى جانب أعمال العملاء، نصمم ونطلق ونصون تطبيقاتنا وألعابنا.",
    soon: "قريباً",
    visit: "افتح الموقع",
    hub: "جميع المنتجات على ngambeg.com",
    groups: {
      aiParty: {
        label: "AI Party",
        brand: "AI Party",
        description:
          "بوابة ذكاء اصطناعي: مفتاح API واحد ومحفظة واحدة وكتالوج من النماذج للمطورين.",
      },
      games: {
        label: "الألعاب",
        brand: "Ngambeg Cyber Media",
        description:
          "ألعاب Android تعمل دون اتصال، نطورها وننشرها بعلامتنا الخاصة.",
      },
      apps: {
        label: "التطبيقات",
        brand: "Ngambeg Cyber Media",
        description: "أدوات Android يومية منشورة على Google Play.",
      },
    },
  },
  clients: {
    eyebrow: "العملاء",
    title: "عملاء تعاملنا معهم",
    description:
      "فرق وشبكات دعمناها في أعمال البرمجيات والجوال والبنية التحتية.",
    names: [
      "UC Browser / UCWeb",
      "BuzzCity",
      "PropellerAds",
      "Zeedsharia",
      "Motmaina.com",
    ],
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
    eyebrow: "تواصل",
    title: "ابدأ بناء نظامك",
    description:
      "تواصل مع مكتبنا التقني في لامونجان للحصول على رد سريع وتحليل تقني.",
    office: "المكتب والمكتب التقني",
    locationLabel: "موقع المكتب",
    location: companyAddress,
    locationNote: "نخدم العملاء في جميع أنحاء إندونيسيا",
    emailLabel: "البريد الإلكتروني",
    hoursLabel: "ساعات العمل",
    hours: "الإثنين-السبت (08:30-20:00 WIB)",
    hoursNote: "خدمة طوارئ الخوادم متاحة 24/7 لعملاء SLA",
    ideaTitle: "لديك مشروع؟",
    ideaDescription:
      "شاركنا تحدي عملك. سيساعدك فريقنا التقني في إيجاد حل عملي وآمن وقابل للتوسع.",
    whatsapp: "تحدث عبر WhatsApp",
    whatsappMessage:
      "مرحباً فريق dibumi.com في لامونجان،\n\nأرغب في مناقشة احتياجات مشروعي. شكراً!",
    form: {
      title: "أخبرنا عن مشروعك",
      name: "الاسم",
      namePlaceholder: "اسمك",
      email: "البريد الإلكتروني",
      emailPlaceholder: "you@company.com",
      service: "الخدمة",
      servicePlaceholder: "اختر خدمة",
      message: "تفاصيل المشروع",
      messagePlaceholder: "ماذا تبني، ومتى تحتاجه؟",
      submit: "أرسل الرسالة",
      sending: "جارٍ الإرسال…",
      success: "تم استلام الرسالة",
      successNote: "نرد عادة خلال يوم عمل واحد.",
      error: "حدث خطأ. حاول مرة أخرى أو راسلنا مباشرة.",
      required: "يرجى إدخال الاسم والبريد والرسالة.",
      services: [
        "تطوير برمجيات مخصصة",
        "خدمات Android WebView",
        "موقع شركة عصري",
        "تطبيقات Android مخصصة",
        "إدارة الخوادم وDevOps",
        "الصيانة وSLA",
      ],
    },
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
    cta: "开始项目",
    menu: "打开菜单",
    closeMenu: "关闭菜单",
    language: "语言",
    soon: "即将上线",
    allProducts: "全部产品",
  },
  hero: {
    eyebrow: "位于拉蒙岸的软件生产工作室",
    titleTop: "大想法。",
    titleAccent: "交给",
    titleBottom: "生产工作室。",
    description:
      "我们设计、构建并运维定制软件、Android 应用以及背后的服务器。从第一张草图到正式上线，一个工作室全部搞定。",
    primaryCta: "开始项目",
    secondaryCta: "查看服务",
    chips: ["范围固定", "代码完全归属你", "服务器 24/7 SLA"],
    panel: {
      eyebrow: "你的技术栈，更简单",
      requestTitle: "你的想法",
      requestSubtitle: "一个工作室，覆盖全部技术层。",
      requestMethod: "范围",
      requestPath: "/需求发现 → 生产环境",
      gatewayTitle: "dibumi studio",
      gatewaySubtitle: "设计、构建、运维",
      gatewayBadge: "一个团队",
      nodes: ["Web 应用", "Android 应用", "服务器"],
      responseLabel: "交付预览",
      responseNote: "流程示意",
      responseText: "已上线。运行中。归你所有。",
      footnote: ["一个团队", "一份合同", "完全所有权"],
      pause: "暂停",
      resume: "继续",
      pauseLabel: "暂停流程动画",
      resumeLabel: "继续流程动画",
    },
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
    title: "我们自研并运营的产品",
    description: "在客户项目之外，我们设计、发布并维护自己的应用与游戏。",
    soon: "即将上线",
    visit: "打开网站",
    hub: "ngambeg.com 上的全部产品",
    groups: {
      aiParty: {
        label: "AI Party",
        brand: "AI Party",
        description:
          "AI 网关：一个 API Key、一个钱包，以及面向开发者的模型目录。",
      },
      games: {
        label: "游戏",
        brand: "Ngambeg Cyber Media",
        description: "离线优先的 Android 游戏，由我们自有品牌开发与发行。",
      },
      apps: {
        label: "应用",
        brand: "Ngambeg Cyber Media",
        description: "日常 Android 工具，已发布到 Google Play。",
      },
    },
  },
  clients: {
    eyebrow: "客户",
    title: "合作过的客户",
    description: "我们在软件、移动端和基础设施项目中支持过的团队与网络。",
    names: [
      "UC Browser / UCWeb",
      "BuzzCity",
      "PropellerAds",
      "Zeedsharia",
      "Motmaina.com",
    ],
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
    eyebrow: "联系",
    title: "开始构建您的系统",
    description:
      "联系我们位于拉蒙岸的技术团队，快速获得响应和技术需求分析。",
    office: "办公室与技术团队",
    locationLabel: "办公地点",
    location: companyAddress,
    locationNote: "服务印度尼西亚各地客户",
    emailLabel: "联系邮箱",
    hoursLabel: "工作时间",
    hours: "周一至周六（08:30-20:00 WIB）",
    hoursNote: "SLA 客户享有 24/7 服务器紧急服务",
    ideaTitle: "有项目需求？",
    ideaDescription:
      "告诉我们您的业务挑战。我们的技术团队将帮助您找到实用、安全且可扩展的方案。",
    whatsapp: "通过 WhatsApp 联系",
    whatsappMessage: "您好，dibumi.com 拉蒙岸团队：\n\n我想咨询项目需求。谢谢！",
    form: {
      title: "介绍你的项目",
      name: "姓名",
      namePlaceholder: "你的姓名",
      email: "邮箱",
      emailPlaceholder: "you@company.com",
      service: "服务",
      servicePlaceholder: "选择服务",
      message: "项目详情",
      messagePlaceholder: "你要构建什么？希望何时上线？",
      submit: "发送消息",
      sending: "发送中…",
      success: "已收到消息",
      successNote: "我们通常在一个工作日内回复。",
      error: "出现问题，请重试或直接发邮件。",
      required: "请填写姓名、邮箱和项目详情。",
      services: [
        "定制软件开发",
        "Android WebView 服务",
        "现代企业官网",
        "定制 Android 应用",
        "服务器与 DevOps 管理",
        "维护与 SLA",
      ],
    },
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
    cta: "Rozpocznij projekt",
    menu: "Otwórz nawigację",
    closeMenu: "Zamknij nawigację",
    language: "Język",
    soon: "Wkrótce",
    allProducts: "Wszystkie produkty",
  },
  hero: {
    eyebrow: "Studio produkcji oprogramowania w Lamongan",
    titleTop: "Duże pomysły.",
    titleAccent: "Poznaj swoje",
    titleBottom: "studio produkcji.",
    description:
      "Projektujemy, budujemy i utrzymujemy dedykowane oprogramowanie, aplikacje Android oraz serwery, na których działają. Jedno studio od pierwszego szkicu po produkcję.",
    primaryCta: "Rozpocznij projekt",
    secondaryCta: "Zobacz usługi",
    chips: ["Stały zakres", "Pełna własność kodu", "SLA serwerów 24/7"],
    panel: {
      eyebrow: "Twój stack, prościej",
      requestTitle: "Twój pomysł",
      requestSubtitle: "Jedno studio. Każda warstwa technologii.",
      requestMethod: "ZAKRES",
      requestPath: "/odkrywanie → produkcja",
      gatewayTitle: "dibumi studio",
      gatewaySubtitle: "Projekt, budowa, utrzymanie",
      gatewayBadge: "Jeden zespół",
      nodes: ["Aplikasi web", "Aplikasi Android", "Serwer"],
      responseLabel: "Podgląd dostawy",
      responseNote: "Schemat poglądowy",
      responseText: "Wdrożone. Działa. Twoje.",
      footnote: ["Jeden zespół", "Jedna umowa", "Pełna własność"],
      pause: "Pauza",
      resume: "Wznów",
      pauseLabel: "Zatrzymaj animację procesu",
      resumeLabel: "Wznów animację procesu",
    },
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
    title: "Produkty, które budujemy i prowadzimy",
    description:
      "Obok pracy dla klientów projektujemy, wydajemy i utrzymujemy własne aplikacje i gry.",
    soon: "Wkrótce",
    visit: "Otwórz stronę",
    hub: "Wszystkie produkty na ngambeg.com",
    groups: {
      aiParty: {
        label: "AI Party",
        brand: "AI Party",
        description:
          "Brama AI: jeden klucz API, jeden portfel i katalog modeli dla twórców.",
      },
      games: {
        label: "Gry",
        brand: "Ngambeg Cyber Media",
        description:
          "Gry Android działające offline, tworzone i wydawane pod własną marką.",
      },
      apps: {
        label: "Aplikacje",
        brand: "Ngambeg Cyber Media",
        description: "Codzienne narzędzia Android opublikowane w Google Play.",
      },
    },
  },
  clients: {
    eyebrow: "Klienci",
    title: "Klienci, z którymi pracowaliśmy",
    description:
      "Zespoły i sieci, które wspieraliśmy w projektach software, mobile i infrastrukturalnych.",
    names: [
      "UC Browser / UCWeb",
      "BuzzCity",
      "PropellerAds",
      "Zeedsharia",
      "Motmaina.com",
    ],
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
    eyebrow: "Kontakt",
    title: "Zacznijmy budować Twój system",
    description:
      "Skontaktuj się z naszym zespołem technicznym w Lamongan, aby szybko omówić potrzeby projektu.",
    office: "Biuro i zespół techniczny",
    locationLabel: "Lokalizacja biura",
    location: companyAddress,
    locationNote: "Obsługujemy klientów w całej Indonezji",
    emailLabel: "Adres e-mail",
    hoursLabel: "Godziny pracy",
    hours: "Poniedziałek-sobota (08:30-20:00 WIB)",
    hoursNote: "Awaryjna obsługa serwerów 24/7 dla klientów SLA",
    ideaTitle: "Masz pomysł na projekt?",
    ideaDescription:
      "Opowiedz nam o wyzwaniu biznesowym. Pomożemy znaleźć praktyczne, bezpieczne i skalowalne rozwiązanie.",
    whatsapp: "Napisz na WhatsApp",
    whatsappMessage:
      "Dzień dobry, zespole dibumi.com Lamongan,\n\nChcę porozmawiać o potrzebach mojego projektu. Dziękuję!",
    form: {
      title: "Opowiedz o projekcie",
      name: "Imię i nazwisko",
      namePlaceholder: "Twoje imię",
      email: "E-mail",
      emailPlaceholder: "ty@firma.pl",
      service: "Usługa",
      servicePlaceholder: "Wybierz usługę",
      message: "Szczegóły projektu",
      messagePlaceholder: "Co budujesz i na kiedy?",
      submit: "Wyślij wiadomość",
      sending: "Wysyłanie…",
      success: "Wiadomość otrzymana",
      successNote: "Zwykle odpowiadamy w ciągu jednego dnia roboczego.",
      error: "Coś poszło nie tak. Spróbuj ponownie lub napisz e-mail.",
      required: "Uzupełnij imię, e-mail i treść wiadomości.",
      services: [
        "Dedykowane oprogramowanie",
        "Usługi Android WebView",
        "Nowoczesne strony firmowe",
        "Dedykowane aplikacje Android",
        "Serwery i DevOps",
        "Maintenance i SLA",
      ],
    },
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
