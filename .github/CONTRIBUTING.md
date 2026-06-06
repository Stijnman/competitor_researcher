# Contributing to CompetitiveGitHubMaster

Thank you for your interest in improving CompetitiveGitHubMaster!

## Development Setup

1. Clone the repo
2. `npm install`
3. Copy `.env.example` to `.env.local` and add your `GEMINI_API_KEY`
4. `npm run dev`

## Pull Requests

- Keep PRs focused (one feature or fix per PR when possible).
- Update or add relevant documentation.
- Run `npm run lint` (type check) before submitting.
- For UI changes, consider responsiveness and the dark GitHub-inspired theme.

## Reporting Issues

Use the issue templates when available. Include:

- Clear reproduction steps or the repo URL you analyzed
- Expected vs actual behavior
- Browser / Node version if relevant
- Whether you were using a real Gemini key or the built-in fallback

## Code Style

- TypeScript strictness is increasing — prefer explicit types.
- Prefer functional components + hooks in React.
- Server code lives in `server.ts` (being modularized over time).

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
