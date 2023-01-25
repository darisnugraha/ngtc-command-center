import { FormErrors } from 'redux-form';
import { ReceivableReportModel } from '../model/ReceivableReportModel';

const AddReceivableReportValidation = (
  values: ReceivableReportModel
): FormErrors<ReceivableReportModel> => {
  const errors: FormErrors<ReceivableReportModel> = {};

  if (!values.date) {
    errors.date = 'Date required';
  }

  if (!values.no_oc) {
    errors.no_oc = 'No Order Confirmation required';
  }

  if (!values.central_store) {
    errors.central_store = 'Central Store required';
  }

  if (!values.branch_store) {
    errors.branch_store = 'Branch Store required';
  }

  return errors;
};
export default AddReceivableReportValidation;
