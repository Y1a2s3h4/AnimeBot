const puppeteer = require("puppeteer");
let browser,
  url = "https://animekayo.com";

const openBrowser = async () => {
  browser = await puppeteer.launch();
  console.log("Browser Opened");
};

const login = async () => {
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  try {
    await page.goto(
      "https://animekayo.com/anime-series/shingeki-no-kyojin-season-3-part-2-720p-bd-dual-audio-hevc/"
    );

    // await page.waitFor(
    //   "#post-39918 > div.entry-content.clearfix.single-post-content > div.su-guests > div:nth-child(3)"
    // );
    // await page.click(
    //   "#post-39918 > div.entry-content.clearfix.single-post-content > div.su-guests > div:nth-child(3)"
    // );
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
  await page.setDefaultNavigationTimeout(0);
  try {
    await page.goto(link);
    const selector = await page.waitFor(".downloadbutton");
    // if (selector == ".downloadbutton") {
    await page.$eval(".downloadbutton", (el) => el.click());
    // } else {
    //   link = await page.$eval(".downloadbutton", (el) =>
    //     el.getAttribute("href")
    //   );
    //   await page.goto(link);
    // }
    await page.waitFor("#form-captcha");
    await page.$eval("#form-captcha", (submit) => submit.submit());
    await page.waitFor("form");
    await page.$eval("form", (submit) => submit.submit());
    await page.waitForNavigation();
    const driveURL = await page.evaluate(() => window.location.href);
    await page.close();
    console.log(driveURL);
    browser.close();
    return driveURL;
  } catch (err) {
    await page.close();
    console.log(err);
  }
};

module.exports = { openBrowser, login, fetchDrive };
