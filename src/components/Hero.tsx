import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import type { HomeContent, Project, Settings } from "@/lib/types";

interface HeroProps {
  home: HomeContent;
  settings: Settings;
  featuredProject?: Project | null;
  heroStyle: Record<string, string>;
  heroHasPhoto: boolean;
}

export default function Hero({ home, featuredProject, heroStyle, heroHasPhoto }: HeroProps) {
  const parts = home.heroTitle.split(home.heroHighlight);

  return (
    <section className="relative min-h-screen pt-[72px] flex items-center overflow-hidden">
      <ContentImage
        className="absolute inset-0"
        style={heroStyle}
        overlay={heroHasPhoto ? "hero" : "none"}
      />
      {!heroHasPhoto && (
        <div className="absolute inset-0 bg-gradient-to-br from-twilight-indigo to-[#252739]" />
      )}
      <div
        className="absolute inset-0 opacity-[0.05] z-[1]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-burnt-peach opacity-[0.08] z-[1]" />
      <div className="absolute bottom-20 -left-16 h-[280px] w-[280px] rounded-full bg-muted-teal opacity-[0.07] z-[1]" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-20 text-center text-white md:px-8">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-[18px] py-[7px] text-[11px] uppercase tracking-[0.12em] text-white/80">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-apricot-cream" />
          {home.heroPill}
        </div>

        <h1 className="text-[clamp(44px,8vw,84px)] tracking-tight leading-[1.05]">
          {parts[0]}
          <em className="text-apricot-cream not-italic">{home.heroHighlight}</em>
          {parts[1] ?? ""}
        </h1>

        <p className="font-serif text-[clamp(17px,2.5vw,24px)] italic text-white/60 mt-2 mb-7">
          {home.heroTagline}
        </p>

        <p className="mx-auto max-w-lg text-[15px] font-light leading-[1.85] text-white/70 mb-12">
          {home.heroDescription}
        </p>

        <div className="flex flex-wrap justify-center gap-3.5">
          <Link
            href={home.heroCtaPrimary.href}
            className="rounded-md bg-burnt-peach px-[30px] py-[13px] text-sm font-medium text-white transition-colors hover:bg-burnt-peach-dark"
          >
            {home.heroCtaPrimary.label}
          </Link>
          <Link
            href={home.heroCtaSecondary.href}
            className="rounded-md border border-white/25 px-[30px] py-[13px] text-sm text-white/80 transition-colors hover:border-white/50 hover:text-white"
          >
            {home.heroCtaSecondary.label}
          </Link>
        </div>

        {home.heroFootnote && (
          <p className="mt-14 text-xs tracking-wide text-white/35">{home.heroFootnote}</p>
        )}

        {featuredProject && (
          <div className="mt-12 rounded-lg border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm max-w-xl mx-auto">
            <p className="text-[10px] uppercase tracking-widest text-apricot-cream mb-2">Projeto em destaque</p>
            <h3 className="font-serif text-2xl text-white">{featuredProject.title}</h3>
            <p className="mt-1 text-sm text-muted-teal">{featuredProject.edition}</p>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">{featuredProject.summary}</p>
            <Link
              href={`/projetos/${featuredProject.slug}`}
              className="mt-4 inline-block text-sm text-apricot-cream hover:text-white transition-colors"
            >
              Saiba mais →
            </Link>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block w-full h-[60px]">
          <path d="M0,60 L0,30 Q720,0 1440,30 L1440,60 Z" fill="#f4f1de" />
        </svg>
      </div>
    </section>
  );
}
