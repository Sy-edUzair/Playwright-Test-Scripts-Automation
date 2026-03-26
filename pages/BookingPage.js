class BookingPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.billingAddressInput = page.locator('#address');
    this.ccNumberInput = page.locator('#cc_num');
    this.ccTypeDropdown = page.locator('#cc_type');
    this.ccExpiryMonth = page.locator('#cc_exp_month');
    this.ccExpiryYear = page.locator('#cc_exp_year');
    this.ccCvvInput = page.locator('#cc_cvv');
    this.bookNowButton = page.locator('#book_now');
    this.errorSpans = page.locator('span[id$="_span"], .reg_error');
  }

  async fillBookingForm({ firstName, lastName, billingAddress, creditCardNumber, creditCardType, expiryMonth, expiryYear, cvvNumber }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.billingAddressInput.fill(billingAddress);
    await this.ccNumberInput.fill(creditCardNumber);
    await this.ccTypeDropdown.selectOption({ label: creditCardType });
    await this.ccExpiryMonth.selectOption({ label: expiryMonth });
    await this.ccExpiryYear.selectOption({ label: expiryYear });
    await this.ccCvvInput.fill(cvvNumber);
  }

  async clickBookNow() {
    await this.bookNowButton.click();
  }

  async fillOnlyPayment(creditCardNumber, cvvNumber) {
    await this.ccNumberInput.fill(creditCardNumber);
    await this.ccCvvInput.fill(cvvNumber);
    await this.bookNowButton.click();
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

module.exports = { BookingPage };
