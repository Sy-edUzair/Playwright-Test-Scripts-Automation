class ConfirmationPage {
  constructor(page) {
    this.page = page;
    this.orderIdField = page.locator('#order_no');
    this.orderIdText = page.locator('text=Order No');
    this.itineraryLink = page.getByRole('button', { name: 'My Itinerary' });
    this.bookingTable = page.locator('table');
  }

  async getOrderNumber() {
    return await this.orderIdField.inputValue();
  }

  async clickMyItinerary() {
    await this.itineraryLink.click();
  }
}

class ItineraryPage {
  constructor(page) {
    this.page = page;
    this.bookingRows = page.locator('table tr, .booking_row');
    this.logoutLink = page.locator('a[href*="Logout"]');
  }

  async hasBooking(orderNo) {
    await this.page.locator('input[name="order_id_text"]').fill(orderNo);
    await this.page.locator('input[value="Go"]').click();
    await this.page.waitForLoadState('networkidle');
    const cell = this.page.locator(`input[value="${orderNo}"]`);
    return await cell.count() > 0;
  }

  async logout() {
    await this.logoutLink.click();
  }
}

module.exports = { ConfirmationPage, ItineraryPage };
