const express = require("express");
const { MongoClient } = require("mongodb");
// const debug = require("debug")("app:adminRouter");
const sessions = require("../data/sessions.json");

const adminRouter = express.Router();

adminRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://dagandb:t35t1ng@cluster0.m6cmk.mongodb.net?retryWrites=true&w=majority";
  const dbName = "globomantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      console.log("Connected to the mongo Database");

      const db = client.db(dbName);

      const response = await db.collection("please work").insertMany(sessions);
      res.json(response);
    } catch (error) {
      console.log(error.stack);
    }
    client.close();
  })();
});

module.exports = adminRouter;
