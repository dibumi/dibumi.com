import React from "react";
import Link from "next/link";
import type { SiteContent } from "@/lib/i18n";

export default function Footer({ content }: { content: SiteContent["footer"] }) {
  const linkClass = "text-brand-200 transition-colors hover:text-white";

  return (
    <footer className="bg-brand-950 text-sm text-brand-100">
      <div className="h-px bg-edge-glow" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-14 sm:px-8">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
                <span className="text-xs font-extrabold tracking-tight text-white">db</span>
              </span>
              <span className="text-base font-bold tracking-tight">
                dibumi<span className="text-brand-300">.com</span>
              </span>
            </Link>
            <p className="max-w-sm leading-relaxed text-brand-100">{content.description}</p>
            <p className="max-w-sm text-xs leading-relaxed text-brand-200/80">{content.address}</p>
          </div>

          <div className="space-y-3 md:col-span-3">
            <div className="text-sm font-semibold text-white">{content.services}</div>
            <ul className="space-y-2">
              {content.serviceLinks.map((label) => (
                <li key={label}>
                  <Link href="#services" className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 md:col-span-2">
            <div className="text-sm font-semibold text-white">{content.company}</div>
            <ul className="space-y-2">
              <li>
                <Link href="#methodology" className={linkClass}>
                  {content.companyLinks[0]}
                </Link>
              </li>
              <li>
                <Link href="#standards" className={linkClass}>
                  {content.companyLinks[1]}
                </Link>
              </li>
              <li>
                <Link href="#contact" className={linkClass}>
                  {content.companyLinks[2]}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 md:col-span-2">
            <div className="text-sm font-semibold text-white">{content.contact}</div>
            <ul className="space-y-2">
              <li>
                <a href="mailto:fatkul@dibumi.com" className={linkClass}>
                  fatkul@dibumi.com
                </a>
              </li>
              <li>
                <Link href="#contact" className={linkClass}>
                  {content.whatsapp}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-brand-200/80 sm:flex-row">
          <div>
            © {new Date().getFullYear()} dibumi.com. {content.copyright}
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
            <Link href="/id/terms" className={linkClass}>
              {content.legal.terms}
            </Link>
            <Link href="/id/privacy" className={linkClass}>
              {content.legal.privacy}
            </Link>
            <span>{content.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
