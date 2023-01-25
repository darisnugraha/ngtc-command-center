import { FormErrors } from 'redux-form';
import { ImplementationModel } from '../model/ImplementationModel';

const AddImplementationValidate = (
  values: ImplementationModel
): FormErrors<ImplementationModel> => {
  const errors: FormErrors<ImplementationModel> = {};

  if (!values.implementation_date) {
    errors.implementation_date = 'Implementation Date required';
  }

  if (!values.realization_date) {
    errors.realization_date = 'Realization Date required';
  }

  if (!values.implementation_type) {
    errors.implementation_type = 'Implementation Type required';
  }

  if (!values.duration) {
    errors.duration = 'Duration required';
  }

  return errors;
};
export default AddImplementationValidate;
