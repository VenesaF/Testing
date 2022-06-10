const { When, Then, Given, Before, AfterAll } = require("@cucumber/cucumber")
const puppeteer = require("puppeteer")
var { setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require("chai");

setDefaultTimeout(60 * 1000);
let browser, page;
Before( async function () {
    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 10,
        devtools: false,
        args:
            [
                '--start-maximized',
                '--window-size=1920,1080'
            ]
    });
    page = await browser.newPage();
})

Given("User get in the application", async function () {
    await page.goto("http://localhost:8080/")
});

When('User open the add to-do form and than click close button', async function () {
    let buttonSelector = ['.ant-btn-primary:not([disabled])'];
    await page.waitForSelector(buttonSelector);
    let button = await page.$(buttonSelector);
    await button.click();

    let closeButtonSelector = ['.anticon.anticon-close'];
    await page.waitForSelector(closeButtonSelector);
    let closeButton = await page.$(closeButtonSelector);
    await page.waitForTimeout(2000);
    await closeButton.click();
    await page.waitForTimeout(2000);
    
});

Then('The add to do form is closed', async function () {
 await page.waitForTimeout(1000);
});
AfterAll(async () => {
    await page.waitForTimeout(1000);
    await browser.close();
});