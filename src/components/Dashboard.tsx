import React, { useState } from "react";
import { Search, Github, Sparkles, Loader2, HelpCircle, AlertCircle, RefreshCw, Send, Settings, BookOpen } from "lucide-react";
import { GitHubMetadata } from "../types";

interface DashboardProps {
  onStartAnalysis: (repoUrl: string, customInstructions: string, metadata: GitHubMetadata | null) => Promise<void>;
  isLoading: boolean;
  loadingStep: string;
}

export default function Dashboard({ onStartAnalysis, isLoading, loadingStep }: DashboardProps) {
  const [url, setUrl] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [meta, setMeta] = useState<GitHubMetadata | null>(null);
  const [metaError, setMetaError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Auto-fetch short-codes or full URLs
  const checkAndFetchMetadata = async (targetUrl: string) => {
    if (!targetUrl || targetUrl.trim().length < 3) return;
    setIsFetchingMeta(true);
    setMetaError(null);
    try {
      const response = await fetch(`/api/repo-info?url=${encodeURIComponent(targetUrl)}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "GitHub repository not found.");
      }
      setMeta(data);
    } catch (err: any) {
      console.warn("Failed direct API fetch - falling back:", err.message);
      setMetaError("No authenticated GitHub API metadata could be directly verified, but we can still perform a deep-scan. We'll let Google Search Grounding trace the repository during final strategy assessment.");
      setMeta(null);
    } finally {
      setIsFetchingMeta(false);
    }
  };

  const handleUrlBlur = () => {
    if (url && !meta && !isFetchingMeta) {
      checkAndFetchMetadata(url);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAndFetchMetadata(url);
    }
  };

  const executeAnalysis = () => {
    if (!url.trim()) return;
    onStartAnalysis(url, instructions, meta);
  };

  const loadPredefinedExample = (exampleUrl: string, description: string) => {
    setUrl(exampleUrl);
    setInstructions(`Assess positioning in relation to existing ecosystem solutions, prioritizing ${description}.`);
    // Direct trigger
    setIsFetchingMeta(true);
    setMetaError(null);
    fetch(`/api/repo-info?url=${encodeURIComponent(exampleUrl)}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setMeta(data);
      })
      .catch(() => {
        setMeta(null);
      })
      .finally(() => {
        setIsFetchingMeta(false);
      });
  };

  return (
    <div id="dashboard-root" className="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3.5 bg-[#161b22] text-[#58a6ff] rounded-2xl shadow-lg border border-[#30363d]">
          <Github className="w-9 h-9" />
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Competitive GitHub Master
        </h1>
        <p className="text-lg text-[#8b949e] max-w-2xl mx-auto font-sans leading-relaxed">
          Paste any open-source project URL to execute instant Web-and-Repo competitive intelligence. Get a fully balanced v3.1 strategic roadmap and autonomous agent prompts.
        </p>
      </div>

      {/* Main Form Controller */}
      <div className="bg-[#161b22] rounded-2xl border border-[#30363d] shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="repo-url-input" className="block text-sm font-semibold text-white font-sans">
              GitHub Repository URL or Project Short-Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Github className="h-5 w-5 text-[#8b949e]" />
              </div>
              <input
                id="repo-url-input"
                type="text"
                placeholder="e.g. facebook/react or https://github.com/mrdoob/three.js"
                className="block w-full pl-11 pr-32 py-4 bg-[#0d1117] border border-[#30363d] text-white placeholder-gray-500 rounded-xl focus:bg-[#0d1117] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent transition-all font-sans"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onBlur={handleUrlBlur}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <div className="absolute inset-y-2 right-2 flex items-center">
                <button
                  id="metadata-fetch-btn"
                  type="button"
                  onClick={() => checkAndFetchMetadata(url)}
                  disabled={isLoading || isFetchingMeta || !url.trim()}
                  className="px-4 py-2 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#8b949e] cursor-pointer disabled:opacity-50"
                >
                  {isFetchingMeta ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#58a6ff]" />
                  ) : (
                    <RefreshCw className="w-3.5 h-3.5" />
                  )}
                  Verify Project
                </button>
              </div>
            </div>
            <p className="text-xs text-[#8b949e] font-sans">
              Enter full URL or <code className="font-mono bg-[#0d1117] border border-[#30363d] px-1 py-0.5 rounded text-[#e6edf3]">owner/repository</code> format. Press Enter to pull metadata.
            </p>
          </div>

          {/* Real-time Repository Metadata Verification Status Card */}
          {isFetchingMeta && (
            <div className="p-4 bg-[#0d1117] rounded-xl flex items-center gap-3 border border-[#30363d] animate-pulse">
              <Loader2 className="w-5 h-5 text-[#58a6ff] animate-spin" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-white">Verifying repository details...</p>
                <p className="text-xs text-[#8b949e]">Querying public metadata logs and fetching master README lines...</p>
              </div>
            </div>
          )}

          {meta && !isFetchingMeta && (
            <div id="repo-metadata-card" className="p-5 bg-[#0d1117] border border-[#30363d] rounded-xl space-y-3 animate-fade-in animate-duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1 px-2.5 bg-[#161b22] text-[#58a6ff] border border-[#30363d] rounded text-xs font-mono font-medium">
                    {meta.language}
                  </div>
                  <h3 className="font-display font-medium text-white text-base">
                    {meta.owner} / <span className="font-bold text-[#58a6ff]">{meta.repo}</span>
                  </h3>
                </div>
                <div className="flex gap-4 text-xs font-mono text-[#8b949e]">
                  <span>★ {meta.stars.toLocaleString()} stars</span>
                  <span>⑂ {meta.forks.toLocaleString()} forks</span>
                  <span>⚠ {meta.openIssues.toLocaleString()} open issues</span>
                </div>
              </div>
              <p className="text-sm text-[#8b949e] font-sans leading-relaxed">
                {meta.description}
              </p>
              {meta.readme && (
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#7ee787] bg-[#7ee787]/10 px-2.5 py-1 rounded-full border border-[#7ee787]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7ee787] animate-pulse"></span>
                    Verified README Indexed ({Math.min(5000, meta.readme.length).toLocaleString()} bytes)
                  </div>
                </div>
              )}
            </div>
          )}

          {metaError && !isFetchingMeta && !meta && (
            <div className="p-4 bg-[#d29922]/10 border border-[#d29922]/30 rounded-xl flex gap-3 text-[#d29922]">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#d29922]" />
              <div className="space-y-1 text-sm font-sans">
                <p className="font-semibold text-white">Ecosystem Verification Info</p>
                <p className="leading-relaxed text-[#c9d1d9]">{metaError}</p>
              </div>
            </div>
          )}

          {/* Advanced Configurations Trigger */}
          <div className="pt-2">
            <button
              id="advanced-config-toggle"
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b949e] hover:text-white transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4 text-[#58a6ff]" />
              {showAdvanced ? "Hide Strategy Filters" : "Configure Custom Directions"}
            </button>
          </div>

          {showAdvanced && (
            <div id="advanced-config-panel" className="p-5 bg-[#0d1117] border border-[#30363d] rounded-xl space-y-4 animate-fade-in">
              <div className="space-y-2">
                <label htmlFor="custom-instructions-area" className="block text-xs font-bold uppercase tracking-wider text-[#8b949e]">
                  Custom Strategic Instructions
                </label>
                <textarea
                  id="custom-instructions-area"
                  rows={3}
                  placeholder="e.g. Focus on direct Rust compiler competitors, emphasize low-memory footprints, analyze specific cloud integrations, or investigate performance metrics of Neon database driver..."
                  className="block w-full p-3 text-sm bg-[#161b22] border border-[#30363d] rounded-lg text-white placeholder-gray-500 focus:outline-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] font-sans"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  disabled={isLoading}
                />
                <p className="text-xs text-[#8b949e]">
                  Add guidelines or parameters to guide the Gemini-generated analysis, competitive scoring matrix, and final autonomous coder roadmap.
                </p>
              </div>
            </div>
          )}

          {/* Action Trigger Block */}
          <div className="pt-4 border-t border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-[#8b949e] font-sans">
              <Sparkles className="w-4 h-4 text-[#58a6ff] flex-shrink-0" />
              <span>Real-time Google search-grounding enabled by Gemini 3.5.</span>
            </div>
            <button
              id="start-scanning-btn"
              type="button"
              onClick={executeAnalysis}
              disabled={isLoading || !url.trim()}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-sm rounded-xl inline-flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-[#2ea043] focus:ring-offset-2 font-sans cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Intelligence...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze & Strategize
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Scan Process Loading screen */}
      {isLoading && (
        <div id="intelligence-scan-loader" className="p-8 bg-[#161b22] text-white rounded-2xl border border-[#30363d] shadow-2xl space-y-6 text-center animate-pulse">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-[#30363d] border-t-[#58a6ff] animate-spin"></div>
              <Sparkles className="absolute inset-0 m-auto text-[#d29922] w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-bold text-xl tracking-tight text-white">Assessing Market Landscapes</h3>
            <p className="text-sm text-[#8b949e] font-mono max-w-md mx-auto h-12 flex items-center justify-center border-t border-b border-[#30363d]/50">
              {loadingStep}
            </p>
          </div>
          <div className="w-full bg-[#0d1117] h-1.5 border border-[#30363d] rounded-full overflow-hidden">
            <div className="bg-[#58a6ff] h-full w-2/3 animate-pulse rounded-full"></div>
          </div>
        </div>
      )}

      {/* Predefined Repositories Examples Grid */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#58a6ff]" />
          Test-Drive Real Repository Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            id="example-react-router"
            type="button"
            onClick={() => loadPredefinedExample("remix-run/react-router", "routing ecosystems, bundle size constraints, and client performance")}
            className="p-4 bg-[#161b22] hover:bg-[#1f242c] border border-[#30363d] hover:border-[#8b949e] rounded-xl text-left transition-all space-y-2 group focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Github className="w-4 h-4 text-[#58a6ff]" />
              react-router
            </div>
            <p className="text-xs text-[#8b949e] font-sans leading-relaxed">
              Analyze React Router/Remix with Next.js navigation stack and client router solutions.
            </p>
          </button>

          <button
            id="example-pino"
            type="button"
            onClick={() => loadPredefinedExample("pinojs/pino", "logging overhead, asynchronous JSON processing, and Node framework benchmarks")}
            className="p-4 bg-[#161b22] hover:bg-[#1f242c] border border-[#30363d] hover:border-[#8b949e] rounded-xl text-left transition-all space-y-2 group focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Github className="w-4 h-4 text-[#58a6ff]" />
              pino
            </div>
            <p className="text-xs text-[#8b949e] font-sans leading-relaxed">
              Assess Pinot versus Bun logger, Winston, and Bunyan for low-carbon high-throughput logging.
            </p>
          </button>

          <button
            id="example-drizzle"
            type="button"
            onClick={() => loadPredefinedExample("drizzle-team/drizzle-orm", "TypeScript type-inference speeds, migrations integration, and pg / sql drivers support")}
            className="p-4 bg-[#161b22] hover:bg-[#1f242c] border border-[#30363d] hover:border-[#8b949e] rounded-xl text-left transition-all space-y-2 group focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Github className="w-4 h-4 text-[#58a6ff]" />
              drizzle-orm
            </div>
            <p className="text-xs text-[#8b949e] font-sans leading-relaxed">
              Explore Drizzle versus Prisma ORM, Kysely, TypeORM, and Knex with detailed performance metrics.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
