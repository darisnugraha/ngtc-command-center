import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../setup';
import SubmitButton from '../../../modules/button';
import { RenderField } from '../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../modules/redux-form/dropdown';
import PotentialCustomerValidation from '../validasi/PotentialCustomerValidation';
import * as redux from '../redux/PotentialCustomerRedux';

interface Props {}

const FormPotentialCustomer: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  const dataToko: any = useSelector<RootState>(({ customer }) => customer.feedback);
  const dataCabang: any = useSelector<RootState>(
    ({ potentialcustomer }) => potentialcustomer.feedbackBranchList
  );

  const disable = true;
  const listDataCabang = [
    {
      value: 'PUSAT',
      label: 'PUSAT',
    },
  ];
  dataCabang.forEach((element: any) => {
    const row = {
      value: element.kode_cabang,
      label: element.nama_cabang,
    };
    listDataCabang.push(row);
  });

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
            component={RenderFieldSelect}
            options={dataToko.map((element: any) => {
              return {
                value: element.kode_toko,
                label: element.nama_toko,
              };
            })}
            label='Store'
            placeHolder='Select Store'
            onChange={(e: any) => {
              dispatch(redux.actions.getStoreDetailDataByCode(e.value));
            }}
            // defaultValue={isEdit ? defaultUnit : ''}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='branch_code'
            type='text'
            component={RenderFieldSelect}
            options={listDataCabang}
            label='Branch'
            placeHolder='Select Branch'
            onChange={(e: any) => {
              dispatch(redux.actions.getBranchDetailDataByCode(e.value));
            }}
            // defaultValue={isEdit ? defaultUnit : ''}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='branch_name'
            type='text'
            component={RenderField}
            label='Branch Name'
            placeHolder='Insert Branch Name'
            isEdit={disable}
            readOnly={disable}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='store_name'
            type='text'
            component={RenderField}
            label='Store Name'
            placeHolder='Insert Store Name'
            isEdit={disable}
            readOnly={disable}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='customer_name'
            type='text'
            component={RenderField}
            label='Customer Name'
            placeHolder='Insert Customer Name'
            isEdit={disable}
            readOnly={disable}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='city'
            type='text'
            component={RenderField}
            label='City'
            placeHolder='Insert City'
            isEdit={disable}
            readOnly={disable}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='telephone'
            type='text'
            component={RenderField}
            label='Telephone'
            placeHolder='Insert Telephone'
            isEdit={disable}
            readOnly={disable}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='email'
            type='text'
            component={RenderField}
            label='Email'
            placeHolder='Insert Email'
            isEdit={disable}
            readOnly={disable}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='address'
            type='text'
            component={RenderField}
            label='Address'
            placeHolder='Insert Address'
            isEdit={disable}
            readOnly={disable}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='correspondence_address'
            type='text'
            component={RenderField}
            label='Correspondence Address'
            placeHolder='Insert Correspondence Address'
            isEdit={disable}
            readOnly={disable}
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
  validate: PotentialCustomerValidation,
})(FormPotentialCustomer);
export default connect()(form);
