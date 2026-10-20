import React from "react";
import {
  ArrowUpRight,
  CreditCard,
  Layers,
  Megaphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformProducts, ngambegHubUrl } from "@/lib/products";
import type { SiteContent } from "@/lib/i18n";

const platformIcons: Record<string, LucideIcon> = {
  aiGateway: Sparkles,
  paymentOrchestration: CreditCard,
  adserverExchange: Megaphone,
};

export default function Products({ content }: { content: SiteContent }) {
  const copy = content.products;
  const platformCopy = copy.platforms as Record<string, { description: string }>;

  return (
    <section id="products" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
        />

        <div className="mt-12 flex flex-col gap-4">
          {/* Platforms: produk milik dibumi.com, situsnya belum tayang */}
          <div>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-ink text-sm font-semibold">{copy.groups.platforms.label}</h3>
              <span className="text-muted text-[11px]">{copy.groups.platforms.brand}</span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {getPlatformProducts().map((item) => {
                const Icon = platformIcons[item.id] ?? Sparkles;

                return (
                  <article
                    key={item.id}
                    className="border-primary/15 bg-tint-mint flex flex-col gap-5 rounded-2xl border p-7"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="bg-surface text-primary flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm">
                        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className="border-primary/20 text-primary bg-surface/80 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                        {copy.soon}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-ink text-lg font-semibold tracking-tight">{item.name}</h4>
                      <p className="text-muted mt-2 text-sm leading-7">
                        {platformCopy[item.id]?.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Ngambeg Cyber Media: katalog game dan aplikasi tinggal di ngambeg.com,
              jadi kartu ini hanya pintu masuk, bukan daftar yang harus ikut diperbarui. */}
          <article className="border-line bg-surface flex flex-col gap-6 rounded-2xl border p-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <Layers className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-ink text-lg font-semibold tracking-tight">
                  {copy.groups.ngambeg.label}
                </h3>
                <p className="text-muted text-[11px]">{copy.groups.ngambeg.brand}</p>
                <p className="text-muted mt-3 max-w-xl text-sm leading-7">
                  {copy.groups.ngambeg.description}
                </p>
              </div>
            </div>

            <a
              href={ngambegHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-line bg-elevated text-ink hover:border-primary/40 hover:text-primary inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition"
            >
              {copy.hub}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
