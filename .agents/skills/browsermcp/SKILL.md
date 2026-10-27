---
name: browsermcp
description: "Drive the user's real Chrome tab through Browser MCP (browsermcp.io) instead of launching a fresh browser: navigate, click, type, submit forms, read console errors, capture screenshots. Use for UI verification, end-to-end checks, reproducing a bug in the running app, or any JS-heavy / logged-in / cookie-walled page that plain HTTP fetching cannot handle. This is the default browser tool — do not reach for Playwright, Playwriter, Puppeteer or a hand-rolled CDP script."
license: MIT
metadata:
  origin: browsermcp.io
---

# Browser MCP

Browser MCP automates the user's **own** Chrome tab. The MCP server runs locally
and the Browser MCP Chrome extension bridges it to the connected tab, so actions
happen with the user's real profile, existing logins and real fingerprint.

That is the whole point: no fresh browser instance, no login wall, no bot
detection. It also means every action is visible and real — treat it as the
user's browser, not a sandbox.

## Setup (once per machine)

1. **Install the Chrome extension** from <https://browsermcp.io/install> and pin
   it to the toolbar.
2. **Register the MCP server** with the agent's config:

   ```json
   {
     "mcp": {
       "browsermcp": {
         "type": "local",
         "command": ["bunx", "@browsermcp/mcp@latest"],
         "enabled": true
       }
     }
   }
   ```

   `bunx` resolves and runs the package the way `npx` would; it needs
   `~/.bun/bin` on `PATH`. Use plain `npx -y @browsermcp/mcp@latest` on a
   machine without bun.
3. **Connect the tab.** Click the extension icon and press **Connect**. All
   actions apply to that tab until it is disconnected or closed.

## The tools

| Tool | What it does |
| --- | --- |
| `browser_navigate` | Navigate the connected tab to a URL |
| `browser_go_back` / `browser_go_forward` | History navigation |
| `browser_snapshot` | Accessibility snapshot of the page — the primary way to see what is on screen and to get element references |
| `browser_click` | Click an element |
| `browser_type` | Type text into an editable element |
| `browser_select_option` | Choose one or more values in a `<select>` dropdown |
| `browser_hover` | Hover an element |
| `browser_drag` | Drag one element onto another |
| `browser_press_key` | Press a key (`Enter`, `Tab`, `Escape`, …) |
| `browser_wait` | Wait a number of seconds |
| `browser_get_console_logs` | Read the tab's console output |
| `browser_screenshot` | Capture the current page as an image |

Tool names are prefixed with the server name the client assigns, so they may
appear as `browsermcp_browser_navigate` and so on.

## Working method

**Snapshot before acting, not after.** Element references come from the
snapshot; clicking from memory of the markup fails as soon as the page
re-renders. Take a fresh snapshot after anything that changes the DOM —
navigation, a click that opens a dialog, a form submit.

**One action, one check.** Do not chain several clicks on stale references. Each
step: act, snapshot, confirm the expected state, continue.

**Prefer text-based waiting over fixed sleeps.** `browser_wait` is a blunt
instrument; if the page is slow, snapshot again and check whether the target
appeared. Use `browser_wait` only for genuinely time-based behaviour.

**Read the console when a page misbehaves.** `browser_get_console_logs` is the
fastest path from "the UI is broken" to the actual JavaScript error, and it is
the reason to reach for this skill over an HTTP fetch.

## UI verification recipe

This is the shape every "verify the page in a browser" step should take.

1. **Desktop pass**
   - `browser_navigate` to the page URL.
   - `browser_snapshot` — confirm the expected content is actually present, not
     just that the request returned 200.
   - `browser_get_console_logs` — any `error` entry is a FAIL.
   - `browser_screenshot` — save it as the desktop proof (`assets/desktop.png`).
2. **Happy path**
   - Drive the flow with snapshot → click/type → snapshot after each step:
     index → create (one valid submit, one invalid submit to see validation
     errors land on the right fields) → edit → delete with confirmation.
   - After a write, re-check the database. A UI that "looks right" is not proof
     the data landed.
3. **Mobile pass**
   - Browser MCP has **no viewport API**. Switch the connected tab to a mobile
     width one of these ways, then repeat step 1:
     - Chrome DevTools (`F12`) → device toolbar (`Ctrl/Cmd+Shift+M`) → pick a
       phone preset; or
     - resize the browser window down to ~390 px wide; or
     - ask the user to do it if the tab is theirs and you cannot focus DevTools.
   - `browser_screenshot` — save it as the mobile proof (`assets/mobile.png`).
4. **Horizontal overflow**
   - There is **no `evaluate` tool**, so overflow cannot be measured from JS.
     Judge it from the screenshot: content clipped at the right edge, or a
     horizontal scrollbar visible in the capture, is a FAIL.
   - If you need a hard number, ask the user to run
     `document.documentElement.scrollWidth - document.documentElement.clientWidth`
     in the tab's console and paste the result.

### What has no Browser MCP equivalent

- `setViewportSize` / device emulation → DevTools device toolbar or a window
  resize (manual).
- `page.evaluate(...)` → no JS execution tool. Read the DOM through
  `browser_snapshot`, or ask the user for the console value.
- `screenshot({ fullPage: true })` → capture the viewport, scroll,
  capture again if the page is longer than the screen.
- `page.pdf()` / CDP `Page.printToPDF` → out of scope. HTML-to-PDF generation is
  a server-side library job, not an agent browser job.

## Reading a snapshot

The accessibility snapshot is a tree of roles, names and references. It is what
the page *means*, not its HTML, so:

- match on role and accessible name (`button "Save"`), not on CSS classes;
- a reference that no longer appears means the element is gone or was
  re-rendered — snapshot again;
- hidden or off-screen elements are usually absent, which is why a click can
  fail on something that exists in the source.

## Guardrails

- **The connected tab is the user's.** Never submit a form, send a message,
  make a purchase or delete anything unless the task asked for it. Filling a
  field is safe; pressing the final submit is not, unless that is the goal.
- **Never type credentials, card numbers or API keys** unless the user supplied
  them for this purpose. Prefer a tab the user has already logged in.
- **Do not navigate away from unsaved work** in the user's tab without saying so.
- **Google CAPTCHA / reCAPTCHA:** if one appears, stop and tell the user. Do not
  solve it, verify it or record it.
- **Stop and report** if the extension is not connected or the server is not
  running, rather than retrying blindly — see troubleshooting below.

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Every tool call errors | The MCP server is not running. Check it is enabled in the client's MCP list and restart the client after editing the config. |
| Server runs, but calls fail | The tab is not connected. Click the extension icon and press **Connect**. |
| `Client closed` and reload does not help | Drop `@latest` from the config so the package resolves as `@browsermcp/mcp`. |
| `bunx` not found | `~/.bun/bin` is not on `PATH`; the server is distributed as an npm package, so `npx` works as a fallback. |
| Action applies to the wrong page | The extension is bound to a different tab. Reconnect on the intended tab. |
