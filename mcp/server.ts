/**
 * Basic MCP Server for CompetitiveGitHubMaster (best feature)
 *
 * Exposes the analysis as MCP tools for Claude Code, Cursor, etc.
 * Run with: npx tsx mcp/server.ts (for stdio) or integrate with fastmcp / mcp sdk.
 *
 * Tools:
 * - analyze_repo: Run competitive analysis on a GitHub repo
 * - get_health: Server health
 */

import { generateFallbackReport } from '../fallbackGenerator';
import { parseGitHubUrl } from '../utils/parseGitHubUrl';

interface MCPTool {
  name: string;
  description: string;
  inputSchema: any;
}

const tools: MCPTool[] = [
  {
    name: 'analyze_repo',
    description: 'Perform competitive GitHub repo analysis and return structured report + agent prompt. Uses real AI if server available, otherwise high-quality local fallback.',
    inputSchema: {
      type: 'object',
      properties: {
        repo: { type: 'string', description: 'GitHub repo in owner/repo or full URL format' },
        customInstructions: { type: 'string', description: 'Optional additional focus for the analysis' }
      },
      required: ['repo']
    }
  },
  {
    name: 'get_health',
    description: 'Check if the competitive analysis service is healthy',
    inputSchema: { type: 'object', properties: {} }
  }
];

async function handleToolCall(name: string, args: any) {
  if (name === 'get_health') {
    return { content: [{ type: 'text', text: JSON.stringify({ status: 'ok', mockMode: !process.env.GEMINI_API_KEY }) }] };
  }

  if (name === 'analyze_repo') {
    const { repo, customInstructions } = args;
    const parsed = parseGitHubUrl(repo) || { owner: 'unknown', repo: 'target' };
    const repoUrl = `https://github.com/${parsed.owner}/${parsed.repo}`;

    // Try to hit local server for real analysis
    try {
      const res = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl, customInstructions })
      });
      if (res.ok) {
        const data = await res.json();
        return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
      }
    } catch {}

    // Fallback
    const result = generateFallbackReport(parsed.owner, parsed.repo, null);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  }

  throw new Error(`Unknown tool: ${name}`);
}

// Very basic stdio MCP loop (for demo; real impl would use @modelcontextprotocol/sdk)
console.error('Competitor Researcher MCP server stub started. Use with compatible MCP client.');
process.stdin.on('data', async (data) => {
  try {
    const msg = JSON.parse(data.toString());
    if (msg.method === 'tools/list') {
      process.stdout.write(JSON.stringify({ tools }) + '\n');
    } else if (msg.method === 'tools/call') {
      const result = await handleToolCall(msg.params.name, msg.params.arguments || {});
      process.stdout.write(JSON.stringify({ result }) + '\n');
    }
  } catch (e) {
    // ignore for stub
  }
});
