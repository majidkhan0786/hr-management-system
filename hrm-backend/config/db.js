const mongoose = require("mongoose");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`
});

const dbConnection = mongoose.connect(process.env.MONGO_URI);

module.exports = { dbConnection };
