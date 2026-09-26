import { ArrowLeft, Code, BookOpen, Cpu, BarChart2, MessageSquare, GitCompare, Download, Sparkles, Moon, Sun, Zap, Terminal } from "lucide-react";
import { useApp } from "../App";

const features = [
  { icon: <BookOpen size={18} />, title: "Deep Paper Analysis", desc: "Extracts title, authors, abstract, key findings, datasets, and algorithms from any research PDF." },
  { icon: <Cpu size={18} />, title: "Algorithm Extraction", desc: "Identifies and summarizes all machine learning models, optimization algorithms, and computational methods." },
  { icon: <BarChart2 size={18} />, title: "Interactive Results Dashboard", desc: "Bar charts, radar charts, pie charts, and line graphs comparing proposed model vs. baselines." },
  { icon: <MessageSquare size={18} />, title: "Ask My Paper AI Chat", desc: "Chat interface where users can query the paper content using natural language Q&A." },
  { icon: <GitCompare size={18} />, title: "Paper Comparison", desc: "Side-by-side comparison of two research papers across all extracted metrics and quality dimensions." },
  { icon: <Download size={18} />, title: "Downloadable Reports", desc: "Export a complete Markdown analysis report for sharing, presentations, or GitHub documentation." },
];

const techStack = [
  { name: "React 19", role: "UI Framework", color: "#61dafb" },
  { name: "TypeScript 5.7", role: "Type Safety", color: "#3178c6" },
  { name: "Tailwind CSS v4", role: "Styling", color: "#06b6d4" },
  { name: "Recharts 3", role: "Data Visualization", color: "#8884d8" },
  { name: "Vite 8", role: "Build Tool", color: "#f59e0b" },
  { name: "Lucide React", role: "Icon System", color: "#f97316" },
];

export default function AboutPage() {
  const { setPage, darkMode, toggleDark } = useApp();

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-border h-16 flex items-center justify-between px-6">
        <button onClick={() => setPage("landing")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => setPage("dashboard")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Hero */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Sparkles size={30} className="text-white" />
          </div>
          <h1 className="font-display text-4xl font-extrabold mb-3">
            <span className="gradient-text">ResearchAI Analyzer</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            An AI-powered academic research paper analyzer built as an M.Tech CSE portfolio and demonstration project — showcasing modern React, TypeScript, and data visualization skills.
          </p>
        </div>

        {/* Project description */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-indigo-400" />
            Project Description
          </h2>
          <div className="prose prose-sm max-w-none space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">ResearchAI Analyzer</strong> is a full-stack-ready, browser-based web application that simulates AI-powered analysis of academic research papers. The system accepts PDF uploads and produces a rich, interactive analysis dashboard covering all major dimensions of a research publication.
            </p>
            <p>
              Designed with the aesthetics and functionality expected of an M.Tech or Ph.D. research toolkit, the app demonstrates proficiency in modern frontend development, data visualization, responsive design, and AI interface patterns.
            </p>
            <p>
              The application is structured around six specialized analysis views — Overview, Summary, Keywords, Methodology, Results, and an AI Chat interface — each powered by extracted metadata from the uploaded paper. A paper comparison feature allows researchers to evaluate two publications side-by-side across structural and quality dimensions.
            </p>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="font-display font-bold text-xl mb-5 flex items-center gap-2">
            <Zap size={20} className="text-violet-400" />
            Core Features
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 card-hover">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{f.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div>
          <h2 className="font-display font-bold text-xl mb-5 flex items-center gap-2">
            <Code size={20} className="text-indigo-400" />
            Technology Stack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {techStack.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-xl p-4 text-center card-hover">
                <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ background: t.color }} />
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* README block */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-muted/30">
            <Terminal size={16} className="text-muted-foreground" />
            <span className="font-mono text-sm text-muted-foreground">README.md</span>
            <div className="flex gap-1.5 ml-auto">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
          </div>
          <pre className="px-6 py-5 text-xs text-muted-foreground leading-6 overflow-x-auto font-mono">
{`# ResearchAI Analyzer

> AI-powered research paper analysis dashboard — M.Tech CSE Portfolio Project

## 🚀 Features

- 📄 Drag-and-drop PDF upload with simulated AI analysis
- 📊 Interactive results dashboard with Recharts visualizations
- 🔍 Keyword extraction with frequency cloud and bar charts
- 🧠 AI chat interface for natural language Q&A on paper content
- 🔄 Paper comparison with side-by-side metrics and radar charts
- 📥 Downloadable Markdown analysis report
- 🌙 Dark/light mode with smooth transitions
- 📱 Fully responsive for desktop and mobile

## 🛠 Tech Stack

| Technology     | Purpose                  |
|----------------|--------------------------|
| React 19       | UI Framework             |
| TypeScript 5.7 | Type Safety              |
| Tailwind CSS 4 | Styling System           |
| Recharts 3     | Data Visualization       |
| Vite 8         | Build Tool               |
| Lucide React   | Icon System              |

## 📦 Project Structure

src/
├── components/
│   ├── tabs/           # Analysis tab components
│   ├── Dashboard.tsx   # Main dashboard with sidebar
│   ├── LandingPage.tsx # Hero & upload UI
│   ├── ComparePage.tsx # Paper comparison
│   └── AboutPage.tsx   # Project info
├── data/
│   └── sampleData.ts   # Demo paper data
├── utils/
│   └── reportGenerator.ts
└── App.tsx             # Root with dark mode context

## 📖 Usage

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

Upload a PDF or click "View Demo Analysis" to explore the full interface.`}
          </pre>
        </div>

        {/* CTA */}
        <div className="text-center pb-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => setPage("landing")} className="btn-primary">
            <Sparkles size={16} />
            Try the Analyzer
          </button>
          <button onClick={() => setPage("dashboard")} className="btn-secondary">
            <BarChart2 size={16} />
            Open Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
