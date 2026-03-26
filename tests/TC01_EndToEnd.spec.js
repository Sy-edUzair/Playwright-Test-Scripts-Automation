import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SearchPage } from '../pages/SearchPage';
import { SelectHotelPage } from '../pages/SelectHotelPage';
import { BookingPage } from '../pages/BookingPage';
import { ConfirmationPage, ItineraryPage } from '../pages/ConfirmationPage';
import { testData } from '../test-data/testData';

test.describe('TC01 – End-to-End Hotel Booking Flow', () => {

  test('Should complete full hotel booking flow from login to logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    await expect(page).toHaveTitle(/Adactin|Hotel/i);
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    await expect(page).toHaveURL(/SearchHotel|index/i);
    await expect(page.locator('body')).toContainText(/Search Hotel|Hello/i);
    const searchPage = new SearchPage(page);
    await searchPage.searchHotel(testData.search);

    await expect(page).toHaveURL(/SelectHotel|select/i, { timeout: 15000 });
    await expect(page.locator('body')).toContainText(/Select Hotel|Hotel Name/i);

    const selectPage = new SelectHotelPage(page);
    await selectPage.selectFirstHotel();

    await expect(page).toHaveURL(/BookingForm|book/i, { timeout: 10000 });
    await expect(page.locator('body')).toContainText(/Booking|First Name/i);

    const bookingPage = new BookingPage(page);
    await bookingPage.fillBookingForm(testData.booking);
    await bookingPage.clickBookNow();

    await expect(page).toHaveURL(/BookingConfirmation|confirm/i, { timeout: 15000 });
    await expect(page.locator('body')).toContainText(/Order No|Booking Confirmation/i);

    const confirmPage = new ConfirmationPage(page);
    const orderNo = await confirmPage.getOrderNumber();
    expect(orderNo).toBeTruthy();
    console.log(`Order Number Generated: ${orderNo}`);

    await confirmPage.clickMyItinerary();
    await expect(page).toHaveURL(/Itinerary|itinerary/i, { timeout: 10000 });

    const itineraryPage = new ItineraryPage(page);
    const bookingFound = await itineraryPage.hasBooking(orderNo);
    expect(bookingFound).toBeTruthy();

    await itineraryPage.logout();
    await expect(page).toHaveURL(/logout|index|Login/i, { timeout: 10000 });
    await expect(page.locator('body')).toContainText(/logged out|login|username/i);

  });

});
