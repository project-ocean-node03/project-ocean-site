import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Home() {
return (
<div className="mx-auto max-w-6xl px-6 py-20">
<div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
<Sparkles className="h-3.5 w-3.5 text-sky-300" /> Ocean Portal
</div>
<h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-50">Emotional. Private. <span className="text-sky-300">Alive.</span></h1>
<p className="mt-4 max-w-2xl text-slate-300">Enter the rooms of the Ocean Stack. Lex for presence and dialog. Firmament for sovereignty and consent. Vault for your encrypted memory.</p>

<div className="mt-10 grid gap-6 md:grid-cols-3">
<RoomCard href="/lex" title="Lex" desc="Dialog, presence, and reflection." tag="CORE" />
<RoomCard href="/firmament" title="Firmament" desc="Sovereignty layer and controls." tag="BOUNDARY" />
<RoomCard href="/vault" title="Vault" desc="Encrypted memories and timeline." tag="MEMORY" />
</div>
</div>
);
}

function RoomCard({ href, title, desc, tag }) {
return (
<Link href={href} className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10">
<div className="flex items-center justify-between">
<div className="text-lg font-semibold text-slate-100">{title}</div>
<span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-sky-300">{tag}</span>
</div>
<p className="mt-2 text-sm text-slate-400">{desc}</p>
<div className="mt-6 text-sm text-sky-300">Enter →</div>
</Link>
);
}
