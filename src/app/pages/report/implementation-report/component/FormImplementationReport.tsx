import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { SelectDateRange } from '../../../../modules/redux-form/DatePicker';
// import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import * as redux from '../redux/ImplementationReportRedux';
import ImplementationReportValidation from '../validation/ImplementationReportValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  return {
    initialValues: {},
  };
};

const FormImplementationReport: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  const dispatch = useDispatch();
  const [dateRangeImplementation, setDateRangeImplementation] = useState([null, null]);
  const [startDateImplementation, endDateImplementation] = dateRangeImplementation;
  const [startDateRealization, setStartDateRealization] = useState(new Date());
  const [endDateRealization, setEndDateRealization] = useState(new Date());

  const onChangeImplementation = (dates: any) => {
    setDateRangeImplementation(dates);
  };

  const onChangeRealization = (dates: any) => {
    const [start, end] = dates;
    setStartDateRealization(start);
    setEndDateRealization(end);
  };

  const listOC: any = useSelector<RootState>(
    ({ reportimplementation }) => reportimplementation.listOC
  );
  const listStore: any = useSelector<RootState>(
    ({ reportimplementation }) => reportimplementation.listStore
  );
  const listBranch: any = useSelector<RootState>(
    ({ reportimplementation }) => reportimplementation.listBranch
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
            id='date_implementation'
            name='date_implementation'
            type='date'
            component={SelectDateRange}
            startDate={startDateImplementation}
            endDate={endDateImplementation}
            label='Start Date - End Date Implementation'
            placeHolder='Select Range Date'
            onChange={(update: any) => {
              onChangeImplementation(update);
            }}
          />
        </div>
        <div className='col-lg-3'>
          <Field
            id='date_realization'
            name='date_realization'
            type='date'
            component={SelectDateRange}
            startDate={startDateRealization}
            endDate={endDateRealization}
            label='Start Date - End Date Realization'
            placeHolder='Select Range Date'
            onChange={onChangeRealization}
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
  form: 'FormImplementationReport',
  touchOnChange: true,
  validate: ImplementationReportValidation,
})(FormImplementationReport);
export default connect(mapState, null)(form);
