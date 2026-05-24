"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/content", label: "Conteúdo" },
  { href: "/admin/images", label: "Imagens" },
  { href: "/admin/documents", label: "Documentos" },
  { href: "/admin/settings", label: "Configurações" },
];

export default function AdminNav() {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <aside className="w-full md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-border bg-white md:min-h-screen p-5">
      <div className="mb-8">
        <p className="font-serif text-lg text-twilight-indigo">Admin</p>
        <p className="text-xs text-text-secondary">Instituto Artemis</p>
      </div>
      <nav className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors ${
              pathname === link.href
                ? "bg-twilight-indigo text-white"
                : "text-text-secondary hover:bg-eggshell-dark hover:text-twilight-indigo"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={logout}
        className="mt-6 text-sm text-burnt-peach hover:underline hidden md:block"
      >
        Sair
      </button>
    </aside>
  );
}
