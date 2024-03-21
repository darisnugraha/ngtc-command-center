import { FormErrors } from 'redux-form';
import { SupportServiceModel } from '../model/SupportServiceModel';

const AddSupportServiceValidation = (
  values: SupportServiceModel
): FormErrors<SupportServiceModel> => {
  const errors: FormErrors<SupportServiceModel> = {};

  if (!values.support_service_name) {
    errors.support_service_name = 'Support Service Name required';
  }

  if (!values.store_code) {
    errors.store_code = 'Store Code required';
  }

  if (!values.branch_code) {
    errors.branch_code = 'Branch Code required';
  }

  if (!values.qty) {
    errors.qty = 'Qty required';
  }

  if (!values.unit_code) {
    errors.unit_code = 'Qty required';
  }

  return errors;
};
export default AddSupportServiceValidation;
