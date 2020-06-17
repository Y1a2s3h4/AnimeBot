const express = require("express");
const search = require("./routes/search");
const app = express();
const port = process.env.PORT || 3000;

app.get("/search/:term", async (req, res) => {
  const term = req.params.term;
  res.send(await search(term));
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
