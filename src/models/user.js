/** @format */

import mongoose from "mongoose";

const user_scheme = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  config: {
    type: Object,
    default: {},
  },
  archive: {
    type: Array,
    default: [],
  },
  record: {
    type: Array,
    default: [],
  },
  notification: {
    type: Array,
    default: [],
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("users", user_scheme);

export default User;
