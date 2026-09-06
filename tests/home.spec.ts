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

test('keeps the desktop navigation centered in a rounded capsule', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Main navigation' });
  const box = await navigation.boundingBox();
  expect(Math.abs((box!.x + box!.width / 2) - 720)).toBeLessThan(4);
  expect(await navigation.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderTopLeftRadius))).toBeGreaterThanOrEqual(24);
});

test('keeps the header free of a bottom divider while preserving the nav capsule', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.site-header')).toHaveCSS('border-bottom-width', '0px');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toHaveCSS('border-top-left-radius', '999px');
});

test('removes the redundant start a project link from both navigations', async ({ page }) => {
  await page.goto('/');
  const desktopNavigation = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(desktopNavigation.getByRole('link', { name: 'Start a project' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: "Let's Talk" }).first()).toHaveAttribute('href', '#contact');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(mobileNavigation.getByRole('link', { name: 'Start a project' })).toHaveCount(0);
  await expect(mobileNavigation.getByRole('link', { name: "Let's Talk" })).toHaveAttribute('href', '#contact');
});

test('keeps the mobile menu region available to its disclosure button', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Open menu' });
  const mobileNavigation = page.locator('#mobile-navigation');
  await expect(mobileNavigation).toHaveCount(1);
  await expect(mobileNavigation).toBeHidden();
  await expect(menu).toHaveAttribute('aria-controls', 'mobile-navigation');
  await menu.click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
});

test('uses the supplied Cinqode wordmark in the site branding', async ({ page }) => {
  await page.goto('/');
  const homeLinks = page.getByRole('link', { name: 'Cinqode home' });
  await expect(homeLinks).toHaveCount(2);
  await expect(homeLinks.first().getByRole('img', { name: 'Cinqode' })).toHaveAttribute('src', /cinqode-wordmark/);
  await expect(homeLinks.last().getByRole('img', { name: 'Cinqode' })).toHaveAttribute('src', /cinqode-wordmark/);
});

test('uses the supplied Cinqode icon as the browser favicon', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('head link[rel="icon"]')).toHaveAttribute('href', /\/icon\.png(?:\?|$)/);
});

test('hero CTAs navigate to the intended sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Explore Services' })).toHaveAttribute('href', '#services');
  await expect(page.getByRole('link', { name: 'View Our Work' })).toHaveAttribute('href', '#work');
});

test('offers an interactive service selector and complete stats', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 2, name: 'Our Services' })).toBeVisible();
  await expect(page.getByRole('tab')).toHaveCount(10);
  await page.getByRole('tab', { name: 'Web Development' }).click();
  await expect(page.getByRole('tab', { name: 'Web Development' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText(/Modern web platforms engineered/)).toBeVisible();
  await expect(page.locator('.stats dl')).toContainText('98%');
  await expect(page.getByText('Client Satisfaction')).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /Ready to Build Something Amazing/i })).toBeVisible();
});

test('replaces the service detail panel when a new service is selected', async ({ page }) => {
  await page.goto('/#services');
  const detail = page.getByTestId('service-detail');
  await expect(detail).toHaveAttribute('data-service', 'AI Chatbot');

  await page.getByRole('tab', { name: 'Web Development' }).click();
  await expect(detail).toHaveAttribute('data-service', 'Web Development');
  await expect(detail.getByText(/Modern web platforms engineered/)).toBeVisible();
});

test('updates the service preview image for the selected service', async ({ page }) => {
  await page.goto('/#services');
  const preview = page.getByTestId('service-detail').getByRole('img');
  await expect(preview).toHaveAttribute('src', /ai-chatbot-preview/);

  await page.getByRole('tab', { name: 'Web Development' }).click();
  await expect(preview).toHaveAttribute('src', /web-development-preview/);
});

test('keeps the services selector usable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#services');
  await page.getByRole('tab', { name: 'Web Development' }).click();
  await expect(page.getByRole('tab', { name: 'Web Development' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText(/Modern web platforms engineered/)).toBeVisible();
  expect(await page.locator('.services-list').evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
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
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
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
