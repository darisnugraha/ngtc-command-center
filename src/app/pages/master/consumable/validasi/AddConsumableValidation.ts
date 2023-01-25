import { FormErrors } from 'redux-form';
import { ConsumableModel } from '../model/ConsumableModel';

const AddSoftwareValidation = (values: ConsumableModel): FormErrors<ConsumableModel> => {
  const errors: FormErrors<ConsumableModel> = {};

  if (!values.consumable_code) {
    errors.consumable_code = 'Consumable Code required';
  }

  if (!values.consumable_name) {
    errors.consumable_name = 'Consumable Name required';
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
export default AddSoftwareValidation;
