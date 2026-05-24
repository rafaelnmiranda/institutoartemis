interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  light?: boolean;
}

export default function SectionHeading({ label, title, description, light }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p
        className={`mb-2 text-[11px] uppercase tracking-[0.14em] ${
          light ? "text-apricot-cream/80" : "text-burnt-peach"
        }`}
      >
        {label}
      </p>
      <h2 className={`text-3xl md:text-4xl ${light ? "text-white" : "text-twilight-indigo"}`}>
        {title}
      </h2>
      <div className={`mt-4 h-0.5 w-12 ${light ? "bg-apricot-cream" : "bg-burnt-peach"}`} />
      {description && (
        <p className={`mt-5 max-w-2xl text-[15px] leading-relaxed ${light ? "text-white/70" : "text-text-secondary"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
