import { FormErrors } from 'redux-form';
import { ResellerPaymentModel } from '../model/ResellerPaymentModel';

const ResellerValidation = (values: ResellerPaymentModel): FormErrors<ResellerPaymentModel> => {
  const errors: FormErrors<ResellerPaymentModel> = {};

  if (!values.date) {
    errors.date = 'Date required';
  }

  if (!values.nominal) {
    errors.nominal = 'Nominal required';
  }

  if (!values.payment_type) {
    errors.payment_type = 'Payment Type required';
  }

  return errors;
};
export default ResellerValidation;
