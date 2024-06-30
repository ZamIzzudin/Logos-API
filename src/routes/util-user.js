/** @format */

import express from "express";

import controller from "../controllers/util-user.js";

const util = express.Router();

// GET
util.get("/archive/:id", controller.get_archives);
util.get("/record/:id", controller.get_records);

// PUT
util.put("/config/:id", controller.update_config);
util.put("/archive/:id", controller.update_archives);
util.put("/record/:id", controller.update_records);

export default util;
