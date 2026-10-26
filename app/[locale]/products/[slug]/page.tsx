import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import NgambegPage from "@/components/NgambegPage";
import {
  isPlatformSlug,
  isProductSlug,
  ngambegSlug,
  platformProducts,
  productSlugs,
} from "@/lib/products";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

type ProductPageProps = { params: Promise<{ locale: string; slug: string }> };

/**
 * Tujuh alamat produk × lima locale, semuanya dibangun di build time. Slug di
 * luar daftar itu tidak dirender sebagai halaman dinamis, jadi URL karangan
 * langsung 404 alih-alih menghasilkan halaman kosong yang ikut terindeks.
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
    productSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProductSlug(slug)) return {};

  const content = getDictionary(locale);

  let title: string;
  let description: string;

  if (slug === ngambegSlug) {
    const group = content.products.groups.ngambeg;
    title = `${group.label} | dibumi.com`;
    description = group.description;
  } else {
    const item = platformProducts.find((product) => product.slug === slug);
    if (!item) return {};
    title = `${item.name} | dibumi.com`;
    description = content.products.platforms[item.id].description;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/products/${slug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((item) => [item, `/${item}/products/${slug}`]),
        ),
        "x-default": `/en/products/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function ProductRoute({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProductSlug(slug)) notFound();

  const content = getDictionary(locale);

  if (slug === ngambegSlug) {
    return <NgambegPage content={content} basePath={`/${locale}`} />;
  }

  if (!isPlatformSlug(slug)) notFound();

  return <ProductPage content={content} basePath={`/${locale}`} slug={slug} />;
}