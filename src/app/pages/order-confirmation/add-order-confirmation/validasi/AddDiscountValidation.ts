import { FormErrors } from 'redux-form';
import { discountModel } from '../model/AddOrderConfirmationModel';

const AddDiscountValidation = (values: discountModel): FormErrors<discountModel> => {
  const errors: FormErrors<discountModel> = {};

  if (!values.discount_code) {
    errors.discount_code = 'Discount required';
  }

  if (!values.discount_name) {
    errors.discount_name = 'Discount required';
  }

  return errors;
};
export default AddDiscountValidation;
