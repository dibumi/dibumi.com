"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Languages, Menu, X } from "lucide-react";
import type { Locale, SiteContent } from "@/lib/i18n";
import { localeLabels, locales } from "@/lib/i18n";

export default function Navbar({ locale, content, basePath = "" }: { locale: Locale; content: SiteContent["nav"]; basePath?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: content.services, href: `${basePath}#services` },
    { name: content.process, href: `${basePath}#methodology` },
    { name: content.standards, href: `${basePath}#standards` },
    { name: content.contact, href: `${basePath}#contact` },
  ];

  const languageSelect = (
    <select
      id="language-select"
      value={locale}
      onChange={(event) => { window.location.href = `/${event.target.value}`; }}
      className="cursor-pointer bg-transparent text-xs font-semibold text-slate-700 outline-none"
    >
      {locales.map((item) => <option key={item} value={item}>{localeLabels[item]}</option>)}
    </select>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6 sm:px-8">
        {/* Brand */}
        <Link href={basePath || "/"} className="flex shrink-0 items-center gap-2.5 text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
            <span className="text-xs font-extrabold tracking-tight text-white">db</span>
          </span>
          <span className="text-base font-bold tracking-tight">
            dibumi<span className="text-brand-600">.com</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-6 hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-slate-600 transition-colors hover:text-brand-700"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-3">
          <label className="sr-only" htmlFor="language-select">Language</label>
          <div className="hidden items-center gap-1.5 rounded-xl border border-slate-200 px-2.5 py-2 transition-colors focus-within:border-brand-500 md:flex">
            <Languages className="h-4 w-4 text-slate-500" aria-hidden="true" />
            {languageSelect}
          </div>

          <Link
            href={`${basePath}#contact`}
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 active:scale-[0.98] md:inline-flex"
          >
            <span>{content.consultation}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2.5 text-slate-700 transition-colors hover:bg-brand-50 lg:hidden"
            aria-label={content.menu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200/80 bg-white px-6 py-5 lg:hidden">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm text-slate-700 transition-colors hover:text-brand-700"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-2.5 py-2">
              <Languages className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <label className="sr-only" htmlFor="language-select-mobile">Language</label>
              <select
                id="language-select-mobile"
                value={locale}
                onChange={(event) => { window.location.href = `/${event.target.value}`; }}
                className="cursor-pointer bg-transparent text-xs font-semibold text-slate-700 outline-none"
              >
                {locales.map((item) => <option key={item} value={item}>{localeLabels[item]}</option>)}
              </select>
            </div>

            <Link
              href={`${basePath}#contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 active:scale-[0.98]"
            >
              <span>{content.consultation}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
