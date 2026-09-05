import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('has no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  const blocked = results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
  expect(blocked).toEqual([]);
});
