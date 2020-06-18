const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");

const allAnime = async (url) => {
  const html = await request(url);
  const $ = cheerio.load(html);
  const tr = $("tbody tr");
  const animes = [];
  console.log("start");
  tr.each((i, el) => {
    const td = $(el).find("td");
    const title = $(td[0]).text();
    const tags = $(td[1]).text().split(", ");
    let url = $(td[0]).find("a").attr("href");
    animes.push({
      title,
      tags,
      url,
    });
  });
  fs.writeFileSync("./Animes.json", JSON.stringify(animes), {
    encoding: "utf-8",
  });
  console.log(animes);
};
allAnime("https://animekayo.com/download-anime-series/");
