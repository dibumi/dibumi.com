"use client";

import React, { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import type { SiteContent } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "border-line bg-surface text-ink placeholder:text-muted/70 focus:border-primary w-full rounded-lg border px-3 text-sm outline-none transition";

export default function ContactForm({
  content,
  locale,
}: {
  content: SiteContent["contact"]["form"];
  locale: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      service: String(data.get("service") ?? ""),
      message: String(data.get("message") ?? "").trim(),
      locale,
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setFeedback(content.required);
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string; error?: string }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.error ?? content.error);
      }

      form.reset();
      setStatus("success");
      setFeedback(content.successNote);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : content.error);
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="text-muted text-xs font-medium">
            {content.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder={content.namePlaceholder}
            className={`${fieldClass} h-11`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="text-muted text-xs font-medium">
            {content.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={content.emailPlaceholder}
            className={`${fieldClass} h-11`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-service" className="text-muted text-xs font-medium">
          {content.service}
        </label>
        <select
          id="contact-service"
          name="service"
          defaultValue=""
          className={`${fieldClass} h-11 cursor-pointer`}
        >
          <option value="">{content.servicePlaceholder}</option>
          {content.services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-muted text-xs font-medium">
          {content.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder={content.messagePlaceholder}
          className={`${fieldClass} resize-y py-2.5 leading-6`}
        />
      </div>

      {status === "error" && feedback && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-700"
        >
          {feedback}
        </p>
      )}

      {status === "success" && (
        <div
          role="status"
          className="border-primary/20 bg-primary-soft text-primary flex items-start gap-2.5 rounded-lg border px-3 py-2.5"
        >
          <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <div className="text-xs leading-5">
            <p className="font-semibold">{content.success}</p>
            <p>{feedback || content.successNote}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="bg-primary hover:bg-primary-hover mt-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {sending ? content.sending : content.submit}
      </button>
    </form>
  );
}
