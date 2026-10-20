import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { LegalContent } from "@/lib/legal";

export default function LegalLayout({
  locale,
  content,
  isFallback = false,
}: {
  locale: Locale;
  content: LegalContent;
  isFallback?: boolean;
}) {
  const dict = getDictionary(locale);

  return (
    <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
      <Link
        href={`/${locale}`}
        className="text-muted hover:text-primary mb-8 inline-flex items-center gap-2 text-xs font-medium transition"
      >
        <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
        <BrandMark className="text-primary h-4 w-4" />
        dibumi.com
      </Link>

      <header className="border-line mb-10 border-b pb-8">
        <p className="text-primary flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
          <FileText className="h-4 w-4" aria-hidden="true" />
          {dict.footer.legal}
        </p>
        <h1 className="text-ink mt-4 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          {content.title}
        </h1>
        <p className="text-muted mt-3 text-xs">
          {dict.legal.updated}: {content.updated}
        </p>

        {isFallback && (
          <p className="border-line bg-elevated text-muted mt-5 rounded-lg border px-3 py-2 text-xs leading-5">
            {dict.legal.englishOnly}
          </p>
        )}
      </header>

      <p className="text-ink text-base leading-8">{content.intro}</p>

      <div className="mt-10 space-y-9">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-ink mb-3 text-lg font-semibold tracking-tight">
              {section.heading}
            </h2>
            <div className="space-y-3">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted text-sm leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
