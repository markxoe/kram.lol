const cors = require("cors");
const { Deta } = require("deta");
const express = require("express");
const app = express();

const deta = Deta(process.env.PROJECT_KEY);
const db = deta.Base("counter");

app.use(cors({ origin: ["https://kram.lol", /localhost/] }));

app.get("/", async (req, res) => {
  let val = (await db.get("counters")) ?? { views: 0, visitors: 0 };
  await db.put({ ...val, views: ++val.views }, "counters");

  res.send(val);
});

app.post("/visit", async (req, res) => {
  let val = (await db.get("counters")) ?? { views: 0, visitors: 0 };
  await db.put({ ...val, visitors: ++val.visitors }, "counters");

  res.send("OK");
});

module.exports = app;
