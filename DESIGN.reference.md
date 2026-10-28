# Steep — Style Reference
> serif analytics on warm paper

**Theme:** light

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

Steep renders analytics as editorial — serif Signifier headlines float over a near-monochrome white canvas while a single warm peach accent (#fbe1d1) punctuates an otherwise achromatic system. The page reads like a product magazine spread: oversized italicized display type, generous breathing room, large soft-edged cards at 24px radius, and pill-shaped controls that sit flat against the surface. Components feel quiet and weightless — shadows are barely-there, borders are hairline, and color is rationed to functional emphasis (a peach callout card, a dark brown label on peach). The product surfaces (region tables, activation charts, AI composers) are presented as floating artifacts around the headline, not nested in a dashboard shell.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Ink Black | `#17191c` | `--color-ink-black` | Primary text, filled button background, nav logo — the only dark surface in the system; every CTA and body headline resolves to this near-black |
| Paper White | `#ffffff` | `--color-paper-white` | Page canvas, button text, elevated card surfaces — the dominant background tone carrying ~76 frequency points |
| Mist Gray | `#f2f2f3` | `--color-mist-gray` | Card surfaces, secondary backgrounds, input fills — the quiet layer beneath paper for nested content |
| Fog White | `#fafafb` | `--color-fog-white` | Secondary page background for alternating sections, hover surfaces — one step above paper for subtle band variation |
| Slate Gray | `#777b86` | `--color-slate-gray` | Link color, muted helper text, footer copy — cool desaturated gray that sits between body text and disabled |
| Ash Gray | `#979799` | `--color-ash-gray` | Tertiary labels, category tags (Marketing, Finance, Sales) — one step lighter than link color |
| Smoke Gray | `#a3a6af` | `--color-smoke-gray` | Placeholder text (Ask anything…), disabled labels — the lightest functional gray, used when text recedes |
| Blush Peach | `#fbe1d1` | `--color-blush-peach` | Accent card background, warm highlight wash — the only chromatic surface in the system; creates editorial warmth against monochrome |
| Sienna Brown | `#5d2a1a` | `--color-sienna-brown` | Text and stroke on peach surfaces, dark accent for chart line strokes — a warm deep brown that pairs with Blush Peach like ink on kraft paper |

## Tokens — Typography

### Signifier — Display and headline serif — used exclusively for H1/H2 at three sizes; weight stays at 400 (regular) at every scale, which is the signature choice: the serif whispers authority rather than shouting in bold · `--font-signifier`
- **Substitute:** GT Sectra, Tiempos Headline, Source Serif 4, or ui-serif/Georgia as fallback
- **Weights:** 400
- **Sizes:** 44px, 64px, 90px
- **Line height:** 1.30
- **Letter spacing:** -2.25px at 90px, -0.96px at 64px, -0.66px at 44px
- **Role:** Display and headline serif — used exclusively for H1/H2 at three sizes; weight stays at 400 (regular) at every scale, which is the signature choice: the serif whispers authority rather than shouting in bold

### Sohne — Body, UI, and navigation sans — the workhorse covering everything from 14px metadata to 26px subheads; the half-step weights (430, 450, 480) create fine-grained hierarchy without jumping to bold · `--font-sohne`
- **Substitute:** Inter, Söhne (Klim Type Foundry), or ui-sans-serif/system-ui stack
- **Weights:** 400, 430, 450, 480, 500
- **Sizes:** 14px, 15px, 16px, 17px, 18px, 20px, 22px, 26px
- **Line height:** 1.00–1.50
- **Letter spacing:** -0.234px at 26px, -0.162px at 18px, 0 at body sizes
- **Role:** Body, UI, and navigation sans — the workhorse covering everything from 14px metadata to 26px subheads; the half-step weights (430, 450, 480) create fine-grained hierarchy without jumping to bold

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|------|--------|--------|------|-------------|----------------|-------|
| caption | — | — | 15px | 1.5 | — | `--text-caption` |
| body | — | — | 17px | 1.35 | — | `--text-body` |
| body-lg | — | — | 20px | 1.35 | — | `--text-body-lg` |
| subheading | — | — | 22px | 1.5 | — | `--text-subheading` |
| heading-sm | — | — | 26px | 1.18 | -0.23px | `--text-heading-sm` |
| heading | — | — | 44px | 1.3 | -0.66px | `--text-heading` |
| heading-lg | — | — | 64px | 1.3 | -0.96px | `--text-heading-lg` |
| display | — | — | 90px | 1.3 | -2.25px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 28 | 28px | `--spacing-28` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |
| 96 | 96px | `--spacing-96` |
| 124 | 124px | `--spacing-124` |
| 128 | 128px | `--spacing-128` |
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 24px |
| images | 12px |
| inputs | 16px |
| buttons | 9999px |
| smallCards | 16px |
| elevatedCards | 20px |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| subtle | `oklab(0 0 0 / 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) ...` | `--shadow-subtle` |
| subtle-2 | `oklab(0 0 0 / 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0...` | `--shadow-subtle-2` |
| subtle-3 | `rgba(4, 23, 43, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1)...` | `--shadow-subtle-3` |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 80px
- **Card padding:** 20px
- **Element gap:** 8px

## Components

### Pill Button — Filled
**Role:** Primary call-to-action (Get started, Book a demo)

Background #17191c, text #ffffff, border 1px solid #ffffff (invisible against fill), border-radius 9999px (fully rounded), padding 0 20px, height auto with text. Sohne 16px weight 400. No shadow. The pill shape and dark fill against white is the signature action element — it reads as a solid black lozenge.

### Pill Button — Ghost
**Role:** Secondary action paired with filled primary (Book a demo beside Get started)

Background transparent, text #17191c, border 1px solid #17191c, border-radius 9999px, padding 0 20px. Sohne 16px weight 400. Shares the pill geometry with the filled variant so they read as a matched pair on the same baseline.

> **Note:** the live steep.app hero does **not** use this variant. Its secondary hero action is a **Text Link with Arrow** beside the filled pill. The ghost pill is still the correct secondary action inside page bodies, but the hero pair is filled pill + text link. See "Where this project departs from the reference".

### Text Link with Arrow
**Role:** Inline navigation and section transitions (Learn more →, Read the story →)

No background, no border, no border-radius, text #17191c, Sohne 16px weight 400, padding 20px 0. The arrow glyph (→) is part of the label, not a separate icon. This is the lowest-emphasis interactive element — underlines only on hover.

### Nav Link
**Role:** Top navigation items (Product, Resources, Customers, Pricing)

No background or border, text #17191c, Sohne 16px weight 400, padding 2px 0. Sits in a transparent top bar with the logo left and CTAs right. The nav is whisper-quiet — no background, no shadow, no separator.

### Neutral Card
**Role:** Feature blocks, content containers, and base card surface

Background #f2f2f3, border-radius 24px, no shadow, no border, padding varies (0 internally with content children providing their own padding). This is the default workhorse card — flat, soft, and quiet.

### Accent Peach Card
**Role:** Editorial highlight or callout panel (customer quotes, feature spotlights)

Background #fbe1d1, text and strokes #5d2a1a, border-radius 24px, no shadow, no border. The warm-on-warm palette creates a kraft-paper effect — these cards should be rare (one per page maximum) to preserve their impact.

### Floating Product Artifact
**Role:** Hero and section visual elements (region table, activation chart, registration card, AI composer)

Background #ffffff, border-radius 20px, subtle box-shadow: 0 0 0 1px rgba(4,23,43,0.05), 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1), padding 16px 20px 12px 12px. These are the product UI fragments that float around hero text — they are the only elements with visible shadow, and only at 10% opacity.

### Input / Composer
**Role:** AI question input field (Ask anything…)

Background #ffffff, border 1px solid #ececec or hairline, border-radius 16px, padding 16px, placeholder text #a3a6af in Sohne 16px. Contains left-side @ and ⓘ icons and a right-side dark circular send button (40px diameter, #17191c fill, white arrow icon).

### Stat Card with Chart
**Role:** Data display fragment (Registrations 2.4k, Activation 46.2%)

White floating artifact surface with a bold metric in Sohne 20px weight 500 #17191c, a delta line (↑ 5.5x vs last week) in Sohne 14px #777b86, and a minimal line or radial chart in #5d2a1a stroke. No axes, no gridlines — the chart is a gestural line, not a data dashboard.

### Avatar Bubble
**Role:** User presence indicator on floating cards (JB, AF initials)

Circular, 40px diameter, border-radius 9999px, background tinted (light green for JB, light blue for AF), 2-letter monogram in Sohne weight 500, small directional arrow (cursor pointer) extending from the bubble edge.

### Tag / Category Label
**Role:** Section or content category markers (Marketing, Finance, Sales)

No background, no border, text in Sohne 14px weight 400 #979799. Intentionally ghost-like — these are typographic tags, not badges. They group without visual weight.

## Do's and Don'ts

### Do
- Use Signifier weight 400 at 44/64/90px for all display and heading copy; never substitute a sans-serif at these sizes
- Use the peach #fbe1d1 card surface at most once per page and only for editorial emphasis — treat it as a rare accent, not a background
- Set border-radius to 9999px on all buttons and 24px on all content cards; these are the two structural radii of the system
- Pair every filled pill button (#17191c) with a ghost pill button (#17191c border, transparent fill) as a secondary action on the same row
- Use Sohne half-step weights (430, 450, 480) for body hierarchy before reaching weight 500 — the scale is finer than standard 400/500/700
- Set letter-spacing to -0.025em on 90px display, -0.015em on 64/44px headings, and -0.009em on 26/18px Sohne — tighter tracking at larger sizes is the typographic signature
- Keep the 4px base unit: use 4/8/12/16/20/24px for component padding, and 80px for section gaps

### Don't
- Don't use chromatic colors beyond the peach/brown pair — the system is intentionally 97% achromatic; introducing blue, green, or purple will break the editorial restraint
- Don't use bold (600+) or semibold (500) weights in Signifier — the serif stays at 400 across all sizes, that restraint is the signature
- Don't apply drop shadows to content cards (Neutral Card or Accent Peach Card) — only floating product artifacts earn elevation
- Don't use border-radius below 16px on cards or below 9999px on buttons — sharp corners and moderate radii are not part of this system
- Don't underline inline text links at rest — the arrow suffix (→) carries the link affordance; underlines appear only on hover
- Don't place the peach #fbe1d1 card on a non-white section background — it needs Paper White or Card Mist beneath it to read as warm-on-neutral
- Don't use the #5d2a1a Sienna Brown outside peach surfaces — it's the ink for Blush Peach cards and chart strokes, never body text on white

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Canvas | `#ffffff` | Default page background; the white paper everything sits on |
| 1 | Card Mist | `#f2f2f3` | Quietly nested content blocks, feature cards, tab panels |
| 2 | Section Fog | `#fafafb` | Alternating section bands that break up the white canvas without contrast |
| 3 | Accent Blush | `#fbe1d1` | Editorial accent cards; the chromatic punctuation of the system |
| 4 | Elevated White | `#ffffff` | Floating product UI artifacts (region tables, activation charts, AI composer) that overlap hero/section content with subtle shadow |

## Elevation

- **Floating Product Artifact:** `0 0 0 1px rgba(4,23,43,0.05), 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)`
- **Modal / Overlay Card:** `oklab(0 0 0 / 0.05) 0px 0px 0px 1px, rgba(0,0,0,0.1) 0px 8px 40px 0px`
- **Dropdown / Popover:** `oklab(0 0 0 / 0.05) 0px 0px 0px 1px, rgba(0,0,0,0.08) 0px 4px 24px 0px`

## Imagery

Imagery is product-first, not lifestyle: floating UI fragments (region tables with 5-row data, line charts showing activation over Aug–Nov, radial progress rings, AI input composers) are positioned as cropped screenshots around editorial headlines. No photography, no illustration, no abstract graphics. All product visuals sit on white floating-artifact cards with hairline borders and soft 10% shadows. Avatar circles carry a small directional cursor pointer — a visual motif that signals live interaction. The hero composition is a text-and-UI collage, not a centered headline with a stock photo.

## Layout

Page model is max-width 1200px centered, with hero sections going near full-bleed but staying within the container. The hero pattern is a centered oversized serif headline with a subhead and pill button pair, surrounded by four floating product artifact cards (region table top-left, registration card right, activation chart bottom-left, AI composer bottom-center) that overlap the white canvas at varied offsets. Sections alternate between Paper White and Card Mist backgrounds to create quiet rhythm without strong contrast. Feature sections use a 2-column text+UI layout with generous 80px vertical gaps. Navigation is a single transparent top bar (no background, no border, no shadow) with logo left, nav links center, and two CTAs (text link + filled pill) right. The overall density is spacious — the page breathes between sections, and content never crowds the edges.

## Agent Prompt Guide

## Quick Color Reference
- text: #17191c
- background: #ffffff
- border: #ececec
- muted text: #777b86
- accent: #fbe1d1
- primary action: #17191c (filled action)

## Example Component Prompts
1. **Hero headline + accent card collage**: White canvas (#ffffff). Display headline at 90px Signifier weight 400, #17191c, letter-spacing -2.25px, with one italicized phrase mid-sentence. Subhead at 17px Sohne weight 400, #777b86. Below: a filled pill button (background #17191c, text #ffffff, border-radius 9999px, padding 0 20px, Sohne 16px) and a ghost pill button (background transparent, border 1px solid #17191c, text #17191c, border-radius 9999px) side by side. Surround the text with three white floating product artifact cards: a data table card, a line chart card, and a stat card — each with background #ffffff, border-radius 20px, box-shadow 0 0 0 1px rgba(4,23,43,0.05) + 0 20px 25px -5px rgba(0,0,0,0.1), positioned with negative margins to overlap the text margins.

2. **Accent editorial card**: Background #fbe1d1, text #5d2a1a, border-radius 24px, no shadow, padding 40px. Title at 26px Sohne weight 450, #5d2a1a, letter-spacing -0.23px. Body quote at 18px Sohne weight 430, #5d2a1a. Attribution at 14px Sohne weight 400, #5d2a1a. Place this card once on a #ffffff section, never on a colored or dark background.

3. **Neutral feature card**: Background #f2f2f3, border-radius 24px, no shadow, padding 32px 20px. Category label at 14px Sohne weight 400, #979799 (no background, no badge style). Title at 20px Sohne weight 500, #17191c. Body at 16px Sohne weight 400, #17191c, line-height 1.5. Text link below: Sohne 16px weight 400, #17191c, no border-radius, padding 20px 0, with → arrow suffix.

4. **AI composer input**: White background #ffffff, border 1px solid #ececec, border-radius 16px, padding 16px, width 480px. Placeholder text Ask anything… at 16px Sohne weight 400, #a3a6af. Left side: two ghost icon buttons (40px circle, no fill). Right side: 40px circular send button with background #17191c, white arrow icon centered.

5. **Section with alternating background**: Section background #fafafb (Fog White), padding 80px vertical. Section title at 64px Signifier weight 400, #17191c, letter-spacing -0.96px. Subhead at 18px Sohne weight 430, #777b86. Below: 3-column grid of neutral feature cards (#f2f2f3 background, 24px radius, 20px padding, no shadow) with 24px column gap.

## Similar Brands

- **Linear** — Same monochrome dark-text-on-white approach with oversized serif-free type and pill-shaped CTAs; Linear's restraint matches Steep's editorial minimalism
- **Pitch** — Presentation tool that pairs serif display headlines with a warm accent palette and floating UI cards; shares the editorial-product hybrid visual language
- **Arc** — Browser with a soft warm-toned monochrome interface, generous border-radius on cards, and the same whisper-quiet typography approach
- **Framer** — Large serif headlines floating over white with minimal chrome and pill controls; shares the magazine-spread page architecture

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-ink-black: #17191c;
  --color-paper-white: #ffffff;
  --color-mist-gray: #f2f2f3;
  --color-fog-white: #fafafb;
  --color-slate-gray: #777b86;
  --color-ash-gray: #979799;
  --color-smoke-gray: #a3a6af;
  --color-blush-peach: #fbe1d1;
  --color-sienna-brown: #5d2a1a;

  /* Typography — Font Families */
  --font-signifier: 'Signifier', ui-serif, Georgia, 'Times New Roman', serif;
  --font-sohne: 'Sohne', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 15px;
  --leading-caption: 1.5;
  --text-body: 17px;
  --leading-body: 1.35;
  --text-body-lg: 20px;
  --leading-body-lg: 1.35;
  --text-subheading: 22px;
  --leading-subheading: 1.5;
  --text-heading-sm: 26px;
  --leading-heading-sm: 1.18;
  --tracking-heading-sm: -0.23px;
  --text-heading: 44px;
  --leading-heading: 1.3;
  --tracking-heading: -0.66px;
  --text-heading-lg: 64px;
  --leading-heading-lg: 1.3;
  --tracking-heading-lg: -0.96px;
  --text-display: 90px;
  --leading-display: 1.3;
  --tracking-display: -2.25px;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-w430: 430;
  --font-weight-w450: 450;
  --font-weight-w480: 480;
  --font-weight-medium: 500;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;
  --spacing-124: 124px;
  --spacing-128: 128px;
  --spacing-160: 160px;

  /* Layout */
  --page-max-width: 1200px;
  --section-gap: 80px;
  --card-padding: 20px;
  --element-gap: 8px;

  /* Border Radius */
  --radius-sm: 0.01px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-2xl-2: 20px;
  --radius-3xl: 24px;

  /* Named Radii */
  --radius-cards: 24px;
  --radius-images: 12px;
  --radius-inputs: 16px;
  --radius-buttons: 9999px;
  --radius-smallcards: 16px;
  --radius-elevatedcards: 20px;

  /* Shadows */
  --shadow-subtle: oklab(0 0 0 / 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 4px 24px 0px;
  --shadow-subtle-2: oklab(0 0 0 / 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 8px 40px 0px;
  --shadow-subtle-3: rgba(4, 23, 43, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px;

  /* Surfaces */
  --surface-canvas: #ffffff;
  --surface-card-mist: #f2f2f3;
  --surface-section-fog: #fafafb;
  --surface-accent-blush: #fbe1d1;
  --surface-elevated-white: #ffffff;
}
```

---

# Adoption notes for dibumi.com

The reference above is the target. This project implements it on **Tailwind CSS 3**, not v4, and a few substitutions are unavoidable. Everything below is a deliberate deviation, not a drift.

## Token layer

- Tailwind v4's `@theme` block from the reference is **not** used. The same tokens live in `tailwind.config.ts` under `theme.extend`, and the CSS custom properties live in `app/globals.css` under `:root`. Both are kept in sync by hand; when a token changes, change both.
- Tailwind names differ from the CSS custom property names where a prefix would collide. The mapping is: `--color-ink-black` → `bg-ink-black`, `--radius-cards` → `rounded-cards`, `--shadow-subtle-3` → `shadow-subtle-3`, `--text-heading-lg` → `text-heading-lg`.
- One colour is added beyond the reference: `hairline` (`#ececec`), the border value named in the Quick Color Reference. It is a border colour only, never a surface.
- `--radius-sm: 0.01px` is carried over verbatim as a source-measurement artifact. Do not use it for real corners.

## Typography substitutions

- **Signifier** and **Sohne** are commercial licences. This project ships **Source Serif 4** for display and **Inter** for body, both loaded through `next/font/google` and exposed as `--font-display` and `--font-sans`.
- Consequence: the half-step weights (430, 450, 480) from the reference resolve to the nearest available instance weight. Source Serif 4 is loaded as a variable font, so the display weight stays at 400 as required; Inter is variable too, so 430/450/480 render as genuine interpolations.
- The reference lists `--font-signifier` with a **sans-serif** fallback stack, which contradicts its own rule that display copy is never set in a sans. The fallback here is `ui-serif, Georgia, serif`. This is the one place where the transcription intentionally departs from the source.
- Arabic (`IBM Plex Sans Arabic`) and Chinese (`Noto Sans SC`) companions stay in place: neither Source Serif 4 nor Inter carries those glyphs. The `font-ar` and `font-zh` families keep the display face for Latin inside those locales so headings do not fall back to a generic serif.

## Scope of this document

- This file describes the **target** visual system. Sections of the site that have not been migrated yet are out of date relative to it, and should be brought over rather than used as precedent.
- The anchor-offset rule in `AGENTS.md` still holds and is not affected by this document: `scroll-padding-top` in `app/globals.css` stays in sync with the header height in `components/Navbar.tsx`, and sections must not add `scroll-margin-top` on top of it.

## Where this project departs from the reference

Nine deliberate deviations. Six are because the reference's exact asset, surface, or product does not exist here; the seventh is because the live site disagrees with its own style guide; the eighth is a later owner decision to close the page on the same peach surface as the Clients band; the ninth is the hand-drawn service glyphs.

- **The hero atmosphere.** The reference backs its hero with a looping gradient-mesh video (`steep.app/videos/door.mp4`) plus a noise overlay. A video is not shipped here. The wash is rebuilt in CSS as seven stacked radial gradients (`.hero-atmosphere` in `app/globals.css`), each on a 120% layer so it can drift on a 26-second alternating loop, with a desaturated `feTurbulence` grain (`.hero-grain`) and a white fade at the bottom edge (`.hero-fade`). The drift is the substitute for the video's motion: without it the wash freezes in a way the reference never does. It is the only place on the site that uses colour outside the peach/sienna pair, and only as a background wash, never as a component surface.
- **The hero's secondary action.** The Ghost Pill entry above describes a bordered pill as the secondary action. The live steep.app hero pairs its filled pill with a plain **text link and arrow** instead. The hero follows the live site, not the style guide. The ghost pill remains available for a secondary action inside a page body, though the closing contact band now uses plain underlined text links for both channels.
- **The hero's artifact cards.** The reference surrounds its headline with four floating product-UI cards (region table, registration card, activation chart, AI composer) that bleed past the viewport edge. This build has none. Each of the four repeated something the page already says in full further down — the client list, the service list, the counts — so the hero stopped being a statement and became a summary of the page. The wash and the type carry it alone, which is also how the reference's own hero reads once the video is doing the moving. This is why there is no `Input / Composer` component anywhere in this build: a composer for a product that does not exist is invented UI.
- **The hero's credential line.** The reference's hero stops at the subhead and the pill pair. This build closes with one 15px ash line — `Lamongan, East Java · Since 2013` — because the founding year is the only proof of experience the studio can claim without inventing a metric, and the Clients band that states it sits far below the fold. It is a caption, not an overline: no uppercase, no tracking, so it does not compete with the marquee's overline directly beneath the hero.
- **The accent card position.** In the reference the first feature card of the three-up row is peach. That is where the single peach card lives here too. The peach *band* in Clients is a section surface, not a card, and is a separate instance of the accent; the closing contact band is the third, added later (see below).
- **Illustrations.** The reference's feature cards carry line illustrations, and its hero cards carry charts. No such assets exist for this studio, and drawing decorative SVGs would be inventing imagery, so each feature card carries an oversized serif ordinal as a watermark bleeding off the bottom-right corner — typography doing the visual work. No decorative illustration, chart, or figure is drawn; a decorative line would be an image of something that does not exist. The only schematics are built from the page's own data, in hairlines and type: the delivery diagram in Services, and the three-node service flow on each service page. Both explain a mechanism the copy already states. The seven service glyphs are the one other drawn mark, and they are navigation aids, not illustration — see the last bullet.
- **The dark band's photography.** The reference fills its customer-story band with a photograph and its dark band with product screenshots. Neither exists here. The story band becomes a logo wall of the fourteen real clients, closed by an "Other" cell that says "and 100+ more", and the dark band becomes a diagram of the delivery model built from the section's own data.
- **The closing surface.** The reference closes on a neutral mist panel with a filled and a ghost pill. This build closes on the same peach surface as the Clients band, as a bookend: a serif statement on the left, the description and two underlined text actions on the right, no printed hours, address, phone, or email. Those values live in the footer, where a reader looks after finishing the page. This makes peach the only band colour that appears twice, and it is a deliberate owner choice rather than an inference from the reference.
- **Service glyphs.** The reference carries no service menu, so it has nothing to say about how one is scanned. The seven services here are led by hand-drawn glyphs in `components/ServiceGlyph.tsx`: one per slug, 24px grid, stroke 1.25, no fill, `currentColor`, always `aria-hidden`. They are navigation aids — the home Services list and the left of each row in the mega menu and mobile sheet — never decoration, never an illustration, never on a retired service. Lucide would have supplied software, web, mobile and games marks, but that generic set is category furniture every agency already uses, and it would erase the one thing the page has that a template does not: its own hand. The delivery diagram keeps its 01–07 ordinals, because numbering states a sequence the glyphs cannot.

## Motion

The reference is built on GSAP ScrollTrigger; it pins its hero for 3256px and scrubs several sections. This build does not pin anything. A pinned hero was tried and removed: the cards slid off-screen and left empty scroll behind them, which is worse than the motion it bought. The floating artifact cards went the same way — a hero that is text on a wash needs neither a pin nor a drift loop. What remains:

- **Entrance choreography**, not scroll scrubbing. The hero's two headline lines lift out of a mask 0.1s apart, then the paragraph and the buttons follow.
- **A mask, not a fade.** Each headline line opens with a `clip-path` inset that grows from the top edge down while the line rises 16% of its own height. `clip-path` rather than `overflow: hidden` because at `leading: 1.06` the line box is shorter than the glyph box: `overflow: hidden` cuts descenders and Arabic diacritics, while `clip-path` can end on negative insets that clip nothing.
- **A wash that never settles.** `hero-drift` slides the seven gradient layers over 26 seconds, alternating. With the cards gone this is the hero's only ambient motion, and it is the substitute for the reference's video.
- **A bounded exit parallax.** As the hero leaves, the headline rises 40px and fades to 0.35. The range is deliberately short because the hero is only one viewport tall — there is no room for a long scrub.
- **Scroll reveals.** `components/motion/Reveal.tsx` is the shared primitive: 10px rise, 0.6s, `once: true`. Staggered per section by index.
- **One 50-second CSS marquee** for the client logos, paused on hover.

The only dependency added for this is `motion` (v14). Everything else is CSS keyframes in `tailwind.config.ts`. Under `prefers-reduced-motion: reduce` every animation is switched off — the reduced-motion block in `app/globals.css` sits at the end of the file specifically so it wins the cascade against the `.hero-atmosphere` rule above it, and `Reveal` zeroes its duration rather than only its initial state.

## Column guides

The reference runs three vertical hairlines through its white sections at 25%, 50%, and 75% of the container. `.column-guides` in `app/globals.css` reproduces them as a `::before` overlay with `isolation: isolate` and `z-index: -1`, so the lines sit behind the content instead of crossing the text. Applied to Process and Standards. It is *not* applied to Products, because the framed device already provides the structure and the guide cut straight through the section title.

