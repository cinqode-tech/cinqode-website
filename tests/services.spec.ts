import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('lists every service as a link to its own detail page', async ({ page }) => {
  await page.goto('/services');
  const cards = page.locator('.service-card');
  await expect(cards).toHaveCount(10);
  await expect(page.locator('.service-card[href="/services/wordpress-development"]')).toHaveCount(1);
  await expect(page.locator('.service-card[href="/services/windows-server-management"]')).toHaveCount(1);
});

test('opens a service detail page when a card is clicked', async ({ page }) => {
  await page.goto('/services');
  await page.locator('.service-card', { hasText: 'Graphic Design' }).click();

  await expect(page).toHaveURL(/\/services\/graphic-design$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Graphic Design' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Overview' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: "What's included" })).toBeVisible();
  await expect(page.getByText('Logo & brand identity')).toBeVisible();
});

test('renders a service detail page on direct navigation and returns to the grid', async ({ page }) => {
  await page.goto('/services/wordpress-development');

  await expect(page.getByRole('heading', { level: 1, name: 'WordPress Development' })).toBeVisible();
  await expect(page.getByText(/We create professional, responsive/)).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Explore more services' })).toBeVisible();
  await expect(page.locator('.service-more-link')).toHaveCount(9);

  await page.locator('.service-back').click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator('.service-card')).toHaveCount(10);
});

test('returns 404 for a service slug that does not exist', async ({ page }) => {
  const response = await page.goto('/services/not-a-real-service');
  expect(response?.status()).toBe(404);
});

test('links the homepage service panel to the matching detail page', async ({ page }) => {
  await page.goto('/#services');
  await expect(page.getByRole('link', { name: /Explore AI Chatbot services/ }))
    .toHaveAttribute('href', '/services/ai-chatbot');
});

test('service detail page has no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('/services/windows-server-management');
  const results = await new AxeBuilder({ page }).analyze();
  const blocked = results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
  expect(blocked).toEqual([]);
});
