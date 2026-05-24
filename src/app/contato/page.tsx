import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import { getSiteContent } from "@/lib/content";

export const metadata = { title: "Contato" };

export default async function ContatoPage() {
  const content = await getSiteContent();
  const { contact, settings } = content;

  return (
    <section className="pt-[72px] py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading label={contact.subtitle} title={contact.title} />

        <div className="grid gap-12 md:grid-cols-2 mt-4">
          <div>
            <p className="text-[15px] text-text-secondary font-light leading-relaxed mb-9">{contact.intro}</p>

            <InfoBlock title="E-mail">
              <a href={`mailto:${settings.publicEmail}`} className="hover:text-burnt-peach transition-colors">
                {settings.publicEmail}
              </a>
            </InfoBlock>

            <InfoBlock title="Sede">
              <p className="whitespace-pre-line">{settings.address}</p>
            </InfoBlock>

            <InfoBlock title="Lei de Incentivo ao Esporte">
              <p className="text-[13px] font-light">{contact.lieNote}</p>
            </InfoBlock>

            <InfoBlock title="Assessoria Jurídica">
              <p className="text-[13px] font-light whitespace-pre-line">{contact.legalAdvisor}</p>
            </InfoBlock>
          </div>

          <div className="rounded-lg border border-border bg-white p-6 md:p-8">
            <ContactForm contact={contact} settings={settings} />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-7">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-twilight-indigo">
        <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-white fill-none stroke-[1.5]">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </div>
      <div>
        <h4 className="text-[10px] font-medium uppercase tracking-widest text-muted-teal mb-1">{title}</h4>
        <div className="text-sm text-text-secondary font-light leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
