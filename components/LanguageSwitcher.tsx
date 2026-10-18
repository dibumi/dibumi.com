"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown, Languages } from "lucide-react";
import { localeLabels, localeNames, locales, type Locale } from "@/lib/i18n";

/**
 * Pemilih bahasa. Path dipertahankan saat berpindah locale, jadi
 * /en/privacy menjadi /id/privacy, bukan kembali ke beranda.
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
  /** `bare` dipakai di navbar: tanpa border, hanya latar saat hover. */
  variant?: "outline" | "bare";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();

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

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;

    // Segmen pertama path selalu locale karena komponen ini hanya dipakai
    // di dalam app/[locale]. Sisanya dikembalikan apa adanya.
    const segments = (pathname ?? "/").split("/").filter(Boolean);
    const rest = segments.slice(1).join("/");
    router.push(`/${next}${rest ? `/${rest}` : ""}`);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={
          variant === "bare"
            ? "text-muted hover:bg-elevated hover:text-ink inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium transition"
            : "border-line text-muted hover:border-primary/40 hover:text-ink inline-flex min-h-10 items-center gap-1.5 rounded-lg border bg-surface px-2.5 text-xs font-medium transition"
        }
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
        <span className={compact ? "sr-only sm:not-sr-only" : ""}>{localeLabels[locale]}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="border-line bg-surface shadow-card animate-panel-in absolute end-0 top-full z-50 mt-2 w-48 rounded-xl border p-1.5"
        >
          {locales.map((item) => {
            const active = item === locale;
            return (
              <li key={item} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => switchTo(item)}
                  className={`hover:bg-elevated flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-start text-sm transition ${
                    active ? "text-primary font-semibold" : "text-ink"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-muted w-7 text-[10px] font-semibold tracking-wider uppercase">
                      {localeLabels[item]}
                    </span>
                    {localeNames[item]}
                  </span>
                  {active && <Check className="text-primary h-4 w-4" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
