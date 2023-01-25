import { FormErrors } from 'redux-form';
import { ProductModel } from '../model/BundleModel';

const AddProductValidation = (values: ProductModel): FormErrors<ProductModel> => {
  const errors: FormErrors<ProductModel> = {};

  if (!values.product_type) {
    errors.product_type = 'Product Type required';
  }

  if (!values.product_name) {
    errors.product_name = 'Product Name required';
  }

  if (!values.unit) {
    errors.unit = 'Unit required';
  }

  if (!values.price) {
    errors.price = 'Price required';
  }

  return errors;
};
export default AddProductValidation;
