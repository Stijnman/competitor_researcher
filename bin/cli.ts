#!/usr/bin/env node

/**
 * Lightweight CLI for competitor-researcher (item 49 + best features)
 * Usage:
 *   npx tsx bin/cli.ts analyze facebook/react --output json
 *   npx tsx bin/cli.ts analyze facebook/react --output md > report.md
 *
 * For full AI analysis, make sure the dev server is running (npm run dev)
 * or it will fall back to the local generator.
 */

import { Command } from 'commander';
import { generateFallbackReport } from '../fallbackGenerator';
import { parseGitHubUrl } from '../utils/parseGitHubUrl';

const program = new Command();

program
  .name('competitor-researcher')
  .description('CompetitiveGitHubMaster CLI - Analyze GitHub repos for competitive intelligence')
  .version('0.1.0');

program
  .command('analyze <repo>')
  .description('Analyze a GitHub repo (owner/repo or URL)')
  .option('-o, --output <format>', 'Output format: md | json', 'md')
  .option('--server <url>', 'Remote server URL (default: http://localhost:3000)', 'http://localhost:3000')
  .action(async (repo: string, options: { output: string; server: string }) => {
    const parsed = parseGitHubUrl(repo);
    if (!parsed) {
      console.error('Invalid repo. Use owner/repo or full GitHub URL.');
      process.exit(1);
    }

    const { owner, repo: repoName } = parsed;
    const repoUrl = `https://github.com/${owner}/${repoName}`;

    try {
      // Try remote server first for real analysis
      const res = await fetch(`${options.server}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl })
      });

      if (res.ok) {
        const result = await res.json();
        outputResult(result, options.output);
        return;
      }
    } catch (e) {
      // Fall through to local fallback
    }

    // Fallback to local generator (no key needed)
    console.error('Could not reach server, using local fallback generator...');
    const fallback = generateFallbackReport(owner, repoName, null);
    outputResult(fallback, options.output);
  });

function outputResult(result: any, format: string) {
  if (format === 'json') {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(result.fullMarkdownReport || JSON.stringify(result, null, 2));
  }
}

program.parse(process.argv);
