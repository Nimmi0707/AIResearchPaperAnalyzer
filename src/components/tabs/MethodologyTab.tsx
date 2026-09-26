import { ArrowDown, ChevronRight, Database, Cpu } from "lucide-react";
import { useApp } from "../../App";

export default function MethodologyTab() {
  const { paper } = useApp();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Overview */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <ChevronRight size={18} className="text-indigo-400" />
          Methodology Overview
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{paper.methodology}</p>
      </div>

      {/* Flow diagram */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-display font-bold text-lg mb-6">Research Pipeline Flow</h2>
        <div className="max-w-lg mx-auto">
          {paper.methodologySteps.map((step, i) => (
            <div key={step.id}>
              <div
                className="methodology-node"
                style={{ borderLeftColor: step.color, borderLeftWidth: 3 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${step.color}15` }}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-semibold" style={{ color: step.color }}>
                        STEP {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
              {i < paper.methodologySteps.length - 1 && (
                <div className="flow-arrow my-2">
                  <ArrowDown size={20} className="text-indigo-400/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Datasets & Algorithms side by side */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Database size={18} className="text-violet-400" />
            Datasets
          </h2>
          <div className="space-y-3">
            {paper.datasets.map((ds, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border hover:border-violet-500/30 transition-all">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-semibold text-sm">{ds.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 flex-shrink-0">
                    {ds.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{ds.size}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Source: {ds.source}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Cpu size={18} className="text-indigo-400" />
            Algorithms & Models
          </h2>
          <div className="space-y-3">
            {paper.algorithms.map((algo, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border hover:border-indigo-500/30 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-sm">{algo.name}</p>
                  {algo.accuracy && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
                      {algo.accuracy}
                    </span>
                  )}
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {algo.type}
                </span>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{algo.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
