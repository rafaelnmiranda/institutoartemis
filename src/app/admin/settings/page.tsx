"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import type { SiteContent } from "@/lib/types";

export default function AdminSettingsPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => (r.ok ? r.json() : null))
      .then(setContent);
  }, []);

  async function save() {
    if (!content) return;
    setSaving(true);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setMessage(res.ok ? "Configurações salvas!" : "Erro ao salvar.");
  }

  if (!content) {
    return (
      <div className="flex flex-col md:flex-row">
        <AdminNav />
        <main className="flex-1 p-10">Carregando...</main>
      </div>
    );
  }

  const s = content.settings;

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 p-6 md:p-10 max-w-xl">
        <h1 className="font-serif text-3xl text-twilight-indigo mb-6">Configurações</h1>

        <div className="space-y-4">
          <Field label="Nome do site" value={s.siteName} onChange={(v) => setContent({ ...content, settings: { ...s, siteName: v } })} />
          <Field label="Nome curto" value={s.siteShortName} onChange={(v) => setContent({ ...content, settings: { ...s, siteShortName: v } })} />
          <Field label="Tagline" value={s.tagline} onChange={(v) => setContent({ ...content, settings: { ...s, tagline: v } })} />
          <Field label="E-mail público" value={s.publicEmail} onChange={(v) => setContent({ ...content, settings: { ...s, publicEmail: v } })} />
          <Field label="E-mail destino do formulário" value={s.contactEmail} onChange={(v) => setContent({ ...content, settings: { ...s, contactEmail: v } })} />
          <TextArea label="Endereço" value={s.address} onChange={(v) => setContent({ ...content, settings: { ...s, address: v } })} />
          <Field label="Status CNPJ" value={s.cnpjStatus} onChange={(v) => setContent({ ...content, settings: { ...s, cnpjStatus: v } })} />
        </div>

        {message && <p className="text-sm text-muted-teal mt-4">{message}</p>}
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="mt-6 rounded-md bg-burnt-peach px-8 py-3 text-sm font-medium text-white hover:bg-burnt-peach-dark disabled:opacity-60"
        >
          {saving ? "Salvando..." : "Salvar configurações"}
        </button>
      </main>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wider text-text-secondary">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-md border border-border px-4 py-2 text-sm" />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wider text-text-secondary">{label}</label>
      <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-md border border-border px-4 py-2 text-sm resize-y" />
    </div>
  );
}
