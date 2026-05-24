"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import type { SiteContent, SiteImage } from "@/lib/types";

export default function AdminImagesPage() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: SiteContent | null) => data && setImages(data.images));
  }, []);

  async function upload(imageId: string, file: File) {
    setUploading(imageId);
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("imageId", imageId);

    const res = await fetch("/api/admin/images", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) {
      setImages((prev) =>
        prev.map((img) => (img.id === imageId ? { ...img, path: data.url, type: "upload" as const } : img))
      );
      setMessage("Imagem enviada!");
    } else {
      setMessage("Erro ao enviar imagem.");
    }
    setUploading(null);
  }

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 p-6 md:p-10">
        <h1 className="font-serif text-3xl text-twilight-indigo mb-2">Imagens</h1>
        <p className="text-sm text-text-secondary mb-8">
          Envie imagens para substituir os placeholders. Sem upload, gradientes são exibidos.
        </p>

        {message && <p className="text-sm text-muted-teal mb-4">{message}</p>}

        <div className="grid gap-6 sm:grid-cols-2">
          {images.map((img) => (
            <div key={img.id} className="rounded-lg border border-border bg-white overflow-hidden">
              <div
                className="h-40 w-full"
                style={
                  img.path
                    ? { backgroundImage: `url(${img.path})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : { background: `linear-gradient(135deg, ${img.gradientFrom ?? "#3d405b"}, ${img.gradientTo ?? "#81b29a"})` }
                }
              />
              <div className="p-4">
                <p className="font-medium text-twilight-indigo text-sm">{img.name}</p>
                <p className="text-xs text-text-secondary mb-3">ID: {img.id}</p>
                <label className="inline-block cursor-pointer rounded-md bg-twilight-indigo px-4 py-2 text-xs text-white hover:bg-twilight-light">
                  {uploading === img.id ? "Enviando..." : "Enviar imagem"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading === img.id}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) upload(img.id, file);
                    }}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
