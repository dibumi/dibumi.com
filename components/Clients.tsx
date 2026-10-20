import React from "react";
import { Building2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { clients } from "@/lib/clients";
import type { Locale, SiteContent } from "@/lib/i18n";

/**
 * Section Clients: dua belas kartu, masing-masing berisi logo, nama, dan
 * bendera negara badan hukum klien di pojok kanan atas.
 *
 * Logo memakai <img> biasa, bukan next/image, karena separuhnya SVG dan
 * beberapa di antaranya aset pihak ketiga berukuran kecil. Dengan begitu tidak
 * perlu mengaktifkan dangerouslyAllowSVG pada image optimizer.
 *
 * Wap2Cash tidak punya aset logo (situsnya mati dan arsipnya tidak menyimpan
 * logo), jadi namanya ditulis sebagai wordmark teks. Tidak ada gambar karangan.
 *
 * Tanpa state, jadi server component. Nama negara diambil dari Intl.DisplayNames
 * supaya alt bendera ikut locale tanpa menambah string baru ke lib/i18n.ts.
 */

/** Nama negara dari kode ISO, mengikuti locale aktif. */
function regionName(region: string, locale: Locale): string {
  const code = region.toUpperCase();

  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export default function Clients({
  content,
  locale,
}: {
  content: SiteContent["clients"];
  locale: Locale;
}) {
  return (
    <section id="clients" className="bg-surface py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          icon={<Building2 className="h-4 w-4" aria-hidden="true" />}
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
          {clients.map((client) => (
            <li
              key={client.name}
              className="border-line bg-surface hover:border-primary/30 relative flex flex-col rounded-2xl border p-6 transition"
            >
              <img
                src={`/flags/${client.region}.svg`}
                alt={regionName(client.region, locale)}
                width={18}
                height={12}
                loading="lazy"
                className="ring-line absolute end-4 top-4 h-3 w-[18px] rounded-[2px] object-cover ring-1"
              />

              <div className="flex h-12 items-center pe-8">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt=""
                    width={client.width}
                    height={client.height}
                    loading="lazy"
                    className="max-h-12 w-auto max-w-[140px] object-contain"
                  />
                ) : (
                  <span className="text-primary text-sm font-bold uppercase tracking-tight">
                    {client.name}
                  </span>
                )}
              </div>

              <p className="text-ink mt-4 text-[13px] font-semibold leading-snug tracking-tight">
                {client.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
