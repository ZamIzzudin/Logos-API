/** @format */

import User from "../models/user.js";
import Scrape from "../models/scrape.js";

const get_data = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });
  const filter = user ? user.config : null;

  let payload = { is_show: true };

  if (filter) {
    if (filter.penyelenggara_proyek) {
      payload.instansi = { $in: filter.penyelenggara_proyek };
    }
    if (filter.jenis_proyek) {
      payload.jenis_pengadaan = { $in: filter.jenis_proyek };
    }
    if (filter.hbu) {
      payload.kode_hbu = { $in: filter.hbu };
    }
    if (filter.kbli) {
      payload.kode_kbli = { $in: filter.kbli };
    }
  }

  const data = await Scrape.find(payload);
  let filtered_data = data;

  if (filter && filter.nilai_proyek) {
    filtered_data = data.filter((each) => {
      let NP_raw = each.nilai_hps_paket;

      let clean_NP = NP_raw.replace(/[^0-9,]/g, "");
      clean_NP = clean_NP.replace(",", ".");

      let clean_NP_num = parseFloat(clean_NP);

      return clean_NP_num <= filter.nilai_proyek;
    });
  }

  if (filtered_data.length > 0) {
    return res.status(200).json({
      status: 200,
      message: "Success Get Scrape Data List",
      data: filtered_data,
    });
  } else {
    return res.status(500).json({
      status: 500,
      message: "Data Not Found",
    });
  }
};

const get_instansi = async (req, res) => {
  const data = await Scrape.find({}, { instansi: true });

  const filtered_instansi = [];

  data.forEach((each) => {
    if (!filtered_instansi.includes(each.instansi)) {
      filtered_instansi.push(each.instansi);
    }
  });

  if (data.length > 0) {
    return res.status(200).json({
      status: 200,
      message: "Success Get Scrape Data List",
      data: filtered_instansi,
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
  get_instansi,
};

export default controller;
