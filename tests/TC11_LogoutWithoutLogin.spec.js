import { test, expect } from '@playwright/test';

test.describe('TC11 (Negative) – Logout Without Login', () => {

  test('Should redirect to login page when accessing protected pages without login', async ({ page }) => {
    await page.goto('https://adactinhotelapp.com/SearchHotel.php');
    const url = page.url();
    const bodyText = await page.locator('body').textContent();

    const isRedirectedToLogin =
      url.includes('index') ||
      url.includes('login') ||
      url.includes('Login') ||
      bodyText.toLowerCase().includes('username') ||
      bodyText.toLowerCase().includes('password') ||
      bodyText.toLowerCase().includes('login');

    expect(isRedirectedToLogin).toBeTruthy();
    console.log(`Unauthenticated access correctly redirected. Current URL: ${url}`);
  });

  test('Should handle direct logout URL access without being logged in', async ({ page }) => {
    await page.goto('https://adactinhotelapp.com/Logout.php');

    const url = page.url();
    const bodyText = await page.locator('body').textContent();
    const isHandledCorrectly =
      url.includes('index') ||
      url.includes('login') ||
      bodyText.toLowerCase().includes('username') ||
      bodyText.toLowerCase().includes('login') ||
      bodyText.toLowerCase().includes('logged out') ||
      await page.locator('#username').isVisible().catch(() => false);

    expect(isHandledCorrectly).toBeTruthy();
    console.log(`Unauthenticated logout attempt handled correctly. URL: ${url}`);
  });

});
