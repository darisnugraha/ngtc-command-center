import { FormErrors } from 'redux-form';
import { PotentialCustomerModel } from '../model/PotentialCustomerModel';

const PotentialCustomerValidation = (
  values: PotentialCustomerModel
): FormErrors<PotentialCustomerModel> => {
  const errors: FormErrors<PotentialCustomerModel> = {};

  if (!values.store_code) {
    errors.store_code = 'Store Code required';
  }

  if (!values.store_name) {
    errors.store_name = 'Store Name required';
  }

  if (!values.branch_code) {
    errors.branch_code = 'Branch Code required';
  }

  if (!values.branch_name) {
    errors.branch_name = 'Branch Name required';
  }

  if (!values.customer_name) {
    errors.customer_name = 'Customer Name required';
  }

  if (!values.city) {
    errors.city = 'City required';
  }

  if (!values.address) {
    errors.address = 'Address required';
  }

  if (!values.correspondence_address) {
    errors.correspondence_address = 'Correspondence Address required';
  }

  if (!values.telephone) {
    errors.telephone = 'Telephone required';
  }

  if (!values.email) {
    errors.email = 'Email required';
  }

  return errors;
};
export default PotentialCustomerValidation;
