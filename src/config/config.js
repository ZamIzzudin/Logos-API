/** @format */

import dotenv from "dotenv";
dotenv.config();

//development
const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URI,
};

export default config;
