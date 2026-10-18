import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalLayout from "@/components/LegalLayout";
import { isLocale, locales } from "@/lib/i18n";
import { getLegal } from "@/lib/legal";

type LocalePageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { content } = getLegal(locale, "privacy");

  return {
    title: `${content.title} | dibumi.com`,
    description: content.intro,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        ...Object.fromEntries(locales.map((item) => [item, `/${item}/privacy`])),
        "x-default": "/en/privacy",
      },
    },
  };
}

export default async function PrivacyPage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { content, isFallback } = getLegal(locale, "privacy");

  return <LegalLayout locale={locale} content={content} isFallback={isFallback} />;
}
