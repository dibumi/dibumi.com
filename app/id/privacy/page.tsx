import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { privacy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — dibumi.com",
  description:
    "Kebijakan privasi dibumi.com: cara Dibumi Teknologi Indonesia mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
  alternates: { canonical: "/id/privacy" },
};

export default function PrivacyPage() {
  return <LegalLayout locale="id" content={privacy} />;
}
