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
    animeArr.push({
      title: $(el).find(".post-title").text().trim(),
      img: $(el).find(".img-holder").attr("data-bsrjs"),
      link: $(el).find(".post-title").attr("href"),
    });
  });
  for (const anime of animeArr) {
    const drive = await fetchDrive(anime.link)
    anime.drive = drive
  }
  console.log(animeArr);
  return animeArr;
};
module.exports = search;