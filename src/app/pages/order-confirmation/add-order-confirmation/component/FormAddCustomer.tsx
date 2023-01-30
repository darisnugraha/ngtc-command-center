import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup';
import { currencyMask } from '../../../../../setup/function.js';
import SubmitButton from '../../../../modules/button';
import { RenderField, RenderTextArea } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import * as reduxAddCustomer from '../redux/AddOrderConfirmationCustomerRedux';
import AddCustomerValidation from '../validasi/AddCustomerOCValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  return {
    initialValues: {},
  };
};

const FormAddCustomerOC: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const dataStore: any = useSelector<RootState>(({ customer }) => customer.feedback);
  const dataBranch: any = useSelector<RootState>(
    ({ addorderconfirmationcustomer }) => addorderconfirmationcustomer.branchList
  );
  const dataStaff: any = useSelector<RootState>(({ staff }) => staff.feedback);

  const disable = true;

  const dataListBranch = [
    {
      value: 'PUSAT',
      label: 'PUSAT',
    },
  ];
  dataBranch.forEach((element: any) => {
    const row = {
      value: element.kode_cabang,
      label: element.nama_cabang,
    };
    dataListBranch.push(row);
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field name='id' type='text' component={RenderField} label='ID' placeHolder='Insert ID' />
        </div>
        <div className='col-lg-3'>
          <Field
            name='central_store_code'
            type='text'
            component={RenderFieldSelect}
            options={dataStore.map((element: any) => {
              const row = {
                value: element.kode_toko,
                label: element.nama_toko,
              };
              return row;
            })}
            label='Central Store'
            placeHolder='Select Central Store'
            onChange={(e: any) => {
              dispatch(reduxAddCustomer.actions.getBranchByStoreCode(e.value, e.label));
            }}
          />
        </div>
        <div className='col-lg-3 d-none'>
          <Field
            name='central_store_name'
            type='text'
            component={RenderField}
            readOnly={disable}
            isEdit={disable}
            label='Central Store Name'
            placeHolder='Insert Central Store Name'
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='branch_store_code'
            type='text'
            component={RenderFieldSelect}
            options={dataListBranch}
            label='Branch Store'
            placeHolder='Select Branch Store'
            onChange={(e: any) => {
              dispatch(reduxAddCustomer.actions.getBranchDetailByCode(e.value, e.label));
            }}
          />
        </div>
        <div className='col-lg-3 d-none'>
          <Field
            name='branch_store_name'
            type='text'
            component={RenderField}
            readOnly={disable}
            isEdit={disable}
            label='Branch Store Name'
            placeHolder='Insert Branch Store Name'
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='customer_name'
            type='text'
            component={RenderField}
            readOnly={disable}
            isEdit={disable}
            label='Customer Name'
            placeHolder='Insert Customer Name'
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='telephone'
            type='text'
            component={RenderField}
            readOnly={disable}
            isEdit={disable}
            label='Telephone'
            placeHolder='Insert Telephone'
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='address'
            type='textarea'
            component={RenderTextArea}
            readOnly={disable}
            isEdit={disable}
            label='Address'
            placeHolder='Insert Address'
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='correspondence_address'
            type='textarea'
            component={RenderTextArea}
            readOnly={disable}
            isEdit={disable}
            label='Correspondence Address'
            placeHolder='Insert Correspondence Address'
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='city'
            type='text'
            component={RenderField}
            readOnly={disable}
            isEdit={disable}
            label='City'
            placeHolder='Insert City'
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='email'
            type='text'
            component={RenderField}
            readOnly={disable}
            isEdit={disable}
            label='Email'
            placeHolder='Insert Email'
          />
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='col-lg-3'>
          <Field
            name='referral'
            type='text'
            component={RenderFieldSelect}
            options={dataStaff.map((element: any) => {
              const row = {
                value: element.kode_staff,
                label: element.nama_staff,
              };
              return row;
            })}
            label='Referral'
            placeHolder='Select Referral'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-3'>
          <Field
            name='staff'
            type='text'
            component={RenderFieldSelect}
            options={dataStaff.map((element: any) => {
              const row = {
                value: element.kode_staff,
                label: element.nama_staff,
              };
              return row;
            })}
            label='Staff'
            placeHolder='Select Staff'
            onChange={(e: any) => {
              dispatch(reduxAddCustomer.actions.getStaffDetailByCode(e.value));
            }}
          />
        </div>
        <div className='col-lg-3 d-none'>
          <Field
            name='division_code'
            type='text'
            component={RenderField}
            readOnly={disable}
            isEdit={disable}
            label='Division'
            placeHolder='Insert Division'
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='division_name'
            type='text'
            component={RenderField}
            readOnly={disable}
            isEdit={disable}
            label='Division'
            placeHolder='Insert Division'
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='reseller_fee'
            type='text'
            component={RenderField}
            label='Reseller Fee'
            placeHolder='Insert Reseller Fee'
            {...currencyMask}
          />
        </div>
      </div>
      <div className='row justify-content-end mt-5'>
        <div className='col-lg-3 d-grid'>
          <SubmitButton title='Next' imagePath='' />
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'FormAddCustomerOC',
  touchOnChange: true,
  validate: AddCustomerValidation,
})(FormAddCustomerOC);
export default connect(mapState, null)(form);
