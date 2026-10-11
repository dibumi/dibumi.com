"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 sm:px-8">
        {/* Brand */}
        <Link href={basePath || "/"} className="flex items-center gap-2.5 text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800">
            <span className="text-xs font-extrabold tracking-tight text-white">db</span>
          </span>
          <span className="font-bold text-base tracking-tight">
            dibumi<span className="text-brand-600">.com</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href={`${basePath}#contact`}
          className="hidden items-center gap-1.5 whitespace-nowrap rounded-xl bg-brand-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-900 active:scale-[0.98] md:inline-flex"
        >
          <span>{content.consultation}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-xl p-2.5 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          aria-label={content.menu}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mt-3 space-y-1 border-b border-slate-200 bg-white px-6 py-5 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-sm text-slate-700 transition-colors hover:text-brand-800"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={`${basePath}#contact`}
            onClick={() => setMobileMenuOpen(false)}
            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-brand-800 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-900 active:scale-[0.98]"
          >
            <span>{content.consultation}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 sm:right-24 lg:right-[max(18rem,calc((100vw-72rem)/2+13rem))]">
        <label className="sr-only" htmlFor="language-select">Language</label>
        <select
          id="language-select"
          value={locale}
          onChange={(event) => { window.location.href = `/${event.target.value}`; }}
          className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-700 outline-none transition-colors hover:border-brand-500 focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
        >
          {locales.map((item) => <option key={item} value={item}>{localeLabels[item]}</option>)}
        </select>
      </div>
    </header>
  );
}
