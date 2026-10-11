import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { terms } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | dibumi.com",
  description:
    "Syarat dan ketentuan penggunaan layanan pengembangan aplikasi dan software oleh Dibumi Teknologi Indonesia.",
  alternates: { canonical: "/id/terms" },
};

export default function TermsPage() {
  return <LegalLayout locale="id" content={terms} />;
}
