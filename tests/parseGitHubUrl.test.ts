import { describe, it, expect } from 'vitest';
import { parseGitHubUrl } from '../utils/parseGitHubUrl';

describe('parseGitHubUrl', () => {
  it('parses short owner/repo', () => {
    expect(parseGitHubUrl('facebook/react')).toEqual({ owner: 'facebook', repo: 'react' });
  });

  it('parses full https url', () => {
    expect(parseGitHubUrl('https://github.com/vercel/next.js')).toEqual({ owner: 'vercel', repo: 'next.js' });
  });

  it('parses with .git suffix', () => {
    expect(parseGitHubUrl('https://github.com/pinojs/pino.git')).toEqual({ owner: 'pinojs', repo: 'pino' });
  });

  it('parses with trailing slash', () => {
    expect(parseGitHubUrl('https://github.com/drizzle-team/drizzle-orm/')).toEqual({ owner: 'drizzle-team', repo: 'drizzle-orm' });
  });

  it('handles subpaths like /tree/main or /issues', () => {
    expect(parseGitHubUrl('https://github.com/remix-run/react-router/tree/main')).toEqual({ owner: 'remix-run', repo: 'react-router' });
    expect(parseGitHubUrl('owner/repo/issues/123')).toEqual({ owner: 'owner', repo: 'repo' });
  });

  it('handles query params and fragments', () => {
    expect(parseGitHubUrl('https://github.com/tanstack/router?tab=readme')).toEqual({ owner: 'tanstack', repo: 'router' });
  });

  it('is case insensitive', () => {
    expect(parseGitHubUrl('GitHub.COM/OWNER/Repo')).toEqual({ owner: 'OWNER', repo: 'Repo' });
  });

  it('returns null for invalid inputs', () => {
    expect(parseGitHubUrl('')).toBeNull();
    expect(parseGitHubUrl('just-a-word')).toBeNull();
    expect(parseGitHubUrl('https://example.com/not/github')).toBeNull();
    expect(parseGitHubUrl(undefined as any)).toBeNull();
    expect(parseGitHubUrl(null as any)).toBeNull();
  });

  it('handles ssh style', () => {
    expect(parseGitHubUrl('git@github.com:facebook/react.git')).toEqual({ owner: 'facebook', repo: 'react' });
  });
});
