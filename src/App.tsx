import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import ReportViewer from "./components/ReportViewer";
import HistorySidebar from "./components/HistorySidebar";
import { GitHubMetadata, AnalysisResult, SavedAnalysis } from "./types";
import { Github, Sparkles, HelpCircle, AlertCircle, BookOpen, Clock, Activity } from "lucide-react";

export default function App() {
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisResult | null>(null);
  const [historyList, setHistoryList] = useState<SavedAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Load analysis indices from local history cache
  useEffect(() => {
    try {
      const storedIndices = localStorage.getItem("cgm_history_indices");
      if (storedIndices) {
        setHistoryList(JSON.parse(storedIndices));
      }
    } catch (err) {
      console.error("Failed loading history logs from cache:", err);
    }
  }, []);

  const handleStartAnalysis = async (repoUrl: string, customInstructions: string, metadata: GitHubMetadata | null) => {
    setIsLoading(true);
    setGeneralError(null);
    setActiveAnalysis(null);

    // Dynamic progress bar loading messages simulated gracefully to align with actual API runtime
    const steps = [
      "Targeting repository footprint and parsing workspace configuration files...",
      "Dispatching search agents to acquire real-time direct competitive benchmarks...",
      "Aligning feature availability and executing SWOT matrix analysis...",
      "Generating strategic priorities, effort weightings, and v3.1 roadmap grids...",
      "Compiling autonomous developer instructions and packaging technical code prompts..."
    ];

    let currentStepIndex = 0;
    setLoadingStep(steps[0]);

    const stepsInterval = setInterval(() => {
      if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        setLoadingStep(steps[currentStepIndex]);
      }
    }, 4500);

    try {
      // 1. Fetch metadata if it wasn't fetched yet
      let activeMetadata = metadata;
      if (!activeMetadata) {
        try {
          const metaRes = await fetch(`/api/repo-info?url=${encodeURIComponent(repoUrl)}`);
          if (metaRes.ok) {
            activeMetadata = await metaRes.json();
          }
        } catch (metaErr) {
          console.warn("API direct fetch failed, analyzer will use fallback URL context:", metaErr);
        }
      }

      // 2. Perform deep analysis
      const analyzeRes = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          repoUrl,
          customInstructions,
          githubMetadata: activeMetadata
        })
      });

      const result = await analyzeRes.json();

      if (!analyzeRes.ok) {
        throw new Error(result.error || "Generation error. The model could not complete the intelligence analysis.");
      }

      // 3. Save successful details to History
      const indexId = `cgm_idx_${Date.now()}`;
      const newSavedIndex: SavedAnalysis = {
        id: indexId,
        repoUrl: result.repoUrl,
        owner: result.githubMetadata.owner || "Unknown",
        repo: result.githubMetadata.repo || "TargetRepository",
        analyzedAt: result.analyzedAt,
        stars: result.githubMetadata.stars || 0
      };

      // Set state and storage bounds (limit history to last 25 entries - item 25)
      setActiveAnalysis(result);
      localStorage.setItem(`cgm_analysis_body_${indexId}`, JSON.stringify(result));

      const updatedHistory = [newSavedIndex, ...historyList.filter(item => item.repoUrl !== repoUrl)].slice(0, 25);
      setHistoryList(updatedHistory);
      localStorage.setItem("cgm_history_indices", JSON.stringify(updatedHistory));

    } catch (err: any) {
      console.error("Critical failure during scan routine:", err);
      setGeneralError(err.message || "A network transaction or api connection failure occurred while contacting the strategist model. Verify your API Key secrets configuration.");
    } finally {
      clearInterval(stepsInterval);
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (id: string) => {
    try {
      const storedBody = localStorage.getItem(`cgm_analysis_body_${id}`);
      if (storedBody) {
        setActiveAnalysis(JSON.parse(storedBody));
        setGeneralError(null);
      } else {
        throw new Error("Local cache index corrupted or cleaned by browser.");
      }
    } catch (err: any) {
      setGeneralError(err.message);
    }
  };

  const handleDeleteHistory = (id: string) => {
    try {
      const filteredIndices = historyList.filter(item => item.id !== id);
      setHistoryList(filteredIndices);
      localStorage.setItem("cgm_history_indices", JSON.stringify(filteredIndices));
      localStorage.removeItem(`cgm_analysis_body_${id}`);

      if (activeAnalysis) {
        // If the active analysis represents the deleted index, clear active view
        const storedBody = localStorage.getItem(`cgm_analysis_body_${id}`);
        // Let's compare URLs as a fallback
        const indexMatch = historyList.find(item => item.id === id);
        if (indexMatch && indexMatch.repoUrl === activeAnalysis.repoUrl) {
          setActiveAnalysis(null);
        }
      }
    } catch (err) {
      console.error("Failed clearing item from memory:", err);
    }
  };

  const handleReset = () => {
    setActiveAnalysis(null);
    setGeneralError(null);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans antialiased selection:bg-[#58a6ff] selection:text-black">
      {/* Universal Page Top Ribbon Header */}
      <header className="sticky top-0 z-50 bg-[#161b22]/90 backdrop-blur-md border-b border-[#30363d] px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={handleReset} 
              className="flex items-center gap-2.5 text-left focus:outline-none focus:opacity-80 transition-all cursor-pointer"
            >
              <div className="p-2 bg-[#0d1117] text-[#58a6ff] rounded-xl border border-[#30363d]">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-display font-bold text-white text-sm tracking-tight">CompetitiveGitHubMaster</span>
                <span className="block text-[10px] text-[#8b949e] font-mono leading-none">v3.1 OPEN COMP-INTEL</span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#7ee787] bg-[#7ee787]/10 px-3 py-1.5 rounded-full border border-[#7ee787]/30">
            <Activity className="w-3 text-[#7ee787] fill-[#7ee787] animate-pulse" />
            <span>AI ENGINE ACTIVE | 2026</span>
          </div>
        </div>
      </header>

      {/* Main Page Workspace Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Stage Panel Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Error notification block if any transaction failed */}
            {generalError && (
              <div className="p-5 bg-[#f85149]/10 border border-[#f85149]/30 text-[#f85149] rounded-2xl flex gap-3 text-sm animate-fade-in font-sans leading-relaxed">
                <AlertCircle className="w-5 h-5 text-[#f85149] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-white">Competitive Scan Error</p>
                  <p className="text-[#8b949e]">{generalError}</p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-3.5 py-1.5 bg-[#f85149]/20 hover:bg-[#f85149]/30 text-white font-semibold rounded-lg text-xs transition-colors focus:outline-none"
                    >
                      Clear Warnings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Switch view logic: Dashboard or Strategy Report */}
            {activeAnalysis ? (
              <ReportViewer analysis={activeAnalysis} onReset={handleReset} />
            ) : (
              <Dashboard 
                onStartAnalysis={handleStartAnalysis} 
                isLoading={isLoading} 
                loadingStep={loadingStep} 
              />
            )}
          </div>

          {/* Right Column: Historical Audit Directory */}
          <div className="lg:col-span-1 space-y-6">
            <HistorySidebar 
              historyList={historyList} 
              onSelectHistory={handleSelectHistory} 
              onDeleteHistory={handleDeleteHistory}
              currentActiveId={activeAnalysis ? historyList.find(h => h.repoUrl === activeAnalysis.repoUrl)?.id || null : null}
            />

            {/* Quick reference guidance card */}
            <div className="p-5 bg-[#161b22]/50 border border-[#30363d] rounded-2xl text-xs text-[#8b949e] space-y-3 font-sans leading-relaxed">
              <h5 className="font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#58a6ff]" />
                Strategic Protocol (v3.1)
              </h5>
              <p>
                Our competitive scanning protocol leverages Google Search Grounding to identify top open-source competitors, SWOT parameters, and logical roadmap suggestions.
              </p>
              <div className="space-y-1 pt-1 text-[#8b949e]">
                <p className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff]"></span>
                  <strong>Parity:</strong> Analyzes key feature sets.
                </p>
                <p className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7ee787]"></span>
                  <strong>Difference:</strong> Generates next-gen additions.
                </p>
                <p className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d29922]"></span>
                  <strong>Automation:</strong> Produces ready-to-run prompts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Humble professional credit footer */}
      <footer className="border-t border-[#30363d] bg-[#161b22] mt-16 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-[#8b949e]">
        <div className="max-w-7xl mx-auto space-y-1 font-sans">
          <p>© 2026 Competitive GitHub Master. All Rights Reserved.</p>
          <p>Powered securely by Gemini and Google AI Studio.</p>
        </div>
      </footer>
    </div>
  );
}
