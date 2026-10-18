/**
 * Metadata per layanan: slug anchor dan ikon.
 *
 * Urutan array ini WAJIB sejajar dengan array `services` di lib/i18n.ts pada
 * setiap locale (judul dan deskripsi tetap tinggal di sana karena harus
 * diterjemahkan). Dipakai bersama oleh navbar dan section Services supaya
 * ikon serta anchor-nya selalu sama.
 */

import {
  AppWindow,
  Code2,
  Globe2,
  LifeBuoy,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type ServiceMeta = {
  slug: string;
  icon: LucideIcon;
};

export const serviceMeta: ServiceMeta[] = [
  { slug: "custom-software", icon: Code2 },
  { slug: "android-webview", icon: Smartphone },
  { slug: "company-profile", icon: Globe2 },
  { slug: "android-apps", icon: AppWindow },
  { slug: "server-devops", icon: Server },
  { slug: "maintenance-sla", icon: LifeBuoy },
];

/** Anchor id kartu layanan, dipakai oleh link di navbar. */
export function serviceAnchor(slug: string): string {
  return `service-${slug}`;
}
