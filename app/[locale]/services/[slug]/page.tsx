import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { isServiceSlug, serviceMeta } from "@/lib/services";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

type ServicePageProps = { params: Promise<{ locale: string; slug: string }> };

/**
 * Tujuh layanan × lima locale, semuanya dibangun di build time. Slug di luar
 * daftar itu tidak dirender sebagai halaman dinamis, jadi URL karangan langsung
 * 404 alih-alih menghasilkan halaman kosong yang ikut terindeks.
 *
 * `false` juga yang membuat 404 ini bisa disajikan: slug karangan berhenti di
 * lapisan routing, jadi yang menjawab adalah `app/global-not-found.tsx` — satu
 * halaman yang dirender penuh di server. Kalau nilainya `true`, slug karangan
 * masuk ke rute ini, memanggil `notFound()`, dan 404-nya diserahkan ke batas
 * error React: Next mengirim `<html id="__next_error__">` lalu merendernya di
 * klien. Artinya `lang`/`dir` hilang dari dokumen dan halaman 404 baru muncul
 * setelah JavaScript jalan. Untuk situs lima bahasa itu justru regresi.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceMeta.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isServiceSlug(slug)) return {};

  const content = getDictionary(locale);
  const index = serviceMeta.findIndex((item) => item.slug === slug);
  const service = content.services[index];

  return {
    title: `${service.title} | dibumi.com`,
    description: service.description,
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((item) => [item, `/${item}/services/${slug}`]),
        ),
        "x-default": `/en/services/${slug}`,
      },
    },
    openGraph: {
      title: service.title,
      description: service.description,
      type: "website",
    },
  };
}

export default async function ServiceRoute({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isServiceSlug(slug)) notFound();

  const content = getDictionary(locale);

  return <ServicePage content={content} basePath={`/${locale}`} slug={slug} />;
}