import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  PieChart, Pie,
  LineChart, Line, CartesianGrid, Legend,
} from "recharts";
import { BarChart2, TrendingUp, PieChart as PieIcon, Activity } from "lucide-react";
import { useApp } from "../../App";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-sm">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="text-xs">
            {p.name}: <span className="font-semibold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function AnimatedStatBadge({ label, value, color, delay = 0 }: { label: string; value: string; color: string; delay?: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className={`text-center p-4 rounded-xl bg-muted/40 border border-border transition-all duration-500 ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-display font-bold text-lg" style={{ color }}>{value}</p>
    </div>
  );
}

export default function ResultsTab() {
  const { paper } = useApp();

  const radarData = [
    { metric: "Impact", value: paper.impactScore },
    { metric: "Novelty", value: paper.noveltyScore },
    { metric: "Readability", value: paper.readabilityScore },
    { metric: "Citations", value: Math.min(Math.round(paper.citations / 1000), 100) },
    { metric: "Coverage", value: 85 },
  ];

  // Normalise each row so all metrics share a 0–100 axis
  const normalised = paper.comparisonData.map((row) => {
    const maxVal = Math.max(row.proposed, row.baseline1, row.baseline2);
    const scale = maxVal > 0 ? 100 / maxVal : 1;
    return {
      metric: row.metric.length > 14 ? row.metric.slice(0, 14) + "…" : row.metric,
      Proposed: Math.round(row.proposed * scale),
      "Baseline 1": Math.round(row.baseline1 * scale),
      "Baseline 2": Math.round(row.baseline2 * scale),
    };
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <AnimatedStatBadge label="Citations" value={paper.citations.toLocaleString()} color="#6366f1" delay={0} />
        <AnimatedStatBadge label="Impact Score" value={`${paper.impactScore}/100`} color="#7c3aed" delay={80} />
        <AnimatedStatBadge label="Novelty" value={`${paper.noveltyScore}/100`} color="#8b5cf6" delay={160} />
        <AnimatedStatBadge label="Readability" value={`${paper.readabilityScore}/100`} color="#a855f7" delay={240} />
      </div>

      {/* Performance bar chart */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <BarChart2 size={18} className="text-indigo-400" />
            Performance vs. Baselines
          </h2>
          <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-muted border border-border">
            BLEU Score · WMT 2014 EN-DE
          </span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={paper.performanceData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
            <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} domain={[20, 30]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" name="BLEU Score" radius={[6, 6, 0, 0]}>
              {paper.performanceData.map((_, i) => (
                <Cell key={i} fill={i === 1 ? "#4f46e5" : "#4f46e520"} stroke={i === 1 ? "#6366f1" : "transparent"} strokeWidth={1} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-center text-muted-foreground mt-2">Highlighted bar = proposed model · Higher is better</p>
      </div>

      {/* Radar + Pie */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Activity size={18} className="text-violet-400" />
            Paper Quality Radar
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
              <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <PieIcon size={18} className="text-purple-400" />
            Contribution Areas
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={paper.contributionAreas}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {paper.contributionAreas.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: any) => [`${v}%`, "Share"]}
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v) => <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed comparison table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <TrendingUp size={18} className="text-indigo-400" />
            Detailed Metrics Comparison
          </h2>
          <p className="text-xs text-muted-foreground mt-1">★ = best result on that benchmark</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Metric</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-indigo-400 uppercase tracking-wide">Proposed</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Baseline 1</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Baseline 2</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Δ vs Best</th>
              </tr>
            </thead>
            <tbody>
              {paper.comparisonData.map((row, i) => {
                const isHigherBetter = !row.metric.toLowerCase().includes("time") && !row.metric.toLowerCase().includes("param");
                const best = isHigherBetter
                  ? row.proposed >= row.baseline1 && row.proposed >= row.baseline2
                  : row.proposed <= row.baseline1 && row.proposed <= row.baseline2;
                const bestBaseline = isHigherBetter
                  ? Math.max(row.baseline1, row.baseline2)
                  : Math.min(row.baseline1, row.baseline2);
                const delta = isHigherBetter
                  ? ((row.proposed - bestBaseline) / bestBaseline * 100).toFixed(1)
                  : ((bestBaseline - row.proposed) / bestBaseline * 100).toFixed(1);
                return (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3 font-medium">{row.metric}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`font-bold font-mono ${best ? "text-indigo-400" : "text-foreground"}`}>{row.proposed}</span>
                      {best && <span className="ml-1 text-yellow-400 text-xs">★</span>}
                    </td>
                    <td className="px-5 py-3 text-center font-mono text-muted-foreground">{row.baseline1}</td>
                    <td className="px-5 py-3 text-center font-mono text-muted-foreground">{row.baseline2}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                        parseFloat(delta) > 0
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}>
                        {parseFloat(delta) > 0 ? "+" : ""}{delta}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Normalised line chart */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
          <h2 className="font-display font-bold text-lg">Normalised Benchmark Trends</h2>
          <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-muted border border-border">
            All metrics scaled to 0–100 for visual comparison
          </span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={normalised} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="metric" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
            <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} domain={[0, 110]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={(v) => <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{v}</span>} />
            <Line type="monotone" dataKey="Proposed" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 5, fill: "#4f46e5" }} />
            <Line type="monotone" dataKey="Baseline 1" stroke="#8b5cf6" strokeWidth={1.5} strokeDasharray="5 5" dot={{ r: 3 }} />
            <Line type="monotone" dataKey="Baseline 2" stroke="#a855f7" strokeWidth={1.5} strokeDasharray="3 3" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
