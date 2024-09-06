# Project: JavaScript Automation with Selenium and Mocha

This project demonstrates JavaScript automation using Selenium WebDriver for frontend testing and Mocha for API testing.

## Installation

1. **Prerequisites:** Ensure you have Node.js and npm (or yarn) installed. Verify this using `node -v` and `npm -v` (or `yarn -v`). If not installed, download them from https://nodejs.org/.

3. **Running Frontend Automation test cases and generating test report:**
    ```bash
     cd frontend_automation
    ```
   - Run `npm install selenium-webdriver mocha chai mochawesome`
   - Run `npx mocha .\automation.mjs --reporter mochawesome --reporter-options reportDir=./reports reportFilename=automation-test-report`

3. **Running Backend Automation API test cases and generating test report:**
    ```bash
     cd backend_automation
    ```
   - Run `npm init -y` (or `yarn init -y`) to create a `package.json` file.
   - Run `npm install mocha chai axios mochawesome`
   - Run `npx mocha .\api.test.mjs --reporter mochawesome --reporter-options reportDir=./reports reportFilename=automation-test-report`