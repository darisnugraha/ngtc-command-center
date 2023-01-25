import { FormErrors } from 'redux-form';
import { BundleModel } from '../model/BundleModel';

const AddBundleValidation = (values: BundleModel): FormErrors<BundleModel> => {
  const errors: FormErrors<BundleModel> = {};

  if (!values.bundle_code) {
    errors.bundle_code = 'bundle code required';
  }

  if (!values.bundle_name) {
    errors.bundle_name = 'bundle name required';
  }

  return errors;
};
export default AddBundleValidation;
