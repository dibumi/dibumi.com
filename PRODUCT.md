# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: **business decision-makers looking for a software vendor** — owners and technical
managers at Indonesian companies who have a workflow problem, an existing website that should
become a Play Store app, or servers they cannot keep secure on their own. They arrive to judge
whether this studio can be trusted with a system, then to make contact.

Secondary audiences named in the copy, in order of prominence:

- companies needing internal workflow systems, modular ERP/CRM (`lib/i18n.ts:332`);
- companies needing a corporate site that their **sales team** can send people to
  (`lib/i18n.ts:350`, `lib/i18n.ts:411`);
- companies with a website that want an official Android app (`lib/i18n.ts:344`);
- businesses needing server operations and uptime cover (`lib/i18n.ts:361`);
- hosting businesses (Cloud Hosting Billing) and developers (AI Gateway) — future product
  buyers, reachable only through the Products section (`lib/i18n.ts:475`, `lib/i18n.ts:511`).

Absent by design: no careers, investor, partner, newsletter, or documentation audience
exists. There is no route for any of them.

## Product Purpose

The marketing site of **dibumi.com**, an app and software production studio in Lamongan, East
Java, operating since 2013, trading as **Dibumi Technology Indonesia** (`lib/legal.ts:18`).

It exists to turn an unfamiliar visitor into a qualified enquiry. Every call to action is a
sales CTA — `Start a project` (`lib/i18n.ts:241`), `Discuss a project` (`lib/i18n.ts:309`),
`Start building your system` (`lib/i18n.ts:641`) — and every contact path is direct:
WhatsApp and `mailto:` (`components/ContactSection.tsx:88`). There is no form, no signup, no
account.

Success means the visitor contacts the studio. No conversion instrumentation exists in the
codebase, so this is stated as intent, not as a measured funnel.

## Positioning

**Open decision — not yet settled by the owner.** The site currently makes claims, but the
durable differentiating mechanism has not been confirmed. Do not let design work harden an
unconfirmed position into brand truth.

What the copy *does* claim today, as fact about the current copy (not as approved strategy):

- "We build it. We keep it running." — the hero line (`lib/i18n.ts:249`).
- "One team ships it and stays on call." (`lib/i18n.ts:252`).
- "Seven practices, one team." (`lib/i18n.ts:307`).
- "The code, the servers, and the guarantee ship together, from the same people."
  (`lib/i18n.ts:311`).
- Ownership without lock-in: "You own the code, the repositories, and the cloud accounts from
  day one." (`lib/i18n.ts:297`); "Full ownership" (`lib/i18n.ts:623`).
- "Built in Lamongan, shipped worldwide." (`lib/i18n.ts:668` — currently defined but **not
  rendered**; see Evidence).

## Operating Context

**How clients engage** — a four-step process, single-sourced at `lib/i18n.ts:573` and reused
by every service page and the home Process section:

1. Discovery & Requirements → written Scope of Work
2. System Design & Architecture → database, API, UI/UX, server specs
3. Development & Quality Assurance → clean code, tested for function, security, performance
4. Deployment, Training & Warranty → launch, team guidance, bug-fix warranty

**Commercial mechanics** are stated only in the legal documents (`lib/legal.ts`): work is
governed by a Proposal / Statement of Work; out-of-SOW work is quoted separately; change
requests confirmed in writing; deposit at start plus milestone settlement; IP transfers after
full payment; the studio may name a project in its portfolio unless asked not to; liability is
capped at the amount paid; governing law is the Republic of Indonesia.

**Client footprint** — 14 named clients (`lib/clients.ts:36`), eleven with logo assets and
three as text wordmarks, spanning ten entity jurisdictions (CN, SG, CY, SA, ID, CR, RO, PA,
US, IN) plus two global brands without a jurisdiction. The logo wall closes with a fifteenth
cell, "Other" and "and 100+ more", which is a marker rather than a client. The dominant
vertical by count is performance advertising and adtech; this is an observation of the asset
list, not a claim the site makes.

**Geography** — home base Lamongan, East Java (`lib/i18n.ts:255`); stated service area
Indonesia (`lib/i18n.ts:646`); stated reach worldwide (`lib/i18n.ts:668`).

## Capabilities and Constraints

