import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { currencyMask } from '../../../../../setup/function.js';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import AddSupportServiceValidation from '../validasi/AddSupportServiceValidation';
import * as redux from '../redux/SupportServiceRedux';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.supportservice.feedbackID !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.supportservice.feedbackID._id,
        support_service_name: state.supportservice.feedbackID.nama_support_service,
        store_code: state.supportservice.feedbackID.kode_toko,
        branch_code: state.supportservice.feedbackID.kode_cabang,
        qty: state.supportservice.feedbackID.qty,
        unit: state.supportservice.feedbackID.kode_satuan,
        price: state.supportservice.feedbackID.harga,
        total_price: state.supportservice.feedbackID.total_harga,
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormSupportService: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  const dataUnit: any = useSelector<RootState>(({ unit }) => unit.feedback);
  const dataStore: any = useSelector<RootState>(({ customer }) => customer.feedback);
  const dataCabang: any = useSelector<RootState>(
    ({ supportservice }) => supportservice.feedbackBranchList
  );
  const isEdit: any = useSelector<RootState>(({ supportservice }) => supportservice.isEdit);
  const dataEdit: any = useSelector<RootState>(({ supportservice }) => supportservice.feedbackID);
  const dataDetailStore: any = useSelector<RootState>(
    ({ supportservice }) => supportservice.feedbackStoreDetail
  );
  const dataDetailBranch: any = useSelector<RootState>(
    ({ supportservice }) => supportservice.detailBranch
  );
  const defaultUnit = [{ value: dataEdit?.kode_satuan, label: dataEdit?.kode_satuan }];
  const defaultStore = [{ value: dataDetailStore?.kode_toko, label: dataDetailStore?.nama_toko }];
  const defaultBranch = [
    { value: dataDetailBranch?.kode_cabang, label: dataDetailBranch?.nama_cabang },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field
            name='id'
            type='text'
            component={RenderField}
            label='Product ID'
            placeHolder='Insert Product ID'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='support_service_name'
            type='text'
            component={RenderField}
            label='Support Service Name'
            placeHolder='Insert Support Service Name'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='store_code'
            type='text'
            component={RenderFieldSelect}
            options={dataStore.map((element: any) => {
              return {
                value: element.kode_toko,
                label: element.nama_toko,
              };
            })}
            label='Store Code'
            placeHolder='Select Store Code'
            onChange={(e: any) => {
              dispatch(redux.actions.getStoreDetailDataByCode(e.value));
            }}
            defaultValue={isEdit ? defaultStore : ''}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='branch_code'
            type='text'
            component={RenderFieldSelect}
            options={dataCabang.map((element: any) => {
              return {
                value: element.kode_cabang,
                label: element.nama_cabang,
              };
            })}
            label='Branch Code'
            placeHolder='Select Branch Code'
            defaultValue={isEdit ? defaultBranch : ''}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='qty'
            type='text'
            component={RenderField}
            label='Qty'
            placeHolder='Insert Qty'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='unit'
            type='text'
            component={RenderFieldSelect}
            options={dataUnit.map((element: any) => {
              return {
                value: element.kode_satuan,
                label: element.nama_satuan,
              };
            })}
            label='Unit'
            placeHolder='Select Unit'
            defaultValue={isEdit ? defaultUnit : ''}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='price'
            type='text'
            component={RenderField}
            label='Price'
            placeHolder='Insert Price'
            {...currencyMask}
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='total_price'
            type='text'
            component={RenderField}
            label='Total Price'
            placeHolder='Insert Total Price'
            {...currencyMask}
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
  form: 'FormSupportService',
  touchOnChange: true,
  validate: AddSupportServiceValidation,
})(FormSupportService);
export default connect(mapState, null)(form);
