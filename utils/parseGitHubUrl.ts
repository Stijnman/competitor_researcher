/**
 * Robust GitHub URL parser.
 * Supports:
 * - https://github.com/owner/repo
 * - github.com/owner/repo
 * - owner/repo
 * - URLs with trailing paths (/tree/main, /issues/123, /blob/...)
 * - Trailing slashes, .git suffix, query strings, fragments
 * - Case insensitivity for owner/repo names
 */
export interface ParsedGitHubRepo {
  owner: string;
  repo: string;
}

export function parseGitHubUrl(input: string | undefined | null): ParsedGitHubRepo | null {
  if (!input || typeof input !== "string") return null;

  let s = input.trim();

  // SSH git@host:owner/repo.git
  s = s.replace(/^git@([^:]+):/i, 'https://$1/');

  // Drop protocol + optional www
  s = s.replace(/^https?:\/\//i, '');
  s = s.replace(/^www\./i, '');

  // Drop .git, trailing slashes, query, hash
  s = s.replace(/\.git$/i, '');
  s = s.replace(/\/+$/, '');
  s = s.split(/[?#]/)[0];

  // If a host is present, keep only the path after the first /
  // Special case: only accept github.com (or treat bare owner/repo as valid)
  const ghPathMatch = s.match(/github\.com\/(.+)$/i);
  if (ghPathMatch) {
    s = ghPathMatch[1];
  } else if (s.includes('/') && /^[a-z0-9_.-]+\/[a-z0-9_.-]+/i.test(s)) {
    // Looks like owner/repo already (short form or non-github host we still allow for flexibility)
    // continue
  } else if (s.includes('.')) {
    // Has a dot that looks like a host but not github -> probably invalid (e.g. example.com/...)
    // But allow if it reduced to two segments
  }

  const segments = s.split('/').filter(Boolean);

  if (segments.length < 2) return null;

  // Take the *first* two path segments. This handles /owner/repo , /owner/repo/tree/..., owner/repo/issues/...
  let owner = segments[0];
  let repo = segments[1];

  repo = repo.replace(/\.git$/i, '');

  // Reject obvious junk
  if (!owner || !repo || owner.length < 1 || repo.length < 1) return null;
  if (owner === 'github.com' || repo === 'github.com') return null;

  // Reject URLs that look like they have a real domain as the first segment but weren't github
  const looksLikeDomain = /^[a-z0-9-]+\.[a-z]{2,}/i.test(owner);
  if (looksLikeDomain && !input.toLowerCase().includes('github.com')) {
    return null;
  }

  return { owner, repo };
}
