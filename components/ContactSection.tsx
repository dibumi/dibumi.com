import React from "react";
import { MessageSquare, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/i18n";

export default function ContactSection({ content }: { content: SiteContent["contact"] }) {
  const whatsappUrl = `https://wa.me/6285607100255?text=${encodeURIComponent(content.whatsappMessage)}`;

  type InfoRow = {
    Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    label: string;
    value: string;
    note?: string | null;
    href?: string;
  };

  const infoRows: InfoRow[] = [
    { Icon: MapPin, label: content.locationLabel, value: content.location, note: content.locationNote },
    { Icon: Mail, label: content.emailLabel, value: "fatkul@dibumi.com", href: "mailto:fatkul@dibumi.com" },
    { Icon: Clock, label: content.hoursLabel, value: content.hours, note: content.hoursNote },
  ];

  return (
    <section id="contact" className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <h2 className="mb-4 text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl">
            {content.title}
          </h2>
          <p className="text-base leading-relaxed text-slate-600">{content.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="order-last lg:order-none lg:col-span-7">
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h3 className="mb-5 text-lg font-bold text-slate-900">{content.office}</h3>

              <div className="space-y-5">
                {infoRows.map(({ Icon, label, value, note, href }) => (
                  <div key={label} className="flex items-start gap-3.5 text-sm">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-800">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <div>
                      <div className="mb-0.5 text-xs text-slate-500">{label}</div>
                      {href ? (
                        <a href={href} className="font-medium text-brand-700 hover:underline">
                          {value}
                        </a>
                      ) : (
                        <div className="font-medium text-slate-900">{value}</div>
                      )}
                      {note && <div className="mt-0.5 text-xs text-slate-500">{note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative order-first overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 to-brand-950 p-7 text-white sm:p-9 lg:order-none lg:col-span-5">
            <div className="absolute inset-0 bg-panel-glow" aria-hidden="true" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <span className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                  <MessageSquare className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mb-3 text-2xl font-semibold tracking-tight">{content.ideaTitle}</h3>
                <p className="text-sm leading-6 text-brand-100">{content.ideaDescription}</p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center justify-between whitespace-nowrap rounded-xl border border-white/25 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-300/60 hover:bg-white/10"
              >
                <span>{content.whatsapp}</span>
                <ArrowUpRight className="h-4 w-4 text-brand-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
