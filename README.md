# dibumi.com

Marketing site for **dibumi.com**, an app and software production studio based in Lamongan, Indonesia. The look is editorial: serif headlines on warm paper, a near-monochrome palette with a single peach accent, pill controls, and flat cards that sit quietly on the canvas.

[DESIGN.md](./DESIGN.md) is the source of truth for tokens, type, and components. This project is a Tailwind v3 transcription of that reference, with a few documented substitutions.

Built with **Next.js 16 (App Router)** and deployed as a **Cloudflare Worker** (Workers Static Assets) via **OpenNext**.

---

## Design system

- `DESIGN.md` holds the reference: palette, type scale, radii, shadows, components, and the do's and don'ts. Its closing section records the three places this build deliberately departs from it.
- `tailwind.config.ts` and `app/globals.css` hold the implemented tokens. They mirror each other by hand, so a token change means changing both files.
- The palette is intentionally achromatic, with `blush-peach` and `sienna-brown` reserved for one accent card per page. That card is the first one in Highlights.
- The hero gradient wash lives in `app/globals.css` (`.hero-atmosphere`, `.hero-grain`, `.hero-fade`) rather than in a component, because it is five stacked gradients plus a grain overlay. It is the only chromatic background on the site.
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

1. **Hero** — a soft gradient wash with a fine grain, a small pill of guarantees above the headline, a centred serif headline with one italicised phrase, a filled and a ghost pill button side by side, and three floating artifact cards (client region table, services list, counts with a gestural line) that bleed past the viewport edge at `xl` and above. One full screen, no pin; the entrance is choreographed and the cards then drift on a slow loop.
2. **Client marquee** — twelve real client logos on a 50-second CSS marquee with edge fades, paused on hover and stopped under reduced motion.
3. **Products** — a single elevated panel on a fog-to-white gradient, listing the six platform products with ordinals and a `Soon` pill, then the Ngambeg Cyber Media exit.
4. **Highlights** — three cards: discover, build, operate. The first is the page's single peach card and carries an oversized serif ordinal in place of an illustration; the other two are mist.
5. **Clients** — the peach band: twelve clients as a two-column hairline table, everything in sienna on blush, each row carrying a flag, the logo, and the ISO country code.
6. **Services** — the dark band: six practices on ink with hairline rules, an ordinal `01`–`06`, a points list, and a text link with an arrow.
7. **Process** — four steps on an achromatic rail.
8. **Standards** — three standards as hairline rows, then three commitments.
9. **Contact** — a centred closing call to action on fog with a single peach radial, WhatsApp as a filled pill and email as a ghost pill, then the operational facts.
10. **Footer** — the mark alone, four link columns, and a single closing row on a fog-white surface with no divider line and no oversized wordmark.

Sections reveal their headers and stagger their items on scroll through `components/motion/Reveal.tsx`. The band order (white, fog, peach, ink) is deliberate: without alternating surfaces the page reads as one flat colour from top to bottom.

The 404 page is styled in the same system.

---

## Data sources

- `lib/i18n.ts` — every visible string, for all five locales.
- `lib/products.ts` — product catalogue used by the navbar dropdown, the Products section, and the footer. Two levels: groups (`platforms`, `ngambeg`) and the items inside them. Games and apps share the `ngambeg` group because they are presented as one list pointing at ngambeg.com. Fill in `href` for a product once its site exists; `null` renders a `Soon` badge instead of a link.
- `lib/services.ts` — service slugs shared by the navbar Services panel and the Services section. Its order must match the `services` array in `lib/i18n.ts`; titles and descriptions stay there because they are translated. The file carries no icons: the design system has none, so the section numbers the services instead.
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
- **Motion:** `motion` (formerly Framer Motion) for entrance choreography and scroll reveals, plus CSS keyframes for the marquee, the artifact drift, and the nav panel. Everything collapses to static under `prefers-reduced-motion`
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
