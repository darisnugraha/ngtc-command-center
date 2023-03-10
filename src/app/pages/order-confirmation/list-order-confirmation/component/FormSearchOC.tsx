import moment from 'moment';
import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { SelectDateRangeListOC } from '../../../../modules/redux-form/DatePicker';
// import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  return {
    initialValues: {
      date: [moment(new Date(), 'YYYY:MM:DD'), moment(new Date(), 'YYYY:MM:DD')],
      staff_name: 'all',
      no_oc: 'all',
      central_store_name: 'all',
      status_payment: 'all',
    },
  };
};

const FormSearchOC: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
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
  dataStaff?.forEach((element: any) => {
    const row = { value: element.kode_staff, label: element.nama_staff };
    listStaff.push(row);
  });
  const dataStore: any = useSelector<RootState>(({ customer }) => customer.feedback);
  const listStore = [
    {
      value: 'all',
      label: 'All',
    },
  ];
  dataStore?.forEach((element: any) => {
    const row = { value: element.kode_toko, label: element.nama_toko };
    listStore.push(row);
  });
  const dataOC: any = useSelector<RootState>(
    ({ listorderconfirmation }) => listorderconfirmation.feedback
  );
  const listOC = [
    {
      value: 'all',
      label: 'All',
    },
  ];
  dataOC?.forEach((element: any) => {
    const row = { value: element.no_order_konfirmasi, label: element.no_order_konfirmasi };
    listOC.push(row);
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
            component={SelectDateRangeListOC}
            startDate={startDate}
            endDate={endDate}
            label='Start Date - End Date'
            placeHolder='Select Range Date'
            onChange={onChange}
            defaultValue={moment(new Date(), 'YYYY:MM:DD')}
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
            defaultValue={{ value: 'all', label: 'All' }}
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
            defaultValue={{ value: 'all', label: 'All' }}
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
            defaultValue={{ value: 'all', label: 'All' }}
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
            defaultValue={{ value: 'all', label: 'All' }}
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
  form: 'FormSearchOC',
  touchOnChange: true,
  //   validate: AddProductionServiceValidation,
})(FormSearchOC);
export default connect(mapState, null)(form);
