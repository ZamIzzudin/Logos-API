/** @format */

import express from "express";
import controller from "../controllers/scrape.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Korp Rest API",
    createdBy: "Ayam Iyudin",
    version: "0.1",
  });
});

router.get("/data", controller.get_data);

router.get("*", (req, res) => {
  res.send({
    status: 404,
    message:
      "inappropriate command, please read documentation or contact the administrator",
  });
});
export default router;
