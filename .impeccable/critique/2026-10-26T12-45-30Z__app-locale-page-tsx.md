---
target: homepage
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/home/rudi/workspace/codes/websites/dibumi.com/app/[locale]/page.tsx"
target_fingerprint: "sha256:9cd6c850e3f8a5a666efbb2c978b6197ac27b6847bfa41120fe79170f8cd7292"
target_path: /home/rudi/workspace/codes/websites/dibumi.com/app/[locale]/page.tsx
timestamp: 2026-10-26T12-45-30Z
slug: app-locale-page-tsx
---
# Design Critique — dibumi.com homepage

Target: `app/[locale]/page.tsx` + `components/*` · surface mode: Persuade · method: degraded single-context (no sub-agent tool; A then B sequentially)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Nav surface, section highlight, `01 / 07` counter work; anchor click from top animates 6,571px over ~2.5s |
| 2 | Match System / Real World | 3 | "Adserver Exchange", "MVVM / clean architecture", "API-first" unglossed for business buyers; "Correspondence email" |
| 3 | User Control and Freedom | 4 | Exits everywhere; visible marquee pause; Escape + focus return on panels and mobile sheet |
| 4 | Consistency and Standards | 3 | Marquee label row escapes the container; "Learn more" points to #standards then #contact; Team vs /teams |
| 5 | Error Prevention | 3 | No form/destructive action; WhatsApp/mailto exit mitigated by printed number and address |
| 6 | Recognition Rather Than Recall | 3 | Comparing products requires flipping tabs and remembering the previous panel |
| 7 | Flexibility and Efficiency | n/a | Persuade surface: no repeat-visit task or accelerator to provide |
| 8 | Aesthetic and Minimalist Design | 3 | Disciplined system undercut by a 2,563px Services wall and 7 tabs where 6 say "Soon" |
| 9 | Error Recovery | 3 | Styled 404, untranslated legal notice; otherwise almost no error surface |
| 10 | Help and Documentation | n/a | Persuade surface: the CTA is a conversation |
| **Total** | | **25/32** | **Good (78%)** |

## Design Specificity Verdict

LLM assessment: surface language is authored (achromatic paper palette, one peach band, never-bold serif display, ordinals instead of icons, hairline tables, a diagram built from the same data as its list). The skeleton is category standard: centred hero with two pills, logo marquee, tabbed product showcase, three-card row, four-step rail, standards rows, centred CTA. Identity lives in the restraint, not the composition. Biggest missed opportunity: the rarest assets (12-client / 10-country logo wall, one named founder-engineer) are absent at the moment of decision.

Deterministic scan: source scan 36 files → 0 findings, regex-only for .css/.ts/.tsx (element rules did not run; undercount, not clean). URL 1280x800 → 5 findings: italic-serif-display (hero h1), low-contrast x2 (ordinals 1.6:1 and 1.3:1), overused-font (Inter 92%), marquee. URL 390x844 → 3 findings: low-contrast (ordinal 01), overused-font, marquee.

False positives / waived: the two low-contrast hits are aria-hidden ordinals with an inline waiver at components/Highlights.tsx:169 and documented contrast maths — decorative text has no threshold. marquee is a false positive: WCAG 2.2.2 satisfied by a visible pause button, hover pause and reduced-motion handling (components/ClientMarquee.tsx:67-84). italic-serif-display and overused-font are the detector arguing with the brief; the italic line and serif/sans pairing are pinned in DESIGN.reference.md and README.md.

Visual overlays: injection succeeded and the overlay rendered in the agent's own headless CDP tab (extension not connected), not in the user's browser. Console showed `[impeccable] 2 anti-patterns found` plus three rule lines; no page errors, zero failed requests across a full scroll.

## Overall Impression

Extremely disciplined, and the restraint does real work. The cost: the page asks for trust before offering any, and the middle 4,300px between the peach band and the closing CTA is a long achromatic-and-dark text march with no visual event. Biggest opportunity: move proof to the moments of decision and compress the Services wall.

## What's Working

