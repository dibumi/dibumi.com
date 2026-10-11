import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Biru Persela Lamongan: biru langit (jersey home) turun ke biru dongker (away).
        // brand-600 = #1A74B4 dipakai untuk semua CTA berteks putih, kontras 4.99:1 (lolos AA).
        brand: {
          50: "#F2F9FE",
          100: "#E1F0FB",
          200: "#C2E0F6",
          300: "#93C9EE",
          400: "#5FAEE4",
          500: "#2E90D4",
          600: "#1A74B4",
          700: "#175E92",
          800: "#164E77",
          900: "#0A2A47",
          950: "#061A2E",
        },
      },
      backgroundImage: {
        // 1. Scrim hero: dua lapis supaya teks tetap terbaca di atas foto.
        "hero-scrim":
          "linear-gradient(90deg, rgba(6,26,46,0.95) 0%, rgba(6,26,46,0.82) 46%, rgba(10,42,71,0.42) 100%), linear-gradient(0deg, rgba(6,26,46,0.92) 0%, rgba(6,26,46,0.18) 46%, rgba(6,26,46,0.55) 100%)",
        // 2. Garis brand 1px yang memudar, pembatas section dan header halaman legal.
        "hairline-x":
          "linear-gradient(90deg, #2E90D4 0%, rgba(46,144,212,0) 100%)",
        // 3. Rail progres alur kerja: memudar di ujung supaya terbaca sebagai urutan, bukan hiasan.
        "rail-x": "linear-gradient(90deg, #2E90D4 0%, #5FAEE4 45%, #C2E0F6 100%)",
        // 4. Cahaya lembut di sudut panel kontak dan kaki halaman.
        "panel-glow":
          "radial-gradient(125% 95% at 6% 0%, rgba(46,144,212,0.34) 0%, rgba(46,144,212,0) 62%)",
        "edge-glow":
          "linear-gradient(90deg, rgba(46,144,212,0.38) 0%, rgba(46,144,212,0) 72%)",
        // 5. Wash satu tile unggulan di bagian layanan, supaya tidak putih-semua.
        "tile-wash":
          "radial-gradient(130% 115% at 0% 0%, #E1F0FB 0%, rgba(242,249,254,0) 68%)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        ar: ["var(--font-sans-ar)", "var(--font-sans)", "system-ui", "sans-serif"],
        zh: ["var(--font-sans-zh)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono-plex)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(0.75rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
      },
      animation: {
        "fade-up": "fade-up 650ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "slow-zoom": "slow-zoom 24s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
