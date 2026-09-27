import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders the about page from the main navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About' }).click();

  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('One Vision');
  await expect(page.getByRole('heading', { level: 2, name: 'How It All Started' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Meet the Founders' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'What Makes Cinqode Different?' })).toBeVisible();
});

test('lists the four founders with their roles', async ({ page }) => {
  await page.goto('/about');
  const founders = page.locator('.about-founder');
  await expect(founders).toHaveCount(4);
  await expect(founders.nth(0)).toContainText('Zaid Iqbal');
  await expect(founders.nth(0)).toContainText('Co-Founder · AI & Software');
  await expect(founders.nth(3)).toContainText('Usman Manzoor');
});

test('walks the four story milestones in order', async ({ page }) => {
  await page.goto('/about');
  const milestones = page.locator('.about-timeline li');
  await expect(milestones).toHaveCount(4);
  await expect(milestones.nth(0)).toContainText('The Idea');
  await expect(milestones.nth(3)).toContainText("What's Next");
});

test('meet our team button scrolls to the founders', async ({ page }) => {
  await page.goto('/about');
  await page.getByRole('link', { name: 'Meet Our Team' }).click();
  await expect(page.locator('section#team')).toBeInViewport();
});

test('about page has no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('/about');
  const results = await new AxeBuilder({ page }).analyze();
  const blocked = results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
  expect(blocked).toEqual([]);
});
