/** @format */
import express from "express";
import controller from "../controllers/scrape.js";

const scrape = express.Router();

scrape.get("/data/:id", controller.get_data);
scrape.get("/instansi", controller.get_instansi);

export default scrape;
