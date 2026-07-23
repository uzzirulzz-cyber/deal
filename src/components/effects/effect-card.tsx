"use client";

import { useState } from "react";
import { Check, Code2, Copy, Eye } from "lucide-react";
import { toast } from "sonner";
import { Demo } from "./demos";
import type { Effect } from "@/lib/effects-data";

export function EffectCard({ effect, index }: { effect: Effect; index: number }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(effect.css);
      setCopied(true);
      toast.success("CSS copied to clipboard", {
        description: effect.name,
      });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy — try selecting manually.");
    }
  }

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:shadow-[0_24px_60px_-24px_rgba(244,63,94,0.35)]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Demo stage */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden border-b border-border/50 bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.08),transparent_60%)]">
        <div className="pointer-events-none absolute inset-0 grid-texture opacity-40" />
        <div className="relative z-10 px-6">
          <Demo id={effect.id} />
        </div>
        <span className="absolute left-3 top-3 z-10 rounded-full border border-border/60 bg-background/70 px-2.5 py-0.5 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-amber-200/80">
          {effect.category}
        </span>
      </div>

      {/* Meta */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-amber-50">{effect.name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
          {effect.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {effect.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border/50 bg-secondary/40 px-2 py-0.5 text-[0.66rem] font-medium text-muted-foreground"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border/60 bg-secondary/40 px-3 py-2 text-xs font-medium text-foreground/90 transition-colors hover:border-amber-400/40 hover:bg-amber-400/10"
          >
            {open ? <Eye className="h-3.5 w-3.5" /> : <Code2 className="h-3.5 w-3.5" />}
            {open ? "Hide CSS" : "View CSS"}
          </button>
          <button
            onClick={copy}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-400/40 bg-amber-400/15 px-3 py-2 text-xs font-semibold text-amber-200 transition-colors hover:bg-amber-400/25"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        {/* Code panel */}
        {open && (
          <div className="mt-3 overflow-hidden rounded-lg border border-border/50 bg-[#0c0a14]">
            <div className="flex items-center justify-between border-b border-border/40 px-3 py-1.5">
              <span className="font-mono text-[0.62rem] uppercase tracking-widest text-amber-200/50">
                {effect.id}.css
              </span>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-rose-400/60" />
                <span className="h-2 w-2 rounded-full bg-amber-400/60" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
              </div>
            </div>
            <pre className="fancy-scroll code-block max-h-72 overflow-auto px-3 py-3 text-amber-100/90">
              <code>{effect.css}</code>
            </pre>
          </div>
        )}
      </div>
    </article>
  );
}
