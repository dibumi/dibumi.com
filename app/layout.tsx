import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic, IBM_Plex_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

// Variable font: weight axis spans 100-700, so font-extrabold clamps to 700.
const sans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

const sansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-sans-ar",
});

const sansChinese = Noto_Sans_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-zh",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-mono-plex",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dibumi.com"),
  title: "dibumi.com — Pabrik Produksi Aplikasi & Software | Lamongan, Indonesia",
  description:
    "Pabrik produksi aplikasi dan software terpercaya di Lamongan, Indonesia. Melayani Custom Software Development, Company Profile Korporat, Aplikasi Android Native, Jasa WebView Android (Play Store Ready), dan Kelola Server & DevOps.",
  keywords: [
    "pabrik produksi aplikasi dan software",
    "software lamongan",
    "jasa pembuatan aplikasi lamongan",
    "custom software development indonesia",
    "jasa pembuatan webview android",
    "kelola server devops",
    "jasa pembuatan aplikasi android",
    "jasa company profile perusahaan",
    "it consultant indonesia",
    "dibumi",
    "dibumi.com",
  ],
  authors: [{ name: "dibumi.com — Pabrik Produksi Aplikasi & Software" }],
  openGraph: {
    title: "dibumi.com — Pabrik Produksi Aplikasi & Software",
    description:
      "Partner teknologi strategis berbasis di Lamongan, Indonesia. Menghadirkan solusi Custom Software, Android App, WebView Play Store, Website Korporat, dan Infrastruktur Server berstandar enterprise.",
    url: "https://dibumi.com",
    siteName: "dibumi.com",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dibumi.com — Pabrik Produksi Aplikasi & Software",
    description:
      "Solusi rekayasa digital terpercaya: Custom Software, Android, WebView, Website Korporat, dan Manajemen Server.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1A74B4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${sans.variable} ${sansArabic.variable} ${sansChinese.variable} ${mono.variable} scroll-smooth motion-reduce:scroll-auto`}
    >
      <body className="font-sans antialiased text-slate-900 bg-brand-50">
        {children}
      </body>
    </html>
  );
}
