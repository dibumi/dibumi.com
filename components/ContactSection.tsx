import React from "react";
import { ArrowUpRight, Clock, Mail, MapPin, MessageSquare } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import type { SiteContent } from "@/lib/i18n";

type Row = {
  Icon: typeof MapPin;
  label: string;
  value: string;
  note?: string;
  href?: string;
  external?: boolean;
  emphasis?: boolean;
};

/**
 * Kontak tanpa formulir: satu panel berisi empat baris kanal. Baris WhatsApp
 * diberi latar mint supaya jadi satu-satunya titik fokus warna.
 *
 * Tidak ada state di sini, jadi server component.
 */
export default function ContactSection({
  content,
}: {
  content: SiteContent["contact"];
}) {
  const whatsappUrl = `https://wa.me/6285607100255?text=${encodeURIComponent(content.whatsappMessage)}`;

  const rows: Row[] = [
    {
      Icon: MessageSquare,
      label: "WhatsApp",
      value: "+62 856 0710 0255",
      note: content.whatsappHint,
      href: whatsappUrl,
      external: true,
      emphasis: true,
    },
    {
      Icon: Mail,
      label: content.emailLabel,
      value: "fatkul@dibumi.com",
      note: content.emailHint,
      href: "mailto:fatkul@dibumi.com",
    },
    {
      Icon: Clock,
      label: content.hoursLabel,
      value: content.hours,
      note: content.hoursNote,
    },
    {
      Icon: MapPin,
      label: content.locationLabel,
      value: content.location,
      note: content.locationNote,
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

        <div className="border-line bg-surface mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border">
          {rows.map(({ Icon, label, value, note, href, external, emphasis }) => {
            const body = (
              <>
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    emphasis ? "bg-primary text-white" : "bg-primary-soft text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="text-muted block text-[10px] font-semibold uppercase tracking-widest">
                    {label}
                  </span>
                  <span className="text-ink mt-1 block text-sm font-medium leading-6 break-words">
                    {value}
                  </span>
                  {note && (
                    <span className="text-muted mt-0.5 block text-xs leading-5">{note}</span>
                  )}
                </span>

                {href && (
                  <ArrowUpRight
                    className={`mt-1 h-4 w-4 shrink-0 ${emphasis ? "text-primary" : "text-muted"}`}
                    aria-hidden="true"
                  />
                )}
              </>
            );

            const shell = "flex items-start gap-4 px-5 py-5 sm:px-7 sm:py-6";

            if (!href) {
              return (
                <div key={label} className={`border-line-subtle border-t first:border-t-0 ${shell}`}>
                  {body}
                </div>
              );
            }

            return (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={`border-line-subtle hover:bg-elevated flex items-start gap-4 border-t px-5 py-5 transition first:border-t-0 sm:px-7 sm:py-6 ${
                  emphasis ? "bg-tint-mint" : ""
                }`}
              >
                {body}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
