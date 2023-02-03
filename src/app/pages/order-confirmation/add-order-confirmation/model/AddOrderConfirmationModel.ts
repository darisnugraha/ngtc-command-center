export interface customerModel {
  central_store_code: string;
  central_store_name: string;
  branch_store_code: string;
  branch_store_name: string;
  customer_name: string;
  telephone: string;
  address: string;
  correspondence_address: string;
  city: string;
  email: string;
  referral: string;
  staff: string;
  division_code: string;
  division_name: string;
  reseller_fee: Number;
}
export interface productModel {
  product_type: string;
  product: string;
  product_name: string;
  qty: string;
  unit: string;
  price: string;
  sub_total: string;
}
export interface discountModel {
  discount_code: string;
  discount_name: string;
  discount_percentage: string;
  discount_rp: string;
}
export interface supportServiceModel {
  no_support_service: string;
}
export interface productionServiceModel {
  no_production_service: string;
}

export interface listProductModel {
  key: number;
  nama_produk: string;
  kode_produk: string;
  tipe_produk: string;
  qty: number;
  satuan: string;
  harga: number;
  sub_total: number;
  type: string;
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
