# dibumi.com

Marketing site for **dibumi.com**, an app and software production studio based in Lamongan, Indonesia. The look is editorial: serif headlines on warm paper, a near-monochrome palette with a single peach accent, pill controls, and flat cards that sit quietly on the canvas.

[DESIGN.md](./DESIGN.md) is the source of truth for tokens, type, and components. This project is a Tailwind v3 transcription of that reference, with a few documented substitutions.

Built with **Next.js 16 (App Router)** and deployed as a **Cloudflare Worker** (Workers Static Assets) via **OpenNext**.

---

## Design system

- `DESIGN.md` holds the reference: palette, type scale, radii, shadows, components, and the do's and don'ts. Its closing section records the seven places this build deliberately departs from it.
- `tailwind.config.ts` and `app/globals.css` hold the implemented tokens. They mirror each other by hand, so a token change means changing both files.
- The palette is intentionally achromatic, with `blush-peach` and `sienna-brown` reserved for one accent card per page. That card is the first one in Highlights.
- The hero gradient wash lives in `app/globals.css` (`.hero-atmosphere`, `.hero-grain`, `.hero-fade`) rather than in a component, because it is seven stacked gradients plus a grain overlay, drifting on a 26-second loop. It is the only chromatic background on the site.
- Cards never carry shadows. Only the framed product demo (`shadow-subtle-3`) and dropdown overlays (`shadow-subtle`, `shadow-subtle-2`) do.
- The anchor-offset rule from `AGENTS.md` still applies: `scroll-padding-top` in `app/globals.css` stays in sync with the header height in `components/Navbar.tsx`, and sections do not add `scroll-margin-top` on top of it.

---

## Pages

| Route | Content |
| --- | --- |
| `/` | Redirects to `/en` |
| `/[locale]` | Landing page: hero, marquee, products, highlights, clients, services, process, standards, contact |
| `/[locale]/teams` | The team: one engineer, facts, and direct contact links |
| `/[locale]/services/[slug]` | One page per practice: intro, what's included, the four-step process, related services, contact CTA. Seven slugs, identical in every locale |
| `/[locale]/products/[slug]` | One page per product: six platform products (title, Soon badge, status note, what it does, other products) and one page for the Ngambeg Cyber Media group (domain, Games/Apps catalog links, the six platform products). Seven slugs, identical in every locale |
| `/[locale]/privacy` | Privacy policy |
| `/[locale]/terms` | Terms & conditions |

Locales: `en` (default), `id`, `ar` (RTL), `zh`, `pl`.

Legal documents are written in English and Indonesian. Other locales render the English document with a notice at the top of the page.

---

## Sections

1. **Hero** — a soft gradient wash with a fine grain, and nothing on it but type: a centred serif headline at 100px with one italicised line, a paragraph, a filled pill and a text link, then one 16px credential line (city/province · since 2013). No artifact cards, no pill of guarantees — the wash is the visual and the type is the content. One full screen, no pin. Each headline line lifts out of a `clip-path` mask 0.1s apart, and the headline drifts 40px as the hero leaves.
2. **Client marquee** — a "Trusted by teams at" overline above fourteen real client brands (eleven logos, three text wordmarks) in full colour, on a 50-second CSS marquee with 20% edge fades and an icon-only pause control, paused on hover and stopped under reduced motion.
3. **Products** — the reference's device: a vertical tab list of the six platform products plus the Ngambeg group on the left, the selected product in a framed window on the right with a browser chrome and a real `01 / 07` counter. A client component, server-fed. Below `lg` the tab list becomes a scrollable strip.
4. **Highlights** — a centred serif heading, then the three phases as tall 3/4 cards fanned on desktop (the outer two at 90%, the middle at 110%, all rooted on the bottom edge) and a snap carousel below `md`. Each card is tag, oversized serif ordinal, title, description. The first is the page's single peach card; the reference's green third card is dropped, since the palette has no functional colour beyond peach/sienna.
5. **Clients** — the peach band: the copy and three fixed facts on the left (100+ clients, 10+ countries, since 2013), a fourteen-cell logo wall on the right with 1px gaps showing the band through as hairlines. Eleven cells carry a logo, three are text wordmarks with an optional tagline, and each cell closes with a flag and the ISO country code — or "Global" for brands without a jurisdiction. The last two cells span half the wall each, so the final row stays full. Everything in sienna on blush.
6. **Services** — the dark band: the seven practices as a hairline-separated list on the left, a diagram of the delivery model on the right (seven inputs, one team, three outputs) built from the same data. From `lg` the list caps its height and scrolls in place, so the section never runs past the diagram. The list closes with two dimmed retired rows — Digital Marketing (no longer offered) and Penetration Testing (currently inactive) — which are neither numbered nor fed into the diagram; the same two appear as non-clickable rows at the foot of the Services mega menu.
7. **Process** — four steps on an achromatic rail.
8. **Standards** — three standards as hairline rows, then three commitments.
9. **Contact** — a centred closing call to action on fog with a single peach radial, WhatsApp as a filled pill and email as a ghost pill, then the operational facts.
10. **Footer** — the mark alone, four link columns, and a single closing row on a fog-white surface with no divider line and no oversized wordmark.

Sections reveal their headers and stagger their items on scroll through `components/motion/Reveal.tsx`, and the white sections draw three vertical hairlines at 25/50/75% of the container (`.column-guides` in `app/globals.css`). The band order (white, fog, peach, ink) is deliberate: without alternating surfaces the page reads as one flat colour from top to bottom.

Service pages (`/[locale]/services/[slug]`) follow the team page's calmer shape instead: one reading column, no wash and no parallax, hairline-separated blocks. They reuse `workflow.steps` for "How it runs" and derive "Other services" by walking the same list, so the process and the cross-links cannot drift from the rest of the site. Copy is deliberately lean — one intro and four included points per service, no testimonials or invented metrics.

Product pages (`/[locale]/products/[slug]`) follow that same calm shape. The six platform products carry a `Soon` badge and a "no release date yet" status note instead of promising access. The Ngambeg page is the one product page that is already live, so it opens the two catalogs on ngambeg.com and lists the platform products.

The 404 page is styled in the same system.

---

## Data sources

- `lib/i18n.ts` — every visible string, for all five locales.
- `lib/products.ts` — product catalogue used by the navbar dropdown, the Products section, and the footer. Two levels: groups (`platforms`, `ngambeg`) and the items inside them. Games and apps share the `ngambeg` group because they are presented as one list pointing at ngambeg.com. Fill in `href` for a product once its site exists; `null` renders a `Soon` badge instead of a link.
- `lib/services.ts` — service slugs shared by the navbar Services panel and the Services section. Its order must match the `services` array in `lib/i18n.ts`; titles and descriptions stay there because they are translated. The file carries no icons: the design system has none, so the section numbers the services instead.
- `lib/team.ts` — the one team member: name, optional photo, and contact links. Set `photo` to a path under `public/` once the portrait exists; until then the page renders a monogram tile.
- `lib/clients.ts` — the client list: name, logo path, ISO country code (or `null` for a global brand), optional tagline, and native image size. Logos live in `public/clients/`, flags in `public/flags/`. A `null` logo renders the name as a text wordmark instead of an image.
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
- **Motion:** `motion` (formerly Framer Motion) for entrance choreography and scroll reveals, plus CSS keyframes for the marquee, the hero wash drift, and the nav panel. Everything collapses to static under `prefers-reduced-motion`
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
