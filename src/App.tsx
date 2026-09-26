import { useState, createContext, useContext } from "react";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import ComparePage from "./components/ComparePage";
import AboutPage from "./components/AboutPage";
import { samplePaper1, samplePaper2, type PaperAnalysis } from "./data/sampleData";

type Page = "landing" | "dashboard" | "compare" | "about";

interface AppContextType {
  darkMode: boolean;
  toggleDark: () => void;
  currentPage: Page;
  setPage: (p: Page) => void;
  paper: PaperAnalysis;
  setPaper: (p: PaperAnalysis) => void;
  isUploaded: boolean;
  setUploaded: (v: boolean) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);
export const useApp = () => useContext(AppContext);

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [paper, setPaper] = useState<PaperAnalysis>(samplePaper1);
  const [isUploaded, setUploaded] = useState(false);

  const toggleDark = () => setDarkMode((d) => !d);

  return (
    <AppContext.Provider
      value={{ darkMode, toggleDark, currentPage, setPage: setCurrentPage, paper, setPaper, isUploaded, setUploaded }}
    >
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          {currentPage === "landing" && <LandingPage />}
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "compare" && <ComparePage />}
          {currentPage === "about" && <AboutPage />}
        </div>
      </div>
    </AppContext.Provider>
  );
}
