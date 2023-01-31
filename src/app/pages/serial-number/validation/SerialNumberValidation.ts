import { FormErrors } from 'redux-form';
import { DeliveryNoteModel } from '../model/SerialNumberModel';

const AddDeliveryNoteValidation = (values: DeliveryNoteModel): FormErrors<DeliveryNoteModel> => {
  const errors: FormErrors<DeliveryNoteModel> = {};

  if (!values.date) {
    errors.date = 'Date required';
  }

  if (!values.no_oc) {
    errors.no_oc = 'No OC required';
  }

  if (!values.toko) {
    errors.toko = 'Store required';
  }

  if (!values.cabang) {
    errors.cabang = 'Branch required';
  }

  if (!values.alamat_cabang) {
    errors.alamat_cabang = 'Address required';
  }

  if (!values.nama_customer) {
    errors.nama_customer = 'Customer Name required';
  }

  if (!values.telepon) {
    errors.telepon = 'Telepon required';
  }

  return errors;
};
export default AddDeliveryNoteValidation;
