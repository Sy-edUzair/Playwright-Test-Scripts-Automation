import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SearchPage } from '../pages/SearchPage';
import { SelectHotelPage } from '../pages/SelectHotelPage';
import { BookingPage } from '../pages/BookingPage';
import { testData } from '../test-data/testData';

test.describe('TC04 (Positive) – Hotel Selection and Booking', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/SearchHotel|index/i, { timeout: 10000 });

    const searchPage = new SearchPage(page);
    await searchPage.searchHotel(testData.search);
    await expect(page).toHaveURL(/SelectHotel|select/i, { timeout: 15000 });
  });

  test('Should allow selecting a hotel and filling the booking form', async ({ page }) => {
    const selectPage = new SelectHotelPage(page);
    await selectPage.selectFirstHotel();
    await expect(page).toHaveURL(/BookingForm|book/i, { timeout: 10000 });
    await expect(page.locator('body')).toContainText(/First Name|Last Name|Billing Address/i);

    const bookingPage = new BookingPage(page);
    await bookingPage.fillBookingForm(testData.booking);
    await expect(page.locator('#first_name')).toHaveValue(testData.booking.firstName);
    await expect(page.locator('#last_name')).toHaveValue(testData.booking.lastName);
    await expect(page.locator('#cc_num')).toHaveValue(testData.booking.creditCardNumber);
    await expect(page.locator('#book_now')).toBeEnabled();

    console.log('Hotel selected and booking form filled successfully');
  });

});
