import { useState } from "react";
import { FileText, Copy, CheckCircle, Cpu, ChevronRight } from "lucide-react";
import { useApp } from "../../App";

export default function SummaryTab() {
  const { paper } = useApp();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paper.summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Summary header */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <FileText size={18} className="text-indigo-400" />
            AI-Generated Summary
          </h2>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            {copied ? (
              <><CheckCircle size={14} className="text-green-400" />Copied!</>
            ) : (
              <><Copy size={14} />Copy</>
            )}
          </button>
        </div>
        <div className="prose prose-sm max-w-none">
          <p className="text-base leading-8 text-foreground">{paper.summary}</p>
        </div>
      </div>

      {/* Key Findings detailed */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-display font-bold text-lg mb-5 flex items-center gap-2">
          <Cpu size={18} className="text-violet-400" />
          Key Findings — Expanded
        </h2>
        <div className="space-y-4">
          {paper.keyFindings.map((finding, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border hover:border-indigo-500/30 transition-all group">
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-foreground">{finding}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Research methodology summary */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
          <ChevronRight size={18} className="text-purple-400" />
          Methodology Overview
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{paper.methodology}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {paper.methodologySteps.map((step) => (
            <div key={step.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border">
              <span className="text-xl flex-shrink-0">{step.icon}</span>
              <div>
                <p className="text-sm font-semibold">{step.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Algorithms */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-display font-bold text-lg mb-5 flex items-center gap-2">
          <Cpu size={18} className="text-indigo-400" />
          Algorithms & Models
        </h2>
        <div className="space-y-3">
          {paper.algorithms.map((algo, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border hover:border-indigo-500/20 transition-all">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <p className="font-semibold text-sm">{algo.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{algo.type}</span>
                </div>
                {algo.accuracy && (
                  <span className="text-xs font-mono px-2 py-1 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
                    {algo.accuracy}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{algo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
