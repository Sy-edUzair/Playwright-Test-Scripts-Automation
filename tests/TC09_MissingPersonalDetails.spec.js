import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SearchPage } from '../pages/SearchPage';
import { SelectHotelPage } from '../pages/SelectHotelPage';
import { BookingPage } from '../pages/BookingPage';
import { testData } from '../test-data/testData';

test.describe('TC09 (Negative) – Booking with Missing Personal Details', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    await expect(page).toHaveURL(/SearchHotel|index/i);

    const searchPage = new SearchPage(page);
    await searchPage.searchHotel(testData.search);

    await expect(page).toHaveURL(/SelectHotel|select/i);

    const selectPage = new SelectHotelPage(page);
    await selectPage.selectFirstHotel();

    await expect(page).toHaveURL(/BookingForm|book/i);
  });

  test('Should show validation errors when personal details are missing', async ({ page }) => {
    const bookingPage = new BookingPage(page);

    await bookingPage.clickBookNow();
    await expect(page).toHaveURL(/BookingForm|book/i);
    await expect(page).not.toHaveURL(/BookingConfirmation/i);
    await expect(bookingPage.errorSpans.first()).toBeVisible();
    const errorCount = await bookingPage.errorSpans.count();
    expect(errorCount).toBeGreaterThan(0);

    console.log('Personal details validation triggered correctly');
  });

});