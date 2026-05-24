import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-white transition-shadow hover:shadow-md"
    >
      <div
        className="h-48 w-full"
        style={{
          background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
        }}
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
