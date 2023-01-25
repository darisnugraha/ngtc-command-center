import { FormErrors } from 'redux-form';
import { HardwareModel } from '../model/HardwareModel';

const AddHardwareValidation = (values: HardwareModel): FormErrors<HardwareModel> => {
  const errors: FormErrors<HardwareModel> = {};

  if (!values.hardware_code) {
    errors.hardware_code = 'Hardware Code required';
  }

  if (!values.hardware_name) {
    errors.hardware_name = 'Hardware Name required';
  }

  if (!values.unit) {
    errors.unit = 'Unit required';
  }

  if (!values.supplier) {
    errors.supplier = 'Supplier required';
  }

  if (!values.price) {
    errors.price = 'Price Address required';
  }

  return errors;
};
export default AddHardwareValidation;
