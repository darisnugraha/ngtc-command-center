import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import SubmitButton from '../../../../modules/button';
import { RenderField, RenderTextArea } from '../../../../modules/redux-form/BasicInput';
import AddSupplierValidation from '../validasi/AddSupplierValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.supplier.feedbackID !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.supplier.feedbackID._id,
        supplier_code: state.supplier.feedbackID.kode_supplier,
        supplier_name: state.supplier.feedbackID.nama_supplier,
        address: state.supplier.feedbackID.alamat,
        contact_person: state.supplier.feedbackID.contact_person,
        telephone: state.supplier.feedbackID.telepon,
        email: state.supplier.feedbackID.email,
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormSupplierComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const isEdit: any = useSelector<RootState>(({ supplier }) => supplier.isEdit);
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-6 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-6'>
          <Field
            readOnly={isEdit}
            isEdit={isEdit}
            name='supplier_code'
            type='text'
            component={RenderField}
            label='Supplier Code'
            placeHolder='Insert Supplier Code'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='supplier_name'
            type='text'
            component={RenderField}
            label='Supplier Name'
            placeHolder='Insert Supplier Name'
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
        <div className='col-lg-6'>
          <Field
            name='contact_person'
            type='text'
            component={RenderField}
            label='Contact Person'
            placeHolder='Insert Contact Person'
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
  form: 'FormSupplierComponent',
  touchOnChange: true,
  validate: AddSupplierValidation,
})(FormSupplierComponent);
export default connect(mapState, null)(form);