**Seven sellable services** (`lib/services.ts:19`), each with a detail page: custom software,
custom web development, Android WebView, modern company profiles, custom Android apps, server
& DevOps, maintenance & SLA.

**Two retired practices**, rendered dimmed and unnumbered and explicitly not for sale:
Digital Marketing ("No longer offered") and Penetration Testing ("Currently inactive")
(`lib/i18n.ts:314`).

**Six own-platform products, all unreleased** (`lib/products.ts:69`): AI Gateway, Payment
Orchestration, Adserver Exchange, Cloud Hosting Billing, Traffic Analytics, Self Hosted Online
Store. Every one carries `status: "soon"` and the same note: "In development — no release date
yet." (`lib/i18n.ts:558`). No release dates may be invented.

**One live property**: Ngambeg Cyber Media at `ngambeg.com`, a sister label publishing games
and Android utilities (`lib/products.ts:58`). The site links to it; it deliberately does not
copy the catalogue (`components/NgambegPage.tsx:20`).

**Stack** (existing codebase answers this; recorded so later work does not re-litigate it):
Next.js 16 App Router, React 19, TypeScript strict, Tailwind **v3** (tokens hand-mirrored
between `tailwind.config.ts` and `app/globals.css`), `motion`, `lucide-react`, four
`next/font/google` faces, deployed as a Cloudflare Worker via OpenNext with no ISR.
90 statically generated pages (5 locales × 18 routes). Unknown slugs 404 at the edge via
`dynamicParams = false`.

**Locales**: `en` (default), `id`, `ar`, `zh`, `pl` (`lib/i18n.ts:3`). `ar` is RTL
(`lib/i18n.ts:2476`). Slugs are untranslated so the switcher can preserve the path. Legal
documents exist in `en` and `id` only; other locales render English with a notice
(`lib/legal.ts:436`).

**Stated limits that constrain copy**: Android WebView is sold as 1–2 day delivery
(`lib/i18n.ts:346`); SLA response time is "agreed in writing before the first ticket"
(`lib/i18n.ts:441`); 24/7 emergency server cover is for SLA clients only (`lib/i18n.ts:651`).

## Brand Commitments

**Name** is always lowercase `dibumi.com` (`app/layout.tsx:49`). The mark is a monoline `d`
standing on a shallow horizon curve, reading as "di bumi" (`components/BrandMark.tsx:4`).

**Voice rules are binding commitments, not preferences** — each is written into the code as an
instruction:

1. **Never invent a metric, testimonial, client count, quote, or image.** "no testimonials or
   invented metrics" (`README.md:55`); "what is not certainly true is not written"
   (`components/ServicePage.tsx:15`); "Do not invent an image for it" (`lib/clients.ts:12`).
2. **No decorative icons anywhere** — "decorative icons have been removed from the entire
   site" (`components/Standards.tsx:19`, `components/Services.tsx:32`).
3. **The serif is never bold** (`components/TeamPage.tsx:15`, `components/SectionHeading.tsx:10`).
4. **No photography of people or product screenshots that do not exist**
   (`components/Clients.tsx:10`).
5. **One chromatic pair only** — `blush-peach #fbe1d1` / `sienna-brown #5d2a1a`; the palette is
   otherwise achromatic (`README.md:15`, `tailwind.config.ts:6`).
6. **Cards never carry shadows**; only the framed product demo and dropdown overlays do
   (`README.md:17`, `tailwind.config.ts:13`).

**Anchor-offset contract** (from `AGENTS.md`, enforced in code): `scroll-padding-top` in
`app/globals.css` is the single source of truth for the sticky-header offset and must stay in
sync with the navbar height in `components/Navbar.tsx`. Sections must not also add
`scroll-margin-top`, because the browser sums both.

**Verification constraint** (from `AGENTS.md`): the dev server and builds are run by the owner,
never by an agent session. Allowed: `npm run typecheck`, reading files, `git diff`.

## Evidence on Hand

**Real and usable:**

- 14 named clients in `public/clients/` (`lib/clients.ts:36`), eleven with logo assets.
  Wap2Cash, MyWapBlog, and ZetMoney deliberately have no image and render as text wordmarks
  (`lib/clients.ts:12`). The wall's fifteenth cell is a closing "Other" marker, not a client.
