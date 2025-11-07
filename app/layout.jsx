import "./globals.css";
import { Providers } from "./providers";
import TopNav from "@/components/TopNav";
import Link from "next/link";
import { Waves, Shield, Database } from "lucide-react";

export const metadata = {
  title: "Project Ocean — Humanity’s next wave of intelligence",
  description: "Emotionally-aware AI. Privacy-first. Memory under your control.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white selection:bg-sky-500/30">
        <Providers>
          <TopNav />
          <main className="pt-16 min-h-screen">{children}</main>
          <Dock />
        </Providers>
      </body>
    </html>
  );
}

function Dock() {
  return (
    <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
        <DockLink href="/lex" label="Lex" icon={<Waves className="h-4 w-4" />} />
        <DockLink href="/firmament" label="Firmament" icon={<Shield className="h-4 w-4" />} />
        <DockLink href="/vault" label="Vault" icon={<Database className="h-4 w-4" />} />
      </div>
    </div>
  );
}
function DockLink({ href, label, icon }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/0 px-3 py-1.5 text-slate-200 hover:bg-white/10">
      <span className="text-sky-300">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
}
