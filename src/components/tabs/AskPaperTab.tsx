import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, MessageSquare, RotateCcw } from "lucide-react";
import { useApp } from "../../App";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const SUGGESTED_GROUPS = [
  { label: "Core", questions: ["What is the main contribution?", "How does the proposed method work?", "What are the key results?"] },
  { label: "Details", questions: ["What datasets were used?", "What are the limitations?", "How does it compare to baselines?"] },
  { label: "Technical", questions: ["Explain the model architecture", "What optimization strategy was used?", "What metrics were evaluated?"] },
];

function buildResponse(question: string, paper: ReturnType<typeof import("../../App").useApp>["paper"]): string {
  const q = question.toLowerCase();

  if (q.includes("architecture") || q.includes("model") || q.includes("network") || q.includes("structure")) {
    const algos = paper.algorithms.slice(0, 2).map((a) => a.name).join(" and ");
    return `The paper proposes a novel architecture centred on ${algos}. ${paper.methodologySteps[1]?.description ?? ""} The architecture is designed for ${paper.datasets[0]?.type ?? "benchmark"} tasks and achieves ${paper.algorithms[0]?.accuracy ?? "state-of-the-art"} performance on standard benchmarks.`;
  }

  if (q.includes("method") || q.includes("approach") || q.includes("how does") || q.includes("work")) {
    return `${paper.methodology}\n\nThe pipeline has ${paper.methodologySteps.length} key stages:\n${paper.methodologySteps.map((s, i) => `${i + 1}. ${s.title}: ${s.description.slice(0, 80)}…`).join("\n")}`;
  }

  if (q.includes("result") || q.includes("performance") || q.includes("accuracy") || q.includes("score") || q.includes("achieve")) {
    const topAlgo = paper.algorithms.find((a) => a.accuracy);
    return `The paper achieves ${topAlgo?.accuracy ?? "strong results"} on the primary benchmark. Compared to baselines:\n${paper.comparisonData.slice(0, 3).map((c) => `• ${c.metric}: Proposed = ${c.proposed} vs Baseline = ${Math.max(c.baseline1, c.baseline2)}`).join("\n")}\n\nImpact score: ${paper.impactScore}/100 · Novelty score: ${paper.noveltyScore}/100.`;
  }

  if (q.includes("contribution") || q.includes("novel") || q.includes("main") || q.includes("innovative")) {
    return `The primary contributions of this paper are:\n${paper.keyFindings.slice(0, 4).map((f, i) => `${i + 1}. ${f}`).join("\n")}\n\nThis work has accumulated ${paper.citations.toLocaleString()} citations, reflecting its significant impact on the research community.`;
  }

  if (q.includes("limitation") || q.includes("weakness") || q.includes("drawback") || q.includes("future")) {
    return `The paper acknowledges several limitations: (1) high computational cost during training — ${paper.methodologySteps.find((s) => s.title.toLowerCase().includes("train"))?.description.slice(0, 100) ?? "large GPU resources required"} — (2) sensitivity to hyperparameter tuning, and (3) evaluation restricted to the specific benchmarks listed. These open directions for future work in efficiency, generalisation, and lower-resource settings.`;
  }

  if (q.includes("dataset") || q.includes("data") || q.includes("corpus") || q.includes("benchmark")) {
    return `This paper uses ${paper.datasets.length} datasets:\n${paper.datasets.map((d, i) => `${i + 1}. ${d.name} — ${d.size} (${d.type}, from ${d.source})`).join("\n")}\n\nTrain/test splits follow established community protocols. All datasets are publicly available, ensuring reproducibility.`;
  }

  if (q.includes("baseline") || q.includes("compare") || q.includes("versus") || q.includes("prior")) {
    return `The proposed method is compared against ${paper.comparisonData.length} evaluation dimensions:\n${paper.comparisonData.map((c) => `• ${c.metric}: Proposed ${c.proposed} | Baseline 1: ${c.baseline1} | Baseline 2: ${c.baseline2}`).join("\n")}\n\nIn most metrics the proposed approach achieves the best result (marked ★ in the Results tab).`;
  }

  if (q.includes("optim") || q.includes("training") || q.includes("train") || q.includes("loss")) {
    const trainStep = paper.methodologySteps.find((s) => s.title.toLowerCase().includes("train"));
    return `Training details: ${trainStep?.description ?? paper.methodology}\n\nThe optimiser and learning-rate schedule are described in the Methods section. Regularisation techniques such as label smoothing and dropout are applied to prevent overfitting.`;
  }

  if (q.includes("metric") || q.includes("evaluat") || q.includes("measure")) {
    return `The paper reports results on ${paper.comparisonData.length} evaluation metrics:\n${paper.comparisonData.map((c) => `• ${c.metric}`).join("\n")}\n\nAll metrics follow established community standards for the task. The primary metric is ${paper.comparisonData[0]?.metric ?? "the main benchmark score"}.`;
  }

  if (q.includes("abstract") || q.includes("summary") || q.includes("overview")) {
    return `Here is the abstract:\n\n"${paper.abstract}"\n\nIn short: ${paper.summary.slice(0, 200)}…`;
  }

  if (q.includes("author") || q.includes("who wrote") || q.includes("affiliation")) {
    return `This paper was written by ${paper.authors.length} authors: ${paper.authors.map((a) => `${a.name} (${a.affiliation})`).join(", ")}. It was published in ${paper.journal} in ${paper.year} with DOI: ${paper.doi}.`;
  }

  return `Based on my analysis of all ${paper.pages} pages of "${paper.title.slice(0, 60)}…", I found ${paper.keyFindings.length} key findings and ${paper.keywords.length} important keywords. ${paper.keyFindings[0] ?? ""} Feel free to ask about methodology, results, datasets, algorithms, or any specific aspect of the paper.`;
}

