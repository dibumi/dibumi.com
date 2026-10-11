import React from "react";
import Link from "next/link";
import type { SiteContent } from "@/lib/i18n";

export default function Footer({ content }: { content: SiteContent["footer"] }) {
  return (
    <footer className="border-t border-slate-200 bg-white text-sm pt-14 pb-10">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 text-slate-900">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800">
                <span className="text-xs font-extrabold tracking-tight text-white">db</span>
              </span>
              <span className="font-bold text-base tracking-tight">
                dibumi<span className="text-brand-600">.com</span>
              </span>
            </Link>
            <p className="text-slate-600 leading-relaxed max-w-sm">
              {content.description}
            </p>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              {content.address}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-sm font-semibold text-slate-900">
              {content.services}
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link href="#services" className="hover:text-brand-700 transition-colors">
                  {content.serviceLinks[0]}
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-brand-700 transition-colors">
                  {content.serviceLinks[1]}
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-brand-700 transition-colors">
                  {content.serviceLinks[2]}
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-brand-700 transition-colors">
                  {content.serviceLinks[3]}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-sm font-semibold text-slate-900">
              {content.company}
            </div>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link href="#methodology" className="hover:text-brand-700 transition-colors">
                  {content.companyLinks[0]}
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-brand-700 transition-colors">
                  {content.companyLinks[1]}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-brand-700 transition-colors">
                  {content.companyLinks[2]}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-sm font-semibold text-slate-900">{content.contact}</div>
            <ul className="space-y-2 text-slate-600">
              <li>
                <a
                  href="mailto:fatkul@dibumi.com"
                  className="hover:text-brand-700 transition-colors"
                >
                  fatkul@dibumi.com
                </a>
              </li>
              <li>
                <Link href="#contact" className="hover:text-brand-700 transition-colors">
                  {content.whatsapp}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} dibumi.com. {content.copyright}
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
            <Link href="/id/terms" className="hover:text-brand-700 transition-colors">
              {content.legal.terms}
            </Link>
            <Link href="/id/privacy" className="hover:text-brand-700 transition-colors">
              {content.legal.privacy}
            </Link>
            <span>{content.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
