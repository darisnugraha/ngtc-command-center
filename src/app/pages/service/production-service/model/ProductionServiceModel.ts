export interface ProductionServiceModel {
  production_service_name: String;
  store_code: String;
  branch_code: String;
  unit_code: String;
  qty: Number;
  total_price: Number;
  // inquiry: {
  //   detail_inquiry: [
  //     {
  //       fitur: String;
  //       revisi: String;
  //       detail: String;
  //       lama_pengerjaan: Number;
  //     }
  //   ];
  //   qc: Number;
  //   total_pengerjaan: Number;
  // };
}

export interface inquiryModel {
  NO: Number;
  MENU_FITUR: String;
  REVISI: String;
  DETAIL: String;
  LAMA_PENGERJAAN: Number;
}

export interface inquiryModelTable {
  NO: Number;
  ID: String;
  MENU_FITUR: String;
  REVISI: String;
  DETAIL: String;
  LAMA_PENGERJAAN: Number;
}

export interface FeedbackProductionServiceModel {
  _id: String;
  no_production_service: String;
  tanggal: String;
  nama_production_service: String;
  kode_toko: String;
  kode_cabang: String;
  inquiry: {
    _id: String;
    detail_inquiry: [
      {
        _id: String;
        fitur: String;
        revisi: String;
        detail: String;
        lama_pengerjaan: Number;
      }
    ];
    qc: Number;
    total_pengerjaan: Number;
  };
  kode_satuan: String;
  qty: Number;
  total_harga: Number;
  status: String;
  input_date: String;
  __v: 0;
  satuan: {
    _id: String;
    kode_satuan: String;
    nama_satuan: String;
    status: String;
    input_date: String;
    __v: 0;
  };
}
