# dibumi.com

Marketing site for **dibumi.com**, an app and software production studio based in Lamongan, Indonesia. The look is editorial: serif headlines on warm paper, a near-monochrome palette with a single peach accent, pill controls, and flat cards that sit quietly on the canvas.

[DESIGN.md](./DESIGN.md) is the source of truth for tokens, type, and components. This project is a Tailwind v3 transcription of that reference, with a few documented substitutions.

Built with **Next.js 16 (App Router)** and deployed as a **Cloudflare Worker** (Workers Static Assets) via **OpenNext**.

---

## Design system

- `DESIGN.md` holds the reference: palette, type scale, radii, shadows, components, and the do's and don'ts.
- `tailwind.config.ts` and `app/globals.css` hold the implemented tokens. They mirror each other by hand, so a token change means changing both files.
- The palette is intentionally achromatic, with `blush-peach` and `sienna-brown` reserved for one accent card per page. No other chromatic colour is introduced.
- Cards never carry shadows. Only floating product artifacts (`shadow-subtle-3`) and dropdown overlays (`shadow-subtle`, `shadow-subtle-2`) do.
- The anchor-offset rule from `AGENTS.md` still applies: `scroll-padding-top` in `app/globals.css` stays in sync with the header height in `components/Navbar.tsx`, and sections do not add `scroll-margin-top` on top of it.

---

## Pages

| Route | Content |
| --- | --- |
| `/` | Redirects to `/en` |
| `/[locale]` | Landing page: hero, highlights, services, products, clients, process, standards, contact |
| `/[locale]/teams` | The team: one engineer, facts, and direct contact links |
| `/[locale]/privacy` | Privacy policy |
| `/[locale]/terms` | Terms & conditions |

Locales: `en` (default), `id`, `ar` (RTL), `zh`, `pl`.

Legal documents are written in English and Indonesian. Other locales render the English document with a notice at the top of the page.

---

## Sections

1. **Hero** — centred serif headline with one italicised phrase, a filled and a ghost pill button side by side, and a row of guarantees. Three floating product artifact cards (client region table, services list, counts) sit beside the text, only at `xl` and above.
2. **Highlights** — three quiet mist cards: discover, build, operate. No icons.
3. **Services** — six practices, each with an ordinal `01`–`06`, a points list, and a text link with an arrow; the navbar Services panel links straight to each card anchor.
4. **Products** — six platform products owned by dibumi.com (all `Soon`, no public site yet), then one full-width Ngambeg Cyber Media card that links out to ngambeg.com.
5. **Clients** — twelve clients as a two-column hairline region table, each row carrying a flag, the logo, and the ISO country code.
6. **Process** — four steps on an achromatic rail.
7. **Standards** — three standards as hairline rows, then three commitments.
8. **Contact** — one peach accent card, the only chromatic surface on the site: WhatsApp as a filled pill and email as a ghost pill, followed by a band of operational facts.

The 404 page is styled in the same system.

---

## Data sources

- `lib/i18n.ts` — every visible string, for all five locales.
- `lib/products.ts` — product catalogue used by the navbar dropdown, the Products section, and the footer. Two levels: groups (`platforms`, `ngambeg`) and the items inside them. Games and apps share the `ngambeg` group because they are presented as one list pointing at ngambeg.com. Fill in `href` for a product once its site exists; `null` renders a `Soon` badge instead of a link.
- `lib/services.ts` — service slugs shared by the navbar Services panel and the Services section. Its order must match the `services` array in `lib/i18n.ts`; titles and descriptions stay there because they are translated. Each entry still carries an icon, but nothing renders it any more: the design system has no decorative icons, so the section numbers the services instead.
- `lib/team.ts` — the one team member: name, optional photo, and contact links. Set `photo` to a path under `public/` once the portrait exists; until then the page renders a monogram tile.
- `lib/clients.ts` — the client list: name, logo path, ISO country code, and native image size. Logos live in `public/clients/`, flags in `public/flags/`. A `null` logo renders the name as a text wordmark instead of an image.
- `lib/legal.ts` — terms and privacy content, keyed by locale.
- `components/Clients.tsx` — client list (copy lives in `lib/i18n.ts`).

---

## Brand assets

The logo is a monoline `d` standing on a shallow horizon curve, reading as "di bumi". It is drawn as SVG, so it stays sharp at any size and has a transparent background by definition.

- `components/BrandMark.tsx` — the mark as an inline React SVG. It uses `currentColor`, so the colour comes from the surrounding text class. Used in the navbar, the footer, and the legal pages.
- `app/icon.svg` — favicon: `ink-black` (`#17191c`) squircle with a `paper-white` mark.
- `app/apple-icon.png` — 180×180, opaque on purpose. iOS composites transparent PNGs onto black, so this one ships with its own background; regenerate it from the ink-black tile so it matches the favicon.
- `public/brand/` — standalone files for anything outside the app: `logo-mark.svg`, `logo-tile.svg`, and `logo-lockup.svg` (mark plus wordmark, light and dark). These exports still carry the pre-migration teal (`#0a7668`) and old ink (`#16332d`); regenerate them from the `ink-black` and `paper-white` tokens before using them outside the app.
- `public/brand/png/` — transparent RGBA exports: mark at 512/256/128/64/32 and the lockup at 1200, in both colours.

The wordmark inside the lockup is outlined from Geist Mono at weight 600, so the SVG carries its own glyph shapes and does not depend on a font being installed. Regenerate the PNGs from the SVGs if the mark changes; do not edit the bitmaps directly.

---

## Tech stack

- **Framework:** Next.js 16 (App Router, static generation per locale)
- **Styling:** Tailwind CSS 3 with design tokens in `tailwind.config.ts`, mirroring the CSS custom properties in `app/globals.css`
- **Icons:** Lucide React, kept for functional glyphs only (chevrons, arrows, the language icon), not for decorative icons
- **Fonts:** Source Serif 4 (display) and Inter (body), both via `next/font`; IBM Plex Sans Arabic and Noto Sans SC as the Arabic and Chinese companions. Source Serif 4 and Inter stand in for the commercial Signifier and Sohne faces named in DESIGN.md
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
