import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { SelectDateRange } from '../../../../modules/redux-form/DatePicker';
// import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import * as redux from '../redux/OCReportRedux';
import AddOCReportValidation from '../validation/OCReportValidation';
import { getToday } from '../../../../../setup/function.js';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  return {
    initialValues: {
      date: [getToday(), getToday()],
    },
  };
};

const FormOCReport: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
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

  const listOC: any = useSelector<RootState>(({ reportoc }) => reportoc.listOC);
  const listStore: any = useSelector<RootState>(({ reportoc }) => reportoc.listStore);
  const listBranch: any = useSelector<RootState>(({ reportoc }) => reportoc.listBranch);

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

  const dataTypeReport = [
    {
      value: 'DETAIL',
      label: 'Detail',
    },
    {
      value: 'RECAP',
      label: 'Rekap',
    },
  ];

  const typeReport = useSelector<RootState>(({ reportoc }) => reportoc.typeReport);

  const defaultStore = [{ value: 'all', label: 'All' }];
  const defaultBranch = [{ value: 'all', label: 'All' }];

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
            name='report_type'
            type='text'
            component={RenderFieldSelect}
            options={dataTypeReport}
            label='Report Type'
            placeHolder='Select Report Type'
            onChange={(e: any) => {
              dispatch(redux.actions.setTypeReport(e.value));
            }}
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
            defaultValue={typeReport === 'DETAIL' ? defaultStore : ''}
            readOnly={typeReport === 'DETAIL'}
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
            defaultValue={typeReport === 'DETAIL' ? defaultBranch : ''}
            readOnly={typeReport === 'DETAIL'}
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
  form: 'FormOCReport',
  touchOnChange: true,
  validate: AddOCReportValidation,
})(FormOCReport);
export default connect(mapState, null)(form);
