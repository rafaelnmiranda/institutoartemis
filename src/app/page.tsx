import Link from "next/link";
import Hero from "@/components/Hero";
import ContentImage from "@/components/ContentImage";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import {
  getImageById,
  getSiteContent,
  resolveImageStyle,
  resolveProjectImageStyle,
} from "@/lib/content";

export default async function HomePage() {
  const content = await getSiteContent();
  const featuredProject = content.projects.find(
    (p) => p.slug === content.home.featuredProjectSlug
  );
  const heroImage = getImageById(content, "hero-bg");
  const heroStyle = resolveImageStyle(heroImage, "#3d405b", "#252739");
  const heroHasPhoto = Boolean(heroImage?.path);
  const aboutImage = getImageById(content, "home-about");
  const aboutStyle = resolveImageStyle(aboutImage);

  return (
    <>
      <Hero
        home={content.home}
        settings={content.settings}
        featuredProject={featuredProject}
        heroStyle={heroStyle}
        heroHasPhoto={heroHasPhoto}
      />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <SectionHeading
                label="Quem somos"
                title={content.home.aboutTitle}
                description={content.home.aboutTeaser}
              />
              <Link
                href="/sobre"
                className="inline-block rounded-md border border-twilight-indigo px-6 py-2.5 text-sm text-twilight-indigo transition-colors hover:bg-twilight-indigo hover:text-white"
              >
                Sobre o Instituto
              </Link>
            </div>
            <ContentImage
              className="min-h-[280px] md:min-h-[360px] rounded-lg shadow-md"
              style={aboutStyle}
              overlay="dark"
              ariaLabel="Esporte de natureza e comunidades"
            />
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {content.home.stats.map((stat) => (
              <div key={stat.label} className="rounded-md bg-twilight-indigo p-5 text-center">
                <p className="font-serif text-3xl text-apricot-cream">{stat.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            label="Projetos sociais"
            title="Nosso impacto"
            description="Projetos elegíveis à Lei de Incentivo ao Esporte, conectando atletas brasileiros a oportunidades nacionais e internacionais."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="relative overflow-hidden rounded-lg bg-twilight-indigo text-white min-h-[280px]">
            <div
              className="absolute inset-0 bg-gradient-to-br from-twilight-indigo via-[#3d405b] to-burnt-peach/40"
              aria-hidden
            />
            <div className="relative z-10 p-10 md:p-14 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white">Apoie via Lei de Incentivo ao Esporte</h2>
              <p className="mx-auto mt-4 max-w-xl text-white/90 text-[15px] leading-relaxed">
                Empresas podem patrocinar projetos esportivos com dedução fiscal de até 100% via Lei 11.438/2006.
              </p>
              <Link
                href="/contato"
                className="mt-8 inline-block rounded-md bg-burnt-peach px-8 py-3 text-sm font-medium text-white hover:bg-burnt-peach-dark transition-colors"
              >
                Quero patrocinar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
