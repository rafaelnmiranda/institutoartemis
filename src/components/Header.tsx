"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { MenuItem, Settings } from "@/lib/types";

interface HeaderProps {
  menu: MenuItem[];
  settings: Settings;
}

export default function Header({ menu, settings }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-twilight-indigo/97 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-burnt-peach">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] stroke-white fill-none stroke-[1.5]">
              <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <span className="font-serif text-[17px] font-semibold text-white leading-tight block">
              {settings.siteShortName}
            </span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-white/50 block leading-none mt-0.5">
              Associação Civil Sem Fins Econômicos
            </span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-7">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-[13px] tracking-wide transition-colors ${
                  pathname === item.href ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="block h-0.5 w-[22px] rounded bg-white" />
          <span className="block h-0.5 w-[22px] rounded bg-white" />
          <span className="block h-0.5 w-[22px] rounded bg-white" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-twilight-indigo px-5 py-4">
          <ul className="flex flex-col gap-4">
            {menu.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/80 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
