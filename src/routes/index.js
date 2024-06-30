/** @format */

import express from "express";
import user from "./user.js";
import scrape from "./scrape.js";
import util from "./util-user.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Korp Rest API",
    createdBy: "Ayam Iyudin",
    version: "0.1",
  });
});

router.use("/auth", user);
router.use("/scrape", scrape);
router.use("/user", util);

router.get("*", (req, res) => {
  res.send({
    status: 404,
    message:
      "inappropriate command, please read documentation or contact the administrator",
  });
});
export default router;
