import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamPage from "@/components/TeamPage";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

type LocalePageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = getDictionary(locale).teamPage;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/${locale}/teams`,
      languages: {
        ...Object.fromEntries(locales.map((item) => [item, `/${item}/teams`])),
        "x-default": "/en/teams",
      },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function TeamRoute({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getDictionary(locale);

  return <TeamPage content={content} basePath={`/${locale}`} />;
}
