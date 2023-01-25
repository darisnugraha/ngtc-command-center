import { FormErrors } from 'redux-form';
import { ILogin } from '../model/LoginModel';

const LoginFormValidation = (values: ILogin): FormErrors<ILogin> => {
  const errors: FormErrors<ILogin> = {};

  if (!values.username) {
    errors.username = 'Username required';
  }

  if (!values.password) {
    errors.password = 'Password required';
  }

  return errors;
};
export default LoginFormValidation;
