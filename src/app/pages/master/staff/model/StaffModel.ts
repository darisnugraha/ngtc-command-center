export interface StaffModel {
  staff_code: string;
  staff_name: string;
  telephone: string;
  division: string;
  bank?: string;
  account_number?: string;
}

export interface FeedbackModelStaff {
  _id: String;
  kode_staff: String;
  nama_staff: String;
  kode_divisi: String;
  nama_bank: String;
  no_rekening: String;
  telepon: String;
  status: String;
  input_date: String;
  __v: 0;
}
