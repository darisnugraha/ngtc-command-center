export interface BundleModel {
  bundle_code: string;
  bundle_name: string;
}
export interface ProductModel {
  product_type: string;
  product_name: string;
  unit: string;
  price: string;
}
export interface DetailProduk {
  _id?: String;
  kode_produk: String;
  nama_produk: String;
  jenis_produk: String;
  satuan: String;
  harga: Number;
  type: Number;
  qty: Number;
  sub_total: Number;
}
export interface FeedbackModelBundle {
  _id: String;
  kode_paket: String;
  nama_paket: String;
  detail_produk: DetailProduk[];
  total_harga: Number;
  status: String;
  input_date: String;
  __v: 0;
}
