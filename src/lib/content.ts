import { head, put } from "@vercel/blob";
import { unstable_noStore as noStore } from "next/cache";
import { revalidatePath } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import type { Project, SiteContent, SiteImage } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const SITE_FILE = path.join(DATA_DIR, "site.json");
const SITE_BLOB_PATH = "cms/site.json";
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const DOCUMENTS_DIR = path.join(DATA_DIR, "documents");

function shouldUseBlobCms(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function ensureDirs() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.mkdir(DOCUMENTS_DIR, { recursive: true });
}

async function readSiteJsonFromDisk(): Promise<SiteContent> {
  await ensureDirs();
  const raw = await fs.readFile(SITE_FILE, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

async function readSiteJsonFromBlob(): Promise<SiteContent | null> {
  try {
    const meta = await head(SITE_BLOB_PATH);
    const response = await fetch(meta.url);
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as SiteContent;
  } catch {
    return null;
  }
}

async function writeSiteJsonToBlob(content: SiteContent): Promise<void> {
  await put(SITE_BLOB_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
  });
}

/** Invalida o cache das páginas públicas após alterações no admin. */
export function revalidatePublicSite() {
  revalidatePath("/", "layout");
}

export async function getSiteContent(): Promise<SiteContent> {
  noStore();
  if (shouldUseBlobCms()) {
    const fromBlob = await readSiteJsonFromBlob();
    if (fromBlob) {
      return fromBlob;
    }
    const fromDisk = await readSiteJsonFromDisk();
    await writeSiteJsonToBlob(fromDisk);
    return fromDisk;
  }
  return readSiteJsonFromDisk();
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  if (shouldUseBlobCms()) {
    await writeSiteJsonToBlob(content);
    return;
  }
  await ensureDirs();
  await fs.writeFile(SITE_FILE, JSON.stringify(content, null, 2), "utf-8");
}

export function getUploadsDir() {
  return UPLOADS_DIR;
}

export function getDocumentsDir() {
  return DOCUMENTS_DIR;
}

export async function getProjectBySlug(slug: string) {
  const content = await getSiteContent();
  return content.projects.find((p) => p.slug === slug) ?? null;
}

export async function getPublishedDocuments() {
  const content = await getSiteContent();
  return content.documents.filter((d) => d.status === "available" && d.file);
}

export function getImageById(content: SiteContent, id: string): SiteImage | null {
  return content.images.find((img) => img.id === id) ?? null;
}

export function resolveImageStyle(
  image: Pick<SiteImage, "path" | "gradientFrom" | "gradientTo"> | null,
  fallbackFrom = "#3d405b",
  fallbackTo = "#81b29a"
): Record<string, string> {
  if (image?.path) {
    return {
      backgroundImage: `url(${image.path})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  return {
    background: `linear-gradient(135deg, ${image?.gradientFrom ?? fallbackFrom}, ${image?.gradientTo ?? fallbackTo})`,
  };
}

export function resolveProjectImageStyle(content: SiteContent, project: Project): Record<string, string> {
  if (project.image) {
    return {
      backgroundImage: `url(${project.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  const slot = getImageById(content, project.imageId);
  if (slot) {
    return resolveImageStyle(slot, project.gradientFrom, project.gradientTo);
  }
  return {
    background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
  };
}
