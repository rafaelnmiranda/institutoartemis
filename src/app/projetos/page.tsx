import ContentImage from "@/components/ContentImage";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import {
  getImageById,
  getSiteContent,
  resolveImageStyle,
  resolveProjectImageStyle,
} from "@/lib/content";

export const metadata = { title: "Projetos" };

export default async function ProjetosPage() {
  const content = await getSiteContent();
  const banner = getImageById(content, "projects-banner");
  const bannerStyle = resolveImageStyle(banner);

  return (
    <>
      <section className="pt-[72px]">
        <ContentImage
          className="h-44 md:h-56 w-full"
          style={bannerStyle}
          overlay="dark"
          ariaLabel="Projetos sociais do Instituto"
        />
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            label="Projetos sociais"
            title="Nossos projetos"
            description="Projetos apoiados pelo Instituto Conexão Artemis, elegíveis à Lei de Incentivo ao Esporte."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {content.projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                imageStyle={resolveProjectImageStyle(content, project)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
