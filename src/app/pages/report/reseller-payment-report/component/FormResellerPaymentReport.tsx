import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { SelectDateRange } from '../../../../modules/redux-form/DatePicker';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import AddResellerReportValidation from '../validation/ResellerPaymentReportValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {};

const FormResellerPaymentReport: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
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

  const dataOC = [
    {
      value: 'all',
      label: 'All',
    },
  ];

  const dataStore = [
    {
      value: 'all',
      label: 'All',
    },
  ];

  const dataReseller = [
    {
      value: 'all',
      label: 'All',
    },
  ];

  const dataStatus = [
    {
      value: 'all',
      label: 'All',
    },
  ];

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
            name='no_order_confirmation'
            type='text'
            component={RenderFieldSelect}
            options={dataOC}
            label='No Order Confirmation'
            placeHolder='Select No Order Confirmation'
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
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='reseller_code'
            type='text'
            component={RenderFieldSelect}
            options={dataReseller}
            label='Reseller Code'
            placeHolder='Select Reseller Code'
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='status'
            type='text'
            component={RenderFieldSelect}
            options={dataStatus}
            label='Status'
            placeHolder='Select Status'
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
  form: 'FormResellerPaymentReport',
  touchOnChange: true,
  validate: AddResellerReportValidation,
})(FormResellerPaymentReport);
export default connect(mapState, null)(form);
