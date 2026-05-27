import Link from "next/link";
import type { MenuItem, Settings } from "@/lib/types";

interface FooterProps {
  settings: Settings;
  menu: MenuItem[];
}

export default function Footer({ settings, menu }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#252739] text-white/50">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-3 pb-11 border-b border-white/7">
          <div>
            <p className="font-serif text-xl font-semibold text-white">{settings.siteName}</p>
            <p className="mt-2.5 text-[13px] font-light leading-relaxed max-w-xs">{settings.legalNote}</p>
            <span className="mt-3.5 inline-block rounded px-2.5 py-1 font-mono text-[11px] text-white/30 bg-white/5">
              {settings.cnpjStatus}
            </span>
          </div>
          <div>
            <p className="mb-3.5 text-[10px] uppercase tracking-[0.14em] text-white/35">Navegação</p>
            <ul className="space-y-2">
              {menu.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] font-light hover:text-white/85 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3.5 text-[10px] uppercase tracking-[0.14em] text-white/35">Contato</p>
            <p className="text-[13px] font-light">
              <a href={`mailto:${settings.publicEmail}`} className="hover:text-white/85 transition-colors">
                {settings.publicEmail}
              </a>
            </p>
            <p className="mt-2 text-[13px] font-light whitespace-pre-line">{settings.address}</p>
          </div>
        </div>
        <div className="pt-7 text-xs font-light">
          <span>© {year} {settings.siteName}. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
