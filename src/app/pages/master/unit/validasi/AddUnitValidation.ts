import { FormErrors } from 'redux-form';
import { UnitModel } from '../model/UnitModel';

const AddUnitValidation = (values: UnitModel): FormErrors<UnitModel> => {
  const errors: FormErrors<UnitModel> = {};

  if (!values.unit_code) {
    errors.unit_code = 'Unit Code required';
  }

  if (!values.unit_name) {
    errors.unit_name = 'Unit Name required';
  }

  return errors;
};
export default AddUnitValidation;
