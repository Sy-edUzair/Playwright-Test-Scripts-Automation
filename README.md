# Adactin Hotel – Playwright Automation Framework

## Project Overview

End-to-End automation test suite for the [Adactin Hotel Application](https://adactinhotelapp.com/)  
built with **Playwright + JavaScript**.

---

## Project Structure

```
AdactinAutomation/
├── pages/                        # Page Object Model classes
│   ├── LoginPage.js
│   ├── SearchPage.js
│   ├── SelectHotelPage.js
│   ├── BookingPage.js
│   └── ConfirmationPage.js       # (also contains ItineraryPage)
│
├── tests/                        # All 11 test scripts
│   ├── TC01_EndToEnd.spec.js          ← Full E2E flow
│   ├── TC02_ValidLogin.spec.js        ← Positive
│   ├── TC03_ValidHotelSearch.spec.js  ← Positive
│   ├── TC04_HotelSelectionAndBooking.spec.js  ← Positive
│   ├── TC05_BookingConfirmation.spec.js       ← Positive
│   ├── TC06_SuccessfulLogout.spec.js          ← Positive
│   ├── TC07_InvalidLogin.spec.js              ← Negative
│   ├── TC08_SearchWithoutMandatoryFields.spec.js ← Negative
│   ├── TC09_MissingPersonalDetails.spec.js    ← Negative
│   ├── TC10_InvalidCreditCard.spec.js         ← Negative
│   └── TC11_LogoutWithoutLogin.spec.js        ← Negative
│
├── test-data/
│   └── testData.js               # Centralised test data
│
├── playwright.config.js          # Playwright configuration
├── package.json
└── README.md
```

---

## Test Cases Summary

| TC # | Type     | Description                                      |
|------|----------|--------------------------------------------------|
| TC01 | E2E      | Full flow: Login → Search → Book → Itinerary → Logout |
| TC02 | Positive | Successful login with valid credentials          |
| TC03 | Positive | Valid hotel search with correct filters          |
| TC04 | Positive | Hotel selection and booking form fill            |
| TC05 | Positive | Booking confirmation & Order Number generation   |
| TC06 | Positive | Successful logout after booking                  |
| TC07 | Negative | Login with invalid username/password             |
| TC08 | Negative | Search without selecting mandatory fields        |
| TC09 | Negative | Booking with missing personal details            |
| TC10 | Negative | Invalid credit card details during payment       |
| TC11 | Negative | Logout / page access without being logged in     |

---

## Prerequisites

- **Node.js** v16 or higher
- **npm** v7 or higher
- Internet connection (tests run against live site)

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
npx playwright install chromium
```

### 2. Configure credentials
Open `test-data/testData.js` and replace with your actual Adactin login:
```js
validUser: {
  username: 'YOUR_USERNAME',
  password: 'YOUR_PASSWORD',
},
```

---

## Running the Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all 11 test cases |
| `npm run test:headed` | Run with visible browser |
| `npm run test:e2e` | Run only TC01 (End-to-End) |
| `npm run test:positive` | Run TC02–TC06 (Positive cases) |
| `npm run test:negative` | Run TC07–TC11 (Negative cases) |
| `npm run test:report` | Open HTML test report |
| `npm run test:debug` | Run in debug/step mode |

### Run a single test file
```bash
npx playwright test tests/TC01_EndToEnd.spec.js --headed
```

---

## Assertions Used

Each test validates one or more of the following:

- ✅ **Page titles** – `expect(page).toHaveTitle(...)`
- ✅ **URL navigation** – `expect(page).toHaveURL(...)`
- ✅ **Element visibility** – `expect(locator).toBeVisible()`
- ✅ **Button states** – `expect(locator).toBeEnabled()`
- ✅ **Page content** – `expect(locator).toContainText(...)`
- ✅ **Form field values** – `expect(locator).toHaveValue(...)`
- ✅ **Error messages** – `expect(hasValidationError).toBeTruthy()`
- ✅ **Booking ID generation** – `expect(orderNo).toBeTruthy()`
- ✅ **Logout confirmation** – URL + body text checks

---

## Design Pattern

This project uses the **Page Object Model (POM)** pattern:

- Each page of the application has a dedicated class in `/pages/`
- Locators and actions are encapsulated inside page classes
- Test files only contain test logic and assertions
- Test data is centralised in `/test-data/testData.js`

---

## Reports

After running tests, open the HTML report:
```bash
npm run test:report
```

Or find it at: `playwright-report/index.html`
