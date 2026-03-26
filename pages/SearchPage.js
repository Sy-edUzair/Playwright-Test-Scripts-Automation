class SearchPage {
  constructor(page) {
    this.page = page;

    this.locationDropdown = page.locator('#location');
    this.hotelDropdown = page.locator('#hotels');
    this.roomTypeDropdown = page.locator('#room_type');
    this.numRoomsDropdown = page.locator('#room_nos');
    this.checkInDate = page.locator('#datepick_in');
    this.checkOutDate = page.locator('#datepick_out');
    this.adultsPerRoom = page.locator('#adult_room');
    this.searchButton = page.locator('#Submit');
    this.errorSpans = page.locator('.login_error, span[id$="_span"], #checkin_span, #checkout_span');
  }

  async searchHotel({ location, hotel, roomType, numRooms, checkInDate, checkOutDate, adultsPerRoom }) {
    await this.locationDropdown.selectOption({ label: location });
    await this.page.waitForTimeout(1000);
    await this.hotelDropdown.selectOption({ label: hotel });
    await this.roomTypeDropdown.selectOption({ label: roomType });
    await this.numRoomsDropdown.selectOption({ label: numRooms });

    await this.checkInDate.fill('');
    await this.checkInDate.type(checkInDate);

    await this.checkOutDate.fill('');
    await this.checkOutDate.type(checkOutDate);

    await this.adultsPerRoom.selectOption({ label: adultsPerRoom });
    await this.searchButton.click();
  }

  async searchWithoutFields() {
    // Click Search without filling any fields
    await this.searchButton.click();
  }

  async getValidationErrors() {
    const errors = [];
    const spans = await this.errorSpans.all();
    for (const span of spans) {
      const text = await span.textContent();
      if (text && text.trim()) errors.push(text.trim());
    }
    return errors;
  }
}

module.exports = { SearchPage };
