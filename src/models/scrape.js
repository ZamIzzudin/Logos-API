/** @format */

import mongoose from "mongoose";

const scrape_schema = new mongoose.Schema({
  kode_tender: String,
  nama_tender: String,
  tanggal_pembuatan: String,
  jenis_pengadaan: String,
  instansi: String,
  satuan_kerja: String,
  tahun_anggaran: String,
  nilai_pagu_paket: String,
  nilai_hps_paket: String,
  jenis_kontrak: String,
  lokasi_pengerjaan: String,
  syarat_kualifikasi: String,
  peserta_tender: String,
});

const Scrape = mongoose.model("scrape", scrape_schema);

export default Scrape;
