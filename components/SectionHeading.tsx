import React from "react";

/**
 * Judul section yang konsisten di seluruh halaman: eyebrow mono huruf besar,
 * judul, lalu satu paragraf penjelas.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="text-primary flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
        {icon}
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="text-muted mt-4 text-sm leading-7">{description}</p>
    </div>
  );
}
