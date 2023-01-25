import { FormErrors } from 'redux-form';
import { ImplementationReportModel } from '../model/ImplementationReportModel';

const AddImplementationReportValidation = (
  values: ImplementationReportModel
): FormErrors<ImplementationReportModel> => {
  const errors: FormErrors<ImplementationReportModel> = {};

  if (!values.date_implementation) {
    errors.date_implementation = 'Date Implementation required';
  }

  if (!values.date_realization) {
    errors.date_realization = 'Date Realization required';
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
export default AddImplementationReportValidation;
