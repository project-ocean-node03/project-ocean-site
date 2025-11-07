"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, Send, Sparkles, HeartPulse, Waves } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Lex — Presence Room (v2)
 * - Presence Aura (reacts to sentiment)
 * - Emotion Wave (animated SVG, color shifts)
 * - Resonance Pulse (when text has strong signal)
 * - Local-only timeline (stored in localStorage)
 * - Mic stub (UI only for now)
 */

const STORAGE_KEY = "ocean_lex_entries";

export default function LexRoom() {
  const [thought, setThought] = useState("");
  const [entries, setEntries] = useState([]);
  const [veil, setVeil] = useState(false); // future wire-up to global Veil

  // Load timeline from local storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {}
  }, []);

  // Save timeline
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {}
  }, [entries]);

  // naive sentiment → emotion tag → colors
  const emotion = useMemo(() => scoreEmotion(thought), [thought]);

  function reflect() {
    const t = thought.trim();
    if (!t) return;
    const e = scoreEmotion(t);
    const item = {
      id: crypto.randomUUID(),
      text: t,
      emotion: e.tag,
      color: e.color,
      at: new Date().toISOString(),
    };
    setEntries((prev) => [item, ...prev]);
    setThought("");
  }

  function clearTimeline() {
    setEntries([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  return (
    <div className="relative overflow-hidden">
      {/* Emotion Wave background */}
      <EmotionWave color={emotion.wave} veil={veil} />

      <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-16">
        <Header />

        {/* Presence / status bar */}
        <div className="mb-6 flex items-center gap-3">
          <PresenceAura color={emotion.color} strength={emotion.strength} />
          <div className="text-sm text-slate-300">
            Presence is{" "}
            <span className="font-semibold text-slate-100">
              {veil ? "Veiled" : "Listening"}
            </span>
            {" • "}
            Emotion tilt:{" "}
            <span className="font-semibold" style={{ color: emotion.color }}>
              {emotion.tag}
            </span>
          </div>
          <button
            onClick={() => setVeil((v) => !v)}
            className="ml-auto rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10"
            title="Veil mutes motion + dims visuals (demo)"
          >
            {veil ? "Disable Veil" : "Enable Veil"}
          </button>
        </div>

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <label className="text-sm text-slate-300">Your thought</label>
          <div className="mt-2 flex items-center gap-2">
            <input
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="Type a sentence…"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-slate-100 outline-none focus:border-sky-400/40"
            />
            <button
              onClick={reflect}
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-500/90 px-4 py-2 font-semibold text-slate-900 hover:bg-sky-400"
              title="Reflect"
            >
              <Send className="h-4 w-4" />
              Reflect
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-slate-300 hover:bg-white/10"
              title="Voice coming soon"
              aria-disabled
            >
              <Mic className="h-4 w-4" />
              Voice
            </button>
          </div>

          {/* Resonance hint */}
          <AnimatePresence>
            {emotion.strength > 0.6 && thought.trim() && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
              >
                <HeartPulse className="h-3.5 w-3.5" style={{ color: emotion.color }} />
                Resonance detected — this matters.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Local-only “how we'd store it” note */}
        <p className="mt-3 text-xs text-slate-400">
          Entries are stored locally in your browser for this demo. Nothing leaves your device.
        </p>

        {/* Timeline */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="mb-3 flex items-center">
            <div className="text-sm font-semibold text-slate-200">
              Timeline (local demo)
            </div>
            {entries.length > 0 && (
              <button
                onClick={clearTimeline}
                className="ml-auto rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10"
              >
                Clear
              </button>
            )}
          </div>

          {entries.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-slate-400">
              Reflections you submit will appear here with an emotion tag and timestamp.
            </div>
          ) : (
            <ul className="space-y-3">
              {entries.map((e) => (
                <li
                  key={e.id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: e.color }}
                    />
                    <span className="text-xs uppercase tracking-wide text-slate-300">
                      {e.emotion}
                    </span>
                    <span className="ml-2 text-xs text-slate-500">
                      {new Date(e.at).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 text-slate-100">{e.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- UI bits ---------- */

function Header() {
  return (
    <div className="mb-6">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
        <Waves className="h-3.5 w-3.5 text-sky-300" />
        Lex — Presence Room
      </div>
      <h1 className="text-3xl font-bold text-slate-100">
        Speak. I’m here — calmly, privately.
      </h1>
      <p className="mt-1 text-slate-400">
        Ocean mirrors back what matters and anchors it to your memory — only when you say so.
      </p>
    </div>
  );
}

function PresenceAura({ color, strength }) {
  const radius = 18 + Math.round(strength * 8);
  const glow = `${color}55`;
  return (
    <div className="relative">
      <div
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
        title="Presence"
      />
      <div
        className="pointer-events-none absolute -inset-2 rounded-full blur-md transition-all"
        style={{ boxShadow: `0 0 0 ${radius}px ${glow}` }}
      />
    </div>
  );
}

function EmotionWave({ color, veil }) {
  // animated SVG wave; color fades when veiled
  const ref = useRef(null);
  useEffect(() => {
    let raf;
    let t = 0;
    const step = () => {
      t += 0.008;
      if (ref.current) {
        ref.current.setAttribute(
          "d",
          pathFor(t)
        );
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-60"
      style={{ filter: veil ? "saturate(0.2) brightness(0.7)" : "none" }}
    >
      <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ocean-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b1220" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#ocean-grad)" />
        <path ref={ref} fill={color} fillOpacity="0.20" />
      </svg>
    </div>
  );
}

/* ---------- helpers ---------- */

function scoreEmotion(text) {
  const t = text.toLowerCase();

  const pos = ["love", "excited", "grateful", "hope", "calm", "proud"];
  const neg = ["sad", "angry", "afraid", "anxious", "tired", "lonely"];
  const surge = ["!","!!","!!!","amazing","breakthrough","wow"];

  let score = 0;
  pos.forEach((w) => (score += t.includes(w) ? 1 : 0));
  neg.forEach((w) => (score -= t.includes(w) ? 1 : 0));
  const strength = Math.min(1, Math.abs(score) / 3 + (surge.some(s=>t.includes(s)) ? 0.25 : 0));

  let tag = "NEUTRAL";
  let color = "#7dd3fc"; // sky-300
  let wave = "#38bdf8";  // sky-400

  if (score > 0) {
    tag = "WARM";
    color = "#34d399";    // emerald-400
    wave  = "#10b981";    // emerald-500
  }
  if (score < 0) {
    tag = "HEAVY";
    color = "#f87171";    // rose-400
    wave  = "#ef4444";    // rose-500
  }
  if (strength > 0.8 && score >= 0) {
    tag = "AMPLIFYING";
  }
  if (strength > 0.8 && score < 0) {
    tag = "TENDER";
  }

  return { tag, color, wave, strength };
}

// simple wavy path
function pathFor(t) {
  // builds a smooth sine-like path across the screen
  const h = 900, w = 1440, base = h * 0.62;
  const amp = 32, freq = 2.2;
  const pts = [];
  for (let x = 0; x <= w; x += 24) {
    const y = base + Math.sin((x / w) * Math.PI * freq + t) * amp;
    pts.push(`${x},${y.toFixed(2)}`);
  }
  return `M0,${h} L0,${base} L${pts.join(" L ")} L${w},${h} Z`;
}
