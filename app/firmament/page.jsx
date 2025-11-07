"use client";
import { useState } from "react";
import { Mic, Send } from "lucide-react";

export default function LexRoom() {
const [thought, setThought] = useState("");
const [echo, setEcho] = useState("");

const reflect = () => {
const t = thought.trim();
if (!t) return;
// Lightweight local "resonance"
const msg = `Ocean notes a strengthening signal and would store a private, time-indexed entry: “${t}”.`;
setEcho(msg);
};

return (
<div className="mx-auto max-w-4xl px-6 py-16">
<Header title="Lex" subtitle="Presence, dialog, and short reflections. Client-only demo." />

<div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
<label className="text-sm text-slate-300">Your thought</label>
<input
value={thought}
onChange={(e) => setThought(e.target.value)}
placeholder="Type a sentence…"
className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-slate-100 outline-none focus:border-sky-400/40"
/>
<div className="mt-4 flex items-center gap-3">
<button onClick={reflect} className="rounded-2xl bg-sky-500/90 px-4 py-2 font-semibold text-slate-900 hover:bg-sky-400">Reflect</button>
<button disabled className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-slate-400" title="Voice coming soon">
<Mic className="h-4 w-4" />
</button>
</div>
{echo && (
<p className="mt-4 text-sm text-slate-300">{echo}</p>
)}
</div>
</div>
);
}

function Header({ title, subtitle }) {
return (
<div className="mb-8">
<h1 className="text-3xl font-bold text-slate-100">{title}</h1>
<p className="mt-1 text-slate-400">{subtitle}</p>
</div>
);
}
