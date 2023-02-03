import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm, submit } from 'redux-form';
import { RenderFieldLogin } from '../../../modules/redux-form/BasicInput';
import * as auth from '../redux/LoginRedux';
import LoginFormValidation from '../validate/LoginFormValidation';

interface Props {}

const LoginForm: React.FC<InjectedFormProps<{}, Props>> = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  const dispatch = useDispatch();
  return (
    <form onSubmit={handleSubmit}>
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Selamat Datang</h1>
        <p className='text-dark mb-3'>Silahkan Masukan Username dan Password Anda</p>
        <div className='text-gray-400 fw-bold fs-4' />
      </div>
      <div className='col-lg-12 mb-5'>
        <Field
          name='user_id'
          type='text'
          component={RenderFieldLogin}
          label='Username'
          placeHolder='Masukan Username'
        />
      </div>
      <div className='col-lg-12'>
        <Field
          name='password'
          type='password'
          component={RenderFieldLogin}
          label='Password'
          placeHolder='Masukan Password'
        />
      </div>
      <br />
      <div className='row justify-content-end mt-5'>
        <button
          type='button'
          className='btn btn-primary'
          disabled={pristine || submitting}
          onClick={() => dispatch(auth.actions.login())}
        >
          {!submitting && <span className='indicator-label'>Login</span>}
          {submitting && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2' />
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  form: 'LoginForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  touchOnChange: true,
  onSubmit: () => submit,
  validate: LoginFormValidation,
})(LoginForm);
export default connect()(form);
