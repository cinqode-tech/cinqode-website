import { expect, test } from '@playwright/test';

test('renders the Cinqode homepage landmark and value proposition', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Cinqode/);
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('We Build Digital Solutions');
});

test('offers a skip link and exposes a labelled main navigation', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
});

test('hero CTAs navigate to the intended sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Explore Services' })).toHaveAttribute('href', '#services');
  await expect(page.getByRole('link', { name: 'View Our Work' })).toHaveAttribute('href', '#work');
});

test('uses a service heading hierarchy and complete stats', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 2, name: 'Our Services' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(10);
  await expect(page.locator('.stats dl')).toContainText('98%');
  await expect(page.getByText('Client Satisfaction')).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /Ready to Build Something Amazing/i })).toBeVisible();
});

test('opens and closes the mobile navigation with a named button', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Open menu' });
  await menu.click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
});

test('keeps navigation targets usable with the sticky header', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#contact')).toHaveCount(1);

  for (const link of await page.locator('.desktop-nav a').all()) {
    const box = await link.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(24);
    expect(box?.height).toBeGreaterThanOrEqual(24);
  }
});

test('moves focus to the selected mobile navigation destination', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Services' }).click();
  await expect(page.locator('section#services')).toBeFocused();
});

test('keeps desktop hero decoration inside its visual boundary', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1200 });
  await page.goto('/');
  const hero = await page.locator('.hero').boundingBox();

  for (const selector of ['.hero-object', '.orbit-a', '.orbit-b', '.tag-cloud']) {
    const box = await page.locator(selector).boundingBox();
    expect(box?.x).toBeGreaterThanOrEqual(hero!.x);
    expect(box!.x + box!.width).toBeLessThanOrEqual(hero!.x + hero!.width + 1);
  }

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test('uses fluid desktop gutters without losing narrow-screen reflow', async ({ page }) => {
  await page.setViewportSize({ width: 1848, height: 1000 });
  await page.goto('/');
  const desktopShell = await page.locator('.header-inner.shell').boundingBox();
  expect(desktopShell?.x).toBeLessThanOrEqual(96);

  await page.setViewportSize({ width: 320, height: 844 });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test('keeps left hero service labels close to the animated icon', async ({ page }) => {
  await page.setViewportSize({ width: 1848, height: 1000 });
  await page.goto('/');
  const icon = await page.locator('.hero-object').boundingBox();

  for (const selector of ['.tag-web', '.tag-design']) {
    const tag = await page.locator(selector).boundingBox();
    expect(icon!.x - (tag!.x + tag!.width)).toBeLessThanOrEqual(32);
  }
});
