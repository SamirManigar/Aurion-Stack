"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  language: string;
  children: string;
}

// Language → display label + dot colour
const LANG_META: Record<string, { label: string; color: string }> = {
  bash:       { label: "bash",       color: "#4ade80" },
  sh:         { label: "shell",      color: "#4ade80" },
  shell:      { label: "shell",      color: "#4ade80" },
  zsh:        { label: "zsh",        color: "#4ade80" },
  js:         { label: "javascript", color: "#facc15" },
  javascript: { label: "javascript", color: "#facc15" },
  ts:         { label: "typescript", color: "#60a5fa" },
  typescript: { label: "typescript", color: "#60a5fa" },
  tsx:        { label: "tsx",        color: "#818cf8" },
  jsx:        { label: "jsx",        color: "#f97316" },
  json:       { label: "json",       color: "#34d399" },
  yaml:       { label: "yaml",       color: "#a78bfa" },
  yml:        { label: "yaml",       color: "#a78bfa" },
  python:     { label: "python",     color: "#38bdf8" },
  py:         { label: "python",     color: "#38bdf8" },
  css:        { label: "css",        color: "#f472b6" },
  html:       { label: "html",       color: "#fb923c" },
  sql:        { label: "sql",        color: "#c084fc" },
  go:         { label: "go",         color: "#22d3ee" },
  rust:       { label: "rust",       color: "#f87171" },
  plaintext:  { label: "plaintext",  color: "#94a3b8" },
  text:       { label: "text",       color: "#94a3b8" },
};

export default function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const meta = LANG_META[language.toLowerCase()] ?? { label: language || "code", color: "#94a3b8" };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: execCommand
      const el = document.createElement("textarea");
      el.value = children;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Split content into lines for optional line numbers
  const lines = children.split("\n");

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-[#1e2433] shadow-2xl shadow-black/40 font-mono text-sm not-prose">

      {/* ── Editor Title Bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1117] border-b border-[#1e2433]">

        {/* Traffic-light dots */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/40" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d4a017]/40" />
          <span className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab2e]/40" />
        </div>

        {/* Language badge */}
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: meta.color }}
          />
          <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: meta.color }}>
            {meta.label}
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          title="Copy code"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* ── Code Content ── */}
      <div className="bg-[#0d1117] overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="group hover:bg-white/[0.02]">
                {/* Line number */}
                <td className="select-none text-right pr-4 pl-4 py-0 text-[12px] text-[#3d4757] group-hover:text-[#5a6478] w-10 border-r border-[#1e2433] align-top leading-6">
                  {i + 1}
                </td>
                {/* Line content */}
                <td className="pl-4 pr-6 py-0 align-top leading-6">
                  <span className="text-[13px] text-[#cdd6f4] whitespace-pre">
                    {line || " "}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Bottom padding */}
        <div className="h-3 bg-[#0d1117]" />
      </div>
    </div>
  );
}
