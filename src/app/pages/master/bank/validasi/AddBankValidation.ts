import { FormErrors } from 'redux-form';
import { BankModel } from '../model/BankModel';

const AddBankValidation = (values: BankModel): FormErrors<BankModel> => {
  const errors: FormErrors<BankModel> = {};

  if (!values.bank_name) {
    errors.bank_name = 'Bank Name required';
  }

  if (!values.account_number) {
    errors.account_number = 'Account Number required';
  }

  if (!values.account_name) {
    errors.account_name = 'Account Name required';
  }

  return errors;
};
export default AddBankValidation;
