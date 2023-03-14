require("dotenv").config();
const mongoose = require("mongoose");
const app = require('../server');

const { MONGO_URL } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

mongoose.connect(MONGO_URL);

module.exports = app;
