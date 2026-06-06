import { test, expect } from '@playwright/test';

test.describe('CompetitiveGitHubMaster basic flow', () => {
  test('loads the dashboard and shows example buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Competitive GitHub Master/i })).toBeVisible();
    await expect(page.getByText('Analyze & Strategize')).toBeVisible();
    // Example project buttons
    await expect(page.getByRole('button', { name: /react-router/i })).toBeVisible();
  });

  // More advanced e2e would require a running backend + API key or mock mode.
  // For now this serves as a smoke test skeleton (item 8).
});
