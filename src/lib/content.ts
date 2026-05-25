import { promises as fs } from "fs";
import path from "path";
import type { Project, SiteContent, SiteImage } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const SITE_FILE = path.join(DATA_DIR, "site.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const DOCUMENTS_DIR = path.join(DATA_DIR, "documents");

export async function ensureDirs() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.mkdir(DOCUMENTS_DIR, { recursive: true });
}

export async function getSiteContent(): Promise<SiteContent> {
  await ensureDirs();
  const raw = await fs.readFile(SITE_FILE, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
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
