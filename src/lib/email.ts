import nodemailer from "nodemailer";
import type { ContactFormData } from "./types";

interface SendContactEmailParams extends ContactFormData {
  to: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(params: SendContactEmailParams) {
  const { name, email, subject, message, to } = params;

  const html = `
    <h2>Nova mensagem — Instituto Conexão Artemis</h2>
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Assunto:</strong> ${escapeHtml(subject)}</p>
    <hr />
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("[contact-form] SMTP not configured — mock send:");
    console.log({ to, from: smtpUser || "(not set)", name, email, subject, message });
    return { success: true, mock: true };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: `"Instituto Artemis" <${smtpUser}>`,
    to,
    replyTo: email,
    subject: `[Instituto Artemis] ${subject}`,
    html,
  });

  return { success: true, mock: false };
}
