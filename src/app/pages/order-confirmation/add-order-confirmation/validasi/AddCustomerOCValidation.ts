import { FormErrors } from 'redux-form';
import { customerModel } from '../model/AddOrderConfirmationModel';

const AddCustomerValidation = (values: customerModel): FormErrors<customerModel> => {
  const errors: FormErrors<customerModel> = {};

  if (!values.central_store_code) {
    errors.central_store_code = 'Store required';
  }

  if (!values.central_store_name) {
    errors.central_store_name = 'Store required';
  }

  if (!values.branch_store_code) {
    errors.branch_store_code = 'Branch required';
  }

  if (!values.branch_store_name) {
    errors.branch_store_name = 'Branch required';
  }

  if (!values.customer_name) {
    errors.customer_name = 'Customer Name required';
  }

  if (!values.telephone) {
    errors.telephone = 'Telephone required';
  }

  if (!values.address) {
    errors.address = 'Address required';
  }

  if (!values.correspondence_address) {
    errors.correspondence_address = 'Correspondence Address required';
  }

  if (!values.city) {
    errors.city = 'City required';
  }

  if (!values.email) {
    errors.email = 'Email required';
  }

  // if (!values.referral) {
  //   errors.referral = 'Referral required';
  // }

  if (!values.staff) {
    errors.staff = 'Staff required';
  }

  if (!values.division_code) {
    errors.division_code = 'Division required';
  }

  if (!values.division_name) {
    errors.division_name = 'Division required';
  }

  return errors;
};
export default AddCustomerValidation;
