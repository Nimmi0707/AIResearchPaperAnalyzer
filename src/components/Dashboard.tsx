import { useState } from "react";
import {
  LayoutDashboard, FileText, Hash, GitBranch, BarChart2, MessageSquare,
  Moon, Sun, Home, GitCompare, Info, Upload, Menu, X, Download, Sparkles
} from "lucide-react";
import { useApp } from "../App";
import OverviewTab from "./tabs/OverviewTab";
import SummaryTab from "./tabs/SummaryTab";
import KeywordsTab from "./tabs/KeywordsTab";
import MethodologyTab from "./tabs/MethodologyTab";
import ResultsTab from "./tabs/ResultsTab";
import AskPaperTab from "./tabs/AskPaperTab";
import { generateReport } from "../utils/reportGenerator";

type Tab = "overview" | "summary" | "keywords" | "methodology" | "results" | "ask";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
  { id: "summary", label: "Summary", icon: <FileText size={16} /> },
  { id: "keywords", label: "Keywords", icon: <Hash size={16} /> },
  { id: "methodology", label: "Methodology", icon: <GitBranch size={16} /> },
  { id: "results", label: "Results", icon: <BarChart2 size={16} /> },
  { id: "ask", label: "Ask Paper", icon: <MessageSquare size={16} /> },
];

export default function Dashboard() {
  const { darkMode, toggleDark, setPage, paper, isUploaded } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarNavItems = [
    { label: "Home", icon: <Home size={16} />, action: () => setPage("landing") },
    { label: "Compare Papers", icon: <GitCompare size={16} />, action: () => setPage("compare") },
    { label: "About Project", icon: <Info size={16} />, action: () => setPage("about") },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-base gradient-text">ResearchAI</span>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Paper info */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
            <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center">
              <FileText size={14} className="text-indigo-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground leading-tight line-clamp-2">{paper.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{paper.year} · {paper.pages} pages</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-3 py-3 flex-1 overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Analysis Views</p>
          <nav className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => { setActiveTab(t.id); setSidebarOpen(false); }}
                className={`sidebar-item w-full text-left ${activeTab === t.id ? "active" : ""}`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </nav>

          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2 mt-6">Navigation</p>
          <nav className="space-y-1">
            {sidebarNavItems.map((item) => (
              <button key={item.label} onClick={item.action} className="sidebar-item w-full text-left">
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="px-3 pb-4 space-y-2">
          <button
            onClick={() => generateReport(paper)}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 text-indigo-400 hover:from-indigo-500/20 hover:to-violet-500/20 transition-all text-sm font-medium"
          >
            <Download size={15} />
            Download Report
          </button>
          <button
            onClick={() => setPage("landing")}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all text-sm"
          >
            <Upload size={15} />
            Upload New Paper
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} className="text-muted-foreground" />
            </button>
            {/* Tab pills for desktop */}
            <div className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-xl">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === t.id
                      ? "tab-active"
                      : "text-muted-foreground hover:text-foreground hover:bg-card"
                  }`}
                >
                  {t.icon}
                  <span className="hidden lg:inline">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isUploaded && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                <Sparkles size={12} />
                Demo Mode
              </span>
            )}
            <button
              onClick={() => generateReport(paper)}
              className="btn-secondary text-sm py-1.5 px-3 hidden sm:flex"
            >
              <Download size={15} />
              Export
            </button>
            <button
              onClick={toggleDark}
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* Tab content */}
        <main className="flex-1 overflow-y-auto">
          <div className="animate-fade-in">
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "summary" && <SummaryTab />}
            {activeTab === "keywords" && <KeywordsTab />}
            {activeTab === "methodology" && <MethodologyTab />}
            {activeTab === "results" && <ResultsTab />}
            {activeTab === "ask" && <AskPaperTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
