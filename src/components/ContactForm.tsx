"use client";

import { useState } from "react";
import type { ContactContent, Settings } from "@/lib/types";

interface ContactFormProps {
  contact: ContactContent;
  settings: Settings;
}

export default function ContactForm({ contact, settings }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      {status === "success" && (
        <div className="mb-6 rounded-md border border-muted-teal/30 bg-muted-teal/10 px-4 py-3 text-sm text-twilight-indigo">
          {contact.formSuccessMessage}
        </div>
      )}
      {status === "error" && (
        <div className="mb-6 rounded-md border border-burnt-peach/30 bg-burnt-peach/10 px-4 py-3 text-sm text-twilight-indigo">
          {contact.formErrorMessage}{" "}
          <a href={`mailto:${settings.publicEmail}`} className="underline">
            {settings.publicEmail}
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-text-secondary">
              Nome completo
            </label>
            <input
              id="name"
              required
              placeholder="Seu nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-twilight-indigo"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-text-secondary">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-md border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-twilight-indigo"
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-text-secondary">
            Assunto
          </label>
          <select
            id="subject"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full rounded-md border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-twilight-indigo"
          >
            <option value="">Selecione o assunto</option>
            {contact.subjectOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-text-secondary">
            Mensagem
          </label>
          <textarea
            id="message"
            required
            rows={5}
            placeholder="Descreva sua mensagem..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-md border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-twilight-indigo resize-y min-h-[110px]"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-md bg-twilight-indigo px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-twilight-light disabled:opacity-60"
        >
          {status === "loading" ? "Enviando..." : "Enviar mensagem"}
        </button>
        <p className="text-xs text-text-secondary font-light leading-relaxed">{contact.lgpdNote}</p>
      </form>
    </div>
  );
}
