import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { LegalContent } from "@/lib/legal";

const localeFontClass: Record<Locale, string> = {
  id: "font-sans",
  en: "font-sans",
  pl: "font-sans",
  ar: "font-ar",
  zh: "font-zh",
};

export default function LegalLayout({
  locale,
  content,
}: {
  locale: Locale;
  content: LegalContent;
}) {
  const dict = getDictionary(locale);
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <div lang={locale} dir={direction} className={localeFontClass[locale]}>
      <main className="flex min-h-screen flex-col justify-between bg-slate-50 text-slate-900 selection:bg-brand-100 selection:text-brand-950">
        <Navbar locale={locale} content={dict.nav} basePath={`/${locale}`} />
        <div className="flex-grow">
          <article className="mx-auto max-w-3xl px-6 pb-20 pt-32 sm:px-8 sm:pt-36">
            <header className="mb-10 border-b border-slate-200 pb-8">
              <h1 className="text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl">
                {content.title}
              </h1>
              <p className="mt-3 text-xs text-slate-500">
                Terakhir diperbarui: {content.updated}
              </p>
            </header>

            <p className="text-base leading-relaxed text-slate-700">
              {content.intro}
            </p>

            <div className="mt-10 space-y-9">
              {content.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">
                    {section.heading}
                  </h2>
                  <div className="space-y-3">
                    {section.paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-sm leading-7 text-slate-600"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
        <Footer content={dict.footer} />
      </main>
    </div>
  );
}
