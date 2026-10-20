import React from "react";
import Link from "next/link";
import { clients } from "@/lib/clients";
import type { SiteContent } from "@/lib/i18n";

/**
 * Hero: judul serif, satu paragraf, sepasang pill, dan strip jaminan.
 *
 * Komposisinya mengikuti DESIGN.md: teks editorial di tengah, dikelilingi
 * floating product artifact yang duduk di atas kanvas putih dengan shadow 10%.
 * Isi artifact-nya data nyata situs ini — klien yang sudah dikirim, daftar
 * layanan, dan hitungannya. Tidak ada metrik karangan.
 *
 * Ukuran judul berhenti di 64px, bukan 90px: di lebar 1200px dengan artifact
 * di kedua sisi, 90px membuat baris terpanjang menabrak kartu. 44/64 tetap
 * masuk skala display di DESIGN.md.
 *
 * Artifact disembunyikan di bawah xl dan ditandai aria-hidden: isinya
 * pengulangan dari section Clients dan Services di bawah, jadi pembaca layar
 * tidak perlu mendengarnya dua kali.
 */
export default function Hero({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  const hero = content.hero;
  const tableClients = clients.slice(0, 5);

  return (
    <section className="mx-auto max-w-page px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:pb-28 lg:pt-24">
      <div className="relative">
        {/* Floating artifacts. Hanya di xl ke atas, karena di bawah itu tidak
            ada ruang kosong di samping judul untuk ditempati. */}
        <div aria-hidden="true" className="hidden xl:block">
          <figure className="bg-paper-white shadow-subtle-3 rounded-elevatedcards absolute start-0 top-0 w-56 p-4">
            <table className="w-full border-collapse">
              <tbody>
                {tableClients.map((client) => (
                  <tr
                    key={client.name}
                    className="border-hairline border-b last:border-b-0"
                  >
                    <td className="w-5 py-2 align-middle">
                      <img
                        src={`/flags/${client.region}.svg`}
                        alt=""
                        width={16}
                        height={11}
                        loading="lazy"
                        className="h-2.5 w-4 rounded-[2px] object-cover"
                      />
                    </td>
                    <td className="text-ink-black truncate py-2 pe-2 align-middle text-caption">
                      {client.name}
                    </td>
                    <td className="text-ash-gray tabular py-2 align-middle text-caption uppercase">
                      {client.region}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </figure>

          <figure className="bg-paper-white shadow-subtle-3 rounded-elevatedcards absolute end-0 top-16 w-52 p-4">
            <ol className="space-y-2.5">
              {content.services.map((service, index) => (
                <li key={service.title} className="flex items-baseline gap-2.5">
                  <span className="text-ash-gray tabular shrink-0 text-caption">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink-black leading-snug text-caption">
                    {service.title}
                  </span>
                </li>
              ))}
            </ol>
          </figure>

          <figure className="bg-paper-white shadow-subtle-3 rounded-elevatedcards absolute bottom-0 start-4 w-52 p-5">
            <div className="flex items-baseline gap-2">
              <span className="text-ink-black tabular text-body-lg font-medium">
                {clients.length}
              </span>
              <span className="text-ash-gray text-caption">{content.clients.eyebrow}</span>
            </div>
            <div className="border-hairline mt-3 flex items-baseline gap-2 border-t pt-3">
              <span className="text-ink-black tabular text-body-lg font-medium">
                {content.services.length}
              </span>
              <span className="text-ash-gray text-caption">
                {content.servicesSection.eyebrow}
              </span>
            </div>
          </figure>
        </div>

        <div className="animate-fade-up mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <h1 className="hero-title text-ink-black font-display text-heading font-normal md:text-heading-lg">
            {hero.titleLead}
            <br />
            <em>{hero.titleAccent}</em>
          </h1>

          <p className="text-slate-gray max-w-xl text-body">{hero.description}</p>

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-3">
            <Link
              href={`${basePath}#contact`}
              className="bg-ink-black text-paper-white rounded-buttons inline-flex h-12 w-full items-center justify-center px-5 text-body transition hover:bg-ink-black/90 sm:w-auto"
            >
              {hero.primaryCta}
            </Link>
            <Link
              href={`${basePath}#services`}
              className="border-ink-black text-ink-black rounded-buttons hover:bg-mist-gray inline-flex h-12 w-full items-center justify-center border px-5 text-body transition sm:w-auto"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </div>
      </div>

      <ul className="border-hairline text-ash-gray mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t pt-6 text-caption">
        {hero.chips.map((chip) => (
          <li key={chip}>{chip}</li>
        ))}
      </ul>
    </section>
  );
}
