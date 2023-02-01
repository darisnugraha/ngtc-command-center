import { FormErrors } from 'redux-form';
import { SendProductModel } from '../model/DeliveryNoteModel';

const SendProductValidation = (values: SendProductModel): FormErrors<SendProductModel> => {
  const errors: FormErrors<SendProductModel> = {};

  if (!values.date) {
    errors.date = 'Date required';
  }

  if (!values.no_surat_jalan) {
    errors.no_surat_jalan = 'No Delivery Order required';
  }

  if (!values.nama_ekspedisi) {
    errors.nama_ekspedisi = 'Expedition Name required';
  }

  if (!values.nama_toko) {
    errors.nama_toko = 'Store required';
  }

  if (!values.no_resi) {
    errors.no_resi = 'Receipt required';
  }

  if (!values.ongkos_kirim) {
    errors.ongkos_kirim = 'Shipping Costs required';
  }

  if (!values.foto) {
    errors.foto = 'Foto required';
  }

  return errors;
};
export default SendProductValidation;
