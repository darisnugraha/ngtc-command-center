import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { change, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { upper } from '../../../../setup/function.js';
import SubmitButton from '../../../modules/button';
import { RenderField, RenderTextArea } from '../../../modules/redux-form/BasicInput';
// import PotentialCustomerValidation from '../validasi/PotentialCustomerValidation';

interface Props {}

const FormPotentialCustomer: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-6 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-6'>
          <Field
            name='store_code'
            type='text'
            component={RenderField}
            label='Store Code'
            placeHolder='Insert Store Code'
            normalize={upper}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='store_name'
            type='text'
            component={RenderField}
            label='Store Name'
            placeHolder='Insert Store Name'
            normalize={upper}
          />
        </div>
        {/* <div className='col-lg-6'>
          <Field
            name='branch_store_code'
            type='text'
            component={RenderField}
            label='Branch Store Code'
            placeHolder='Insert Branch Store Code'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='branch_store_name'
            type='text'
            component={RenderField}
            label='Branch Store Name'
            placeHolder='Insert Branch Store Name'
          />
        </div> */}
        <div className='col-lg-6'>
          <Field
            name='customer_name'
            type='text'
            component={RenderField}
            label='Customer Name'
            placeHolder='Insert Customer Name'
            normalize={upper}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='city'
            type='text'
            component={RenderField}
            label='City'
            placeHolder='Insert City'
            normalize={upper}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='telephone'
            type='text'
            component={RenderField}
            label='Telephone'
            placeHolder='Insert Telephone'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='email'
            type='text'
            component={RenderField}
            label='Email'
            placeHolder='Insert Email'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='address'
            type='text'
            component={RenderTextArea}
            label='Address'
            placeHolder='Insert Address'
            onChange={(e: any) => {
              dispatch(change('FormPotentialCustomer', 'correspondence_address', e.target.value));
            }}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='correspondence_address'
            type='text'
            component={RenderTextArea}
            label='Correspondence Address'
            placeHolder='Insert Correspondence Address'
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
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormPotentialCustomer',
  touchOnChange: true,
  // validate: PotentialCustomerValidation,
})(FormPotentialCustomer);
export default connect()(form);