1. The Clients band: 12 real logos on peach with sienna text, 1px gaps as hairlines, flags subordinate. The most credible thing on the page.
2. The Services diagram: seven practices → one team → three outputs, built from the same array as the list, sticky, hierarchy by type and one hairline connector instead of eleven nested cards.
3. Accessibility hygiene: one ink focus ring with `.on-dark` inversion (verified 2px outline in the first 12 tab stops), real APG tablist with roving tabIndex and Home/End, focus trap including the visible header, reduced motion in three layers, logical properties throughout for RTL.

## Priority Issues

[P1] First viewport contains no evidence, only a claim — hero is 900px of type; the marquee begins at exactly y=900 at 1440x900, so zero logo pixels are visible. Fix: one thin evidence row inside the first screen (compressed logo strip or the three facts), keeping the type-only hero. Command: /impeccable layout

[P1] Page almost entirely invisible without JavaScript — with scripts blocked 159 of 195 text elements render at opacity 0 (Reveal writes initial opacity 0 server-side, components/motion/Reveal.tsx:59; hero paragraphs likewise, components/Hero.tsx:113). PRODUCT.md lists "no noscript fallback" as a known gap; measured, it is a blank-page gap. Fix: render visible as the resting state and animate from it, or gate opacity on a js-ready class. Command: /impeccable harden

[P1] `<html lang="en">` hard-coded — `curl /ar` returns lang="en" with no dir; corrected only after hydration (components/HtmlLangSync.tsx:13). Arabic visitors hear Arabic in an English voice model; non-JS crawlers see /ar declaring English. Fix: locale-aware root layout, delete HtmlLangSync. Command: /impeccable harden

[P2] Services band is a 2,563px wall (2,999px mobile) with "Discuss a project →" seven times, all to #contact; 11 of 45 links go there. Longest scroll between visual events (Clients ends 4,088; Contact starts 8,385). Fix: title + one line per row, bullets to the service pages, one CTA at the end. Command: /impeccable distill

[P2] Column guides cut through body text — the 50% and 75% hairlines bisect description text in Standards and the fourth step in Process. Fix: confine guides to the header band or mask them behind text columns. Command: /impeccable layout

## Persona Red Flags

Jordan (first-timer business owner): first screen shows no logos, names or numbers; the Services panel gives seven services with no price or timeframe; "Learn more" does two different things in two consecutive sections.

Casey (mobile, one-handed, mid-range Android): 2,999px Services band of near-identical blocks; tapping Process in the mobile sheet starts a ~2.5s smooth scroll over 6,571px that can only be interrupted by fighting it.

Riley (stress tester): blocks scripts → white page; landscape 844x390 → primary CTA at y=392-440 entirely below the fold; /ar ships lang="en"; /pl at 1024px still fits (13px slack, no overflow 320-1440).

Pak Budi (Indonesian SME owner/technical manager comparing three vendors on his phone): gets local and real, but the logos are behind a scroll and there is no price signal; the contact block speaks his language perfectly (WhatsApp filled pill, printed number, hours in WIB); the team page — the strongest trust asset — is not linked from the contact block.

## Minor Observations

- Marquee pause control's right edge sits at exactly the viewport edge (x=1440 at 1440) while every other right edge stops at 1320; same at 1280.
- Mobile landscape hero: 844x390 puts the CTA bottom at 440 against a 390 viewport; needs a max-height variant.
- Card 3's ordinal sits 3px into its title box (two-line title) against +28px on cards 1-2; shared top-[38%] assumes one-line titles.
- "Correspondence email" is the weakest label on the page; "Email us" is what a buyer expects.
- scroll-smooth plus a 9,511px document makes a top-to-#process jump ~2.5s of travel.
- Products leads with six "Soon" tabs and one live property; leading a trust page with what does not exist is a strange order.
- Nav label "Team" against route /teams.
- Privacy policy refers to a contact form that does not exist (lib/legal.ts:250).
- No skip-to-content link; 8 controls precede the hero's first link in tab order.

## Questions to Consider

- If the first screen had to prove one thing without a sentence of copy, what would it show — the twelve logos, the founder's name, or the years?
- What would Services look like as seven lines and one diagram, with the depth living on the service pages?
- Why is the strongest trust asset on a separate route rather than beside the CTA?
- Is one chromatic moment genuinely the budget, or does a second deserve colour?
- If JavaScript fails on a 3G phone, should the visitor see a blank page or the whole page minus the animation?
