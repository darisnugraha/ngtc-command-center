import { FormErrors } from 'redux-form';
import { StaffModel } from '../model/StaffModel';

const AddSoftwareValidation = (values: StaffModel): FormErrors<StaffModel> => {
  const errors: FormErrors<StaffModel> = {};

  if (!values.staff_code) {
    errors.staff_code = 'Staff Code required';
  }

  if (!values.staff_name) {
    errors.staff_name = 'Staff Name required';
  }

  if (!values.telephone) {
    errors.telephone = 'Telephone required';
  }

  if (!values.division) {
    errors.division = 'Division required';
  }

  return errors;
};
export default AddSoftwareValidation;
