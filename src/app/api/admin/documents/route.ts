import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSiteContent, revalidatePublicSite, saveSiteContent } from "@/lib/content";
import { deleteFile, uploadFile } from "@/lib/storage";
import type { Document, DocumentCategory } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim() || "";
    const category = formData.get("category") as DocumentCategory;
    const docId = formData.get("docId") as string | null;

    if (!file || !title || !category) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
    }

    const { url } = await uploadFile(file, "documents");
    const content = await getSiteContent();

    if (docId) {
      const idx = content.documents.findIndex((d) => d.id === docId);
      if (idx >= 0) {
        if (content.documents[idx].file) {
          await deleteFile(content.documents[idx].file!);
        }
        content.documents[idx] = {
          ...content.documents[idx],
          title,
          description,
          category,
          status: "available",
          file: url,
          publishedAt: new Date().toISOString(),
        };
      }
    } else {
      const newDoc: Document = {
        id: uuidv4(),
        title,
        description,
        category,
        status: "available",
        file: url,
        publishedAt: new Date().toISOString(),
      };
      content.documents.push(newDoc);
    }

    await saveSiteContent(content);
    revalidatePublicSite();
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("[admin/documents]", error);
    return NextResponse.json({ error: "Erro ao enviar documento." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const docId = searchParams.get("id");
  if (!docId) {
    return NextResponse.json({ error: "ID obrigatório." }, { status: 400 });
  }

  const content = await getSiteContent();
  const idx = content.documents.findIndex((d) => d.id === docId);
  if (idx < 0) {
    return NextResponse.json({ error: "Documento não encontrado." }, { status: 404 });
  }

  if (content.documents[idx].file) {
    await deleteFile(content.documents[idx].file);
  }
  content.documents.splice(idx, 1);
  await saveSiteContent(content);
  revalidatePublicSite();

  return NextResponse.json({ success: true });
}
