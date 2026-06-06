import React, { useState } from "react";
import { 
  BarChart2, BookOpen, Check, Clipboard, Copy, ExternalLink, 
  FileText, Shield, Sparkles, Star, Target, TrendingUp, 
  GitBranch, Code, AlertTriangle, Play, HelpCircle, ArrowRight, CornerDownRight
} from "lucide-react";
import { AnalysisResult } from "../types";

interface ReportViewerProps {
  analysis: AnalysisResult;
  onReset: () => void;
}

export default function ReportViewer({ analysis, onReset }: ReportViewerProps) {
  const [activeTab, setActiveTab] = useState<"interactive" | "document" | "prompt">("interactive");
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);

  // States for live simulated AI Agent autopilots execution
  const [simActiveIndex, setSimActiveIndex] = useState<number | null>(null);
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "success">("idle");
  const [simProgress, setSimProgress] = useState(0);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [viewingFile, setViewingFile] = useState<"new" | "modified">("new");

  const getSimulatedTaskData = (repoName: string, suggestionName: string) => {
    const nameLower = (repoName || "").toLowerCase();
    
    if (nameLower.includes("react-router")) {
      return {
        branch: "feature/zero-config-routes",
        libsToInstall: "npm install chokidar fast-glob --save-dev",
        newFile: "/src/vite-plugin-fs-routes.ts",
        newFileContent: `import { Plugin } from 'vite';\nimport chokidar from 'chokidar';\nimport glob from 'fast-glob';\n\nexport function fsRoutesPlugin(options = { routesDir: './src/routes' }): Plugin {\n  return {\n    name: 'vite-plugin-fs-routes',\n    resolveId(id) {\n      if (id === 'virtual:fs-routes') return '\\0virtual:fs-routes';\n    },\n    load(id) {\n      if (id === '\\0virtual:fs-routes') {\n        return \`export const routes = [\n          { path: '/', component: () => import('./routes/page.tsx') },\n          { path: '/settings', component: () => import('./routes/settings.tsx') }\n        ];\`;\n      }\n    }\n  };\n}`,
        modifiedFile: "vite.config.ts",
        modifiedFileDiffBefore: 'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\nexport default defineConfig({\n  plugins: [react()]\n});',
        modifiedFileDiffAfter: 'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nimport { fsRoutesPlugin } from "./src/vite-plugin-fs-routes";\n\nexport default defineConfig({\n  plugins: [\n    react(),\n    fsRoutesPlugin()\n  ]\n});',
        customLogs: [
          "Resolving directory config tree constraints...",
          "Virtual route module successfully registered with Vite dev server.",
          "Created hot-watching triggers for /src/routes/* layout changes."
        ]
      };
    }
    
    if (nameLower.includes("pino")) {
      return {
        branch: "feature/otel-trace-logging",
        libsToInstall: "npm install @opentelemetry/api",
        newFile: "/src/otel-transport.ts",
        newFileContent: `import { AsyncLocalStorage } from 'async_hooks';\nimport { trace } from '@opentelemetry/api';\n\nconst contextStorage = new AsyncLocalStorage<Map<string, string>>();\n\nexport function otelLoggingMiddleware() {\n  return (req: any, res: any, next: () => void) => {\n    const map = new Map<string, string>();\n    const activeSpan = trace.getActiveSpan();\n    if (activeSpan) {\n      const spanContext = activeSpan.spanContext();\n      map.set('traceId', spanContext.traceId);\n      map.set('spanId', spanContext.spanId);\n    }\n    contextStorage.run(map, () => next());\n  };\n}`,
        modifiedFile: "server.ts",
        modifiedFileDiffBefore: 'import express from "express";\nconst app = express();\n\napp.listen(3000, () => {\n  console.log("Server running");\n});',
        modifiedFileDiffAfter: 'import express from "express";\nimport { otelLoggingMiddleware } from "./src/otel-transport";\nconst app = express();\n\napp.use(otelLoggingMiddleware());\n\napp.listen(3000, () => {\n  console.log("Server running with span extraction active");\n});',
        customLogs: [
          "Binding active trace context from OpenTelemetry spans...",
          "Established asynchronous hooks utilizing NodeJS AsyncLocalStorage.",
          "Tracing middleware successfully injected and validated."
        ]
      };
    }

    if (nameLower.includes("drizzle")) {
      return {
        branch: "feature/relations-canvas-studio",
        libsToInstall: "npm install d3 --save",
        newFile: "/src/db-schema-visualizer.ts",
        newFileContent: `import * as d3 from 'd3';\n\nexport function generateUmlLayout(metaDataTables: any) {\n  const simulation = d3.forceSimulation(metaDataTables.nodes)\n    .force('link', d3.forceLink(metaDataTables.links).id((d: any) => d.id))\n    .force('charge', d3.forceManyBody().strength(-100))\n    .force('center', d3.forceCenter(400, 300));\n  return simulation;\n}`,
        modifiedFile: "drizzle.config.ts",
        modifiedFileDiffBefore: 'import { defineConfig } from "drizzle-kit";\n\nexport default defineConfig({\n  schema: "./src/db/schema.ts",\n  out: "./drizzle"\n});',
        modifiedFileDiffAfter: 'import { defineConfig } from "drizzle-kit";\nimport { visualizerConfig } from "./src/db-schema-visualizer";\n\nexport default defineConfig({\n  schema: "./src/db/schema.ts",\n  out: "./drizzle",\n  ...visualizerConfig\n});',
        customLogs: [
          "Analyzing static TS database objects mapping relations...",
          "Successfully mapped constraints, tables, and foreign keys indexes.",
          "Interactive diagrams workspace initialized and synced with local DB schema."
        ]
      };
    }

    return {
      branch: "feature/wasm-sandbox-evaluation",
      libsToInstall: "npm install @wasm-compiler/core --save-dev",
      newFile: "/src/wasm-sandbox.ts",
      newFileContent: `export async function loadWasmCore(binaryBuffer: ArrayBuffer) {\n  const wasmModule = await WebAssembly.instantiate(binaryBuffer, {\n    env: {\n      log: (ptr: number, len: number) => {\n        console.log('WASM MOCK EXECUTION IN SECURE WORKSPACE');\n      }\n    }\n  });\n  return wasmModule.instance;\n}`,
      modifiedFile: "index.html",
      modifiedFileDiffBefore: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Sandbox Workspace</title>\n</head>\n<body>\n  <div id="root"></div>\n</body>\n</html>',
      modifiedFileDiffAfter: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Sandbox Workspace</title>\n</head>\n<body>\n  <div id="root"></div>\n  <!-- Injected compiled evaluation sandbox client link -->\n  <script type="module" src="/src/wasm-sandbox.ts"></script>\n</body>\n</html>',
      customLogs: [
        "Configuring safe WASM compilation targets...",
        "Injecting dynamic sandbox loop directly into standard client modules.",
        "WebAssembly browser-context isolation filters verified securely."
      ]
    };
  };

  const getSimulatedFileDiff = (repoName: string, suggestionName: string): string[] => {
    const nameLower = (repoName || "").toLowerCase();
    if (nameLower.includes("react-router")) {
      return [
        'import { defineConfig } from "vite";',
        'import react from "@vitejs/plugin-react";',
        '+import { fsRoutesPlugin } from "./src/vite-plugin-fs-routes";',
        '',
        'export default defineConfig({',
        '  plugins: [',
        '+    react(),',
        '+    fsRoutesPlugin()',
        '-    react()',
        '  ]',
        '});'
      ];
    }
    if (nameLower.includes("pino")) {
      return [
        'import express from "express";',
        '+import { otelLoggingMiddleware } from "./src/otel-transport";',
        'const app = express();',
        '',
        '+app.use(otelLoggingMiddleware());',
        '',
        'app.listen(3000, () => {',
        '+  console.log("Server running with span extraction active");',
        '-  console.log("Server running");',
        '});'
      ];
    }
    if (nameLower.includes("drizzle")) {
      return [
        'import { defineConfig } from "drizzle-kit";',
        '+import { visualizerConfig } from "./src/db-schema-visualizer";',
        '',
        'export default defineConfig({',
        '  schema: "./src/db/schema.ts",',
        '  out: "./drizzle",',
        '+  ...visualizerConfig',
        '});'
      ];
    }
    return [
      '<!DOCTYPE html>',
      '<html>',
      '<head>',
      '  <title>Sandbox Workspace</title>',
      '</head>',
      '<body>',
      '  <div id="root"></div>',
      '+  <!-- Injected compiled evaluation sandbox client link -->',
      '+  <script type="module" src="/src/wasm-sandbox.ts"></script>',
      '</body>',
      '</html>'
    ];
  };

  const runSimTask = (idx: number) => {
    const sug = analysis.detailedSuggestions[idx];
    const task = getSimulatedTaskData(analysis.githubMetadata.repo, sug.itemName);
    
    setSimStatus("running");
    setSimProgress(0);
    setSimLogs([`[AUTO-PILOT] Initializing autonomous Antigravity coding agent...`]);
    setViewingFile("new");

    const steps = [
      `[AUTO-PILOT] Dispatching target branch: git checkout -b ${task.branch}`,
      `[SHELL] $ ${task.libsToInstall}`,
      `[SHELL] Fetching packages from NPM package directory index...`,
      `[SHELL] Successfully installed libraries. [DONE]`,
      `[FILES] Creating technical blueprint target file: ${task.newFile}`,
      `[CODE] Synthesizing TypeScript source code layout inside ${task.newFile}...`,
      `[FILES] Appending architectural changes in existing project file: ${task.modifiedFile}`,
      `[AUTO-PILOT] ${task.customLogs[0]}`,
      `[AUTO-PILOT] ${task.customLogs[1]}`,
      `[AUTO-PILOT] ${task.customLogs[2]}`,
      `[SHELL] $ npm run lint`,
      `[SHELL] Validating static types and structural bounds... SUCCESS (0 errors)`,
      `[SHELL] $ npm run build`,
      `[SHELL] Emitting production-ready bundle configurations (dist/)... SUCCESS in 1.84s`,
      `[VERIFY] Launching automated sandbox suite to verify deployment...`,
      `[VERIFY] Routing live validation test... OK`,
      `[AUTO-PILOT] Verification completed. Autonomous implementation deployed successfully! 🚀`
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setSimLogs(prev => [...prev, steps[currentStep]]);
        setSimProgress(Math.min(100, Math.floor(((currentStep + 1) / steps.length) * 100)));
        currentStep++;
      } else {
        clearInterval(interval);
        setSimStatus("success");
      }
    }, 450);
  };

  const startSimulation = (idx: number) => {
    setSimActiveIndex(idx);
    setSimStatus("idle");
    setSimProgress(0);
    setSimLogs(["[AUTO-PILOT] System loaded. Click 'Deploy Simulated Agent' to execute the blueprint code writes..."]);
    setViewingFile("new");
  };

  const closeSimulation = () => {
    setSimActiveIndex(null);
    setSimStatus("idle");
    setSimProgress(0);
    setSimLogs([]);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(analysis.agentPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const copyReport = () => {
    navigator.clipboard.writeText(analysis.fullMarkdownReport);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  // Get color badges for priorities optimized for Elegant Dark
  const getPriorityBadge = (prio: string) => {
    const p = prio.toUpperCase();
    if (p.includes("P0")) {
      return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#f85149]/10 text-[#ff7b72] border border-[#f85149]/30">P0 CRITICAL</span>;
    }
    if (p.includes("P1")) {
      return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#d29922]/10 text-[#f0e050] border border-[#d29922]/30">P1 STRATEGIC</span>;
    }
    return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#388bfd]/10 text-[#79c0ff] border border-[#388bfd]/30">P2 REFINEMENT</span>;
  };

  // Get color badges for efforts optimized for Elegant Dark
  const getEffortBadge = (effort: string) => {
    const e = effort.toLowerCase();
    if (e.includes("low")) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2ea043]/15 text-[#7ee787] border border-[#2ea043]/20">Low Effort</span>;
    }
    if (e.includes("medium")) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#d29922]/15 text-[#f0e050] border border-[#d29922]/20">Med Effort</span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#8c40bf]/15 text-[#d39cff] border border-[#8c40bf]/20">High Effort</span>;
  };

  // Get color badges for expected impacts optimized for Elegant Dark
  const getImpactBadge = (impact: string) => {
    const i = impact.toLowerCase();
    if (i.includes("high")) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm border border-amber-500/20">High Impact</span>;
    }
    if (i.includes("medium")) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#d29922]/10 text-[#d29922] border border-[#d29922]/30">Med Impact</span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-800 text-gray-400 border border-gray-700">Low Impact</span>;
  };

  return (
    <div id="report-viewer-root" className="space-y-8 animate-fade-in py-4">
      {analysis.isFallback && (
        <div id="fallback-notification-banner" className="p-5 bg-[#d29922]/10 border border-[#d29922]/30 rounded-2xl flex gap-3.5 text-[#f0e050]">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#d29922]" />
          <div className="space-y-1 text-sm font-sans">
            <p className="font-bold text-white">Ecosystem Intelligence Simulation Engine Active</p>
            <p className="leading-relaxed text-[#c9d1d9]">{analysis.fallbackReason || "Google search-grounding quota has been temporarily exhausted. Local sandbox has generated an incredibly detailed strategy template instead."}</p>
          </div>
        </div>
      )}

      {/* Target Repo Quick Stats Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#161b22] border border-[#30363d] rounded-2xl shadow-sm text-[#e6edf3]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-[#8b949e]">TARGET:</span>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#0d1117] text-[#58a6ff] rounded border border-[#30363d] text-xs font-mono">
              {analysis.githubMetadata.language}
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white mb-1">
            {analysis.githubMetadata.owner} / <span className="text-[#58a6ff]">{analysis.githubMetadata.repo}</span>
          </h2>
          <p className="text-sm text-[#8b949e] max-w-xl line-clamp-1">{analysis.githubMetadata.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            id="back-home-btn"
            type="button"
            onClick={onReset}
            className="px-4 py-2.5 bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] hover:border-[#8b949e] text-[#c9d1d9] text-sm font-medium rounded-xl transition-all focus:outline-none cursor-pointer"
          >
            Run New Analysis
          </button>
          <a
            href={analysis.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold rounded-xl inline-flex items-center gap-1.5 transition-all focus:outline-none"
          >
            <ExternalLink className="w-4 h-4" />
            GitHub URL
          </a>
        </div>
      </div>

      {/* Tabs Layout Button Group */}
      <div className="border-b border-[#30363d] flex flex-wrap gap-2">
        <button
          id="tab-interactive"
          type="button"
          onClick={() => setActiveTab("interactive")}
          className={`flex items-center gap-2 px-5 py-3.5 font-sans text-sm font-semibold border-b-2 transition-all focus:outline-none cursor-pointer ${
            activeTab === "interactive"
              ? "border-[#58a6ff] text-[#58a6ff] bg-[#161b22]/50"
              : "border-transparent text-[#8b949e] hover:text-white"
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Interactive Roadmap Dashboard
        </button>
        <button
          id="tab-document"
          type="button"
          onClick={() => setActiveTab("document")}
          className={`flex items-center gap-2 px-5 py-3.5 font-sans text-sm font-semibold border-b-2 transition-all focus:outline-none cursor-pointer ${
            activeTab === "document"
              ? "border-[#58a6ff] text-[#58a6ff] bg-[#161b22]/50"
              : "border-transparent text-[#8b949e] hover:text-white"
          }`}
        >
          <FileText className="w-4 h-4" />
          Strategic Document (v3.1)
        </button>
        <button
          id="tab-prompt"
          type="button"
          onClick={() => setActiveTab("prompt")}
          className={`flex items-center gap-2 px-5 py-3.5 font-sans text-sm font-semibold border-b-2 transition-all focus:outline-none cursor-pointer ${
            activeTab === "prompt"
              ? "border-[#2ea043] text-[#7ee787] bg-[#161b22]/50"
              : "border-transparent text-[#8b949e] hover:text-white"
          }`}
        >
          <Code className="w-4 h-4" />
          Autonomous Agent Prompt
        </button>
      </div>

      {/* Tab Panels */}

      {/* TABS: INTERACTIVE DASHBOARD */}
      {activeTab === "interactive" && (
        <div id="interactive-dashboard-panel" className="space-y-8 animate-fade-in">
          {/* Executive Summary Card */}
          <div className="p-6 bg-gradient-to-br from-[#161b22] to-[#0d1117] text-[#c9d1d9] rounded-2xl shadow-xl relative overflow-hidden border border-[#30363d]">
            <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-5">
              <Sparkles className="w-40 h-40" />
            </div>
            <div className="relative space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d29922]" />
                <span className="text-xs font-bold font-mono tracking-widest text-[#8b949e] uppercase">Executive Summary Strategy</span>
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                Competitive Breakthrough Outlook
              </h3>
              <p className="text-[#8b949e] font-sans leading-relaxed text-base max-w-4xl">
                {analysis.executiveSummary}
              </p>
            </div>
          </div>

          {/* Target Project Overview Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#161b22] p-6 border border-[#30363d] rounded-2xl space-y-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-[#58a6ff]" />
                Target Purpose & Persons
              </h3>
              <div className="space-y-3 font-sans text-sm text-[#8b949e]">
                <p>
                  <span className="block font-semibold text-white mb-1">Core Purpose / Target:</span>
                  {analysis.projectOverview.purpose}
                </p>
                <p>
                  <span className="block font-semibold text-white mb-1">User Segment Matrix:</span>
                  {analysis.projectOverview.targetUsers}
                </p>
              </div>
            </div>

            <div className="bg-[#161b22] p-6 border border-[#30363d] rounded-2xl space-y-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#58a6ff]" />
                Architectural Profiles
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold tracking-wider text-[#8b949e] uppercase font-mono">Recognized Stack</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {analysis.projectOverview.techStack.map((tech, idx) => (
                      <span key={idx} className="bg-[#21262d] text-[#58a6ff] border border-[#30363d] text-xs font-medium px-2.5 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold tracking-wider text-[#8b949e] uppercase font-mono">Preserved Core Strengths</span>
                  <ul className="text-xs text-[#8b949e] list-disc pl-4 space-y-1 mt-1 font-sans">
                    {analysis.projectOverview.strengths.slice(0, 3).map((s, idx) => (
                      <li key={idx} className="leading-relaxed">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Competitor Map Deck */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#58a6ff]" />
              Identified Competitor Landscape
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analysis.competitors.map((comp, idx) => (
                <div key={idx} className="bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] rounded-2xl p-5 transition-all space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-display font-bold text-white text-base flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        {comp.name}
                      </h4>
                      <span className="text-xs text-[#8b949e] font-mono font-semibold">{comp.popularity}</span>
                    </div>
                    <p className="text-xs font-mono text-[#8b949e]/80 line-clamp-1 truncate">{comp.url}</p>
                    <p className="text-sm text-[#8b949e] font-sans leading-relaxed">
                      <span className="font-semibold text-[#c9d1d9]">Focus: </span>
                      {comp.positioning}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#30363d]">
                    <p className="text-xs text-amber-100 bg-[#d29922]/10 rounded-lg p-2.5 border border-[#d29922]/20 font-sans leading-relaxed">
                      <strong className="block text-white mb-0.5">Core Comp-Edge:</strong>
                      {comp.strengths}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Comparison Matrix */}
          <div className="bg-[#161b22] rounded-2xl border border-[#30363d] shadow-sm overflow-hidden space-y-4">
            <div className="p-6 border-b border-[#30363d] flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-[#58a6ff]" />
                Strategic Feature Comparison Scorecard
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0d1117] text-xs font-bold text-[#8b949e] font-mono border-b border-[#30363d] uppercase">
                    <th className="py-3 px-6">Category</th>
                    <th className="py-3 px-6">Feature</th>
                    <th className="py-3 px-6 col-span-1">Target Project State</th>
                    <th className="py-3 px-6">Direct Competitors</th>
                    <th className="py-3 px-6 text-[#7ee787]">Differentiation Opportunity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30363d] text-sm font-sans text-[#c9d1d9]">
                  {analysis.featureMatrix.map((feat, idx) => (
                    <tr key={idx} className="hover:bg-[#0d1117]/30">
                      <td className="py-4 px-6 font-mono text-xs font-semibold text-[#8b949e]">{feat.category}</td>
                      <td className="py-4 px-6 font-bold text-white">{feat.featureName}</td>
                      <td className="py-4 px-6 bg-[#0d1117]/10 text-[#8b949e] font-medium text-xs leading-relaxed">{feat.targetState}</td>
                      <td className="py-4 px-6">
                        <div className="space-y-1.5 text-xs">
                          {feat.competitors.map((c, cIdx) => (
                            <div key={cIdx} className="flex gap-1.5 leading-tight">
                              <span className="font-semibold text-white">{c.name}:</span>
                              <span className="text-[#8b949e]">{c.state}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 bg-[#238636]/5 font-medium text-[#7ee787] text-xs leading-relaxed border-l-2 border-[#238636]/20">
                        {feat.differentiation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gap Analysis Bento Layout */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#8b949e]" />
              Ecosystem Gap Assessment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Critical Gaps (Parity-blocking) */}
              <div className="bg-[#f85149]/5 border border-[#f85149]/20 rounded-2xl p-6 space-y-4">
                <h4 className="font-display font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f85149]"></span>
                  Critical Parity Barriers (Gaps)
                </h4>
                <ul className="space-y-2 text-sm text-[#ff7b72] list-none pl-0">
                  {analysis.gapAnalysis.criticalGaps.map((gap, idx) => (
                    <li key={idx} className="flex gap-2 leading-relaxed text-[#c9d1d9]">
                      <ArrowRight className="w-4 h-4 text-[#f85149] flex-shrink-0 mt-0.5" />
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Wins (Low effort, High Visibility) */}
              <div className="bg-[#388bfd]/5 border border-[#388bfd]/20 rounded-2xl p-6 space-y-4">
                <h4 className="font-display font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#388bfd]"></span>
                  Quick Tactical Wins
                </h4>
                <ul className="space-y-2 text-sm text-[#79c0ff] list-none pl-0">
                  {analysis.gapAnalysis.quickWins.map((win, idx) => (
                    <li key={idx} className="flex gap-2 leading-relaxed text-[#c9d1d9]">
                      <ArrowRight className="w-4 h-4 text-[#388bfd] flex-shrink-0 mt-0.5" />
                      <span>{win}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* High-Value Strategic Initiatives */}
              <div className="bg-[#d29922]/5 border border-[#d29922]/20 rounded-2xl p-6 space-y-4">
                <h4 className="font-display font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d29922]"></span>
                  High-Value Strategic Targets
                </h4>
                <ul className="space-y-2 text-sm text-[#f0e050] list-none pl-0">
                  {analysis.gapAnalysis.highValueStrategic.map((opt, idx) => (
                    <li key={idx} className="flex gap-2 leading-relaxed text-[#c9d1d9]">
                      <ArrowRight className="w-4 h-4 text-[#d29922] flex-shrink-0 mt-0.5" />
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preserved / Native Strengths */}
              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-4">
                <h4 className="font-display font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-500"></span>
                  Consolidated Competitive Advantage
                </h4>
                <ul className="space-y-2 text-sm text-[#8b949e] list-none pl-0">
                  {analysis.gapAnalysis.existingStrengths.map((str, idx) => (
                    <li key={idx} className="flex gap-2 leading-relaxed text-[#8b949e]">
                      <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Roadmaps Table */}
          <div className="bg-[#161b22] rounded-2xl border border-[#30363d] shadow-sm overflow-hidden space-y-4">
            <div className="p-6 border-b border-[#30363d]">
              <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#58a6ff]" />
                Ecosystem Strategic Roadmap
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0d1117] text-xs font-bold text-[#8b949e] font-mono border-b border-[#30363d] uppercase">
                    <th className="py-3.5 px-6">Feature Initiative</th>
                    <th className="py-3.5 px-6">Priority</th>
                    <th className="py-3.5 px-6">Complexity (Effort)</th>
                    <th className="py-3.5 px-6">Projected Impact</th>
                    <th className="py-3.5 px-6">Strategic Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30363d] text-sm font-sans text-[#c9d1d9]">
                  {analysis.roadmap.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#0d1117]/30">
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <span className="font-bold text-white block">{item.featureName}</span>
                          <span className="block text-xs font-mono text-[#8b949e] leading-relaxed truncate max-w-sm">
                            {item.highLevelApproach}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">{getPriorityBadge(item.priority)}</td>
                      <td className="py-4 px-6">{getEffortBadge(item.estimatedEffort)}</td>
                      <td className="py-4 px-6">{getImpactBadge(item.expectedImpact)}</td>
                      <td className="py-4 px-6 text-xs text-[#8b949e] leading-relaxed max-w-xs">{item.rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Suggestions Accordions / Profiles */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-[#58a6ff]" />
              Technical Blueprints
            </h3>
            <div className="space-y-4">
              {analysis.detailedSuggestions.map((sug, idx) => (
                <div key={idx} className="bg-[#161b22] border border-[#30363d] rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5 bg-[#0d1117] border-b border-[#30363d] flex flex-wrap justify-between items-center gap-4">
                    <div className="space-y-0.5">
                      <span className="text-xs font-mono text-[#8b949e]">INITIATIVE BLUEPRINT {idx + 1}</span>
                      <h4 className="font-display font-bold text-white text-base">{sug.itemName}</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1.5 bg-[#161b22] text-[#58a6ff] border border-[#30363d] rounded-lg text-xs font-mono">
                        Target Val: {sug.value}
                      </div>
                      <button
                        type="button"
                        onClick={() => startSimulation(idx)}
                        className={`px-3.5 py-1.5 border font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer focus:outline-none ${
                          simActiveIndex === idx
                            ? "bg-[#388bfd]/20 border-[#388bfd]/50 text-[#79c0ff]"
                            : "bg-[#238636]/15 hover:bg-[#238636] border-[#238636]/30 text-[#7ee787] hover:text-white"
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-[#7ee787] animate-pulse" />
                        {simActiveIndex === idx ? "Simulation Active" : "Simulate Agent Build"}
                      </button>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Column 1: Arch & Files */}
                    <div className="space-y-4 text-xs font-sans">
                      <div className="space-y-1.5">
                        <span className="font-bold uppercase font-mono block text-[#8b949e]">Target Architecture</span>
                        <p className="text-[#c9d1d9] leading-relaxed bg-[#0d1117] p-2.5 rounded border border-[#30363d] font-mono">
                          {sug.architecture}
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <span className="font-bold uppercase font-mono block text-[#8b949e]">Recommended File Tree Adds</span>
                        <p className="text-[#7ee787]/80 leading-relaxed bg-[#0d1117] p-2.5 rounded border border-[#30363d] font-mono text-xs">
                          {sug.fileChanges}
                        </p>
                      </div>
                    </div>
                    {/* Column 2: Libraries & Risks */}
                    <div className="space-y-4 text-xs font-sans">
                      <div className="space-y-1.5">
                        <span className="font-bold uppercase font-mono block text-[#8b949e]">Suggested Packages / Patterns</span>
                        <p className="text-[#c9d1d9] leading-relaxed bg-[#0d1117] p-2.5 rounded border border-[#30363d]">
                          {sug.recommendations}
                        </p>
                      </div>
                      <div className="space-y-1.5 border-l-2 border-[#d29922]/60 bg-[#d29922]/10 p-2.5 rounded text-[#ff7b72]">
                        <span className="font-bold uppercase font-mono block text-[#d29922] mb-1">Critical Technical Risks</span>
                        <p className="text-[#8b949e] leading-relaxed">
                          {sug.risks}
                        </p>
                      </div>
                    </div>
                    {/* Column 3: Step-by-Step implementation */}
                    <div className="space-y-2 font-sans md:col-span-1 border-l border-[#30363d] pl-4">
                      <span className="font-bold text-xs uppercase font-mono tracking-wider block text-[#8b949e] mb-1.5">Execution Steps</span>
                      <ol className="text-xs text-[#c9d1d9] space-y-2 pl-0 list-none">
                        {sug.steps.map((step, sIdx) => (
                          <li key={sIdx} className="flex gap-2 items-start leading-relaxed">
                            <span className="inline-flex items-center justify-center w-5 h-5 bg-[#0d1117] text-[#58a6ff] border border-[#30363d] rounded text-[10px] font-bold font-mono flex-shrink-0">
                              {sIdx + 1}
                            </span>
                            <span className="text-[#8b949e]">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Autopilot Simulation Workspace Panel */}
                  {simActiveIndex === idx && (
                    <div className="border-t border-[#30363d] bg-[#0d1117] p-6 space-y-6 animate-fade-in">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#30363d]/55 pb-3">
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="w-5 h-5 text-[#7ee787] animate-pulse" />
                          <div>
                            <h4 className="font-display font-bold text-white text-sm">
                              AI Agent Autopilot Workspace
                            </h4>
                            <p className="text-xs font-mono text-[#8b949e]">
                              SIMULATION CONSOLE FOR: {sug.itemName}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {simStatus === "running" && (
                            <span className="flex items-center gap-2 text-xs font-mono text-[#f0e050] bg-[#d29922]/10 border border-[#d29922]/30 px-3 py-1 rounded-full">
                              <span className="w-2 h-2 rounded-full bg-[#f0e050] animate-ping"></span>
                              EXECUTING TASKS {simProgress}%
                            </span>
                          )}
                          {simStatus === "success" && (
                            <span className="flex items-center gap-2 text-xs font-mono text-[#7ee787] bg-[#238636]/10 border border-[#238636]/30 px-3 py-1 rounded-full font-bold">
                              <span className="w-2 h-2 rounded-full bg-[#7ee787] animate-pulse"></span>
                              BUILD SUCCESSFUL 
                            </span>
                          )}
                          {simStatus === "idle" && (
                            <span className="flex items-center gap-2 text-xs font-mono text-[#8b949e] bg-[#161b22] border border-[#30363d] px-3 py-1 rounded-full">
                              <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                              STANDBY READY
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Interactive Workspace Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
                        
                        {/* LEFT COLUMN: Terminal Logs */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-mono tracking-wider text-[#8b949e] uppercase">
                              Live Execution Shell
                            </span>
                            <span className="text-[10px] font-mono text-gray-500">
                              TTY: pts/4 | UTF-8
                            </span>
                          </div>
                          
                          <div className="bg-[#03060a] border border-[#30363d] rounded-xl p-4 font-mono text-xs text-[#7ee787] h-[280px] overflow-y-auto space-y-2 flex flex-col justify-between shadow-inner">
                            <div className="space-y-2 overflow-y-auto flex-1">
                              {simLogs.map((log, lIdx) => (
                                <div 
                                  key={lIdx} 
                                  className={`leading-relaxed ${
                                    log.includes("[SHELL]") ? "text-cyan-400" :
                                    log.includes("[CODE]") ? "text-amber-400" :
                                    log.includes("[VERIFY]") ? "text-purple-400 font-semibold" :
                                    log.includes("SUCCESS") ? "text-green-400 font-bold" :
                                    log.includes("[FILES]") ? "text-indigo-400" :
                                    log.includes("🚀") ? "text-[#7ee787] font-bold bg-[#2ea043]/10 p-1.5 rounded border border-[#238636]/20" :
                                    "text-[#c9d1d9]"
                                  }`}
                                >
                                  {log}
                                </div>
                              ))}
                              {simStatus === "running" && (
                                <div className="text-[#8b949e] animate-pulse flex items-center gap-1.5 pt-1">
                                  <span className="inline-block w-1.5 h-3 bg-[#58a6ff]"></span>
                                  Analyzing code matrices...
                                </div>
                              )}
                            </div>

                            <div className="border-t border-[#30363d]/50 pt-2.5 flex items-center justify-between text-[11px] text-[#8b949e]">
                              <div className="flex items-center gap-1 font-mono font-bold text-[#c9d1d9]">
                                <span>agent@CGM:~#</span>
                                <span className="w-1.5 h-3 bg-[#7ee787] animate-pulse"></span>
                              </div>
                              <span>Antigravity Kernel 1.0.3</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {simStatus !== "running" && (
                              <button
                                type="button"
                                onClick={() => runSimTask(idx)}
                                className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs rounded-lg transition-all focus:outline-none flex items-center gap-1.5 cursor-pointer shadow-md"
                              >
                                <Play className="w-3.5 h-3.5 fill-current" />
                                {simStatus === "success" ? "Restart Task" : "Deploy Simulated Agent"}
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={closeSimulation}
                              className="px-4 py-2 bg-[#21262d] border border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] font-semibold text-xs rounded-lg transition-all focus:outline-none cursor-pointer"
                            >
                              Close Console
                            </button>
                          </div>
                        </div>

                        {/* RIGHT COLUMN: Code View */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-mono tracking-wider text-[#8b949e] uppercase">
                              In-Memory Code Sandbox / Diff
                            </span>
                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => setViewingFile("new")}
                                className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                                  viewingFile === "new"
                                    ? "bg-[#58a6ff]/10 text-[#58a6ff] border-[#58a6ff]/30"
                                    : "bg-[#0d1117] text-gray-500 border-[#30363d]"
                                }`}
                              >
                                + {getSimulatedTaskData(analysis.githubMetadata.repo, sug.itemName).newFile}
                              </button>
                              <button
                                type="button"
                                onClick={() => setViewingFile("modified")}
                                className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                                  viewingFile === "modified"
                                    ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                                    : "bg-[#0d1117] text-gray-500 border-[#30363d]"
                                }`}
                              >
                                ✎ {getSimulatedTaskData(analysis.githubMetadata.repo, sug.itemName).modifiedFile}
                              </button>
                            </div>
                          </div>

                          <div className="bg-[#03060a] border border-[#30363d] rounded-xl p-4 font-mono text-[11px] leading-relaxed overflow-x-auto h-[280px] overflow-y-auto text-[#c9d1d9] shadow-inner text-left">
                            {viewingFile === "new" ? (
                              <div className="space-y-1">
                                <span className="block text-gray-500 text-[10px] border-b border-[#30363d]/40 pb-1 mb-2">
                                  // TARGET FILE CREATION PATH: {getSimulatedTaskData(analysis.githubMetadata.repo, sug.itemName).newFile}
                                </span>
                                <pre className="text-[#a5d6ff] whitespace-pre-wrap font-mono">
                                  {simStatus === "success" 
                                    ? getSimulatedTaskData(analysis.githubMetadata.repo, sug.itemName).newFileContent
                                    : "/* Simulating code generation... Workspace file is currently clean */"
                                  }
                                </pre>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <span className="block text-gray-500 text-[10px] border-b border-[#30363d]/40 pb-1 mb-2">
                                  // GIT FILE MODIFICATION PATCH FOR: {getSimulatedTaskData(analysis.githubMetadata.repo, sug.itemName).modifiedFile}
                                </span>
                                {simStatus === "success" ? (
                                  <div className="space-y-0.5 font-mono">
                                    {getSimulatedFileDiff(analysis.githubMetadata.repo, sug.itemName).map((line, lIdx) => (
                                      <div 
                                        key={lIdx} 
                                        className={`px-1 py-0.5 rounded ${
                                          line.startsWith("+") ? "bg-[#2ea043]/15 text-[#7ee787]" :
                                          line.startsWith("-") ? "bg-[#f85149]/15 text-[#ff7b72] line-through decoration-[#f85149]" :
                                          "text-[#c9d1d9]"
                                        }`}
                                      >
                                        {line}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <pre className="text-gray-500 whitespace-pre-wrap font-mono">
                                    {getSimulatedTaskData(analysis.githubMetadata.repo, sug.itemName).modifiedFileDiffBefore}
                                  </pre>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 8: Risks, Ethics & Next Steps */}
          <div className="bg-[#161b22] p-6 border border-[#30363d] rounded-2xl space-y-6">
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2 border-b border-[#30363d] pb-3">
              <Shield className="w-5 h-5 text-[#8b949e]" />
              Risks, Compliance & Repository Hygiene
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 text-sm text-[#8b949e]">
                <span className="block font-bold font-mono text-xs uppercase text-[#f85149]">Technical Risks</span>
                <p className="leading-relaxed bg-[#f85149]/5 text-[#ff7b72] border border-[#f85149]/20 p-3.5 rounded-xl text-xs">
                  {analysis.risksAndEthics.technicalRisks}
                </p>
              </div>

              <div className="space-y-2 text-sm text-[#8b949e]">
                <span className="block font-bold font-mono text-xs uppercase text-white">Dependencies & Compliance</span>
                <p className="leading-relaxed bg-[#0d1117] text-[#8b949e] border border-[#30363d] p-3.5 rounded-xl text-xs">
                  {analysis.risksAndEthics.dependencyConsiderations}
                </p>
              </div>

              <div className="space-y-2 text-sm text-[#8b949e]">
                <span className="block font-bold font-mono text-xs uppercase text-[#58a6ff]">GitHub Hygiene Actions</span>
                <p className="leading-relaxed bg-[#58a6ff]/5 text-[#79c0ff] border border-[#58a6ff]/20 p-3.5 rounded-xl text-xs font-mono">
                  {analysis.risksAndEthics.githubHygiene}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#30363d] space-y-3">
              <span className="block font-bold text-white font-sans text-sm">Concrete Next Actions Today</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2 text-xs text-[#8b949e]">
                {analysis.risksAndEthics.nextSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-2 items-center leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7ee787] flex-shrink-0 animate-ping"></span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TABS: STRATEGIC REPORT (RAW MARKDOWN) */}
      {activeTab === "document" && (
        <div id="full-document-panel" className="bg-[#161b22] rounded-2xl border border-[#30363d] shadow-xl overflow-hidden animate-fade-in">
          <div className="p-5 border-b border-[#30363d] bg-[#0d1117] flex justify-between items-center">
            <div className="space-y-0.5">
              <h3 className="font-display font-bold text-white text-base">Ecosystem Competitive Analysis</h3>
              <p className="text-xs text-[#8b949e] font-sans">Full raw 8-section technical markdown report format</p>
            </div>
            <button
              id="copy-doc-btn"
              type="button"
              onClick={copyReport}
              className="px-4 py-2 bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] text-[#c9d1d9] text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-all focus:outline-none cursor-pointer"
            >
              {copiedReport ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#58a6ff]" />
                  Copied Report!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Report (MD)
                </>
              )}
            </button>
          </div>
          <div className="p-6 md:p-10 border-t border-[#30363d]">
            <div className="markdown-body font-sans text-[#c9d1d9] leading-relaxed overflow-x-auto whitespace-pre-wrap max-w-full">
              {analysis.fullMarkdownReport}
            </div>
          </div>
        </div>
      )}

      {/* TABS: AUTONOMOUS AGENT PROMPT */}
      {activeTab === "prompt" && (
        <div id="agent-prompt-panel" className="space-y-6 animate-fade-in">
          <div className="p-6 bg-gradient-to-br from-[#0d1c16] to-[#040d0a] text-[#7ee787] rounded-2xl shadow-xl relative overflow-hidden border border-[#238636]/30">
            <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-5">
              <Code className="w-40 h-40" />
            </div>
            <div className="relative space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-[#2ea043]" />
                <span className="text-xs font-bold font-mono tracking-widest text-[#7ee787] uppercase">Competitive Agent v3.1 Code-Ready Prompt</span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-white leading-snug">
                Fully Portable Coding Prompt
              </h3>
              <p className="text-[#8b949e] font-sans leading-relaxed text-sm max-w-3xl">
                This fully engineered prompt combines parity metrics and custom suggestions into a clean blueprint instructions block. Feed this straight to any autonomous coding agent to begin automatic generation & setup in small testable increments.
              </p>
            </div>
          </div>

          <div className="bg-[#161b22] rounded-2xl border border-[#30363d] shadow-xl overflow-hidden flex flex-col">
            <div className="p-4 bg-[#0d1117] border-b border-[#30363d] flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="text-xs font-mono text-[#8b949e] ml-2">agent-instructions-prompt.md</span>
              </div>
              <button
                id="copy-agent-prompt-btn"
                type="button"
                onClick={copyPrompt}
                className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 transition-all focus:outline-none cursor-pointer"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied Layout!
                  </>
                ) : (
                  <>
                    <Clipboard className="w-4 h-4" />
                    Copy Code Prompt
                  </>
                )}
              </button>
            </div>
            <div className="p-6 overflow-x-auto bg-[#0d1117] font-mono text-xs text-[#c9d1d9] leading-relaxed max-h-[600px] overflow-y-auto border-t border-[#30363d]">
              <pre className="whitespace-pre-wrap select-text selection:bg-[#238636]/50 selection:text-white font-mono leading-relaxed bg-transparent p-0 border-0">
                {analysis.agentPrompt}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
