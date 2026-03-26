import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SearchPage } from '../pages/SearchPage';
import { testData } from '../test-data/testData';

test.describe('TC08 (Negative) – Search Without Mandatory Fields', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/SearchHotel|index/i, { timeout: 10000 });
  });

  test('Should show validation errors when search fields are empty', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.searchWithoutFields();
    await expect(page).not.toHaveURL(/SelectHotel/i);
    await expect(page.locator('body')).toContainText(
      /Please|Select|Required|Enter/i
    );
    console.log('Validation triggered for empty search');
  });
});
