import { useState, useCallback, useRef } from "react";
import { Upload, FileText, Zap, BarChart2, Search, MessageSquare, Moon, Sun, ArrowRight, Cpu, BookOpen, GitCompare, CheckCircle, Sparkles } from "lucide-react";
import { useApp } from "../App";
import { samplePaper1 } from "../data/sampleData";

export default function LandingPage() {
  const { darkMode, toggleDark, setPage, setPaper, setUploaded } = useApp();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = useCallback(() => {
    setUploading(true);
    setUploadProgress(0);
    const steps = [10, 25, 42, 58, 73, 87, 95, 100];
    steps.forEach((p, i) => {
      setTimeout(() => {
        setUploadProgress(p);
        if (p === 100) {
          setTimeout(() => {
            setPaper(samplePaper1);
            setUploaded(true);
            setPage("dashboard");
          }, 600);
        }
      }, i * 300);
    });
  }, [setPaper, setUploaded, setPage]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type === "application/pdf") handleFileProcess();
    },
    [handleFileProcess]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileProcess();
    },
    [handleFileProcess]
  );

  const loadDemo = () => {
    setPaper(samplePaper1);
    setUploaded(false);
    setPage("dashboard");
  };

  const features = [
    { icon: <FileText size={22} />, title: "Deep Paper Analysis", desc: "Extract title, authors, abstract, key findings, and methodology automatically" },
    { icon: <Search size={22} />, title: "Keyword Intelligence", desc: "Visualize keyword frequency and semantic relevance with interactive word clouds" },
    { icon: <BarChart2 size={22} />, title: "Results Dashboard", desc: "Interactive charts comparing performance against baselines and prior work" },
    { icon: <MessageSquare size={22} />, title: "Ask My Paper", desc: "Chat with your paper using AI — get instant answers about any section" },
    { icon: <GitCompare size={22} />, title: "Paper Comparison", desc: "Side-by-side comparison of two research papers across all metrics" },
    { icon: <Cpu size={22} />, title: "Model Extraction", desc: "Identify all algorithms, architectures, and datasets used in the paper" },
  ];

  const steps = [
    { n: "01", title: "Upload PDF", desc: "Drag & drop your research paper PDF — any field, any format" },
    { n: "02", title: "AI Analyzes", desc: "Our pipeline extracts structure, semantics, and insights in seconds" },
    { n: "03", title: "Explore Insights", desc: "Navigate the interactive dashboard, charts, and AI chat interface" },
    { n: "04", title: "Export Report", desc: "Download a complete analysis report for presentations and portfolios" },
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              <span className="gradient-text">ResearchAI</span>
              <span className="text-muted-foreground font-normal"> Analyzer</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setPage("about")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </button>
            <button onClick={() => setPage("compare")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Compare Papers
            </button>
            <button
              onClick={toggleDark}
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={loadDemo} className="btn-primary text-sm py-2 px-4">
              Try Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl animate-float" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl animate-float delay-300" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-indigo-500/5 animate-spin-slow" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6 animate-fade-in-up">
              <Sparkles size={14} />
              <span>AI-Powered Research Analysis</span>
            </div>
            <h1
              className="font-display text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up delay-100"
              style={{ animationFillMode: "both" }}
            >
              Understand Research Papers{" "}
              <span className="gradient-text">10x Faster</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 animate-fade-in-up delay-200" style={{ animationFillMode: "both" }}>
              Upload any academic PDF and get instant deep analysis — extracted findings, keyword maps, methodology diagrams, performance charts, and an AI chat interface.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-up delay-300" style={{ animationFillMode: "both" }}>
              <button onClick={() => fileInputRef.current?.click()} className="btn-primary">
                <Upload size={18} />
                Upload Research Paper
              </button>
              <button onClick={loadDemo} className="btn-secondary">
                <BookOpen size={18} />
                View Demo Analysis
              </button>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground animate-fade-in-up delay-400" style={{ animationFillMode: "both" }}>
              {["No signup required", "Works offline", "100% private"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-indigo-400" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Upload Zone */}
          <div className="animate-fade-in delay-200" style={{ animationFillMode: "both" }}>
            <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileInput} />
            {uploading ? (
              <div className="rounded-2xl border border-border bg-card p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-indigo-500/10 flex items-center justify-center relative">
                  <Zap size={28} className="text-indigo-400" />
                  <div className="absolute inset-0 rounded-full animate-shimmer" />
                </div>
                <p className="font-display font-semibold text-lg mb-2">Analyzing Paper...</p>
                <p className="text-sm text-muted-foreground mb-6">Extracting structure, findings, and insights</p>
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground font-mono">{uploadProgress}% complete</p>
                <div className="mt-4 text-xs text-muted-foreground space-y-1">
                  {uploadProgress > 20 && <p className="text-indigo-400">✓ Structure parsed</p>}
                  {uploadProgress > 45 && <p className="text-violet-400">✓ Keywords extracted</p>}
                  {uploadProgress > 70 && <p className="text-purple-400">✓ Methodology mapped</p>}
                  {uploadProgress > 90 && <p className="text-indigo-400">✓ Results analyzed</p>}
                </div>
              </div>
            ) : (
              <div
                className={`drop-zone ${dragging ? "dragging" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center">
                  <Upload size={28} className="text-indigo-400" />
                </div>
                <p className="font-display font-semibold text-lg mb-2">Drop your PDF here</p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-sm text-muted-foreground">
                  <FileText size={14} />
                  Supports PDF files up to 50MB
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                  {["15 pages analyzed", "Keywords extracted", "AI summary ready"].map((t) => (
                    <div key={t} className="px-3 py-2 rounded-lg bg-muted/50 text-center">{t}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl font-bold mb-3">Everything you need to understand a paper</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Six powerful analysis modes covering every dimension of a research publication</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className="stat-card card-hover cursor-default" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                {f.icon}
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground text-lg">From PDF to insights in under 30 seconds</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="font-mono text-4xl font-bold text-indigo-500/20 mb-3">{s.n}</div>
                <h3 className="font-display font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-6 right-0 translate-x-1/2 z-10">
                    <ArrowRight size={18} className="text-muted-foreground/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to analyze your first paper?</h2>
          <p className="text-muted-foreground text-lg mb-8">Join researchers using AI to understand academic literature faster than ever.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => fileInputRef.current?.click()} className="btn-primary">
              <Upload size={18} />
              Upload a Paper Now
            </button>
            <button onClick={loadDemo} className="btn-secondary">
              <Sparkles size={18} />
              Explore Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            <span>ResearchAI Analyzer — M.Tech CSE Portfolio Project</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setPage("about")} className="hover:text-foreground transition-colors">About</button>
            <button onClick={() => setPage("compare")} className="hover:text-foreground transition-colors">Compare</button>
            <button onClick={loadDemo} className="hover:text-foreground transition-colors">Demo</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
