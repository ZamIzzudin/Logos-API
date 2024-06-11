/** @format */

import Scrape from "../models/scrape.js";

const get_data = async (req, res) => {
  const data = await Scrape.find();

  if (data.length > 0) {
    return res.status(200).json({
      status: 200,
      message: "Success Get Scrape Data List",
      data,
    });
  } else {
    return res.status(500).json({
      status: 500,
      message: "Data Not Found",
    });
  }
};

const controller = {
  get_data,
};

export default controller;
