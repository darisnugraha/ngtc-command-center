import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import AddBankValidation from '../validasi/AddBankValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.bank.feedbackID !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.bank.feedbackID._id,
        bank_name: state.bank.feedbackID.nama_bank,
        account_number: state.bank.feedbackID.no_rekening,
        account_nama: state.bank.feedbackID.nama_nasabah,
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormBankComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-12'>
          <Field
            name='bank_name'
            type='text'
            component={RenderField}
            label='Bank Name'
            placeHolder='Insert Bank Name'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='account_number'
            type='text'
            component={RenderField}
            label='Account Number'
            placeHolder='Insert Account Number'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='account_name'
            type='text'
            component={RenderField}
            label='Account Name'
            placeHolder='Insert Account Name'
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
  form: 'FormBankComponent',
  touchOnChange: true,
  validate: AddBankValidation,
})(FormBankComponent);
export default connect(mapState, null)(form);
