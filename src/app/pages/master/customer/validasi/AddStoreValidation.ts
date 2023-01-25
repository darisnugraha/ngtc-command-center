import { FormErrors } from 'redux-form';
import { StoreModel } from '../model/CustomerModel';

const AddStoreValidation = (values: StoreModel): FormErrors<StoreModel> => {
  const errors: FormErrors<StoreModel> = {};

  if (!values.store_code) {
    errors.store_code = 'Store Code required';
  }

  if (!values.store_name) {
    errors.store_name = 'Store Name required';
  }

  if (!values.address) {
    errors.address = 'Address required';
  }

  if (!values.correspondence_address) {
    errors.correspondence_address = 'Correspondence Address required';
  }

  if (!values.customer_name) {
    errors.customer_name = 'Customer Name required';
  }

  if (!values.city) {
    errors.city = 'City required';
  }

  if (!values.telephone) {
    errors.telephone = 'Telephone required';
  }

  return errors;
};
export default AddStoreValidation;
