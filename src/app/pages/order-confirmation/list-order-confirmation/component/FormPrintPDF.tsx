import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { RenderField, RenderTextArea } from '../../../../modules/redux-form/BasicInput';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {};

const FormPrintPDF: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-12'>
          <Field
            name='header_desc'
            type='textarea'
            component={RenderTextArea}
            label='Header Description'
            placeHolder='Insert Header Description'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='waktu_pengiriman'
            type='text'
            component={RenderField}
            label='Waktu Pengiriman'
            placeHolder='Insert Waktu Pengiriman'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='sistem_pembayaran'
            type='text'
            component={RenderField}
            label='Sistem Pembayaran'
            placeHolder='Insert Sistem Pembayaran'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='keterangan'
            type='textarea'
            component={RenderTextArea}
            label='Keterangan'
            placeHolder='Insert Keterangan'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='footer_desc'
            type='textarea'
            component={RenderTextArea}
            label='Footer Description'
            placeHolder='Insert Footer Description'
          />
        </div>
      </div>
      <div className='row justify-content-end mt-5'>
        <div className='col-lg-3 d-grid'>
          <SubmitButton title='Print OC' imagePath='' />
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormPrintPDF',
  touchOnChange: true,
  //   validate: AddProductionServiceValidation,
})(FormPrintPDF);
export default connect(mapState, null)(form);
