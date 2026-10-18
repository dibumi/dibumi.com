# dibumi.com

Marketing site for **dibumi.com**, an app and software production studio based in Lamongan, Indonesia. The visual language is ported from the AI Party marketing site: teal tokens, thin 1px borders, Geist Mono everywhere, and a light canvas instead of a dark hero.

Built with **Next.js 16 (App Router)** and deployed as a **Cloudflare Worker** (Workers Static Assets) via **OpenNext**.

---

## Pages

| Route | Content |
| --- | --- |
| `/` | Redirects to `/en` |
| `/[locale]` | Landing page: hero, highlights, services, products, clients, process, standards, contact |
| `/[locale]/privacy` | Privacy policy |
| `/[locale]/terms` | Terms & conditions |

Locales: `en` (default), `id`, `ar` (RTL), `zh`, `pl`.

Legal documents are written in English and Indonesian. Other locales render the English document with a notice at the top of the page.

---

## Sections

1. **Hero** — headline, two CTAs, and an illustrated delivery-flow panel (pausable, respects `prefers-reduced-motion`).
2. **Highlights** — three cards: discover, build, operate.
3. **Services** — six practices, each with points and a consultation link.
4. **Products** — AI Party (`Soon`, no public site yet) plus Games and Apps from Ngambeg Cyber Media.
5. **Clients** — UC Browser / UCWeb, BuzzCity, PropellerAds, Zeedsharia, Motmaina.com.
6. **Process** — four steps with a progress rail.
7. **Standards** — three standards and three commitments.
8. **Contact** — office details, WhatsApp CTA, and a working contact form.

---

## Data sources

- `lib/i18n.ts` — every visible string, for all five locales.
- `lib/products.ts` — product catalogue used by the navbar dropdown, the Products section, and the footer. Fill in `href` for a product once its site exists; `null` renders a `Soon` badge instead of a link.
- `lib/legal.ts` — terms and privacy content, keyed by locale.
- `components/Clients.tsx` — client list (copy lives in `lib/i18n.ts`).

---

## Tech stack

- **Framework:** Next.js 16 (App Router, static generation per locale)
- **Styling:** Tailwind CSS 3 with design tokens in `tailwind.config.ts`
- **Icons:** Lucide React
- **Fonts:** Geist Mono (all text), IBM Plex Sans Arabic and Noto Sans SC as fallbacks for `ar` and `zh`
- **Cloudflare:** `@opennextjs/cloudflare` + `wrangler` (Workers Static Assets)

---

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

---

## Deploy to Cloudflare Workers

The site is rendered by a Cloudflare Worker (not Pages). Static assets are served from Workers Static Assets.

### Preview locally (workerd)

```bash
npm run build:worker   # OpenNext build -> .open-next/
npm run preview        # wrangler dev
```

### Deploy manually

```bash
npm run deploy
```

Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` (or `npx wrangler login`).

### Deploy via GitHub Actions

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. Repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Custom domain

Attach the domain (for example `dibumi.com`) to the Worker through **Cloudflare Dashboard → Workers & Pages → dibumi-com → Settings → Domains & Routes**.
