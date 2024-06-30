/** @format */

import Scrape from "../models/scrape.js";
import User from "../models/user.js";

const update_config = async (req, res) => {
  const {
    penyelenggara_proyek,
    jenis_proyek,
    lokasi_proyek,
    nilai_proyek,
    hbu,
    kbli,
  } = req.body;
  const { id } = req.params;

  try {
    const payload = {
      penyelenggara_proyek,
      jenis_proyek,
      lokasi_proyek,
      nilai_proyek,
      hbu,
      kbli,
    };

    const user = await User.updateOne({ _id: id }, { config: payload });

    return res.status(200).json({
      status: 200,
      message: "Success Update User Config",
      config: user.config,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "failed",
      info: "server error",
    });
  }
};

const get_archives = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    const archive_list = user.archive;

    if (archive_list === undefined || archive_list.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "Success Get User Archive List",
        archives: [],
      });
    } else {
      const archives = await Scrape.find({
        kode_tender: { $in: archive_list },
      });

      return res.status(200).json({
        status: 200,
        message: "Success Get User Archive List",
        archives: archives,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "failed",
      info: "server error",
    });
  }
};

const update_archives = async (req, res) => {
  const { archives } = req.body;
  const { id } = req.params;

  try {
    const user = await User.updateOne({ _id: id }, { archive: archives });

    if (!user.modifiedCount) {
      return res.status(400).json({
        status: 400,
        message: "failed",
        info: "Failed to Update User Archieve",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Success Update User Archives",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "failed",
      info: "server error",
    });
  }
};

const get_records = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    const record_list = user.record;

    if (record_list === undefined || record_list.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "Success Get User Record List",
        records: [],
      });
    } else {
      const records = await Scrape.find({ kode_tender: { $in: record_list } });

      return res.status(200).json({
        status: 200,
        message: "Success Get User Record List",
        records: records,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "failed",
      info: "server error",
    });
  }
};

const update_records = async (req, res) => {
  const { records } = req.body;
  const { id } = req.params;

  try {
    const user = await User.updateOne({ _id: id }, { record: records });

    if (!user.modifiedCount) {
      return res.status(400).json({
        status: 400,
        message: "failed",
        info: "Failed to Update User Records",
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Success Update User Records",
        record: user.record,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "failed",
      info: "server error",
    });
  }
};

const controller = {
  update_config,
  get_archives,
  update_archives,
  get_records,
  update_records,
};

export default controller;
