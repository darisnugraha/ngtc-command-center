import { FormErrors } from 'redux-form';
import Store from '../../../../../setup/redux/Store';
import { productModel } from '../model/AddOrderConfirmationModel';

const AddProductValidation = (values: productModel): FormErrors<productModel> => {
  const errors: FormErrors<productModel> = {};

  const store = Store;
  // eslint-disable-next-line
  const typeOC: any = store.getState().addorderconfirmation.typeOC;

  if (typeOC !== 'SUPPORT SERVICE' && typeOC !== 'PRODUCTION SERVICE') {
    if (!values.product) {
      errors.product = 'Product required';
    }

    if (!values.product_name) {
      errors.product_name = 'Product required';
    }

    if (!values.product_type) {
      errors.product_type = 'Product Type required';
    }

    if (!values.price) {
      errors.price = 'Price required';
    }

    if (!values.qty) {
      errors.qty = 'Qty required';
    }

    if (!values.unit) {
      errors.unit = 'Unit required';
    }
  }

  // if (!values.sub_total) {
  //   errors.sub_total = 'Sub Total required';
  // }

  return errors;
};
export default AddProductValidation;
