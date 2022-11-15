require("dotenv").config();
const express = require("express");

const setupDb = require("./db/db-setup");

const PORT = process.env.PORT || 5000;
const app = express();

const start = async () => {
  try {
    setupDb();
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
