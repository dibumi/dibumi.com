import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const baseUrl = "https://dibumi.com";

/** Semua rute statis untuk setiap locale, lengkap dengan hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/teams", "/privacy", "/terms"] as const;
  const languages = Object.fromEntries(locales.map((locale) => [locale, locale]));

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("monthly" as const) : ("yearly" as const),
      priority: path === "" ? 1 : path === "/teams" ? 0.6 : 0.4,
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
    })),
  );
}
