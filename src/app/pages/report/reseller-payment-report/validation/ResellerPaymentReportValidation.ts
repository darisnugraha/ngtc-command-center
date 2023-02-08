import { FormErrors } from 'redux-form';
import { ResellerReportModel } from '../model/ResellerPaymentReportModel';

const AddResellerReportValidation = (
  values: ResellerReportModel
): FormErrors<ResellerReportModel> => {
  const errors: FormErrors<ResellerReportModel> = {};

  if (!values.date) {
    errors.date = 'Date required';
  }

  if (!values.no_order_confirmation) {
    errors.no_order_confirmation = 'No Order Confirmation required';
  }

  if (!values.central_store) {
    errors.central_store = 'Central Store required';
  }

  if (!values.reseller_code) {
    errors.reseller_code = 'Reseller Code required';
  }

  if (!values.status) {
    errors.status = 'Status required';
  }

  return errors;
};
export default AddResellerReportValidation;
