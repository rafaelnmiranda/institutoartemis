import DocumentList from "@/components/DocumentList";
import SectionHeading from "@/components/SectionHeading";
import { getSiteContent } from "@/lib/content";

export const metadata = { title: "Transparência" };

export default async function DocumentosPage() {
  const content = await getSiteContent();

  return (
    <section className="pt-[72px] py-20 bg-white">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          label={content.transparency.subtitle}
          title={content.transparency.title}
          description={content.transparency.intro}
        />

        <DocumentList documents={content.documents} categories={content.documentCategories} />

        <div className="mt-14 flex gap-6 rounded-md bg-twilight-indigo p-8 text-white">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-burnt-peach">
            <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-white fill-none stroke-[1.5]">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <h4 className="text-base font-medium mb-1.5">{content.transparency.assemblyTitle}</h4>
            <p className="text-[13px] text-white/65 font-light leading-relaxed">{content.transparency.assemblyDescription}</p>
          </div>
        </div>

        <p className="mt-6 max-w-3xl rounded-md border border-border border-l-[3px] border-l-apricot-cream bg-eggshell p-6 text-[13px] text-text-secondary font-light leading-relaxed">
          {content.transparency.legalNotice}
        </p>
      </div>
    </section>
  );
}
