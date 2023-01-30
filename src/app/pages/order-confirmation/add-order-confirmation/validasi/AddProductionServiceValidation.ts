import { FormErrors } from 'redux-form';
import { productionServiceModel } from '../model/AddOrderConfirmationModel';

const AddProductionServiceValidation = (
  values: productionServiceModel
): FormErrors<productionServiceModel> => {
  const errors: FormErrors<productionServiceModel> = {};

  if (!values.no_production_service) {
    errors.no_production_service = 'No Production Service required';
  }

  return errors;
};
export default AddProductionServiceValidation;
