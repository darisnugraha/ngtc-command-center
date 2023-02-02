import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../../setup/index.js';
import SubmitButton from '../../../../modules/button';
import { SelectDateRange } from '../../../../modules/redux-form/DatePicker';
import { RenderFieldSelect } from '../../../../modules/redux-form/dropdown';
import AddDeliveryReportValidation from '../validation/DeliveryReportValidation';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {};

const FormDeliveryReport: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
  const { handleSubmit } = props;
  // eslint-disable-next-line
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

  const dataSJ = [
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
            name='no_sj'
            type='text'
            component={RenderFieldSelect}
            options={dataSJ}
            label='No Delivery Order'
            placeHolder='Select No Delivery Order'
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
            onChange={() => {}}
          />
        </div>
        <div className='col-lg-3'>
          <Field
            name='status_validation'
            type='text'
            component={RenderFieldSelect}
            options={dataStatus}
            label='Status Validation'
            placeHolder='Select Status Validation'
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
  form: 'FormDeliveryReport',
  touchOnChange: true,
  validate: AddDeliveryReportValidation,
})(FormDeliveryReport);
export default connect(mapState, null)(form);
