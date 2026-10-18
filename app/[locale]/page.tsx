import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Clients from "@/components/Clients";
import WorkflowMethodology from "@/components/WorkflowMethodology";
import Standards from "@/components/Standards";
import ContactSection from "@/components/ContactSection";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

type LocalePageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getDictionary(locale);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((item) => [item, `/${item}`])),
        "x-default": "/en",
      },
    },
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      locale:
        locale === "zh"
          ? "zh_CN"
          : locale === "ar"
            ? "ar"
            : locale === "pl"
              ? "pl_PL"
              : locale === "en"
                ? "en_US"
                : "id_ID",
    },
  };
}

export default async function LocalizedHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getDictionary(locale);
  const basePath = `/${locale}`;

  return (
    <>
      <Hero content={content} basePath={basePath} />
      <Highlights content={content.highlights} />
      <Services content={content} basePath={basePath} />
      <Products content={content} />
      <Clients content={content.clients} />
      <WorkflowMethodology content={content.workflow} />
      <Standards content={content.standards} />
      <ContactSection content={content.contact} locale={locale} />
    </>
  );
}
