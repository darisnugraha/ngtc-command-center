import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { SelectDateRange } from '../../../../modules/redux-form/DatePicker';
// import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import * as redux from '../redux/ReceivableReportRedux';
import AddReceivableReportValidation from '../validation/ReceivableReportValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  return {
    initialValues: {},
  };
};

const FormReceivableReport: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(new Date());
  // eslint-disable-next-line
  const [endDate, setEndDate] = useState(new Date());

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const listOC: any = useSelector<RootState>(({ reportreceivable }) => reportreceivable.listOC);
  const listStore: any = useSelector<RootState>(
    ({ reportreceivable }) => reportreceivable.listStore
  );
  const listBranch: any = useSelector<RootState>(
    ({ reportreceivable }) => reportreceivable.listBranch
  );

  const dataOC = [
    {
      value: 'all',
      label: 'All',
    },
  ];
  listOC?.forEach((element: any) => {
    const row = { value: element.no_order_konfirmasi, label: element.no_order_konfirmasi };
    dataOC.push(row);
  });
  const dataStore = [
    {
      value: 'all',
      label: 'All',
    },
  ];
  listStore?.forEach((element: any) => {
    const row = { value: element.kode_toko, label: element.nama_toko };
    dataStore.push(row);
  });
  const dataBranch = [
    {
      value: 'all',
      label: 'All',
    },
  ];
  listBranch?.forEach((element: any) => {
    const row = { value: element.kode_cabang, label: element.nama_cabang };
    dataBranch.push(row);
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-3'>
          <Field
            id='date'
            name='date'
            type='date'
            component={SelectDateRange}
            startDate={startDate}
            endDate={endDate}
            label='Start Date - End Date'
            placeHolder='Select Range Date'
            onChange={onChange}
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='no_oc'
            type='text'
            component={RenderFieldSelect}
            options={dataOC}
            label='No OC'
            placeHolder='Select No OC'
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='central_store'
            type='text'
            component={RenderFieldSelect}
            options={dataStore}
            label='Central Store'
            placeHolder='Select Central Store'
            onChange={(e: any) => {
              dispatch(redux.actions.getListBranch(e.value));
            }}
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='branch_store'
            type='text'
            component={RenderFieldSelect}
            options={dataBranch}
            label='Branch Store'
            placeHolder='Select Branch Store'
          />
        </div>
      </div>
      <div className='row justify-content-end mt-5'>
        <div className='col-lg-3 d-grid'>
          <SubmitButton title='Search Data' imagePath='' />
        </div>
      </div>
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormReceivableReport',
  touchOnChange: true,
  validate: AddReceivableReportValidation,
})(FormReceivableReport);
export default connect(mapState, null)(form);
