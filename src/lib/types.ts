export interface MenuItem {
  label: string;
  href: string;
}

export interface Settings {
  siteName: string;
  siteShortName: string;
  tagline: string;
  domain: string;
  contactEmail: string;
  publicEmail: string;
  address: string;
  phone: string;
  legalNote: string;
  cnpjStatus: string;
}

export interface HomeContent {
  heroPill: string;
  heroTitle: string;
  heroHighlight: string;
  heroTagline: string;
  heroDescription: string;
  heroFootnote: string;
  heroCtaPrimary: { label: string; href: string };
  heroCtaSecondary: { label: string; href: string };
  featuredProjectSlug: string;
  aboutTitle: string;
  aboutTeaser: string;
  stats: { value: string; label: string }[];
}

export interface BoardMember {
  initials: string;
  role: string;
  name: string;
  profession: string;
  mandate: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  intro: string;
  mission: { label: string; title: string; description: string };
  vision: { label: string; title: string; description: string };
  principles: { label: string; title: string; description: string };
  valuesIntro: string;
  values: { number: string; title: string; description: string }[];
  stats: { value: string; label: string }[];
  governance: {
    title: string;
    subtitle: string;
    intro: string;
    note: string;
    board: BoardMember[];
    fiscal: BoardMember[];
  };
  objectives: { letter: string; title: string; description: string }[];
}

export interface Project {
  slug: string;
  title: string;
  edition: string;
  status: string;
  summary: string;
  description: string;
  highlights: string[];
  image: string | null;
  imageAlt: string;
  gradientFrom: string;
  gradientTo: string;
}

export type DocumentCategory =
  | "atas-estatutos"
  | "documentos-projetos"
  | "relatorios-atividades"
  | "relatorios-financeiros"
  | "processos-contratacao"
  | "institucional";

export interface DocumentCategoryInfo {
  id: DocumentCategory;
  label: string;
  description: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  category: DocumentCategory;
  status: "available" | "pending";
  file: string | null;
  publishedAt: string | null;
}

export interface SiteImage {
  id: string;
  name: string;
  path: string | null;
  type: "upload" | "gradient";
  gradientFrom?: string;
  gradientTo?: string;
}

export interface TransparencyContent {
  title: string;
  subtitle: string;
  intro: string;
  assemblyTitle: string;
  assemblyDescription: string;
  legalNotice: string;
}

export interface ContactContent {
  title: string;
  subtitle: string;
  intro: string;
  subjectOptions: string[];
  lieNote: string;
  legalAdvisor: string;
  formSuccessMessage: string;
  formErrorMessage: string;
  lgpdNote: string;
}

export interface SiteContent {
  settings: Settings;
  menu: MenuItem[];
  home: HomeContent;
  about: AboutContent;
  projects: Project[];
  documents: Document[];
  documentCategories: DocumentCategoryInfo[];
  images: SiteImage[];
  transparency: TransparencyContent;
  contact: ContactContent;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
