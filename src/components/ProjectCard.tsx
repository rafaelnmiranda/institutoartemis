import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  imageStyle: Record<string, string>;
}

export default function ProjectCard({ project, imageStyle }: ProjectCardProps) {
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-white transition-shadow hover:shadow-md"
    >
      <ContentImage
        className="h-48 w-full transition-transform duration-500 group-hover:scale-[1.02]"
        style={imageStyle}
        overlay="dark"
        ariaLabel={project.imageAlt}
      />
      <div className="p-6">
        <span className="text-[10px] uppercase tracking-widest text-muted-teal">{project.edition}</span>
        <h3 className="mt-1 font-serif text-2xl text-twilight-indigo group-hover:text-burnt-peach transition-colors">
          {project.title}
        </h3>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed line-clamp-3">{project.summary}</p>
        <span className="mt-4 inline-block text-sm text-burnt-peach group-hover:underline">
          Ver projeto →
        </span>
      </div>
    </Link>
  );
}
