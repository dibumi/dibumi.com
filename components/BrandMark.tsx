import React from "react";

/**
 * Logo mark dibumi.com: huruf "d" monoline yang berdiri di atas lengkung
 * horizon, membaca sebagai "di bumi". Digambar dengan stroke `currentColor`
 * supaya warnanya ikut kelas teks di sekitarnya, dan tetap tajam di ukuran
 * berapa pun karena bukan bitmap.
 *
 * Versi file statis ada di public/brand/ untuk keperluan di luar aplikasi.
 */
export default function BrandMark({
  className,
  title,
}: {
  className?: string;
  /** Isi hanya kalau mark berdiri sendiri tanpa wordmark di sebelahnya. */
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g stroke="currentColor" strokeLinecap="round">
        <circle cx="32" cy="35" r="13" strokeWidth={5.5} />
        <path d="M45 11V48" strokeWidth={5.5} />
        <path d="M9 55Q32 51 55 55" strokeWidth={1.8} opacity={0.55} />
      </g>
    </svg>
  );
}
