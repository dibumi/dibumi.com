import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { productSlugs, productPath } from "@/lib/products";
import { serviceMeta, servicePath } from "@/lib/services";

const baseUrl = "https://dibumi.com";

/**
 * Semua rute statis untuk setiap locale, lengkap dengan hreflang.
 *
 * Halaman layanan ikut di sini karena merekalah halaman yang paling mungkin
 * dicari orang ("jasa webview android", "kelola server devops"), dan tanpa
 * entri sitemap mereka hanya bisa ditemukan lewat mega menu.
 *
 * Halaman produk juga ikut karena menu, footer, dan panel Products di beranda
 * semuanya menaut ke sana.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const servicePaths = serviceMeta.map(({ slug }) => servicePath(slug));
  const productPaths = productSlugs.map(productPath);
  const paths = [
    "",
    "/teams",
    "/privacy",
    "/terms",
    ...servicePaths,
    ...productPaths,
  ];
  const languages = Object.fromEntries(locales.map((locale) => [locale, locale]));

  return locales.flatMap((locale) =>
    paths.map((path) => {
      const isService = path.startsWith("/services/");
      const isProduct = path.startsWith("/products/");

      return {
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency:
          path === "" || isService || isProduct
            ? ("monthly" as const)
            : ("yearly" as const),
        priority:
          path === "" ? 1 : isService ? 0.7 : isProduct || path === "/teams" ? 0.6 : 0.4,
        alternates: {
          languages: {
            ...Object.fromEntries(
              Object.entries(languages).map(([code, segment]) => [
                code,
                `${baseUrl}/${segment}${path}`,
              ]),
            ),
            "x-default": `${baseUrl}/en${path}`,
          },
        },
      };
    }),
  );
}
