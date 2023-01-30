export interface ListInvoiceModel {
  _id: String;
  no_order_konfirmasi: String;
  tanggal_order: String;
  kode_toko: String;
  nama_toko: String;
  kode_cabang: String;
  nama_cabang: String;
  nama_customer: String;
  alamat_cabang: String;
  alamat_korespondensi: String;
  kota: String;
  telepon: String;
  email: String;
  kode_staff: String;
  biaya_reseller: Number;
  jenis_ok: String;
  detail_produk: Array<detailProduk>;
  detail_diskon: Array<detailDiskon>;
  no_support_service: String;
  no_production_service: String;
  total_harga: Number;
  sisa_bayar: Number;
  deskripsi: String;
  status: String;
  input_date: String;
  __v: 0;
  input_by: null;
  support_service: Array<any>;
  production_service: Array<any>;
}

export interface detailProduk {
  _id: String;
  kode_produk: String;
  nama_produk: String;
  jenis_produk: String;
  satuan: String;
  qty: Number;
  harga: Number;
  sub_total: Number;
}

export interface detailDiskon {
  _id: String;
  kode_diskon: String;
  nama_diskon: String;
  persentase: Number;
  sub_total: Number;
}
