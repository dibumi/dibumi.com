import React from "react";
import Image from "next/image";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import { teamMember, whatsappLink } from "@/lib/team";
import type { SiteContent } from "@/lib/i18n";

/**
 * Halaman tim. Isinya satu orang, jadi bukan grid kartu dan bukan daftar
 * section: satu potret, satu nama, dua paragraf, lalu fakta dan tautan.
 *
 * Tanpa state, jadi server component. `photo` di lib/team.ts masih null, dan
 * selama itu kolom kiri memakai tile monogram supaya halaman tetap utuh.
 *
 * Hierarki tipografinya mengikuti DESIGN.md: tag 16px ash, nama serif weight
 * 400 (serif tidak pernah bold di sistem ini), peran dan bio 17px. Tidak ada
 * ikon dekoratif di tautan kontak: ketiganya pill hantu, jadi bentuknya sendiri
 * yang menandakan bisa diklik. Yang tersisa hanya panah di CTA penutup, dan
 * panah itu bagian dari label, bukan ikon.
 */
export default function TeamPage({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  const page = content.teamPage;

  const links = [
    {
      label: page.emailLabel,
      value: teamMember.email,
      href: `mailto:${teamMember.email}`,
      external: false,
    },
    {
      label: page.whatsappLabel,
      value: "WhatsApp",
      href: whatsappLink(teamMember.whatsapp, content.contact.whatsappMessage),
      external: true,
    },
    {
      label: page.githubLabel,
      value: "fatkulnurk",
      href: teamMember.github,
      external: true,
    },
  ];

  return (
    <article className="mx-auto max-w-page px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:pb-24 lg:pt-24">
      <div className="grid gap-10 md:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] md:gap-12 lg:gap-16">
        {/* Potret. Bingkainya hairline di atas mist, bukan kartu: fotonya
            sendiri yang mengisi bidang, jadi tidak butuh elevasi. */}
        <div className="border-hairline bg-mist-gray rounded-images relative aspect-[4/5] w-full max-w-[19rem] overflow-hidden border">
          {teamMember.photo ? (
            <Image
              src={teamMember.photo}
              alt={teamMember.name}
              fill
              sizes="(min-width: 768px) 19rem, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <BrandMark className="text-ink-black/20 h-24 w-24" />
              <span className="text-ash-gray text-caption">dibumi.com</span>
            </div>
          )}
        </div>

        {/* Nama, peran, bio, tautan */}
        <div className="min-w-0 md:pt-1">
          <p className="text-ash-gray text-caption">{page.eyebrow}</p>

          <h1 className="text-ink-black font-display text-heading font-normal sm:text-heading-lg mt-4">
            {teamMember.name}
          </h1>

          <p className="text-slate-gray text-body mt-2">{page.role}</p>

          <div className="mt-7 max-w-[65ch] space-y-4">
            {page.bio.map((paragraph, index) => (
              <p key={index} className="text-ink-black text-body">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-ash-gray text-caption">{page.linksLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {links.map(({ label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="border-ink-black text-ink-black rounded-buttons hover:bg-mist-gray inline-flex h-11 items-center gap-2 border px-4 text-caption transition"
                  >
                    <span>{label}</span>
                    <span className="text-slate-gray hidden sm:inline">{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Fakta: satu blok, dipisah garis tipis, bukan daftar panjang. Trik
          gap-px di atas latar hairline menghasilkan garis 1px tanpa menulis
          border di tiap sel, jadi tepi luarnya tetap satu garis. */}
      <dl className="bg-hairline rounded-cards border-hairline mt-14 grid gap-px overflow-hidden border sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {page.facts.map((fact) => (
          <div key={fact.label} className="bg-paper-white px-5 py-4">
            <dt className="text-ash-gray text-caption">{fact.label}</dt>
            <dd className="text-ink-black text-body mt-1.5">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="border-hairline mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
        <p className="text-slate-gray max-w-md text-caption">{content.contact.description}</p>
        <Link
          href={`${basePath}#contact`}
          className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 inline-flex h-11 items-center justify-center gap-2 px-5 text-caption transition"
        >
          {page.cta}
          <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
