import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Platforms from "@/components/Platforms";
import WorkflowMethodology from "@/components/WorkflowMethodology";
import Standards from "@/components/Standards";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

const localeFontClass: Record<Locale, string> = {
  id: "font-sans",
  en: "font-sans",
  pl: "font-sans",
  ar: "font-ar",
  zh: "font-zh",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
      languages: Object.fromEntries(locales.map((item) => [item, `/${item}`])),
    },
    openGraph: { locale: locale === "zh" ? "zh_CN" : locale === "ar" ? "ar" : locale === "pl" ? "pl_PL" : locale === "en" ? "en_US" : "id_ID" },
  };
}

export default async function LocalizedHomePage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const content = getDictionary(localeParam);
  const direction = localeParam === "ar" ? "rtl" : "ltr";

  return (
    <div lang={localeParam} dir={direction} className={localeFontClass[localeParam]}>
      <main className="flex min-h-screen flex-col justify-between bg-brand-50 text-slate-900 selection:bg-brand-100 selection:text-brand-900">
        <Navbar locale={localeParam} content={content.nav} />
        <div className="flex-grow">
          <Hero content={content.hero} />
          <Services content={content} />
          <Platforms content={content.platforms} />
          <WorkflowMethodology content={content.workflow} />
          <Standards content={content.standards} />
          <ContactSection content={content.contact} />
        </div>
        <Footer content={content.footer} />
      </main>
    </div>
  );
}
