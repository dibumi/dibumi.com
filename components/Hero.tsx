import React from "react";
import Link from "next/link";
import { clients } from "@/lib/clients";
import type { SiteContent } from "@/lib/i18n";

/**
 * Hero: judul serif di atas atmosfer gradient, dikelilingi floating artifact.
 *
 * Komposisinya mengikuti referensi: wash warna lembut memenuhi seluruh lebar
 * layar, satu pill kecil di atas judul, judul dan sepasang pill di tengah, lalu
 * kartu-kartu data mengambang yang keluar dari tepi VIEWPORT dan dipotong di
 * sana — bukan tersusun rapi di dalam kontainer. Isi artifact-nya data nyata
 * situs ini (klien, layanan, hitungan), tidak ada metrik karangan.
 *
 * Atmosfernya ada di app/globals.css (.hero-atmosphere, .hero-grain, .hero-fade)
 * karena terdiri dari lima gradient bertumpuk.
 *
 * Artifact ditandai aria-hidden: isinya pengulangan dari section Clients dan
 * Services di bawah, jadi pembaca layar tidak perlu mendengarnya dua kali.
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
    <section className="relative isolate overflow-hidden">
      <div
        className="hero-atmosphere hero-grain hero-fade absolute inset-0 -z-10"
        aria-hidden="true"
      />

      {/* Lapisan artifact: selebar viewport, supaya kartu bisa diposisikan dari
          tepi layar dan terpotong oleh overflow-hidden di section. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
        <figure className="bg-paper-white shadow-subtle-3 rounded-elevatedcards absolute start-[-1rem] top-20 w-64 p-4">
          <table className="w-full border-collapse">
            <tbody>
              {tableClients.map((client) => (
                <tr key={client.name} className="border-hairline border-b last:border-b-0">
                  <td className="w-7 py-2.5 pe-1.5 align-middle">
                    <img
                      src={`/flags/${client.region}.svg`}
                      alt=""
                      width={16}
                      height={11}
                      loading="lazy"
                      className="h-2.5 w-4 rounded-[2px] object-cover"
                    />
                  </td>
                  <td className="text-ink-black truncate py-2.5 pe-2 align-middle text-caption">
                    {client.name}
                  </td>
                  <td className="text-ash-gray tabular py-2.5 align-middle text-caption uppercase">
                    {client.region}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>

        <figure className="bg-paper-white shadow-subtle-3 rounded-elevatedcards absolute end-[-2rem] top-28 w-60 p-5">
          <ol className="space-y-3">
            {content.services.map((service, index) => (
              <li key={service.title} className="flex items-baseline gap-3">
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

        <figure className="bg-paper-white shadow-subtle-3 rounded-elevatedcards absolute bottom-20 start-0 w-56 p-5">
          <div className="flex items-baseline gap-2">
            <span className="text-ink-black tabular text-subheading font-normal">
              {clients.length}
            </span>
            <span className="text-ash-gray text-caption">{content.clients.eyebrow}</span>
          </div>
          <div className="border-hairline mt-3 flex items-baseline gap-2 border-t pt-3">
            <span className="text-ink-black tabular text-subheading font-normal">
              {content.services.length}
            </span>
            <span className="text-ash-gray text-caption">
              {content.servicesSection.eyebrow}
            </span>
          </div>
        </figure>
      </div>

      <div className="mx-auto max-w-page px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="animate-fade-up mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          {/* Pill pengumuman, seperti "New in Steep: …" di referensi. Isinya
              tiga jaminan yang sudah ada di salinan, bukan klaim baru. */}
          <p className="border-hairline bg-paper-white/70 text-slate-gray rounded-buttons inline-flex flex-wrap items-center justify-center gap-x-2 border px-4 py-1.5 text-caption backdrop-blur-sm">
            {hero.chips.map((chip, index) => (
              <React.Fragment key={chip}>
                {index > 0 && (
                  <span aria-hidden="true" className="text-ash-gray">
                    ·
                  </span>
                )}
                <span>{chip}</span>
              </React.Fragment>
            ))}
          </p>

          <h1 className="hero-title text-ink-black font-display text-heading font-normal md:text-heading-lg xl:text-[76px] xl:leading-[1.1] xl:tracking-[-1.6px]">
            {hero.titleLead}
            <br />
            <em>{hero.titleAccent}</em>
          </h1>

          <p className="text-slate-gray max-w-xl text-body-lg">{hero.description}</p>

          <div className="mt-1 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-3">
            <Link
              href={`${basePath}#contact`}
              className="bg-ink-black text-paper-white rounded-buttons inline-flex h-12 w-full items-center justify-center px-6 text-body transition hover:bg-ink-black/90 sm:w-auto"
            >
              {hero.primaryCta}
            </Link>
            <Link
              href={`${basePath}#services`}
              className="border-ink-black text-ink-black rounded-buttons hover:bg-paper-white/60 inline-flex h-12 w-full items-center justify-center border px-6 text-body transition sm:w-auto"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
