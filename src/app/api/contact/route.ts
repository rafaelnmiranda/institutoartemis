import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/content";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
    }

    const content = await getSiteContent();
    const to = process.env.CONTACT_TO || content.settings.contactEmail;

    const result = await sendContactEmail({ name, email, subject, message, to });

    return NextResponse.json({ success: true, mock: result.mock });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json({ error: "Erro ao enviar mensagem." }, { status: 500 });
  }
}
