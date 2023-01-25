import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.listorderconfirmation.feedbackNo !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.listorderconfirmation.feedbackNo[0]?._id,
        alamat_cabang: state.listorderconfirmation.feedbackNo[0]?.alamat_cabang,
        alamat_korespondensi: state.listorderconfirmation.feedbackNo[0]?.alamat_korespondensi,
        kota: state.listorderconfirmation.feedbackNo[0]?.kota,
        email: state.listorderconfirmation.feedbackNo[0]?.email,
      },
    };
  }
};

const FormEditCustomer: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-6'>
          <Field
            name='alamat_cabang'
            type='text'
            component={RenderField}
            label='Address'
            placeHolder='Address'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='alamat_korespondensi'
            type='text'
            component={RenderField}
            label='Correspondence Address'
            placeHolder='Correspondence Address'
          />
        </div>
        <div className='col-lg-6'>
          <Field name='kota' type='text' component={RenderField} label='City' placeHolder='City' />
        </div>
        <div className='col-lg-6'>
          <Field
            name='email'
            type='text'
            component={RenderField}
            label='Email'
            placeHolder='Email'
          />
        </div>
      </div>
      <div className='row justify-content-end mt-5'>
        <div className='col-lg-3 d-grid'>
          <SubmitButton title='Save Data' imagePath='' />
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormEditCustomer',
  touchOnChange: true,
  //   validate: AddProductionServiceValidation,
})(FormEditCustomer);
export default connect(mapState, null)(form);
