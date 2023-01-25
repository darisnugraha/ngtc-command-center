export interface listProductModel {
  key: number;
  nama_produk: string;
  tipe_produk: string;
  qty: number;
  satuan: string;
  harga: number;
  sub_total: number;
}

export interface branchModel {
  _id: String;
  kode_cabang: String;
  nama_cabang: String;
  kode_toko: String;
  email: String;
  telepon: String;
  alamat_cabang: String;
  alamat_korespondensi: String;
  status: String;
  input_date: String;
  __v: 0;
  edit_by: any;
  edit_date: String;
}

export interface staffModel {
  _id: String;
  kode_staff: String;
  nama_staff: String;
  kode_divisi: String;
  alamat: String;
  telepon: String;
  status: String;
  input_date: String;
  __v: 0;
  edit_by: null;
  edit_date: String;
  nama_bank: String;
  no_rekening: String;
}
