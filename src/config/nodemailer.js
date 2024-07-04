/** @format */

import nodemailer from "nodemailer";
import config from "./config.js";

const { NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_USER, NODEMAILER_PASS } =
  config;

const transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
});

const email_service = async (config) => {
  try {
    await transporter.sendMail(config);
    return {};
  } catch (err) {
    console.log(err);
  }
};

export default email_service;
