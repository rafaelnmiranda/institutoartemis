import { put, del } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { getDocumentsDir, getUploadsDir } from "./content";

function shouldUseBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function uploadFile(
  file: File,
  folder: "images" | "documents"
): Promise<{ url: string; filename: string }> {
  const ext = path.extname(file.name) || "";
  const filename = `${uuidv4()}${ext}`;
  const blobPath = `${folder}/${filename}`;

  if (shouldUseBlobStorage()) {
    const blob = await put(blobPath, file, { access: "public" });
    return { url: blob.url, filename: blobPath };
  }

  const dir = folder === "documents" ? getDocumentsDir() : path.join(getUploadsDir(), folder);
  await fs.mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const localPath = path.join(dir, filename);
  await fs.writeFile(localPath, buffer);

  const publicUrl =
    folder === "documents"
      ? `/api/documents/file/${filename}`
      : `/uploads/${folder}/${filename}`;

  return { url: publicUrl, filename };
}

export async function deleteFile(url: string): Promise<void> {
  if (url.startsWith("http") && shouldUseBlobStorage()) {
    try {
      await del(url);
    } catch {
      // ignore missing blobs
    }
    return;
  }

  if (url.startsWith("/uploads/")) {
    const localPath = path.join(process.cwd(), "public", url);
    try {
      await fs.unlink(localPath);
    } catch {
      // ignore
    }
  }

  if (url.startsWith("/api/documents/file/")) {
    const filename = url.replace("/api/documents/file/", "");
    const localPath = path.join(getDocumentsDir(), filename);
    try {
      await fs.unlink(localPath);
    } catch {
      // ignore
    }
  }
}

export function isBlobEnabled(): boolean {
  return shouldUseBlobStorage();
}
