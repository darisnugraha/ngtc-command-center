import { FormErrors } from 'redux-form';
import { PaymentModel } from '../model/PaymentModel';

const PaymentValidation = (values: PaymentModel): FormErrors<PaymentModel> => {
  const errors: FormErrors<PaymentModel> = {};

  if (!values.bank_name) {
    errors.bank_name = 'Bank Name required';
  }

  // if (!values.account_number) {
  //   errors.account_number = 'Account Number required';
  // }

  if (!values.date) {
    errors.date = 'Date required';
  }

  if (!values.down_payment) {
    errors.down_payment = 'Down Payment required';
  }

  if (!values.payment_type) {
    errors.payment_type = 'Payment Type required';
  }

  if (!values.nominal) {
    errors.nominal = 'Nominal required';
  }

  // if (!values.remaining_payment) {
  //   errors.remaining_payment = 'Remaining Payment required';
  // }

  if (!values.total_price) {
    errors.total_price = 'Total Price required';
  }

  if (!values.foto) {
    errors.foto = 'Foto Required';
  }
  if (!values.description) {
    errors.foto = 'Description Required';
  }

  return errors;
};
export default PaymentValidation;
