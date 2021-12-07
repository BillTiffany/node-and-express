const passport = require("passport");
const { Strategy } = require("passport-local");
const { MongoClient } = require("mongodb");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        const url =
          "mongodb+srv://dagandb:t35t1ng@cluster0.m6cmk.mongodb.net?retryWrites=true&w=majority";
        const dbName = "globomantics";
        (async function validateUser() {
          let client;
          try {
            client = await MongoClient.connect(url);
            console.log("Connected to the mongo Database");
            const db = client.db(dbName);

            const user = await db.colleciton("users").findOne({ username });

            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error) {
            done(error, false);
          }
          client.close();
        })();
      }
    )
  );
};
