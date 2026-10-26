"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Languages } from "lucide-react";
import { localeLabels, localeNames, locales, type Locale } from "@/lib/i18n";

/**
 * Pemilih bahasa. Path dipertahankan saat berpindah locale, jadi
 * /en/privacy menjadi /id/privacy, bukan kembali ke beranda.
 *
 * Ikon yang tersisa di sini semuanya fungsional: globe (penanda bahasa),
 * chevron (pembuka daftar), dan centang (locale aktif). Tidak ada glyph hiasan.
 * Dropdown tidak memakai border: ring 1px dari shadow-subtle sudah memisahkannya
 * dari latar, dan border tambahan hanya menggandakan garis itu.
 *
 * Daftarnya berisi tautan asli, bukan tombol ber-role listbox. Tiap locale punya
 * URL sendiri, jadi `<a>` adalah elemen yang benar: bisa dibuka di tab baru,
 * di-prefetch, dan bekerja tanpa JS. `role="listbox"` di sini sebelumnya tidak
 * pernah bisa benar — listbox menuntut fokus yang dipindahkan dengan tombol
 * panah dan `aria-activedescendant`, sedangkan daftar ini hanya bisa di-Tab.
 * Role itu dilepas bersama `aria-haspopup`, jadi yang tersisa adalah disclosure
 * biasa: `aria-expanded` + `aria-controls`.
 */
export default function LanguageSwitcher({
  locale,
  label,
  compact = false,
  variant = "outline",
}: {
  locale: Locale;
  label: string;
  compact?: boolean;
  /**
   * `ghost` dipakai di navbar: pill abu 32px tanpa border, sejajar dengan CTA
   * hitam di sebelahnya. `mist-gray` tepat 5% hitam di atas putih, jadi pill
   * ini terbaca sebagai bidang yang lebih ringan satu tingkat dari CTA, bukan
   * sebagai tombol kedua yang bersaing dengannya.
   *
   * Di bawah lg pill ini naik ke 44px (`h-11`): di sana ia bukan lagi pasangan
   * CTA melainkan satu-satunya kontrol bahasa di samping tombol menu, dan jari
   * butuh 44px. Di lg ia kembali 32px supaya tetap sebaris dengan CTA.
   */
  variant?: "outline" | "ghost";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  /**
   * Alamat locale lain untuk halaman yang sedang dibuka. Segmen pertama path
   * selalu locale karena komponen ini hanya dipakai di dalam app/[locale];
   * sisanya dikembalikan apa adanya.
   */
  function hrefFor(next: Locale) {
    const segments = (pathname ?? "/").split("/").filter(Boolean);
    const rest = segments.slice(1).join("/");
    return `/${next}${rest ? `/${rest}` : ""}`;
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={menuId}
        /**
         * Label menyebut locale yang sedang aktif, bukan hanya "Language":
         * nama yang bisa diakses harus memuat teks yang terlihat (WCAG 2.5.3),
         * jadi pengguna kontrol suara bisa mengucapkan "EN" dan tombolnya
         * tetap ketemu. "Language" sendirian menyembunyikan huruf itu.
         */
        aria-label={`${label}: ${localeLabels[locale]}`}
        className={
          variant === "ghost"
            ? "bg-mist-gray text-ink-black hover:bg-ink-black/10 rounded-buttons inline-flex h-11 items-center gap-1.5 px-3 text-caption transition lg:h-8"
            : "border-hairline bg-paper-white text-slate-gray hover:text-ink-black rounded-smallcards inline-flex min-h-11 items-center gap-1.5 border px-2.5 text-caption transition"
        }
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
        <span className={compact ? "sr-only sm:not-sr-only" : ""}>{localeLabels[locale]}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          id={menuId}
          aria-label={label}
          className="bg-paper-white shadow-subtle rounded-elevatedcards animate-panel-in absolute end-0 top-full z-50 mt-2 w-48 p-1.5"
        >
          {locales.map((item) => {
            const active = item === locale;
            return (
              <li key={item}>
                <Link
                  href={hrefFor(item)}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "true" : undefined}
                  /* `min-h-11`: baris ini juga bisa ditekan di ponsel, dan
                     39px dari padding saja masih di bawah ambang 44px. */
                  className={`hover:bg-mist-gray rounded-smallcards flex min-h-11 w-full items-center justify-between gap-2 px-2.5 py-2 text-start text-caption transition ${
                    active ? "text-ink-black font-medium" : "text-slate-gray"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-ash-gray text-caption w-7">{localeLabels[item]}</span>
                    {localeNames[item]}
                  </span>
                  {active && <Check className="text-ink-black h-4 w-4" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
