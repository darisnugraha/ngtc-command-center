import { FormErrors } from 'redux-form';
import { UserModel } from '../model/UserModel';

const AddUserValidation = (values: UserModel): FormErrors<UserModel> => {
  const errors: FormErrors<UserModel> = {};

  if (!values.user_id) {
    errors.user_id = 'User Id required';
  }

  if (!values.user_name) {
    errors.user_name = 'User Name required';
  }

  if (!values.password) {
    errors.password = 'Password required';
  }

  if (!values.level) {
    errors.level = 'Level required';
  }

  return errors;
};
export default AddUserValidation;
