import React from "react";
import { ArrowUpRight, Clock, Mail, MapPin, MessageSquare } from "lucide-react";
import { contactEmail, contactWhatsapp, whatsappLink } from "@/lib/contact";
import type { SiteContent } from "@/lib/i18n";

/**
 * Section penutup: klaim di kiri, dua jalur aksi di kanan, fakta operasional di
 * band bawah.
 *
 * Hierarki tiga tingkat, bukan empat baris setara:
 * - WhatsApp adalah satu-satunya blok berwarna di section ini, karena itu jalur
 *   tercepat dan tombol navbar "Start a project" mendarat di sini.
 * - Email setingkat di bawahnya, dibedakan lewat bingkai bukan warna.
 * - Jam kerja dan alamat turun jadi fakta pendukung di band terpisah, karena
 *   tidak ada yang bisa diklik dari keduanya.
 *
 * Nomor, email, dan URL wa.me dibaca dari lib/contact.ts, jadi tidak ada nilai
 * kontak yang ditulis ulang di komponen ini.
 *
 * Tanpa state, jadi server component.
 */
export default function ContactSection({
  content,
}: {
  content: SiteContent["contact"];
}) {
  const whatsappUrl = whatsappLink(contactWhatsapp.number, content.whatsappMessage);

  const actionShell =
    "flex min-h-12 items-center gap-3 rounded-lg px-3.5 transition active:translate-y-px";

  return (
    <section id="contact" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
          <div>
            <h2 className="text-ink text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              {content.title}
            </h2>
            <p className="text-muted mt-5 max-w-md text-base leading-7">
              {content.description}
            </p>
          </div>

          {/* Dua jalur aksi. WhatsApp satu-satunya elemen berwarna di sini. */}
          <div className="border-line bg-elevated rounded-2xl border p-5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${actionShell} bg-primary hover:bg-primary-hover group`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white">
                <MessageSquare className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">WhatsApp</span>
                <span className="block text-xs text-white/90 tabular" dir="ltr">
                  {contactWhatsapp.display}
                </span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-white/90 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <p className="text-muted mt-2.5 px-1 text-xs leading-5">{content.whatsappHint}</p>

            <div className="border-line mt-5 border-t pt-5">
              <a
                href={`mailto:${contactEmail}`}
                className={`${actionShell} border-line bg-surface hover:border-primary/40 group border`}
              >
                <span className="bg-primary-soft text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                  <Mail className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-ink block text-sm font-semibold">{content.emailLabel}</span>
                  <span className="text-muted block text-xs break-words" dir="ltr">
                    {contactEmail}
                  </span>
                </span>
                <ArrowUpRight
                  className="text-muted h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <p className="text-muted mt-2.5 px-1 text-xs leading-5">{content.emailHint}</p>
            </div>
          </div>
        </div>

        {/* Fakta operasional: tidak bisa diklik, jadi dipisah dari dua aksi di atas. */}
        <dl className="border-line mt-14 grid gap-8 border-t pt-10 sm:grid-cols-2">
          <div>
            <dt className="text-muted flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest">
              <Clock className="text-primary h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {content.hoursLabel}
            </dt>
            <dd className="text-ink mt-2 text-sm font-medium">{content.hours}</dd>
            <dd className="text-muted mt-1 text-xs leading-5">{content.hoursNote}</dd>
          </div>

          <div>
            <dt className="text-muted flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest">
              <MapPin className="text-primary h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {content.locationLabel}
            </dt>
            <dd className="text-ink mt-2 text-sm font-medium leading-6">{content.location}</dd>
            <dd className="text-muted mt-1 text-xs leading-5">{content.locationNote}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
