const cors = require("cors");
const { Deta } = require("deta");
const express = require("express");
const app = express();

const deta = Deta(process.env.PROJECT_KEY);
const db = deta.Base("counter");

app.use(cors({ origin: ["https://kram.lol", /localhost/] }));

app.get("/", async (req, res) => {
  let val = (await db.get("view_count"))?.count ?? 0;

  res.send({ count: val });
});

app.post("/visit", async (req, res) => {
  let val = (await db.get("view_count"))?.count ?? 0;
  await db.put({ count: ++val }, "view_count");

  res.send("OK");
});

module.exports = app;
