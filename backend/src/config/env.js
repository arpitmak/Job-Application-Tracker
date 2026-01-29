const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT ,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET:process.env.JWT_SECRET,
  OPENROUTER_MODEL:process.env.OPENROUTER_MODEL,
  OPENROUTER_API_KEY:process.env.OPENROUTER_API_KEY
};
