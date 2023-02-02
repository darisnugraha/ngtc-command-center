import { FormErrors } from 'redux-form';
import { DeliveryReportModel } from '../model/DeliveryReportModel';

const AddDeliveryReportValidation = (
  values: DeliveryReportModel
): FormErrors<DeliveryReportModel> => {
  const errors: FormErrors<DeliveryReportModel> = {};

  if (!values.date) {
    errors.date = 'Date required';
  }

  if (!values.no_sj) {
    errors.no_sj = 'No Delivery Order required';
  }

  if (!values.central_store) {
    errors.central_store = 'Central Store required';
  }

  if (!values.status_validation) {
    errors.status_validation = 'Status Validation required';
  }

  return errors;
};
export default AddDeliveryReportValidation;
