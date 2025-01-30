import { test, expect } from '@playwright/test';

test('should add a new idea', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[placeholder="What\'s your idea?"]', 'Learn Playwright');
  await page.click('text=Add');
  await expect(page.locator('li')).toHaveText('Learn Playwright');
});