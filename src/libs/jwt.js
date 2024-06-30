/** @format */

import jwt from "jsonwebtoken";
import config from "../config/config.js";

const {
  MAX_AGE_ACCESS_TOKEN,
  MAX_AGE_REFRESH_TOKEN,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} = config;

//generate access JWT token by id
const create_access_token = (id) => {
  return jwt.sign({ id }, ACCESS_TOKEN, {
    expiresIn: MAX_AGE_ACCESS_TOKEN,
  });
};

//generate refresh JWT token by id
const create_refresh_token = (id) => {
  return jwt.sign({ id }, REFRESH_TOKEN, {
    expiresIn: MAX_AGE_REFRESH_TOKEN,
  });
};

//verify access JWT token
const verify_access_token = (token, callback) => {
  return jwt.verify(token, ACCESS_TOKEN, callback);
};

//verify refresh JWT token
const verify_refresh_token = (token, callback) => {
  return jwt.verify(token, REFRESH_TOKEN, callback);
};

const token = {
  create_access_token,
  create_refresh_token,
  verify_access_token,
  verify_refresh_token,
};

export default token;
