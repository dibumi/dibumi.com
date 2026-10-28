import type { ServiceSlug } from "@/lib/services";

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
    /** Nama aksesibel landmark navigasi. Bukan teks yang terlihat,
        tapi tetap dibacakan mesin baca layar, jadi harus ikut bahasa
        halaman. */
    mainLabel: string;
    mobileLabel: string;
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
  common: {
    /** Tautan lewati navigasi, terlihat hanya saat difokus. */
    skipToContent: string;
    learnMore: string;
  };
  hero: {
    titleLead: string;
    titleAccent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    /**
     * Baris kredensial di bawah tombol: kota/provinsi dan tahun berdiri.
     *
     * Sengaja mengulang `footer.location` dalam bentuk pendek (tanpa negara)
     * karena baris ini harus muat satu baris di 390px, sementara footer menyebut
     * "Indonesia" lengkap. Ditulis utuh per locale, termasuk pemisah `·`, supaya
     * urutan dan arah bacanya diatur penerjemah, bukan komponen.
     */
    established: string;
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
  highlightsSection: {
    eyebrow: string;
    title: string;
  };
  highlights: { tag: string; title: string; description: string }[];
  servicesSection: {
    eyebrow: string;
    title: string;
    description: string;
    consult: string;
    /** Label kotak tengah diagram di pita gelap. */
    oneTeam: string;
    /** Keterangan satu baris di bawah label itu. */
    oneTeamNote: string;
    /** Tiga keluaran model kerja kami. */
    outputs: string[];
    /**
     * Layanan yang sudah tidak ditawarkan.
     *
     * Dirender redup di ujung daftar, tanpa nomor, tanpa bullet, dan tanpa CTA,
     * supaya diagram "praktik yang masuk ke satu tim" tetap jujur dan mega menu
     * navbar tetap hanya berisi yang bisa dibeli. Tiap entri membawa
     * keterangannya sendiri supaya status tiap praktik bisa berbeda tanpa
     * mengubah komponen; hari ini keduanya berstatus tidak ditawarkan lagi.
     */
    retired: { title: string; note: string; description: string }[];
  };
  services: { title: string; description: string }[];
  /**
   * Label bersama halaman detail layanan. Judul dan deskripsi tetap tinggal di
   * `services` supaya beranda dan mega menu tidak punya dua sumber; yang khas
   * halaman detail ada di sini.
   */
  servicePage: {
    included: string;
    approach: string;
    related: string;
    /** Judul blok alur mekanisme di halaman detail layanan. */
    flow: string;
  };
  /**
   * Isi panjang per layanan untuk halaman `/[locale]/services/[slug]`.
   *
   * Kuncinya slug dari lib/services.ts, jadi urutan `services` tidak lagi
   * menentukan — dua array itu boleh bergeser tanpa memutus halaman.
   *
   * `flow` adalah tiga node alur mekanisme layanan: apa yang dipetakan, apa
   * yang dibangun, dan apa yang diserahkan. Selalu tiga, bukan daftar bebas,
   * karena diagramnya satu baris; node keempat akan memaksa bentuk baru.
   */
  servicePages: Record<
    ServiceSlug,
    { intro: string; included: string[]; flow: [string, string, string] }
  >;
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
      | "trafficAnalytics"
      | "selfHostedOnlineStore",
      { description: string; intro: string; points: string[] }
    >;
    catalog: {
      heading: string;
      games: string;
      apps: string;
      /** Satu baris di bawah label tile katalog halaman Ngambeg. */
      gamesNote: string;
      appsNote: string;
    };
    /**
     * Label bersama halaman detail produk. Deskripsi dan intro per produk
     * tinggal di `platforms` supaya menu dan halaman tidak punya dua sumber.
     */
    page: {
      included: string;
      related: string;
      discuss: string;
      /** Tautan balik ke daftar produk di beranda. */
      all: string;
      /** Ditampilkan di bawah deskripsi produk yang belum terbit. */
      statusNote: string;
    };
  };
  clients: {
    eyebrow: string;
    /** Label overline di atas strip logo, di bawah hero. */
    marqueeLabel: string;
    /** Kontrol jeda strip logo (WCAG 2.2.2). Menyebut aksinya, bukan keadaannya. */
    marqueePause: string;
    marqueeResume: string;
    title: string;
    description: string;
    /** Label pengganti kode ISO untuk merek yang tidak terikat yurisdiksi. */
    global: string;
    /**
     * Sel penutup dinding logo. Ini bukan nama klien, jadi diterjemahkan.
     * `otherNote` memuat angka 100+ yang sama dengan angka di pita kiri
     * (`Clients.tsx`), jadi keduanya harus diubah bersamaan.
     */
    other: string;
    otherNote: string;
    /** Label untuk tiga angka di pita klien. */
    facts: {
      clients: string;
      countries: string;
      since: string;
    };
  };
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    /** Label CTA section Process; tujuannya section Standards. */
    ctaLabel: string;
    steps: { title: string; description: string }[];
  };
  standards: {
    eyebrow: string;
    title: string;
    description: string;
    /** Label CTA section Standards; tujuannya section Contact. */
    ctaLabel: string;
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
    location: string;
    product: string;
    company: string;
    contact: string;
    legal: string;
    terms: string;
    privacy: string;
    copyright: string;
    since: string;
  };
  legal: {
    updated: string;
    englishOnly: string;
  };
  metadata: { title: string; description: string };
};

