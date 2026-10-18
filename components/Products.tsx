import React from "react";
import {
  ArrowUpRight,
  CreditCard,
  Gamepad2,
  Megaphone,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformProducts, ngambegHubUrl, productGroups } from "@/lib/products";
import type { SiteContent } from "@/lib/i18n";

const platformIcons: Record<string, LucideIcon> = {
  aiParty: Sparkles,
  paymentOrchestration: CreditCard,
  adserverExchange: Megaphone,
};

const groupIcons = {
  games: Gamepad2,
  apps: Smartphone,
} as const;

const groupTints = {
  games: "bg-violet-100 text-violet-700",
  apps: "bg-amber-100 text-amber-700",
} as const;

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

          {/* Games & Apps dari Ngambeg Cyber Media */}
          <div>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-ink text-sm font-semibold">
                {copy.groups.games.brand}
              </h3>
              <a
                href={ngambegHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary inline-flex items-center gap-1.5 text-[11px] font-semibold hover:underline"
              >
                {copy.hub}
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {(["games", "apps"] as const).map((id) => {
                const group = productGroups.find((item) => item.id === id)!;
                const groupCopy = copy.groups[id];
                const GroupIcon = groupIcons[id];

                return (
                  <article
                    key={id}
                    className="border-line bg-surface flex flex-col gap-5 rounded-2xl border p-7"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${groupTints[id]}`}
                        >
                          <GroupIcon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-ink text-lg font-semibold tracking-tight">
                            {groupCopy.label}
                          </h3>
                          <p className="text-muted text-[11px]">{groupCopy.brand}</p>
                        </div>
                      </div>
                      <span className="text-muted font-mono text-[10px] tabular">
                        {String(group.items.length).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="text-muted text-sm leading-7">{groupCopy.description}</p>

                    <ul className="mt-auto flex flex-wrap gap-2">
                      {group.items.map((item) =>
                        item.href ? (
                          <li key={item.id}>
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="border-line bg-elevated text-ink hover:border-primary/40 hover:text-primary inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition"
                            >
                              {item.name}
                              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                            </a>
                          </li>
                        ) : (
                          <li key={item.id}>
                            <span className="border-line text-muted inline-flex items-center gap-1.5 rounded-lg border border-dashed px-2.5 py-1.5 text-xs">
                              {item.name}
                              <span className="text-[9px] font-semibold uppercase tracking-wider">
                                {copy.soon}
                              </span>
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
