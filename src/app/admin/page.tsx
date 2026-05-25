import Link from "next/link";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { isAuthenticated } from "@/lib/auth";
import { getSiteContent } from "@/lib/content";
import { isBlobEnabled } from "@/lib/storage";

export default async function AdminDashboard() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const content = await getSiteContent();

  return (
    <div className="flex flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 p-6 md:p-10">
        <h1 className="font-serif text-3xl text-twilight-indigo mb-2">Visão geral</h1>
        <p className="text-text-secondary mb-8">Painel de administração do site institucional.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Projetos" value={String(content.projects.length)} />
          <StatCard label="Documentos" value={String(content.documents.length)} />
          <StatCard label="Imagens" value={String(content.images.length)} />
        </div>

        <div className="mt-8 rounded-lg border border-border bg-white p-6">
          <h2 className="font-serif text-xl text-twilight-indigo mb-4">Status do sistema</h2>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>
              Armazenamento:{" "}
              <span className="text-twilight-indigo font-medium">
                {isBlobEnabled() ? "Vercel Blob (produção)" : "Arquivos locais (desenvolvimento)"}
              </span>
            </li>
            <li>
              E-mail de contato:{" "}
              <span className="text-twilight-indigo font-medium">{content.settings.contactEmail}</span>
            </li>
            <li>
              SMTP:{" "}
              <span className="text-twilight-indigo font-medium">
                {process.env.SMTP_HOST ? "Configurado" : "Modo mock (configure SMTP no .env)"}
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <AdminLink href="/admin/content" label="Editar conteúdo" />
          <AdminLink href="/admin/images" label="Gerenciar imagens" />
          <AdminLink href="/admin/documents" label="Gerenciar documentos" />
          <AdminLink href="/" label="Ver site público" external />
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-white p-6 text-center">
      <p className="font-serif text-4xl text-burnt-peach">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-text-secondary">{label}</p>
    </div>
  );
}

function AdminLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className="rounded-md border border-twilight-indigo px-5 py-2.5 text-sm text-twilight-indigo hover:bg-twilight-indigo hover:text-white transition-colors"
    >
      {label}
    </Link>
  );
}
