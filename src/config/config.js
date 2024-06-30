/** @format */

import dotenv from "dotenv";
dotenv.config();

//development
const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URI,
  MAX_AGE_ACCESS_TOKEN: process.env.MAX_AGE_ACCESS_TOKEN,
  MAX_AGE_REFRESH_TOKEN: process.env.MAX_AGE_REFRESH_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
};

export default config;
