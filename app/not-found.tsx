import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-canvas flex min-h-dvh items-center justify-center px-5 py-20">
      <div className="max-w-md text-center">
        <span className="bg-primary-soft text-primary mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
          <Compass className="h-6 w-6" aria-hidden="true" />
        </span>

        <p className="text-primary mt-6 text-xs font-semibold uppercase tracking-[0.16em]">404</p>
        <h1 className="text-ink mt-3 text-3xl font-medium tracking-tight">
          This page does not exist
        </h1>
        <p className="text-muted mt-3 text-sm leading-7">
          The link may be outdated. Head back to the home page, or read the site in another
          language.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/en"
            className="bg-primary hover:bg-primary-hover inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold text-white transition"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to English
          </Link>
          <Link
            href="/id"
            className="border-line bg-surface hover:border-primary/40 inline-flex min-h-11 items-center justify-center rounded-lg border px-5 text-sm font-medium transition"
          >
            Versi Indonesia
          </Link>
        </div>
      </div>
    </main>
  );
}