const en: SiteContent = {
  common: {
    skipToContent: "Skip to content",
    learnMore: "Learn more",
  },
  nav: {
    mainLabel: "Main navigation",
    mobileLabel: "Mobile navigation",
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
    established: "Lamongan, East Java · Since 2013",
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
  highlightsSection: {
    eyebrow: "Delivery",
    title: "From first scope to full ownership",
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
      "Seven practices, one team. From core business systems to the server room.",
    consult: "Discuss a project",
    oneTeam: "One team",
    oneTeamNote:
      "The code, the servers, and the guarantee ship together, from the same people.",
    outputs: ["Code", "Infrastructure", "SLA"],
    retired: [
      {
        title: "Digital Marketing",
        note: "No longer offered",
        description:
          "Campaigns, social media, and paid search we ran for clients in the studio's early years.",
      },
      {
        title: "Cyber Security (Red Team & Blue Team)",
        note: "No longer offered",
        description:
          "Red team testing of web apps, APIs, and servers, and blue team hardening, monitoring, and incident response, reported with fix priorities.",
      },
    ],
  },
  services: [
    {
      title: "Custom Software Development",
      description:
        "Custom software for your workflow, from internal automation to modular ERP and CRM platforms.",
    },
    {
      title: "Custom Web Development",
      description:
        "Web applications built around your workflow: dashboards, portals, and integrations that fit the systems you already run.",
    },
    {
      title: "Custom Mobile Apps Development",
      description:
        "Android and iOS apps, native or cross-platform, with offline sync and a release build ready for the store.",
    },
    {
      title: "Custom Games Development",
      description:
        "Games designed for phones and the web, built to ship, publish, and keep running after launch.",
    },
    {
      title: "Modern Company Profiles",
      description:
        "Corporate websites with on-page SEO, fast performance, and direct sales team connections.",
    },
    {
      title: "Server & DevOps Management",
      description:
        "Server setup, hardening, tuning, and maintenance to protect your business uptime.",
    },
    {
      title: "Maintenance & SLA",
      description:
        "Monitoring, security patches, encrypted backups, and long-term support, including updates and upgrades for legacy code.",
    },
  ],
  servicePage: {
    included: "What's included",
    approach: "How it runs",
    related: "Other services",
    flow: "Service flow",
  },
  servicePages: {
    "custom-software": {
      intro:
        "For work that no off-the-shelf product fits: internal tools, ERP and CRM modules, and the integrations that connect them. We scope it, build it, and hand over the code.",
      included: [
        "Process mapping before the first line of code",
        "Modular architecture with tests",
        "API and payment gateway integration",
        "Source code and documentation handed over",
      ],
      flow: [
        "Process mapped",
        "Modules and integrations",
        "Code handed over",
      ],
    },
    "custom-web-development": {
      intro:
        "Web applications that follow your workflow instead of the other way around: dashboards, customer portals, and admin tools that talk to the systems you already run.",
      included: [
        "Laravel or Next.js, API-first",
        "Authentication, roles, and audit trails",
        "Integration with existing services",
        "Deployment on infrastructure we also maintain",
      ],
      flow: [
        "Workflow mapped",
        "API, roles, audit trail",
        "Deployed and monitored",
      ],
    },
    "custom-mobile-apps": {
      intro:
        "When the work needs the device: Android and iOS apps, native or cross-platform, plus a WebView build when the product already lives on the web and a second codebase is not worth it.",
      included: [
        "Native or cross-platform, one codebase where it fits",
        "Offline-first storage and background sync",
        "Push, deep links, and store-ready builds",
        "Play Store and App Store release, signed and handed over",
      ],
      flow: [
        "Native or WebView",
        "Offline sync",
        "Store release",
      ],
    },
    "custom-games": {
      intro:
        "Games built to ship: the loop, the build, and the store listing handled by one team. We design for phones and the web, publish, and hand over the source and the assets.",
      included: [
        "Game design and the core loop before production",
        "Mobile and web builds",
        "Store listing, signing, and release",
        "Source code and art assets handed over",
      ],
      flow: [
        "Core loop designed",
        "Phone and web builds",
        "Published and handed over",
      ],
    },
    "company-profile": {
      intro:
        "A company site that loads fast, reads clearly, and gives the sales team somewhere to send people. Built for search from the first commit, not patched afterwards.",
      included: [
        "On-page SEO and Core Web Vitals",
        "Dynamic schema and metadata",
        "Contact and WhatsApp routing",
        "Editing guidance for your team",
      ],
      flow: [
        "Content and structure",
        "SEO and performance",
        "Release and editing guide",
      ],
    },
    "server-devops": {
      intro:
        "Servers set up to be boring: hardened, monitored, backed up, and documented, so the next incident is a log line rather than an outage.",
      included: [
        "Hardening and Fail2ban",
        "Nginx, reverse proxy, and TLS",
        "Encrypted off-site backups",
        "Runbook and access handover",
      ],
      flow: [
        "Audit and hardening",
        "Proxy, TLS, backups",
        "Runbook and access",
      ],
    },
    "maintenance-sla": {
      intro:
        "After launch, someone has to watch it. We monitor, patch, and answer, with a response time agreed in writing before the first ticket, including updating and upgrading legacy code that no longer gets patches on its own.",
      included: [
        "Uptime and error monitoring",
        "Security patches, dependency and framework upgrades",
        "Legacy code audit and phased migration",
        "Priority incident response, with restore drills on backups",
      ],
      flow: [
        "Monitoring",
        "Patches and upgrades",
        "SLA escalation",
      ],
    },
  },
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
        intro:
          "One endpoint in front of many model providers: one key, one wallet, and per-model routing, so a small team can switch providers without rewriting its code.",
        points: [
          "One API key for every model",
          "Per-model quota and wallet",
          "Provider fallback when one is down",
          "Usage logs per project",
        ],
      },
      paymentOrchestration: {
        description:
          "One API for every payment gateway: automatic routing, fallback, idempotency, and normalized webhooks.",
        intro:
          "One integration for every payment gateway. Routing, fallback, and idempotency are handled in the middle, so a declining provider does not become a lost order.",
        points: [
          "One API across multiple gateways",
          "Automatic routing and fallback",
          "Idempotent charges and webhooks",
          "Normalized events to your app",
        ],
      },
      adserverExchange: {
        description:
          "Campaigns, placements, creatives, targeting rules, and daily stats in a single ad server.",
        intro:
          "A self-hosted ad server for direct campaigns: placements, creatives, targeting rules, and daily stats in one place instead of a spreadsheet and a script.",
        points: [
          "Campaigns, placements, and creatives",
          "Targeting rules per placement",
          "Daily impressions and clicks",
          "Self-hosted, data stays with you",
        ],
      },
      cloudHostingBilling: {
        description:
          "White-label billing and provisioning for hosting businesses: orders, invoices, domains, tickets.",
        intro:
          "Billing and provisioning for hosting businesses: orders, invoices, domains, and tickets in one panel, so a new customer no longer needs four manual steps.",
        points: [
          "Orders and invoices",
          "Domain and service provisioning",
          "Client area and support tickets",
          "White-label under your own brand",
        ],
      },
      trafficAnalytics: {
        description:
          "Visits, referrers, and conversion funnels in a single dashboard.",
        intro:
          "Visits, referrers, and conversion funnels in one dashboard, hosted on your own server so the numbers never leave the infrastructure you control.",
        points: [
          "Visits and referrers",
          "Funnel and conversion tracking",
          "Per-page and per-campaign views",
          "Self-hosted on your own server",
        ],
      },
      selfHostedOnlineStore: {
        description:
          "A storefront you install and own: catalogue, cart, checkout, and orders on your own server.",
        intro:
          "A storefront you install and own: catalogue, cart, checkout, and orders on your own server, with the code and the customer data in your hands.",
        points: [
          "Catalogue and cart",
          "Checkout and order management",
          "Installable on your own server",
          "Data and code stay with you",
        ],
      },
    },
    catalog: {
      heading: "Games & Apps",
      games: "Games",
      apps: "Apps",
      gamesNote: "Games for phones, built and published in-house.",
      appsNote: "Everyday Android utilities with a small footprint.",
    },
    page: {
      included: "What it does",
      related: "Other products",
      discuss: "Discuss this product",
      all: "All products",
      statusNote: "In development — no release date yet.",
    },
  },
  clients: {
    eyebrow: "Clients",
    marqueeLabel: "Trusted by teams at",
    marqueePause: "Pause logo movement",
    marqueeResume: "Resume logo movement",
    title: "Clients we have worked with",
    description:
      "Teams and networks we have supported across software, mobile, and infrastructure work.",
    global: "Global",
    other: "Other",
    otherNote: "and 100+ more",
    facts: {
      clients: "Clients",
      countries: "Countries",
      since: "Since",
    },
  },
  workflow: {
    eyebrow: "Process",
    title: "A structured way of working",
    description:
      "A transparent agile process lets you follow project progress at every stage.",
    ctaLabel: "See our standards",
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
    ctaLabel: "Talk to us",
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
    emailLabel: "Email us",
    emailHint: "For briefs, documents, and anything long.",
    hoursLabel: "Business hours",
    hours: "Monday-Saturday (08:30-20:00 WIB)",
    hoursNote: "24/7 emergency server service for SLA clients",
    whatsappHint: "The fastest route. No form, no queue.",
    whatsappMessage:
      "Hello dibumi.com Lamongan team,\n\nI would like to discuss my project needs. Thank you!",
  },
  footer: {
    location: "Lamongan, East Java, Indonesia",
    product: "Product",
    company: "Company",
    contact: "Contact",
    legal: "Legal",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    copyright: "All rights reserved.",
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
  common: {
    skipToContent: "Lompat ke konten",
    learnMore: "Pelajari lebih lanjut",
  },
  nav: {
    mainLabel: "Navigasi utama",
    mobileLabel: "Navigasi seluler",
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
    established: "Lamongan, Jawa Timur · Sejak 2013",
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
  highlightsSection: {
    eyebrow: "Pengerjaan",
    title: "Dari lingkup pertama sampai sepenuhnya milik Anda",
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
      "Tujuh praktik, satu tim. Dari sistem inti bisnis sampai ruang server.",
    consult: "Konsultasikan",
    oneTeam: "Satu tim",
    oneTeamNote:
      "Kode, server, dan jaminan dikirim bersama, dari orang yang sama.",
    outputs: ["Kode", "Infrastruktur", "SLA"],
    retired: [
      {
        title: "Digital Marketing",
        note: "Tidak tersedia lagi",
        description:
          "Kampanye, media sosial, dan iklan berbayar yang kami jalankan untuk klien pada tahun-tahun awal studio.",
      },
      {
        title: "Cyber Security (Red Team & Blue Team)",
        note: "Tidak tersedia lagi",
        description:
          "Uji red team pada aplikasi web, API, dan server, serta hardening, monitoring, dan penanganan insiden dari sisi blue team, dilaporkan dengan prioritas perbaikan.",
      },
    ],
  },
  services: [
    {
      title: "Custom Software Development",
      description:
        "Perangkat lunak kustom sesuai workflow bisnis Anda, dari automasi internal hingga ERP dan CRM modular.",
    },
    {
      title: "Custom Web Development",
      description:
        "Aplikasi web yang dibangun mengikuti alur kerja Anda: dasbor, portal, dan integrasi yang menyambung ke sistem yang sudah berjalan.",
    },
    {
      title: "Custom Mobile Apps Development",
      description:
        "Aplikasi Android dan iOS, native atau cross-platform, dengan sinkronisasi offline dan build rilis yang siap masuk ke toko aplikasi.",
    },
    {
      title: "Custom Games Development",
      description:
        "Game untuk ponsel dan web, dirancang untuk rilis, terbit di toko, dan tetap berjalan setelah peluncuran.",
    },
    {
      title: "Company Profile Modern",
      description:
        "Website profil korporat dengan SEO on-page, performa cepat, dan koneksi langsung ke tim sales.",
    },
    {
      title: "Kelola Server & DevOps",
      description:
        "Setup, hardening, tuning, dan pemeliharaan server untuk menjaga uptime bisnis Anda.",
    },
    {
      title: "Maintenance & SLA",
      description:
        "Monitoring, security update, backup terenkripsi, dan pendampingan teknis jangka panjang, termasuk pembaruan dan peningkatan kode legacy.",
    },
  ],
  servicePage: {
    included: "Yang termasuk",
    approach: "Cara kerjanya",
    related: "Layanan lain",
    flow: "Alur layanan",
  },
  servicePages: {
    "custom-software": {
      intro:
        "Untuk pekerjaan yang tidak cocok dengan produk jadi: alat internal, modul ERP dan CRM, serta integrasi yang menyambungkannya. Kami susun lingkupnya, bangun, lalu serahkan kodenya.",
      included: [
        "Pemetaan proses sebelum baris kode pertama",
        "Arsitektur modular dengan pengujian",
        "Integrasi API dan payment gateway",
        "Kode sumber dan dokumentasi diserahkan",
      ],
      flow: [
        "Pemetaan proses",
        "Modul dan integrasi",
        "Serah terima kode",
      ],
    },
    "custom-web-development": {
      intro:
        "Aplikasi web yang mengikuti alur kerja Anda, bukan sebaliknya: dasbor, portal pelanggan, dan alat admin yang terhubung ke sistem yang sudah berjalan.",
      included: [
        "Laravel atau Next.js, API-first",
        "Autentikasi, peran, dan jejak audit",
        "Integrasi dengan layanan yang sudah ada",
        "Deploy di infrastruktur yang kami rawat juga",
      ],
      flow: [
        "Alur kerja dipetakan",
        "API, peran, audit",
        "Deploy dan dipantau",
      ],
    },
    "custom-mobile-apps": {
      intro:
        "Saat pekerjaan memang butuh perangkatnya: aplikasi Android dan iOS, native atau cross-platform, plus build WebView kalau produknya sudah hidup di web dan codebase kedua tidak sepadan untuk dirawat.",
      included: [
        "Native atau cross-platform, satu codebase bila cocok",
        "Penyimpanan offline-first dan sinkronisasi latar",
        "Push, deep link, dan build siap rilis",
        "Rilis ke Play Store dan App Store, ditandatangani dan diserahkan",
      ],
      flow: [
        "Native atau WebView",
        "Sinkronisasi offline",
        "Rilis ke toko",
      ],
    },
    "custom-games": {
      intro:
        "Game yang dibangun sampai rilis: loop, build, dan listing di toko dikerjakan satu tim. Kami rancang untuk ponsel dan web, terbitkan, lalu serahkan kode sumber dan asetnya.",
      included: [
        "Desain game dan core loop sebelum produksi",
        "Build untuk ponsel dan web",
        "Listing di toko, signing, dan rilis",
        "Kode sumber dan aset seni diserahkan",
      ],
      flow: [
        "Desain loop inti",
        "Build ponsel dan web",
        "Rilis dan serah aset",
      ],
    },
    "company-profile": {
      intro:
        "Situs perusahaan yang cepat dimuat, jelas dibaca, dan memberi tim sales tempat untuk mengarahkan orang. Disiapkan untuk mesin pencari sejak commit pertama, bukan ditambal belakangan.",
      included: [
        "SEO on-page dan Core Web Vitals",
        "Schema dan metadata dinamis",
        "Rute kontak dan WhatsApp",
        "Panduan penyuntingan untuk tim Anda",
      ],
      flow: [
        "Konten dan struktur",
        "SEO dan performa",
        "Rilis dan panduan edit",
      ],
    },
    "server-devops": {
      intro:
        "Server yang disiapkan supaya membosankan: di-hardening, dipantau, di-backup, dan didokumentasikan, sehingga insiden berikutnya jadi satu baris log, bukan outage.",
      included: [
        "Hardening dan Fail2ban",
        "Nginx, reverse proxy, dan TLS",
        "Backup terenkripsi di luar server",
        "Runbook dan serah terima akses",
      ],
      flow: [
        "Audit dan hardening",
        "Proksi, TLS, backup",
        "Runbook dan akses",
      ],
    },
    "maintenance-sla": {
      intro:
        "Setelah rilis, harus ada yang mengawasi. Kami memantau, menambal, dan menjawab, dengan waktu respons yang disepakati tertulis sebelum tiket pertama, termasuk pembaruan dan peningkatan kode legacy yang tidak lagi mendapat patch sendiri.",
      included: [
        "Monitoring uptime dan error",
        "Patch keamanan, pembaruan dependensi dan framework",
        "Audit kode legacy dan migrasi bertahap",
        "Respons insiden prioritas, dengan uji restore dari backup",
      ],
      flow: [
        "Pemantauan",
        "Patch dan upgrade",
        "Eskalasi SLA",
      ],
    },
  },
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
        intro:
          "Satu endpoint di depan banyak penyedia model: satu key, satu dompet, dan routing per model, supaya tim kecil bisa berganti penyedia tanpa menulis ulang kodenya.",
        points: [
          "Satu API key untuk semua model",
          "Kuota dan dompet per model",
          "Fallback penyedia saat salah satunya mati",
          "Log pemakaian per proyek",
        ],
      },
      paymentOrchestration: {
        description:
          "Satu API untuk semua payment gateway: routing otomatis, fallback, idempotency, dan webhook ternormalisasi.",
        intro:
          "Satu integrasi untuk semua payment gateway. Routing, fallback, dan idempotency diurus di tengah, jadi penyedia yang menolak tidak berubah jadi pesanan yang hilang.",
        points: [
          "Satu API untuk beberapa gateway",
          "Routing otomatis dan fallback",
          "Charge dan webhook idempoten",
          "Event ternormalisasi ke aplikasi Anda",
        ],
      },
      adserverExchange: {
        description:
          "Kampanye, placement, creative, aturan penargetan, dan statistik harian dalam satu ad server.",
        intro:
          "Ad server self-hosted untuk kampanye langsung: placement, creative, aturan penargetan, dan statistik harian di satu tempat, bukan di spreadsheet dan skrip terpisah.",
        points: [
          "Kampanye, placement, dan creative",
          "Aturan penargetan per placement",
          "Impresi dan klik harian",
          "Self-hosted, data tetap di tangan Anda",
        ],
      },
      cloudHostingBilling: {
        description:
          "Billing white-label untuk bisnis hosting: order, invoice, domain, tiket, dan provisioning server otomatis.",
        intro:
          "Billing dan provisioning untuk bisnis hosting: order, invoice, domain, dan tiket dalam satu panel, supaya pelanggan baru tidak lagi butuh empat langkah manual.",
        points: [
          "Order dan invoice",
          "Provisioning domain dan layanan",
          "Area klien dan tiket dukungan",
          "White-label dengan merek Anda",
        ],
      },
      trafficAnalytics: {
        description:
          "Kunjungan, referrer, dan funnel konversi dalam satu dashboard.",
        intro:
          "Kunjungan, referrer, dan funnel konversi dalam satu dashboard, dijalankan di server Anda sendiri supaya angkanya tidak keluar dari infrastruktur yang Anda kendalikan.",
        points: [
          "Kunjungan dan referrer",
          "Pelacakan funnel dan konversi",
          "Tampilan per halaman dan per kampanye",
          "Self-hosted di server Anda",
        ],
      },
      selfHostedOnlineStore: {
        description:
          "Toko online yang Anda pasang dan miliki sendiri: katalog, keranjang, checkout, dan pesanan di server Anda.",
        intro:
          "Toko online yang Anda pasang dan miliki sendiri: katalog, keranjang, checkout, dan pesanan di server Anda, dengan kode dan data pelanggan di tangan Anda.",
        points: [
          "Katalog dan keranjang",
          "Checkout dan pengelolaan pesanan",
          "Bisa dipasang di server sendiri",
          "Data dan kode tetap milik Anda",
        ],
      },
    },
    catalog: {
      heading: "Game & Aplikasi",
      games: "Game",
      apps: "Aplikasi",
      gamesNote: "Game untuk ponsel, dibangun dan diterbitkan sendiri.",
      appsNote: "Utilitas Android sehari-hari yang ringan.",
    },
    page: {
      included: "Yang bisa dilakukannya",
      related: "Produk lain",
      discuss: "Diskusikan produk ini",
      all: "Semua produk",
      statusNote: "Sedang dikembangkan — belum ada tanggal rilis.",
    },
  },
  clients: {
    eyebrow: "Klien",
    marqueeLabel: "Dipercaya oleh tim di",
    marqueePause: "Jeda gerakan logo",
    marqueeResume: "Lanjutkan gerakan logo",
    title: "Klien yang pernah bekerja sama",
    description:
      "Tim dan jaringan yang pernah kami dukung dalam pekerjaan software, mobile, dan infrastruktur.",
    global: "Global",
    other: "Lainnya",
    otherNote: "dan 100+ lainnya",
    facts: {
      clients: "Klien",
      countries: "Negara",
      since: "Sejak",
    },
  },
  workflow: {
    eyebrow: "Proses",
    title: "Alur kerja yang terstruktur",
    description:
      "Metode agile yang transparan, sehingga Anda dapat memantau progres proyek secara berkala.",
    ctaLabel: "Lihat standar kami",
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
    ctaLabel: "Hubungi kami",
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
    emailLabel: "Email kami",
    emailHint: "Untuk brief, dokumen, dan hal yang butuh penjelasan panjang.",
    hoursLabel: "Jam operasional",
    hours: "Senin-Sabtu (08.30-20.00 WIB)",
    hoursNote: "Layanan darurat server aktif 24/7 bagi klien SLA",
    whatsappHint: "Jalur tercepat. Tanpa formulir, tanpa antre.",
    whatsappMessage:
      "Halo tim dibumi.com Lamongan,\n\nSaya ingin berkonsultasi mengenai kebutuhan proyek. Terima kasih!",
  },
  footer: {
    location: "Lamongan, Jawa Timur, Indonesia",
    product: "Produk",
    company: "Perusahaan",
    contact: "Kontak",
    legal: "Legal",
    terms: "Syarat & Ketentuan",
    privacy: "Kebijakan Privasi",
    copyright: "Hak cipta dilindungi undang-undang.",
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
  common: {
    skipToContent: "تخطَّ إلى المحتوى",
    learnMore: "اعرف المزيد",
  },
  nav: {
    mainLabel: "التنقل الرئيسي",
    mobileLabel: "تنقل الجوال",
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
    established: "لامونجان، جاوة الشرقية · منذ 2013",
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
  highlightsSection: {
    eyebrow: "التنفيذ",
    title: "من أول نطاق عمل إلى ملكية كاملة",
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
      "سبع ممارسات وفريق واحد. من أنظمة الأعمال الأساسية إلى غرفة الخوادم.",
    consult: "ناقش مشروعك",
    oneTeam: "فريق واحد",
    oneTeamNote:
      "الشيفرة والخوادم والضمان تُسلَّم معًا، من الفريق نفسه.",
    outputs: ["الشيفرة", "البنية التحتية", "اتفاقية الخدمة"],
    retired: [
      {
        title: "التسويق الرقمي",
        note: "لم يعد متاحاً",
        description:
          "حملات ووسائل تواصل اجتماعي وإعلانات مدفوعة نفّذناها لعملاء في سنوات الاستوديو الأولى.",
      },
      {
        title: "الأمن السيبراني (الفريق الأحمر والفريق الأزرق)",
        note: "لم يعد متاحاً",
        description:
          "اختبار الفريق الأحمر لتطبيقات الويب وواجهات API والخوادم، وتقوية الفريق الأزرق والمراقبة والاستجابة للحوادث، مع تقرير بأولويات الإصلاح.",
      },
    ],
  },
  services: [
    {
      title: "تطوير برمجيات مخصصة",
      description:
        "برمجيات مخصصة لسير عملك، من الأتمتة الداخلية إلى منصات ERP وCRM المرنة.",
    },
    {
      title: "تطوير ويب مخصص",
      description:
        "تطبيقات ويب مبنية حول سير عملك: لوحات تحكم وبوابات وتكاملات تتصل بالأنظمة التي تستخدمها.",
    },
    {
      title: "تطوير تطبيقات الجوال",
      description:
        "تطبيقات Android وiOS، أصلية أو متعددة المنصات، بمزامنة دون اتصال وبناء إصدار موقّع جاهز للمتجر.",
    },
    {
      title: "تطوير الألعاب",
      description:
        "ألعاب مصممة للهواتف والويب، مبنية للنشر والتشغيل بعد الإطلاق.",
    },
    {
      title: "موقع شركة عصري",
      description:
        "مواقع شركات سريعة مع تحسين SEO وربط مباشر بفريق المبيعات.",
    },
    {
      title: "إدارة الخوادم وDevOps",
      description:
        "إعداد وتأمين وصيانة الخوادم للحفاظ على استمرارية أعمالك.",
    },
    {
      title: "الصيانة وSLA",
      description:
        "مراقبة وتحديثات أمنية ونسخ احتياطية ودعم تقني طويل الأمد، بما في ذلك تحديث وترقية الشيفرة القديمة.",
    },
  ],
  servicePage: {
    included: "ما يشمله",
    approach: "كيف يسير العمل",
    related: "خدمات أخرى",
    flow: "مسار الخدمة",
  },
  servicePages: {
    "custom-software": {
      intro:
        "للعمل الذي لا يناسبه منتج جاهز: أدوات داخلية ووحدات ERP وCRM والتكاملات التي تربطها. نحدد النطاق، نبنيه، ثم نسلّم الشيفرة.",
      included: [
        "رسم سير العمل قبل أول سطر شيفرة",
        "بنية مرنة مع اختبارات",
        "تكامل API وبوابات الدفع",
        "تسليم الشيفرة والتوثيق",
      ],
      flow: [
        "رسم سير العمل",
        "وحدات ERP وCRM والتكاملات",
        "تسليم الشيفرة والتوثيق",
      ],
    },
    "custom-web-development": {
      intro:
        "تطبيقات ويب تتبع سير عملك لا العكس: لوحات تحكم وبوابات عملاء وأدوات إدارة تتصل بالأنظمة التي تشغّلها.",
      included: [
        "Laravel أو Next.js، واجهات API أولاً",
        "مصادقة وأدوار وسجل تدقيق",
        "تكامل مع الخدمات القائمة",
        "نشر على بنية تحتية نصونها أيضًا",
      ],
      flow: [
        "رسم سير العمل",
        "API والأدوار وسجل التدقيق",
        "نشر ومراقبة مستمرة",
      ],
    },
    "custom-mobile-apps": {
      intro:
        "حين يحتاج العمل إلى الجهاز: تطبيقات Android وiOS، أصلية أو متعددة المنصات، مع بناء WebView عندما يكون المنتج على الويب أصلاً ولا يستحق قاعدة شيفرة ثانية.",
      included: [
        "أصلية أو متعددة المنصات، بقاعدة شيفرة واحدة حيث تناسب",
        "تخزين يعمل دون اتصال ومزامنة في الخلفية",
        "إشعارات وروابط عميقة وبناء جاهز للمتاجر",
        "إصدار على Play Store وApp Store، موقّع ومسلّم",
      ],
      flow: [
        "أصلية أو WebView",
        "مزامنة دون اتصال",
        "إصدار إلى المتاجر",
      ],
    },
    "custom-games": {
      intro:
        "ألعاب مبنية للنشر: التصميم وحلقة اللعب والبناء وقائمة المتجر يتولاها فريق واحد. نصمم للهواتف والويب، ننشر، ونسلّم الشيفرة والأصول.",
      included: [
        "تصميم اللعبة وحلقة اللعب الأساسية قبل الإنتاج",
        "بناء للهواتف والويب",
        "قائمة المتجر والتوقيع والإصدار",
        "تسليم الشيفرة والأصول الفنية",
      ],
      flow: [
        "تصميم حلقة اللعب",
        "بناء للهواتف والويب",
        "نشر وتسليم الأصول",
      ],
    },
    "company-profile": {
      intro:
        "موقع شركة يُحمَّل بسرعة ويُقرأ بوضوح ويمنح فريق المبيعات مكانًا يوجّه إليه العملاء. مبني لمحركات البحث من أول سطر شيفرة، لا مُرقَّعًا لاحقًا.",
      included: [
        "تحسين SEO والأداء Core Web Vitals",
        "بيانات وصفية ديناميكية",
        "مسارات التواصل وWhatsApp",
        "إرشادات التحرير لفريقك",
      ],
      flow: [
        "بنية المحتوى والصفحات",
        "تحسين SEO والأداء",
        "الإطلاق ودليل التحرير",
      ],
    },
    "server-devops": {
      intro:
        "خوادم مُعدّة لتكون هادئة: محصّنة ومراقبة ومنسوخة احتياطيًا وموثّقة، حتى يصبح العطل التالي سطرًا في السجل لا انقطاعًا.",
      included: [
        "تقوية وحماية Fail2ban",
        "Nginx ووكيل عكسي وTLS",
        "نسخ احتياطي مشفّر خارج الخادم",
        "دليل تشغيل وتسليم الوصول",
      ],
      flow: [
        "تدقيق وتقوية الخادم",
        "وكيل عكسي وTLS ونسخ احتياطي",
        "دليل التشغيل وتسليم الوصول",
      ],
    },
    "maintenance-sla": {
      intro:
        "بعد الإطلاق لا بد من يراقبه. نراقب ونحدّث ونستجيب، بزمن استجابة متفق عليه كتابةً قبل أول تذكرة، بما في ذلك تحديث وترقية الشيفرة القديمة التي لم تعد تتلقى تحديثات بنفسها.",
      included: [
        "مراقبة التوفر والأخطاء",
        "تحديثات أمنية وترقية الاعتماديات والأطر",
        "تدقيق الشيفرة القديمة وترحيل تدريجي",
        "استجابة أولوية للحوادث مع اختبارات استعادة من النسخ",
      ],
      flow: [
        "مراقبة التوفر والأخطاء",
        "تحديثات أمنية وترقية الاعتماديات",
        "تصعيد وفق اتفاقية SLA",
      ],
    },
  },
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
        intro:
          "نقطة واحدة أمام مزوّدي نماذج متعددين: مفتاح واحد ومحفظة واحدة وتوجيه لكل نموذج، حتى يستطيع فريق صغير تبديل المزوّد دون إعادة كتابة الشيفرة.",
        points: [
          "مفتاح API واحد لكل النماذج",
          "حصة ومحفظة لكل نموذج",
          "بديل احتياطي عند تعطل مزوّد",
          "سجلات استخدام لكل مشروع",
        ],
      },
      paymentOrchestration: {
        description:
          "واجهة API واحدة لكل بوابات الدفع: توجيه تلقائي وبديل احتياطي ومنع تكرار الطلبات وتوحيد الـ webhooks.",
        intro:
          "تكامل واحد لكل بوابات الدفع. التوجيه والبديل الاحتياطي ومنع التكرار تُدار في الوسط، فلا يتحول مزوّد يرفض العملية إلى طلب مفقود.",
        points: [
          "API واحدة لعدة بوابات",
          "توجيه وبديل احتياطي تلقائي",
          "عمليات وwebhooks غير قابلة للتكرار",
          "أحداث موحّدة إلى تطبيقك",
        ],
      },
      adserverExchange: {
        description:
          "الحملات والمواضع والتصاميم وقواعد الاستهداف والإحصاءات اليومية في خادم إعلانات واحد.",
        intro:
          "خادم إعلانات ذاتي الاستضافة للحملات المباشرة: المواضع والتصاميم وقواعد الاستهداف والإحصاءات اليومية في مكان واحد، لا في جدول بيانات وسكربت منفصل.",
        points: [
          "الحملات والمواضع والتصاميم",
          "قواعد استهداف لكل موضع",
          "ظهور ونقرات يومية",
          "استضافة ذاتية، البيانات تبقى عندك",
        ],
      },
      cloudHostingBilling: {
        description:
          "فواتير بعلامة بيضاء ولوحة عميل وتجهيز لشركات الاستضافة: الطلبات والفواتير والنطاقات والتذاكر.",
        intro:
          "فواتير وتجهيز لشركات الاستضافة: الطلبات والفواتير والنطاقات والتذاكر في لوحة واحدة، حتى لا يحتاج عميل جديد إلى أربع خطوات يدوية.",
        points: [
          "الطلبات والفواتير",
          "تجهيز النطاقات والخدمات",
          "منطقة العميل وتذاكر الدعم",
          "علامة بيضاء باسمك",
        ],
      },
      trafficAnalytics: {
        description: "الزيارات والمصادر ومسارات التحويل في لوحة واحدة.",
        intro:
          "الزيارات والمصادر ومسارات التحويل في لوحة واحدة، تعمل على خادمك أنت حتى لا تخرج الأرقام من البنية التي تتحكم بها.",
        points: [
          "الزيارات والمصادر",
          "تتبع المسارات والتحويل",
          "عرض لكل صفحة ولكل حملة",
          "استضافة ذاتية على خادمك",
        ],
      },
      selfHostedOnlineStore: {
        description:
          "متجر إلكتروني تملكه وتثبّته بنفسك: الكتالوج والسلة والدفع والطلبات على خادمك.",
        intro:
          "متجر إلكتروني تملكه وتثبّته بنفسك: الكتالوج والسلة والدفع والطلبات على خادمك، مع بقاء الشيفرة وبيانات العملاء في يدك.",
        points: [
          "الكتالوج والسلة",
          "الدفع وإدارة الطلبات",
          "قابل للتثبيت على خادمك",
          "البيانات والشيفرة تبقى لديك",
        ],
      },
    },
    catalog: {
      heading: "الألعاب والتطبيقات",
      games: "الألعاب",
      apps: "التطبيقات",
      gamesNote: "ألعاب للهواتف، نطورها وننشرها بأنفسنا.",
      appsNote: "أدوات Android يومية خفيفة.",
    },
    page: {
      included: "ما يمكنه فعله",
      related: "منتجات أخرى",
      discuss: "ناقش هذا المنتج",
      all: "جميع المنتجات",
      statusNote: "قيد التطوير — لا موعد إصدار بعد.",
    },
  },
  clients: {
    eyebrow: "العملاء",
    marqueeLabel: "موثوق به من فرق في",
    marqueePause: "إيقاف حركة الشعارات",
    marqueeResume: "استئناف حركة الشعارات",
    title: "عملاء تعاملنا معهم",
    description:
      "فرق وشبكات دعمناها في أعمال البرمجيات والجوال والبنية التحتية.",
    global: "عالمي",
    other: "أخرى",
    otherNote: "و100+ أخرى",
    facts: {
      clients: "العملاء",
      countries: "الدول",
      since: "منذ",
    },
  },
  workflow: {
    eyebrow: "المنهجية",
    title: "منهجية عمل منظمة",
    description:
      "منهجية Agile شفافة تتيح لك متابعة تقدم المشروع في كل مرحلة.",
    ctaLabel: "اطّلع على معاييرنا",
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
    ctaLabel: "تحدّث إلينا",
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
    location: "لامونجان، جاوة الشرقية، إندونيسيا",
    product: "المنتجات",
    company: "الشركة",
    contact: "تواصل معنا",
    legal: "قانوني",
    terms: "الشروط والأحكام",
    privacy: "سياسة الخصوصية",
    copyright: "جميع الحقوق محفوظة.",
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
  common: {
    skipToContent: "跳转到内容",
    learnMore: "了解更多",
  },
  nav: {
    mainLabel: "主导航",
    mobileLabel: "移动端导航",
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
    established: "东爪哇拉蒙岸 · 自 2013 年起",
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
  highlightsSection: {
    eyebrow: "交付",
    title: "从最初的范围界定到完全归您所有",
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
    description: "七项能力，一个团队。从核心业务系统到服务器机房。",
    consult: "讨论项目",
    oneTeam: "同一个团队",
    oneTeamNote:
      "代码、服务器和保障由同一批人一起交付。",
    outputs: ["代码", "基础设施", "SLA"],
    retired: [
      {
        title: "数字营销",
        note: "已不再提供",
        description:
          "工作室早期为客户执行的广告投放、社交媒体与付费搜索。",
      },
      {
        title: "网络安全（红队与蓝队）",
        note: "已不再提供",
        description:
          "曾对 Web 应用、API 与服务器做红队测试，也做过蓝队加固、监控与事件响应，报告附修复优先级。",
      },
    ],
  },
  services: [
    {
      title: "定制软件开发",
      description:
        "根据您的业务流程定制软件，从内部自动化到模块化 ERP 和 CRM 平台。",
    },
    {
      title: "定制 Web 开发",
      description:
        "围绕您的业务流程构建的 Web 应用：仪表盘、门户，以及与现有系统对接的集成。",
    },
    {
      title: "定制移动应用开发",
      description:
        "Android 与 iOS 应用，原生或跨平台，支持离线同步，并提供可直接上架的发布版本。",
    },
    {
      title: "定制游戏开发",
      description:
        "为手机与 Web 设计的游戏，从构建到发布，上线之后还能继续运行。",
    },
    {
      title: "现代企业官网",
      description:
        "拥有页面 SEO、快速性能和销售团队直连功能的企业网站。",
    },
    {
      title: "服务器与 DevOps 管理",
      description:
        "服务器部署、安全加固、性能调优和维护，保障业务稳定运行。",
    },
    {
      title: "维护与 SLA",
      description:
        "持续监控、安全补丁、加密备份与长期支持，也包括对旧代码的更新与升级。",
    },
  ],
  servicePage: {
    included: "包含内容",
    approach: "如何推进",
    related: "其他服务",
    flow: "服务流程",
  },
  servicePages: {
    "custom-software": {
      intro:
        "当现成产品不合用时：内部工具、ERP 与 CRM 模块，以及把它们连接起来的集成。我们先界定范围，再构建，最后交付代码。",
      included: [
        "写第一行代码前先梳理流程",
        "带测试的模块化架构",
        "API 与支付网关集成",
        "交付源码与文档",
      ],
      flow: [
        "流程梳理",
        "模块与集成",
        "代码交付",
      ],
    },
    "custom-web-development": {
      intro:
        "让 Web 应用跟随你的流程，而不是反过来：仪表盘、客户门户与管理工具，与现有系统对接。",
      included: [
        "Laravel 或 Next.js，API 优先",
        "认证、角色与审计日志",
        "与现有服务集成",
        "部署在我们同样维护的基础设施上",
      ],
      flow: [
        "业务流程梳理",
        "API、角色、审计日志",
        "部署与监控",
      ],
    },
    "custom-mobile-apps": {
      intro:
        "当工作需要用到设备本身：Android 与 iOS 应用，原生或跨平台；如果产品已经跑在 Web 上，也可以用 WebView 封装，省去维护第二套代码。",
      included: [
        "原生或跨平台，一套代码够用就只用一套",
        "离线优先存储与后台同步",
        "推送、深度链接与可上架的发布构建",
        "Google Play Store 与 App Store 发布，签名后交付",
      ],
      flow: [
        "原生或 WebView",
        "离线同步",
        "应用商店发布",
      ],
    },
    "custom-games": {
      intro:
        "为上线而做的游戏：玩法、构建与商店资料由同一个团队负责。我们面向手机与 Web 设计，完成发布，并交付源码与素材。",
      included: [
        "进入制作前先完成游戏设计与核心循环",
        "手机与 Web 构建",
        "商店资料、签名与发布",
        "交付源码与美术素材",
      ],
      flow: [
        "核心循环设计",
        "手机与 Web 构建",
        "发布与交付",
      ],
    },
    "company-profile": {
      intro:
        "加载快、读得清、能给销售团队一个可推送的落点。从第一行代码就为搜索而建，而不是事后打补丁。",
      included: [
        "页面 SEO 与 Core Web Vitals",
        "动态 Schema 与元数据",
        "联系与 WhatsApp 路由",
        "给团队的编辑指引",
      ],
      flow: [
        "内容与结构",
        "SEO 与性能",
        "发布与编辑指引",
      ],
    },
    "server-devops": {
      intro:
        "把服务器做得平淡可靠：加固、监控、备份并有文档，让下一次故障只是一行日志，而不是停机。",
      included: [
        "安全加固与 Fail2ban",
        "Nginx、反向代理与 TLS",
        "加密的异地备份",
        "运行手册与权限交接",
      ],
      flow: [
        "审计与加固",
        "反向代理、TLS 与备份",
        "运行手册与权限交接",
      ],
    },
    "maintenance-sla": {
      intro:
        "上线之后总得有人盯着。我们负责监控、补丁与响应，响应时间在第一个工单之前以书面约定；也包括对已经没人维护的旧代码做更新与升级。",
      included: [
        "可用性与错误监控",
        "安全补丁、依赖与框架升级",
        "旧代码审计与分阶段迁移",
        "优先处理紧急事件，并定期演练备份恢复",
      ],
      flow: [
        "可用性监控",
        "补丁与升级",
        "SLA 分级响应",
      ],
    },
  },
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
        intro:
          "在多个模型提供方前面放一个端点：一个 Key、一个钱包与按模型路由，让小团队无需重写代码就能切换提供方。",
        points: [
          "一个 API Key 覆盖所有模型",
          "按模型计费与额度",
          "提供方故障时自动回退",
          "按项目记录用量",
        ],
      },
      paymentOrchestration: {
        description:
          "一个 API 覆盖所有支付网关：自动路由、故障回退、幂等处理与统一 Webhook。",
        intro:
          "一套集成对接所有支付网关。路由、回退与幂等都在中间层处理，提供方拒绝不会变成丢失的订单。",
        points: [
          "一个 API 对接多个网关",
          "自动路由与回退",
          "幂等的扣款与 Webhook",
          "统一事件推送到你的应用",
        ],
      },
      adserverExchange: {
        description: "广告系列、广告位、创意、定向规则与每日统计，集中在一个广告服务器。",
        intro:
          "面向直投广告的自托管广告服务器：广告位、创意、定向规则与每日统计集中在一处，而不是散在表格和脚本里。",
        points: [
          "广告系列、广告位与创意",
          "按广告位设置定向规则",
          "每日曝光与点击",
          "自托管，数据留在你手里",
        ],
      },
      cloudHostingBilling: {
        description: "面向主机业务的白标账单、客户中心与开通：订单、发票、域名、工单与服务器自动部署。",
        intro:
          "为主机业务准备的账单与开通流程：订单、发票、域名与工单集中在一个面板，新客户不再需要四步手工操作。",
        points: [
          "订单与发票",
          "域名与服务开通",
          "客户中心与支持工单",
          "以你的品牌白标运行",
        ],
      },
      trafficAnalytics: {
        description: "访问量、来源与转化漏斗，集中在一个面板。",
        intro:
          "访问量、来源与转化漏斗集中在一个面板，运行在你自己的服务器上，数据不会离开你掌控的基础设施。",
        points: [
          "访问量与来源",
          "漏斗与转化跟踪",
          "按页面与按渠道查看",
          "自托管在你的服务器上",
        ],
      },
      selfHostedOnlineStore: {
        description: "自托管的在线商店：目录、购物车、结账与订单，全部运行在您自己的服务器上。",
        intro:
          "一个你自行安装并拥有的商店：目录、购物车、结账与订单都在你的服务器上，代码与客户数据都在你手里。",
        points: [
          "目录与购物车",
          "结账与订单管理",
          "可安装在自己的服务器上",
          "数据与代码都归你所有",
        ],
      },
    },
    catalog: {
      heading: "游戏与应用",
      games: "游戏",
      apps: "应用",
      gamesNote: "面向手机的游戏，由我们自己开发与发行。",
      appsNote: "轻量的日常 Android 工具。",
    },
    page: {
      included: "它能做什么",
      related: "其他产品",
      discuss: "讨论这个产品",
      all: "全部产品",
      statusNote: "开发中 — 尚无发布日期。",
    },
  },
  clients: {
    eyebrow: "客户",
    marqueeLabel: "深受以下团队信赖",
    marqueePause: "暂停标志滚动",
    marqueeResume: "继续标志滚动",
    title: "合作过的客户",
    description: "我们在软件、移动端和基础设施项目中支持过的团队与网络。",
    global: "全球",
    other: "其他",
    otherNote: "以及另外 100+ 家",
    facts: {
      clients: "客户",
      countries: "国家",
      since: "始于",
    },
  },
  workflow: {
    eyebrow: "流程",
    title: "结构化工作流程",
    description: "透明的敏捷流程，让您随时了解项目进展。",
    ctaLabel: "查看我们的标准",
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
    ctaLabel: "联系我们",
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
    location: "印度尼西亚东爪哇拉蒙岸",
    product: "产品",
    company: "公司",
    contact: "联系",
    legal: "法律",
    terms: "条款与条件",
    privacy: "隐私政策",
    copyright: "版权所有。",
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
  common: {
    skipToContent: "Przejdź do treści",
    learnMore: "Dowiedz się więcej",
  },
  nav: {
    mainLabel: "Nawigacja główna",
    mobileLabel: "Nawigacja mobilna",
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
    established: "Lamongan, Jawa Wschodnia · Od 2013",
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
  highlightsSection: {
    eyebrow: "Realizacja",
    title: "Od pierwszego zakresu po pełną własność",
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
      "Siedem praktyk, jeden zespół. Od systemów biznesowych po serwerownię.",
    consult: "Porozmawiaj o projekcie",
    oneTeam: "Jeden zespół",
    oneTeamNote:
      "Kod, serwery i gwarancja powstają razem, u tych samych ludzi.",
    outputs: ["Kod", "Infrastruktura", "SLA"],
    retired: [
      {
        title: "Marketing cyfrowy",
        note: "Nie jest już oferowany",
        description:
          "Kampanie, media społecznościowe i płatne wyszukiwanie, które prowadziliśmy dla klientów w pierwszych latach studia.",
      },
      {
        title: "Cyberbezpieczeństwo (Red Team i Blue Team)",
        note: "Nie jest już oferowane",
        description:
          "Prowadziliśmy testy red team aplikacji webowych, API i serwerów oraz utwardzanie, monitoring i reakcję na incydenty po stronie blue team, z raportem priorytetów napraw.",
      },
    ],
  },
  services: [
    {
      title: "Dedykowane oprogramowanie",
      description:
        "Oprogramowanie dopasowane do Twojego procesu, od automatyzacji po modułowe systemy ERP i CRM.",
    },
    {
      title: "Dedykowane aplikacje webowe",
      description:
        "Aplikacje webowe dopasowane do Twojego procesu: pulpity, portale i integracje z systemami, których już używasz.",
    },
    {
      title: "Dedykowane aplikacje mobilne",
      description:
        "Aplikacje na Androida i iOS, natywne lub wieloplatformowe, z synchronizacją offline i buildem wydania gotowym do sklepu.",
    },
    {
      title: "Dedykowane gry",
      description:
        "Gry na telefony i web: projekt, build i publikacja, a potem utrzymanie po premierze.",
    },
    {
      title: "Nowoczesne strony firmowe",
      description:
        "Strony korporacyjne z SEO, szybkim działaniem i bezpośrednim kontaktem z zespołem sprzedaży.",
    },
    {
      title: "Serwery i DevOps",
      description:
        "Konfiguracja, zabezpieczenie, optymalizacja i utrzymanie serwerów dla ciągłości biznesu.",
    },
    {
      title: "Maintenance i SLA",
      description:
        "Monitoring, aktualizacje bezpieczeństwa, szyfrowane kopie i długoterminowe wsparcie, wraz z aktualizacją i modernizacją starego kodu.",
    },
  ],
  servicePage: {
    included: "Co obejmuje",
    approach: "Jak przebiega praca",
    related: "Inne usługi",
    flow: "Przebieg usługi",
  },
  servicePages: {
    "custom-software": {
      intro:
        "Dla pracy, do której nie pasuje gotowy produkt: narzędzia wewnętrzne, moduły ERP i CRM oraz integracje, które je łączą. Ustalamy zakres, budujemy, przekazujemy kod.",
      included: [
        "Mapowanie procesu przed pierwszą linią kodu",
        "Modułowa architektura z testami",
        "Integracje API i płatności",
        "Przekazanie kodu i dokumentacji",
      ],
      flow: [
        "Mapowanie procesu",
        "Moduły i integracje",
        "Przekazanie kodu",
      ],
    },
    "custom-web-development": {
      intro:
        "Aplikacje webowe, które podążają za Twoim procesem, a nie odwrotnie: pulpity, portale klientów i narzędzia administracyjne połączone z systemami, których już używasz.",
      included: [
        "Laravel lub Next.js, API-first",
        "Uwierzytelnianie, role i dziennik zmian",
        "Integracja z istniejącymi usługami",
        "Wdrożenie na infrastrukturze, którą też utrzymujemy",
      ],
      flow: [
        "Mapowanie procesu pracy",
        "API, role, dziennik zmian",
        "Wdrożenie i monitoring",
      ],
    },
    "custom-mobile-apps": {
      intro:
        "Gdy praca potrzebuje urządzenia: aplikacje na Androida i iOS, natywne lub wieloplatformowe, a także wersja WebView, gdy produkt działa już w sieci i druga baza kodu się nie opłaca.",
      included: [
        "Natywne lub wieloplatformowe, jedna baza kodu, gdy to wystarcza",
        "Dane offline-first i synchronizacja w tle",
        "Powiadomienia push, deep linki i build gotowy do sklepu",
        "Wydanie w Play Store i App Store, podpisane i przekazane",
      ],
      flow: [
        "Natywna lub WebView",
        "Synchronizacja offline",
        "Wydanie w sklepach",
      ],
    },
    "custom-games": {
      intro:
        "Gry dowiezione do końca: pętla rozgrywki, build i karta w sklepie w jednych rękach. Projektujemy na telefony i web, wydajemy i przekazujemy kod źródłowy oraz materiały.",
      included: [
        "Projekt gry i pętla rozgrywki przed produkcją",
        "Buildy na telefony i web",
        "Karta w sklepie, podpis i wydanie",
        "Kod źródłowy i materiały graficzne przekazane",
      ],
      flow: [
        "Projekt pętli rozgrywki",
        "Buildy na telefony i web",
        "Wydane i przekazane",
      ],
    },
    "company-profile": {
      intro:
        "Strona firmowa, która szybko się ładuje, jasno czyta i daje działowi sprzedaży miejsce, do którego można odesłać klienta. Budowana pod wyszukiwarki od pierwszej linii kodu, nie łatana później.",
      included: [
        "SEO on-page i Core Web Vitals",
        "Dynamiczne schema i metadane",
        "Ścieżki kontaktu i WhatsApp",
        "Wskazówki edycyjne dla Twojego zespołu",
      ],
      flow: [
        "Treść i struktura",
        "SEO i wydajność",
        "Wdrożenie i wskazówki edycyjne",
      ],
    },
    "server-devops": {
      intro:
        "Serwery ustawione tak, by były nudne: utwardzone, monitorowane, z kopiami i dokumentacją, żeby następny incydent był linią w logu, a nie awarią.",
      included: [
        "Hardening i Fail2ban",
        "Nginx, reverse proxy i TLS",
        "Szyfrowane kopie poza serwerem",
        "Runbook i przekazanie dostępu",
      ],
      flow: [
        "Audyt i hardening",
        "Proxy, TLS, kopie zapasowe",
        "Runbook i dostęp",
      ],
    },
    "maintenance-sla": {
      intro:
        "Po wdrożeniu ktoś musi tego pilnować. Monitorujemy, łatajemy i odpowiadamy, w czasie reakcji uzgodnionym na piśmie przed pierwszym zgłoszeniem. Obejmuje to aktualizację i modernizację starego kodu, który nie dostaje już poprawek sam z siebie.",
      included: [
        "Monitoring dostępności i błędów",
        "Łatki bezpieczeństwa, aktualizacje zależności i frameworków",
        "Audyt starego kodu i migracja etapami",
        "Priorytetowa reakcja na awarie i próby odtworzenia z kopii",
      ],
      flow: [
        "Monitoring dostępności i błędów",
        "Łatki i aktualizacje",
        "Eskalacja zgłoszeń SLA",
      ],
    },
  },
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
        intro:
          "Jeden punkt przed wieloma dostawcami modeli: jeden klucz, jeden portfel i routing per model, żeby mały zespół mógł zmienić dostawcę bez przepisywania kodu.",
        points: [
          "Jeden klucz API do wszystkich modeli",
          "Limit i portfel per model",
          "Fallback dostawcy, gdy jeden zawiedzie",
          "Logi użycia per projekt",
        ],
      },
      paymentOrchestration: {
        description:
          "Jedno API do wszystkich bramek płatności: automatyczny routing, fallback, idempotencja i znormalizowane webhooki.",
        intro:
          "Jedna integracja do wszystkich bramek płatności. Routing, fallback i idempotencja są obsługiwane pośrodku, więc odrzucenie przez bramkę nie staje się zgubionym zamówieniem.",
        points: [
          "Jedno API dla wielu bramek",
          "Automatyczny routing i fallback",
          "Idempotentne obciążenia i webhooki",
          "Znormalizowane zdarzenia do aplikacji",
        ],
      },
      adserverExchange: {
        description:
          "Kampanie, miejsca emisji, kreacje, reguły targetowania i dzienne statystyki w jednym serwerze reklam.",
        intro:
          "Samodzielnie hostowany serwer reklam do kampanii bezpośrednich: miejsca emisji, kreacje, reguły targetowania i dzienne statystyki w jednym miejscu, a nie w arkuszu i skrypcie.",
        points: [
          "Kampanie, miejsca emisji i kreacje",
          "Reguły targetowania per miejsce",
          "Dzienne wyświetlenia i kliknięcia",
          "Self-hosted, dane zostają u Ciebie",
        ],
      },
      cloudHostingBilling: {
        description:
          "Billing white-label i provisioning dla firm hostingowych: zamówienia, faktury, domeny i zgłoszenia.",
        intro:
          "Rozliczenia i provisioning dla firm hostingowych: zamówienia, faktury, domeny i zgłoszenia w jednym panelu, żeby nowy klient nie wymagał już czterech ręcznych kroków.",
        points: [
          "Zamówienia i faktury",
          "Provisioning domen i usług",
          "Panel klienta i zgłoszenia",
          "White-label pod Twoją marką",
        ],
      },
      trafficAnalytics: {
        description: "Odwiedziny, źródła i lejki konwersji w jednym panelu.",
        intro:
          "Odwiedziny, źródła i lejki konwersji w jednym panelu, uruchomione na Twoim serwerze, żeby liczby nie opuszczały infrastruktury, którą kontrolujesz.",
        points: [
          "Odwiedziny i źródła",
          "Śledzenie lejków i konwersji",
          "Widoki per strona i per kampania",
          "Self-hosted na Twoim serwerze",
        ],
      },
      selfHostedOnlineStore: {
        description:
          "Sklep internetowy, który instalujesz i posiadasz: katalog, koszyk, zamówienia na własnym serwerze.",
        intro:
          "Sklep internetowy, który instalujesz i posiadasz: katalog, koszyk, zamówienia na własnym serwerze, z kodem i danymi klientów w Twoich rękach.",
        points: [
          "Katalog i koszyk",
          "Zamówienia i obsługa płatności",
          "Instalacja na własnym serwerze",
          "Dane i kod zostają u Ciebie",
        ],
      },
    },
    catalog: {
      heading: "Gry i aplikacje",
      games: "Gry",
      apps: "Aplikacje",
      gamesNote: "Gry na telefony, tworzone i wydawane przez nas.",
      appsNote: "Codzienne, lekkie narzędzia Android.",
    },
    page: {
      included: "Co potrafi",
      related: "Inne produkty",
      discuss: "Porozmawiaj o produkcie",
      all: "Wszystkie produkty",
      statusNote: "W budowie — brak daty wydania.",
    },
  },
  clients: {
    eyebrow: "Klienci",
    marqueeLabel: "Zaufali nam zespoły z",
    marqueePause: "Wstrzymaj przewijanie logo",
    marqueeResume: "Wznów przewijanie logo",
    title: "Klienci, z którymi pracowaliśmy",
    description:
      "Zespoły i sieci, które wspieraliśmy w projektach software, mobile i infrastrukturalnych.",
    global: "Globalny",
    other: "Inne",
    otherNote: "i ponad 100 innych",
    facts: {
      clients: "Klienci",
      countries: "Kraje",
      since: "Od",
    },
  },
  workflow: {
    eyebrow: "Proces",
    title: "Uporządkowany proces pracy",
    description:
      "Przejrzysta metodyka Agile pozwala śledzić postęp projektu na każdym etapie.",
    ctaLabel: "Zobacz nasze standardy",
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
    ctaLabel: "Napisz do nas",
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
    location: "Lamongan, Jawa Wschodnia, Indonezja",
    product: "Produkty",
    company: "Firma",
    contact: "Kontakt",
    legal: "Prawne",
    terms: "Regulamin",
    privacy: "Polityka prywatności",
    copyright: "Wszelkie prawa zastrzeżone.",
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
