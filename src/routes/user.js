/** @format */

import express from "express";

import controller from "../controllers/user.js";

const user = express.Router();

// GET
user.get("/refresh", controller.refresh);

// POST
user.post("/login", controller.login);
user.post("/register", controller.register);

export default user;
