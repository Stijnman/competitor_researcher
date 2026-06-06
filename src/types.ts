export interface GitHubMetadata {
  owner: string;
  repo: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  language: string;
  readme?: string;
  errorMessage?: string;
}

export interface Competitor {
  name: string;
  url: string;
  popularity: string;
  positioning: string;
  strengths: string;
}

export interface FeatureComparison {
  category: string;
  featureName: string;
  targetState: string;
  competitors: { name: string; state: string }[];
  differentiation: string;
}

export interface GapAnalysis {
  criticalGaps: string[];
  quickWins: string[];
  highValueStrategic: string[];
  existingStrengths: string[];
}

export interface RoadmapItem {
  featureName: string;
  priority: "P0" | "P1" | "P2";
  estimatedEffort: "Low" | "Medium" | "High";
  expectedImpact: "Low" | "Medium" | "High";
  rationale: string;
  highLevelApproach: string;
}

export interface DetailedSuggestion {
  itemName: string;
  value: string;
  architecture: string;
  fileChanges: string;
  recommendations: string;
  risks: string;
  steps: string[];
}

export interface AnalysisResult {
  repoUrl: string;
  analyzedAt: string;
  githubMetadata: GitHubMetadata;
  executiveSummary: string;
  projectOverview: {
    purpose: string;
    targetUsers: string;
    techStack: string[];
    strengths: string[];
  };
  competitors: Competitor[];
  featureMatrix: FeatureComparison[];
  gapAnalysis: GapAnalysis;
  roadmap: RoadmapItem[];
  detailedSuggestions: DetailedSuggestion[];
  risksAndEthics: {
    technicalRisks: string;
    dependencyConsiderations: string;
    githubHygiene: string;
    nextSteps: string[];
  };
  agentPrompt: string; // The v3.1 standalone instruction prompt
  fullMarkdownReport: string; // The complete 8-section report in clean markdown
  isFallback?: boolean;
  fallbackReason?: string;
}

export interface SavedAnalysis {
  id: string;
  repoUrl: string;
  owner: string;
  repo: string;
  analyzedAt: string;
  stars: number;
}
