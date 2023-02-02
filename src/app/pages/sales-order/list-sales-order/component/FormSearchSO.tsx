import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { SelectDateRange } from '../../../../modules/redux-form/DatePicker';
// import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  return {
    initialValues: {},
  };
};

const FormSearchSO: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(new Date());
  // eslint-disable-next-line
  const [endDate, setEndDate] = useState(new Date());

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const dataStaff: any = useSelector<RootState>(({ staff }) => staff.feedback);
  const listStaff = [
    {
      value: 'all',
      label: 'All',
    },
  ];
  dataStaff.forEach((element: any) => {
    listStaff.push({ value: element.kode_staff, label: element.nama_staff });
  });
  const dataStore: any = useSelector<RootState>(({ customer }) => customer.feedback);
  const listStore = [
    {
      value: 'all',
      label: 'All',
    },
  ];
  dataStore.forEach((element: any) => {
    listStore.push({ value: element.kode_toko, label: element.nama_toko });
  });

  const dataOC: any = useSelector<RootState>(({ listso }) => listso.feedbackData);
  const listOC = [
    {
      value: 'all',
      label: 'All',
    },
  ];
  const listSO = [
    {
      value: 'all',
      label: 'All',
    },
  ];
  dataOC.forEach((element: any) => {
    listOC.push({
      value: element.no_order_konfirmasi,
      label: element.no_order_konfirmasi,
    });
    listSO.push({
      value: element.no_sales_order,
      label: element.no_sales_order,
    });
  });
  const StatusPayment = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'OPEN',
      label: 'OPEN',
    },
    {
      value: 'DP',
      label: 'DP',
    },
    {
      value: 'DONE',
      label: 'DONE',
    },
    {
      value: 'CLOSE',
      label: 'CLOSE',
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-6'>
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
        <div className='col-lg-6'>
          <Field
            name='staff_name'
            type='text'
            component={RenderFieldSelect}
            options={listStaff}
            label='Staff Name'
            placeHolder='Select Staff Name'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='no_oc'
            type='text'
            component={RenderFieldSelect}
            options={listOC}
            label='No OC'
            placeHolder='Select No OC'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='no_so'
            type='text'
            component={RenderFieldSelect}
            options={listSO}
            label='No SO'
            placeHolder='Select No SO'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='central_store_name'
            type='text'
            component={RenderFieldSelect}
            options={listStore}
            label='Central Store'
            placeHolder='Select Central Store'
          />
        </div>
        <div className='col-lg-6'>
          <Field
            name='status_payment'
            type='text'
            component={RenderFieldSelect}
            options={StatusPayment}
            label='Status Payment'
            placeHolder='Select Status Payment'
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
  form: 'FormSearchSO',
  touchOnChange: true,
  //   validate: AddProductionServiceValidation,
})(FormSearchSO);
export default connect(mapState, null)(form);
