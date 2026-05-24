import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import { uploadFile } from "@/lib/storage";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const imageId = formData.get("imageId") as string | null;

    if (!file || !imageId) {
      return NextResponse.json({ error: "Arquivo e imageId são obrigatórios." }, { status: 400 });
    }

    const { url } = await uploadFile(file, "images");
    const content = await getSiteContent();
    const imageIndex = content.images.findIndex((img) => img.id === imageId);

    if (imageIndex >= 0) {
      content.images[imageIndex] = {
        ...content.images[imageIndex],
        path: url,
        type: "upload",
      };
    } else {
      content.images.push({
        id: imageId,
        name: file.name,
        path: url,
        type: "upload",
      });
    }

    await saveSiteContent(content);
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("[admin/images]", error);
    return NextResponse.json({ error: "Erro ao enviar imagem." }, { status: 500 });
  }
}
