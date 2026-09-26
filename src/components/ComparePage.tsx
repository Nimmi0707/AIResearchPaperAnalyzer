import { useState } from "react";
import { ArrowLeft, GitCompare, BarChart2, Moon, Sun, RefreshCw, ChevronDown } from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, Tooltip,
} from "recharts";
import { useApp } from "../App";
import { samplePaper1, samplePaper2, type PaperAnalysis } from "../data/sampleData";

const DEMO_PAPERS = [
  { label: "Transformer (Attention Is All You Need)", data: samplePaper1 },
  { label: "BERT (Bidirectional Encoder Representations)", data: samplePaper2 },
];

function PaperSelector({ selected, onChange, exclude, label, color }: {
  selected: PaperAnalysis; onChange: (p: PaperAnalysis) => void; exclude: string; label: string; color: string;
}) {
  const [open, setOpen] = useState(false);
  const options = DEMO_PAPERS.filter((d) => d.data.id !== exclude);
  return (
    <div className="relative">
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
          <button
            onClick={() => setOpen(!open)}
            className="ml-auto flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <RefreshCw size={12} />
            Switch
            <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
        {open && (
          <div className="mb-3 border border-border rounded-xl overflow-hidden bg-muted/30">
            {options.map((opt) => (
              <button
                key={opt.data.id}
                onClick={() => { onChange(opt.data); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-xs hover:bg-muted transition-colors border-b border-border/50 last:border-0"
              >
                <span className="font-semibold block">{opt.data.title.slice(0, 55)}...</span>
                <span className="text-muted-foreground">{opt.data.year} · {opt.data.journal}</span>
              </button>
            ))}
          </div>
        )}
        <h3 className="font-display font-bold text-sm leading-snug mb-2 line-clamp-3">{selected.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{selected.year} · {selected.journal}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded-lg bg-muted">{selected.pages} pages</span>
          <span className="px-2 py-1 rounded-lg bg-muted">{selected.authors.length} authors</span>
          <span className="px-2 py-1 rounded-lg bg-muted">{selected.citations.toLocaleString()} citations</span>
          <span className="px-2 py-1 rounded-lg bg-muted">Impact: {selected.impactScore}/100</span>
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-xs">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: <span className="font-semibold">{p.value}</span></p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ComparePage() {
  const { darkMode, toggleDark, setPage } = useApp();
  const [paper1, setPaper1] = useState<PaperAnalysis>(samplePaper1);
  const [paper2, setPaper2] = useState<PaperAnalysis>(samplePaper2);

  const radarData = [
    { metric: "Impact", p1: paper1.impactScore, p2: paper2.impactScore },
    { metric: "Novelty", p1: paper1.noveltyScore, p2: paper2.noveltyScore },
    { metric: "Readability", p1: paper1.readabilityScore, p2: paper2.readabilityScore },
    { metric: "Citations", p1: Math.min(Math.round(paper1.citations / 1000), 100), p2: Math.min(Math.round(paper2.citations / 1000), 100) },
    { metric: "Pages×6", p1: paper1.pages * 6, p2: paper2.pages * 6 },
  ];

  const barData = [
    { label: "Pages", p1: paper1.pages, p2: paper2.pages },
    { label: "Authors", p1: paper1.authors.length, p2: paper2.authors.length },
    { label: "Keywords", p1: paper1.keywords.length, p2: paper2.keywords.length },
    { label: "Algorithms", p1: paper1.algorithms.length, p2: paper2.algorithms.length },
    { label: "Datasets", p1: paper1.datasets.length, p2: paper2.datasets.length },
  ];

  const compRows: { label: string; v1: string | number; v2: string | number; higherBetter?: boolean }[] = [
    { label: "Year", v1: paper1.year, v2: paper2.year },
    { label: "Pages", v1: paper1.pages, v2: paper2.pages },
    { label: "Word Count", v1: paper1.wordCount.toLocaleString(), v2: paper2.wordCount.toLocaleString() },
    { label: "Citations", v1: paper1.citations.toLocaleString(), v2: paper2.citations.toLocaleString(), higherBetter: true },
    { label: "Impact Score", v1: `${paper1.impactScore}/100`, v2: `${paper2.impactScore}/100`, higherBetter: true },
    { label: "Novelty Score", v1: `${paper1.noveltyScore}/100`, v2: `${paper2.noveltyScore}/100`, higherBetter: true },
    { label: "Readability", v1: `${paper1.readabilityScore}/100`, v2: `${paper2.readabilityScore}/100`, higherBetter: true },
    { label: "Authors", v1: paper1.authors.length, v2: paper2.authors.length },
    { label: "Datasets", v1: paper1.datasets.length, v2: paper2.datasets.length },
    { label: "Algorithms", v1: paper1.algorithms.length, v2: paper2.algorithms.length },
    { label: "Keywords", v1: paper1.keywords.length, v2: paper2.keywords.length },
  ];

  const getWinner = (row: (typeof compRows)[0]) => {
    if (!row.higherBetter) return null;
    const n1 = parseFloat(String(row.v1).replace(/[^0-9.]/g, ""));
    const n2 = parseFloat(String(row.v2).replace(/[^0-9.]/g, ""));
    if (isNaN(n1) || isNaN(n2)) return null;
    if (n1 > n2) return "p1";
    if (n2 > n1) return "p2";
    return null;
  };

  const p1ShortTitle = paper1.title.split(":")[0];
  const p2ShortTitle = paper2.title.split(":")[0];

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-border h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setPage("landing")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            Home
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <GitCompare size={18} className="text-indigo-400" />
            <span className="font-display font-bold">Paper Comparison</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setPage("dashboard")} className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Dashboard
          </button>
          <button
            onClick={toggleDark}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* Info banner */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-sm text-indigo-400">
          <GitCompare size={16} className="flex-shrink-0" />
          <span>Use the <strong>Switch</strong> button on each card to select different demo papers for comparison.</span>
        </div>

        {/* Paper cards with selectors */}
        <div className="grid md:grid-cols-2 gap-4">
          <PaperSelector selected={paper1} onChange={setPaper1} exclude={paper2.id} label="Paper A" color="#4f46e5" />
          <PaperSelector selected={paper2} onChange={setPaper2} exclude={paper1.id} label="Paper B" color="#8b5cf6" />
        </div>

        {/* Head to head table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <BarChart2 size={18} className="text-indigo-400" />
              Head-to-Head Comparison
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide w-36">Metric</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-indigo-400 uppercase tracking-wide">{p1ShortTitle}</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-violet-400 uppercase tracking-wide">{p2ShortTitle}</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Winner</th>
                </tr>
              </thead>
              <tbody>
                {compRows.map((row, i) => {
                  const winner = getWinner(row);
                  return (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 font-medium text-muted-foreground text-xs">{row.label}</td>
                      <td className="px-5 py-3 text-center font-mono font-semibold text-indigo-400">
                        {row.v1}{winner === "p1" && <span className="ml-1 text-green-400">★</span>}
                      </td>
                      <td className="px-5 py-3 text-center font-mono font-semibold text-violet-400">
                        {row.v2}{winner === "p2" && <span className="ml-1 text-green-400">★</span>}
                      </td>
                      <td className="px-5 py-3 text-center text-xs">
                        {winner === "p1" && <span className="px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Paper A</span>}
                        {winner === "p2" && <span className="px-2 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">Paper B</span>}
                        {!winner && <span className="text-muted-foreground">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-display font-bold mb-4 text-base">Quality Radar</h2>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                <Radar name={p1ShortTitle} dataKey="p1" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} strokeWidth={2} />
                <Radar name={p2ShortTitle} dataKey="p2" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{v}</span>} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-display font-bold mb-4 text-base">Structural Comparison</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <XAxis dataKey="label" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(v) => (
                  <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
                    {v === "p1" ? p1ShortTitle : p2ShortTitle}
                  </span>
                )} />
                <Bar dataKey="p1" name="p1" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="p2" name="p2" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key findings */}
        <div className="grid md:grid-cols-2 gap-6">
          {[paper1, paper2].map((p, i) => (
            <div key={p.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: i === 0 ? "#4f46e5" : "#8b5cf6" }} />
                <h3 className="font-display font-semibold text-sm">{i === 0 ? "Paper A" : "Paper B"} — Key Findings</h3>
              </div>
              <div className="space-y-2">
                {p.keyFindings.slice(0, 3).map((f, j) => (
                  <div key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <div className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: i === 0 ? "#4f46e5" : "#8b5cf6" }}>
                      {j + 1}
                    </div>
                    <span className="leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Abstracts */}
        <div className="grid md:grid-cols-2 gap-6">
          {[paper1, paper2].map((p, i) => (
            <div key={p.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ background: i === 0 ? "#4f46e5" : "#8b5cf6" }} />
                <h3 className="font-display font-semibold text-sm">{i === 0 ? "Paper A" : "Paper B"} — Abstract</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-6">{p.abstract}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
