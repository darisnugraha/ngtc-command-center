import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import SubmitButton from '../../../../modules/button';
import { RenderField, RenderTextArea } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import AddBranchValidation from '../validasi/AddBranchValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.customer.feedbackIDBranch !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.customer.feedbackIDBranch._id,
        central_store_code: state.customer.feedbackIDBranch.kode_toko,
        branch_store_code: state.customer.feedbackIDBranch.kode_cabang,
        branch_store_name: state.customer.feedbackIDBranch.nama_cabang,
        address: state.customer.feedbackIDBranch.alamat_cabang || '-',
        correspondence_address: state.customer.feedbackIDBranch.alamat_korespondensi || '-',
        city: state.customer.feedbackIDBranch.kota || '-',
        email: state.customer.feedbackIDBranch.email || '-',
        telephone: state.customer.feedbackIDBranch.telepon || '-',
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormBranchComponent: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;

  const isEdit: any = useSelector<RootState>(({ customer }) => customer.isEdit);
  const dataEdit: any = useSelector<RootState>(({ customer }) => customer.feedbackIDBranch);
  const defaultCentralStoreCode = [{ value: dataEdit?.kode_toko, label: dataEdit?.kode_toko }];
  const dataCentralStoreCode: any = useSelector<RootState>(({ customer }) => customer.feedback);

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field
            name='id'
            type='text'
            component={RenderFieldSelect}
            label='Central ID'
            placeHolder='Insert Central ID'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            readOnly={isEdit}
            isEdit={isEdit}
            name='central_store_code'
            type='text'
            component={RenderFieldSelect}
            options={dataCentralStoreCode.map((element: any) => {
              return {
                value: element.kode_toko,
                label: `${element.kode_toko}  -  ${element.nama_toko}`,
              };
            })}
            label='Central Store Code'
            placeHolder='Insert Central Store Code'
            defaultValue={isEdit ? defaultCentralStoreCode : ''}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            readOnly={isEdit}
            isEdit={isEdit}
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
        </div>
        <div className='col-lg-12'>
          <Field
            name='address'
            type='textarea'
            component={RenderTextArea}
            label='Address'
            placeHolder='Insert Address'
          />
        </div>
        <div className='col-lg-12'>
          <Field
            name='correspondence_address'
            type='textarea'
            component={RenderTextArea}
            label='Correspondence Address'
            placeHolder='Insert Correspondence Address'
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
  form: 'FormBranchComponent',
  touchOnChange: true,
  validate: AddBranchValidation,
})(FormBranchComponent);
export default connect(mapState, null)(form);
