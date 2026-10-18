"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Globe2,
  Pause,
  Play,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { SiteContent } from "@/lib/i18n";

const nodeIcons = [Globe2, Smartphone, Server];
const nodeTints = [
  "bg-primary-soft text-primary",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
];

export default function Hero({
  content,
  basePath,
}: {
  content: SiteContent;
  basePath: string;
}) {
  const [paused, setPaused] = useState(false);
  const hero = content.hero;
  const panel = hero.panel;

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-20 pt-14 sm:px-8 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:pb-28 lg:pt-24">
      {/* Kolom teks */}
      <div className="animate-fade-up flex flex-col items-start gap-7">
        <span className="border-primary/15 bg-primary-soft text-primary inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          {hero.eyebrow}
        </span>

        <h1 className="text-ink text-[2.85rem] font-medium leading-[1.06] tracking-[-0.05em] sm:text-6xl lg:text-[4.5rem]">
          {hero.titleTop}
          <br />
          {hero.titleAccent}
          <br />
          <span className="text-primary relative inline-block">
            {hero.titleBottom}
            <span
              className="absolute -end-12 -top-2 hidden rotate-12 text-amber-500 sm:block"
              aria-hidden="true"
            >
              <Sparkles className="h-9 w-9" />
            </span>
          </span>
        </h1>

        <p className="text-muted max-w-md text-base leading-7 sm:text-lg">
          {hero.description}
        </p>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href={`${basePath}#contact`}
            className="bg-primary hover:bg-primary-hover inline-flex min-h-12 items-center justify-center gap-3 rounded-lg px-6 text-sm font-semibold text-white transition"
          >
            {hero.primaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={`${basePath}#services`}
            className="border-line bg-surface hover:border-primary/40 hover:bg-elevated inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-6 text-sm font-medium transition"
          >
            {hero.secondaryCta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="text-muted flex flex-wrap gap-x-5 gap-y-2 text-xs">
          {hero.chips.map((chip) => (
            <li key={chip} className="flex items-center gap-1.5">
              <Check className="text-primary h-3.5 w-3.5" aria-hidden="true" />
              {chip}
            </li>
          ))}
        </ul>
      </div>

      {/* Panel ilustrasi alur kerja */}
      <div
        className={`hero-pattern border-primary/10 shadow-float relative isolate min-w-0 overflow-hidden rounded-[2rem] border bg-[#eef5ef] p-5 sm:p-8 ${
          paused ? "flow-paused" : ""
        }`}
      >
        <div className="relative flex flex-col gap-5">
          <div className="text-muted flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Code2 className="h-4 w-4" aria-hidden="true" />
              {panel.eyebrow}
            </span>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
              aria-label={paused ? panel.resumeLabel : panel.pauseLabel}
              className="border-primary/15 text-primary flex min-h-8 items-center gap-1.5 rounded-lg border bg-white/70 px-2 text-[10px] font-medium normal-case tracking-normal motion-reduce:hidden"
            >
              {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
              {paused ? panel.resume : panel.pause}
            </button>
          </div>

          {/* Node permintaan */}
          <div className="border-line bg-surface shadow-card rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-ink text-sm font-semibold">{panel.requestTitle}</p>
                <p className="text-muted mt-0.5 text-xs">{panel.requestSubtitle}</p>
              </div>
            </div>
            <div className="bg-elevated text-muted relative mt-4 flex items-center gap-2 overflow-hidden rounded-lg px-3 py-2.5 font-mono text-[11px]">
              <span className="text-primary font-semibold">{panel.requestMethod}</span>
              <span className="min-w-0 truncate">{panel.requestPath}</span>
            </div>
          </div>

          {/* Jalur permintaan */}
          <div className="relative flex h-8 justify-center" aria-hidden="true">
            <div className="bg-primary/30 h-full w-px" />
            <span className="flow-packet bg-primary absolute top-0 h-2 w-2 rounded-full ring-4 ring-[#eef5ef]" />
          </div>

          {/* Node studio */}
          <div className="gateway-node bg-primary relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-primary/25 p-5 text-white shadow-glow">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 text-sm font-extrabold tracking-tight">
                db
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold tracking-tight">
                  {panel.gatewayTitle}
                </p>
                <p className="truncate text-xs text-white/70">{panel.gatewaySubtitle}</p>
              </div>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {panel.gatewayBadge}
            </span>
          </div>

          {/* Jalur ke hasil */}
          <div className="relative mx-auto flex h-7 w-full justify-center" aria-hidden="true">
            <span className="bg-primary/30 h-full w-px" />
            <span className="flow-packet flow-packet-delayed bg-primary absolute top-0 h-2 w-2 rounded-full ring-4 ring-[#eef5ef]" />
          </div>

          {/* Node hasil */}
          <div className="grid gap-2 sm:grid-cols-3">
            {panel.nodes.map((label, index) => {
              const NodeIcon = nodeIcons[index] ?? Globe2;
              return (
                <div
                  key={label}
                  className="border-line bg-surface flex min-w-0 items-center gap-2 rounded-xl border p-3 sm:flex-col sm:py-4 sm:text-center"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${nodeTints[index] ?? nodeTints[0]}`}
                  >
                    <NodeIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="w-full truncate text-xs font-medium" title={label}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Pratinjau hasil */}
          <div className="border-primary/15 rounded-xl border bg-white/85 p-3.5">
            <div className="flex items-center justify-between gap-3 text-[10px]">
              <span className="text-primary flex items-center gap-1.5 font-medium">
                <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                {panel.responseLabel}
              </span>
              <span className="text-muted">{panel.responseNote}</span>
            </div>
            <div className="text-muted mt-3 flex items-center gap-2 font-mono text-[11px]">
              <Check className="text-primary h-3.5 w-3.5" aria-hidden="true" />
              <span className="min-w-0 truncate">{panel.responseText}</span>
              <span className="response-cursor bg-primary h-3.5 w-1 shrink-0 rounded-sm" aria-hidden="true" />
            </div>
            <div className="bg-primary/10 mt-3 h-1 overflow-hidden rounded-full" aria-hidden="true">
              <span className="response-progress bg-primary/60 block h-full rounded-full" />
            </div>
          </div>

          <ul className="text-muted flex flex-wrap justify-center gap-3 text-[11px]">
            {panel.footnote.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="text-primary h-3 w-3" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
