import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import SubmitButton from '../../../../modules/button';
import { RenderField, RenderTextArea } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
// import AddStoreValidation from '../validasi/AddStoreValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.customer.feedbackIDStore !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.customer.feedbackIDStore._id,
        store_code: state.customer.feedbackIDStore.kode_toko,
        store_name: state.customer.feedbackIDStore.nama_toko,
        address: state.customer.feedbackIDStore.alamat || '-',
        correspondence_address: state.customer.feedbackIDStore.alamat_korespondensi || '-',
        customer_name: state.customer.feedbackIDStore.nama_customer || '-',
        city: state.customer.feedbackIDStore.kota || '-',
        email: state.customer.feedbackIDStore.email || '-',
        telephone: state.customer.feedbackIDStore.telephone || '-',
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormStoreComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;

  const isEdit: any = useSelector<RootState>(({ customer }) => customer.isEdit);

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-6 d-none'>
          <Field
            readOnly={isEdit}
            isEdit={isEdit}
            name='id'
            type='text'
            component={RenderField}
            label='ID'
            placeHolder='Insert ID'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            readOnly={isEdit}
            isEdit={isEdit}
            name='store_code'
            type='text'
            component={RenderField}
            label='Store Code'
            placeHolder='Insert Store Code'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='store_name'
            type='text'
            component={RenderField}
            label='Store Name'
            placeHolder='Insert Store Name'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='address'
            type='text'
            component={RenderTextArea}
            label='Address'
            placeHolder='Insert Address'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='correspondence_address'
            type='text'
            component={RenderTextArea}
            label='Correspondence Address'
            placeHolder='Insert Correspondence Address'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='customer_name'
            type='text'
            component={RenderField}
            label='Customer Name'
            placeHolder='Insert Customer Name'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='city'
            type='text'
            component={RenderField}
            label='City'
            placeHolder='Insert City'
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
            name='telephone'
            type='text'
            component={RenderField}
            label='Telephone'
            placeHolder='Insert Telephone'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='type_store'
            type='text'
            component={RenderFieldSelect}
            options={[
              { value: 'BARU', label: 'NEW' },
              { value: 'LAMA', label: 'OLD' },
            ]}
            label='Store Type'
            placeHolder='Select Store Type'
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
  form: 'FormStoreComponent',
  touchOnChange: true,
  // validate: AddStoreValidation,
})(FormStoreComponent);
export default connect(mapState, null)(form);
