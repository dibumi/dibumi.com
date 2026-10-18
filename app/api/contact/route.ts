import { NextResponse } from "next/server";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Pesan balasan per locale. Endpoint ini tidak menyimpan data ke mana pun;
 * integrasi notifikasi (Telegram, Discord, atau Resend) ditambahkan di sini
 * saat kredensialnya tersedia.
 */
const messages: Record<
  Locale,
  { required: string; invalidEmail: string; success: string; failed: string }
> = {
  en: {
    required: "Please fill in your name, email, and message.",
    invalidEmail: "Please enter a valid email address.",
    success: "Message received. Our team will get back to you shortly.",
    failed: "We could not process the form. Please try again.",
  },
  id: {
    required: "Mohon lengkapi nama, email, dan pesan kebutuhan Anda.",
    invalidEmail: "Mohon masukkan alamat email yang valid.",
    success: "Pesan diterima. Tim dibumi.com akan segera menghubungi Anda.",
    failed: "Gagal memproses formulir kontak.",
  },
  ar: {
    required: "يرجى إدخال الاسم والبريد الإلكتروني والرسالة.",
    invalidEmail: "يرجى إدخال بريد إلكتروني صالح.",
    success: "تم استلام الرسالة. سيتواصل معك فريقنا قريباً.",
    failed: "تعذر معالجة النموذج. حاول مرة أخرى.",
  },
  zh: {
    required: "请填写姓名、邮箱和项目详情。",
    invalidEmail: "请输入有效的邮箱地址。",
    success: "已收到消息，我们的团队会尽快与你联系。",
    failed: "表单处理失败，请重试。",
  },
  pl: {
    required: "Uzupełnij imię, e-mail i treść wiadomości.",
    invalidEmail: "Podaj prawidłowy adres e-mail.",
    success: "Wiadomość otrzymana. Nasz zespół wkrótce się odezwie.",
    failed: "Nie udało się przetworzyć formularza. Spróbuj ponownie.",
  },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let text: Record<string, string> = messages.en;

  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      service?: string;
      message?: string;
      locale?: string;
    };

    if (body.locale && isLocale(body.locale)) {
      text = messages[body.locale];
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: text.required }, { status: 400 });
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ success: false, error: text.invalidEmail }, { status: 400 });
    }

    // Kirim notifikasi ke Telegram, Discord, atau email transaksional di sini.
    // Contoh:
    // await fetch(process.env.DISCORD_WEBHOOK_URL!, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ content: `${name} <${email}> — ${body.service ?? "-"}\n${message}` }),
    // });

    return NextResponse.json({
      success: true,
      message: text.success,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ success: false, error: text.failed }, { status: 500 });
  }
}
