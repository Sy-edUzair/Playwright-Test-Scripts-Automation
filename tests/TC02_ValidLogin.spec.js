import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../test-data/testData';

test('Should login successfully with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  await expect(page).toHaveURL(/SearchHotel|index/i, { timeout: 10000 });
  await expect(page.locator('body')).toContainText(/Search Hotel|Hello/i);
  console.log('Login successful – redirected to Search Hotel page');
});
