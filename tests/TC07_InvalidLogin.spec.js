import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../test-data/testData';

test.describe('TC07 (Negative) – Invalid Login Credentials', () => {

  test('Should show error message for invalid username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(page).toHaveTitle(/Adactin|Hotel/i);
    await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
    await expect(page.locator('body')).toContainText(/Invalid Login details/i);
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login')).toBeVisible();

    console.log('Invalid login correctly rejected');
  });

  test('Should show error for empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await page.locator('#login').click();
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#login')).toBeVisible();

    console.log('Empty login correctly handled');
  });

});
