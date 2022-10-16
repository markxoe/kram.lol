const express = require("express");
const { Deta } = require("deta");
const app = express();

const deta = Deta(process.env.PROJECT_KEY);
const db = deta.Base("counter");

app.get("/", async (req, res) => {
  let val = (await db.get("view_count"))?.count ?? 0;

  await db.put({ count: ++val }, "view_count");

  res.send({ count: val });
});

module.exports = app;
