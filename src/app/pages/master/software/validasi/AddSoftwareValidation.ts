import { FormErrors } from 'redux-form';
import { SoftwareModel } from '../model/SoftwareModel';

const AddSoftwareValidation = (values: SoftwareModel): FormErrors<SoftwareModel> => {
  const errors: FormErrors<SoftwareModel> = {};

  if (!values.product_code) {
    errors.product_code = 'Product Code required';
  }

  if (!values.product_name) {
    errors.product_name = 'Product Name required';
  }

  if (!values.unit) {
    errors.unit = 'Unit required';
  }

  if (!values.type) {
    errors.type = 'Type required';
  }

  return errors;
};
export default AddSoftwareValidation;
