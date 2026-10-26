import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // HMR/dev resource Next diblokir bila Host bukan localhost; izinkan domain
  // lerd dan subdomain worktree (<branch>.dibumi.test).
  allowedDevOrigins: ["dibumi.test", "*.dibumi.test"],
  experimental: {
    // 404 untuk URL yang tidak cocok dengan rute mana pun. Wajib di sini karena
    // root layout berada di `app/[locale]/`: tidak ada layout di atas `app/` yang
    // bisa membungkus `app/not-found.tsx`, jadi Next perlu satu file yang melewati
    // layout sepenuhnya. Itu `app/global-not-found.tsx`.
    //
    // File ini juga yang menjawab slug karangan seperti `/en/services/tidak-ada`,
    // karena `dynamicParams = false` di rute `[slug]` membuat URL itu berhenti di
    // lapisan routing alih-alih sampai ke `notFound()`. Keduanya dirender penuh di
    // server; lihat catatan di `app/[locale]/services/[slug]/page.tsx`.
    globalNotFound: true,
  },
  // `app/page.tsx` tidak bisa dipertahankan: tanpa root layout di app/, sebuah
  // page di akar akan menggantung. Redirect `/` -> `/en` pindah ke sini, dan
  // karena berjalan di lapisan routing ia tetap berlaku sebelum segmen mana pun
  // dirender.
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
