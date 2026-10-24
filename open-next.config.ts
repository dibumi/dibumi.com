import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Cache inkremental dibaca dari Workers Static Assets, bukan dari R2 atau KV.
 *
 * Tanpa ini `defineCloudflareConfig({})` memakai cache "dummy": hasil
 * prerender (`.open-next/cache`) tidak pernah ikut terunggah, sehingga halaman
 * SSG hanya bisa dirender ulang saat request. Itu cukup untuk rute yang boleh
 * dirender dinamis, tapi rute dengan `dynamicParams = false` — semua halaman
 * layanan dan produk — menolak dirender saat request dan langsung 404 di
 * produksi, meski build-nya sukses.
 *
 * Static assets cache bersifat read-only dan hanya menyajikan hasil build,
 * yang memang yang dibutuhkan situs ini: tidak ada ISR, tidak ada revalidasi.
 * `opennextjs-cloudflare deploy` menyalin `.open-next/cache` ke
 * `assets/cdn-cgi/_next_cache` sebelum worker diunggah.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});