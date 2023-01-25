import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import AddUserValidation from '../validasi/AddUserValidation';

interface Props {}

const FormUserComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12'>
          <Field
            name='user_id'
            type='text'
            component={RenderField}
            label='User Id'
            placeHolder='Insert User Id'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='user_name'
            type='text'
            component={RenderField}
            label='User Name'
            placeHolder='Insert User Name'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='password'
            type='text'
            component={RenderField}
            label='Password'
            placeHolder='Insert Password'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='level'
            type='text'
            component={RenderFieldSelect}
            options={[
              {
                value: 'MANAGER',
                label: 'MANAGER',
              },
              {
                value: 'STAFF',
                label: 'STAFF',
              },
            ]}
            label='Level'
            placeHolder='Insert Level'
          />
        </div>
      </div>
      <div className='row justify-content-end mt-5'>
        <div className='col-lg-3 d-grid'>
          <SubmitButton title='Add Data' imagePath='' />
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'FormUserComponent',
  touchOnChange: true,
  validate: AddUserValidation,
})(FormUserComponent);
export default connect()(form);
