import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HtmlLangSync from "@/components/HtmlLangSync";
import { getDictionary, getDirection, isLocale, locales, type Locale } from "@/lib/i18n";

const localeFontClass: Record<Locale, string> = {
  en: "font-sans",
  id: "font-sans",
  pl: "font-sans",
  ar: "font-ar",
  zh: "font-zh",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getDictionary(locale);
  const basePath = `/${locale}`;

  return (
    <div lang={locale} dir={getDirection(locale)} className={localeFontClass[locale]}>
      <HtmlLangSync locale={locale} />
      <div className="bg-paper-white flex min-h-dvh flex-col">
        <Navbar locale={locale} content={content} basePath={basePath} />
        <main className="flex-grow">{children}</main>
        <Footer content={content} locale={locale} basePath={basePath} />
      </div>
    </div>
  );
}
