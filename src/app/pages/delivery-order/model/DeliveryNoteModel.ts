export interface DeliveryNoteModel {
  date: Date;
  no_oc: String;
  toko: String;
  cabang: String;
  alamat_cabang: String;
  nama_customer: String;
  telepon: String;
}
export interface DeliveryNoteLocalModel {
  tanggal: String;
  no_order_konfirmasi: String;
  kode_toko: String;
  nama_toko: String;
  kode_cabang: String;
  nama_customer: String;
  telepon: String;
  alamat: String;
}
export interface SendProductModel {
  date: Date;
  nama_ekspedisi: String;
  no_surat_jalan: String;
  ongkos_kirim: String;
  no_resi: String;
  nama_toko: String;
  ditagihkan: String;
  foto: String;
}
