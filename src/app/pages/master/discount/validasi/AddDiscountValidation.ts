import { FormErrors } from 'redux-form';
import { DiscountModel } from '../model/DiscountModel';

const AddDiscountValidation = (values: DiscountModel): FormErrors<DiscountModel> => {
  const errors: FormErrors<DiscountModel> = {};

  if (!values.discount_code) {
    errors.discount_code = 'Discount Code required';
  }

  if (!values.discount_name) {
    errors.discount_name = 'Discount Name required';
  }

  return errors;
};
export default AddDiscountValidation;
