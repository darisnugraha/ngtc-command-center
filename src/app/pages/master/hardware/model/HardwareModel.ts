export interface HardwareModel {
  hardware_code: string;
  hardware_name: string;
  unit: string;
  supplier: string;
  price: string;
}

export interface FeedbackModelHardware {
  _id: String;
  kode_hardware: String;
  nama_hardware: String;
  kode_supplier: String;
  satuan: String;
  harga: Number;
  status: String;
  input_date: String;
  __v: 0;
}
