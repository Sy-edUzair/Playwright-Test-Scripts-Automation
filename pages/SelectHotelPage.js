class SelectHotelPage {
  constructor(page) {
    this.page = page;
    this.firstHotelRadio = page.getByRole('radio').first();
    this.continueButton = page.getByRole('button', { name: 'continue' });
    this.hotelResults = page.locator('table#searchResult, .search_result_table');
  }

  async selectFirstHotel() {
    await this.firstHotelRadio.click();
    await this.continueButton.click();
  }

  async hasResults() {
    return await this.firstHotelRadio.count() > 0;
  }
}

module.exports = { SelectHotelPage };
