import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../test-data/testData';

test.describe('TC06 (Positive) – Successful Logout After Booking', () => {

  test('Should logout successfully and redirect to login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/SearchHotel|index/i, { timeout: 10000 });
    await loginPage.logout();

    await expect(page).toHaveURL(/Logout|index|Login/i, { timeout: 10000 });
    await expect(page.locator('body')).toContainText("You have successfully logged out");
    await loginPage.gotoIndexfterlogout();
    await expect(page).toHaveURL(/index/i, { timeout: 10000 });

    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();

    console.log('User logged out successfully and redirected to login page');
  });

});
