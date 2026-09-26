import { useState, useEffect } from "react";
import { Users, FileText, Hash, Star, BookOpen, Cpu, Database, TrendingUp, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useApp } from "../../App";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  delay?: number;
}

function StatCard({ icon, label, value, sub, color, delay = 0 }: StatCardProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className={`stat-card transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>{icon}</div>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className="font-display text-2xl font-bold">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(value), 200); return () => clearTimeout(t); }, [value]);
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground w-32 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`} style={{ width: `${width}%` }} />
      </div>
      <span className="text-sm font-semibold w-10 text-right">{value}</span>
    </div>
  );
}

export default function OverviewTab() {
  const { paper } = useApp();
  const [expandedAbstract, setExpandedAbstract] = useState(false);
  const [barsAnimated, setBarsAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setBarsAnimated(true), 400); return () => clearTimeout(t); }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Paper header */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {paper.year}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                {paper.journal}
              </span>
            </div>
            <h1 className="font-display text-xl font-bold leading-snug mb-3">{paper.title}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {paper.authors.slice(0, 4).map((a) => (
                <span key={a.name} className="flex items-center gap-1">
                  <Users size={12} />
                  {a.name}
                </span>
              ))}
              {paper.authors.length > 4 && (
                <span className="text-indigo-400">+{paper.authors.length - 4} more</span>
              )}
            </div>
          </div>
          <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer"
            className="flex-shrink-0 flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
            <ExternalLink size={13} />
            {paper.doi}
          </a>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<FileText size={18} />} label="Pages" value={paper.pages} sub="Research paper" color="bg-indigo-500/10 text-indigo-400" delay={0} />
        <StatCard icon={<Hash size={18} />} label="Word Count" value={paper.wordCount.toLocaleString()} sub="Total words" color="bg-violet-500/10 text-violet-400" delay={80} />
        <StatCard icon={<TrendingUp size={18} />} label="Citations" value={paper.citations.toLocaleString()} sub="Academic citations" color="bg-purple-500/10 text-purple-400" delay={160} />
        <StatCard icon={<Star size={18} />} label="Impact Score" value={`${paper.impactScore}/100`} sub="Research impact" color="bg-fuchsia-500/10 text-fuchsia-400" delay={240} />
      </div>

      {/* Two column layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Abstract */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold flex items-center gap-2">
              <BookOpen size={16} className="text-indigo-400" />
              Abstract
            </h2>
          </div>
          <p className={`text-sm text-muted-foreground leading-relaxed ${!expandedAbstract ? "line-clamp-6" : ""}`}>
            {paper.abstract}
          </p>
          <button onClick={() => setExpandedAbstract(!expandedAbstract)}
            className="mt-3 flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
            {expandedAbstract ? <><ChevronUp size={14} /> Show less</> : <><ChevronDown size={14} /> Read full abstract</>}
          </button>
        </div>

        {/* Quality scores */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Star size={16} className="text-violet-400" />
            Quality Assessment
          </h2>
          <div className="space-y-4">
            <ScoreBar label="Impact Score" value={paper.impactScore} color="bg-gradient-to-r from-indigo-500 to-violet-500" />
            <ScoreBar label="Novelty Score" value={paper.noveltyScore} color="bg-gradient-to-r from-violet-500 to-purple-500" />
            <ScoreBar label="Readability" value={paper.readabilityScore} color="bg-gradient-to-r from-purple-500 to-fuchsia-500" />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Authors", value: paper.authors.length },
              { label: "Datasets", value: paper.datasets.length },
              { label: "Algorithms", value: paper.algorithms.length },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 rounded-xl bg-muted/50">
                <p className="font-display text-xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Authors */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-display font-semibold mb-4 flex items-center gap-2">
          <Users size={16} className="text-indigo-400" />
          Authors & Affiliations
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {paper.authors.map((author, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border hover:border-indigo-500/30 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {author.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{author.name}</p>
                <p className="text-xs text-muted-foreground truncate">{author.affiliation}</p>
                {author.email && <p className="text-xs text-indigo-400 truncate">{author.email}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two column: Datasets + Algorithms */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Datasets */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Database size={16} className="text-violet-400" />
            Datasets Used
          </h2>
          <div className="space-y-3">
            {paper.datasets.map((ds, i) => (
              <div key={i} className="p-3 rounded-xl bg-muted/40 border border-border">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{ds.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 flex-shrink-0">{ds.type}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{ds.size} · {ds.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Findings */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Cpu size={16} className="text-purple-400" />
            Key Findings
          </h2>
          <div className="space-y-2">
            {paper.keyFindings.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors group">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section breakdown */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-display font-semibold mb-4 flex items-center gap-2">
          <FileText size={16} className="text-indigo-400" />
          Section Breakdown
        </h2>
        <div className="space-y-3">
          {paper.sections.map((s) => {
            const pct = Math.round((s.wordCount / paper.wordCount) * 100);
            return (
              <div key={s.title} className="flex items-center gap-4">
                <span className="text-sm w-36 flex-shrink-0 text-muted-foreground">{s.title}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    style={{ width: barsAnimated ? `${pct}%` : "0%", transition: "width 1s ease" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right font-mono">{pct}%</span>
                <span className="text-xs text-muted-foreground w-20 text-right hidden sm:block">{s.wordCount} words</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
