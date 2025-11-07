import { Shield, Lock, Database, EyeOff } from "lucide-react";

export default function FirmamentRoom() {
return (
<div className="mx-auto max-w-5xl px-6 py-16">
<Header title="Firmament" subtitle="Sovereignty layer — consent, storage policy, and transparent controls." />

<div className="grid gap-6 md:grid-cols-2">
<Panel title="Consent Channels" icon={<Shield className="h-4 w-4 text-sky-300" />}>Configure who/what Ocean is allowed to talk to on your behalf.</Panel>
<Panel title="Storage Policy" icon={<Database className="h-4 w-4 text-sky-300" />}>Local-first by default. Choose destinations and retention windows.</Panel>
<Panel title="Privacy Veil" icon={<EyeOff className="h-4 w-4 text-sky-300" />}>Enable a quiet, low-motion mode that limits logging and network calls.</Panel>
<Panel title="Keys & Exports" icon={<Lock className="h-4 w-4 text-sky-300" />}>Manage encryption keys and create privacy-preserving exports.</Panel>
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

function Panel({ title, icon, children }) {
return (
<div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
<div className="flex items-center gap-2 text-slate-200 font-medium">{icon}{title}</div>
<p className="mt-2 text-sm text-slate-400">{children}</p>
<div className="mt-4 text-sm text-sky-300">Open →</div>
</div>
);
}
