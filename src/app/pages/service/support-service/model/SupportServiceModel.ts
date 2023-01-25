export interface SupportServiceModel {
  support_service_name: String;
  store_code: String;
  branch_code: String;
  unit_code: String;
  qty: String;
  price: String;
  total_price: String;
}

export interface FeedbackSupportServiceModel {
  _id: String;
  no_support_service: String;
  tanggal: String;
  nama_support_service: String;
  kode_toko: String;
  kode_cabang: String;
  kode_satuan: String;
  qty: Number;
  harga: Number;
  total_harga: Number;
  status: String;
  input_date: String;
  __v: 0;
}
