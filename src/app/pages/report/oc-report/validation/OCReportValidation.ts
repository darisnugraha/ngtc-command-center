import { FormErrors } from 'redux-form';
import { OCReportModel } from '../model/OCReportModel';

const AddOCReportValidation = (values: OCReportModel): FormErrors<OCReportModel> => {
  const errors: FormErrors<OCReportModel> = {};

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

  if (!values.report_type) {
    errors.report_type = 'Report Type required';
  }

  return errors;
};
export default AddOCReportValidation;
