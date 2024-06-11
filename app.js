/** @format */

import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import config from "./src/config/config.js";
import router from "./src/routes/index.js";

const { PORT, MONGO_URL } = config;

// database (mongo) connection
try {
  mongoose.set("strictQuery", false);
  mongoose.connect(MONGO_URL);
  console.log("CONNECTED DB");
} catch (error) {
  console.log(error.message);
}

const app = express();

//enable cors
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//allow request with format x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//allow request with format json
app.use(bodyParser.json());

// route render
app.use(router);

// success flagging
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
