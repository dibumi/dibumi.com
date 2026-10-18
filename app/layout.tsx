import type { Metadata, Viewport } from "next";
import { Geist_Mono, IBM_Plex_Sans_Arabic, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { locales } from "@/lib/i18n";

// Geist Mono dipakai untuk seluruh teks, sama seperti situs referensi.
const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

// Geist Mono tidak punya glyph Arab dan CJK, jadi dua locale ini memakai
// font pendamping agar teks tetap terbaca.
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
  themeColor: "#0a7668",
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
      className={`${mono.variable} ${arabic.variable} ${chinese.variable} scroll-smooth motion-reduce:scroll-auto`}
    >
      <body className="bg-canvas text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
