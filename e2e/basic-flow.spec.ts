import { test, expect } from '@playwright/test';

test.describe('CompetitiveGitHubMaster basic flow (Batch 2 E2E enhancement)', () => {
  test('loads the dashboard and shows example buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Competitive GitHub Master/i })).toBeVisible();
    await expect(page.getByText('Analyze & Strategize')).toBeVisible();
    // Example project buttons
    await expect(page.getByRole('button', { name: /react-router/i })).toBeVisible();
  });

  test('verifies repo metadata and triggers analysis (uses mock/fallback)', async ({ page }) => {
    await page.goto('/');
    // Use one of the example buttons to trigger metadata fetch
    await page.getByRole('button', { name: /react-router/i }).click();
    // Wait for metadata card to appear (item 8 E2E enhancement)
    await expect(page.locator('#repo-metadata-card')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/remix-run \/ react-router/i)).toBeVisible();

    // Click analyze
    await page.getByRole('button', { name: /Analyze & Strategize/i }).click();

    // Wait for report or fallback banner
    await expect(page.locator('#report-viewer-root')).toBeVisible({ timeout: 30000 });
    // Check for fallback banner if no key (common in CI)
    const fallback = page.locator('#fallback-notification-banner');
    if (await fallback.isVisible()) {
      await expect(fallback).toContainText(/Simulation Engine|local generator/i);
    }
  });

  // More advanced e2e would require a running backend + API key or mock mode.
  // For now this serves as a smoke test skeleton (item 8).
});