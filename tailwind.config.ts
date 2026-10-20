import type { Config } from "tailwindcss";

/**
 * Token layer for the Steep system, transcribed from DESIGN.md.
 *
 * The reference publishes these as Tailwind v4 `@theme` variables. This project
 * runs Tailwind 3, so the same values live here under `theme.extend` and mirror
 * the CSS custom properties in app/globals.css. Ubah keduanya bersamaan.
 *
 * Aturan yang dijaga di file ini:
 * - Palet 97% achromatic. Satu-satunya warna chromatic adalah pasangan
 *   blush-peach / sienna-brown, dan hanya untuk satu kartu editorial per halaman.
 * - Radius punya dua nilai struktural: cards 24px dan buttons 9999px. Nilai
 *   perantara (images 12px, inputs 16px, smallcards 16px, elevatedcards 20px)
 *   hanya untuk elemen yang memang lebih kecil dari kartu.
 * - Elevasi hanya untuk floating artifact. Kartu konten tidak pernah ber-shadow.
 */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ink-black": "#17191c",
        "paper-white": "#ffffff",
        "mist-gray": "#f2f2f3",
        "fog-white": "#fafafb",
        "slate-gray": "#777b86",
        "ash-gray": "#979799",
        "smoke-gray": "#a3a6af",
        "blush-peach": "#fbe1d1",
        "sienna-brown": "#5d2a1a",
        // Satu-satunya nilai di luar DESIGN.md: warna garis dari Quick Color
        // Reference. Border saja, tidak pernah dipakai sebagai permukaan.
        hairline: "#ececec",
      },
      fontFamily: {
        // Signifier dan Sohne adalah lisensi komersial. Substitusinya Source
        // Serif 4 dan Inter, dimuat lewat next/font di app/layout.tsx.
        display: [
          "var(--font-display)",
          "var(--font-arabic)",
          "var(--font-chinese)",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          "var(--font-arabic)",
          "var(--font-chinese)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        // Dua locale ini tidak punya glyph di Source Serif 4 maupun Inter, jadi
        // keduanya memakai font pendamping agar teks tetap terbaca.
        ar: ["var(--font-arabic)", "var(--font-sans)", "system-ui", "sans-serif"],
        zh: ["var(--font-chinese)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        caption: ["15px", { lineHeight: "1.5" }],
        body: ["17px", { lineHeight: "1.35" }],
        "body-lg": ["20px", { lineHeight: "1.35" }],
        subheading: ["22px", { lineHeight: "1.5" }],
        "heading-sm": ["26px", { lineHeight: "1.18", letterSpacing: "-0.23px" }],
        heading: ["44px", { lineHeight: "1.3", letterSpacing: "-0.66px" }],
        "heading-lg": ["64px", { lineHeight: "1.3", letterSpacing: "-0.96px" }],
        display: ["90px", { lineHeight: "1.3", letterSpacing: "-2.25px" }],
      },
      borderRadius: {
        cards: "24px",
        images: "12px",
        inputs: "16px",
        buttons: "9999px",
        smallcards: "16px",
        elevatedcards: "20px",
      },
      boxShadow: {
        // Dropdown / popover.
        subtle:
          "oklab(0 0 0 / 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 4px 24px 0px",
        // Modal / overlay card.
        "subtle-2":
          "oklab(0 0 0 / 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 8px 40px 0px",
        // Floating product artifact. Satu-satunya elevasi di sistem ini.
        "subtle-3":
          "rgba(4, 23, 43, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px",
      },
      maxWidth: {
        page: "1200px",
      },
      spacing: {
        124: "124px",
        128: "128px",
        160: "160px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(0.75rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "panel-in": {
          "0%": { opacity: "0", transform: "translateY(-0.35rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Marquee logo: track digandakan dua kali, jadi geser -50% menutup
        // satu putaran penuh tanpa celah.
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        // Garis tipis yang tumbuh dari nol, dipakai penanda progres.
        sweep: {
          "0%": { transform: "scaleY(0.3)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 650ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 400ms ease-out both",
        "panel-in": "panel-in 160ms cubic-bezier(0.22, 1, 0.36, 1) both",
        marquee: "marquee 50s linear infinite",
        sweep: "sweep 400ms ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
