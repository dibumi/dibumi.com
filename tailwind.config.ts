import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Token diporting dari C:\Herd\ai-party\frontend\marketing\app\assets\css\main.css.
        // primary #0a7668 di atas putih = 5.5:1, lolos AA untuk teks dan tombol.
        canvas: "#f8faf9",
        surface: "#ffffff",
        elevated: "#f0f5f2",
        ink: "#16332d",
        muted: "#61716b",
        line: {
          DEFAULT: "#dce5df",
          subtle: "#edf1ee",
        },
        primary: {
          DEFAULT: "#0a7668",
          hover: "#085d53",
          soft: "#e4f2eb",
          ring: "#0a7668",
        },
        accent: {
          DEFAULT: "#256b83",
          soft: "#e7f1f6",
        },
        tint: {
          mint: "#ecf5ee",
          violet: "#f3f0fb",
          amber: "#faf3e6",
        },
        // Alias lama. Semua komponen sudah memakai token baru, alias ini hanya
        // jaring pengaman supaya tidak ada kelas yang diam-diam hilang.
        brand: {
          50: "#f8faf9",
          100: "#e4f2eb",
          200: "#dce5df",
          300: "#9dc4bb",
          400: "#5fa89b",
          500: "#2f8c7d",
          600: "#0a7668",
          700: "#085d53",
          800: "#0b4a43",
          900: "#16332d",
          950: "#0d211e",
        },
      },
      fontFamily: {
        // Seluruh teks memakai Geist Mono, sama seperti situs referensi.
        sans: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
        // Geist Mono tidak punya glyph Arab dan CJK, jadi dua locale ini
        // memakai font pendamping agar teks tetap terbaca.
        ar: ["var(--font-arabic)", "var(--font-geist-mono)", "system-ui", "sans-serif"],
        zh: ["var(--font-chinese)", "var(--font-geist-mono)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 4px 20px -8px rgba(22, 51, 45, 0.04)",
        glow: "0 6px 20px -10px rgba(10, 118, 104, 0.25)",
        float: "0 20px 70px -45px rgba(22, 51, 45, 0.3)",
      },
      backgroundImage: {
        // Garis 1px yang memudar, dipakai sebagai pembatas section.
        "hairline-x": "linear-gradient(90deg, #0a7668 0%, rgba(10,118,104,0) 100%)",
        // Rail progres alur kerja: memudar di ujung supaya terbaca sebagai urutan.
        "rail-x": "linear-gradient(90deg, #0a7668 0%, #2f8c7d 45%, #dce5df 100%)",
        // Cahaya lembut di sudut panel gelap.
        "panel-glow": "radial-gradient(125% 95% at 6% 0%, rgba(10,118,104,0.28) 0%, rgba(10,118,104,0) 62%)",
        // Wash satu kartu unggulan, supaya tidak putih-semua.
        "tile-wash": "radial-gradient(130% 115% at 0% 0%, #e4f2eb 0%, rgba(248,250,249,0) 68%)",
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
      },
      animation: {
        "fade-up": "fade-up 650ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 400ms ease-out both",
        "panel-in": "panel-in 160ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
