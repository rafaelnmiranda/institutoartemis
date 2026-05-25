import Link from "next/link";
import { notFound } from "next/navigation";
import ContentImage from "@/components/ContentImage";
import { getProjectBySlug, getSiteContent, resolveProjectImageStyle } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Projeto não encontrado" };
  return { title: project.title };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const content = await getSiteContent();
  const bannerStyle = resolveProjectImageStyle(content, project);

  return (
    <>
      <section className="pt-[72px]">
        <ContentImage
          className="h-64 md:h-80 w-full"
          style={bannerStyle}
          overlay="dark"
          ariaLabel={project.imageAlt}
        />
        <div className="mx-auto max-w-3xl px-5 md:px-8 py-12">
          <p className="text-[10px] uppercase tracking-widest text-muted-teal">{project.edition}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-twilight-indigo mt-2">{project.title}</h1>
          <p className="mt-4 text-[15px] text-text-secondary leading-relaxed">{project.summary}</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="prose prose-sm max-w-none">
            {project.description.split("\n\n").map((para, i) => (
              <p key={i} className="text-[15px] text-text-secondary font-light leading-[1.85] mb-5">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-border bg-white p-6">
            <h2 className="font-serif text-xl text-twilight-indigo mb-4">Destaques</h2>
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-text-secondary">
                  <span className="text-muted-teal shrink-0">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contato"
              className="rounded-md bg-burnt-peach px-6 py-3 text-sm font-medium text-white hover:bg-burnt-peach-dark transition-colors"
            >
              Quero apoiar este projeto
            </Link>
            <Link
              href="/projetos"
              className="rounded-md border border-twilight-indigo px-6 py-3 text-sm text-twilight-indigo hover:bg-twilight-indigo hover:text-white transition-colors"
            >
              ← Todos os projetos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
