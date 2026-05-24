import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { getSiteContent } from "@/lib/content";

export const metadata = { title: "Projetos" };

export default async function ProjetosPage() {
  const content = await getSiteContent();

  return (
    <section className="pt-[72px] py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          label="Projetos sociais"
          title="Nossos projetos"
          description="Projetos apoiados pelo Instituto Conexão Artemis, elegíveis à Lei de Incentivo ao Esporte."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {content.projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
