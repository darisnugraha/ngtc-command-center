import { FormErrors } from 'redux-form';
import { ProductionServiceModel } from '../model/ProductionServiceModel';

const AddProductionServiceValidation = (
  values: ProductionServiceModel
): FormErrors<ProductionServiceModel> => {
  const errors: FormErrors<ProductionServiceModel> = {};

  if (!values.production_service_name) {
    errors.production_service_name = 'Production Service Name required';
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

  if (!values.total_price) {
    errors.total_price = 'Total Price required';
  }

  return errors;
};
export default AddProductionServiceValidation;
