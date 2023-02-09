import React from 'react';
import * as xlsx from 'xlsx';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { currencyMask, upper } from '../../../../../setup/function.js';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import AddProductionServiceValidation from '../validasi/AddProductionServiceValidation';
import * as redux from '../redux/ProductionServiceRedux';
import TableInquiry from './TableInquiry';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  if (state.productionservice.feedbackID !== undefined) {
    return {
      initialValues: {
        // eslint-disable-next-line
        id: state.productionservice.feedbackID._id,
        no_inquiry: state.productionservice.feedbackID.inquiry.no_inquiry,
        production_service_name: state.productionservice.feedbackID.nama_production_service,
        store_code: state.productionservice.feedbackID.kode_toko,
        branch_code: state.productionservice.feedbackID.kode_cabang,
        qty: state.productionservice.feedbackID.qty,
        unit: state.productionservice.feedbackID.kode_satuan,
        total_price: state.productionservice.feedbackID.total_harga,
        qc: state.productionservice.feedbackID.inquiry.qc,
        total_processing_time: state.productionservice.feedbackID.inquiry.total_pengerjaan,
      },
    };
  }
  return {
    initialValues: {},
  };
};

const FormProductionService: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  const dataUnit: any = useSelector<RootState>(({ unit }) => unit.feedback);
  const dataStore: any = useSelector<RootState>(({ customer }) => customer.feedback);
  const dataCabang: any = useSelector<RootState>(
    ({ productionservice }) => productionservice.feedbackBranchList
  );
  const isEdit: any = useSelector<RootState>(({ productionservice }) => productionservice.isEdit);
  const dataEdit: any = useSelector<RootState>(
    ({ productionservice }) => productionservice.feedbackID
  );
  const dataDetailStore: any = useSelector<RootState>(
    ({ productionservice }) => productionservice.feedbackStoreDetail
  );
  const dataDetailBranch: any = useSelector<RootState>(
    ({ productionservice }) => productionservice.detailBranch
  );
  const defaultUnit = [{ value: dataEdit?.kode_satuan, label: dataEdit?.kode_satuan }];
  const defaultStore = [{ value: dataDetailStore?.kode_toko, label: dataDetailStore?.nama_toko }];
  const defaultBranch = [
    { value: dataDetailBranch?.kode_cabang, label: dataDetailBranch?.nama_cabang },
  ];

  const readUploadFile = (e: any) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (element) => {
        const data = element?.target?.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        dispatch(redux.actions.addInquiry(json));
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-12 d-none'>
          <Field
            name='no_inquiry'
            type='text'
            component={RenderField}
            label='No Inquiry'
            placeHolder='Insert No Inquiry'
          />
        </div>
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
            name='production_service_name'
            type='text'
            component={RenderField}
            label='Production Service Name'
            placeHolder='Insert Production Service Name'
            normalize={upper}
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
            name='total_price'
            type='text'
            component={RenderField}
            label='Price Production Service'
            placeHolder='Insert Price Production Service'
            {...currencyMask}
          />
        </div>
        <div className='col-lg-6'>
          <Field name='qc' type='text' component={RenderField} label='QC' placeHolder='Insert QC' />
        </div>
        <div className='col-lg-6'>
          <Field
            name='total_processing_time'
            type='text'
            component={RenderField}
            label='Total Processing Time'
            placeHolder='Insert Total Processing Time'
          />
        </div>
        <div className='col-lg-6'>
          <label htmlFor='upload'>Upload File</label>
          <input type='file' name='upload' id='upload' onChange={readUploadFile} />
        </div>
        <div className='col-lg-12'>
          <hr />
        </div>
        <div className='col-lg-12'>
          <TableInquiry />
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
  form: 'FormProductionService',
  touchOnChange: true,
  validate: AddProductionServiceValidation,
})(FormProductionService);
export default connect(mapState, null)(form);
