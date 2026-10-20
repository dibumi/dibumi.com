import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Sans_Arabic,
  Inter,
  Noto_Sans_SC,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";
import { locales } from "@/lib/i18n";

/*
 * Dua wajah huruf, sesuai DESIGN.md.
 *
 * Signifier dan Sohne adalah lisensi komersial, jadi substitusinya Source
 * Serif 4 dan Inter. Source Serif 4 dimuat sebagai variable font supaya
 * display tetap bisa duduk di weight 400 di semua ukuran, dan italic-nya
 * tersedia untuk frasa miring di judul.
 */
const display = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Source Serif 4 dan Inter tidak punya glyph Arab dan CJK, jadi dua locale ini
// memakai font pendamping agar teks tetap terbaca.
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});

const chinese = Noto_Sans_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chinese",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dibumi.com"),
  title: "dibumi.com | App & Software Production Studio in Lamongan",
  description:
    "A software production studio in Lamongan, Indonesia. Custom software, Android apps, company websites, and server operations.",
  keywords: [
    "software production studio",
    "software house lamongan",
    "custom software development indonesia",
    "android app development indonesia",
    "android webview services",
    "server and devops management",
    "company profile website",
    "it consultant indonesia",
    "dibumi",
    "dibumi.com",
    "ngambeg cyber media",
  ],
  authors: [{ name: "dibumi.com — App & Software Production Studio" }],
  alternates: {
    canonical: "/en",
    languages: {
      ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])),
      "x-default": "/en",
    },
  },
  openGraph: {
    title: "dibumi.com | App & Software Production Studio",
    description:
      "A strategic technology partner based in Lamongan, Indonesia: custom software, Android apps, WebView builds for the Play Store, corporate websites, and enterprise-grade server operations.",
    url: "https://dibumi.com",
    siteName: "dibumi.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dibumi.com | App & Software Production Studio",
    description:
      "Digital engineering you can rely on: custom software, Android, WebView, corporate websites, and server management.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
      lang="en"
      className={`${display.variable} ${sans.variable} ${arabic.variable} ${chinese.variable} scroll-smooth motion-reduce:scroll-auto`}
    >
      <body className="bg-paper-white text-ink-black font-sans antialiased">{children}</body>
    </html>
  );
}
