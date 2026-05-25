"use client";

import Link from "next/link";
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
      setMessage("Imagem enviada! Atualize o site público para ver o resultado.");
    } else {
      setMessage(data.error ?? "Erro ao enviar imagem.");
    }
    setUploading(null);
  }

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        <h1 className="font-serif text-3xl text-twilight-indigo mb-2">Imagens</h1>
        <p className="text-sm text-text-secondary mb-2">
          Cada card corresponde a um ponto fixo do site. Envie JPG ou PNG; sem foto, o gradiente de reserva aparece no lugar.
        </p>
        <p className="text-sm text-text-secondary mb-8">
          Textos de projetos em{" "}
          <Link href="/admin/content" className="text-burnt-peach hover:underline">
            Conteúdo
          </Link>
          . O ID da imagem do projeto deve coincidir com o slot listado abaixo (ex.: <code className="text-xs">project-caicara</code>).
        </p>

        {message && <p className="text-sm text-muted-teal mb-4">{message}</p>}

        <div className="grid gap-6 sm:grid-cols-2">
          {images.map((img) => (
            <div key={img.id} className="rounded-lg border border-border bg-white overflow-hidden">
              <div
                className="h-40 w-full"
                style={
                  img.path
                    ? {
                        backgroundImage: `url(${img.path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {
                        background: `linear-gradient(135deg, ${img.gradientFrom ?? "#3d405b"}, ${img.gradientTo ?? "#81b29a"})`,
                      }
                }
              />
              <div className="p-4">
                <p className="font-medium text-twilight-indigo text-sm">{img.name}</p>
                {img.usage && (
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">{img.usage}</p>
                )}
                <p className="text-[11px] text-text-secondary/80 mt-2 font-mono">ID: {img.id}</p>
                <label className="mt-3 inline-block cursor-pointer rounded-md bg-twilight-indigo px-4 py-2 text-xs text-white hover:bg-twilight-light">
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
