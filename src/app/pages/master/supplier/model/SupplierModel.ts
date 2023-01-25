export interface SupplierModel {
  supplier_code: string;
  supplier_name: string;
  address: string;
  contact_person: string;
  telepon: string;
  email: string;
}

export interface FeedbackModelSupplier {
  _id: String;
  kode_supplier: String;
  nama_supplier: String;
  contact_person: String;
  alamat: String;
  telepon: String;
  email: String;
  status: String;
  input_date: String;
  __v: 0;
}
