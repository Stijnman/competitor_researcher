import { AnalysisResult } from "./src/types";
import { generateBaseFallbackReport } from "./generators/base";

// Generates highly detailed fallback/demo reports for popular test-drives,
// plus a dynamic fallback report for any arbitrary repo URL.
export function generateFallbackReport(owner: string, repo: string, metadata: any): AnalysisResult {
  const repoNameLower = repo.toLowerCase();
  const repoUrl = `https://github.com/${owner}/${repo}`;
  const analyzedAt = new Date().toISOString();

  // Helper metadata format
  const starsCount = metadata ? metadata.stars : 15200;
  const forksCount = metadata ? metadata.forks : 850;
  const openIssuesCount = metadata ? metadata.openIssues : 120;
  const primaryLang = metadata ? metadata.language : "TypeScript";
  const desc = metadata ? metadata.description : "High performance framework codebase.";

  const baseMetadata = {
    owner,
    repo,
    description: desc,
    stars: starsCount,
    forks: forksCount,
    openIssues: openIssuesCount,
    language: primaryLang,
    readme: metadata?.readme || "No readme index cached."
  };

  if (repoNameLower.includes("react-router")) {
    return {
      repoUrl,
      analyzedAt,
      githubMetadata: baseMetadata,
      executiveSummary: "React Router has dominated client-side routing, but modern web evolution demands deep framework convergence. The largest competitive gaps lay in direct bundler-level alignment (Next.js App Router) and automated prefetching heuristics. Our highest-ROI recommendation is to formalize streaming Server Components integration (v7+) while streamlining the nested layout caching layer.",
      projectOverview: {
        purpose: "Standard client-side nested routing and state management for web applications",
        targetUsers: "Single-page application (SPA) developers, full-stack React framework architects, and modular UI engineers.",
        techStack: ["TypeScript", "React", "Vite", "Rollup", "Turbopack"],
        strengths: ["Nested route layout design patterns", "Unified loaders/actions data API", "Industry-wide developer adoption and massive ecosystem support"]
      },
      competitors: [
        {
          name: "Next.js App Router",
          url: "https://github.com/vercel/next.js",
          popularity: "★ 120,000+ stars | Active corporate backing",
          positioning: "Server-first React framework with highly-integrated file-system routing and React Server Components (RSC).",
          strengths: "Cohesive end-to-end optimizations (RSC by default), server-side rendering (SSR), and incremental static regeneration (ISR) with compiler-level build-time performance tuning."
        },
        {
          name: "TanStack Router",
          url: "https://github.com/tanstack/router",
          popularity: "★ 8,500+ stars | Rapidly rising adoption",
          positioning: "Strictly typed, 100% type-safe search parameters and nested client route manager.",
          strengths: "Bypasses structural bottlenecks, providing superb autocompletes, built-in query caching, type-safe navigation paths, and fine-grained pending state states."
        },
        {
          name: "Wouter",
          url: "https://github.com/molecula/wouter",
          popularity: "★ 6,000+ stars | Ultra-light niche",
          positioning: "Minimalist, zero-dependency client-side routing hook for React and Preact.",
          strengths: "Sub-2.0KB footprint. Installs with zero dependency bloating, supporting custom routing hooks and simple custom path regex parsers."
        }
      ],
      featureMatrix: [
        {
          category: "Security & Types",
          featureName: "Type-Safe Navigation Path Verification",
          targetState: "Partial: Actions and Loaders support generics, but route endpoints are untyped template strings.",
          competitors: [
            { name: "TanStack Router", state: "Full: Strict path parameters in compiler-time generic matrices" },
            { name: "Next.js", state: "Full: Experimental typed route patterns generated at build-time" }
          ],
          differentiation: "Develop an automated build-time compiler plug-in to extract route matching tree into a globally declared TS module namespace."
        },
        {
          category: "Performance",
          featureName: "Aggressive Built-In Prefetching",
          targetState: "Manual: Requires developer to wire up hover/visible events manually on individual <Link> elements.",
          competitors: [
            { name: "Next.js", state: "Auto: Prefetches within viewport on viewport arrival" },
            { name: "TanStack Router", state: "Auto: Pre-loads loaders on link hover with customized debounce policies" }
          ],
          differentiation: "Implement an asynchronous intersection observer on custom components in v7 core that prefetches linked route bundle bundles sequentially based on viewport."
        }
      ],
      gapAnalysis: {
        criticalGaps: [
          "Lacks native React Server Components (RSC) direct boundaries without additional heavy framework wrappers.",
          "Route matching definitions require static object configurations rather than automated directory file-systems.",
          "Search parameters parameters management is not natively validated or strongly typed at compile-time."
        ],
        quickWins: [
          "Integrate a unified React UseEffect route interceptor for speculative data preloading.",
          "Clean up legacy compatibility layers for older React versions to reduce client bundle overhead.",
          "Introduce a generic Zod-based search validation helper in Loader paths."
        ],
        highValueStrategic: [
          "Formalize build-time directory scanning to support zero-config file-system router configurations in Vite.",
          "Expose dedicated streaming response protocols to support Server-Sent-Events (SSE) seamlessly inside Router actions."
        ],
        existingStrengths: [
          "Nested component caching lifecycle avoids needless child sub-tree re-renders.",
          "Action-Loader data invalidation workflow automatically refreshes stale route variables."
        ]
      },
      roadmap: [
        {
          featureName: "Zero-Config File-System Route Bundling",
          priority: "P0",
          estimatedEffort: "Medium",
          expectedImpact: "High",
          rationale: "Align developer ergonomics with Next.js and Remix folder boundaries to capture shifting audiences.",
          highLevelApproach: "Develop a lightweight Vite/Rollup plug-in that extracts a local folder directory layout and converts it to a standard routes configuration tree automatically."
        },
        {
          featureName: "Strict Router Type Namespace Autocomplete",
          priority: "P1",
          estimatedEffort: "Low",
          expectedImpact: "High",
          rationale: "Fills the type-safety gaps against TanStack Router which is capturing premium TypeScript developers.",
          highLevelApproach: "Introduce a dynamic type checker generator that watches custom loaders and outputs a custom routing type dictionary index."
        }
      ],
      detailedSuggestions: [
        {
          itemName: "Zero-Config File-System Route Bundling",
          value: "Create a directory watching plugin linking folders to route entries.",
          architecture: "Builds on top of react-router-dom context utilizing virtual modules inside Vite builder.",
          fileChanges: "/src/vite-plugin-fs-routes.ts (New), vite.config.ts (Modify)",
          recommendations: "npm install chokidar fast-glob (to watch file directories)",
          risks: "Potential HMR delays in huge enterprise codebases when rapidly creating nested modules.",
          steps: [
            "Initialize chokidar to watch files within `/src/routes/**` folder.",
            "Parse files on-the-fly, mapping `page.tsx` and `layout.tsx` nested indexes into react-router definitions.",
            "Emit a virtual module mapping containing standard routes modules for consumption by `createBrowserRouter`."
          ]
        }
      ],
      risksAndEthics: {
        technicalRisks: "Legacy app routing architectures wrapping old Router instances could hit breaking changes during type-safety namespace migrations.",
        dependencyConsiderations: "Adding watcher engines expands development dependencies. Keep watchers isolated to devDependecies package.json scopes.",
        githubHygiene: "Introduce pre-commit hooks via Husky to validate compiled type route trees before every deploy transaction.",
        nextSteps: [
          "Draft experimental Vite routing watcher configuration.",
          "Test loader type validation on complex multi-parameter sub-routes."
        ]
      },
      agentPrompt: "## Role & Parameters\nYou are an autonomous senior developer agent tasked with implementing File-System Routing. See details at: /src/vite-plugin-fs-routes.ts\n\n## Acceptance Criteria:\n1. Watch `/src/routes/` and map layouts recursively.\n2. Do not introduce circular runtime dependencies.",
      fullMarkdownReport: `# Competitive Analysis: react-router\n\n### 1. Executive Summary\nReact Router dominates but faces massive pressure from server-first stacks and extreme type-safety tooling.`
    };
  }

  if (repoNameLower.includes("pino")) {
    return {
      repoUrl,
      analyzedAt,
      githubMetadata: baseMetadata,
      executiveSummary: "Pinojs has established benchmark logging superiority by shifting JSON serialization outside CPU-blocking standard paths. The primary remaining competitive gaps lay in direct OpenTelemetry integration and seamless runtime logger switching. Our highest-ROI recommendation is to formalize thread-safe async transport modules that automatically inject trace diagnostics.",
      projectOverview: {
        purpose: "Super-fast, low-overhead Node.js and browser JSON console logger.",
        targetUsers: "Backend server architects, microservices developers, and site reliability engineers.",
        techStack: ["Node.js", "TypeScript", "C++ bindings", "Workers Thread Pool"],
        strengths: ["Highly performant string serialization", "Extensible multi-threaded logs destination transports", "Extremely low execution CPU bottlenecks"]
      },
      competitors: [
        {
          name: "Bun.write / Console",
          url: "https://bun.sh",
          popularity: "★ 48,000+ stars | Native modern runtime",
          positioning: "Native fast I/O logging stream integrated directly within the Bun JavaScript runtime engine.",
          strengths: "Extreme speed driven by Zig-based low-level implementations bypassing typical Node.js streams frameworks."
        },
        {
          name: "Winston",
          url: "https://github.com/winstonjs/winston",
          popularity: "★ 22,000+ stars | Legacy standard bearer",
          positioning: "Most versatile multi-transport logger framework, featuring color customization and custom formatting layers.",
          strengths: "Massive preconfigured plugin library, supporting dozens of third-party logging vendor cloud transports synchronously."
        }
      ],
      featureMatrix: [
        {
          category: "Performance",
          featureName: "Zero-Overhead Log Rotation Transports",
          targetState: "Partial: Relies on auxiliary shell pipes or worker threads that consume extra memory.",
          competitors: [
            { name: "Winston", state: "Full: Native file rotators managed recursively in-process" },
            { name: "Bun.write", state: "Full: Incredibly optimized native platform system calls" }
          ],
          differentiation: "Expose a native Rust-based napi-rs binary logging helper module to perform non-blocking thread rotations."
        }
      ],
      gapAnalysis: {
        criticalGaps: [
          "Absence of zero-configuration OpenTelemetry span tracing context automatic ingestion.",
          "Thread creation overhead in small Serverless functions (FaaS limits)."
        ],
        quickWins: [
          "Optimize formatting structures for standard local console outputs.",
          "Provide native typed definitions for ESM-wrapped Pino extensions."
        ],
        highValueStrategic: [
          "Collaborate with runtime providers to bake Pino serializers directly into compile bundles.",
          "Build specialized serverless log streams optimized for AWS Lambda and Google Cloud Functions."
        ],
        existingStrengths: [
          "Billion-dollar reliability, processing petabytes of log indices worldwide without memory leaks.",
          "Excellent custom transport worker orchestration architecture."
        ]
      },
      roadmap: [
        {
          featureName: "OpenTelemetry Context Automatic Extraction",
          priority: "P0",
          estimatedEffort: "Low",
          expectedImpact: "High",
          rationale: "Microservices require tracing across API clusters. Making tracing transparent keeps Pino the undisputed platform choice.",
          highLevelApproach: "Utilize Node's `AsyncLocalStorage` to query active spans and automatically inject traces into the log trace block."
        }
      ],
      detailedSuggestions: [
        {
          itemName: "OpenTelemetry Context Automatic Extraction",
          value: "Bridges async-context and serialization hooks in thread transports.",
          architecture: "Integrates with diagnostic local storage chains.",
          fileChanges: "/src/otel-transport.ts (New), server.ts (Modify)",
          recommendations: "npm install @opentelemetry/api",
          risks: "Potential memory leak if async diagnostic chains are not properly closed on response termination.",
          steps: [
            "Establish active trace locator referencing AsyncLocalStorage.",
            "Write custom serializer to parse trace strings inside log envelopes."
          ]
        }
      ],
      risksAndEthics: {
        technicalRisks: "Worker threads utilized in custom transports can crash if overall Node process memory limit is exceeded.",
        dependencyConsiderations: "Avoid importing heavy external tracing packages inside browser/client build pathways.",
        githubHygiene: "Set up automated benchmark workflows in GitHub Actions to catch performance regressions on every commit.",
        nextSteps: [
          "Assess benchmark speeds on AsyncLocalStorage lookup loops.",
          "Validate logs output under high-traffic multi-threaded API requests."
        ]
      },
      agentPrompt: "## Role & Instructions\nYou are an autonomous agent building Pino OTEL tracking structures. Locate context inside: /src/otel-transport.ts\n\n## Goal:\nBind trace identifiers in AsyncLocalStorage synchronously and serialize under 5ms latency.",
      fullMarkdownReport: `# Competitive Intelligence Report: Pino JS\n\n### 1. Executive Summary\nPino delivers unparalleled logging throughput but requires zero-config enterprise observability features...`
    };
  }

  if (repoNameLower.includes("drizzle")) {
    return {
      repoUrl,
      analyzedAt,
      githubMetadata: baseMetadata,
      executiveSummary: "Drizzle ORM has captured developer mindshare by emphasizing raw SQL alignment and zero-abstraction TypeScript layouts. The primary remaining competitive gaps lay in automated database relationships schemas visualization and robust multi-column join queries. Our highest-ROI recommendation is to integrate automated schema visualizations and a simplified, safer migration orchestration runner.",
      projectOverview: {
        purpose: "TypeScript-first ORM mapping relational databases to sql-like declaration structures.",
        targetUsers: "TypeScript developers, serverless database engineers, and performance-critical database administrators.",
        techStack: ["TypeScript", "SQL dialect translators", "Drizzle kit schema watchdog"],
        strengths: ["Compile-time SQL syntax safety", "Zero runtime parsing abstractions mirroring database speed", "Instant schema migrations processing"]
      },
      competitors: [
        {
          name: "Prisma ORM",
          url: "https://github.com/prisma/prisma",
          popularity: "★ 38,000+ stars | Highly venture-funded standard",
          positioning: "Schema-driven object relational mapper running a dedicated custom rust query engine builder.",
          strengths: "Auto-generated client models, incredible developer UI, automated connection pool tuning, and visual schema model designs."
        },
        {
          name: "TypeORM",
          url: "https://github.com/typeorm/typeorm",
          popularity: "★ 32,000+ stars | Legacy database driver",
          positioning: "Traditional Java-style decorator-driven object relational mapping system supporting active record designs.",
          strengths: "Supports massive enterprise architectures and complex multi-inheritance entity relational schemas."
        }
      ],
      featureMatrix: [
        {
          category: "Developer Experience",
          featureName: "Interactive Schema Visualizer Interface",
          targetState: "None: Relies on command-line tools (Drizzle Kit Studio) without interactive relationship diagram tools.",
          competitors: [
            { name: "Prisma ORM", state: "Full: Prisma Schema Visualizers available on premium cloud structures" },
            { name: "TypeORM", state: "Partial: Third-party UML database diagram extensions" }
          ],
          differentiation: "Publish an open-source visualizer helper in Drizzle Kit that creates a responsive relational canvas (using D3 or Konva) inside local environments."
        }
      ],
      gapAnalysis: {
        criticalGaps: [
          "Doesn't support automatic relationship visual schema mapping in standard IDE tools.",
          "Advanced dynamic queries require raw SQL insertions, creating syntax leak risks."
        ],
        quickWins: [
          "Bake direct performance metrics into database scan terminals.",
          "Add standardized templates for PostgreSQL extension indexing schemas."
        ],
        highValueStrategic: [
          "Establish high-ROI multi-region serverless connection pooling adapters natively.",
          "Formulate complete offline local WebAssembly SQL translation playground structures."
        ],
        existingStrengths: [
          "Unbeatable TypeScript inference speed - no code generation builds required.",
          "Pure SQL design translates immediately to database optimization skills."
        ]
      },
      roadmap: [
        {
          featureName: "Relational Schema Canvas Visualizer Studio",
          priority: "P0",
          estimatedEffort: "High",
          expectedImpact: "High",
          rationale: "Visual visualization is Prisma's largest developer experience moat. Defeating Prisma requires matched visual clarity.",
          highLevelApproach: "Analyze exported meta schemas to render a responsive relational UML tree directly within the local developer environment."
        }
      ],
      detailedSuggestions: [
        {
          itemName: "Relational Schema Canvas Visualizer Studio",
          value: "Transforms meta JSON index arrays into an interactive diagram.",
          architecture: "Builds a reactive server-side JSON endpoint feeding a frontend canvas visualization tool.",
          fileChanges: "/src/db-schema-visualizer.ts (New), drizzle.config.ts (Modify)",
          recommendations: "npm install d3 (to handle relational node layouts beautifully)",
          risks: "Huge recursive relationships databases might encounter browser layout freeze constraints.",
          steps: [
            "Read local drizzle schema files to extract tables, datatypes, and foreign keys.",
            "Map objects into structured D3 node link arrays.",
            "Render interactive workspace allowing developers to toggle relationships."
          ]
        }
      ],
      risksAndEthics: {
        technicalRisks: "Corrupted schema model exports can break visualizer node graphs. Safeguard against null relationship keys.",
        dependencyConsiderations: "Keep canvas rendering libraries completely modularized to avoid expanding production server deployment sizes.",
        githubHygiene: "Perform automatic migrations consistency verification before PR approvals on GitHub.",
        nextSteps: [
          "Establish table node extractor parsing modules.",
          "Review diagram rendering layouts with deep test schemas."
        ]
      },
      agentPrompt: "## Role & Instructions\nYou are an autonomous agent implementing Drizzle Relations Studio. View instructions inside: /src/db-schema-visualizer.ts\n\n## Requirements:\nExtract schema keys from local JS definitions, generate logical node linkages, and export a clean relational model representation.",
      fullMarkdownReport: `# Competitive Discovery: Drizzle ORM\n\n### 1. Executive Summary\nDrizzle offers unmatched speed but lacks visual developer environments. Building Schema Studio will eliminate Prisma's key strategic advantage...`
    };
  }

  // --- GENERAL/GENERIC RUNTIME FALLBACK GENERATOR ---
  // Delegates to modular base generator for maintainability (item 21)
  return generateBaseFallbackReport(owner, repo, metadata);
}
