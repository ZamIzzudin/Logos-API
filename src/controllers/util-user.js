/** @format */

import Scrape from "../models/scrape.js";
import User from "../models/user.js";
import dateFormater from "../utils/local_time.js";
import email_template from "../utils/email_template.js";
import { uid } from "uid";

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

    const user = await User.findOneAndUpdate({ _id: id }, { config: payload });

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

const setup_notification = (user, data, step, type) => {
  let payload = {};
  const id = uid(16);
  if (type === "mulai") {
    payload = {
      id,
      title: `${data.nama_tender} - ${data.kode_tender}`,
      message: `Pengingat: ${step.tahap} akan Mulai Pada Tanggal ${step.mulai}`,
      is_read: false,
      date_added: dateFormater.get_local_time(),
    };
  } else {
    payload = {
      id,
      title: `${data.nama_tender} - ${data.kode_tender}`,
      message: `Pengingat: ${step.tahap} akan Selesai Pada Tanggal ${step.sampai}`,
      is_read: false,
      date_added: dateFormater.get_local_time(),
    };
  }

  email_template(user, data, step, type);

  return payload;
};

const generate_notification = async (req, res) => {
  try {
    const users = await User.find();

    const now = dateFormater.get_local_time();

    users.forEach(async (user) => {
      const user_archives_list = user.archive;

      let new_notification = user.notification;

      const archives = await Scrape.find({
        kode_tender: { $in: user_archives_list },
      });

      archives.forEach((archive) => {
        const steps = archive.tahapan_tender;

        steps.forEach((step) => {
          const mulai = step.mulai.split(" ").slice(0, 3).join(" ");
          const sampai = step.sampai.split(" ").slice(0, 3).join(" ");

          if (mulai === now) {
            new_notification.push(
              setup_notification(user, archive, step, "mulai")
            );
          }

          if (sampai === now) {
            new_notification.push(
              setup_notification(user, archive, step, "sampai")
            );
          }
        });
      });

      await User.updateOne({ _id: user.id, notification: new_notification });
    });

    return res.status(200).json({
      status: 200,
      message: "Success Create New Notification",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

const get_notification = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    const notification_list = user.notification;

    const unreaded_notification = notification_list.filter(
      (notification) => !notification.is_read
    );

    if (notification_list === undefined || notification_list.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "Success Get User Notification List",
        unreaded: 0,
        notification: [],
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Success Get User Notification List",
        unreaded: unreaded_notification.length,
        notification: notification_list,
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

const read_notification = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    const notification_list = user.notification;

    const payload = notification_list.map((notification) => {
      return { ...notification, is_read: true };
    });

    const updated_user = await User.findOneAndUpdate(
      { _id: id },
      { notification: payload }
    );

    return res.status(200).json({
      status: 200,
      message: "Success Update Notification Status",
      notification: updated_user.notification,
      unreaded: 0,
    });
  } catch (err) {
    console.log(err);
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
  generate_notification,
  get_notification,
  read_notification,
};

export default controller;
