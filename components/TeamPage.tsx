import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FolderGit2, Mail, MessageSquare } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { teamMember, whatsappLink } from "@/lib/team";
import type { SiteContent } from "@/lib/i18n";

/**
 * Halaman tim. Isinya satu orang, jadi bukan grid kartu dan bukan daftar
 * section: satu potret, satu nama, dua paragraf, lalu fakta dan tautan.
 *
 * Tanpa state, jadi server component. `photo` di lib/team.ts masih null, dan
 * selama itu kolom kiri memakai tile monogram supaya halaman tetap utuh.
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
      Icon: Mail,
      label: page.emailLabel,
      value: teamMember.email,
      href: `mailto:${teamMember.email}`,
      external: false,
    },
    {
      Icon: MessageSquare,
      label: page.whatsappLabel,
      value: "WhatsApp",
      href: whatsappLink(teamMember.whatsapp, content.contact.whatsappMessage),
      external: true,
    },
    {
      Icon: FolderGit2,
      label: page.githubLabel,
      value: "fatkulnurk",
      href: teamMember.github,
      external: true,
    },
  ];

  return (
    <article className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-16 lg:pb-28 lg:pt-20">
      <div className="grid gap-10 md:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] md:gap-12 lg:gap-16">
        {/* Potret */}
        <div className="border-line bg-tint-mint relative aspect-[4/5] w-full max-w-[19rem] overflow-hidden rounded-2xl border">
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
              <BrandMark className="text-primary/25 h-24 w-24" />
              <span className="text-primary/50 text-[10px] font-semibold uppercase tracking-[0.2em]">
                dibumi.com
              </span>
            </div>
          )}
        </div>

        {/* Nama, peran, bio, tautan */}
        <div className="min-w-0 md:pt-1">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.16em]">
            {page.eyebrow}
          </p>

          <h1 className="text-ink mt-4 text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            {teamMember.name}
          </h1>

          <p className="text-muted mt-2 text-sm font-medium">{page.role}</p>

          <div className="mt-7 max-w-[65ch] space-y-4">
            {page.bio.map((paragraph, index) => (
              <p key={index} className="text-ink text-sm leading-7">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-muted text-[10px] font-semibold uppercase tracking-wider">
              {page.linksLabel}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {links.map(({ Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="border-line hover:border-primary/40 hover:bg-elevated inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition"
                  >
                    <Icon className="text-primary h-3.5 w-3.5" aria-hidden="true" />
                    <span className="text-ink">{label}</span>
                    <span className="text-muted hidden sm:inline">{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Fakta: satu blok, dipisah garis tipis, bukan daftar panjang. */}
      <dl className="border-line bg-line mt-14 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {page.facts.map((fact) => (
          <div key={fact.label} className="bg-surface px-5 py-4">
            <dt className="text-muted text-[10px] font-semibold uppercase tracking-wider">
              {fact.label}
            </dt>
            <dd className="text-ink mt-1.5 text-[13px] leading-5">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="border-line mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
        <p className="text-muted max-w-md text-xs leading-6">{content.contact.description}</p>
        <Link
          href={`${basePath}#contact`}
          className="bg-primary hover:bg-primary-hover inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold text-white transition"
        >
          {page.cta}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
