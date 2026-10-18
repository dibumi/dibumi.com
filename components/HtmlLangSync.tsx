"use client";

import { useEffect } from "react";
import { getDirection, type Locale } from "@/lib/i18n";

/**
 * Root layout hanya dirender sekali untuk semua locale, jadi atribut lang dan
 * dir di <html> tidak bisa mengikuti locale. Pembungkus halaman sudah memakai
 * lang/dir yang benar untuk pembaca layar dan crawler; komponen ini
 * menyelaraskan <html> setelah hidrasi supaya dokumen juga akurat.
 */
export default function HtmlLangSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = getDirection(locale);
  }, [locale]);

  return null;
}
