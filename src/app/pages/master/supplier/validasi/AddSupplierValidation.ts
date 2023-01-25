import { FormErrors } from 'redux-form';
import { SupplierModel } from '../model/SupplierModel';

const AddSupplierValidation = (values: SupplierModel): FormErrors<SupplierModel> => {
  const errors: FormErrors<SupplierModel> = {};

  if (!values.supplier_code) {
    errors.supplier_code = 'Supplier Code required';
  }

  if (!values.supplier_name) {
    errors.supplier_name = 'Supplier Name required';
  }

  if (!values.address) {
    errors.address = 'Address required';
  }

  if (!values.telepon) {
    errors.telepon = 'Telepon required';
  }

  if (!values.email) {
    errors.email = 'Email required';
  }

  if (!values.contact_person) {
    errors.contact_person = 'Email required';
  }

  return errors;
};
export default AddSupplierValidation;