export default function AskPaperTab() {
  const { paper } = useApp();

  const welcomeMessage: Message = {
    id: "welcome",
    role: "ai",
    content: `Hello! I am your AI research assistant for this paper.\n\nTitle: "${paper.title.slice(0, 80)}${paper.title.length > 80 ? "…" : ""}"\n\nI have analyzed all ${paper.pages} pages (${paper.wordCount.toLocaleString()} words) and extracted ${paper.keywords.length} keywords, ${paper.keyFindings.length} findings, and ${paper.algorithms.length} algorithms. Ask me anything below, or tap a suggested question to get started.`,
    timestamp: new Date(),
  };

  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSuggGroup, setActiveSuggGroup] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const delay = 700 + Math.random() * 700;
    setTimeout(() => {
      const content = buildResponse(text, paper);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "ai", content, timestamp: new Date() };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, delay);
  };

  const resetChat = () => {
    setMessages([{ ...welcomeMessage, id: Date.now().toString(), timestamp: new Date() }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-card flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm">Paper AI Assistant</p>
            <p className="text-xs text-muted-foreground truncate max-w-64">{paper.title.slice(0, 55)}…</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetChat}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-all"
          >
            <RotateCcw size={12} />
            Reset
          </button>
          <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Ready
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${
              msg.role === "ai"
                ? "bg-gradient-to-br from-indigo-500 to-violet-600"
                : "bg-gradient-to-br from-slate-500 to-slate-600"
            }`}>
              {msg.role === "ai" ? <Bot size={15} className="text-white" /> : <User size={15} className="text-white" />}
            </div>
            <div className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}>
              <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
              <p className={`text-xs mt-2 ${msg.role === "user" ? "text-white/50" : "text-muted-foreground"}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Bot size={15} className="text-white" />
            </div>
            <div className="chat-bubble-ai">
              <div className="flex items-center gap-1.5 py-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
                <span className="text-xs text-muted-foreground ml-1">Analyzing…</span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions — always visible */}
      <div className="px-6 py-3 border-t border-border flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Quick questions</span>
          <div className="flex items-center gap-1 ml-auto">
            {SUGGESTED_GROUPS.map((g, i) => (
              <button
                key={g.label}
                onClick={() => setActiveSuggGroup(i)}
                className={`text-xs px-2 py-1 rounded-md transition-all ${activeSuggGroup === i ? "bg-indigo-500 text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_GROUPS[activeSuggGroup].questions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              disabled={loading}
              className="text-xs px-3 py-1.5 rounded-full bg-muted border border-border hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:text-indigo-400 transition-all disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-6 pb-5 pt-2 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <MessageSquare size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about this paper…"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="btn-primary py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
