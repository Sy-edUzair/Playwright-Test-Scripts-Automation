class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.welcomeText = page.locator('text=Hello');
  }

  async navigate() {
    await this.page.goto('https://adactinhotelapp.com/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.first().textContent();
  }

  async isLoggedIn() {
    return await this.page.locator('text=Search Hotel, text=Hello').first().isVisible().catch(() => false);
  }

  async logout() {
    await this.page.locator('a[href*="Logout"]').click();
  }

  async gotoIndexfterlogout() {
    await this.page.locator('a[href*="index"]').click()
  }
}

module.exports = { LoginPage };
