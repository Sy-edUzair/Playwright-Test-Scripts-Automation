import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SearchPage } from '../pages/SearchPage';
import { SelectHotelPage } from '../pages/SelectHotelPage';
import { BookingPage } from '../pages/BookingPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { testData } from '../test-data/testData';

test.describe('TC05 (Positive) – Booking Confirmation', () => {

  test('Should generate an Order Number on successful booking', async ({ page }) => {
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

    const bookingPage = new BookingPage(page);
    await bookingPage.fillBookingForm(testData.booking);
    await bookingPage.clickBookNow();

    await expect(page).toHaveURL(/BookingConfirmation|confirm/i, { timeout: 15000 });
    await expect(page.locator('body')).toContainText(/Order No|Booking Confirmation/i);

    const confirmPage = new ConfirmationPage(page);
    await expect(confirmPage.orderIdField).toBeVisible();
    await expect(confirmPage.orderIdField).toHaveValue(/.+/);
    const orderNo = await confirmPage.getOrderNumber();

    expect(orderNo).toBeTruthy();

    expect(orderNo).toBeTruthy();
    expect(orderNo.length).toBeGreaterThan(0);

    await expect(confirmPage.itineraryLink).toBeVisible();

    console.log(`Booking confirmed! Order Number: ${orderNo}`);
  });

});
