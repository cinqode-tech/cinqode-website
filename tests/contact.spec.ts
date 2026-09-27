import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders the contact page from the main navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact' }).click();

  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText("Let's Make It Real");
  await expect(page.getByRole('heading', { level: 2, name: 'Start a Conversation' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Send Us a Message' })).toBeVisible();
});

test('marks the active navigation item', async ({ page }) => {
  await page.goto('/contact');
  const contact = page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact' });
  await expect(contact).toHaveAttribute('aria-current', 'page');
});

test('collects project details in the contact form', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Your Name *').fill('Ada Lovelace');
  await page.getByLabel('Email Address *').fill('ada@example.com');
  await page.getByLabel('AI / LLM').check();
  await page.getByLabel("Let's discuss").check();
  await page.getByLabel('Tell us about it').fill('A support assistant for our store.');

  await expect(page.getByText('34/1000')).toBeVisible();

  await page.getByRole('button', { name: 'Send Project Brief' }).click();
  await expect(page.getByRole('status')).toContainText('Thanks');
});

test('contact page has no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('/contact');
  const results = await new AxeBuilder({ page }).analyze();
  const blocked = results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
  expect(blocked).toEqual([]);
});
