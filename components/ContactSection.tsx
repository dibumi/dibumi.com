import React from "react";
import { ArrowUpRight, Clock, Mail, MapPin, MessageSquare } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import type { Locale, SiteContent } from "@/lib/i18n";

export default function ContactSection({
  content,
  locale,
}: {
  content: SiteContent["contact"];
  locale: Locale;
}) {
  const whatsappUrl = `https://wa.me/6285607100255?text=${encodeURIComponent(content.whatsappMessage)}`;

  const infoRows = [
    {
      Icon: MapPin,
      label: content.locationLabel,
      value: content.location,
      note: content.locationNote,
    },
    {
      Icon: Mail,
      label: content.emailLabel,
      value: "fatkul@dibumi.com",
      href: "mailto:fatkul@dibumi.com",
    },
    {
      Icon: Clock,
      label: content.hoursLabel,
      value: content.hours,
      note: content.hoursNote,
    },
  ];

  return (
    <section id="contact" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {/* Info kantor + CTA WhatsApp */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="border-line bg-surface rounded-2xl border p-6 sm:p-7">
              <h3 className="text-ink mb-5 text-base font-semibold">{content.office}</h3>

              <div className="space-y-5">
                {infoRows.map(({ Icon, label, value, note, href }) => (
                  <div key={label} className="flex items-start gap-3.5 text-sm">
                    <span className="bg-primary-soft text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                      <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-muted mb-0.5 text-xs">{label}</div>
                      {href ? (
                        <a href={href} className="text-primary font-medium hover:underline">
                          {value}
                        </a>
                      ) : (
                        <div className="text-ink font-medium leading-6">{value}</div>
                      )}
                      {note && <div className="text-muted mt-0.5 text-xs leading-5">{note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary relative overflow-hidden rounded-2xl p-6 text-white sm:p-7">
              <div className="bg-panel-glow absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <MessageSquare className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold tracking-tight">{content.ideaTitle}</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">{content.ideaDescription}</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-between gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
                >
                  <span>{content.whatsapp}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Formulir */}
          <div className="border-line bg-surface rounded-2xl border p-6 sm:p-8 lg:col-span-7">
            <h3 className="text-ink mb-6 text-lg font-semibold tracking-tight">
              {content.form.title}
            </h3>
            <ContactForm content={content.form} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
