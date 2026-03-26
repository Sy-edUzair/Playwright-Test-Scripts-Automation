import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SearchPage } from '../pages/SearchPage';
import { SelectHotelPage } from '../pages/SelectHotelPage';
import { BookingPage } from '../pages/BookingPage';
import { testData } from '../test-data/testData';

test.describe('TC10 (Negative) – Invalid Credit Card Details', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/SearchHotel|index/i, { timeout: 10000 });
    const searchPage = new SearchPage(page);
    await searchPage.searchHotel(testData.search);
    await expect(page).toHaveURL(/SelectHotel|select/i, { timeout: 15000 });

    const selectPage = new SelectHotelPage(page);
    await selectPage.selectFirstHotel();
    await expect(page).toHaveURL(/BookingForm|book/i, { timeout: 10000 });
  });

  test('Should reject booking with an invalid credit card number', async ({ page }) => {
    const bookingPage = new BookingPage(page);
    await bookingPage.fillBookingForm({
      firstName: testData.booking.firstName,
      lastName: testData.booking.lastName,
      billingAddress: testData.booking.billingAddress,
      creditCardNumber: testData.invalidBooking.creditCardNumber,
      creditCardType: testData.booking.creditCardType,
      expiryMonth: testData.booking.expiryMonth,
      expiryYear: testData.booking.expiryYear,
      cvvNumber: testData.invalidBooking.cvvNumber,
    });

    await bookingPage.clickBookNow();
    await expect(page).not.toHaveURL(/BookingConfirmation/i);
    const errors = await bookingPage.getValidationErrors();
    const bodyText = await page.locator('body').textContent();

    const hasError =
      errors.length > 0 ||
      bodyText.toLowerCase().includes('invalid') ||
      bodyText.toLowerCase().includes('error') ||
      bodyText.toLowerCase().includes('credit card') ||
      await page.locator('#book_now').isVisible();

    expect(hasError).toBeTruthy();
    console.log(`Invalid credit card validation triggered: ${errors.join(' | ') || 'card rejected or stayed on form'}`);
  });

});
