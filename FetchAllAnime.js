const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");
const { openBrowser, login, fetchDrive } = require("./Bot/Anime");
const allAnime = async (url) => {
  const html = await request(url);
  const $ = cheerio.load(html);
  const tr = $("tbody tr");
  const animes = [];
  await openBrowser();
  await login();
  console.log("start");
  tr.each((i, el) => {
    const td = $(el).find("td");
    const title = $(td[0]).text();
    const tags = $(td[1]).text().split(", ");
    const link = $(td[0]).find("a").attr("href");
    animes.push({
      title,
      tags,
      link,
    });
  });
  for (const anime of animes) {
    const drive = await fetchDrive(anime.link);
    if (!!(anime.drive == drive)) {
      console.log("Link already there...");
      anime.drive = drive;
    } else {
      anime.drive = drive;
      fs.writeFileSync("./Animes.json", JSON.stringify(animes), {
        encoding: "utf-8",
      });
    }
  }
  console.log(animes);
  console.log("Done ...");
};
allAnime("https://animekayo.com/download-anime-series/");
