import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import ClientMarquee from "@/components/ClientMarquee";
import Products from "@/components/Products";
import Highlights from "@/components/Highlights";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
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

/**
 * Urutan section mengikuti ritme halaman referensi: pita terang dan gelap
 * bergantian, dengan satu pita berwarna sebagai jeda editorial.
 *
 *   hero (putih + wash)  -> marquee klien
 *   produk (fog)         -> showcase artifact
 *   highlights (putih)   -> tiga kartu, yang pertama peach
 *   klien (peach)        -> pita editorial
 *   layanan (ink)        -> pita gelap
 *   proses (putih)       -> rail empat langkah
 *   standar (putih)      -> baris hairline
 *   kontak (putih+wash)  -> penutup
 *
 * Tanpa pita gelap dan pita peach, halaman jadi satu warna dari atas ke bawah
 * dan tidak punya titik henti untuk mata.
 */
export default async function LocalizedHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getDictionary(locale);
  const basePath = `/${locale}`;

  return (
    <>
      <Hero content={content} basePath={basePath} />
      <ClientMarquee content={content.clients} />
      <Products content={content} />
      <Highlights content={content.highlights} />
      <Clients content={content.clients} locale={locale} />
      <Services content={content} basePath={basePath} />
      <WorkflowMethodology content={content.workflow} />
      <Standards content={content.standards} />
      <ContactSection content={content} basePath={basePath} />
    </>
  );
}
