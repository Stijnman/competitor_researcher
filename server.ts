import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { generateFallbackReport } from "./fallbackGenerator";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // Extract owner and repo names from various GitHub URL formats
  function parseGitHubUrl(url: string) {
    const trimmed = url.trim();
    // Match github.com/owner/repo
    const githubRegex = /github\.com\/([^/]+)\/([^/&#?]+)/i;
    const match = trimmed.match(githubRegex);
    if (match) {
      return { owner: match[1], repo: match[2].replace(/\.git$/i, "") };
    }

    // Match short format: owner/repo
    const shortRegex = /^([^/]+)\/([^/]+)$/;
    const shortMatch = trimmed.match(shortRegex);
    if (shortMatch) {
      return { owner: shortMatch[1], repo: shortMatch[2] };
    }

    return null;
  }

  // API endpoint for GitHub Repository Metadata
  app.get("/api/repo-info", async (req, res) => {
    try {
      const { url } = req.query;
      if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "Missing 'url' parameter" });
      }

      const parsed = parseGitHubUrl(url);
      if (!parsed) {
        return res
          .status(400)
          .json({
            error:
              "Invalid GitHub Repository URL or format. Use 'owner/repo' or full github.com link.",
          });
      }

      const headers: HeadersInit = {
        "User-Agent": "CompetitiveGitHubMaster-App",
      };

      if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
      }

      const repoRes = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
        headers,
      });
      if (!repoRes.ok) {
        return res.status(404).json({
          error: `Could not find GitHub repository: ${parsed.owner}/${parsed.repo}. Please check correctness.`,
          fallbackParsed: parsed,
        });
      }

      const data = await repoRes.json();
      const defaultBranch = data.default_branch || "main";

      // Attempt to fetch README
      let readme = "";
      try {
        const readmeRes = await fetch(
          `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/${defaultBranch}/README.md`,
          { headers }
        );
        if (readmeRes.ok) {
          readme = await readmeRes.text();
          if (readme.length > 5000) {
            readme = readme.substring(0, 5000) + "\n\n[... truncated for length ...]";
          }
        }
      } catch (readmeErr) {
        console.error("Failed to fetch README:", readmeErr);
      }

      res.json({
        owner: parsed.owner,
        repo: parsed.repo,
        description: data.description || "No description provided.",
        stars: data.stargazers_count,
        forks: data.forks_count,
        openIssues: data.open_issues_count,
        language: data.language || "Unknown",
        readme: readme || "No README content found.",
      });
    } catch (err: any) {
      console.error("Error in repo-info endpoint:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  });

  // API endpoint for executing Competitive Market Intelligence using Gemini
  app.post("/api/analyze", async (req, res) => {
    const { repoUrl, customInstructions, githubMetadata } = req.body;
    if (!repoUrl) {
      return res.status(400).json({ error: "Missing 'repoUrl' parameter" });
    }

    const parsed = parseGitHubUrl(repoUrl) || { owner: "Unknown", repo: "TargetRepository" };

    try {
      // Base user message constructing all available facts
      const repoDetails = githubMetadata
        ? `Owner: ${githubMetadata.owner}
Repository: ${githubMetadata.repo}
Stars: ${githubMetadata.stars}
Forks: ${githubMetadata.forks}
Open Issues: ${githubMetadata.openIssues}
Primary Language: ${githubMetadata.language}
Description: ${githubMetadata.description}
README Outline: 
${githubMetadata.readme || "Not Available"}`
        : `Repository URL: ${repoUrl} (No metadata fetched due to API fallback)`;

      const userInstructionsPart = customInstructions
        ? `\nAdditional Focus / Instructions: ${customInstructions}`
        : "";

      const rootInstruction = `You are CompetitiveGitHubMaster (v3.1), the world's most rigorous GitHub product strategist.
You combine deep repository analysis with Google Search competitive intelligence to deliver feature parity + meaningful differentiation.

Analyze this target repository:
${repoDetails}
${userInstructionsPart}

Your goal is to perform a detailed technical and strategic competitive analysis comparing this repository with 3 to 5 key competitors.
To ensure realism and accuracy, use Google Search Grounding to find actual competitors, their actual naming, star-counts, strengths, and positioning today. Do not hallucinate competitors or stats.

You MUST produce a JSON response adhering EXACTLY to the requested schema. Ensure all fields are fully filled with real strategic insights and actionable bullet points. Do not write mock or placeholder text (e.g., do not say 'as described above' or list empty blocks).

The 'fullMarkdownReport' property must be a clean, cohesive, fully formatted markdown document containing exactly the standard 8 sections of the CompetitiveGitHubMaster protocol:
1. Executive Summary
2. Target Project Overview
3. Competitors Identified
4. Feature Comparison Matrix
5. Gap Analysis
6. Prioritized Implementation Roadmap
7. Detailed Implementation Suggestions
8. Risks, Ethics & Next Steps

The 'agentPrompt' property must contain exactly the copy-paste-ready standalone autonomous agent prompt in a markdown block as outlined in the ULTIMATE CompetitiveGitHubMaster prompt:
- Standalone autonomous code-agent prompt v3.1
- Clear acceptance criteria for P0 and P1 iterations
- Folder structure modifications
- Production launch commands (e.g. ready-to-run gh CLI issue creation scripts)
- Detailed QA check list for tests

Execute this with peak precision! Make sure the tone is mature, technical, objective, and deeply comprehensive.`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          executiveSummary: {
            type: Type.STRING,
            description:
              "3-5 sentences summarizing current state, largest competitive gaps, and the highest-ROI recommendation.",
          },
          projectOverview: {
            type: Type.OBJECT,
            properties: {
              purpose: {
                type: Type.STRING,
                description: "Purpose and primary user personas of the repository",
              },
              targetUsers: { type: Type.STRING, description: "Detailed target user description" },
              techStack: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Explicit technical stack detected",
              },
              strengths: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Key strengths worth amplifying",
              },
            },
            required: ["purpose", "targetUsers", "techStack", "strengths"],
          },
          competitors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Name of the competitor project" },
                url: { type: Type.STRING, description: "Public repository or web link" },
                popularity: {
                  type: Type.STRING,
                  description: "Stars, popularity metrics, or active community description",
                },
                positioning: {
                  type: Type.STRING,
                  description: "Core positioning or unique approach of this competitor",
                },
                strengths: {
                  type: Type.STRING,
                  description: "Detailed key strengths that target target project lacks",
                },
              },
              required: ["name", "url", "popularity", "positioning", "strengths"],
            },
            description:
              "List of 3 to 5 top directly relevant competitors based on live data search.",
          },
          featureMatrix: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: {
                  type: Type.STRING,
                  description: "Logical category (e.g. Core, Onboarding, Security, Performance)",
                },
                featureName: { type: Type.STRING, description: "Comparing feature" },
                targetState: { type: Type.STRING, description: "Target codebase state/grade" },
                competitors: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      state: { type: Type.STRING, description: "Competitor implementation note" },
                    },
                    required: ["name", "state"],
                  },
                },
                differentiation: {
                  type: Type.STRING,
                  description: "Specific opportunities to beat competitors",
                },
              },
              required: [
                "category",
                "featureName",
                "targetState",
                "competitors",
                "differentiation",
              ],
            },
          },
          gapAnalysis: {
            type: Type.OBJECT,
            properties: {
              criticalGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
              quickWins: { type: Type.ARRAY, items: { type: Type.STRING } },
              highValueStrategic: { type: Type.ARRAY, items: { type: Type.STRING } },
              existingStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["criticalGaps", "quickWins", "highValueStrategic", "existingStrengths"],
          },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                featureName: { type: Type.STRING },
                priority: { type: Type.STRING, description: "P0, P1, or P2" },
                estimatedEffort: { type: Type.STRING, description: "Low, Medium, or High" },
                expectedImpact: { type: Type.STRING, description: "Low, Medium, or High" },
                rationale: { type: Type.STRING },
                highLevelApproach: {
                  type: Type.STRING,
                  description: "Architectural path for coding agent",
                },
              },
              required: [
                "featureName",
                "priority",
                "estimatedEffort",
                "expectedImpact",
                "rationale",
                "highLevelApproach",
              ],
            },
          },
          detailedSuggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                itemName: { type: Type.STRING, description: "Matches name in roadmap" },
                value: { type: Type.STRING },
                architecture: {
                  type: Type.STRING,
                  description: "Design nodes and architectural boundaries",
                },
                fileChanges: {
                  type: Type.STRING,
                  description: "Required files to create or modify",
                },
                recommendations: {
                  type: Type.STRING,
                  description: "Recommended library or framework packages",
                },
                risks: {
                  type: Type.STRING,
                  description: "Security/maintenance risks or considerations",
                },
                steps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Sequential execution roadmap steps",
                },
              },
              required: [
                "itemName",
                "value",
                "architecture",
                "fileChanges",
                "recommendations",
                "risks",
                "steps",
              ],
            },
          },
          risksAndEthics: {
            type: Type.OBJECT,
            properties: {
              technicalRisks: { type: Type.STRING },
              dependencyConsiderations: { type: Type.STRING },
              githubHygiene: { type: Type.STRING },
              nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["technicalRisks", "dependencyConsiderations", "githubHygiene", "nextSteps"],
          },
          agentPrompt: {
            type: Type.STRING,
            description: "Standalone markdown prompt v3.1 for autonomous coders.",
          },
          fullMarkdownReport: {
            type: Type.STRING,
            description:
              "The complete beautifully formatted 8-section strategic report markdown text.",
          },
        },
        required: [
          "executiveSummary",
          "projectOverview",
          "competitors",
          "featureMatrix",
          "gapAnalysis",
          "roadmap",
          "detailedSuggestions",
          "risksAndEthics",
          "agentPrompt",
          "fullMarkdownReport",
        ],
      };

      let result;
      let isFallback = false;
      let fallbackReason = "";

      if (!geminiApiKey) {
        console.warn(
          "No active GEMINI_API_KEY detected. Moving straight to dynamic sandbox simulator..."
        );
        isFallback = true;
        fallbackReason =
          "No Gemini API access token is registered in the cloud environment. Active local strategic analyzer was automatically initialized to generate results.";
        result = generateFallbackReport(parsed.owner, parsed.repo, githubMetadata);
      } else {
        try {
          console.log(
            `Executing Attempt 1 for: ${parsed.owner}/${parsed.repo} with Google Search grounding...`
          );
          // Attempt 1: Call Gemini with search grounding enabled
          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: rootInstruction,
            config: {
              systemInstruction:
                "You are the world's leading open-source product strategist, software architect, and open-source intelligence expert. You use real, live Google Search data to identify top-tier direct competitors and generate high-ROI roadmaps and precise coding agent guidelines with zero fillers.",
              tools: [{ googleSearch: {} }],
              responseMimeType: "application/json",
              responseSchema: responseSchema,
            },
          });

          const text = response.text;
          if (!text) {
            throw new Error("Empty response returned from Gemini API");
          }
          result = JSON.parse(text.trim());
        } catch (firstErr: any) {
          console.error("First Gemini API attempt with googleSearch failed:", firstErr);
          const errMsg = String(
            firstErr.message || firstErr.status || firstErr.code || ""
          ).toLowerCase();
          const isQuota =
            errMsg.includes("quota") ||
            errMsg.includes("exhausted") ||
            errMsg.includes("429") ||
            errMsg.includes("resource_exhausted");

          if (isQuota) {
            console.warn(
              "Google search-grounding quota limits hit. Retrying compilation WITHOUT search grounding tool..."
            );
            try {
              // Attempt 2: Call Gemini WITHOUT search grounding (vastly less likely to hit 429)
              const response2 = await ai.models.generateContent({
                model: "gemini-3.5-flash",
                contents:
                  rootInstruction +
                  "\n\n(IMPORTANT: Search grounding tool is currently restricted due to quota. Please formulate a highly detailed analysis based exclusively on your pre-trained knowledge base of this repository and its known ecosystem options).",
                config: {
                  systemInstruction:
                    "You are the world's leading open-source product strategist, software architect, and open-source intelligence expert. You use your pre-trained knowledge of software development to identify top competitors and generate high-ROI roadmaps and precise coding agent guidelines with zero fillers.",
                  responseMimeType: "application/json",
                  responseSchema: responseSchema,
                },
              });

              const text2 = response2.text;
              if (!text2) {
                throw new Error("Empty response returned from model during second attempt");
              }
              result = JSON.parse(text2.trim());
            } catch (secondErr: any) {
              console.error("Second Gemini attempt failed:", secondErr);
              isFallback = true;
              fallbackReason = `Gemini rate limits or quota exceeded: ${secondErr.message || "429 exhausted"}. Loaded high-fidelity local strategic analyzer modeling.`;
              result = generateFallbackReport(parsed.owner, parsed.repo, githubMetadata);
            }
          } else {
            console.warn(
              "First attempt failed with non-quota error. Defaulting to local sandbox compiler..."
            );
            isFallback = true;
            fallbackReason = `AI translation error: ${firstErr.message || "Interrupted parsing"}. High-fidelity local strategic analysis modeling loaded.`;
            result = generateFallbackReport(parsed.owner, parsed.repo, githubMetadata);
          }
        }
      }

      res.json({
        repoUrl,
        analyzedAt: new Date().toISOString(),
        githubMetadata: githubMetadata || {
          owner: parsed.owner,
          repo: parsed.repo,
          stars: 0,
          forks: 0,
          openIssues: 0,
          language: "Unknown",
        },
        isFallback,
        fallbackReason,
        ...result,
      });
    } catch (err: any) {
      console.error("Critical error inside /api/analyze controller pipeline:", err);
      // Last-gasp resilient fallback
      try {
        const parsedBackup = parseGitHubUrl(repoUrl) || {
          owner: "Unknown",
          repo: "TargetRepository",
        };
        const fallbackObj = generateFallbackReport(
          parsedBackup.owner,
          parsedBackup.repo,
          githubMetadata
        );
        // Spread fallback first, then overlay control fields (avoids duplicate keys with strict TS)
        res.json({
          ...fallbackObj,
          isFallback: true,
          fallbackReason: `System error caught during scan routine: ${err.message}. Initiated immediate secure local recovery fallback.`,
        });
      } catch (fatalErr: any) {
        res.status(500).json({ error: "Failed to compile repo analysis: " + fatalErr.message });
      }
    }
  });

  // Serve static assets or mount Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CompetitiveGitHubMaster backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
