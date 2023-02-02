import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { RootState } from '../../../../setup/index.js';
import SubmitButton from '../../../modules/button';
import { SelectDateRange } from '../../../modules/redux-form/DatePicker';
// import { RenderField } from '../../../../modules/redux-form/BasicInput';
import { RenderFieldSelect } from '../../../modules/redux-form/dropdown';

interface Props {}

// eslint-disable-next-line
const mapState = (state: RootState) => {
  return {
    initialValues: {},
  };
};

const FormSearchReceivable: React.FC<InjectedFormProps<{}, Props>> = (props: any) => {
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

  const dataOC: any = useSelector<RootState>(
    ({ listorderconfirmation }) => listorderconfirmation.feedback
  );
  const listOC = [
    {
      value: 'all',
      label: 'All',
    },
  ];
  dataOC.forEach((element: any) => {
    const option = {
      label: element.no_order_konfirmasi,
      value: element.no_order_konfirmasi,
    };
    listOC.push(option);
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-lg-4'>
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
        <div className='col-lg-4'>
          <Field
            name='no_oc'
            type='text'
            component={RenderFieldSelect}
            options={listOC}
            label='No OC'
            placeHolder='Select No OC'
          />
        </div>
        <div className='col-lg-4 mt-9'>
          <SubmitButton title='Search Data' imagePath='' />
        </div>
      </div>
      {/* <div className='row justify-content-end mt-5'>
        <div className='col-lg-3 d-grid'>
          <SubmitButton title='Search Data' imagePath='' />
        </div>
      </div> */}
    </form>
  );
};

const form = reduxForm<{}, Props>({
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  form: 'FormSearchReceivable',
  touchOnChange: true,
  //   validate: AddProductionServiceValidation,
})(FormSearchReceivable);
export default connect(mapState, null)(form);
