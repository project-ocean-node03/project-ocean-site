"use client";
import Link from "next/link";
import { Waves } from "lucide-react";
import { useVeil } from "@/app/providers";

export default function TopNav() {
  const { veil, setVeil } = useVeil();

  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-2">
          <Link href="/" className="flex items-center gap-2 text-slate-200">
            <Waves className="h-5 w-5 text-sky-300" />
            <span className="font-semibold">Project Ocean</span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 text-sm text-slate-300">
            <Link className="hover:text-sky-300" href="/lex">Lex</Link>
            <Link className="hover:text-sky-300" href="/firmament">Firmament</Link>
            <Link className="hover:text-sky-300" href="/vault">Vault</Link>

            <button
              onClick={() => setVeil(v => !v)}
              className="ml-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10"
              title="Veil mutes motion + dims visuals"
            >
              {veil ? "Disable Veil" : "Enable Veil"}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
