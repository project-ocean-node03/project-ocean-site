import "./globals.css";
</body>
</html>
);
}

function TopNav() {
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
</nav>
</div>
</div>
</header>
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

