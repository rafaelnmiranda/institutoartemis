"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import type { SiteContent } from "@/lib/types";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/admin/login";
          return null;
        }
        return r.json();
      })
      .then((data) => data && setContent(data));
  }, []);

  async function save() {
    if (!content) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setMessage(res.ok ? "Salvo com sucesso!" : "Erro ao salvar.");
  }

  if (!content) {
    return (
      <div className="flex flex-col md:flex-row">
        <AdminNav />
        <main className="flex-1 p-10 text-text-secondary">Carregando...</main>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 p-6 md:p-10 max-w-3xl">
        <h1 className="font-serif text-3xl text-twilight-indigo mb-6">Conteúdo</h1>

        <section className="space-y-4 mb-10">
          <h2 className="font-serif text-xl text-twilight-indigo">Página inicial</h2>
          <Field label="Pill do hero" value={content.home.heroPill} onChange={(v) => setContent({ ...content, home: { ...content.home, heroPill: v } })} />
          <Field label="Tagline" value={content.home.heroTagline} onChange={(v) => setContent({ ...content, home: { ...content.home, heroTagline: v } })} />
          <TextArea label="Descrição do hero" value={content.home.heroDescription} onChange={(v) => setContent({ ...content, home: { ...content.home, heroDescription: v } })} />
          <TextArea label="Teaser sobre" value={content.home.aboutTeaser} onChange={(v) => setContent({ ...content, home: { ...content.home, aboutTeaser: v } })} />
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-serif text-xl text-twilight-indigo">Sobre — Missão e visão</h2>
          <Field label="Missão (título)" value={content.about.mission.title} onChange={(v) => setContent({ ...content, about: { ...content.about, mission: { ...content.about.mission, title: v } } })} />
          <TextArea label="Missão (texto)" value={content.about.mission.description} onChange={(v) => setContent({ ...content, about: { ...content.about, mission: { ...content.about.mission, description: v } } })} />
          <Field label="Visão (título)" value={content.about.vision.title} onChange={(v) => setContent({ ...content, about: { ...content.about, vision: { ...content.about.vision, title: v } } })} />
          <TextArea label="Visão (texto)" value={content.about.vision.description} onChange={(v) => setContent({ ...content, about: { ...content.about, vision: { ...content.about.vision, description: v } } })} />
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-serif text-xl text-twilight-indigo">Projeto: Um Caiçara em Chamonix</h2>
          {content.projects.map((project, i) => (
            <div key={project.slug} className="space-y-3 border border-border rounded-lg p-4 bg-white">
              <Field label="Título" value={project.title} onChange={(v) => {
                const projects = [...content.projects];
                projects[i] = { ...project, title: v };
                setContent({ ...content, projects });
              }} />
              <Field label="Edição" value={project.edition} onChange={(v) => {
                const projects = [...content.projects];
                projects[i] = { ...project, edition: v };
                setContent({ ...content, projects });
              }} />
              <TextArea label="Resumo" value={project.summary} onChange={(v) => {
                const projects = [...content.projects];
                projects[i] = { ...project, summary: v };
                setContent({ ...content, projects });
              }} />
              <TextArea label="Descrição completa" value={project.description} onChange={(v) => {
                const projects = [...content.projects];
                projects[i] = { ...project, description: v };
                setContent({ ...content, projects });
              }} />
            </div>
          ))}
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-serif text-xl text-twilight-indigo">Menu de navegação</h2>
          {content.menu.map((item, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <Field label="Label" value={item.label} onChange={(v) => {
                const menu = [...content.menu];
                menu[i] = { ...item, label: v };
                setContent({ ...content, menu });
              }} />
              <Field label="URL" value={item.href} onChange={(v) => {
                const menu = [...content.menu];
                menu[i] = { ...item, href: v };
                setContent({ ...content, menu });
              }} />
            </div>
          ))}
        </section>

        {message && <p className="text-sm text-muted-teal mb-4">{message}</p>}
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-md bg-burnt-peach px-8 py-3 text-sm font-medium text-white hover:bg-burnt-peach-dark disabled:opacity-60"
        >
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
      </main>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wider text-text-secondary">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border px-4 py-2 text-sm outline-none focus:border-twilight-indigo"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wider text-text-secondary">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border px-4 py-2 text-sm outline-none focus:border-twilight-indigo resize-y"
      />
    </div>
  );
}
