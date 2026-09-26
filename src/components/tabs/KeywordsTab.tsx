import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Hash, Filter, ArrowUpDown } from "lucide-react";
import { useApp } from "../../App";

const COLORS = ["#4f46e5", "#7c3aed", "#6d28d9", "#8b5cf6", "#a855f7", "#9333ea", "#c084fc", "#d946ef", "#6366f1", "#818cf8"];

type Keyword = ReturnType<typeof useApp>["paper"]["keywords"][number];

function KeywordCloud({ keywords }: { keywords: Keyword[] }) {
  const max = Math.max(...keywords.map((k) => k.frequency), 1);
  return (
    <div className="flex flex-wrap gap-2 p-5">
      {keywords.map((k, i) => {
        const scale = 0.75 + (k.frequency / max) * 0.75;
        const col = COLORS[i % COLORS.length];
        return (
          <div
            key={k.word}
            className="keyword-chip select-none"
            style={{ fontSize: `${scale * 0.875}rem`, background: `${col}18`, color: col, border: `1px solid ${col}30` }}
            title={`Frequency: ${k.frequency} · Relevance: ${k.relevance}% · Category: ${k.category}`}
          >
            <span>{k.word}</span>
            <span className="opacity-50 font-mono text-[10px]">{k.frequency}</span>
          </div>
        );
      })}
      {keywords.length === 0 && (
        <p className="text-sm text-muted-foreground py-4 w-full text-center">No keywords match the selected filter.</p>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-sm">
        <p className="font-semibold mb-1">{d.word}</p>
        <p className="text-muted-foreground text-xs">Frequency: <span className="text-foreground font-semibold">{d.frequency}</span></p>
        <p className="text-muted-foreground text-xs">Relevance: <span className="text-foreground font-semibold">{d.relevance}%</span></p>
        <p className="text-muted-foreground text-xs">Category: <span className="text-indigo-400">{d.category}</span></p>
      </div>
    );
  }
  return null;
};

export default function KeywordsTab() {
  const { paper } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"frequency" | "relevance">("frequency");
  const [animated, setAnimated] = useState(false);

  useEffect(() => { const t = setTimeout(() => setAnimated(true), 150); return () => clearTimeout(t); }, []);

  const categories = ["All", ...Array.from(new Set(paper.keywords.map((k) => k.category))).sort()];

  const filtered = paper.keywords
    .filter((k) => activeCategory === "All" || k.category === activeCategory)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const top10 = [...paper.keywords].sort((a, b) => b[sortBy] - a[sortBy]).slice(0, 10);
  const maxFreq = Math.max(...paper.keywords.map((k) => k.frequency), 1);
  const topWord = paper.keywords.reduce((a, b) => a.frequency > b.frequency ? a : b, paper.keywords[0]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Keywords", value: paper.keywords.length.toString() },
          { label: "Categories", value: (categories.length - 1).toString() },
          { label: "Top Keyword", value: topWord?.word ?? "—" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="font-display font-bold text-2xl text-indigo-400">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Keyword cloud */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <Hash size={18} className="text-indigo-400" />
              Keyword Cloud
            </h2>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Filter size={13} className="text-muted-foreground" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-indigo-500 text-white shadow-sm"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Size = frequency · Opacity = relevance · {filtered.length} keyword{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <KeywordCloud keywords={filtered} />
      </div>

      {/* Bar chart */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="font-display font-bold text-lg">
            Top 10 by {sortBy === "frequency" ? "Frequency" : "Relevance"}
          </h2>
          <div className="flex items-center gap-2">
            <ArrowUpDown size={13} className="text-muted-foreground" />
            {(["frequency", "relevance"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                  sortBy === s ? "bg-indigo-500 text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={top10} margin={{ top: 5, right: 10, left: -15, bottom: 50 }}>
            <XAxis dataKey="word" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} angle={-35} textAnchor="end" interval={0} />
            <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--muted)" }} />
            <Bar dataKey={sortBy} radius={[6, 6, 0, 0]} maxBarSize={50}>
              {top10.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Full keyword table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between flex-wrap gap-2">
          <h2 className="font-display font-bold text-lg">All Keywords</h2>
          <span className="text-xs text-muted-foreground">
            {filtered.length} of {paper.keywords.length} · sorted by {sortBy}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide w-8">#</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Keyword</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Frequency</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Relevance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((kw, i) => (
                <tr key={kw.word} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 text-muted-foreground font-mono text-xs">{String(i + 1).padStart(2, "0")}</td>
                  <td className="px-5 py-3 font-semibold">{kw.word}</td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {kw.category}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                          style={{ width: animated ? `${(kw.frequency / maxFreq) * 100}%` : "0%", transition: "width 1s ease" }}
                        />
                      </div>
                      <span className="font-mono text-xs">{kw.frequency}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
                          style={{ width: animated ? `${kw.relevance}%` : "0%", transition: "width 1.2s ease" }}
                        />
                      </div>
                      <span className="font-mono text-xs">{kw.relevance}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
