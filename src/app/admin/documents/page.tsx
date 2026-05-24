"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import type { Document, DocumentCategory, SiteContent } from "@/lib/types";

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<SiteContent["documentCategories"]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<DocumentCategory>("atas-estatutos");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: SiteContent | null) => {
        if (data) {
          setDocuments(data.documents);
          setCategories(data.documentCategories);
        }
      });
  }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title) return;
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    const res = await fetch("/api/admin/documents", { method: "POST", body: formData });
    if (res.ok) {
      const contentRes = await fetch("/api/admin/content");
      const data = await contentRes.json();
      setDocuments(data.documents);
      setTitle("");
      setDescription("");
      setFile(null);
      setMessage("Documento publicado!");
    } else {
      setMessage("Erro ao publicar documento.");
    }
    setUploading(false);
  }

  async function removeDoc(id: string) {
    if (!confirm("Remover este documento?")) return;
    const res = await fetch(`/api/admin/documents?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 p-6 md:p-10">
        <h1 className="font-serif text-3xl text-twilight-indigo mb-6">Documentos</h1>

        <form onSubmit={handleUpload} className="mb-10 max-w-xl space-y-4 rounded-lg border border-border bg-white p-6">
          <h2 className="font-serif text-lg text-twilight-indigo">Publicar documento</h2>
          <input
            placeholder="Título"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-border px-4 py-2 text-sm"
          />
          <input
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-border px-4 py-2 text-sm"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as DocumentCategory)}
            className="w-full rounded-md border border-border px-4 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full text-sm"
          />
          <button
            type="submit"
            disabled={uploading}
            className="rounded-md bg-burnt-peach px-6 py-2.5 text-sm text-white hover:bg-burnt-peach-dark disabled:opacity-60"
          >
            {uploading ? "Publicando..." : "Publicar PDF"}
          </button>
          {message && <p className="text-sm text-muted-teal">{message}</p>}
        </form>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between rounded-md border border-border bg-white p-4">
              <div>
                <p className="font-medium text-sm text-twilight-indigo">{doc.title}</p>
                <p className="text-xs text-text-secondary">
                  {categories.find((c) => c.id === doc.category)?.label} · {doc.status}
                </p>
              </div>
              <div className="flex gap-2">
                {doc.file && (
                  <a href={doc.file} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-teal hover:underline">
                    Ver
                  </a>
                )}
                <button type="button" onClick={() => removeDoc(doc.id)} className="text-xs text-burnt-peach hover:underline">
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
