import { FormErrors } from 'redux-form';
import { supportServiceModel } from '../model/AddOrderConfirmationModel';

const AddSupportServiceValidation = (
  values: supportServiceModel
): FormErrors<supportServiceModel> => {
  const errors: FormErrors<supportServiceModel> = {};

  if (!values.no_support_service) {
    errors.no_support_service = 'No Support Service required';
  }

  return errors;
};
export default AddSupportServiceValidation;
