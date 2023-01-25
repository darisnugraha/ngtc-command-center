export interface ConsumableModel {
  consumable_code: string;
  consumable_name: string;
  unit: string;
  supplier: string;
  price: string;
}

export interface FeedbackModelConsumable {
  _id: String;
  kode_consumable: String;
  nama_consumable: String;
  kode_supplier: String;
  satuan: String;
  harga: Number;
  status: String;
  input_date: String;
  __v: 0;
}
