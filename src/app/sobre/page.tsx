import SectionHeading from "@/components/SectionHeading";
import GovernanceTabs from "@/components/GovernanceTabs";
import { getSiteContent } from "@/lib/content";

export const metadata = { title: "Sobre" };

export default async function SobrePage() {
  const content = await getSiteContent();
  const { about } = content;

  return (
    <>
      <section className="pt-[72px] bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading label={about.subtitle} title={about.title} description={about.intro} />

          <div className="grid gap-12 md:grid-cols-2 md:items-start mt-4">
            <div className="space-y-9">
              {[about.mission, about.vision, about.principles].map((item) => (
                <div key={item.label} className="pb-9 border-b border-border last:border-0 last:pb-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-teal mb-2">{item.label}</p>
                  <h3 className="font-serif text-[22px] text-twilight-indigo mb-2.5">{item.title}</h3>
                  <p className="text-sm text-text-secondary font-light leading-[1.8]">{item.description}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[13px] text-text-secondary font-light mb-5">{about.valuesIntro}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {about.values.map((v) => (
                  <div key={v.number} className="rounded-md border border-border bg-eggshell p-5">
                    <p className="font-serif text-[28px] text-apricot-cream font-semibold leading-none mb-2.5">{v.number}</p>
                    <h4 className="text-[15px] text-twilight-indigo mb-1.5">{v.title}</h4>
                    <p className="text-[13px] text-text-secondary font-light leading-relaxed">{v.description}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3.5 mt-3.5">
                {about.stats.map((stat) => (
                  <div key={stat.label} className="rounded-md bg-twilight-indigo p-5 text-center">
                    <p className="font-serif text-[32px] text-apricot-cream leading-none">{stat.value}</p>
                    <p className="text-[11px] text-white/55 mt-1.5 tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-eggshell">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            label={about.governance.subtitle}
            title={about.governance.title}
            description={about.governance.intro}
          />
          <GovernanceTabs
            board={about.governance.board}
            fiscal={about.governance.fiscal}
            note={about.governance.note}
          />
        </div>
      </section>

      <section id="objetivos" className="py-20 bg-twilight-indigo">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            label="Estatuto Social — Art. 2º"
            title="Objetivos institucionais"
            description="O Instituto Conexão Artemis atua nas seguintes frentes, conforme definido no Estatuto Social aprovado em 22 de maio de 2026."
            light
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {about.objectives.map((obj) => (
              <div
                key={obj.letter}
                className="rounded-md border border-white/10 bg-white/5 p-7 transition-colors hover:bg-white/8"
              >
                <p className="font-serif text-4xl text-burnt-peach/60 font-semibold leading-none mb-3.5">{obj.letter})</p>
                <h4 className="text-base font-medium text-white mb-2">{obj.title}</h4>
                <p className="text-[13px] text-white/60 font-light leading-relaxed">{obj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
