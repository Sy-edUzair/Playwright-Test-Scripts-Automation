import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SearchPage } from '../pages/SearchPage';
import { testData } from '../test-data/testData';

test.describe('TC03 (Positive) – Valid Hotel Search', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/SearchHotel|index/i, { timeout: 10000 });
  });

  test('Should return hotel results with valid search filters', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.searchHotel(testData.search);
    await expect(page).toHaveURL(/SelectHotel|select/i, { timeout: 15000 });
    await expect(page.locator('body')).toContainText(/Hotel Name|Price Per Night|Select Hotel/i);
    const radioButtons = page.locator('input[type="radio"]');
    await expect(radioButtons).not.toHaveCount(0);

    console.log(`Search returned ${await radioButtons.count()} hotel(s)`);
  });

});
