export const locales = ["id", "en", "ar", "zh", "pl"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  id: "ID",
  en: "EN",
  ar: "عربي",
  zh: "中文",
  pl: "PL",
};

export const companyAddress =
  "RT 003 RW 003, Desa Ngambeg, Kecamatan Pucuk, Kabupaten Lamongan, Provinsi Jawa Timur, Indonesia 62257";

export type SiteContent = {
  nav: {
    services: string;
    process: string;
    standards: string;
    contact: string;
    consultation: string;
    menu: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    consultation: string;
    services: string;
    imageAlt: string;
    caption: string;
  };
  services: {
    title: string;
    description: string;
    points: string[];
  }[];
  servicesSection: { title: string; description: string; consult: string };
  platforms: {
    title: string;
    description: string;
    names: string[];
    disclaimer: string;
  };
  workflow: {
    title: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  standards: {
    title: string;
    description: string;
    items: { title: string; description: string }[];
    commitments: { title: string; description: string }[];
  };
  contact: {
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
  };
  footer: {
    description: string;
    location: string;
    address: string;
    legal: { terms: string; privacy: string };
    services: string;
    company: string;
    contact: string;
    serviceLinks: string[];
    companyLinks: string[];
    whatsapp: string;
    copyright: string;
  };
  metadata: { title: string; description: string };
};

const id: SiteContent = {
  nav: { services: "Layanan", process: "Proses", standards: "Standar", contact: "Kontak", consultation: "Konsultasi", menu: "Menu Navigasi" },
  hero: { eyebrow: "Pabrik produksi aplikasi dan software di Lamongan", title: "Teknologi untuk bisnis yang terus tumbuh.", description: "Kami merancang software, aplikasi, dan website yang menyederhanakan pekerjaan dan mendukung langkah bisnis berikutnya.", consultation: "Konsultasi", services: "Lihat layanan", imageAlt: "Ruang kerja pengembangan software dengan laptop dan perangkat teknologi", caption: "Solusi digital, dirancang dengan cermat." },
  servicesSection: { title: "Layanan yang kami kerjakan", description: "Dikerjakan langsung oleh software engineer berpengalaman, dari sistem inti perusahaan hingga infrastruktur server.", consult: "Konsultasikan" },
  platforms: { title: "Platform dan kanal yang pernah digunakan", description: "Beberapa nama dari ekosistem digital yang pernah kami gunakan atau temui dalam pekerjaan dan eksplorasi teknis.", names: ["UC Browser / UCWeb", "BuzzCity", "PropellerAds", "Zeedsharia", "Motmaina.com"], disclaimer: "Nama ditampilkan sebagai referensi platform atau kanal yang pernah digunakan. Bagian ini bukan daftar klien atau mitra, dan tidak menyatakan endorsement, afiliasi, atau hubungan resmi dengan entitas yang disebutkan." },
  services: [
    { title: "Custom Software Development", description: "Perangkat lunak kustom sesuai workflow bisnis Anda, dari automasi internal hingga ERP dan CRM modular.", points: ["Integrasi API & payment gateway", "Arsitektur aman & modular"] },
    { title: "Jasa WebView Android", description: "Konversi website menjadi aplikasi Android resmi yang siap rilis ke Google Play Store.", points: ["Play Store ready", "Pengerjaan 1–2 hari"] },
    { title: "Company Profile Modern", description: "Website profil korporat dengan SEO on-page, performa cepat, dan koneksi langsung ke tim sales.", points: ["Core Web Vitals optimal", "Schema markup & meta dinamis"] },
    { title: "Custom Android Apps", description: "Aplikasi Android native atau cross-platform dengan performa stabil dan sinkronisasi offline.", points: ["MVVM / clean architecture", "Database offline-first"] },
    { title: "Kelola Server & DevOps", description: "Setup, hardening, tuning, dan pemeliharaan server untuk menjaga uptime bisnis Anda.", points: ["Hardening & Fail2ban", "Nginx, reverse proxy & backup"] },
    { title: "Maintenance & SLA", description: "Monitoring, security update, backup terenkripsi, dan pendampingan teknis jangka panjang.", points: ["Monitoring berkala", "Respons darurat prioritas"] },
  ],
  workflow: { title: "Alur kerja yang terstruktur", description: "Metode agile yang transparan, sehingga Anda dapat memantau progres proyek secara berkala.", steps: [
    { title: "Discovery & Analisis Kebutuhan", description: "Kami memahami alur bisnis, target pengguna, dan kebutuhan sistem, lalu menyusun Scope of Work yang jelas." },
    { title: "Desain Sistem & Arsitektur", description: "Kami merancang database, API, UI/UX, dan spesifikasi server agar sistem siap berkembang." },
    { title: "Pengembangan & Quality Assurance", description: "Setiap modul dibangun dengan clean code dan diuji dari sisi fungsi, keamanan, dan performa." },
    { title: "Deployment, Training & Garansi", description: "Sistem diluncurkan, tim Anda mendapat panduan, dan proyek disertai masa garansi bug." },
  ] },
  standards: { title: "Standar kerja kami", description: "Komitmen profesionalitas yang berlaku di setiap proyek yang kami kerjakan.", items: [
    { title: "Perjanjian Kerahasiaan (NDA)", description: "Kami menjaga kerahasiaan ide bisnis, database pelanggan, dan seluruh logika software Anda." },
    { title: "Keamanan Sejak Awal", description: "Sistem dirancang untuk mengurangi risiko serangan umum dan kebocoran endpoint API." },
    { title: "Kode Bersih & Mudah Dirawat", description: "Kode ditulis terorganisir, modular, dan terdokumentasi agar mudah dikembangkan." },
  ], commitments: [
    { title: "Hak milik penuh", description: "Kode program, repositori, akun cloud, dan akses database menjadi aset perusahaan Anda." },
    { title: "Transparan", description: "Lingkup kerja, timeline, dan biaya disepakati di awal tanpa biaya tersembunyi." },
    { title: "Pendampingan", description: "Dukungan teknis berkelanjutan setelah serah terima, termasuk masa garansi bug." },
  ] },
  contact: { title: "Mulai bangun sistem Anda", description: "Hubungi technical desk kami di Lamongan untuk respons cepat dan analisis kebutuhan teknis.", office: "Kantor & technical desk", locationLabel: "Domisili kantor", location: companyAddress, locationNote: "Melayani klien di seluruh Indonesia", emailLabel: "Email korespondensi", hoursLabel: "Jam operasional", hours: "Senin — Sabtu (08.30–20.00 WIB)", hoursNote: "Layanan darurat server aktif 24/7 bagi klien SLA", ideaTitle: "Punya kebutuhan proyek?", ideaDescription: "Ceritakan tantangan bisnis Anda. Tim teknis kami siap membantu menemukan solusi yang tepat, aman, dan bisa berkembang.", whatsapp: "Chat WhatsApp", whatsappMessage: "Halo tim dibumi.com Lamongan,\n\nSaya ingin berkonsultasi mengenai kebutuhan proyek. Terima kasih!" },
  footer: { description: "Pabrik produksi aplikasi dan software yang berbasis di Lamongan, Indonesia. Kami membantu bisnis membangun software, aplikasi mobile, dan infrastruktur cloud yang tangguh.", location: "Lamongan, Jawa Timur — Indonesia", address: companyAddress, legal: { terms: "Syarat & Ketentuan", privacy: "Kebijakan Privasi" }, services: "Layanan", company: "Perusahaan", contact: "Kontak", serviceLinks: ["Custom Software Enterprise", "Jasa WebView Android", "Website Company Profile", "Kelola Server & DevOps"], companyLinks: ["Metodologi", "Standar Kerja", "Kontak"], whatsapp: "Konsultasi WhatsApp", copyright: "Hak cipta dilindungi undang-undang." },
  metadata: { title: "dibumi.com — Pabrik Produksi Aplikasi & Software", description: "Partner teknologi strategis untuk custom software, aplikasi Android, website korporat, dan infrastruktur server." },
};

const en: SiteContent = {
  nav: { services: "Services", process: "Process", standards: "Standards", contact: "Contact", consultation: "Consultation", menu: "Navigation Menu" },
  hero: { eyebrow: "An app and software production factory in Lamongan", title: "Technology for businesses that keep growing.", description: "We design software, applications, and websites that simplify work and support your next business move.", consultation: "Consultation", services: "View services", imageAlt: "Software development workspace with a laptop and technology equipment", caption: "Digital solutions, carefully designed." },
  servicesSection: { title: "What we do", description: "Built directly by experienced software engineers, from core business systems to server infrastructure.", consult: "Discuss a project" },
  platforms: { title: "Platforms and channels we have used", description: "A selection of names from the digital ecosystem that we have used or encountered through work and technical exploration.", names: ["UC Browser / UCWeb", "BuzzCity", "PropellerAds", "Zeedsharia", "Motmaina.com"], disclaimer: "Names are shown only as references to platforms or channels that have been used. This is not a client or partner list and does not state endorsement, affiliation, or an official relationship with any named entity." },
  services: [
    { title: "Custom Software Development", description: "Custom software for your workflow, from internal automation to modular ERP and CRM platforms.", points: ["API & payment gateway integration", "Secure, modular architecture"] },
    { title: "Android WebView Services", description: "Turn your website into an official Android app ready for the Google Play Store.", points: ["Play Store ready", "1–2 day delivery"] },
    { title: "Modern Company Profiles", description: "Corporate websites with on-page SEO, fast performance, and direct sales team connections.", points: ["Optimized Core Web Vitals", "Dynamic schema & metadata"] },
    { title: "Custom Android Apps", description: "Native or cross-platform Android apps with stable performance and offline synchronization.", points: ["MVVM / clean architecture", "Offline-first database"] },
    { title: "Server & DevOps Management", description: "Server setup, hardening, tuning, and maintenance to protect your business uptime.", points: ["Hardening & Fail2ban", "Nginx, reverse proxy & backup"] },
    { title: "Maintenance & SLA", description: "Monitoring, security updates, encrypted backups, and long-term technical support.", points: ["Regular monitoring", "Priority incident response"] },
  ],
  workflow: { title: "A structured way of working", description: "A transparent agile process lets you follow project progress at every stage.", steps: [
    { title: "Discovery & Requirements", description: "We understand your business flow, users, and system needs, then create a clear Scope of Work." },
    { title: "System Design & Architecture", description: "We design the database, API, UI/UX, and server specifications for future growth." },
    { title: "Development & Quality Assurance", description: "Every module is built with clean code and tested for function, security, and performance." },
    { title: "Deployment, Training & Warranty", description: "We launch the system, guide your team, and include a bug-fix warranty period." },
  ] },
  standards: { title: "Our working standards", description: "Professional commitments applied to every project we deliver.", items: [
    { title: "Non-Disclosure Agreement", description: "We protect your business ideas, customer data, and software logic through a formal NDA." },
    { title: "Security from the Start", description: "Systems are designed to reduce common attack risks and API endpoint exposure." },
    { title: "Clean, Maintainable Code", description: "Organized, modular, and documented code makes future development easier." },
  ], commitments: [
    { title: "Full ownership", description: "Your company owns the code, repository, cloud accounts, and database access." },
    { title: "Transparent", description: "Scope, timeline, and costs are agreed upfront with no hidden fees." },
    { title: "Ongoing support", description: "Continued technical support after handover, including a bug-fix warranty." },
  ] },
  contact: { title: "Start building your system", description: "Contact our technical desk in Lamongan for a quick response and technical discovery.", office: "Office & technical desk", locationLabel: "Office location", location: companyAddress, locationNote: "Serving clients across Indonesia", emailLabel: "Correspondence email", hoursLabel: "Business hours", hours: "Monday — Saturday (08:30–20:00 WIB)", hoursNote: "24/7 emergency server service for SLA clients", ideaTitle: "Have a project in mind?", ideaDescription: "Tell us about your business challenge. Our technical team will help find a practical, secure, and scalable solution.", whatsapp: "Chat on WhatsApp", whatsappMessage: "Hello dibumi.com Lamongan team,\n\nI would like to discuss my project needs. Thank you!" },
  footer: { description: "An app and software production factory based in Lamongan, Indonesia. We help businesses build reliable software, mobile apps, and cloud infrastructure.", location: "Lamongan, East Java — Indonesia", address: companyAddress, legal: { terms: "Terms & Conditions", privacy: "Privacy Policy" }, services: "Services", company: "Company", contact: "Contact", serviceLinks: ["Custom Software Enterprise", "Android WebView Services", "Company Profile Websites", "Server & DevOps Management"], companyLinks: ["Methodology", "Working Standards", "Contact"], whatsapp: "WhatsApp consultation", copyright: "All rights reserved." },
  metadata: { title: "dibumi.com — App & Software Production Factory", description: "A strategic technology partner for custom software, Android apps, corporate websites, and server infrastructure." },
};

const ar: SiteContent = {
  nav: { services: "الخدمات", process: "المنهجية", standards: "المعايير", contact: "تواصل معنا", consultation: "استشارة", menu: "قائمة التنقل" },
  hero: { eyebrow: "شركة برمجيات واستشارات تقنية في لامونجان", title: "تقنية تساعد أعمالك على النمو المستمر.", description: "نصمم البرمجيات والتطبيقات والمواقع التي تبسّط العمل وتدعم خطوتك التجارية القادمة.", consultation: "احجز استشارة", services: "استكشف الخدمات", imageAlt: "مساحة عمل لتطوير البرمجيات تضم حاسوباً ومعدات تقنية", caption: "حلول رقمية مصممة بعناية." },
  servicesSection: { title: "ما نقدمه", description: "ينفذها مهندسو برمجيات ذوو خبرة، من الأنظمة الأساسية إلى البنية التحتية للخوادم.", consult: "ناقش مشروعك" },
  platforms: { title: "منصات وقنوات سبق استخدامها", description: "مجموعة من الأسماء ضمن منظومة رقمية سبق أن استخدمناها أو صادفناها أثناء العمل والاستكشاف التقني.", names: ["UC Browser / UCWeb", "BuzzCity", "PropellerAds", "Zeedsharia", "Motmaina.com"], disclaimer: "تُعرض الأسماء كمرجع فقط إلى منصات أو قنوات سبق استخدامها. هذا القسم ليس قائمة عملاء أو شركاء، ولا يفيد بوجود تأييد أو ارتباط أو علاقة رسمية مع أي جهة مذكورة." },
  services: [
    { title: "تطوير برمجيات مخصصة", description: "برمجيات مخصصة لسير عملك، من الأتمتة الداخلية إلى منصات ERP وCRM المرنة.", points: ["تكامل API وبوابات الدفع", "بنية آمنة ومرنة"] },
    { title: "خدمات Android WebView", description: "حوّل موقعك إلى تطبيق Android رسمي جاهز للنشر على Google Play.", points: ["جاهز للمتجر", "تسليم خلال يوم أو يومين"] },
    { title: "موقع شركة عصري", description: "مواقع شركات سريعة مع تحسين SEO وربط مباشر بفريق المبيعات.", points: ["أداء Core Web Vitals ممتاز", "بيانات وصفية ديناميكية"] },
    { title: "تطبيقات Android مخصصة", description: "تطبيقات أصلية أو متعددة المنصات بأداء مستقر ومزامنة دون اتصال.", points: ["بنية MVVM نظيفة", "قاعدة بيانات تعمل دون اتصال"] },
    { title: "إدارة الخوادم وDevOps", description: "إعداد وتأمين وصيانة الخوادم للحفاظ على استمرارية أعمالك.", points: ["تقوية وحماية Fail2ban", "Nginx والنسخ الاحتياطي"] },
    { title: "الصيانة وSLA", description: "مراقبة وتحديثات أمنية ونسخ احتياطية ودعم تقني طويل الأمد.", points: ["مراقبة دورية", "استجابة أولوية للحوادث"] },
  ],
  workflow: { title: "منهجية عمل منظمة", description: "منهجية Agile شفافة تتيح لك متابعة تقدم المشروع في كل مرحلة.", steps: [
    { title: "الاستكشاف والمتطلبات", description: "نفهم أعمالك ومستخدميك واحتياجات النظام، ثم نعد نطاق عمل واضحاً." },
    { title: "تصميم النظام والبنية", description: "نصمم قاعدة البيانات وواجهات API وتجربة المستخدم ومواصفات الخادم." },
    { title: "التطوير وضمان الجودة", description: "نبني كل وحدة بكود نظيف ونختبر الوظائف والأمان والأداء." },
    { title: "الإطلاق والتدريب والضمان", description: "نطلق النظام وندرب فريقك ونقدم فترة ضمان لإصلاح الأخطاء." },
  ] },
  standards: { title: "معايير عملنا", description: "التزامات مهنية نطبقها في كل مشروع نقدمه.", items: [
    { title: "اتفاقية عدم الإفصاح", description: "نحمي أفكارك وبيانات عملائك ومنطق برنامجك عبر اتفاقية رسمية." },
    { title: "الأمان منذ البداية", description: "نصمم الأنظمة لتقليل مخاطر الهجمات الشائعة وتسرب نقاط API." },
    { title: "كود نظيف وسهل الصيانة", description: "كود منظم ومرن وموثق يسهل تطويره مستقبلاً." },
  ], commitments: [
    { title: "ملكية كاملة", description: "تمتلك شركتك الكود والمستودع وحسابات السحابة وقاعدة البيانات." },
    { title: "شفافية", description: "نتفق على النطاق والجدول والتكلفة مسبقاً دون رسوم مخفية." },
    { title: "دعم مستمر", description: "دعم تقني بعد التسليم، مع ضمان لإصلاح الأخطاء." },
  ] },
  contact: { title: "ابدأ بناء نظامك", description: "تواصل مع مكتبنا التقني في لامونجان للحصول على رد سريع وتحليل تقني.", office: "المكتب والمكتب التقني", locationLabel: "موقع المكتب", location: companyAddress, locationNote: "نخدم العملاء في جميع أنحاء إندونيسيا", emailLabel: "البريد الإلكتروني", hoursLabel: "ساعات العمل", hours: "الإثنين — السبت (08:30–20:00 WIB)", hoursNote: "خدمة طوارئ الخوادم متاحة 24/7 لعملاء SLA", ideaTitle: "لديك مشروع؟", ideaDescription: "شاركنا تحدي عملك. سيساعدك فريقنا التقني في إيجاد حل عملي وآمن وقابل للتوسع.", whatsapp: "تحدث عبر WhatsApp", whatsappMessage: "مرحباً فريق dibumi.com في لامونجان،\n\nأرغب في مناقشة احتياجات مشروعي. شكراً!" },
  footer: { description: "شركة برمجيات واستشارات تقنية مقرها لامونجان، إندونيسيا. نساعد الشركات على بناء البرمجيات والتطبيقات والبنية السحابية الموثوقة.", location: "لامونجان، جاوة الشرقية — إندونيسيا", address: companyAddress, legal: { terms: "الشروط والأحكام", privacy: "سياسة الخصوصية" }, services: "الخدمات", company: "الشركة", contact: "تواصل معنا", serviceLinks: ["تطوير برمجيات مخصصة", "خدمات Android WebView", "مواقع الشركات", "إدارة الخوادم وDevOps"], companyLinks: ["المنهجية", "معايير العمل", "تواصل معنا"], whatsapp: "استشارة عبر WhatsApp", copyright: "جميع الحقوق محفوظة." },
  metadata: { title: "dibumi.com — شريك البرمجيات والبنية السحابية", description: "شريكك التقني لتطوير البرمجيات والتطبيقات والمواقع والبنية التحتية." },
};

const zh: SiteContent = {
  nav: { services: "服务", process: "流程", standards: "标准", contact: "联系我们", consultation: "咨询", menu: "导航菜单" },
  hero: { eyebrow: "拉蒙岸软件公司与 IT 咨询服务", title: "让技术推动业务持续成长。", description: "我们设计软件、应用和网站，简化工作流程，支持企业的下一步发展。", consultation: "开始咨询", services: "查看服务", imageAlt: "配有笔记本电脑和技术设备的软件开发工作空间", caption: "用心设计数字化解决方案。" },
  servicesSection: { title: "我们提供的服务", description: "由经验丰富的软件工程师直接交付，从核心业务系统到服务器基础设施。", consult: "讨论项目" },
  platforms: { title: "曾使用的平台与渠道", description: "数字生态中一些我们在工作和技术探索过程中使用过或接触过的名称。", names: ["UC Browser / UCWeb", "BuzzCity", "PropellerAds", "Zeedsharia", "Motmaina.com"], disclaimer: "这些名称仅作为曾使用过的平台或渠道的参考。本部分不是客户或合作伙伴名单，也不表示与所列实体存在认可、隶属关系或正式合作关系。" },
  services: [
    { title: "定制软件开发", description: "根据您的业务流程定制软件，从内部自动化到模块化 ERP 和 CRM 平台。", points: ["API 与支付网关集成", "安全、模块化架构"] },
    { title: "Android WebView 服务", description: "将网站转换为可发布到 Google Play 的官方 Android 应用。", points: ["支持上架 Play Store", "1–2 天交付"] },
    { title: "现代企业官网", description: "拥有页面 SEO、快速性能和销售团队直连功能的企业网站。", points: ["优化 Core Web Vitals", "动态 Schema 与元数据"] },
    { title: "定制 Android 应用", description: "原生或跨平台 Android 应用，性能稳定并支持离线同步。", points: ["MVVM / 清晰架构", "离线优先数据库"] },
    { title: "服务器与 DevOps 管理", description: "服务器部署、安全加固、性能调优和维护，保障业务稳定运行。", points: ["安全加固与 Fail2ban", "Nginx、反向代理与备份"] },
    { title: "维护与 SLA", description: "持续监控、安全更新、加密备份和长期技术支持。", points: ["定期监控", "优先处理紧急事件"] },
  ],
  workflow: { title: "结构化工作流程", description: "透明的敏捷流程，让您随时了解项目进展。", steps: [
    { title: "需求发现与分析", description: "了解您的业务流程、用户和系统需求，制定清晰的工作范围。" },
    { title: "系统设计与架构", description: "规划数据库、API、UI/UX 和服务器规格，为未来增长做好准备。" },
    { title: "开发与质量保障", description: "采用整洁代码开发每个模块，并测试功能、安全和性能。" },
    { title: "部署、培训与保障", description: "完成系统上线，培训您的团队，并提供缺陷修复保障期。" },
  ] },
  standards: { title: "我们的工作标准", description: "我们在每个项目中坚持的专业承诺。", items: [
    { title: "保密协议（NDA）", description: "通过正式协议保护您的商业创意、客户数据和软件逻辑。" },
    { title: "安全从一开始", description: "从设计阶段降低常见攻击风险和 API 端点暴露风险。" },
    { title: "整洁且易维护的代码", description: "结构清晰、模块化并有文档的代码，方便未来持续开发。" },
  ], commitments: [
    { title: "完整所有权", description: "代码、仓库、云账户和数据库访问权均属于您的公司。" },
    { title: "透明合作", description: "提前确认范围、时间和费用，没有隐藏收费。" },
    { title: "持续支持", description: "交付后继续提供技术支持，并包含缺陷修复保障。" },
  ] },
  contact: { title: "开始构建您的系统", description: "联系我们位于拉蒙岸的技术团队，快速获得响应和技术需求分析。", office: "办公室与技术团队", locationLabel: "办公地点", location: companyAddress, locationNote: "服务印度尼西亚各地客户", emailLabel: "联系邮箱", hoursLabel: "工作时间", hours: "周一至周六（08:30–20:00 WIB）", hoursNote: "SLA 客户享有 24/7 服务器紧急服务", ideaTitle: "有项目需求？", ideaDescription: "告诉我们您的业务挑战。我们的技术团队将帮助您找到实用、安全且可扩展的方案。", whatsapp: "通过 WhatsApp 联系", whatsappMessage: "您好，dibumi.com 拉蒙岸团队：\n\n我想咨询项目需求。谢谢！" },
  footer: { description: "一家位于印度尼西亚拉蒙岸的软件公司与 IT 咨询机构，帮助企业构建可靠的软件、移动应用和云基础设施。", location: "印度尼西亚东爪哇拉蒙岸", address: companyAddress, legal: { terms: "条款与条件", privacy: "隐私政策" }, services: "服务", company: "公司", contact: "联系", serviceLinks: ["定制软件开发", "Android WebView 服务", "企业官网", "服务器与 DevOps 管理"], companyLinks: ["工作流程", "工作标准", "联系我们"], whatsapp: "WhatsApp 咨询", copyright: "版权所有。" },
  metadata: { title: "dibumi.com — 软件公司与云 DevOps 合作伙伴", description: "为定制软件、Android 应用、企业网站和服务器基础设施提供技术支持。" },
};

const pl: SiteContent = {
  nav: { services: "Usługi", process: "Proces", standards: "Standardy", contact: "Kontakt", consultation: "Konsultacja", menu: "Menu nawigacji" },
  hero: { eyebrow: "Fabryka produkcji aplikacji i oprogramowania w Lamongan", title: "Technologia dla firm, które stale się rozwijają.", description: "Projektujemy oprogramowanie, aplikacje i strony internetowe, które upraszczają pracę i wspierają kolejny krok Twojej firmy.", consultation: "Konsultacja", services: "Zobacz usługi", imageAlt: "Przestrzeń pracy zespołu tworzącego oprogramowanie z laptopem i sprzętem technicznym", caption: "Rozwiązania cyfrowe zaprojektowane z dbałością." },
  servicesSection: { title: "Co robimy", description: "Realizowane bezpośrednio przez doświadczonych inżynierów oprogramowania, od systemów biznesowych po infrastrukturę serwerową.", consult: "Porozmawiaj o projekcie" },
  platforms: { title: "Platformy i kanały, z których korzystaliśmy", description: "Wybrane nazwy z ekosystemu cyfrowego, z których korzystaliśmy lub które napotkaliśmy podczas pracy i eksploracji technicznej.", names: ["UC Browser / UCWeb", "BuzzCity", "PropellerAds", "Zeedsharia", "Motmaina.com"], disclaimer: "Nazwy są podane wyłącznie jako odniesienia do używanych platform lub kanałów. To nie jest lista klientów ani partnerów i nie oznacza poparcia, afiliacji ani oficjalnej relacji z wymienionymi podmiotami." },
  services: [
    { title: "Dedykowane oprogramowanie", description: "Oprogramowanie dopasowane do Twojego procesu, od automatyzacji po modułowe systemy ERP i CRM.", points: ["Integracje API i płatności", "Bezpieczna, modułowa architektura"] },
    { title: "Usługi Android WebView", description: "Zamieniamy stronę internetową w oficjalną aplikację Android gotową do publikacji w Google Play.", points: ["Gotowe do Play Store", "Realizacja w 1–2 dni"] },
    { title: "Nowoczesne strony firmowe", description: "Strony korporacyjne z SEO, szybkim działaniem i bezpośrednim kontaktem z zespołem sprzedaży.", points: ["Zoptymalizowane Core Web Vitals", "Dynamiczne schema i meta dane"] },
    { title: "Dedykowane aplikacje Android", description: "Natywne lub wieloplatformowe aplikacje Android ze stabilnym działaniem i synchronizacją offline.", points: ["MVVM / clean architecture", "Baza danych offline-first"] },
    { title: "Serwery i DevOps", description: "Konfiguracja, zabezpieczenie, optymalizacja i utrzymanie serwerów dla ciągłości biznesu.", points: ["Hardening i Fail2ban", "Nginx, reverse proxy i backup"] },
    { title: "Maintenance i SLA", description: "Monitoring, aktualizacje bezpieczeństwa, szyfrowane kopie i długoterminowe wsparcie.", points: ["Regularny monitoring", "Priorytetowa reakcja na awarie"] },
  ],
  workflow: { title: "Uporządkowany proces pracy", description: "Przejrzysta metodyka Agile pozwala śledzić postęp projektu na każdym etapie.", steps: [
    { title: "Odkrywanie i wymagania", description: "Poznajemy procesy, użytkowników i potrzeby systemu, a następnie przygotowujemy jasny zakres prac." },
    { title: "Projekt systemu i architektura", description: "Projektujemy bazę danych, API, UI/UX i specyfikację serwera z myślą o rozwoju." },
    { title: "Development i jakość", description: "Każdy moduł powstaje zgodnie z zasadami clean code i przechodzi testy funkcjonalne, bezpieczeństwa i wydajności." },
    { title: "Wdrożenie, szkolenie i gwarancja", description: "Uruchamiamy system, szkolimy zespół i zapewniamy okres gwarancyjny na poprawki błędów." },
  ] },
  standards: { title: "Nasze standardy pracy", description: "Profesjonalne zobowiązania, których przestrzegamy w każdym projekcie.", items: [
    { title: "Umowa poufności (NDA)", description: "Chronimy pomysły biznesowe, dane klientów i logikę oprogramowania formalną umową NDA." },
    { title: "Bezpieczeństwo od początku", description: "Projektujemy systemy tak, aby ograniczyć typowe ryzyka ataków i wycieku endpointów API." },
    { title: "Czysty i łatwy w utrzymaniu kod", description: "Uporządkowany, modułowy i udokumentowany kod ułatwia dalszy rozwój." },
  ], commitments: [
    { title: "Pełna własność", description: "Twoja firma otrzymuje kod, repozytorium, konta chmurowe i dostęp do bazy danych." },
    { title: "Przejrzystość", description: "Zakres, harmonogram i koszty ustalamy z góry, bez ukrytych opłat." },
    { title: "Stałe wsparcie", description: "Zapewniamy wsparcie techniczne po wdrożeniu oraz gwarancję na poprawki błędów." },
  ] },
  contact: { title: "Zacznijmy budować Twój system", description: "Skontaktuj się z naszym zespołem technicznym w Lamongan, aby szybko omówić potrzeby projektu.", office: "Biuro i zespół techniczny", locationLabel: "Lokalizacja biura", location: companyAddress, locationNote: "Obsługujemy klientów w całej Indonezji", emailLabel: "Adres e-mail", hoursLabel: "Godziny pracy", hours: "Poniedziałek — sobota (08:30–20:00 WIB)", hoursNote: "Awaryjna obsługa serwerów 24/7 dla klientów SLA", ideaTitle: "Masz pomysł na projekt?", ideaDescription: "Opowiedz nam o wyzwaniu biznesowym. Pomożemy znaleźć praktyczne, bezpieczne i skalowalne rozwiązanie.", whatsapp: "Napisz na WhatsApp", whatsappMessage: "Dzień dobry, zespole dibumi.com Lamongan,\n\nChcę porozmawiać o potrzebach mojego projektu. Dziękuję!" },
  footer: { description: "Fabryka produkcji aplikacji i oprogramowania z siedzibą w Lamongan, Indonezja. Pomagamy firmom budować niezawodne oprogramowanie, aplikacje mobilne i infrastrukturę chmurową.", location: "Lamongan, Jawa Wschodnia — Indonezja", address: companyAddress, legal: { terms: "Regulamin", privacy: "Polityka prywatności" }, services: "Usługi", company: "Firma", contact: "Kontakt", serviceLinks: ["Dedykowane oprogramowanie", "Usługi Android WebView", "Strony firmowe", "Serwery i DevOps"], companyLinks: ["Metodologia", "Standardy pracy", "Kontakt"], whatsapp: "Konsultacja WhatsApp", copyright: "Wszelkie prawa zastrzeżone." },
  metadata: { title: "dibumi.com — Fabryka aplikacji i oprogramowania", description: "Partner technologiczny w zakresie dedykowanego oprogramowania, aplikacji Android, stron firmowych i infrastruktury serwerowej." },
};

const dictionaries: Record<Locale, SiteContent> = { id, en, ar, zh, pl };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): SiteContent {
  return dictionaries[locale];
}