- Three literal headline figures: 100+ clients, 10+ countries, since 2013
  (`components/Clients.tsx:70`). Hard-coded on purpose, not computed.
- One named team member: Fatkul Nur Koirudin, Founder & Lead Engineer (`lib/team.ts:30`).
- Two real legal documents, dated 11 October 2026, in `en` and `id` (`lib/legal.ts:28`).
- Brand assets in `public/brand/` (`README.md:75`).
- A live sister property at `ngambeg.com`.

**Absent — future work must not fabricate any of these:**

- testimonials, quotes, ratings
- case studies or project pages
- pricing, packages, or rates
- certifications, awards, ISO, accreditations
- client counts beyond the three headline figures; any per-client project detail
- team photos (`lib/team.ts:31` is `null` by design)
- founder or studio photography
- a contact form — there is no `<form>` and no `<input>` anywhere in the tree; contact is
  WhatsApp and `mailto:` only
- newsletter, analytics, or any third-party script
- product screenshots or UI mockups — the product panel is a framed typographic document
- founding/registration numbers

**Known drift that design work should not treat as truth:**

- The privacy policy refers to "the contact form on the site" (`lib/legal.ts:250`,
  `lib/legal.ts:257`) but no form exists.
- `footer.builtFor` / `footer.description` and `hero.chips` are defined in `lib/i18n.ts` but
  never rendered (`components/Footer.tsx:134`, `components/Hero.tsx`).
- `public/brand/*` exports still carry pre-migration colours (teal `#0a7668`, ink `#16332d`)
  and need regenerating before external use (`README.md:82`).
- `public/images/software-workspace.jpg` is referenced by nothing.
- The nav label reads "Team" but the route is `/teams` (plural).

## Product Principles

Derived from the confirmed answers and the code's own binding rules. These are strategic, not
visual.

1. **Truth over polish.** A claim, number, quote, or image that is not verifiable does not go
   on the page. This is the studio's most repeated written instruction and it outranks any
   design ambition.
2. **One team, end to end.** Scoping, code, servers, and the guarantee come from the same
   people. Any design or copy choice that implies a larger organisation, a bench, or a
   handoff to someone else misrepresents the product.
3. **The visitor's next step is contact.** There is no funnel, no account, no form. Every
   surface should make WhatsApp or email the obvious, frictionless exit.
4. **Ownership is the promise.** Code, repositories, and cloud accounts belong to the client.
   Copy and UI should never imply lock-in, rental, or retention.
5. **The offering is partly unbuilt.** Six of the showcased products have no release date.
   Presenting them as available would break principle 1.

## Accessibility & Inclusion

No formal WCAG target has been declared. What the code already commits to, and what design
work must preserve:

- **Reduced motion** is honoured three ways: a global
  `@media (prefers-reduced-motion: reduce)` block deliberately placed last in
  `app/globals.css` so it wins the cascade; `motion-reduce:` utilities; and
  `useReducedMotion()` in `components/motion/Reveal.tsx` and `components/Hero.tsx`.
- **Visible focus** is one site-wide `:focus-visible` outline in ink-black, chosen because
  peach fails contrast on white (`app/globals.css:89`).
- **Keyboard** support includes a real `tablist`/`tab`/`tabpanel` with roving `tabIndex` and
  arrow keys (`components/Products.tsx:76`), Escape-to-close with focus return on nav panels
  and the language switcher, and a focus trap in the mobile sheet (`components/Navbar.tsx:223`).
- **RTL** is implemented with logical properties throughout (`ms/me/ps/pe/start/end`), flipped
  glyphs, disabled letter-spacing in Arabic, and loosened hero leading for diacritics.
- **Screen-reader hygiene**: decorative gradients, connectors, ordinals, and chrome dots are
  `aria-hidden`; the marquee's duplicate list is hidden so names are announced once; retired
  services state their status as text, not colour alone.

Known gaps, to fix rather than document as acceptable:

- **No skip-to-content link.**
- `<html lang="en">` is hard-coded in the root layout and corrected only after hydration, so
  crawlers that do not execute JavaScript see the wrong language and no direction
  (`app/layout.tsx:107`, `components/HtmlLangSync.tsx:13`).
- No `aria-live` region and no `<noscript>` fallback.
- 45 text nodes fail WCAG AA contrast on the rendered home page, traced to the gray token
  ramp rather than to individual components.
