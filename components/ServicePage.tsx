import Link from "next/link";
import { relatedServices, serviceMeta, type ServiceSlug } from "@/lib/services";
import type { SiteContent } from "@/lib/i18n";

/**
 * Halaman detail satu layanan.
 *
 * Bentuknya mengikuti halaman tim, bukan beranda: satu kolom baca, judul serif
 * sekali saja, lalu blok-blok yang dipisah hairline. Tidak ada hero wash dan
 * tidak ada parallax — wash itu milik beranda, dan mengulangnya di tujuh
 * halaman anak akan membuat setiap halaman terasa seperti mengulang pembuka.
 *
 * Isinya sengaja pendek: satu paragraf pengantar, empat poin "yang termasuk",
 * proses empat langkah yang sama dengan section Process, tiga layanan lain,
 * lalu CTA. Tidak ada testimoni, angka klien, atau sertifikasi di sini — yang
 * belum tentu benar tidak ditulis, dan klaim yang sudah ada di beranda tetap
 * jadi satu-satunya sumbernya.
 *
 * Proses memakai `workflow.steps` alih-alih daftar baru: kalau cara kerja
 * studio berubah, halaman ini ikut berubah tanpa satu string pun disunting.
 *
 * Tanpa state, jadi server component.
 */
export default function ServicePage({
  content,
  basePath,
  slug,
}: {
  content: SiteContent;
  basePath: string;
  slug: ServiceSlug;
}) {
  const index = serviceMeta.findIndex((item) => item.slug === slug);
  const service = content.services[index];
  const page = content.servicePages[slug];
  const labels = content.servicePage;
  const others = relatedServices(slug);

  return (
    <article className="mx-auto max-w-page px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:pb-24 lg:pt-24">
      {/* Satu kolom baca; `62ch` di sini yang jadi ukuran baris, sama seperti
          halaman produk dan grup. Paragraf di dalamnya karena itu tidak membawa
          batas lebar sendiri — dulu paragraf pengantar diberi `58ch` yang lebih
          sempit dari kolomnya, jadi angka itu tidak pernah aktif. */}
      <div className="max-w-[62ch]">
        <Link
          href={`${basePath}#services`}
          className="text-ash-gray hover:text-slate-gray inline-flex items-center gap-1.5 text-caption transition"
        >
          {content.servicesSection.eyebrow}
          <span aria-hidden="true" className="rtl:-scale-x-100">
            ›
          </span>
        </Link>

        <h1 className="text-ink-black font-display text-heading mt-4 font-normal sm:text-heading-lg">
          {service.title}
        </h1>

        <p className="text-slate-gray mt-5 text-body-lg">{page.intro}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={`${basePath}#contact`}
            className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 group inline-flex h-12 items-center justify-center gap-2 px-6 text-body transition"
          >
            {content.servicesSection.consult}
            <Arrow />
          </Link>
          <Link
            href={`${basePath}#services`}
            className="text-ink-black group inline-flex h-12 items-center gap-2 px-2 text-body transition hover:underline"
          >
            {content.nav.allServices}
            <Arrow />
          </Link>
        </div>
      </div>

      {/* Yang termasuk. Baris hairline, bukan kartu: di halaman ini tidak ada
          satu pun permukaan yang perlu diangkat dari latar. */}
      <section className="mt-14 lg:mt-16">
        <h2 className="text-ash-gray text-caption">{labels.included}</h2>
        <ul className="border-hairline mt-4 grid gap-x-10 border-t sm:grid-cols-2">
          {page.included.map((item) => (
            <li
              key={item}
              className="border-hairline text-ink-black border-b py-4 text-body"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Cara kerja: empat langkah yang sama dengan beranda, dipadatkan jadi
          satu baris per langkah di desktop. */}
      <section className="mt-14 lg:mt-16">
        <h2 className="text-ash-gray text-caption">{labels.approach}</h2>
        <ol className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {content.workflow.steps.map((step, stepIndex) => (
            <li key={step.title}>
              <span className="text-ash-gray tabular text-caption">
                {String(stepIndex + 1).padStart(2, "0")}
              </span>
              <h3 className="text-ink-black mt-1 text-body font-medium">{step.title}</h3>
              <p className="text-slate-gray mt-2 text-caption">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Layanan lain, dihitung dari daftar yang sama dan berputar di ujungnya
          supaya tidak pernah menaut ke halaman ini sendiri. */}
      <section className="mt-14 lg:mt-16">
        <h2 className="text-ash-gray text-caption">{labels.related}</h2>
        <ul className="border-hairline mt-4 border-t">
          {others.map((other) => {
            const otherIndex = serviceMeta.findIndex((item) => item.slug === other);
            const otherService = content.services[otherIndex];

            return (
              <li key={other}>
                <Link
                  href={`${basePath}/services/${other}`}
                  className="group border-hairline flex items-baseline justify-between gap-4 border-b py-4"
                >
                  <span className="text-ink-black text-body font-medium group-hover:underline">
                    {otherService.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-slate-gray shrink-0 rtl:-scale-x-100"
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="border-hairline mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
        <p className="text-slate-gray max-w-md text-caption">{content.contact.description}</p>
        <Link
          href={`${basePath}#contact`}
          className="bg-ink-black text-paper-white rounded-buttons hover:bg-ink-black/90 inline-flex h-11 items-center justify-center gap-2 px-5 text-caption transition"
        >
          {content.servicesSection.consult}
          <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

/**
 * Panah yang meluncur keluar lalu masuk dari sisi lain saat tautan di-hover.
 * Sama dengan panah di beranda: pola dua glyph bertumpuk, dan dibalik di RTL.
 *
 * Dua glyph, bukan satu, karena satu glyph tidak bisa keluar dan masuk
 * sekaligus: yang pertama keluar ke arah baca, yang kedua sudah menunggu di
 * seberang dan mengisi tempatnya. Di RTL arah bacanya ke kiri, jadi glyph
 * pertama keluar ke kiri dan glyph kedua harus mulai dari kanan. Tanpa
 * `rtl:translate-x-full` keduanya bergerak ke tepi kiri dan sempat bertumpuk di
 * tengah kotak — terbaca sebagai dua panah, bukan satu panah yang lewat.
 */
function Arrow() {
  return (
    <span aria-hidden="true" className="relative inline-block h-4 w-4 overflow-hidden">
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-full rtl:-scale-x-100 rtl:group-hover:-translate-x-full">
        →
      </span>
      <span className="absolute inset-0 flex -translate-x-full items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-0 rtl:translate-x-full rtl:-scale-x-100 rtl:group-hover:translate-x-0">
        →
      </span>
    </span>
  );
}