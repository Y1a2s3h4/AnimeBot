const puppeteer = require("puppeteer");
let browser;
const openBrowser = async () => {
  try {
    browser = await puppeteer.launch();
    console.log("Browser Opened");
  } catch (err) {
    console.log(err);
  }
};
const login = async () => {
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  try {
    await page.goto(
      "https://animekayo.com/anime-series/shingeki-no-kyojin-season-3-part-2-720p-bd-dual-audio-hevc/"
    );
    await page.waitFor("#wpforms-37482-field_0");
    await page.type("#wpforms-37482-field_0", "Ahbabssjaj");
    await page.waitFor("#wpforms-37482-field_1");
    await page.type("#wpforms-37482-field_1", "yash123$");
    const pass = await page.$("#wpforms-submit-37482");
    await pass.press("Enter");
    await page.waitFor("#wpforms-confirmation-37482");
    await page.close();
    console.log("Logged In Successfully");
  } catch (err) {
    await page.close();
    console.log(err);
  }
};
const fetchDrive = async (link) => {
  const page = await browser.newPage();
  try {
    await page.setDefaultNavigationTimeout(0);
    await page.goto(link);
    await page.waitFor(".downloadbutton");
    await page.$eval(".downloadbutton", (el) => el.click());
    await page.waitFor("#form-captcha");
    await page.$eval("#form-captcha", (submit) => submit.submit());
    await page.waitFor("form");
    await page.$eval("form", (submit) => submit.submit());
    await page.waitForNavigation();
    const driveURL = await page.evaluate(() => window.location.href);
    console.log(driveURL);
    await page.close();
    return await driveURL;
  } catch (err) {
    await page.close();
  }
};
module.exports = { openBrowser, login, fetchDrive };
