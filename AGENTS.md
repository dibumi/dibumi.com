<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

## Never run the dev server or a build

Do not run `npm run dev`, `npm run build`, `npm run build:worker`, or `next build`
from an agent session. The user runs those themselves.

- Never start a dev server in the background to check a change. Ask the user to
  start it and confirm the port instead.
- Verification that is allowed: `npm run typecheck` (read-only), reading files,
  and `git diff`.
- If a change truly cannot be validated without a build, say so and stop. Do not
  run it anyway.

## Anchor offsets

`scroll-padding-top` in `app/globals.css` is the single source of truth for the
sticky header offset. It must stay in sync with the header height in
`components/Navbar.tsx`. Do not add `scroll-margin-top` to sections as well,
because the browser sums both values.

