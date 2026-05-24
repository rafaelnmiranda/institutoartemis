"use client";

import { useState } from "react";
import type { BoardMember } from "@/lib/types";

interface GovernanceTabsProps {
  board: BoardMember[];
  fiscal: BoardMember[];
  note: string;
}

export default function GovernanceTabs({ board, fiscal, note }: GovernanceTabsProps) {
  const [tab, setTab] = useState<"diretoria" | "fiscal">("diretoria");
  const members = tab === "diretoria" ? board : fiscal;

  return (
    <div>
      <div className="inline-flex overflow-hidden rounded-md border border-border mb-8">
        <button
          type="button"
          onClick={() => setTab("diretoria")}
          className={`px-6 py-2.5 text-sm transition-colors ${tab === "diretoria" ? "bg-twilight-indigo text-white" : "bg-white text-text-secondary"}`}
        >
          Diretoria
        </button>
        <button
          type="button"
          onClick={() => setTab("fiscal")}
          className={`px-6 py-2.5 text-sm transition-colors ${tab === "fiscal" ? "bg-twilight-indigo text-white" : "bg-white text-text-secondary"}`}
        >
          Conselho Fiscal
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member.name} className="flex gap-4 rounded-md border border-border bg-white p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-twilight-indigo font-serif text-base font-semibold text-apricot-cream">
              {member.initials}
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-burnt-peach">{member.role}</p>
              <h4 className="text-[15px] font-medium text-twilight-indigo mt-0.5">{member.name}</h4>
              <p className="text-xs text-text-secondary font-light">{member.profession}</p>
              <span className="mt-2 inline-block rounded-full bg-apricot-cream/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#7A6030]">
                {member.mandate}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-2xl rounded-md border border-border border-l-[3px] border-l-muted-teal bg-white p-5 text-[13px] text-text-secondary font-light leading-relaxed">
        {note}
      </p>
    </div>
  );
}
