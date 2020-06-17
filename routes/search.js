const cheerio = require("cheerio");
const request = require("request-promise");
const { openBrowser, login, fetchDrive } = require("../Bot/Anime");
const search = async (term) => {
  const html = await request(`https://animekayo.com/?s=${term}`);
  const $ = cheerio.load(html);
  const animeList = $("article");
  const animeArr = [];
  await openBrowser();
  await login();
  animeList.each((i, el) => {
    const drive = fetchDrive($(el).find(".post-title").attr("href"));
    console.log(drive.then((res) => res).catch((err) => err));
    animeArr.push({
      title: $(el).find(".post-title").text().trim(),
      img: $(el).find(".img-holder").attr("data-bsrjs"),
      link: $(el).find(".post-title").attr("href"),
      drive: drive.then((res) => res).catch((err) => err),
    });
  });
  console.log(animeArr);
  return animeArr;
};
module.exports = search;
