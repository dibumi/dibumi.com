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
3. **Services** — six practices, each with points and a consultation link; the navbar Services dropdown links straight to each card anchor.
4. **Products** — three platform products owned by dibumi.com (AI Party, Payment Orchestration, Adserver Exchange, all `Soon` with no public site yet), then one Ngambeg Cyber Media card listing all twelve games and apps in a single list.
5. **Clients** — UC Browser / UCWeb, BuzzCity, PropellerAds, Zeedsharia, Motmaina.com.
6. **Process** — four steps with a progress rail.
7. **Standards** — three standards and three commitments.
8. **Contact** — office details, WhatsApp CTA, and a working contact form.

---

## Data sources

- `lib/i18n.ts` — every visible string, for all five locales.
- `lib/products.ts` — product catalogue used by the navbar dropdown, the Products section, and the footer. Two levels: groups (`platforms`, `ngambeg`) and the items inside them. Games and apps share the `ngambeg` group because they are presented as one list pointing at ngambeg.com. Fill in `href` for a product once its site exists; `null` renders a `Soon` badge instead of a link.
- `lib/services.ts` — service slugs and icons shared by the navbar Services dropdown and the Services section. Its order must match the `services` array in `lib/i18n.ts`; titles and descriptions stay there because they are translated.
- `lib/legal.ts` — terms and privacy content, keyed by locale.
- `components/Clients.tsx` — client list (copy lives in `lib/i18n.ts`).

---

## Brand assets

The logo is a monoline `d` standing on a shallow horizon curve, reading as "di bumi". It is drawn as SVG, so it stays sharp at any size and has a transparent background by definition.

- `components/BrandMark.tsx` — the mark as an inline React SVG. It uses `currentColor`, so the colour comes from the surrounding text class. Used in the navbar, the footer, and the legal pages.
- `app/icon.svg` — favicon: teal squircle with a white `db`.
- `app/apple-icon.png` — 180×180, opaque on purpose. iOS composites transparent PNGs onto black, so this one ships with its own teal background.
- `public/brand/` — standalone files for anything outside the app: `logo-mark.svg` (teal, ink, and white variants), `logo-tile.svg`, and `logo-lockup.svg` (mark plus wordmark, light and dark).
- `public/brand/png/` — transparent RGBA exports: mark at 512/256/128/64/32 and the lockup at 1200, in both colours.

The wordmark inside the lockup is outlined from Geist Mono at weight 600, so the SVG carries its own glyph shapes and does not depend on a font being installed. Regenerate the PNGs from the SVGs if the mark changes; do not edit the bitmaps directly.

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
