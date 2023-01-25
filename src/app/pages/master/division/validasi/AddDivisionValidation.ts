import { FormErrors } from 'redux-form';
import { DivisionModel } from '../model/DivisionModel';

const AddDivisionValidation = (values: DivisionModel): FormErrors<DivisionModel> => {
  const errors: FormErrors<DivisionModel> = {};

  if (!values.division_code) {
    errors.division_code = 'Division Code required';
  }

  if (!values.division_name) {
    errors.division_name = 'Division Name required';
  }

  return errors;
};
export default AddDivisionValidation;
